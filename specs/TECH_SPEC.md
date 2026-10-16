# TECH SPEC — Out of Office

**Audience:** coding agents (and humans reviewing them). **Owner:** agents; the human approves stack changes.
**Status legend:** ✅ observed in the existing build · 🟡 assumed / verify against code · ⬜ not yet decided

> First drafted from the saved HTML shell; verified against the real `src/` code in task 001 (2026-10-10). Remaining 🟡 items are genuine unknowns.

## 1. Stack
- ✅ Static site: HTML5 + CSS + vanilla JavaScript. **No framework, no bundler, no build step.**
- ✅ Scripts loaded with `<script defer>` in this order: `engine.js`, `navigation.js`, `camera.js`, `game.js`.
- ✅ Cache-busting: CSS/JS URLs in `index.html` carry `?v=<tag>` (currently `010-characters-4`; image URLs that change in place get their own `?v=`). Bump the tag whenever `src/css` or `src/js` changes, or returning players get stale files.
- ✅ Art is WebP raster (watercolor backdrops and sprites) plus CSS/inline SVG for small icons.
- ✅ Fonts: DM Sans (body) and Space Grotesk, self-hosted as variable `woff2` (weights 400–700, latin + latin-ext) in `src/assets/fonts/`, declared with `@font-face` at the top of `game.css`. No font CDN.
- ⬜ Runtime dependencies: none allowed without a spec change.
- ✅ Hosting: **GitHub Pages**, https://cward144.github.io/out-of-office/. `.github/workflows/pages.yml` uploads `src/` as-is on every push to `main` (no build step). Must still work from any plain static server; `file://` is best-effort. All asset paths stay relative so the `/out-of-office/` sub-path works.

## 2. Repo layout
```
src/
  index.html
  css/game.css
  js/engine.js        ✅ pure rules + most content, no DOM: item table (names, shapes, copy),
                         fresh state, box size, packing rules (canPlace/pack/autoPack/placementIssue/
                         readiness/travelIssue), interact() dialogue for every hotspot, goal text,
                         departure + ending text, save validate()/migration. Global `OfficeGame`.
  js/navigation.js    ✅ walkable floor: per-room obstacle rectangles, 25×24 grid BFS pathing
                         (8-way, no corner cutting), safePosition(). Global `OfficeNav`.
  js/camera.js        ✅ projection between logical % coordinates and screen pixels for the
                         three-band scene (cap / architecture / floor). Global `OfficeCamera`.
  js/game.js          ✅ DOM/UI: hotspot positions (`spots`), room images, chapter labels, choice
                         menus, hint ladder text, walking loop, box dialog, notebook, park ending,
                         sound, save/load to localStorage, menu, keyboard handling.
  assets/*.webp       backdrops and sprites
  assets/fonts/       self-hosted woff2 + README (licences)
specs/                specs, tasks, proposals
tools/                dev scripts (no runtime role)
```
Keep one responsibility per file. If `game.js` grows past ~1500 lines, propose a split (e.g. `content.js`, `packing.js`, `dialogue.js`) as a task before doing it.

## 3. Architecture
- ✅ **Screens:** `#start`, `#play`, `#ending` sections toggled via `hidden`; current screen in `#game-shell[data-screen]`.
- ✅ **Exits** (task 007): no room tabs (`#play .rooms` hidden). `exits` in `game.js` lists each room's ways out (`to`, side, logical x/y): every exit sits at a painted doorway (task 008): desk → Supplies; Supplies → desk (left) / Lobby (right); Lobby → Supplies (left). `placeExits()` also keeps arrows above the bottom cards on phones. `#door-left`/`#door-right` are filled by `renderExits()` and placed by `placeExits()`, which pins an arrow to the screen edge when its doorway is panned out of view. `room(id)` walks Pip to the exit, fades `#scene` out (`.room-leave`, 0.2 s), switches rooms and places Pip just inside the matching exit (`arrivalFrom()`), then fades in. Reduced motion: no fades.
- ✅ **Rooms:** `desk`, `supply`, `lobby`; current room in `#scene[data-room]`. Room backdrops swap `src` on `#office-art`, `#office-cap`, `#office-floor` (three layers of the same wide image: cap / architecture / floor).
- ✅ **World space:** `#world-space` is a percentage-based coordinate space (`left`/`top` in %) holding props, hotspots, NPCs, and Pip. Positions are data, not hard-coded in CSS.
- ✅ **Interactables:** `button.scene-object` (collectable props) and `button.hotspot` (labelled points). Both carry `data-object` / `data-hotspot` ids and are generated from data. Hotspot `top` is derived from `data-world-y`.
- ✅ **NPCs:** Bea (rabbit designer), Graham (security goose) as `button.npc`; shown/hidden per chapter.
- ✅ **Dialogue:** native `<dialog id="dialogue">` with speaker, optional portrait, text, hint, and action buttons. Also an inline `#scene-story` line for ambient narration.
- ✅ **Packing puzzle:** native `<dialog id="box-dialog">`; grid is **3 × 2** until plant + mug are both packed (`flags.tutorial`), then **6 columns × 4 rows** for the rest of the game (`OfficeGame.boxSize`); shelf of waiting items; rotate, auto-pack ("Help me fit it"), set aside, undo, hint, readiness text, "Why?" rule details.
- ✅ **Notebook:** `<aside id="notebook-panel">` with journal tasks, note-to-self, pocket items, hint button, chapter progress.
- ✅ **Park ending layout** (task 009): `#park-frame` holds the park painting (`assets/park/park-room-tall.webp`, 1448×1086) and is sized by `fitPark()`: landscape screens frame the mockup's view (the painting's middle band), portrait phones cover-fit; nothing is stretched. Pip (`pip-sitting[-mug].webp`), Bea (`bea-sitting.webp`) and the keepsakes (`keepsake-*.png`) are placed in % of the painting. `parkSlots` gives each keepsake its blanket spot; `parkZones` the bench / beside Bea / at our feet rows used after arranging. Pip holds the mug when it's kept and not arranged. On narrow screens `parkSquash` pulls slots toward the centre. `placeParkProps()` keeps the spot buttons on screen and clear of the closing card, which sits under the heading on portrait phones.
- ✅ **Ending:** park scene with three drop zones (`bench`, `bea`, `ground`), keepsake selection, "Arrange keepsakes", "Settle in with Bea", recap.
- ✅ **Menu:** sound switch, how to play, notebook, show-labels switch, restart.
- ✅ **Hotspots are built at runtime** from the `spots` table in `game.js` (`[id, label, x, y, walkX, walkY]` per room), not static HTML.
- ✅ State is a single plain object (`OfficeGame.fresh()`) serialized to JSON: `{version, started, room, collected[], packed{id:{x,y,r}}, flags{}, hints{}, position{x,y}, ended, park{}, settled, parkLast}`. Progress is driven by boolean `flags` (e.g. `tutorial`, `label`, `water`, `printer`, `bea`, `gate`, `invited`, `boss`). UI re-renders from state via `render()`.
- ✅ **Desk room** (task 005): tall plate `desk-room-tall.webp` (1448×1086) shown with the camera's **cover mode**: `OfficeCamera.layout(w,h,ending,art,focusX)` crops the painting to fill the screen (never stretches), centres the original 16:9 room (the "core", `roomArt.desk` = top 14.7%, height 74.8%) and, when the painting is wider than the screen (phones), pans to keep Pip (`focusX`) centred. `configureCamera()` sets `--img-*`/`--world-*` vars and `#scene[data-camera=cover]`; `walkTo()` re-fits each step so the view follows Pip (0.25 s slide; instant on room/size change and with reduced motion). Logical coordinates stay relative to the core, so `OfficeNav.obstacles.desk`, `deskObjects` and `spots.desk` are unchanged. Hotspot labels are only nudged on-screen when their marker is on screen. Supplies (`supply-room-tall.webp`, core top 12.9%) and the Lobby (`lobby-room-tall.webp`, core top 11%) use cover mode too (task 008), with room-scoped CSS for their overlays (printer seal/socket/tray, lever hook on the pegboard, drawer lock, Bea, Graham, exit light). The park ending has its own painting frame (see Park ending layout); the three-band camera is no longer used by any room.
- ✅ Chapter is derived from flags, not stored: 00 until `tutorial`, 01 until `printer`, 02 until `gate`, then 03.
- ✅ **Characters** (task 010): Pip's drawings live in `assets/pip/` and are described in `pipSprites` (`game.js`): canvas size, figure top/bottom, feet x and box rect, so `paintPip()` scales every pose to the same figure height, keeps the feet on the floor and puts the "Open box" button on the box. Walking alternates `pip-step` with `pip-stand` every 3 path points with a small bounce; facing left mirrors the drawing. `showPackPose()` (task 006) swaps in `pip-pack-plant` for 1.5 s when the desk plant is collected. Opening poses (`openingPoses`, `placeOpeningPip()`) are placed in % of the close-up with Pip's line anchored to the pose's head. Graham: `assets/graham/graham-stand.png` and `graham-portrait.png` (magenta keyed out locally); Pip's portrait `assets/pip/pip-portrait.webp`.
- ✅ **Opening** (GAME_DESIGN §4, task 004): while `!flags.inviteRead`, `game.js` runs a UI-only `openingStep` (`quiet` → `invite` → `message` → `reaction`) mirrored on `#game-shell[data-opening]`. CSS hides the room tabs, doors, box, notebook, hotspots and story strip; JS guards `move`, `interactAtSpot`, `room`, `openPendingBox`, `requestHint` and the B/arrow keys. The step isn't saved: reloading restarts from `quiet`. The opening draws on its own layer, `#opening-stage` (task 005), over `#scene`: the square close-up plate `desk-closeup.webp` (1254×1254; original close-up at top 26.8%, height 56.3%) in `#opening-frame`, which `fitOpeningStage()` cover-fits around image x 47% / y 55% (crop only, no blur). Everything in the frame is placed in % of the square image: `#monitor-invite` on the screen (x 26.9%, y 35.75%, w 20.9%, h 11.82%), decorative copies of the five desk items, a still `#opening-pip`, and `#pip-speech` (nudged on-screen by `fitSpeech()`). Leaving the opening crossfades the stage out (`.leaving`, 0.9 s, scale 1.12) into the full room; reduced motion swaps instantly. The two plates are painted separately, so this is deliberately a crossfade, not a camera move. Finishing sets `inviteRead` and hands over to the plant tutorial.

## 4. Coding style
- ES2020+, `"use strict"`, no modules required. ✅ Existing namespace: each file is an IIFE that exports one global — `OfficeGame` (engine), `OfficeNav` (navigation), `OfficeCamera` (camera); `game.js` consumes them as `G`, `N`, `C`. The non-UI files also `module.exports` their API when `module` exists, so they can be loaded by a test script. Reuse these; don't add new globals.
- ⚠️ **Existing code predates these style rules** (observed in task 001): it is compacted onto long single lines, uses single quotes, and builds some markup with `innerHTML` (11 places in `game.js`; all interpolate static item/label data, not user input). Content is split between `engine.js` (items, dialogue) and `game.js` (hotspot positions, hint ladder, chapter labels). Apply the rules below to new and touched code; don't reformat whole files outside a dedicated task.
- `const` by default, no `var`. Functions small and named. Early returns over nesting.
- 2-space indent, semicolons, double quotes, LF line endings, UTF-8. (`.editorconfig` enforces.)
- Naming: `camelCase` functions/vars, `PascalCase` only for constructors/classes, `UPPER_SNAKE` constants, `kebab-case` for CSS classes and ids, asset files `kebab-case.webp`.
- **Content is data.** Dialogue, items, chapters, room layouts, hotspot positions and item shapes live in plain data structures at the top of their file (or a `content` file), not inline in logic.
- DOM: build with `textContent` / `createElement`; never `innerHTML` with dynamic strings (XSS and a11y hygiene).
- CSS: custom properties on `:root` for palette, spacing, radii, shadows. No `!important` unless commented why. Mobile-first; verify at 360px wide and 1280px wide.
- Comments explain *why*, not *what*. Link to spec sections where a rule comes from, e.g. `// GAME_DESIGN §5.2`.

## 5. Accessibility (non-negotiable)
- ✅ Every interactive element is a real `<button>` with an accessible name. Keep `aria-label`, `aria-describedby`, `aria-current`, `role="switch"` + `aria-checked`, and `aria-live` regions.
- ✅ Whole game playable by keyboard: arrow keys walk, Enter selects/places, `B` opens the box (see box controls text).
- Respect `prefers-reduced-motion`: disable walking tweens > 150ms, sprite bobbing, and fades.
- Colour contrast ≥ 4.5:1 for text; do not convey state by colour alone.
- Focus is moved into dialogs on open and returned on close (native `<dialog>` + `showModal()`).
- "Show labels" toggle must keep working: it flips `#scene[data-labels]` between `quiet` and `loud`.

## 6. Persistence
- ✅ Progress saved on-device ("Progress saved on this device"); "Continue your last day" restores it. Storage is `localStorage`, key **`out-of-office-v1`** (the key name is historical; the payload is `version: 3`). The "Show labels" preference is stored separately under `out-of-office-labels`.
- ✅ `save()` wraps `setItem` in try/catch and shows `#save-warning` on failure. Load goes through `OfficeGame.validate()`, which accepts versions 1–3, whitelists flags/hint keys, replays every packed item through `pack()` (rejecting the save if any placement is invalid), and migrates v1 → v2 (sets `tutorial`, derives `favorKnown`/`favorFocus`/`lunchChosen`) and v1/v2 → v3 (sets `inviteRead` for started games, so existing players skip the new opening). Invalid saves return `null` and the game starts fresh.
- Wrap all storage access in try/catch. On failure show `#save-warning` (role="alert") and keep playing in memory.
- Save data has a `version` integer. **Any change to the save shape requires bumping `version` and a migration function.** Never throw away a player's save silently.
- Restart wipes the save only after confirmation.

## 7. Assets
- **Tall plates** (task 005): room backdrops are painted taller than 16:9 so every screen is filled by cropping: full rooms 4:3 with the original 16:9 room full-width in the middle (open floor below, wall/ceiling above); opening close-ups square. Record where the 16:9 core sits (`roomArt`).
- Format: WebP, ≤ 400 KB per backdrop, ≤ 120 KB per sprite where possible. Wide backdrops share one image across cap/architecture/floor layers.
- Naming: `<subject>-<variant>.webp`, e.g. `desk-room-tall.webp`, `pip-watercolor.webp`, `park/pip-sitting-mug.webp`. Cut-outs that need transparency and can't be encoded as WebP locally are PNG (`park/keepsake-*.png`, ≤ 280 px).
- Every `<img>` has meaningful `alt` or `alt=""` + `aria-hidden` when decorative.
- Lazy-load anything not needed on first paint (`loading="lazy"`); the start-screen art uses `fetchpriority="high"`.
- Provenance: record how each asset was made in `src/assets/CREDITS.md` (tool, date, human-edited yes/no).

## 8. Audio
- ✅ Current sound is **synthesized with Web Audio** (no files): `tone(type)` plays short note sequences for `tap`, `pack`, `paper`, `water`, `latch`, `honk`, `success`; `ambience()` loops a quiet per-room/park pattern. Skipped when the tab is hidden.
- ⬜ Sound is a user opt-in (`#sound` switch, default Off). No autoplay. Audio files, if added, are compressed `.ogg`/`.mp3` under 150 KB each. Specify format when sound content is designed.

## 9. Quality gates (run before finishing any task)
1. Open `src/index.html` via a local static server (`python3 -m http.server 8000 -d src`). Console must be free of errors and warnings.
2. Play the golden path start → ending once (checklist in `specs/tasks/_TEMPLATE.md`).
3. Keyboard-only pass of the area you changed.
4. Reload mid-game: save restores correctly. Test with an *old* save if the schema changed.
5. Check 360px and 1280px widths.
6. If `tools/lint.sh` exists, run it. (⬜ none yet; optional future: Prettier + ESLint via `npx`, not added to the repo as deps.)

## 10. Performance budget
- First meaningful paint < 2s on a mid-range phone over 4G; total initial payload < 1.5 MB.
- No layout thrash in the walk loop: animate with `transform`/`left/top` percent updates batched in `requestAnimationFrame`.

## 11. Security & privacy
- No third-party scripts, analytics, or trackers. No network calls at runtime. ✅ Verified in task 001: every request is same-origin (fonts self-hosted).
- Strip hosting-tool widgets and tracking snippets from any imported HTML (the original export contained an editor widget and a bot-challenge snippet; `tools/import_saved_page.py` removes them).

## 12. Git & collaboration
- Branch per task: `task/NNN-slug`. Small commits: `NNN: imperative summary`.
- Changes to `specs/GAME_DESIGN.md` are made **only by the human**. Agents write `specs/proposals/NNN-slug.md`.
- Update this file in the same commit as the code change that makes it stale.

## 13. Known gaps / to verify
- 🟡 **Asset budget is exceeded.** Wide backdrops are 1.4–2.0 MB each (§7 says ≤ 400 KB) and the first paint loads ~2.8 MB (§10 says < 1.5 MB). Needs a re-encode task; check visual quality with the designer.
- 🟡 `src/assets/CREDITS.md` exists (task 005); provenance of the art imported from the original build is still unknown (Q-007).
- ⬜ Automated tests: none. Candidate: a tiny Node script that validates content data (every item has a shape that fits the 6×4 box; every dialogue id referenced exists).
