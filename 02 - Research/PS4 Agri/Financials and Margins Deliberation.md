---
title: "Financials & Margins — the money-split deliberation"
type: argument
status: active
created: 2026-07-17
tags: [ps4, banana, financials, margins, money-split]
---

# Financials & Margins — the deliberation of record

> Captured from the 07-17 working session (chat → vault). Numbers cite [[../PS4 - Link Ledger|Ledger]] §B/§B5; the *reasoning* lives here. Three questions: (1) which corridor do we model, (2) who earns what today, (3) who earns what after re-routing — including what **we** (the platform/FPO) earn.

## 1. Corridor choice — the modeling decision
Two decompositions exist and answer different questions:
| | RBI (Jalgaon→Delhi, ~1,100 km) | TNAU Pauline & Ajjan (Theni→Madurai/Cochin, ~130 km) |
|---|---|---|
| Farmer share | 30.8% (20–35%) | BVC1 52% · BVC2 65.45% |
| Role in our argument | The national problem (₹100 waterfall) | Our baseline (BVC1) and our proven ceiling (BVC2) |

**Decision:** model the LOCAL corridor with BVC1 = 52% as baseline. Rationale: we operate Theni→Kerala, not Theni→Delhi; using the long corridor would overstate the prize and a judge who finds Pauline & Ajjan catches it. Corollary insight (citable): **distance is a structural determinant of farmer share** — proximity is a Theni advantage, not an accounting convenience.

## 2. Who earns what today (BVC1 baseline, per kg, local corridor)
| Activity | Money | Who keeps it | Source status |
|---|---|---|---|
| Cultivation | cost ₹3.3–3.5/kg vs farmgate ₹9–10 → **farmer margin ≈ ₹6/kg** | Farmer | 🟢/🟡 (TNAU ₹1.83 L/ha basis incl. lease; RBI ₹1.29 L excl.) |
| Aggregation + trade commission | **10%** of transaction (TN; north clusters 4–6%) | Commission agent | 🟡 TNAU 2014 |
| Financing | advance is **interest-free**, adjusted at final sale — its cost is extracted through *price* (zero-bargaining fixed pricing, ≤3-week payment delays) | Contractor/financier | 🟡 |
| Grading | happens post-sale in contractor hands — farmer never captures the **A/B/C spread (₹10/8/5 = 2×)** | Contractor | 🟡 GT |
| Transport | ₹1–1.5/kg (Theni→Cochin 3–6 h) | Transporter | 🟡 GT |
| Ripening | ₹2/kg usage charge | Chamber operator | 🟡 GT |
| Losses | 9% of chain value (TN; vs 22–30.5% north) | absorbed/priced in | 🟡 GT |
| Retail | residual to ~₹18–19/kg implied local retail | Retailer | 🔴 derived from 52% share |

**The punchline (this is the problem statement):** the money isn't stolen — it pays for real functions performed inefficiently and for risk absorbed informally. Uncertainty is the product being paid for. So value capture = **re-performing functions better, not deleting people** (Spine C1 + C5).

## 3. Who earns what after re-routing (the platform chain)
The re-routing statement, function by function:
| Function | Today | Platform | Money moved |
|---|---|---|---|
| Grading | contractor, post-sale | farm-gate, pre-sale, digital lot ID | farmer captures part of the 2× grade spread |
| Aggregation/commission | 10% agent layer | platform fee (working assumption ~2%; **not yet costed** 🔴) | ~8 pts released into the chain |
| Financing | interest-free advance costing price | day-0 digital payment on partner rails (C5: never off own book) | removes the price-extraction lock |
| Ripening | ₹2/kg toll, allocation-blind | allocated by order (grade × buyer timeline) | same toll, less dwell/loss |
| Transport | fragmented, empty backhauls | hub-and-spoke + loaded returns (Karnataka goods) | backhaul revenue = new line, uncosted 🔴 |
| Losses | 9% | compressed by scheduling + fewer handling hops | each point saved ≈ ₹0.18–0.19/kg at local retail |

**Endpoint anchor:** BVC2 = **65.45%** farmer share (+13.45 pts over BVC1), proven at Chinnamanur, *inside Theni district*. Rule: **the precedent IS the claim** — we do not project beyond 65.45% anywhere judge-facing. (This replaced the killed "₹22→₹55" claim — B4.)

### Farmer uplift bridge (per kg, at ~₹18.5 local retail, illustrative 🔴)
52% → 65.45% ≈ **+₹2.5/kg to the farmer**. On a 1-acre smallholding (~25–30 MT/yr marketable at Theni yields) that's roughly **₹60–75k/yr** additional — this arithmetic is OURS (🔴), label modelled wherever shown.

## 4. What WE earn (platform/FPO P&L) — partially deliberated 07-17
Candidate revenue lines:
1. **Per-kg linkage fee** (~2% working assumption) on scheduled volume — still a working assumption; no clean external "platform fee vs 10% agent" benchmark closed. Best available: Ninjacart blended gross margin 12–15% on fresh produce, 10–15% as an eNAM-logistics partner (🟡 secondary press, not a published fee schedule). The ONDC "2–5% vs 15–25%" claim in circulation is a **red flag — uncited blog, no methodology** — do not use it as a benchmark ([[../PS4 - Link Ledger]] §B6).
2. **Grade-premium share** — a cut of the farm-gate-grading uplift (aligns incentive to grade honestly; needs design).
3. **Ripening margin** — now costable. If we operate/lease chambers: **capex ₹1.00 lakh/MT, MIDH/NHB subsidy 35% (general areas) / 50% (hilly/NE)** (🟢 NHB Cost Norms, primary), spread over the ₹2/kg market toll (🟢 GT diagnostic Table 109, primary). Opex is still a gap — electricity is flagged as the binding constraint but no ₹/kWh or ₹/kg figure exists anywhere in the primary doc. ELSE zero (coordination-only).
4. **Backhaul revenue** — return-load freight on the Karnataka leg. Directional India-wide benchmarks now exist (🟡 secondary, NITI Aayog primary PDF blocked 403): ~30–40% of return legs run empty, loaded/empty rate asymmetry 20–40%, realized backhaul programs cut freight cost 9–15%. No banana/Theni-specific or Milkymist/Kashmir-apple number found — this line stays modeled off the generic India range, not a sector precedent.
5. **Financing spread** — NO (C5: partner rails, off our book; we take an origination/facilitation fee at most).
Cost lines: platform ops, grading labour/QR kit — still unknown. Chamber capex-or-lease is now costed (item 3 above, Ledger queue #8 CLOSED). Route ops still open. **FPO working-capital constraint (<₹3 lakh median) still binds** — day-0 payment at any volume requires the partner-rail financing to be REAL, or the model dies at the first truckload (Spine C2).

## 5. Open items blocking a full P&L
1. ~~Ripening chamber capex/opex (queue #8)~~ ✅ CLOSED 07-17: capex ₹1.00 lakh/MT, subsidy 35–50% (NHB Cost Norms, primary). Opex still open — no electricity/₹-per-kg figure exists in any source found.
2. Platform fee level vs agent 10% ⚠️ STILL OPEN — only loose comparables found (Ninjacart 12–15% gross margin, secondary); the circulating "ONDC 2–5%" number is rejected as an uncited claim. Our ~2% working assumption remains unbenchmarked.
3. Backhaul economics ⚠️ PARTIAL — generic India benchmarks found (30–40% empty legs, 20–40% rate asymmetry, 9–15% cost cut from backhaul programs), all secondary; no Milkymist/Kashmir-apple sector-specific precedent exists.
4. ~~Volume assumption (0.35 vs 0.48 L MT)~~ ✅ CLOSED 07-17: **0.35 lakh MT is the correct GT/MoFPI primary figure** (Table 102, p.79) — 0.48 does not appear in the source document; use 0.35 going forward.
5. Trace Pauline & Ajjan Figs. 3–4 for any extractable stage margins — ⚠️ STILL BLOCKED: even the citation is contested (two different journal names for the same 2014 study circulating: *Int. J. Commerce & Business Management* 7:367–371 vs *Trends in Biosciences* 7(14):1793–1799); ResearchGate record blocked (403). Needs a librarian-grade lookup, not another web search.
6. FPO aggregation margin benchmark (sanity-check the ~2% linkage fee) — ⚠️ NOT FOUND: no NABARD/NAARM per-kg or % figure exists; only proxy is IJEE 2022's whole-org ~6% net margin.

## Links
[[../PS4 - Link Ledger]] §B/§B5 · [[e-Choupal Banana OS]] · [[The Spine - Central Argument]] C1/C2/C5 · [[Banana Cluster Spectrum Data]] · [[../04 - Decision Log/2026-07-17 - e-Choupal centering, banana-Theni|Decision log 07-17]]
