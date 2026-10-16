# Task 005 — New desk-room artwork (close-up for the opening + full room)

- **Status:** done (2026-10-15)
- **Spec refs:** GAME_DESIGN §4 (opening framing), §12 (art direction); TECH_SPEC §3, §7
- **Branch:** task/005-desk-room-art

## Goal
The desk room looks like the designer's new paintings: a close-up of Pip's desk for the opening and the full room for play. All gameplay (items, hotspots, packing, opening click path) stays the same.

## Out of scope
- The plant lifting into the box (now task 006) and exit arrows (now task 007).
- New art for Pip (looking up, box on the floor) or other rooms.

## Acceptance criteria
- [x] Opening shows the close-up painting with the invite on the monitor, Pip beside the drawers and the five items where the mockups put them; desktop and 360px
- [x] Opening click path unchanged (monitor → People Operations → Pip's line → plant), keyboard included
- [x] Leaving the opening dissolves into the full room; plant highlighted and focused (reduced-motion swap: code path only, not emulated)
- [x] Full room uses the new painting; mug, plant, scroll, photo and trophy sit on the furniture as in the mockups
- [x] Pip can walk to every item and the Manager's message without crossing furniture; the Supplies exit is reachable
- [x] Old saves load; Pip is moved to walkable floor if their saved spot is now furniture
- [x] Old desk images removed; CREDITS.md records the new art
- [x] No console errors, no missing files

## Golden-path checklist (tick when verified)
Opening and desk played in the browser; rest of the path scripted against the engine.
- [x] Start → invite → reaction → plant highlighted; all five desk items collected by walking
- [x] Supplies → Lobby → exit (scripted)
- [ ] Park ending → "Another last day" (not re-run this task; unchanged code path)

## Follow-up (same day): tall plates, no blur, phone panning
- [x] Designer's extended paintings in: room 4:3 (`desk-room-tall.webp`), close-up square; original areas verified unchanged by pixel alignment
- [x] No stretched or blurred areas on desktop or phone (cap blur and opening backdrop removed)
- [x] Phone: room shown at readable size and pans to follow Pip; tapping the floor walks to the tapped spot
- [x] Opening fills the phone screen with monitor, Pip and speech in view; keyboard path; crossfade
- [x] Supplies/Lobby unchanged; scripted golden path; no console errors
- Known: on phones the bottom cards cover the nearest strip of floor, and the "Supplies →" floor button sits behind them (top tabs still work; exits are task 007).

## Notes
- The two paintings are separate, so the transition is a crossfade, not a camera move.
- A per-room Pip size factor was tried and removed: Pip's size is set by CSS, and Pip already reads at about desk height in the new room.
- Rug fix (2026-10-15): designer's edited room painting with the close-up's leaf rug; verified only the rug area changed; image URL versioned `?v=2`.
