---
title: "PS4 — Link Ledger: the chain quantified, data-source → consumer"
type: research
status: active
created: 2026-07-10
tags: [bcg-outprompt, ps4, numbers, value-chain, citations]
---

# PS4 — Link Ledger
> **Owner: [[../03 - Personas/The Quant|The Quant]].** Every link in the chain gets numbers; every number gets a source, date, and confidence tag.
> Tags: 🟢 **Verified** (primary source read) · 🟡 **Reported** (credible secondary, verify against primary) · 🔴 **Estimated** (ours, must be labelled as such in submission).
> This ledger feeds the website's waterfall scene and the simulator's default parameters directly — same numbers, one source of truth.

## The ₹100 waterfall (headline exhibit) — 🟢 VERIFIED
Where the consumer's ₹100 goes — RBI WPS (DEPR) 08/2024, Roy et al., Oct 2024 (four stakeholders in every chain; single-city case studies: tomato/onion→Delhi, potato→Mumbai via Agra). Full extraction: [[PS4 - RBI TOP Decomposition]].

| Stage (gross mark-up share) | Tomato (p.22) | Onion (p.25) | Potato (p.27) | Tag |
|---|---|---|---|---|
| **Farmer** | ₹33.5 | ₹36.2 | ₹36.7 | 🟢 |
| Trader mark-up | ₹21.3 | ₹17.6 | ₹16.2 | 🟢 |
| Wholesaler mark-up | ₹16.1 | ₹15.0 | ₹16.0 | 🟢 |
| **Retailer mark-up** | ₹29.1 | ₹31.3 | ₹31.0 | 🟢 |
| …but trader & wholesaler **NET margin** (after costs) | ~5.3% each (pp.21–22) | — | — | 🟢 |
| Contrast: eggs & chana farmer share | ~₹75 | | | 🟡 |

**⚡ The insight, v2 (self-correction logged):** our earlier "₹56 retail residual" was wrong — retail takes ₹29–31. The real structure: middlemen *mark up* ~₹37 (trader+wholesaler) but *keep* only ~₹10 as profit; the other ~₹27 is *cost* — transport, mandi fees (onion: 1% fee + 4% commission + loading, p.24), and wastage (storage loss: tomato 3.03%, onion 2.16%, potato 0.78%, p.33; onion storage loss escalates 10%→30% Jul–Dec, p.35). Retail's ₹29–31 is the single biggest non-farm block. So the attack surface is **costs and wastage (~₹27) + the retail hop (~₹30)**, not any actor's profit pocket. "Cut the middleman" still attacks the wrong number — but the right number is the cost stack, not a ₹56 residual.

## Link-by-link ledger (data sourcing → end consumer)

### L0 — Data layer (the AI substrate; cost ≈ ₹0, all public)
| Item | Number | Source | Tag |
|---|---|---|---|
| Mandi price data | Daily, by crop × market, free | Agmarknet (brief Exhibit D) | 🟢 |
| Weather | District forecasts, free | IMD | 🟢 |
| Crop/acreage imagery | Sentinel-2 free, ~10 m res, ~5-day revisit | ISRO Bhuvan / ESA | 🟡 |
| eNAM share of commodity trade | <1% (2021) | Brief Exhibit C | 🟢 |
| Mandi density | 1 per 496 sq km vs 1 per 80 recommended | Brief Exhibit C | 🟢 |

### L1 — Input supply & credit (the arthiya's real moat)
| Item | Number | Source | Tag |
|---|---|---|---|
| Informal moneylender rates | often >36%/yr | agriculture.institute overview | 🟡 |
| KCC subsidised crop loan | 7%/yr, effective ~4% with prompt repayment (≤₹3 lakh) | bankbazaar/PIB-derived | 🟡 |
| **The wedge the FPO can arbitrage** | **~30 pts of interest spread** | derived | 🔴 |
| Informal share of farm borrowing | ~half of borrowers touch informal sources | SAGE J. informal credit study 2024 | 🟡 |

### L2 — Advisory (near-zero marginal cost post-2024)
| Item | Number | Source | Tag |
|---|---|---|---|
| Contract farming (advisory+assured offtake) income uplift | ~+81% net | Kumar 2016, brief Exhibit F | 🟢 |
| Women's input-access gap closure → yield | +20–30% | FAO, brief Exhibit E | 🟢 |
| Cost of human agronomist model | tbd ₹/farmer/yr | research queue | ⬜ |
| Cost of AI advisory (LLM + Exhibit D stack) | tbd ₹/farmer/yr (target <₹50) | our build math | ⬜ |

### L3 — Aggregation (farmgate → collection point)
| Item | Number | Source | Tag |
|---|---|---|---|
| Avg holding | 1.08 ha; 86% <2 ha | Brief Exhibit B | 🟢 |
| Mandi commission (official) | 2% of sale (buyer-side, rules vary) | CASI UPenn "Understanding Mandis" | 🟡 |
| Mandi commission (practice, farmer-side) | 2–4% incl. delayed-payment premium | CASI UPenn | 🟡 |
| Market fee | ~1–1.5% (state-dependent; UP 1%, Bengaluru 1–1.5%) | state APMC sources | 🟡 |
| Volume per collection point needed to break even | tbd t/day | working-capital model | ⬜ |

### L4 — Grading, storage, post-harvest loss (the destroyable cost)
| Item | Number | Source | Tag |
|---|---|---|---|
| Post-harvest losses, fruits | 6.70–15.88% | ICAR-CIPHET 2015 (MoFPI) | 🟢 |
| Post-harvest losses, vegetables | 4.58–12.44% (tomato worst at 12.44%) | ICAR-CIPHET 2015 | 🟢 |
| National economic value of losses | ₹92,651 crore (45 commodities); ₹16,644 Cr fruits + ₹14,842 Cr vegetables | ICAR-CIPHET 2015 | 🟢 |
| Loss concentration stages | harvesting, sorting/grading, transport, wholesale & retail storage | ICAR-CIPHET 2015 | 🟢 |
| Pack-houses: built vs required | **249 vs 70,080 (99.6% gap)**; reefer 85% gap; cold *storage* gap only ~9% | NCCD AICIC 2015 (primary read) | 🟢 |
| WDRA active warehouses / cold storages | 6,166 active, of which **only 151 cold** (2.4%); FPO/PACS: 311 active | WDRA Annual Report 2024-25 (primary read) | 🟢 |
| Cold-store stock skew | 8,653 units, ~75% single-commodity potato, ~60% capacity in UP+WB | LS reply Dec 2023 / MoFPI-CII | 🟡 |
| Farmgate pay-per-use storage tariff | ~₹0.20/kg/day (CoolCrop target); ₹10 per 50-kg crate (Dhaanya FPO); 5-MT unit revenue ₹12–20k/mo | Civil Society Online / Mongabay Nov 2025 | 🟡 |
| Micro cold room capex | 10t Ecofrost ₹12.5L, ₹9.37L subsidised (MIDH+RKVY); CoolCrop 3–4t ₹4L | pv-magazine / Mongabay | 🟡 |
| Tomato cold-room shelf life | ~2–3 weeks at 13–15°C (chilling injury <12.5°C green) vs 2–5 days ambient | DCMSME / Cornell / CoolCrop | 🟡 |
| Fresh tomato WDRA cold-storage eligibility | **NOT notified** (no fresh vegetable is; onion only as dehydrated) → no pledge finance on tomato | IES Arthapedia (govt) | 🟢 |
| Onion storage economics | cost ₹303.6/qtl/season; Apr→Nov **+₹2,133/qtl (+182.7%)** after 30% losses; <4 months stored = loss | Joshi et al. 2025 (primary read) | 🟢 |
| Potato cold-store rent (UP, govt-fixed) | ₹230/qtl/season ≈ ₹30–35/qtl/month | NewsClick/state notification | 🟡 |

### L5 — Transport & logistics
| Item | Number | Source | Tag |
|---|---|---|---|
| ₹/tonne-km all-India road freight (trunk) | ₹3.6 | Statista 2021 | 🟡 |
| ₹/tonne-km small-lot rural haulage | ₹15–30 (5–8x trunk rate); 1 t × 30 km ≈ ₹450–750; +10–25% harvest premium | derived from Tata Ace-class ₹15–25/vehicle-km | 🔴 |
| Share of consumer ₹ | inside the ~₹56 residual | RBI TOP WP decomposition | ⬜ |

### L6 — Wholesale → Retail → Consumer
| Item | Number | Source | Tag |
|---|---|---|---|
| Trader gross mark-up (T/O/P) | 21.3% / 17.6% / 16.2% | RBI WPS 08/2024 pp.22/25/27 | 🟢 |
| Wholesaler gross mark-up (T/O/P) | 16.1% / 15.0% / 16.0% | RBI WPS 08/2024 pp.22/25/27 | 🟢 |
| Trader & wholesaler NET margin (tomato) | ~5.3% each | RBI WPS 08/2024 pp.21–22 | 🟢 |
| **Retailer gross mark-up (T/O/P)** | **29.1% / 31.3% / 31.0%** | RBI WPS 08/2024 pp.22/25/27 | 🟢 |
| Mandi fees: onion | 1% fee + 4% commission + ₹9.02/q loading | RBI WPS 08/2024 p.24 | 🟢 |
| Mandi fees: potato (Sikandra, Agra) | 1% fee + 0.5% development cess | RBI WPS 08/2024 p.26 | 🟢 |
| Caveat | single-city case studies; no all-India average; no tomato-specific mandi-fee % | WP structure | 🟢 |

### Macro frame (TAM layer for the sweet-spot scene)
| Item | Number | Source | Tag |
|---|---|---|---|
| Tech farmgate-to-fork prize | $62–76 B/yr, 50–60% farmer-capturable | WEF, in brief | 🟢 |
| Smallholder output share | 70% veg / 55% fruit / 52% cereals on 44% land | brief | 🟢 |
| FPO median reality: turnover | ₹36.4 lakh (1 activity) → ₹55.2 lakh (3 activities) | IJEE 125-FPO study 2022 | 🟡 |
| FPO net profit / margin | ₹1.2–2.5 lakh/yr, ~6% | IJEE 2022 | 🟡 |
| FPO working capital | **majority < ₹3 lakh** | IJEE 2022 | 🟡 |

**⚡ Second structural insight:** median FPO working capital (<₹3 lakh) buys roughly **one truckload of onions**. Any link whose entry ticket is measured in crores is fantasy without external finance — the working-capital number selects the link almost by itself.

## §B — Banana chain (Theni pivot, 2026-07-17)
> Crop-candidate deep dive feeding [[PS4 Agri/e-Choupal Banana OS]]. Primary sources: **RBI WPS (DEPR) 06/2024** (fruits sister paper to TOP, primary read → [[PS4 - RBI Fruits Decomposition]]) and the **GT diagnostic deck, Cluster 2 Theni/Tuticorin/Madurai** (→ [[PS4 Agri/GT Deck]]).

### B1 — The banana waterfall & prices
| Item | Number | Source | Tag |
|---|---|---|---|
| **Farmer share of consumer ₹, banana** | **30.8%** (range 20–35%; ~35% post-peak) — lowest of the three fruits (grapes 35%, mango 42–43%) | RBI WPS 06/2024 pp.29–30 (Jalgaon→Delhi) | 🟢 |
| Stage cost content | Trader ≈ long-haul transport; wholesaler ≈ **ripening** + labour + local transport; retailer ≈ perishability risk. Exact %-split is in image-only Chart 29 (p.30) | RBI WPS 06/2024 | 🟢 |
| National farmgate price | ₹14–15/kg (2021-22) → **₹27–28/kg (2022-23)** | RBI WPS 06/2024 p.10 | 🟢 |
| Theni farmgate by channel | Commission agents (85–90% of farmers): ₹9–10/kg · FPO/coop (5–10%): ₹10–11 · organized (3–4%): ₹12–14 · export (1–2%): ₹13–15 (2020-21) | GT Deck Table 112 | 🟡 |
| Grade spread (Grand Naine, 2020-21) | A ₹10 / B ₹8 / C ₹5 per kg | GT Deck Table 104 | 🟡 |
| TN farmer share (channel study) | 40.3–48.3% across TN channels | GT Deck closing note (Table 18) | 🟡 |
| Cost of cultivation | **₹1,28,825/ha ≈ ₹3.48/kg** variable | RBI WPS 06/2024 p.29 (FGD Jan 2023) | 🟢 |
| Price-smoothing elasticity | +1% availability-usage ratio → **−0.21%** banana CPI (long-run ARDL) | RBI WPS 06/2024 pp.45–46 | 🟢 |

### B2 — The physical hops (chamber-and-truck money)
| Item | Number | Source | Tag |
|---|---|---|---|
| **Ripening usage charge** | **₹2/kg** (MIDH-assisted units, Theni; high electricity load) | GT Deck §6 | 🟡 |
| Ripening capacity, Theni | 5 MIDH units, 895 MT + household units | GT Deck §6 | 🟡 |
| Cold storage, Theni | 14 units / 13,180 MT — export-only (raw banana chill-injures, no price-arbitrage storage) | GT Deck §6 | 🟡 |
| Domestic transport | **₹1–1.5/kg**; field→godown pickups/TATA Ace, inter-city Eicher/407; 3–6 h Theni→Kerala; Cochin trade ₹351 Cr | GT Deck §7 | 🟡 |
| Value-chain loss, TN banana | **9%** total: retail 3.9 / storage-ripening 2.1 / wholesale 1.9 / field 0.8 / transport 0.3 | GT Deck §3 | 🟡 |
| Ripening chamber capex/opex | tbd — only the ₹2/kg user charge known | research queue #8 | ⬜ |
| Processing share | ~10% of fresh banana (puree/chips/powder) | RBI WPS 06/2024 p.30 (MoFPI 2021) | 🟢 |
| Pseudo-stem waste | 70–80 MT/ha, convertible (fibre/food/bio-fertiliser) | RBI WPS 06/2024 pp.32, 54 | 🟢 |
| Traceability gap | **No "BananaNet"** — RBI: banana traceability "not widely followed", hence miniscule export presence (GrapeNet/MangoNet exist) | RBI WPS 06/2024 p.55 | 🟢 |

### B3 — Contractor case law (the PHC decomposition, mango pp.32–34)
| Item | Number | Source | Tag |
|---|---|---|---|
| Mango farmer share WITH contractors | **42–43%** (₹62–67 of ₹149–155) — highest of the three fruits | RBI WPS 06/2024 Table 7 | 🟢 |
| PHC bundle | Pre-harvest price+tonnage contract (off flowering) + orchard-maintenance support + aggregation; margin **10%** | RBI WPS 06/2024 pp.32–33 | 🟢 |
| Rest of mango chain | Transport-to-ripening 5% · labour 2% · wholesale/commission 7% · value loss 8% · retailer 27% | RBI WPS 06/2024 Table 7 | 🟢 |
| ⚡ Reading | The contractor is a bundle, not a toll: the best farmer share coexists with a PHC layer → internalize *functions*, don't delete *actors* (Spine C5 on banana) | derived | 🔴 |

### B5 — NotebookLM source pack (2026-07-17; sources: RBI WPS 06/2024 · MoFPI/Grant Thornton diagnostic Oct 2021 · IISD Global Market Report Mar 2023 · MDPI/ResearchGate South-India papers)
> Synthesized via NotebookLM ([notebook link](https://notebooklm.google.com/notebook/33919483-c1f0-440e-9b78-e6950cba8a11)) — all rows 🟡 until traced to the primary page. **Known conflict flagged below.**

| Item | Number | Source (per notebook) | Tag |
|---|---|---|---|
| **Jalgaon→Delhi corridor flow** | farmgate **₹13** → trader **₹18** (PHC commission + labour) → wholesale **₹21.50** (ripening + transport) → retail **₹25/kg** | notebook synthesis | 🟡⚠️ |
| ✅ CONFLICT RESOLVED (07-17) | Not a contradiction — **two corridors**: RBI 30.8% = long-haul Jalgaon→Delhi (~1,100 km: long-haul freight, 4–6% mandi commissions, urban wholesale margins, ripening/handling losses). TNAU 52–65% = local Theni→Madurai/Cochin (~130 km: less wastage, fewer transport hops). **Distance is a structural determinant of farmer share → proximity is a Theni-cluster advantage.** The corridor build-up row above likely mixes the two; still trace its exact source before using as a decomposition | NotebookLM reconciliation vs RBI WPS 06/2024 | 🟡 |
| **BVC study identified** | **Pauline & Ajjan (TNAU, 2014)** — South India banana value chains: BVC1 traditional 52%, BVC2 modern wholesale agency w/ farmer co-ownership **65.45% (+13.45 pts)**. BVC1 runs on sociocultural trust (farmers rarely bargain, accept payment delays, trust buyers to absorb crash losses) — the platform must REPLACE that trust function, not just out-price it | TNAU 2014, via notebook — get the actual paper PDF | 🟡 |
| BVC detail (07-17 follow-up) | No stage-wise rupee tables in the text (price dynamics only in Figs. 3–4); explicit numbers: BVC1 commission agents charge **10% to traders**; **BVC2 = farmer-co-owned wholesale agents in Chinnamanur village, THENI district** — aggregate, control ripening, sell direct to supermarkets/retailers/city wholesalers. Our model's precedent sits inside our cluster | Pauline & Ajjan 2014 via notebook | 🟡 |
| **Contractor advance terms (the financing node)** | **Interest-free** cash advance + inputs/suckers, adjusted/deducted at final sale (TN contract-farming pattern); BVC1 payment delays up to **3 weeks** accepted; zero-bargaining fixed pricing; buyer absorbs 100% of crash losses. **The advance costs the farmer price, not interest** — the moat is trust+convenience, not rate (consistent with KCC precedent row) | Pauline & Ajjan + TN contract-farming lit, via notebook | 🟡 |
| FPO credit substitutes | FPC matching equity grant up to **₹15 L** (₹2,000/member); credit guarantee up to **₹2 Cr** (85% cover ≤₹1 Cr, 75% for ₹1–2 Cr); Chinnamanur FPC extends credit+extension to 100% of active members | Central Sector FPO scheme, via notebook | 🟡 |
| **GI premium precedent** | **'Jalgaon Banana' GI: ₹15/kg vs ₹10 regular = +50%**. Theni holds Virupakshi + Sirumalai GIs with ZERO brand recall — proven mechanics, unmonetized | MoFPI/GT 2021 via notebook | 🟡 |
| Cluster loss comparison | TN clusters **9%** vs GJ 18–20% · UP 22% · AP 23% · **MH 30.5% (retail 14.5)** — the efficiency axis of the spectrum | MoFPI/GT 2021 via notebook → [[PS4 Agri/Banana Cluster Spectrum Data]] | 🟡 |
| Long-haul transport benchmarks | Delhi from: GJ ₹4 road/₹2 rail-subsidized · MH ₹4/₹4.5 rail · AP ₹6.5/₹5.5 · UP ₹3. Theni→Cochin **₹1–1.5**. Kisan Rail Jalgaon→Delhi 1,100 MT/wk | MoFPI/GT 2021 via notebook | 🟡 |
| TNAU cultivation cost (Theni-region) | **₹1,83,250/ha** incl. land lease ₹50,000/ha (₹20k/acre), tissue-culture material ₹36,000, manure/fertiliser ₹40,000 — vs RBI's ₹1,28,825/ha which EXCLUDES land lease (Jalgaon FGD). Use TNAU for Theni unit economics; state which basis every time | TNAU 2014 via notebook | 🟡 |
| MoFPI/GT cluster capex | Post-harvest infra to establish a cluster: **AP Cluster 1 ₹102.92 Cr · TN Cluster 1 ₹74.23 Cr** — the ownership price of the physical chain (what our coordination play avoids buying) | MoFPI/GT diagnostic 2021 via notebook | 🟡 |
| MoFPI pain points (traditional aggregator model) | Wild price fluctuation, outsized vendor commissions, payment delays, excessive transit bruising → prescribes FPO disintermediation, reusable plastic crates, FPO-owned ripening chambers, pseudostem waste-to-wealth units | MoFPI/GT diagnostic 2021 via notebook | 🟡 |
| Grade prices 2020-21 (₹/kg, A/B/C) | GJ & TN 10/8/5 · UP 11/8/5 · AP 12/9/5–6 · MH (Jalgaon) 11/7/5, good domestic 10–12 · export 13–15 all states | MoFPI/GT diagnostic | 🟡 |
| Varietal premiums | Grand Naine ₹10–11/kg (Koyambedu, Chennai) · Red Banana ₹15–18/kg (export bulk ₹1,200–1,600/MT) · Nendran ₹18–20/kg farmgate (chips) | MoFPI/GT + regional papers | 🟡 |
| **Traditional vs modern chain (South India)** | **BVC1 (traditional multi-layer): farmer 52% · BVC2 (modern wholesale agency w/ farmer co-ownership): 65.45%** — bypasses retail-level commission agents | MDPI/ResearchGate case study | 🟡 |
| Global farmgate comparison | India ~USD 0.70/kg (peak export ₹14/kg) vs Ecuador USD 0.45 (₹6/kg) · Colombia/Costa Rica 0.45 · Philippines 0.42 — India uncompetitive on export price | IISD 2023 | 🟡 |
| VSS/certification premiums (FOB 2021) | Conventional USD 0.40/kg · Organic 0.65 · Fairtrade+premium 0.81 · Fairtrade-Organic 1.00 (>60% premium; double-cert ≈ 2× conventional, +USD 0.60/kg) | IISD 2023 | 🟡 |
| Pseudostem monetization | Raw stems ₹400/MT to FPO processing units · fiber A-grade ₹300–400/kg, B-grade ₹250–300/kg · biogas feedstock USD 0.067–0.093/tree → **+15.5–17% farm profitability** | MDPI circular-bioeconomy papers | 🟡 |

**⚡ BVC2 is the citable version of the value-prop claim:** farmer share 52% → 65.45% via farmer co-owned modern chain is the defensible replacement for the unciteable "₹22→₹55" (B4). Verification queue: find the actual South-India BVC1/BVC2 paper.

### B6 — Platform P&L research (deep-research 2026-07-17)
> Closing Financials & Margins Deliberation §4/§5 open items. Primary docs opened this pass: **NHB Cost Norms PDF** (nhb.gov.in, local copy `sources/NHB_Cost_Norms.pdf`) and the **MoFPI/Grant Thornton banana diagnostic 2021** full PDF (mofpi.gov.in, local copy `sources/MoFPI_GT_Banana_Diagnostic_2021.pdf`) — this is the same "GT Deck" already cited in §B1/B2/B5, now read directly rather than via secondary notes, so several rows below **upgrade existing 🟡 rows to 🟢**.

| Item | Number | Source | Tag |
|---|---|---|---|
| **Ripening chamber capex norm** | **₹1.00 lakh/MT** (11 CuM chamber volume = 1 MT storage capacity) | NHB Cost Norms PDF, item 6 (p.3 of doc) — primary read | 🟢 |
| Ripening chamber subsidy pattern | **35%** of project cost (general areas), **50%** (NE/Hilly/Scheduled areas); credit-linked, back-ended | NHB Cost Norms PDF — primary read | 🟢 |
| Ripening chamber sits under IPHM cap | Integrated Post-Harvest Management project cap ₹145 lakh/project; add-on components (incl. ripening chamber) subsidy limited to ₹50.75 lakh (general) / ₹72.50 lakh (NE/Hilly) | NHB Cost Norms PDF — primary read | 🟢 |
| Ripening usage charge (Theni, MIDH units) | **₹2/kg** — CONFIRMED at primary source: Table 109, p.80, "5 in no. with 895 MT capacity... usage charge INR 2/Kg... constraint: electricity requirement is high" | MoFPI/GT diagnostic 2021, Table 109 p.80 — primary read (upgrades §B2 row from 🟡→🟢) | 🟢 |
| Ripening chamber opex detail | Electricity is the binding constraint (flagged explicitly as "high" in the primary table) but **no ₹/kWh or ₹/kg-processed opex breakdown exists in the primary doc** — only the usage-charge proxy above | MoFPI/GT diagnostic 2021 p.80 | ⬜ |
| Theni marketing-channel split (CONFIRMS existing row) | Commission agents 85–90% farmers / 8.74 lakh MT / ₹9–10/kg · FPO-Coop 5–10% / 0.50 lakh MT / ₹10–11 · Organised trade 3–4% / 0.40 lakh MT / ₹12–14 · Export 1–2% / ~10,000 MT / ₹13–15 | MoFPI/GT diagnostic 2021, Table 112 p.83 — primary read (upgrades §B1 row from 🟡→🟢) | 🟢 |
| **Theni Cluster-2 marketable surplus — DISCREPANCY RESOLVED** | Primary Table 102 (p.79): Grand Naine (33% of production) 0.12 lakh MT + Others (67%) 0.23 lakh MT = **Total 0.35 lakh MT**. The "0.48 lakh MT" figure does not appear anywhere in the primary doc — **0.35 lakh MT is the correct GT/MoFPI figure**; treat any 0.48 citation as an error to be dropped | MoFPI/GT diagnostic 2021, Table 102 p.79 — primary read | 🟢 |
| Platform/aggregator fee benchmark vs 10% agent layer | Ninjacart: blended gross margin **12–15%** on fresh produce (own trading-book model, not a pure fee); Ninjacart-as-eNAM-logistics-partner margin **10–15%** | Ninjacart investor/company materials via secondary press coverage (VFS, mutualfundsguide) — not a primary filing | 🟡 |
| eNAM mandi-fee reduction precedent | Telangana: mandi fee **0.25%** (vs standard, exempted) if trader/CA does end-to-end trade on eNAM for 1 yr from Dec 2018; else **0.75%** collected | eNAM govt FAQ/incentives page (enam.gov.in) | 🟡 (govt page, not a dated notification PDF opened) |
| ONDC agri seller commission | Claimed **2–5%** vs **15–25%** on Amazon/Flipkart-type platforms — **REJECTED as primary-grade**: sole source is an uncited agritech blog (organicmandya.com) with no methodology or government citation behind the number, matching the skill's red-flag pattern | organicmandya.com blog (no primary trace found) | 🔴 do-not-cite as fact; usable only as "claimed, unverified" |
| ONDC official FPO network scale (context, not fee) | ~5,000 of 8,000 registered FPOs onboarded to ONDC; flat ₹1.5 fee per successful txn >₹250 from Jan 2025 (network-level, not commission) | PIB PR (pib.gov.in/PressReleaseIframePage.aspx?PRID=2010600) + sellersetu.in fee note | 🟡 |
| **Backhaul / empty-return economics** | India: **~30–40%** of truck return legs run empty; loaded-vs-empty rate **asymmetry of 20–40%** on the same route/distance; demand-side willingness to discount a return-leg (truck heading to base) **~2–4%**; realized backhaul programs cut freight cost **9–15%** | Industry estimates cited via National Freight Index "$12bn Opportunity" analysis (CRISIL Research / Logistics Sector Skill Council figures reported secondhand) — **NITI Aayog "Fast Tracking Freight in India" primary PDF returned HTTP 403, could not be opened directly**; all backhaul rows below are 🟡 pending that primary read | National Freight Index blog (secondary, citing CRISIL/LSSC) | 🟡 |
| Milkymist / Kashmir-apple specific backhaul utilization | **Not found.** No published utilization % for Milkymist dairy logistics or a Kashmir-apple-specific backhaul/return-load benchmark exists in searchable sources; Kashmir apple coverage found is about highway-closure losses (₹700 Cr), not backhaul economics | searched, blocked — flag as unresourced | ⬜ |
| **Pauline & Ajjan (2014) — paper identified, PDF not obtained** | Two conflicting citations surfaced: (a) *Pauline, D. & Ajjan, N. (2014), "Banana Value Chains in South India," International Journal of Commerce and Business Management, 7, pp.367–371*; (b) *Pauline, A.D. & Ajjan, N. (2014), "[value chains, price transmission and integration of banana markets]," Trends in Biosciences, 7(14), pp.1793–1799*. A ResearchGate record (publication/284471693, "Banana value chains in South India") exists but returned HTTP 403 on fetch — could not confirm which citation is authoritative or extract Figs. 3–4 stage margins | web search only; ResearchGate blocked, no OA PDF located | 🔴 unresolved — do not cite a journal name/volume in the submission without a second confirmation |
| FPO aggregation margin benchmark (sanity-check for our ~2% linkage-fee assumption) | **Not found as a discrete NABARD/NAARM per-kg or % figure.** NABARD FPO FAQ/status papers describe aggregation as raising realized price vs mandi but publish no margin-on-throughput %; closest proxy remains the existing ledger row "FPO net profit/margin ₹1.2–2.5 lakh/yr, ~6%" (IJEE 2022, whole-org not per-kg) | NABARD FAQ/status PDFs, NAARM impact study — searched, no per-kg figure found | ⬜ |

**⚡ Reading:** the two cleanest closes this pass are (1) ripening chamber capex is now a hard number — **₹1 lakh/MT at 35–50% subsidy** — which lets §4 of the Financials deliberation cost a chamber lease-or-own decision for the first time; and (2) the Theni surplus discrepancy is resolved in the platform's favor for modeling simplicity: **0.35 lakh MT is correct, 0.48 was never in the primary doc.** The weakest links are backhaul (no India-specific primary number, NITI PDF blocked) and Pauline & Ajjan (citation itself is contested — two different journal names circulating for the same 2014 study).

### B4 — Flagged as unciteable (do not use until modeled/sourced)
| Claim | Problem | Tag |
|---|---|---|
| "₹22 → ₹55/kg farmer realization" | ₹55 farmgate ≈ >90% farmer share — no chain on record (dairy ~70%). Rebuild from waterfall: grade premium + internalized ripening/wholesale margin + deleted losses | 🔴 |
| "Banana holds on-plant ~2 weeks post-maturity" | Load-bearing for harvest smoothing; no agronomic source yet (try TNAU banana pages) | 🔴 |

## Gaps queue (Quant to close, priority order)
1. ~~Read RBI TOP WP PDF fully~~ ✅ CLOSED 07-10 → [[PS4 - RBI TOP Decomposition]] (WPS 08/2024, Roy et al.)
2. ~~Transport ₹/kg/km + pack-house benchmarks~~ ✅ CLOSED 07-12 (trunk 🟡 verified; rural small-lot stays 🔴 derived — no govt norm table found)
3. AI advisory unit cost build-up (tokens + WhatsApp Business API ₹/farmer/yr)
4. Crop TAMs + buyer concentration for sweet-spot scene (onion, banana, pomegranate, tomato-processing, maize-feed, chilli)
5. ~~e-NWR pledge finance~~ ✅ CLOSED 07-12: ~₹4,000 Cr current vs ₹5.5L Cr potential; CGS-NPF ₹1,000 Cr, tiers 85/80/75%; LTV 75–80%; **fresh vegetables ineligible** → [[PS4 Agri/ONDC of Cold Storage]]
5b. ONDC agri GMV (T4) ✅ CLOSED 07-12: never published; ~50% of onboarded FPOs zero sales; only cohort ~₹5,600/FPO/mo; no fresh-produce category — pickle-and-papad confirmed → [[PS4 Agri/ONDC of Cold Storage]]
6. Sahyadri Nashik financials (revenue, farmer count, years to profitability)
7. Read Chart 29 (RBI WPS 06/2024 p.30) visually → exact banana stage-wise %-split for the waterfall exhibit
8. ~~Ripening chamber capex + opex~~ ✅ CLOSED 07-17: **₹1.00 lakh/MT capex, 35–50% subsidy** (NHB Cost Norms PDF, primary); opex still only the ₹2/kg usage-charge proxy (electricity flagged "high" but no ₹/kWh figure exists) → §B6
9. Theni route map: villages, collection points, chamber/godown locations, corridors → logistics cluster map (feeds hub-and-spoke + backhaul model)
10. Agronomic citation for on-plant holding window of mature banana (B4 flag)
11. Platform fee vs 10% agent layer ⚠️ PARTIAL 07-17: Ninjacart 12–15% gross margin / 10–15% eNAM-logistics margin (secondary press only); ONDC "2–5%" claim REJECTED — uncited blog, red-flag pattern → §B6
12. Backhaul/return-load economics ⚠️ PARTIAL 07-17: India-wide 30–40% empty-return legs, 20–40% loaded/empty rate asymmetry, 9–15% cost cut from backhaul programs — all secondary (NITI Aayog primary PDF blocked, HTTP 403); no Milkymist/Kashmir-apple specific number found → §B6
13. Pauline & Ajjan (2014) full paper ⚠️ BLOCKED 07-17: citation itself contested (two different journal names for the same study circulating); ResearchGate record blocked (403); no Figs. 3–4 numbers extracted → §B6
14. Theni volume-base discrepancy ✅ CLOSED 07-17: **0.35 lakh MT is the correct GT/MoFPI figure** (Table 102, p.79, primary read) — the 0.48 figure does not appear in the primary document, drop it → §B6
15. FPO aggregation margin benchmark (NABARD/NAARM) ⚠️ NOT FOUND 07-17: no discrete per-kg/% figure published; proxy remains IJEE 2022 whole-org ~6% net margin → §B6

## Sources
- [RBI study coverage — Business Standard](https://www.business-standard.com/markets/capital-market-news/rbi-study-shows-tomato-onion-and-potato-farmers-get-only-a-third-of-retail-price-that-consumer-pays-124100400307_1.html) · [RBI TOP WP PDF (TNAU mirror)](https://agritech.tnau.ac.in/govt_schemes_services/pdf/tomato,%20onion%20and%20potato.pdf)
- [RBI Fruits WP 06/2024 PDF (TNAU mirror)](https://agritech.tnau.ac.in/govt_schemes_services/pdf/grapes,%20bananas,%20mangoes%20report.pdf) — primary read → [[PS4 - RBI Fruits Decomposition]]
- [ICAR-CIPHET via Frontiers 2026](https://www.frontiersin.org/journals/sustainable-food-systems/articles/10.3389/fsufs.2026.1773566/full) · [PIB post-harvest loss](https://www.pib.gov.in/PressReleaseIframePage.aspx?PRID=1910360)
- [CASI UPenn — Understanding Mandis (Kapur & Krishnamurthy)](https://casi.sas.upenn.edu/sites/default/files/research/Understanding%20Mandis%20-%20D.%20Kapur,%20M.%20Krishnamurthy.pdf)
- [IJEE 125-FPO performance study](https://www.acspublisher.com/journals/index.php/ijee/article/view/6456) · [Informal credit study (SAGE 2024)](https://journals.sagepub.com/doi/10.1177/09730052241262599)
- [Agri loan rates](https://www.bankbazaar.com/personal-loan/agriculture-loan-interest-rates.html)

## Links
[[PS4 - First-Principles Interrogation]] · [[../03 - Personas/The Quant]] · [[../05 - Deliverable/Website Concept]]
