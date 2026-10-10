# specs/

| File | Who writes it | Purpose |
|---|---|---|
| `GAME_DESIGN.md` | **You** (with a design-partner chat if you want one) | What the game is, feels like, and contains |
| `TECH_SPEC.md` | **Agents** (you approve stack changes) | How it is built and coding rules |
| `OPEN_QUESTIONS.md` | Agents append, you answer | Design gaps agents hit while coding |
| `CHANGELOG.md` | Agents | One line per merged task |
| `tasks/NNN-slug.md` | Agents (or you) | One unit of work with acceptance criteria |
| `proposals/NNN-slug.md` | Agents | Suggested edits to GAME_DESIGN for you to accept or reject |
| `refs/` | You | Reference art, mood boards, writing samples |

## The loop
1. **You** edit `GAME_DESIGN.md` (or answer `OPEN_QUESTIONS.md`).
2. Ask an agent: *"Diff GAME_DESIGN against the build and create tasks for the gaps."*
3. Agent writes `tasks/NNN-*.md`; you skim and approve.
4. Agent implements, runs the TECH_SPEC §9 checks, updates TECH_SPEC and CHANGELOG.
5. You play it. Repeat.

## Handy prompts
- **Design partner (you + chat):** "Read specs/GAME_DESIGN.md. Interview me one section at a time to fill in the [DECIDE] items. Don't write code. Update only the doc, with my wording."
- **Gap analysis:** "Compare specs/GAME_DESIGN.md with src/. List mismatches as tasks in specs/tasks/. Don't change code yet."
- **Implement:** "Do specs/tasks/004-*.md. Follow AGENTS.md."
- **Spec audit:** "Verify every 🟡 item in specs/TECH_SPEC.md against the code and correct the spec."
