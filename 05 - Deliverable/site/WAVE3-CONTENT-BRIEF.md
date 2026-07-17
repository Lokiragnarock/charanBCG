---
title: "WAVE 3 content brief — ledger.json field bindings for the platform-model expansion"
type: handoff
status: active
created: 2026-07-17
---

# Wave 3 content brief

> Written by Wave 2 (data-only pass). Every field named below already exists in `src/data/ledger.json` — do not re-research, just bind. Read via `src/lib/ledger.ts` the same way the rest of the site does. Full reasoning behind each field: [[../02 - Research/PS4 - Link Ledger.md]] §B7, [[../02 - Research/PS4 Agri/FPO Platform Model — Handoff Spec.md]], [[../02 - Research/PS4 Agri/Financials and Margins Deliberation.md]].
>
> **The core discipline, restated:** every number needs a 🟢/🟡/🔴 confidence tag somewhere the reader can find it (via CiteDrawer / appendix). Fields tagged `"tag": "design"` in ledger.json are NOT sourced facts — they are our proposed operating-model construct. Copy for those sections must read as "here is how we propose to run it," never as an established fact. Do not phrase design fields with the same declarative confidence as a 🟢/🟡 sourced number.

---

## 1. Ownership boundary (own / partner / own-later)

Bind to: **`assetOwnershipBoundary`**
- `own[]` — three items the FPO holds outright (demand contract, quality gate, coordination software). These are asserted as the FPO's actual asset strategy — present as the core design thesis, not hedged, but note the `tag: "design"` on the whole object means the *strategy itself* is our proposed model, even though each underlying fact (chamber capex, working-capital ceiling, existing Theni infra) is separately sourced elsewhere in the ledger.
- `rentOrAccessYear0to2[]` — ripening chambers, trucks, financing capital: all rented/partnered, not owned, in years 0–2.
- `neverOwned[]` — farmland (obviously; state this plainly, it's a structural fact, not a hedge).
- `maybeYear3Plus[]` — chambers, if scaled; cross-reference `ripeningChamberCapex` for the cost figure when this appears on the page.
- **Phrasing rule:** "The FPO owns the demand contract, quality gate, and coordination logic. It rents or partners for chambers, trucks, and financing — and never owns farmland." Do not phrase this as "the FPO must/should own X" — phrase as what the model does, with the caveat line already in the `note` field surfaced somewhere (footnote or CiteDrawer).

## 2. Order-to-value operating loop

Bind to: **`sixFunctionReroute`**
- Six rows: demand scheduling, grading, financing, ripening, logistics, traceability. Each has `before` and `platform` text.
- **Phrasing rule:** the `before` column is fact — cite it plainly (it references already-sourced ledger numbers: ₹2/kg ripening toll = `ripeningCharge`, A/B/C grade spread = `gradeSpreadCapture`, 10% TN commission = `commissionRateByRegion`). The `platform` column is proposed reinvention — use conditional/proposed language ("the platform routes X instead of Y"), not "the platform does X" as settled fact if a judge would read it as already proven. This mirrors the existing three-toggle ValueChain.tsx scene's REINVENTED toggle — reuse that toggle's tone, don't contradict it.

## 3. Seven solution pillars (adds "waste management" as 7th)

The first six pillars already have ledger backing from the existing platform/OperatingLoop content (demand scheduling, grading, financing, ripening, logistics, traceability — same six as §2 above, just framed as "pillars" rather than a before/after table). The **7th pillar — waste management** — binds to:
- **`bananaPseudostem`** (existing field) — raw stems ₹400/MT, fiber A-grade ₹300–400/kg, profitability uplift 15.5–17%.
- **`bananaPseudostemExtended`** (new) — fiber B-grade ₹250–300/kg, biogas feedstock USD 0.067–0.093/tree.
- **Phrasing rule:** these are 🟡 reported (MDPI circular-bioeconomy papers, secondary) — present as "documented uplift from pseudostem monetization elsewhere in banana value chains," not yet a Theni-specific pilot result. Do not imply the FPO has already captured this uplift.

## 4. Ripening ownership staging (access → control → lease → own with stage-gates)

Bind to: **`ripeningOwnershipStages`**
- Four stages with `description`, and a `stageGates[]` array with the gate condition between each pair.
- **Critical honesty point:** the "Control → Lease" gate names "known electricity cost per kg" as its condition — and that number **does not exist anywhere** (see `ripeningChamberOpexGap`). The "Lease → Own" gate names "positive lease-vs-own economics" — also not modeled. **The copy must say the gates are not yet passable with today's information**, not just list them as a clean staircase. This is the single most important honesty constraint in this section — do not let the stage diagram imply the FPO already knows when to move from one stage to the next.
- **Phrasing rule:** frame the whole section as "how we propose to sequence ripening-asset ownership, including where the model currently can't yet tell you when to move to the next stage."

## 5. Waste recovery loop

Bind to: **`bananaPseudostem`** + **`bananaPseudostemExtended`** (same fields as pillar 7 above — this is likely the same content, deeper). Also reference **`bananaValueChainLossTN`** (existing field: 9% total TN loss breakdown by stage — retail 3.9%, storage/ripening 2.1%, wholesale 1.9%, field 0.8%, transport 0.3%) to frame waste recovery against the loss it's addressing.
- **Phrasing rule:** the loss breakdown (`bananaValueChainLossTN`) is 🟡 GT Deck — solid. The pseudostem monetization numbers are also 🟡 but describe OTHER value chains' documented uplift, not a proven Theni result — keep those two claims distinct in the copy (don't merge "TN loses 9%" with "pseudostem recovery closes X% of that 9%" — no source computes that specific linkage; it would be an invented synthesis if stated as fact).

## 6. Money & governance

Bind to: **`governanceMechanisms`** (chamber fee-setting, member patronage distribution, risk reserve, FPO-capture-mechanism open question) + **`platformFeeWorkingAssumption`** + **`platformFeeBenchmarks`** + **`ripeningChamberCapex`** + **`ripeningChamberOpexGap`** + **`backhaulEconomics`** + **`fpoCreditSubstitutes`**.
- **Every one of the four `governanceMechanisms` sub-objects is `tag: "design"`.** Copy must use explicitly proposed/conditional language: "we propose to set the chamber fee at or below the ₹2/kg market toll, reviewed seasonally by a board committee" — NOT "the FPO sets the chamber fee at..." State plainly, once, prominently: *these are proposed mechanisms, not yet validated against a real FPO's bylaws.*
- `fpoCaptureMechanismOpenQuestion` is the most load-bearing honesty flag on the whole site — the e-Choupal precedent shows the buyer (ITC) captured the coordination uplift, not farmers; our claim that farmer-ownership fixes this is *asserted, not proven*. If Wave 3 builds any FAQ/Q&A pattern into this section, this question should be answered honestly as "open," not resolved.
- `platformFeeWorkingAssumption` (~2% of volume) must be labeled as an unbenchmarked working assumption every time it's shown numerically — pair it with `platformFeeBenchmarks` context (Ninjacart 12–15% gross margin as the loosest available comparable) so a reader sees the assumption isn't invented from nothing, but also isn't validated.
- `ripeningChamberOpexGap` should appear here too if the page discusses ripening margin economics — the capex/subsidy side is 🟢 solid (NHB Cost Norms, primary), the opex side is a genuine unsourced gap; do not let a chamber P&L implied on the page look fully costed.
- `backhaulEconomics` — present as generic India-wide freight benchmarks, explicitly not banana/Theni-specific; no Milkymist/Kashmir-apple sector precedent exists despite searching.
- `fpoCreditSubstitutes` — factual government-scheme numbers (🟡 reported), safe to state directly; the Chinnamanur 100%-member-credit-extension figure is a real precedent point, distinguish it from our own proposed governance (it describes an existing FPO, not our design).

## 7. Scaling roadmap

Bind to: **`scalingRoadmapSequencing`** + **`sahyadri`** (existing field: revenue/CAGR/farmer count).
- **Phrasing rule:** the *principle* ("asset-light year 0–2, own-vs-rent line moves right as volume proves out") is a fair characterization of the Sahyadri precedent (Precedents.md) — state confidently. The specific **"~15 years" figure must NOT be stated as a precise, sourced number** — the `caveat` field in the ledger entry says Sahyadri's 2010–14 unit economics are still unextracted from primary sources (open gaps-queue item). If the roadmap page shows a timeline graphic with "15 years" on it, either drop the specific figure or visibly label it as an approximate characterization, not a citation.
- Also state the counter-caveat already in the field: Sahyadri proves the sequencing pattern works in **export-grade horticulture** with a much larger balance sheet than a median FPO (working capital <₹3 lakh, `fpo.workingCapitalLakh`) — don't let the roadmap imply this FPO starts from Sahyadri's resource base.

---

## What Wave 2 did NOT touch
- No `.tsx` files were edited. This wave is `ledger.json` + this brief + a Link Ledger update (§B7) only.
- `spectrum.json` untouched.
- `SITEMAP.md` content structure untouched (one pointer line added, no structural edit).

## Build status at handoff
`npm run lint` — clean, no warnings. `npm run build` — succeeded, all 6 routes (`/`, `/appendix`, `/clusters`, `/history`, `/platform`) compiled and statically generated with the extended `ledger.json`.
