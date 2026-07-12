# Mobile View Spec Sheet v1

Design spec for the phone rendering of the R1 site (https://charan-bcg.vercel.app/). Desktop is the primary judging surface; mobile must be credible, not heroic. Status: planned, not yet implemented. No em dashes anywhere in copy, per standing rule.

## Foundations

**Breakpoints.** One real breakpoint: `md` (768px). Below it, the mobile grammar in this sheet applies. `sm` (640px) is only for fine-tuning type sizes. Do not build a tablet-specific layout; tablet gets desktop with tighter padding.

**Type scale downshift.** The phi scale (14/23/37/60/97/157) drops one step on mobile: display numerals cap at 97px, hero at 60px where 97 was used, body stays 16px minimum. Never let a numeral force horizontal scroll.

**Spacing.** Horizontal padding: 20px constant. Vertical rhythm compresses roughly 30%: where desktop breathes a full viewport, mobile breathes 60vh.

**Interaction rule: hover does not exist.** Every hover behavior needs a tap equivalent, decided per component below. Tap targets minimum 44x44px. `@media (hover:hover)` already gates hover styles; the tap paths are additive.

**Motion.** Same wane grammar, shorter distances (8px translate instead of 16-24px), no blur on entrances (GPU cost on low-end phones). Scroll-pinned sequences shorten: pin distances at most 150% viewport instead of 200%.

**Performance budget.** No backdrop-blur on more than one element per screen. The S3 model must run its monthly steps in under 4ms on a mid-range phone (it is deterministic math, this is achievable). Images/SVG only, no video.

## Per-surface specs

### S1 hero (THE Rs 100 PROBLEM)
Stack vertically: micro-label, then the numeral block centered (not right-aligned), then the paragraph. Numeral at fs-5 (97px) max. Shimmer and light ray retained (cheap, transform/opacity only). The 5:7 asymmetric grid collapses to a single column; asymmetry on mobile is expressed by off-center text blocks (paragraph left-aligned, max-width 30ch) rather than by columns.

### S1 waterfall (pinned)
The horizontal 4-segment bar stays horizontal (it fits; segments are proportional). Labels: the four category micro-labels rotate out of one line; on mobile they move INTO the segments as stacked two-row layout: bar on top, then a 2x2 grid of label+number cells, uniformly spread, all four labels on one shared line per row, numbers below. Pin shortens to 150%.

### S1 structural constraint stats
Already a centered column on desktop. Mobile: same, gap tightens, numerals cap at fs-4. Static (no animation, per standing decision).

### Donut + strip legend
Stack: micro-label heading, donut (max-width 300px, centered), legend below the chart as 4 full-width horizontal rows (the vertical strip metaphor does not survive narrow screens). Each row: pct in mono left, label right, ring-colored left border 2px. Tap a row: it expands downward showing the one-line meaning, and the corresponding ring highlights while others dim; the McKinsey leader line is desktop-only (suppressed below md). One row expanded at a time.

### S2 chain rack (L0-L6)
Seven cards become a vertical accordion list. Each row: L-number, title one line, ghost stat right-aligned. Tap expands the row downward revealing stat large + caption + cite arrow. L3 Aggregation starts expanded. The three shared alignment levels translate to: all titles on one line per row, all stats at the same size, all captions in the same style. Horizontal card rack is desktop-only.

### S3 calculator
Sliders and outputs stack: outputs FIRST (the four big mono numbers in a 2x2 grid, sticky at top of the scene while sliders scroll under them, `position: sticky; top: 0` with the section bar offset), then sliders full-width below, then the preset button full-width. Verdict line sits inside the sticky output block. Sliders: native range inputs restyled, 44px touch height.

### S4 spectrum
The horizontal score band rotates to VERTICAL on mobile: score axis runs bottom (red, 0) to top (green, 1), bubbles positioned by cy = score, radius by sqrt(TAM) clamped 10-40px. Band height ~130vh, scrollable naturally within the page. Tomato at top with glow. Tap bubble: bottom-sheet detail panel slides up (fixed, 60vh max, scrollable) with TAM, top-3 bars, opening, farmer share, cites; swipe-down or X to dismiss. Left rail clippings move below the band as a horizontal snap-scroll strip of cards. Formula line wraps to two lines above the band, MOCK badge inline.

### S5 footnotes
Already list-like; single column, expandable entries tap-to-open. No change beyond padding.

### Section bar (bottom)
Keep it. Labels shrink to short forms on mobile: Rs 100 / Chain / Model / Spot / Notes. Horizontal scroll if needed, active item scaled 1.1 and full white, inactive 40%. Height 40px; all scenes get bottom padding to clear it.

### Cite arrows + tooltip
Arrow tap on mobile goes STRAIGHT to the citation drawer (no tooltip step; tooltips are a hover concept). Drawer becomes a bottom sheet. Arrow hit area expands to 44px invisible padding.

## QA checklist (per deploy)
- iPhone SE width (375px): no horizontal scroll anywhere, no clipped numerals
- Pixel-class mid-range: 60fps scroll through S1 pin and S4 band
- All tap targets 44px+, all hover data reachable by tap
- Section bar never covers the last line of a scene
- Reduced-motion pass: everything readable with zero animation
