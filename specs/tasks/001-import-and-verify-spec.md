# Task 001 — Import the existing game and verify TECH_SPEC against it

- **Status:** approved
- **Spec refs:** TECH_SPEC §2, §13; GAME_DESIGN §8, §9
- **Branch:** task/001-import

## Goal
`src/` contains the working game, running locally with no console errors, and TECH_SPEC matches reality.

## Steps
1. Put the original source in `src/` (preferred: copy the real project files from the ChatGPT Sites project; fallback: run `python3 tools/import_saved_page.py <saved .html>`).
2. Serve with `python3 -m http.server 8000 -d src` and play start → ending.
3. Read `src/js/*` and `src/css/game.css`. Correct every 🟡 item in TECH_SPEC; remove the 🟡 marker once verified.
4. Fill GAME_DESIGN gaps **as proposals** in `specs/proposals/001-observed-design.md`: list the real item shapes, chapters, dialogue ids, and endings you find in code. Do not edit GAME_DESIGN.md.
5. Append anything undecidable to OPEN_QUESTIONS.md.

## Acceptance criteria
- [ ] `src/index.html` loads with zero console errors, no external network requests
- [ ] No hosting-tool widget or tracking snippet remains in `index.html`
- [ ] TECH_SPEC §13 "Known gaps" is empty or only lists true unknowns
- [ ] `specs/proposals/001-observed-design.md` exists
- [ ] CHANGELOG updated
