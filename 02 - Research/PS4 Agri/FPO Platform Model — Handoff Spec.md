---
title: "FPO Platform Model — Handoff Spec"
type: spec
status: active
created: 2026-07-17
tags: [ps4, banana, fpo, platform, handoff, spec]
---

# FPO Platform Model — Handoff Spec

> **Purpose:** the website's narrative (cover → national problem → sweet spot/Theni → local corridor money → reinvention toggle → close) walks a reader through the *problem* and the *mechanics of reinvention*, but never stops to define **the entity itself** — what the FPO is, what it owns, how it's governed, and how it makes money. This file is that missing definition, self-contained, for handoff to a reasoning agent. Every claim below traces to a vault note; nothing here is new research — it's synthesis.

---

## 1. What the FPO is

A **Farmer Producer Organisation** — a member-owned company/cooperative structure, farmers as shareholders — operating in **Theni, Tamil Nadu**, on **banana** as its first and only crop (Spine C6: one crop, one district).

It is **not** a new intermediary layered onto the existing chain. It is a **replacement operating system** for the coordination function that contractors, commission agents, and wholesalers currently perform — built on the e-Choupal law: **asset-light coordination over ownership** ([[e-Choupal Banana OS]]). ITC never owned the physical chain and won the coordination game anyway; our FPO does the same, except member-owned instead of buyer-owned (the explicit delta over the e-Choupal precedent — see §5).

**What "platform" means here, precisely:** the FPO does not (in year 0–2) buy trucks, chambers, or packhouses. It owns three things: **the demand contract** (retailer order book), **the quality gate** (grading + lot identity), and **the coordination logic** (scheduling, routing, allocation). Physical assets are rented, leased, or accessed via existing government/private infrastructure (Spine C3).

---

## 2. What it owns vs. rents (the asset ledger)

| Asset / function | FPO owns it? | Basis |
|---|---|---|
| Demand contract (retailer order book) | **Yes — this is the core asset** | Node 3 of [[e-Choupal Banana OS]] |
| Quality gate (grading standard + lot ID/QR) | **Yes** | Node 2; RBI-named traceability gap (no "BananaNet") |
| Coordination software (scheduling, routing) | **Yes** | The e-Choupal law |
| Ripening chambers | **No, in year 0–2** — allocated by order, not owned; 5 govt-MIDH units already exist in Theni (895 MT) plus 5 free govt packhouses | [[Banana Cluster Spectrum Data]] — Theni cluster detail |
| Ripening chambers, if scaled | **Maybe, year 3+** — now costable: capex ₹1.00 lakh/MT, MIDH/NHB subsidy 35% (general) / 50% (hilly/NE) | Ledger §B6 (NHB Cost Norms, primary) |
| Trucks / transport fleet | **No** — rents/partners; hub-and-spoke uses existing haulage (Tata Ace/Eicher class) | GT Deck §7; [[e-Choupal Banana OS]] logistics section |
| Financing capital | **No — never off own balance sheet** | Spine C5: partner rails (KCC/pledge/anchor), NOT NBFC-ization; FPO working capital is structurally too thin (<₹3 lakh median, IJEE 2022) to originate credit |
| Farmland | **No, obviously** — farmers retain ownership; the FPO is a coordination layer over independent smallholdings | Structural constraint (146M holdings, 86% <2 ha, brief Exhibit B) |

**Sequencing rule (Spine C3, contested but resolved via sequencing):** asset-light is the year-0–2 posture. Sahyadri (the closest precedent) DID eventually buy assets — but only after 15 years of order-book-first operation de-risked the volume. The FPO's own-vs-rent line moves right as volume proves out; it does not start there.

---

## 3. The six functions the platform performs (and who performed them before)

This is the "reinvention" from the toggle scene, stated as an operating model rather than a UI:

| Function | Before (as-is chain) | Platform (re-routed) |
|---|---|---|
| **Demand scheduling** | Contractor guesses/reacts to market; farmer grows blind | Retailer order book (volume, grade, delivery cadence, forecast) drives planting schedule *before* harvest |
| **Grading** | Post-sale, in contractor's hands — farmer never captures the A/B/C spread (₹10/8/5, a 2× gap) | Farm-gate, pre-sale, with a digital lot ID (QR) attached — farmer captures part of the grade spread |
| **Financing** | Contractor's interest-free advance, cost extracted through *price* (zero-bargaining, ≤3-week payment delays, buyer absorbs crash losses) | Day-0 digital payment on **partner rails only** (KCC/pledge/anchor finance) — never the FPO's own book |
| **Ripening** | ₹2/kg toll, allocation-blind, dwell-time and loss unmanaged | Allocated by order — matched to grade × buyer delivery timeline, same toll, less loss |
| **Logistics** | Fragmented, commission-agent-arranged, empty backhauls | Hub-and-spoke: Theni collection spokes → ripening-chamber hubs → retail; return legs loaded with Karnataka-cluster goods (coffee etc.) for max truck uptime |
| **Traceability** | None — RBI explicitly states banana has no GrapeNet/MangoNet equivalent | QR lot ID: farmer, village, harvest date, grade, ripening status — retailers subscribe to recurring supply against a spec |

Full detail on each: [[e-Choupal Banana OS]] (Nodes 1–3) and the `/platform` page spec in that same note ("Site structure v3").

---

## 4. The money — what changes, function by function

Baseline: the **local corridor** (Theni→Madurai/Cochin, ~130 km), **not** the RBI's long-haul Jalgaon→Delhi number. Rationale for this modeling choice, and the full activity↔payment table for both the as-is and re-routed chain: **[[Financials and Margins Deliberation]] §1–3.** Key anchors, restated:

- **As-is baseline: 52% farmer share** (BVC1, traditional multi-layer chain, TNAU 2014).
- **Proven ceiling: 65.45% farmer share** (BVC2, farmer-co-owned modern wholesale chain) — proven at **Chinnamanur, inside Theni district**. This is not a projection; it is a **precedent that already exists in our own cluster**. Rule: **the precedent IS the claim** — nothing beyond 65.45% is stated anywhere judge-facing (this replaced and killed an earlier, unciteable "₹22→₹55/kg" claim).
- The gap between 52% and 65.45% (+13.45 pts, ≈ +₹2.5/kg, ≈ **₹60–75k/yr per acre**, our own illustrative arithmetic — labeled modelled) is the platform's value-creation target, not an invention.

### What the FPO/platform itself earns (the open front)
This is **the least-deliberated part of the model** and the one most likely to get asked about in Q&A. Candidate revenue lines, per [[Financials and Margins Deliberation]] §4:
1. **Per-kg linkage fee** — working assumption ~2% of scheduled volume. **Unbenchmarked externally** — best comparable found is Ninjacart's 12–15% blended gross margin (secondary, not a published fee schedule); an "ONDC charges 2–5%" claim in circulation was checked and **rejected as an uncited, unsourced blog claim** (Ledger §B6) — do not cite it.
2. **Grade-premium share** — a cut of the farm-gate-grading uplift; aligns incentive to grade honestly. Needs mechanism design, not yet specified.
3. **Ripening margin** — only if the FPO later operates/leases chambers (year 3+); now costable (capex ₹1.00 lakh/MT, 35–50% subsidy) but opex (electricity, the binding constraint) has no sourced ₹/kg figure anywhere.
4. **Backhaul freight revenue** — the Karnataka return-leg play. Directional India-wide numbers exist (30–40% of return legs run empty; loaded/empty rate asymmetry 20–40%; realized backhaul programs cut freight cost 9–15% — all secondary, generic, not banana- or Theni-specific).
5. **NOT a financing spread** — explicitly ruled out (Spine C5). The FPO facilitates/originates on partner rails at most; it does not lend off its own book. NBFC-ization is flagged as a regulatory/capability trap.

**The binding constraint that must not be dropped from any pitch:** median FPO working capital is **<₹3 lakh** (IJEE 2022) — about one truckload. Day-0 farmer payment at any real volume is impossible without the partner-rail financing being genuinely operational; if that financing isn't real, the model fails at the first truckload (Spine C2). This is not a caveat to bury — it is the single biggest execution risk in the whole model, and a sharp reasoning agent or judge will ask about it first.

---

## 5. Governance — who captures the gain (the honest caveat)

The e-Choupal precedent proves coordination-over-ownership works — but ITC, the **buyer**, captured the uplift, not the farmers (Precedents.md). **Our stated delta over that precedent is FPO capture**: because the FPO is farmer-owned (member-shareholders), the uplift the platform creates should accrue to members, not to a separate corporate buyer sitting on top of the coordination layer. This is asserted, not yet proven — there is no citable mechanism (bylaws, profit-distribution formula, membership economics) establishing HOW capture is guaranteed rather than merely intended. Flag this as an open design question if a reasoning agent probes it.

---

## 6. Why banana, why Theni (one paragraph, for context)

Two different corridor decompositions exist for banana and they answer different questions. RBI's 30.8% (Jalgaon→Delhi, ~1,100 km) is the **national problem statement**. The local Theni corridor (52%→65.45%, TNAU 2014) is **our operating baseline and proven ceiling** — modeled on ~130 km, not 1,100. The corollary: **distance is a structural determinant of farmer share; proximity is a Theni advantage, not an accounting convenience.** Theni additionally clears the sweet-spot screen on: lowest post-harvest loss of any surveyed cluster (9% vs 18–30.5% elsewhere), two unmonetized GI tags (Virupakshi, Sirumalai — Jalgaon's GI precedent shows +50%/kg is achievable), weakest incumbent corporate competition (3–4% direct-sourcing penetration), and the BVC2 precedent physically inside the district. Honest cons: smallest cultivated area of the major clusters (17k Ha), zero tissue-culture labs (input dependency on Hosur/Coimbatore), thin ripening capacity (895 MT), and the highest local commission rate (10% vs 4–6% north) — full detail in [[Banana Cluster Spectrum Data]].

---

## 7. Open questions a reasoning agent should flag, not paper over

1. **Platform fee level** — no external benchmark closes the ~2% assumption; it is unbenchmarked, stated as such.
2. **FPO capture mechanism** — governance/bylaws design that ensures uplift reaches members, not a proxy buyer, is unspecified.
3. **Backhaul revenue** — modeled off generic India logistics benchmarks, not a banana- or Theni-specific precedent.
4. **Ripening opex** (electricity ₹/kg) — no source found anywhere; capex is known, opex is not.
5. **Volume base** — Theni's marketable surplus is confirmed at **0.35 lakh MT** (GT/MoFPI primary, Table 102) — an earlier 0.48 figure does not appear in the source and should not be used.
6. **Pauline & Ajjan (2014) full text** — even its citation is contested between two journal names; the 52%/65.45% headline numbers are solid (cited by RBI-adjacent synthesis) but stage-wise mechanism detail from the original paper has not been independently verified.

---

## Links
[[e-Choupal Banana OS]] · [[Financials and Margins Deliberation]] · [[Banana Cluster Spectrum Data]] · [[The Spine - Central Argument]] · [[../PS4 - Link Ledger]] §B/§B5/§B6 · [[Precedents]]
