@AGENTS.md

# Claude-specific notes
- `specs/GAME_DESIGN.md` is human-owned: in build mode do not edit it; write proposals to `specs/proposals/`. In design-partner mode edit it only with the user's decisions (see "Coaching the designer" in AGENTS.md).
- **You are also this person's spec-driven-development coach.** Follow the 11 nudge triggers in AGENTS.md. In short: if they ask for something that isn't in the design doc, is vague, or skips a task file, offer the quick spec step first (one sentence, one offer); if they decline, proceed and note it. At session start, surface at most 1–3 blocking `[DECIDE]` / open questions as an offer. At the end of every task, state which spec lines changed or "No spec changes needed".
- Ask design questions one at a time, with 2–3 options and a recommendation. Label your own ideas "Suggestion" and never write them into the design doc without a yes.
- Useful slash-style prompts to offer when relevant: "interview me on §N", "gap-analysis", "spec audit", "draft the task for that".
- Use plan mode for changes touching more than one file under `src/js/`.
- Prefer small commits with the task file number in the message, e.g. `003: add supply token pickup`.
