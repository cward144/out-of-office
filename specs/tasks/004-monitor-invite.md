# Task 004 — Opening: glowing monitor invite and Pip's reaction

- **Status:** done (2026-10-14)
- **Spec refs:** GAME_DESIGN §4 (opening scene steps 1–3), §9 ch. 00; TECH_SPEC §3, §5, §6
- **Branch:** task/004-monitor-invite

## Goal
A new game opens quietly on the office. The left monitor lights up with a calendar invite, the player opens it, reads People Operations' message, and sees Pip react ("Guess we're both taking this personally.") before the plant tutorial begins.

## Out of scope
- The plant lifting into the box (task 005) and exit arrows (task 006).
- New artwork. Pip's "glance" is a facing flip plus a small tilt, not a new drawing.
- Changing the existing ch. 00 goal text after the reaction ("Pack something worth keeping." / "Start with your plant.").

## Acceptance criteria
- [x] New game: Pip starts by the left desk; nothing is announced for about a second, then the left monitor glows with "Calendar invite · Quick catch-up" and a subtle pulse; objective reads "Check your computer."
- [x] During the opening the room tabs, exit arrows, box, notebook and room objects are hidden or inert; the menu still works
- [x] The whole monitor screen opens the invite by mouse, touch, and keyboard (Tab + Enter/Space); it opens once and can't stack (mouse and keyboard tested; touch uses the same button click, not tested on a device)
- [x] Message from "People Operations": "We've optimized the concept of you." with Continue (Escape or × behave the same as Continue)
- [x] Pip glances toward the plant and a speech line appears near Pip: "Guess we're both taking this personally." with a button to continue; the input that closed the message can't also dismiss this line
- [x] After that, the plant tutorial starts exactly as before (plant highlighted and focused)
- [x] Reloading at any point before the reaction finishes restarts the opening cleanly; after it, the opening never replays
- [x] Existing saves skip the opening (save version 2 → 3 migration)
- [ ] Reduced motion: no pulse or tilt (CSS rule in place; not emulated in the test browser)
- [x] No console errors; checked at 360px and 1280px

## Golden-path checklist (tick when verified)
Opening played by mouse and keyboard; rest of the path scripted against the engine, then the ending loaded in the real UI.
- [x] Start → invite → reaction → plant highlighted (packing plant and mug scripted)
- [x] Supplies → Lobby → exit (scripted)
- [x] Park ending → "Another last day" restarts cleanly (and replays the opening)

## Notes
- Revised 2026-10-14 after the designer shared mockups: close-up camera on Pip's desk, invite card on the screen, Pip beside the drawers (start position 38,50), compact › bubble, objective pill. Re-checked keyboard path, plant pickup, 360px and desktop, console clean.
- Art needed later (not in this task): Pip looking up at the monitor; the box set down on the floor beside Pip.
- Left monitor screen in logical coordinates: x 16–28, y 7–16.5 (measured against the plant's known position).
