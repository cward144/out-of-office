# Task 002 — Packed items show their own art, unstretched

- **Status:** done (2026-10-10)
- **Spec refs:** GAME_DESIGN §8.2, §12; TECH_SPEC §4, §5
- **Branch:** task/002-packed-item-art

## Goal
In the box grid, every packed item shows its own illustration at its natural (square) proportions, centred in its tile, whatever the tile's shape (1×2, 3×2, 4×1…).

Reported by the designer 2026-10-10 (art "stretched out funny" in non-square tiles). In the imported build the same rule (`#grid .packed-item .item-art`, `background-size:contain; background-position:center`) actually shows the whole `items.webp` sprite sheet in every tile.

## Out of scope
- Redrawing or re-encoding item art.
- Art sizing anywhere other than the box grid (shelf, scene, park).

## Acceptance criteria
- [x] Each packed tile shows only its item's sprite cell from `items.webp` (4×3 sheet of square cells)
- [x] The art is square, ~70% of the tile's shorter side, centred, in every tile shape and rotation
- [x] The full-mug water mark and the hover label still display
- [x] No console errors
- [x] Checked at 360px and 1280px widths

## Golden-path checklist (tick when verified)
Not re-run: CSS-only change scoped to `#grid .packed-item`. Verified with a restored mid-game save (plant 2×2, mug 1×2 full, poster 3×1, award 3×2, sketchbook 3×2).
- [ ] Start → pack plant and mug → leave desk
- [ ] Supplies → Lobby → exit
- [ ] Park ending → "Another last day" restarts cleanly

## Notes / open questions
- The designer's screenshot looks like a newer build than the published site (single item art, stretched). If the ChatGPT project has unpublished changes, they are not in `src/` yet.
