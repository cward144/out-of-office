# TECH SPEC — Out of Office

**Audience:** coding agents (and humans reviewing them). **Owner:** agents; the human approves stack changes.
**Status legend:** ✅ observed in the existing build · 🟡 assumed / verify against code · ⬜ not yet decided

> Written from the saved HTML shell of the existing build. The JS/CSS were not available when this was drafted, so items marked 🟡 must be verified against `src/js/*` and corrected. Do that as task 001.

## 1. Stack
- ✅ Static site: HTML5 + CSS + vanilla JavaScript. **No framework, no bundler, no build step.**
- ✅ Scripts loaded with `<script defer>` in this order: `engine.js`, `navigation.js`, `camera.js`, `game.js`.
- ✅ Art is WebP raster (watercolor backdrops and sprites) plus CSS/inline SVG for small icons.
- ⬜ Runtime dependencies: none allowed without a spec change.
- ⬜ Hosting: any static host (GitHub Pages, Netlify, Cloudflare Pages). Must work from a plain static server; `file://` is best-effort.

## 2. Repo layout
```
src/
  index.html
  css/game.css
  js/engine.js        🟡 state store, save/load, events, shared utilities
  js/navigation.js    🟡 walking, pathing, room transitions, hotspots
  js/camera.js        🟡 scene framing / world-space → screen mapping
  js/game.js          🟡 content (chapters, dialogue, items), UI wiring, puzzles
  assets/*.webp       backdrops and sprites
specs/                specs, tasks, proposals
tools/                dev scripts (no runtime role)
```
Keep one responsibility per file. If `game.js` grows past ~1500 lines, propose a split (e.g. `content.js`, `packing.js`, `dialogue.js`) as a task before doing it.

## 3. Architecture
- ✅ **Screens:** `#start`, `#play`, `#ending` sections toggled via `hidden`; current screen in `#game-shell[data-screen]`.
- ✅ **Rooms:** `desk`, `supply`, `lobby`; current room in `#scene[data-room]`. Room backdrops swap `src` on `#office-art`, `#office-cap`, `#office-floor` (three layers of the same wide image: cap / architecture / floor).
- ✅ **World space:** `#world-space` is a percentage-based coordinate space (`left`/`top` in %) holding props, hotspots, NPCs, and Pip. Positions are data, not hard-coded in CSS.
- ✅ **Interactables:** `button.scene-object` (collectable props) and `button.hotspot` (labelled points). Both carry `data-object` / `data-hotspot` ids and are generated from data. Hotspot `top` is derived from `data-world-y`.
- ✅ **NPCs:** Bea (rabbit designer), Graham (security goose) as `button.npc`; shown/hidden per chapter.
- ✅ **Dialogue:** native `<dialog id="dialogue">` with speaker, optional portrait, text, hint, and action buttons. Also an inline `#scene-story` line for ambient narration.
- ✅ **Packing puzzle:** native `<dialog id="box-dialog">`; grid of **6 columns × 4 rows**; shelf of waiting items; rotate, auto-pack ("Help me fit it"), set aside, undo, hint, readiness text, "Why?" rule details.
- ✅ **Notebook:** `<aside id="notebook-panel">` with journal tasks, note-to-self, pocket items, hint button, chapter progress.
- ✅ **Ending:** park scene with three drop zones (`bench`, `bea`, `ground`), keepsake selection, "Arrange keepsakes", "Settle in with Bea", recap.
- ✅ **Menu:** sound switch, how to play, notebook, show-labels switch, restart.
- 🟡 State is a single plain object serialized to JSON. UI renders from state; avoid scattering state in the DOM.

## 4. Coding style
- ES2020+, `"use strict"`, no modules required (classic scripts share a small, explicit namespace, e.g. `window.OOO`). 🟡 confirm the existing namespace and reuse it.
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
- ✅ Progress saved on-device ("Progress saved on this device"); "Continue your last day" restores it. 🟡 Storage is `localStorage`, verify the key.
- Wrap all storage access in try/catch. On failure show `#save-warning` (role="alert") and keep playing in memory.
- Save data has a `version` integer. **Any change to the save shape requires bumping `version` and a migration function.** Never throw away a player's save silently.
- Restart wipes the save only after confirmation.

## 7. Assets
- Format: WebP, ≤ 400 KB per backdrop, ≤ 120 KB per sprite where possible. Wide backdrops share one image across cap/architecture/floor layers.
- Naming: `<subject>-<variant>.webp`, e.g. `desk-empty-wide.webp`, `pip-watercolor.webp`, `pip-resting-watercolor.webp`, `park-wide.webp`.
- Every `<img>` has meaningful `alt` or `alt=""` + `aria-hidden` when decorative.
- Lazy-load anything not needed on first paint (`loading="lazy"`); the start-screen art uses `fetchpriority="high"`.
- Provenance: record how each asset was made in `src/assets/CREDITS.md` (tool, date, human-edited yes/no).

## 8. Audio
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
- No third-party scripts, analytics, or trackers. No network calls at runtime.
- Strip hosting-tool widgets and tracking snippets from any imported HTML (the original export contained an editor widget and a bot-challenge snippet; `tools/import_saved_page.py` removes them).

## 12. Git & collaboration
- Branch per task: `task/NNN-slug`. Small commits: `NNN: imperative summary`.
- Changes to `specs/GAME_DESIGN.md` are made **only by the human**. Agents write `specs/proposals/NNN-slug.md`.
- Update this file in the same commit as the code change that makes it stale.

## 13. Known gaps / to verify
- 🟡 Real file contents of `engine.js`, `navigation.js`, `camera.js`, `game.js`, `game.css`.
- 🟡 Save key name and schema.
- 🟡 Whether `#hotspots` / `#scene-props` are built from data at runtime or static HTML (the saved page is a post-run snapshot).
- ⬜ Automated tests: none. Candidate: a tiny Node script that validates content data (every item has a shape that fits the 6×4 box; every dialogue id referenced exists).
