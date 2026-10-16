# Task 010 — New Pip, opening poses and new Graham

- **Status:** done (2026-10-16)
- **Spec refs:** GAME_DESIGN §4 (opening), §5 (characters), §12 (art); TECH_SPEC §3, §5, §7
- **Branch:** task/010-new-characters

## Goal
Pip and Graham use the designer's new drawings everywhere: Pip (cream collared shirt, navy vest with cream trim) walking in every room and on the start screen, his three opening poses, and new dialogue portraits for Pip and Graham.

## Out of scope
- The ten-item art swap (waiting for the slip, token and lever drawings).
- Redrawing the park's sitting Pip (optional redo by the designer).

## Acceptance criteria
- [x] Rooms: Pip uses the new standing-with-box drawing; walking alternates it with the step drawing plus a small bounce; facing left mirrors him; feet stay on the floor; the "Open box" button sits on the box
- [x] Start screen shows the new Pip
- [x] Opening: pose 1 (box, looking up at the monitor) during the invite; pose 2 (box set down, looking up at the plant) with "Guess we're both taking this personally."; then the room
- [x] Graham uses the new standing drawing in the Lobby; dialogue portraits for Pip and Graham use the new portraits
- [ ] Reduced motion: frame swaps without bounce (CSS in place; not emulated)
- [x] Desktop and 360px; no console errors

## Notes
- Walking uses the designer-approved fallback: step drawing ↔ standing drawing.
- Pip drawings are WebP with transparency; Graham's magenta background is keyed out locally (PNG).
- Pip's six WebP drawings are 1.7 MB in total, uncompressed; worth re-saving smaller when a WebP encoder is available (Graham PNGs were scaled to 520 / 240 px).
- Tested: opening (desktop and 360px), kneel pose, walking frames and facing, Graham in the Lobby, both portraits, scripted golden path; console clean.
