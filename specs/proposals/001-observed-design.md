# Proposal 001 — What the build actually contains

- **From:** task 001 (import + verify), 2026-10-10
- **Source:** `src/js/engine.js` (rules, items, dialogue, endings) and `src/js/game.js` (hotspots, chapter labels, choices, hints), plus a scripted golden-path run.
- **How to use:** each block names a GAME_DESIGN section, what it says now, and what the code does. Copy what you agree with into GAME_DESIGN, edit, or reject. Lines in quotes are the game's own copy, verbatim. Nothing here is a new idea; anything that looked like a gap went to `OPEN_QUESTIONS.md` instead.

## Status (2026-10-10 review)
- **Merged into GAME_DESIGN:** §4 arc, §6 rooms (+ CEO as set dressing), §8.3 choices, §8.4 hints, §9 chapters, §10 ending.
- **Still open:** §8.2 box items (designer not sure yet; Q-001), §5 voice lines, §8.5 pocket items.

---

## §4 Story & tone — arc
**Now:** middle beat is "help Bea retrieve her sketchbook… [details to confirm]".
**Observed:** the main path is fixing the **printer**, not Bea. Helping Bea is explicitly optional ("Helping me is optional."). The printer releases both the exit slip (required) and the supply token (only used for Bea's drawer).

1. **Opening:** pack plant + mug into a small 3×2 box.
2. **Middle (required):** printer jam. Fill the packed mug at the water cooler → soften and peel the dried label off the latch → take the tray lever from the supply cabinet → pack it along the top row (plant and mug still packed, mug wide) → printer opens: exit slip + supply token.
3. **Middle (optional):** use the token on Bea's locked lower drawer → she gets her sketchbook back → Bea carries it, or Pip offers to.
4. **Departure:** pack the exit slip so Graham can reach it, make the box safe for the walk (award at the bottom, photo cushioned), Graham stamps the slip and gives a goose sticker, elevator.
5. **Ending:** the park.

Side beats: the Manager asks for a handoff (accept or decline); a CEO broadcast in the lobby (flavour only); Bea's lunch invitation (join her or take time alone).

## §5 Characters — observed voice
| Character | Signature lines in the build |
|---|---|
| Pip | "Filled the values mug. Finally, some liquidity." · "Bring your whole self to work. Please take your whole self home." |
| Bea | "Tuesday lunch club. One sandwich, five forks." · "You're welcome to join me, whether or not you help." |
| Graham | "No exit slip, no exit. These are the rules. I did not write them. I would have used more honks." · "Your continued existence is outside my jurisdiction." |
| Manager | "Before you go, could you make yourself replaceable? Just a quick handoff. Everything you know. Maybe a spreadsheet." |
| **CEO** *(not in §5)* | Lobby "CEO broadcast": "We're a family." while someone removes a chair. |
| **Jo** *(mentioned only)* | Drew a potato on the team poster "that was meant to be me". |

## §6 World & locations — correction
**Now:** Lobby purpose is "Printer, Graham, exit".
**Observed:** the printer is in **Supplies**.

| Room | Hotspots in the build |
|---|---|
| Desk | Desk plant, Values mug, Team poster, Team photo, Excellence award, Manager's message |
| Supplies | The printer, Water cooler, Bea · designer, Tray lever (on its hook), Locked sketchbook drawer |
| Lobby | Graham · security, The elevator, CEO broadcast |
| Park | Drop zones: on the bench, beside Bea (only if you joined her), at our feet |

## §8.2 The box — item table
**Box size:** **3 × 2** until both plant and mug are packed, then it expands to **6 × 4** ("Room to grow.").

| Item | Cells (w×h, rotatable) | Emotional note (game copy) | Required? / rule |
|---|---|---|---|
| Desk plant | 2×2 | "Bea gave me this cutting on my first day. It grew toward her desk." | **Yes**, to open the big box, and still packed when using the lever |
| Values mug | 2×1 | "Bea and I shared this mug when the kettle broke. Two straws. Terrible system." | **Yes**. Must be packed to carry water; must lie wide (unrotated) when using the lever |
| Team poster | 1×3 | "Everyone signed this after our first launch. Jo drew a potato…" | No; can cushion the photo |
| Team photo | 2×2 | "Tuesday lunch club. We missed the camera timer three times." | No; **if packed**, must sit directly on top of the poster or sketchbook, supported across its full width |
| Excellence award | 3×2 | "I stayed late for six weeks to earn this. It is heavier than I remember." | No; **if packed**, must touch the bottom edge |
| Bea's sketchbook | 3×2 | "A whole world of ideas. None of them belong in a locked drawer." | No; optional rescue, and Bea can carry it herself |
| Tray lever | 4×1 | "A long maintenance lever…" | **Yes**, temporarily: horizontal on the top row to open the printer, then returned |
| Exit slip | 1×2 | "Proof that you have permission to leave a job you no longer have." | **Yes**: vertical in the rightmost column for Graham |
| Goose sticker | 1×1 | "HONK IF YOU HAVE COMPLETED YOUR EXIT CHECKLIST." | No; reward from Graham |
| Supply token | 1×1 | "One last perk. Redeem for something useful." | Pocket item, **cannot be packed** |

**Leaving things behind** (§8.2 [DECIDE]): it's a **choice**. Only plant, mug, lever (temporarily) and slip are ever required. The departure review lists what was kept, set aside and never picked up, and the ending reflects it (see §10).

## §8.3 Dialogue — choices
**Observed:** yes, there are choices, and some change the ending.
| Where | Options | Effect |
|---|---|---|
| Bea | "About your sketchbook…" / "Save me a seat" / "I need a little time alone" / "Maybe later" | Lunch choice changes the ending's opening line, the park drop zones and the recap |
| Bea's drawer | "Bea carries her book" / "I'll carry it for you" | Whether the sketchbook goes in your box (ending lines differ) |
| Manager | "I'm going to pass" / "Leave a handoff note" → "Send & move on" | Changes Graham's line and adds an ending line |
| Elevator | "One more look around" / "Check my box" / "Leave Almost Friday" | Leaving starts the ending |

## §8.4 Hints — ladder
**Observed:** **3 tiers per phase; the third tier gives the full answer.** Phases: packing, explore, label, waterReady, tool, lever, favor, weight, padding, exit, done. Example (packing): "Different shapes can share a small space. Try changing how one faces." → "…Could the mug use that strip?" → "Rotate the mug once so it is 1×2, then place it beside the 2×2 plant."

## §8.5 Pocket items
Supply token (from the printer → opens Bea's lower drawer; consumed). The lever and slip are box items, not pocket items.

## §9 Progression map
Chapter is derived from progress, not stored.
| # | Title (in game) | Goal text | Starts when | Done when | Unlocks |
|---|---|---|---|---|---|
| 00 | MAKE A LITTLE ROOM | "Pack something worth keeping." → "Make room for a second keepsake." | New game | Plant + mug packed | 6×4 box |
| 01 | PERSONAL EFFECTS | "Take a look around. Keep what matters." → "Investigate the printer jam." → "Find a way to release the printer tray." | Ch. 00 done | Printer tray opened with the lever | Exit slip, supply token (optional Bea thread) |
| 02 | EXIT STRATEGY | "Pack your exit slip. Graham will need it." → "Bring your exit slip to the lobby." / "Pack for the trip home. Show Graham your exit slip." | Printer opened | Graham stamps the slip (slip placement + award/photo travel rules) | Goose sticker, elevator |
| 03 | YOUR NEXT CHAPTER | "Choose what comes with you. Then head outside." | Graham clears you | "Leave Almost Friday" at the elevator | Park ending |

Not verified: whether Supplies and Lobby are locked during ch. 00 (§9 currently says they unlock then).

## §10 Endings
**Observed:** one location, many variants. The text is assembled from:
- **Opening line by lunch choice:** joined Bea: "Bea saves the shady end of the bench. Tuesday lunch club has moved." Alone: "Pip finds a quiet bench. For a moment, being alone feels like having room."
- **One memory line per kept item:** plant, mug (two versions: with/without Bea), poster, photo, award, sketchbook, sticker.
- **Combinations:** photo + sketchbook → "An old photograph and a fresh page: there can be another lunch club." Award picked up but left behind → "…The six weeks that earned it still happened." Nothing kept → "Pip's paws are lighter. The memories do not need a box."
- **Bea's book carried by Bea** and **Manager handoff sent/declined** each add a line.
- **Recap tag:** "You kept some company, too." (joined Bea) or "An afternoon of your own." (alone).
- Unpacking at the park is optional; "Settle in with Bea" ends with "No rush. We're staying a while."

So the caption is keyed to **what** you kept and **who you're with**, not to a count. The few/some/many table in §10 doesn't match the build.

## Proposed §17 revision-log line
`2026-10-10 | Merged observed design from proposal 001`
