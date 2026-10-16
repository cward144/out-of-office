# Fonts

Self-hosted so the game makes no external requests (TECH_SPEC). Both are variable fonts covering weights 400–700, split into the `latin` and `latin-ext` subsets that Google Fonts serves.

| File | Family | License |
|---|---|---|
| `dm-sans-latin*.woff2` | DM Sans (Colophon Foundry) | SIL Open Font License 1.1 |
| `space-grotesk-latin*.woff2` | Space Grotesk (Florian Karsten) | SIL Open Font License 1.1 |
| `eb-garamond-italic-latin.woff2` | EB Garamond Italic, variable 400–600 (Georg Duffner, Octavio Pardo) | SIL Open Font License 1.1 |

Source: fonts.gstatic.com (DM Sans v17, Space Grotesk v22), fetched 2026-10-10; EB Garamond v33 fetched 2026-10-15 (closing card, task 009). `@font-face` rules are at the top of `src/css/game.css`.
