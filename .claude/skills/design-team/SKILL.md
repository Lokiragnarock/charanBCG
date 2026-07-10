---
name: design-team
description: The case-deliverable design team. Use when building, designing, or reviewing the R1 portfolio website — scroll scenes, the system-dynamics simulator, the sweet-spot spectrum, or any visual/interactive asset for the BCG OutPrompt submission. Encodes the aesthetic laws (Anduril/Palantir/D.E. Shaw), the five-scene architecture, the single-source-of-truth data rule, and performance budgets.
---

# Design Team — R1 Portfolio Website

## Mission
One live Vercel website that IS the submission: scroll-driven, cinematic, interactive — but **analysis-first**. R1 is scored on thinking; the site is the delivery vehicle. If a scene doesn't render a cited number or a logged decision, it doesn't ship.

## Aesthetic laws (non-negotiable)
1. **Reference triangle:** Anduril (dark, engineered, confident) × Palantir Foundry (data-dense product UI, live panels) × D.E. Shaw (restrained type, generous whitespace-in-dark, intellectual). Never "startup landing page," never stock-illustration agri clichés (no wheat-in-sunset).
2. **Palette:** near-black base (#0A0C0B), one signal green (BCG OutPrompt green family), warm neutral text. Red→green **aura spectrum** reserved exclusively for the opportunity scoring (Scene 4) so the color carries meaning.
3. **Type:** one grotesk for display (tight tracking, uppercase section labels), one mono for numbers/citations. Numbers always in mono — they're the protagonists.
4. **Motion grammar:** elements *assemble* on scroll (slide/fade/parallax ≤ 600ms, ease-out-expo); 3D used where the data is genuinely spatial (the chain, the map), not as decoration. Every animation must be interruptible — scroll-scrubbed, not autoplay.
5. **Citations are UI.** Every figure gets a superscript that opens a footnote drawer — source, year, tag (🟢🟡🔴 from the Link Ledger). The judges' verification path is a feature.

## The five scenes (scroll order)
### S1 — Cold open + problem statement
Slide-deck-like sections animating in: the ₹100 note visually splitting as you scroll (farmer's ₹33.5 stays lit, the rest scatters to stage icons). Hard numbers from the brief land as typographic hits (146M holdings · 1.08 ha · 86% <2 ha).

### S2 — The chain, spatialized
The seven-link chain (L0 data → L6 consumer) as a 3D scroll journey — camera tracks along the chain; each link expands into a Foundry-style panel: margin, cost, capital-to-enter, loss %, who-owns-it-today. Data binds from `ledger.json` (exported from [[02 - Research/PS4 - Link Ledger]]) — never hand-typed.

### S3 — The living model (system dynamics simulator)
Stock-and-flow model in the spirit of the classic nurse retention/churn hospital demos (Stella/Vensim style): stocks = member farmers, FPO working capital, aggregated volume; flows = joins, **side-selling defections**, payments, spoilage; feedback loops visible as animated arcs.
**Sliders (scenario inputs):** crop choice, link(s) owned, day-0 payment vs T+15, advisory quality, finance source (balance sheet / pledge / anchor), price shock.
**Outputs live:** farmer ₹/yr uplift, FPO margin, working capital required, months-to-insolvency.
Judges can reproduce OUR combination (a "our recommendation" preset button) — and then break it with their own. Showing why other combos die IS element 4 (considered & rejected) made interactive.

### S4 — The sweet-spot spectrum
Crop/segment opportunity map. Center: TAM bubbles per candidate crop. **Right rail:** market concentration of big players per segment (top-3 share bars). **Left rail:** live-styled news clippings — headlines of incumbents winning contracts (each a real, dated, linked article). Background **aura interpolates red→green** as the user's cursor/selection moves across segments: red = high concentration/low TAM, green = the sweet spot (highest TAM × least concentration × best opening). Our chosen crop sits visibly in the green — but the spectrum is honest; the scoring formula is displayed.

### S5 — Footnotes of the journey
The decision log rendered as annotations: what we considered, rejected, and why; the working-the-AI moments (first answer → what we did → what changed). Scrolls like end-credits with expandable entries. This scene alone covers submission elements 4 and 6.

## Engineering rules
- **Stack:** Next.js (App Router) on Vercel · react-three-fiber + drei for 3D · Framer Motion for 2D scene transitions · Lenis (or native scroll-timeline) for smooth scroll · Zustand for simulator state. No CMS — content compiled from vault markdown.
- **Single source of truth:** `data/ledger.json` + `data/scenarios.json` generated from the vault. A number appearing on the site but not in the Link Ledger is a build error.
- **Simulator is pure functions:** the stock-flow model lives in one typed module (`model.ts`) with unit tests pinning OUR scenario's outputs — the site and the appendix math can never diverge.
- **Performance budget:** LCP < 2.5s on mid-range mobile; 3D scenes lazy-mounted per section; static fallback (2D SVG) when WebGL unavailable — judges may open this on a locked-down laptop.
- **Degradation path:** the whole narrative must read scroll-only with JS animations off (SSR text + numbers visible). The PDF-export of the site is the insurance submission.

## Working agreement
- Content lock before polish: scenes ship with real numbers on grey boxes first; beauty passes only after the Quant signs the data.
- Every design decision that rejects an alternative goes to the decision log (element-4 fuel).
- Storyboard → grey-box → data-bind → motion → polish. Never skip grey-box.
