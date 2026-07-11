# The Rs 100 Problem

**BCG OutPrompt 2026, Problem 4 (Agriculture).** Of every Rs 100 a consumer pays for a tomato, the farmer keeps Rs 33.5. Everyone assumes the traders eat the rest. They don't: the trader and wholesaler take about Rs 5 each, and roughly Rs 56 sits downstream in transport, wastage, and retail. This repo is the full working: research, decision log, and the submission itself.

**The submission is a live site: https://charan-bcg.vercel.app/**

Scroll-driven, cinematic, analysis-first. Five scenes: the cold open (the Rs 100 decomposition), the chain (L0-L6 links), a living system-dynamics model you can break, the sweet-spot spectrum (why tomato, honestly scored), and the footnotes of the journey (what we considered and rejected).

## How this repo is organized

| Folder | What lives there |
|---|---|
| `01 - Problem Statements/` | The brief and problem selection |
| `02 - Research/` | The Link Ledger (every figure, sourced and tagged), first-principles interrogation, the Spine (central argument), spectrum data |
| `03 - Personas/` | The working personas (the Quant, etc.) that police the numbers |
| `04 - Decision Log/` | Dated decisions, including the pivot to PS4 |
| `05 - Deliverable/site/` | The Next.js site that is the submission |

## Rules the repo runs on

1. **Every number is cited.** Figures render with a superscript arrow that opens the source drawer: source, year, verification tag. No ledger id, no render.
2. **The site is the deliverable.** Local dev servers are for verification only; the reviewable artifact is always the production URL above.
3. **Honesty over polish.** Mock data is badged as mock. The sweet-spot scoring formula is displayed on screen, not hidden behind the conclusion.

## Running the site

```bash
cd "05 - Deliverable/site"
npm install
npm run dev
```

Deploys via Vercel (`vercel --prod` from the site directory, project `charan-bcg`).
