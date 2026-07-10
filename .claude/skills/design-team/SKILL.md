---
name: design-team
description: The case-deliverable design team. Use when building, designing, or reviewing the R1 portfolio website — scroll scenes, the system-dynamics simulator, the sweet-spot spectrum, or any visual/interactive asset for the BCG OutPrompt submission. Encodes the aesthetic laws (Anduril/Palantir/D.E. Shaw), the five-scene architecture, the single-source-of-truth data rule, and performance budgets.
---

# Design Team — R1 Portfolio Website

## Mission
One live Vercel website that IS the submission: scroll-driven, cinematic, interactive — but **analysis-first**. R1 is scored on thinking; the site is the delivery vehicle. If a scene doesn't render a cited number or a logged decision, it doesn't ship.

## Design intent (one line)
**Simple, immersive visual experience.** Blend: **Obys 60%** (art-directed typographic composition, grids that break themselves) / **Pudding 40%** (data-forward clarity — when a chart speaks, nothing else does).

## Composition doctrine (v2 — supersedes any equal-grid instinct)
1. **Size encodes argument weight, not grid convenience.** The number that carries the argument is the biggest thing on screen; context numbers step down. Equal-column grids of like content are BANNED.
2. **φ modular scale.** Type: 14 / 23 / 37 / 60 / 97 / 157px (×1.618). Spacing steps likewise geometric. Column splits: 5:7 or 4:8 (≈golden), never 50/50.
3. **Multiple alignment axes.** The page has a moving spine: a block anchored right is answered from the left; callouts break the margin. The eye must travel diagonally, not just descend.
4. **Centering is rationed.** Reserved for thesis sentences (Spine claims) only — one centered line per scene max; it lands like a gavel because everything else is asymmetric.
5. **Waxing/waning — scroll dynamics.** Density breathes like musical dynamics: fortissimo (one huge numeral, 60%+ viewport, surrounded by dark) → pianissimo (one small mono caption, lots of black) → build again. Never two consecutive screens at the same density.
   **Dynamics map:** S1 ff → pp → f · S2 dense mp · S3 interactive mf · S4 crescendo to ff (the sweet spot reveal) · S5 pp whisper credits.
6. **The Exhibit Stage.** Charts get a dedicated full-viewport stage: ONE chart alone on the plinth — micro-label top-left, the chart owning center stage at generous size, citation + one-line takeaway bottom. No prose competing beside it (Pudding rule: the chart IS the paragraph). Reusable `<ExhibitStage>` wrapper; used for industry-context pieces (donut/radial of smallholder output shares, farmer-share stacked bars, TAM bubbles). Direct labeling on the chart, never detached legends where avoidable.

## Motion grammar v2 (defer to the `emil-design-eng` skill — read it before animating anything)
- Entrances "wane in": translateY 8–24px + opacity 0→1 + subtle `filter: blur(4px)→0`, custom `cubic-bezier(0.23, 1, 0.32, 1)`, stagger 30–80ms.
- UI interactions <300ms; scene-scale scroll reveals may run longer but stay scroll-scrubbed (interruptible), never autoplay.
- Only `transform`/`opacity` (+ blur sparingly, <20px); no `transition: all`; exits faster than entrances; `prefers-reduced-motion` = gentler, not zero; hover gated behind `@media (hover:hover) and (pointer:fine)`.

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

## Reference library (real, pulled 2026-07-10 — study before building)
- **Palantir's actual design system is open source:** [Blueprint](https://blueprintjs.com/) ([repo](https://github.com/palantir/blueprint), [their scaling-design blog](https://blog.palantir.com/scaling-product-design-with-blueprint-25492827bb4a)) — React toolkit "optimized for complex, data-dense interfaces." Use it (or mimic its density/panel idioms) for the S2 link panels — that IS the Foundry look, from the source.
- **The scrollytelling production stack, per current practice:** Lenis (smooth scroll) + GSAP ScrollTrigger (scroll-scrubbed timelines) + Three.js/R3F — [Metabole's scrollytelling guide](https://metabole.studio/en/blog/scrollytelling), [2026 trends](https://svilenkovic.com/3d/scrollytelling-trends-2026), [award-style Next.js+three.js+GSAP walkthrough](https://dev.to/robinzon100/build-an-award-winning-3d-website-with-scroll-based-animations-nextjs-threejs-gsap-3630), [scroll-driven three.js+GSAP pattern](https://medium.com/@pablobandinopla/scroll-driven-presentation-in-threejs-with-gsap-a2be523e430a).
- **The S3 simulator's lineage (the "nurses in a hospital" model):** NHS England's system-dynamics workforce models — [Introduction to System Dynamics workforce modelling (NHS Transformation Partners, 2016)](https://www.transformationpartners.nhs.uk/wp-content/uploads/2017/11/Introduction-to-System-Dynamics-workforce-modelling.pdf) — stocks (staff in post), flows (recruitment/attrition), scenario sliders. Same pattern, our stocks: members / working capital / volume; our attrition: side-selling. Academic backing: [SD in healthcare systematic review](https://www.mdpi.com/1660-4601/17/16/5741), [Thailand health-workforce SD model](https://pmc.ncbi.nlm.nih.gov/articles/PMC7943938/).

## Engineering rules
- **Stack:** Next.js (App Router) on Vercel · react-three-fiber + drei for 3D · GSAP ScrollTrigger for scroll-scrubbed timelines · Lenis for smooth scroll · Blueprint (or Blueprint-idiom panels) for data-dense UI · Zustand for simulator state. No CMS — content compiled from vault markdown.
- **Single source of truth:** `data/ledger.json` + `data/scenarios.json` generated from the vault. A number appearing on the site but not in the Link Ledger is a build error.
- **Simulator is pure functions:** the stock-flow model lives in one typed module (`model.ts`) with unit tests pinning OUR scenario's outputs — the site and the appendix math can never diverge.
- **Performance budget:** LCP < 2.5s on mid-range mobile; 3D scenes lazy-mounted per section; static fallback (2D SVG) when WebGL unavailable — judges may open this on a locked-down laptop.
- **Degradation path:** the whole narrative must read scroll-only with JS animations off (SSR text + numbers visible). The PDF-export of the site is the insurance submission.

## Working agreement
- Content lock before polish: scenes ship with real numbers on grey boxes first; beauty passes only after the Quant signs the data.
- Every design decision that rejects an alternative goes to the decision log (element-4 fuel).
- Storyboard → grey-box → data-bind → motion → polish. Never skip grey-box.
