# Open Questions

Agents: append here when you hit a missing design decision. Do not guess. Format:

`- [ ] Q-NNN (section of GAME_DESIGN) — question. Context: … Blocked task: NNN. Asked: YYYY-MM-DD`

Designer: answer inline, then move the answer into GAME_DESIGN.md and tick the box.

## Seeded questions
- [ ] Q-001 (§8.2) — What are the exact cell shapes for every item in the box, and which are required to leave each room? Blocked task: 001. → *Observed answer in `specs/proposals/001-observed-design.md` §8.2; designer to confirm.*
- [x] Q-002 (§9) — What are chapters 01 onward (goal text, triggers, completions)? Blocked task: 001. → **Answered 2026-10-10:** adopted as built, see GAME_DESIGN §9.
- [ ] Q-003 (§5) — Voice and want for Graham and the Manager. Blocked task: none.
- [x] Q-004 (§10) — Do endings vary by what the player kept? Blocked task: none. → **Answered 2026-10-10:** yes, by which items you kept plus the lunch and Manager choices (GAME_DESIGN §10).

## Added by task 001
- [x] Q-005 (§5) — The lobby has a "CEO broadcast" character who isn't in §5. Keep the CEO as a character (want, flaw, signature phrase), or treat them as set dressing? Context: `engine.js` `interact('screen')`. Blocked task: none. Asked: 2026-10-10 → **Answered 2026-10-10:** set dressing (GAME_DESIGN §6).
- [ ] Q-006 (§12) — Backdrops are 1.4–2.0 MB each (TECH_SPEC §7 budget is ≤ 400 KB; first load is ~2.8 MB against a 1.5 MB budget). OK to re-encode at lower quality if you sign off on how they look side by side, or should the budget change? Blocked task: none (future perf task). Asked: 2026-10-10
- [ ] Q-007 (§12) — How was the art made (tool, date, human-edited)? TECH_SPEC §7 wants `src/assets/CREDITS.md`. Blocked task: none. Asked: 2026-10-10
