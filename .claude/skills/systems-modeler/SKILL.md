---
name: systems-modeler
description: Build and maintain the FPO system-dynamics model (stocks, flows, feedback loops) behind the website's S3 simulator and the submission's scenario analysis. Use when defining model equations, adding scenarios, calibrating parameters from the Link Ledger, or implementing model.ts. Encodes the NHS-workforce-model pattern (the nurse retention/churn lineage), the FPO-specific stock-flow structure, and the honesty rules.
---

# Systems Modeler — the living model behind the recommendation

## Lineage (the pattern we're porting)
NHS England models nurse workforces as stocks (staff in post) with flows (recruitment in, attrition out) and scenario sliders — [Introduction to System Dynamics workforce modelling, NHS Transformation Partners 2016](https://www.transformationpartners.nhs.uk/wp-content/uploads/2017/11/Introduction-to-System-Dynamics-workforce-modelling.pdf). Vicious cycles (shortage → workload → attrition → worse shortage) become visible and testable. We port this to the FPO: **membership is the workforce, side-selling is the attrition, working capital is the oxygen.**

## The FPO stock-flow structure (v0)
**Stocks:** `members` · `working_capital ₹` · `volume_committed t` · `trust` (latent, drives joins & defection elasticity) · `inventory t` (if any link holds produce)
**Flows:** joins (fn: trust, income-uplift word-of-mouth) · **side-sell defections** (fn: spot-price gap, payment lag, credit tie to arthiya) · procurement spend (day-0 payments OUT) · buyer receipts (T+15/30 IN) · spoilage (fn: crop, days held — CIPHET rates) · fee/margin income · finance draw/repay (pledge/anchor/grant)
**Loops to make visible:**
- R1 (growth): uplift → trust → members → volume → better buyer terms → uplift
- B1 (the killer): volume ↑ → day-0 cash need ↑ → payment delays → defection → volume ↓
- B2 (spoilage): volume beyond grading capacity → losses → margin ↓ → capital ↓
**Exogenous sliders:** crop choice · link(s) owned · payment lag · finance source & limit · price shock ± · advisory quality (yield/grade shift)
**Outputs:** farmer ₹/yr uplift vs baseline (NSSO ₹3,798/mo crop income) · FPO margin · peak working-capital need · months-to-insolvency · % members reached (<2 ha share, women share)

## Honesty rules
1. **Every parameter default cites a Link Ledger row** — the simulator and the appendix can never disagree (single `ledger.json`).
2. **Pure functions in `model.ts`**, unit tests pin OUR preset's outputs; scenario = data, not code.
3. **Show the losing scenarios.** The judges must be able to reproduce the combos we rejected and watch them die (months-to-insolvency is the kill metric). That's element 4, interactive.
4. **No smoothing the cliff.** If a price shock bankrupts the model in month 7, the UI shows month 7 — credibility is the product.
5. Keep v0 in a spreadsheet/notebook until the equations stabilize; only then port to TypeScript (grey-box rule from design-team).

## Calibration order
1. Waterfall margins (RBI TOP decomposition — see `02 - Research/PS4 - RBI TOP Decomposition.md` once the extraction lands)
2. Spoilage by crop (CIPHET) · 3. Payment lags + finance rates (KCC 7%/arthiya 15–24%) · 4. Defection elasticity (weakest data — mark 🔴 Estimated, run sensitivity ±50% and show it)
