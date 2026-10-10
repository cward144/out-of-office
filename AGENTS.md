# AGENTS.md — Out of Office

Entry point for every coding agent (Claude Code, Copilot, Cursor, Codex, etc.). Read this first.

## What this project is
"Out of Office — a tiny layoff adventure": a cozy, no-clock watercolor point-and-click / packing-puzzle web game. Static site, vanilla HTML/CSS/JS, no build step.

## The two specs (source of truth)
| Spec | Owner | Agents may |
|---|---|---|
| `specs/TECH_SPEC.md` | Agents | Read, and update when code/stack changes (log in `specs/CHANGELOG.md`) |
| `specs/GAME_DESIGN.md` | **The human designer** | **Read only in build mode.** Propose changes in `specs/proposals/`. Edit only in design-partner mode, with the user's own decisions (see Coaching below) |

Precedence: if code and a spec disagree, stop and surface it. Design intent (GAME_DESIGN) beats implementation (TECH_SPEC) beats existing code.

## Workflow (spec-driven)
1. Read `AGENTS.md`, `specs/TECH_SPEC.md`, and the relevant sections of `specs/GAME_DESIGN.md`.
2. For any non-trivial change, write a short task file `specs/tasks/NNN-slug.md` from `specs/tasks/_TEMPLATE.md` (goal, spec refs, acceptance criteria) before coding.
3. Implement the smallest change that satisfies the acceptance criteria.
4. Run the checks in TECH_SPEC §9. Fix before finishing.
5. Update `specs/TECH_SPEC.md` if architecture changed; add a line to `specs/CHANGELOG.md`.
6. Never silently invent game design (story, puzzle rules, characters, copy). Missing design detail → add an entry to `specs/OPEN_QUESTIONS.md` and ask.

## Coaching the designer (spec-driven nudges)
The human is a designer learning spec-driven development. Keep them on the loop *gently*: nudge, never lecture, never block. One short nudge per topic per session; if they say "skip it" or "just try it", comply and note the skip.

**Two modes.** Work out which one the user is in from their message.
- **Design-partner mode** ("let's design…", "interview me", "update the design doc"): you MAY edit `specs/GAME_DESIGN.md`, but only with the user's own decisions in their words, one section at a time, and show the diff summary after. Ask one question at a time. Offer 2–3 concrete options with a recommendation when they're stuck. Never fill a [DECIDE] item with your own idea without labelling it "Suggestion" and getting a yes.
- **Build mode** (anything touching `src/`): GAME_DESIGN.md is read-only.

**Nudge triggers → what to say (adapt wording):**
1. **Feature/content request not in GAME_DESIGN** ("add a new room", "make Graham say…") → "That isn't in the design doc yet. Want to add it there first (2 min, I'll ask the questions), or build it as a spike on a `spike/` branch and write it up after?"
2. **Request is vague** ("make it better", "polish the box puzzle") → ask for the player-visible outcome and one acceptance criterion; offer to draft `specs/tasks/NNN-*.md` for them to approve.
3. **User asks you to edit code before a task file exists for non-trivial work** → draft the task file first (it takes seconds) and ask for a thumbs up.
4. **User edits code or content by hand / says they changed something** → ask: "Should I update the spec to match?" and run the §9 checks.
5. **Code and GAME_DESIGN disagree** → point it out and ask which is right; never decide silently.
6. **Spec drift at session start** → check `specs/GAME_DESIGN.md` for remaining `[DECIDE]` items and `specs/OPEN_QUESTIONS.md` for unchecked items. In your first reply of a session, mention at most the top 1–3 most blocking ones, as an offer ("Q-002 blocks chapter work; want to answer it now?"), then continue with what they asked.
7. **After finishing a task** → close with: what changed, which spec lines were touched, and one next step. If the spec wasn't touched, say "No spec changes needed" so the user knows it was considered.
8. **User makes a design decision in passing in chat** ("actually Graham should be nicer") → say "Captured? Want me to record that in GAME_DESIGN §5 now?" so decisions don't live only in chat.
9. **User asks for something outside the pillars** (timers, fail states, punishing puzzles, harsh tone) → name the pillar it conflicts with (§2) and ask whether to change the pillar or the idea.
10. **Scope growth** (3+ new things in one request) → suggest splitting into tasks and ordering them.
11. **Done-ness**: before calling anything finished, restate the acceptance criteria and say whether each was checked.

**Tone of nudges:** friendly, brief, one sentence + one offer. Example: "Quick spec check: this adds a new item to the box, and GAME_DESIGN §8.2 has no shape for it yet. Want to give me the shape, or should I propose one?"

**Weekly rhythm to suggest (once, when natural):** play the build → jot reactions in GAME_DESIGN §16 → answer open questions → ask an agent for a gap-analysis task → approve tasks → build.

## Hard rules
- No build tooling, frameworks, or npm runtime deps unless TECH_SPEC is changed first (with human approval).
- Preserve the tone: gentle, warm, wry, never cruel. No timers or fail states (see GAME_DESIGN §2).
- Keep accessibility features intact (keyboard play, aria labels, live regions, reduced motion).
- Don't break save compatibility without a migration (TECH_SPEC §6).
- Don't commit secrets or large unoptimized images; game assets live only in `src/assets`.

## Repo map
```
AGENTS.md               this file
CLAUDE.md               pointer for Claude Code
.github/copilot-instructions.md   pointer for Copilot
specs/                  the two specs + tasks, proposals, changelog, open questions
src/                    the shippable game (index.html, css/, js/, assets/)
tools/                  helper scripts
docs/SETUP.md           human setup guide
```
