# Build Notes

## v2 — Composition doctrine (2026-07-10)

Recomposed S1 and the shared design tokens to kill the equal-box,
all-left-aligned spreadsheet look. Blend target: Obys 60% (art-directed
typographic asymmetry) / Pudding 40% (data-forward clarity).

### Tokens (`globals.css`)
- φ type scale as CSS vars `--fs-1..--fs-6` (14/23/37/60/97/157px), `--fs-6`
  clamped for mobile (`clamp(64px, 8vw + 20px, 157px)`), exposed as Tailwind
  v4 font-size utilities via `@theme inline` → `text-fs-1` … `text-fs-6`.
- Geometric spacing scale `--sp-1..--sp-7` (8/13/21/34/55/89/144px), exposed
  as named Tailwind spacing tokens `--spacing-g1..--spacing-g7` → usable as
  `gap-g3`, `mt-g5`, `p-g4`, `translate-y-g2`, etc. (coexists with Tailwind's
  default numeric spacing scale; nothing was overridden.)
- Emil easing vars `--ease-out: cubic-bezier(0.23,1,0.32,1)` and
  `--ease-in-out: cubic-bezier(0.77,0,0.175,1)`.
- `.wane-in` CSS utility: entrance = translateY(16px) + opacity 0 + blur(4px)
  → settled, 500ms `var(--ease-out)`; a `[data-out]` state exits faster
  (300ms). Reduced motion collapses to opacity-only, no transform/blur.

### Reveal.tsx
- Registers GSAP `CustomEase` once as a named ease `"wane-out"`, built from
  the exact cubic-bezier control points (`M0,0 C0.23,1 0.32,1 1,1`) so the
  scroll-triggered variant and the pure-CSS `.wane-in` utility move on the
  identical curve.
- Entrance now animates `opacity` + `y: 16→0` + `filter: blur(4px)→0`,
  500ms, `ease: "wane-out"`.
- `prefers-reduced-motion`: opacity-only fade (no translate, no blur),
  300ms — per the "gentler, not zero" accessibility rule, not an instant
  snap.

### S1 recomposition
- **Hero (fortissimo):** 12-col grid, 5:7 split. Right 7 cols carry
  "THE" (fs-3) / "₹100" (fs-6, mono, signal-green, right-anchored) /
  "PROBLEM" (fs-3). Left 5 cols hold the intro paragraph (max-w 34ch),
  bottom-anchored via `items-end` so it sits low while the numeral towers
  above — the diagonal eye path: top-left micro-label → huge right
  numeral → low-left paragraph.
- **Waterfall:** left untouched structurally (still pinned via `pinRef`,
  no new flex/overflow-hidden ancestor added around it — the existing
  comment's warning was respected). Restyled only the label row beneath
  the bar: farmer and residual get `text-fs-4` treatment at a 4-col span
  each (opposite ends of the 12-col grid), trader/wholesaler drop to
  `text-fs-2` at 70% opacity, 2-col span each, nudged down
  `translate-y-g2` — asymmetric 4:2:2:4, not four equal columns.
- **Pianissimo beat:** new full-viewport, mostly-empty section right after
  the waterfall's pinned scroll ends. One centered mono line — "The
  middleman takes ₹5. The system takes ₹56." — values pulled from
  `traderMargin.value` (rounded) and `residual.tomato`, not hardcoded.
  This is the one centered line in the scene, per the "centering is
  rationed" rule.
- **Stat cascade:** the old 4-equal `grid-cols-4` is gone. 146M (fs-5) sits
  top-left (`col-start-1`); 86% (fs-4) offsets to `col-start-7` with extra
  `mt-g5`; 1.08 ha (fs-3) drops to `col-start-3` with `mt-g6`; 1/496 (fs-3)
  lands low-right at `col-start-8` with `mt-g7`. Each block is its own row
  with alternating col-start and increasing margin-top — a diagonal
  descent, not a row.
- **Contrast card → pull-quote:** moved out of the `max-w-[1400px]`
  container into its own full-width wrapper so its 12-col grid spans the
  true viewport width. The panel starts at `col-start-6` and, because the
  grid track itself reaches the browser edge (no right padding on that
  wrapper), the panel's right edge lands on the true viewport edge —
  genuine full-bleed, not a visual approximation clipped by the page
  container. Border is hairline on left/top/bottom only (`border-l
  border-t border-b`, no right border).

### ExhibitStage + first exhibit
- New `src/components/ExhibitStage.tsx`: full `min-h-screen` section,
  micro-label top-left, chart centered at `max-w-[720px]`, takeaway +
  `<Cite>` bottom-left. Nothing else on the stage.
- New `src/components/charts/SmallholderDonut.tsx`: inline-SVG radial
  chart, four concentric rings (land / veg / fruit / cereal), muted
  outer ring = context (land share), signal-green inner rings = the
  story (output shares). Direct labels at each arc's end point (computed
  via `arcEndPoint()`, no detached legend). Arcs draw in via
  `stroke-dashoffset` on scroll-into-view (`ScrollTrigger`, play-once,
  `wane-out` ease with a `power3.out` fallback if the ease isn't
  registered yet); reduced motion renders the final state statically,
  no draw-in.
- Data added to `ledger.json` under `smallholderOutput` (`landPct: 44,
  vegPct: 70, fruitPct: 55, cerealPct: 52, source: "brief"`), plus a new
  `sources.brief` entry. Wired into `page.tsx` between S1 and S2 via
  `<ExhibitStage>` — no numbers hardcoded in the component.

### Quality bar
- `npm run lint` — 0 errors, 0 warnings.
- `npm run build` — compiles clean, all routes static.
- Dev server verified via `curl http://localhost:3000` → 200, left running
  on port 3000 for live viewing.
- No 50/50 splits or equal-column grids of like content introduced;
  existing S2 link grid (7 links, data-driven, not "like content" in the
  banned sense) was left untouched — out of scope for this pass.

### Deviations / judgment calls
- The φ spacing scale was added as *additional* named Tailwind spacing
  tokens (`g1..g7`) rather than overriding Tailwind's default `--spacing`
  multiplier, to avoid breaking every existing numeric spacing utility
  (`px-6`, `gap-6`, etc.) used elsewhere in S2–S5. Both scales now coexist.
- The pull-quote's full-bleed-right technique uses a dedicated full-width
  grid wrapper (left-padded to roughly match the main container's gutter)
  rather than a single negative-margin hack on an element still nested
  inside the `max-w-[1400px] px-6` container — negative-margin alone
  couldn't reliably reach the true viewport edge once the container's own
  padding was accounted for. Visually equivalent outcome, more robust
  across viewport widths.
- Reveal.tsx's "exits faster than entrances" rule doesn't apply — Reveal is
  a one-shot scroll-in-view reveal with no exit transition. The rule is
  captured in the `.wane-in` CSS utility's `[data-out]` state instead, for
  any future component that toggles in/out (e.g. drawers, modals).
