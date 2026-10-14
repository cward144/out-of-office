# Task 003 — Playable link on GitHub Pages

- **Status:** in progress
- **Spec refs:** TECH_SPEC §1 (hosting), §11
- **Branch:** task/003-github-pages

## Goal
The game is playable at a public link (phone or any computer) that updates automatically whenever `main` changes.

## Out of scope
- Custom domain.
- Any change to the game itself.

## Acceptance criteria
- [ ] GitHub Pages is enabled for the repo with GitHub Actions as the source
- [ ] `.github/workflows/pages.yml` publishes `src/` on every push to `main` (and on manual run)
- [ ] https://cward144.github.io/out-of-office/ loads the start screen with no console errors and no requests outside that site
- [ ] TECH_SPEC §1 records the hosting choice; CHANGELOG updated

## Notes
- Repo is public, so Pages is free. The site is public too.
- Asset paths are all relative, so the `/out-of-office/` sub-path works without changes.
