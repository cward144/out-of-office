# Task 011 — Second walking step

- **Status:** done (2026-10-16)
- **Spec refs:** GAME_DESIGN §5 (Pip); TECH_SPEC §3 (Characters)
- **Branch:** task/011-second-step

## Goal
Pip's walk uses the designer's second step drawing: step, stand, other step, stand.

## Acceptance criteria
- [x] Walk cycle shows both steps in order, every pose at the same figure height
- [x] Feet stay on the floor and the Open box button sits on the box in the new frame
- [x] No console errors
- [ ] Reduced motion (bounce off): CSS in place; not emulated

## Notes
- The second step is drawn ~10% larger on its canvas; sprite metadata normalises it.
