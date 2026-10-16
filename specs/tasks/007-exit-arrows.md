# Task 007 — Exit arrows instead of room tabs

- **Status:** done (2026-10-15)
- **Spec refs:** GAME_DESIGN §6 (moving between rooms, decided 2026-10-13); TECH_SPEC §3, §5
- **Branch:** task/007-exit-arrows

## Goal
Players move between rooms with one small exit arrow per way out, not the Desk / Supplies / Lobby tabs. Pip walks to the exit carrying the box, the room fades out, and Pip arrives at the matching side of the next room.

## Out of scope
- New doorway art for Supplies and the Lobby (their side walls have no painted doors, so their exits are edge arrows on the floor).
- The elevator exit to the park (unchanged: Graham → elevator).

## Acceptance criteria
- [x] The room tabs are gone in every room; the menu still works
- [x] Desk: one "Supplies →" arrow at the painted doorway. Supplies: "← Your desk" on the left, "Lobby →" on the right. Lobby: "← Supplies" on the left
- [x] On phones the arrow stays on screen: when its doorway is panned out of view it waits at the screen edge on that side, and it sits above the bottom cards
- [x] Clicking/tapping or Enter on an arrow walks Pip to that exit, fades the room (short; none with reduced motion) and Pip appears at the matching side of the next room
- [x] Before the plant and mug are packed, exits still say "Room for the plant and mug first." and nothing moves
- [x] Hidden during the opening; keyboard reachable with a visible focus ring and a clear accessible name ("Go to Supplies")
- [x] Saves taken mid-room still load; no console errors; desktop and 360px

## Golden-path checklist (tick when verified)
- [x] Start → pack plant and mug → leave desk by the arrow (packing from a save)
- [x] Supplies → Lobby → back to Supplies → back to the desk (Pip arrives on the matching side each time)
- [x] Scripted path to the ending

## Notes
- The hint "Choose Supplies above the scene, or use the room exit on the right." refers to the removed tabs; reworded to point at the arrow.
- Keyboard: the arrows are ordinary buttons (Tab + Enter) with names like "Go to Supplies"; checked by name/role, not with a screen reader.
- Reduced-motion: code path skips the fade; not emulated.
- Supplies and the Lobby use edge arrows because their paintings have no side doorways; painted doorways could come with their tall repaints.
