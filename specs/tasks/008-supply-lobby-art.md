# Task 008 — New Supplies and Lobby paintings

- **Status:** done (2026-10-15)
- **Spec refs:** GAME_DESIGN §6, §12; TECH_SPEC §3, §7
- **Branch:** task/008-supply-lobby-art

## Goal
Supplies and the Lobby use the designer's new paintings (from their mockups), cropped to fit every screen like the desk room, with exits at painted doorways. Gameplay is unchanged.

## Out of scope
- Packing tape (in the mockup, not in the game).
- The park ending's art (still the old camera).

## Acceptance criteria
- [x] Both rooms use the new tall paintings with no stretching or blur, desktop and 360px
- [x] Supplies: cooler, printer, pegboard lever, drawer cabinet and Bea line up with the art; the printer seal → socket → open tray overlays sit on the printer; the drawer lock is on the bottom-left drawer
- [x] Supplies puzzle played by walking: water → peel seal → lever → tray opens → token → drawer → Bea gets her sketchbook
- [x] Lobby: Graham beside the elevator, CEO screen and elevator hotspots; "EXIT CLEARED" on the elevator header and the goose sticker by the call panel after Graham clears you; elevator → park ending
- [x] Exits at the painted doorways both ways; on phones arrows stay on screen and above the bottom cards
- [x] Every hotspot and exit reachable from every arrival point (checked by pathfinding)
- [x] Old saves with Pip in old positions snap onto the new floor; no console errors

## Golden-path checklist (tick when verified)
- [x] Desk → Supplies puzzle (walking) → Lobby (placed directly; walking is throttled while the test browser is hidden)
- [x] Graham → elevator → ending
- [x] Scripted engine path to the ending

## Notes
- Each painting's 16:9 core: Supplies top 12.9%, Lobby top 11% (75% of height). Overlays are room-scoped CSS at the end of `game.css`.
- Known (phones): the bottom cards still cover the nearest strip of floor; Pip can stand partly behind them near the front doorways.
- Not checked: reduced-motion emulation; screen reader.
