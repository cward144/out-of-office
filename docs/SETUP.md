# Setup guide

You'll end up with: a **git repo** opened in **VS Code** (Claude Code + Copilot agents), a **Claude Project** holding the same specs for chat-based design work, and one source of truth.

## 0. Prerequisites (10 min)
- [VS Code](https://code.visualstudio.com/), [Git](https://git-scm.com/), Python 3 (only for the local server and import tool).
- A free [GitHub](https://github.com) account (recommended: it's your backup and the sync point between agents).
- Claude Code: in VS Code, Extensions → search "Claude Code" → Install. (Or CLI: see docs.claude.com.)
- Optional: GitHub Copilot extension.

## 1. Create the repo folder
1. Unzip `out-of-office-repo.zip` somewhere like `~/Projects/out-of-office`.
2. Open a terminal there:
   ```bash
   git init -b main
   git add -A
   git commit -m "000: scaffold spec-driven repo"
   ```
3. On GitHub: New repository → name `out-of-office` → **no** README/license → Create. Then:
   ```bash
   git remote add origin https://github.com/<you>/out-of-office.git
   git push -u origin main
   ```

## 2. Bring in the actual game (most important step)
The saved HTML you gave me only had the page shell; the game logic (`engine.js`, `navigation.js`, `camera.js`, `game.js`, `game.css`) and art (`*.webp`) live in its `_files` folder or in the original project.

**Best:** open the original ChatGPT Sites project and download/export its source. Copy into `src/` so it matches the layout in TECH_SPEC §2.

**Fallback:** re-save the live page with "Webpage, Complete" in Chrome, keep the `.html` and its `_files` folder together, then:
```bash
python3 tools/import_saved_page.py "/path/to/Out of Office — a tiny layoff adventure.html"
python3 -m http.server 8000 -d src      # open http://localhost:8000
```
Play it through. If anything is duplicated or broken, use the original source instead.

Commit: `git add -A && git commit -m "001: import existing build"`.

## 3. Open in VS Code
`File → Open Folder → out-of-office`. Accept "install recommended extensions". Press **Ctrl/Cmd+Shift+B** to start the local server.

## 4. Run the first agent task (verifies the spec against the code)
In the Claude Code panel (or terminal `claude` in the repo folder), say:
> Do specs/tasks/001-import-and-verify-spec.md. Follow AGENTS.md.

It will read the real code, fix the 🟡 items in TECH_SPEC, and write `specs/proposals/001-observed-design.md` describing what the game actually contains. You then merge what you like into GAME_DESIGN.

For Copilot: it reads `.github/copilot-instructions.md` automatically (which points at AGENTS.md). Two ready-made prompts live in `.github/prompts/` (`/interview-me`, `/gap-analysis`).

## 5. The two-spec workflow day to day
| You want to… | Do this |
|---|---|
| Design the game | Open `specs/GAME_DESIGN.md`. Ask: "Interview me about §5 Characters." (design-partner mode) |
| See what's missing | "Run gap-analysis." Approve the draft tasks. |
| Build something | "Do specs/tasks/004-*.md." |
| Check the code against the doc | "Spec audit: verify TECH_SPEC against the code." |
| Change the stack | Edit TECH_SPEC first (agents propose, you approve), then code. |

The agents are set up to **nudge you** (gently) when you skip a step: asking for a feature that's not in the design doc, a vague request, or code with no task file. You can always say "skip it" and they'll proceed and note it.

## 6. The Claude Project (for chat-based design)
1. claude.ai → Projects → open **Out of Office - GAME**.
2. Add knowledge: upload `specs/GAME_DESIGN.md`, `specs/TECH_SPEC.md`, `AGENTS.md`, and anything in `specs/refs/`.
3. Project instructions (paste):
   > You are my design partner for the game in these docs. GAME_DESIGN.md is mine; interview me one question at a time, give 2–3 options with a recommendation, label your own ideas "Suggestion", and give me updated doc text to paste back. TECH_SPEC.md is for coding agents; don't redesign it unless I ask. If I ask for something outside the design pillars, say which pillar it conflicts with.
4. **Sync rule:** the repo is the source of truth. After any design chat, paste the agreed text into `specs/GAME_DESIGN.md`, commit, then re-upload the file to the Project. (Re-upload whenever the file changes. A 30-second habit.)

## 7. Branching & hand-offs between agents
- One task = one branch: `git switch -c task/004-supply-token`.
- Any agent (Claude Code, Copilot, Claude in a Project via pasted files) works from the same files, so hand-off is: commit, push, tell the next agent "pull and do task 005".
- Merge via pull request on GitHub; skim the diff and `specs/CHANGELOG.md`.

## 8. Optional upgrades later
- **Hosting:** GitHub Pages (Settings → Pages → deploy from `main`, folder `/src` via an Actions workflow) or Netlify drag-and-drop of `src/`.
- **Linting:** `npx prettier --check src` and `npx eslint src/js` without adding dependencies to the repo.
- **Tests:** a Node script validating content data (see TECH_SPEC §13).
- **Cursor / Codex / others:** they read `AGENTS.md` natively. No extra files needed.

## Troubleshooting
- *Blank page / 404 on assets:* serve `src/` not the repo root; check paths in `index.html` are `./css/…`, `./js/…`, `./assets/…`.
- *Import script warns about leftovers:* open `src/index.html`, delete any remaining widget/snippet blocks by hand.
- *Agent edited GAME_DESIGN.md unexpectedly:* `git restore specs/GAME_DESIGN.md`, and remind it of AGENTS.md.
