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
1. Opening · make a little room: bring two keepsakes (plant, mug) **[FROM BUILD]**
2. Middle · help Bea retrieve her sketchbook; supply token, printer, lower drawer **[FROM BUILD, details to confirm]**
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
Three areas, switched via a room nav and floor doors. **[FROM BUILD]**
| Room | Caption | Purpose | Contents | Status |
|---|---|---|---|---|
| **Desk** | "YOUR DESK · FOR NOW" | Start; pick keepsakes | Plant, Values mug, Team poster, Team photo, Excellence award, Manager's message | [FROM BUILD] |
| **Supplies** | | Obtain the supply token / use lower drawer | **[DECIDE]** | partial |
| **Lobby** | | Printer, Graham, exit | **[DECIDE]** | partial |
| **Park** | "Room for what comes next." | Ending | One bench, Bea, ground | [FROM BUILD] |

Rule in build: you must pack plant and mug before leaving the desk area ("Pack your plant and mug before heading out."). **[FROM BUILD]**

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
**[DECIDE]** Do dialogues have choices? Do choices change the ending line or only flavor?

### 8.4 Notebook, journal, hints **[FROM BUILD]**
Chapter progress, journal tasks with checkmarks, a Note to Self, pocket items (e.g., supply token), hint button, "Focus hints on Bea's sketchbook".
**[DECIDE]** Hint ladder: how many tiers, and do they ever give the full answer?

### 8.5 Items in pocket **[FROM BUILD]**
Supply token: "Use it at the lower drawer."
**[DECIDE]** Full list of non-box items and what unlocks what.

### 8.6 Sound **[FROM BUILD]**
Off by default; toggle in menu. **[DECIDE]** Music direction, SFX list.

### 8.7 Saving **[FROM BUILD]**
Auto-save on device; "Continue your last day"; restart anytime.

## 9. Progression map
Fill this as a table of **chapters** (each: id, title, goal text, trigger to start, completion condition, new unlocks). Chapter 0 is known.

| # | Title | Goal text | Starts when | Done when | Unlocks |
|---|---|---|---|---|---|
| 00 | MAKE A LITTLE ROOM | "Pack something worth keeping." / "Start with your plant." | New game | plant + mug packed | Supplies, Lobby doors |
| 01 | **[DECIDE]** | | | | |
| 02 | | | | | |
| … | | | | | |

## 10. Endings **[FROM BUILD]**
One ending: the park, "Room for what comes next." Pip sits on a bench with Bea, who holds the rescued sketchbook. You place your kept items at three spots (bench / beside Bea / at our feet), then "Settle in with Bea". Recap: "What came with you", "You kept N things", plus a caption. "Another last day" restarts.
**[DECIDE]** Are there variants based on what you kept? Is the caption keyed to the count? Write the ending caption tiers:

| Kept | Caption |
|---|---|
| few | |
| some | |
| many | |

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
