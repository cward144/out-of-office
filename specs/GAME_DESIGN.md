# GAME DESIGN — Out of Office

**Owner: you (the designer).** Agents read this; they never edit it. They propose changes in `specs/proposals/`.

How to use this doc: it is a working draft pre-filled from what the current build *already shows*. Everything tagged **[FROM BUILD]** is observed. Everything tagged **[DECIDE]** is a question only you can answer. Replace, delete, and rewrite freely. Keep section numbers stable (agents cite them).

---

## 1. Pitch
**One line:** You've been laid off. Pack a box, rescue a friend's sketchbook, and leave a very strange company with the things worth keeping. **[FROM BUILD]**

**Title:** Out of Office — a tiny layoff adventure. Subtitle on page: "an almost friday adventure". Fictional company: **Almost Friday Inc.**

**Fantasy:** the gentlest possible worst day of your career.

**[DECIDE]** Elevator version for a store page (2 sentences):
>

## 2. Design pillars
Proposed from the tone of the build; edit to match your intent.
1. **Gentle, never punishing.** "No clock. No rush." **[FROM BUILD]** No timers, no fail states, no dead ends. Hints are always available ("A little nudge?").
2. **Wry warmth.** Corporate-speak is the joke ("People first. Pending budget approval."), but the story is kind to people.
3. **Keep what matters.** Choosing what to keep is the emotional core; the packing puzzle expresses it.
4. **Small and complete.** A single sitting, ~20–40 minutes **[DECIDE target length]**.
5. **Cozy craft.** Watercolor look, soft sound, tactile objects.

**[DECIDE]** Add / cut pillars. Add one "anti-pillar" (what this game must never be):
>

## 3. Audience & platform
- Web, desktop and mobile browsers. Touch and keyboard both first-class. **[FROM BUILD]**
- **[DECIDE]** Target audience, content rating, and whether it should ever ship on itch.io / Steam / mobile stores.

## 4. Story & tone
**Premise [FROM BUILD]:** Your position has been eliminated. Your plant has not. Your last day: pack a personal box, say goodbye, get past security, and exit.

**Arc (current build):**
1. Opening · make a little room: bring two keepsakes (plant, mug) **[FROM BUILD]**. The opening scene (decided 2026-10-13):
   1. **Quiet start.** The game opens on the office with no instructions. Pip stands by the left desk (Pip's desk) holding the box. After a moment the left monitor lights up with "Calendar invite · Quick catch-up" and a subtle pulse. Objective: "Check your computer." The room tabs are hidden and other objects can't be used yet; the menu stays available.
   2. **The news.** Clicking the monitor (anywhere on its screen, by mouse, touch or keyboard) opens a message from **People Operations**: "We've optimized the concept of you." → Continue. It can only open once.
   3. **Pip's reaction.** The message closes, Pip glances toward the desk plant, and a speech line appears near Pip: "Guess we're both taking this personally." The player advances it; a fast double-click can't skip both beats.
   4. **Plant first.** Objective: "Start with your plant." The plant gets a gentle highlight. Clicking it lifts it off the desk and settles it into Pip's box (instant or a short fade with reduced motion), and it is no longer on the desk. From here the opening works as built: the 3×2 plant + mug packing tutorial, then the rest of the office.
   - **Framing (decided 2026-10-14, from the opening mockups):** the opening is a close-up of Pip's desk (same room, zoomed in), with Pip beside the drawers, the invite shown as a card on the monitor screen, a small objective pill, and Pip's line as a compact bubble with a ›. The camera eases back out to the whole office when the plant step starts. Not yet possible without new art: Pip looking up at the monitor, the box set down on the floor.
   - Collecting and packing work as they do now. There's no Keep / Leave choice.
2. Middle · fix the printer jam (required): water softens the label, the tray lever releases the exit slip and a supply token. Optional: use the token on Bea's lower drawer to give her sketchbook back ("Helping me is optional.") **[FROM BUILD]**
3. Departure · security (Graham), exit cleared, leave the building **[FROM BUILD]**
4. Ending · the park: settle on a bench with Bea; the things you kept come with you **[FROM BUILD]**

**[DECIDE]** Theme statement (what is this game *about*?):
>
**[DECIDE]** Tone guardrails (jokes about layoffs are okay when…; never when…):
>

## 5. Characters
| Character | Who | Role in game | Voice | Status |
|---|---|---|---|---|
| **Pip** | Raccoon in a sweater vest, "formerly essential" | Player character | Dry, earnest, a little stunned | [FROM BUILD] |
| **Bea** | Rabbit, designer; gave Pip a plant cutting on day one | Friend; her sketchbook must be rescued; ends the game beside Pip | Warm, practical | [FROM BUILD] |
| **Graham** | Goose, security | Gatekeeper at the exit | **[DECIDE]** | [FROM BUILD] name + role only |
| **The Manager** | Heard via "Manager's message" hotspot | Offstage antagonist-ish; the corporate voice | **[DECIDE]** | [FROM BUILD] |
| **The Plant** | Desk plant, outgrown three pots | Emotional anchor | Silent | [FROM BUILD] |

**[DECIDE]** For each: one-sentence want, one-sentence flaw, one signature phrase.

## 6. World & locations
Three areas. **Moving between rooms (decided 2026-10-13):** no Desk / Supplies / Lobby tabs. Each doorway has one clear exit arrow; Pip carries the box through it, with a short fade between rooms. Exits stay locked until the plant and mug are packed, as now.
| Room | Caption | Purpose | Contents | Status |
|---|---|---|---|---|
| **Desk** | "YOUR DESK · FOR NOW" | Start; pick keepsakes | Plant, Values mug, Team poster, Team photo, Excellence award, Manager's message | [FROM BUILD] |
| **Supplies** | | Fix the printer jam (exit slip + supply token); optional: Bea's sketchbook | The printer, Water cooler, Bea · designer, Tray lever (on its hook), Locked sketchbook drawer | [FROM BUILD] |
| **Lobby** | | Get past Graham, leave | Graham · security, The elevator, CEO broadcast | [FROM BUILD] |
| **Park** | "Room for what comes next." | Ending | Bench, at your feet, beside Bea (only if you joined her) | [FROM BUILD] |

The Lobby's "CEO broadcast" is set dressing, a one-line background joke like the footer, not a character: "The CEO says 'We're a family.' Behind him, someone silently removes a chair. He keeps talking."

Rule: Supplies and Lobby stay locked until the plant and mug are packed ("Room for the plant and mug first."). **[FROM BUILD]**

**[DECIDE]** Is there a map? Will rooms be added? Any rooms that unlock later?

## 7. Core loop
1. **Explore** the room (walk, inspect hotspots, talk to NPCs).
2. **Collect** objects into the box queue ("waiting to pack").
3. **Pack** the box (spatial puzzle).
4. **Advance** the chapter via conversation or task completion.
5. **Reflect**: Pip's notebook and "note to self" give a quiet emotional beat.

## 8. Systems

### 8.1 Movement & interaction **[FROM BUILD]**
Click/tap to walk; arrow keys to walk; click objects or labelled hotspots. "Show labels" toggles hint labels (quiet vs loud).

### 8.2 The box (packing puzzle) **[FROM BUILD, rules to confirm]**
- Grid: **6 × 4**. Items have shapes, can be rotated, dragged (or select + tap a square), set aside, undone. "Help me fit it" auto-packs.
- A readiness message and a "Why?" panel explain what the box still needs.
- **[DECIDE]** Item list with shapes (cells) and any special rules (fragile, heavy, "can't be next to"?). Fill the table:

| Item | Cells (w×h or shape) | Emotional note | Required? |
|---|---|---|---|
| Desk plant | | outgrown three pots | yes |
| Values mug | | | yes |
| Team poster | | | no |
| Team photo | | | no |
| Excellence award | | | no |
| Bea's sketchbook | | rescued from… | yes? |

- **[DECIDE]** Do you ever have to leave things behind? Is that a choice or a constraint? (The ending counts "You kept N things.")

### 8.3 Dialogue **[FROM BUILD]**
Modal conversations with a speaker label and optional portrait; ambient lines in a scene-story strip; a "departure review" and a "field guide" panel exist.
**Choices:** yes. Choices can change ending lines, but never block progress.

| Where | Options | Effect |
|---|---|---|
| Bea | "About your sketchbook…" / "Save me a seat" / "I need a little time alone" / "Maybe later" | Lunch choice changes the ending's opening line, the park drop zones, and the recap |
| Bea's drawer | "Bea carries her book" / "I'll carry it for you" | Whether the sketchbook goes in your box; ending lines differ |
| Manager | "I'm going to pass" / "Leave a handoff note" → "Send & move on" | Changes Graham's line and adds an ending line |
| Elevator | "One more look around" / "Check my box" / "Leave Almost Friday" | Leaving starts the ending |

### 8.4 Notebook, journal, hints **[FROM BUILD]**
Chapter progress, journal tasks with checkmarks, a Note to Self, pocket items (e.g., supply token), hint button, "Focus hints on Bea's sketchbook".
**Hint ladder:** three tiers for each puzzle step. Tier 1 is a gentle pointer, tier 2 narrows it down, and tier 3 always gives the full answer, so nobody gets stuck (pillar 1). Example (first packing step): "Different shapes can share a small space. Try changing how one faces." → "The plant leaves a narrow strip beside it. Could the mug use that strip?" → "Rotate the mug once so it is 1×2, then place it beside the 2×2 plant."

### 8.5 Items in pocket **[FROM BUILD]**
Supply token: "Use it at the lower drawer."
**[DECIDE]** Full list of non-box items and what unlocks what.

### 8.6 Sound **[FROM BUILD]**
Off by default; toggle in menu. **[DECIDE]** Music direction, SFX list.

### 8.7 Saving **[FROM BUILD]**
Auto-save on device; "Continue your last day"; restart anytime.

## 9. Progression map
Four chapters, as built. The chapter shown is worked out from progress (it isn't saved separately).

| # | Title | Goal text | Starts when | Done when | Unlocks |
|---|---|---|---|---|---|
| 00 | MAKE A LITTLE ROOM | "Pack something worth keeping." → "Make room for a second keepsake." | New game | Plant + mug packed in the small 3×2 box | Full 6×4 box; Supplies and Lobby (until then: "Room for the plant and mug first.") |
| 01 | PERSONAL EFFECTS | "Take a look around. Keep what matters." → "Investigate the printer jam." → "Find a way to release the printer tray." | Ch. 00 done | Printer tray opened with the lever | Exit slip, supply token (optional: Bea's sketchbook) |
| 02 | EXIT STRATEGY | "Pack your exit slip. Graham will need it." → "Bring your exit slip to the lobby." / "Pack for the trip home. Show Graham your exit slip." | Printer opened | Graham stamps the exit slip | Goose sticker, elevator |
| 03 | YOUR NEXT CHAPTER | "Choose what comes with you. Then head outside." | Graham clears you | "Leave Almost Friday" at the elevator | Park ending |

Optional thread (any time after ch. 01): use the supply token on Bea's lower drawer to return her sketchbook.

## 10. Endings **[FROM BUILD]**
One place: the park, "Room for what comes next." You can set your kept items down at the bench, at your feet, or beside Bea (only if you joined her). Unpacking is optional. Then "Settle in…" ends on "No rush. We're staying a while." "Another last day" restarts.

**The ending is written from *which* things you kept, not how many:**
- **Opening line, by lunch choice.** Joined Bea: "Bea saves the shady end of the bench. Tuesday lunch club has moved." Alone: "Pip finds a quiet bench. For a moment, being alone feels like having room."
- **One memory line per kept item:** plant, mug (two versions, with or without Bea), poster, photo, award, sketchbook, sticker.
- **Combinations.** Photo + sketchbook: "An old photograph and a fresh page: there can be another lunch club." Award picked up but left behind: "…The six weeks that earned it still happened." Nothing kept: "Pip's paws are lighter. The memories do not need a box."
- **Bea carries her own book** and **the Manager handoff sent or declined** each add a line.
- **Recap tag:** "You kept some company, too." (joined Bea) or "An afternoon of your own." (alone).

## 11. Copy & voice guide
- Short sentences. Understatement. One joke per beat, then a kind line.
- Corporate language is allowed only in the *company's* voice (UI micro-copy, footer jokes), never in Pip's or Bea's.
- Footer joke: "People first. Pending budget approval." **[FROM BUILD]**
- **[DECIDE]** Banned words/topics. Reading level target.

## 12. Art direction **[FROM BUILD]**
Soft watercolor illustration; warm paper tones; deep navy UI chrome (`#243247`) with cardboard-tan accents (`#e7c38b`). Characters are painted sprites on painted backdrops.
**[DECIDE]** Palette list, line quality, reference images (add to `specs/refs/`), what an acceptable new asset looks like.

## 13. Audio direction
**[DECIDE]**

## 14. Scope & milestones
- **M0 — Foundation:** repo, specs, import current build, parity with the live game.
- **M1 — Vertical slice polish:** chapter 00 → ending with final copy.
- **M2 — Content complete:** all chapters, all rooms.
- **M3 — Polish & release:** audio, accessibility pass, store assets.
**[DECIDE]** Dates / what counts as "done".

## 15. Out of scope (for now)
**[DECIDE]** Example candidates: combat, inventory crafting, timers, multiplayer, accounts, monetization.

## 16. Open design questions
Maintain here as a numbered list. Agents also log questions they hit in `specs/OPEN_QUESTIONS.md`; you merge answers back into this doc.
1. 

## 17. Revision log
| Date | Change |
|---|---|
| 2026-10-10 | Draft pre-filled from the build's HTML shell |
| 2026-10-10 | §9 chapter map adopted as built (from proposal 001) |
| 2026-10-10 | §8.3 choices adopted as built: choices may change the ending |
| 2026-10-10 | §8.4 hint ladder: 3 tiers, last gives the full answer |
| 2026-10-10 | §10 ending keyed to which items you kept + lunch/Manager choices (count tiers dropped) |
| 2026-10-10 | §6 rooms matched to the game (printer is in Supplies) |
| 2026-10-10 | §4 arc: printer is the required middle; Bea's sketchbook is optional |
| 2026-10-10 | CEO broadcast is set dressing (noted in §6), not a §5 character |
| 2026-10-14 | §4 opening framing: close-up on Pip's desk per the mockups; eases out for the plant step |
| 2026-10-13 | §4 opening scene: glowing monitor invite, People Operations line, Pip's reaction, plant lifts into the box. §6: exit arrows replace room tabs. Collecting and packing unchanged (no Keep/Leave) |
