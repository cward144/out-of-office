# Task 009 — New park ending

- **Status:** done (2026-10-15)
- **Spec refs:** GAME_DESIGN §10, §12; TECH_SPEC §3, §7
- **Branch:** task/009-park-ending (stacked on task/008-supply-lobby-art)

## Goal
The closing park scene matches the designer's mockup: their park painting, Pip and Bea sitting on the blanket, the new keepsake art on the blanket, and the mockup's closing card. Ending logic is unchanged.

## Out of scope
- New ending text or choices.
- Walking in the park (the scene is static).

## Acceptance criteria
- [x] Joined Bea, everything kept: Pip holds the mug, Bea opens the thermos, keepsakes on the blanket, Bea's own book beside her; card styled like the mockup (italic serif line, gold rule, Arrange keepsakes)
- [x] Lunch alone: Pip alone, paws in lap; "No rush. I'm staying a while."
- [x] Mug not kept → paws in lap; nothing kept → empty blanket, Arrange hidden
- [x] Arrange keepsakes: items move to the bench / beside Bea / at our feet; moving the mug takes it out of Pip's hands; spot buttons stay on screen and clear of the card
- [x] Desktop (framed like the mockup) and 360px (card under the heading, blanket fully visible); nothing stretched
- [x] "Another last day" restarts with the opening; no console errors

## Golden-path checklist (tick when verified)
- [x] Ending states loaded from saves and played in the browser
- [x] Scripted engine path to the ending (unchanged code path)
- [ ] Full click-through from the start (not done this task)

## Notes
- Keepsakes are PNG (no local WebP encoder), cut apart from the designer's sheet and scaled to 280 px; ~825 KB total, loaded only at the ending.
- The keepsake picker still says "Unpack"/"Select keepsakes to unpack" although kept items already rest on the blanket; wording left for the designer.
- Not checked: reduced motion, screen reader.
