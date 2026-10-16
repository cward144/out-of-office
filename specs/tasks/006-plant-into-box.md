# Task 006 — The plant goes into the box

- **Status:** done (2026-10-16)
- **Spec refs:** GAME_DESIGN §4 (opening step 4); TECH_SPEC §3
- **Branch:** task/010-new-characters (built together with task 010)

## Goal
When the player picks up the desk plant in the opening, Pip kneels beside his open box and lowers the plant in (designer's pose 5), then stands back up with the box. The plant is gone from the desk.

## Acceptance criteria
- [x] Clicking the plant (mouse, touch, keyboard) shows the kneeling pose at Pip's spot for about 1.5 s, then the standing pose returns
- [x] Only for the plant; other items keep the existing pickup effect
- [x] Inventory and save update once; repeat clicks can't replay it
- [ ] Reduced motion: the pose appears and disappears without fades (CSS in place; not emulated)
- [x] The 3×2 packing tutorial then continues as before
