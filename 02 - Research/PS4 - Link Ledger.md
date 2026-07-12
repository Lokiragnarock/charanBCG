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

## Gaps queue (Quant to close, priority order)
1. ~~Read RBI TOP WP PDF fully~~ ✅ CLOSED 07-10 → [[PS4 - RBI TOP Decomposition]] (WPS 08/2024, Roy et al.)
2. ~~Transport ₹/kg/km + pack-house benchmarks~~ ✅ CLOSED 07-12 (trunk 🟡 verified; rural small-lot stays 🔴 derived — no govt norm table found)
3. AI advisory unit cost build-up (tokens + WhatsApp Business API ₹/farmer/yr)
4. Crop TAMs + buyer concentration for sweet-spot scene (onion, banana, pomegranate, tomato-processing, maize-feed, chilli)
5. ~~e-NWR pledge finance~~ ✅ CLOSED 07-12: ~₹4,000 Cr current vs ₹5.5L Cr potential; CGS-NPF ₹1,000 Cr, tiers 85/80/75%; LTV 75–80%; **fresh vegetables ineligible** → [[PS4 Agri/ONDC of Cold Storage]]
5b. ONDC agri GMV (T4) ✅ CLOSED 07-12: never published; ~50% of onboarded FPOs zero sales; only cohort ~₹5,600/FPO/mo; no fresh-produce category — pickle-and-papad confirmed → [[PS4 Agri/ONDC of Cold Storage]]
6. Sahyadri Nashik financials (revenue, farmer count, years to profitability)

## Sources
- [RBI study coverage — Business Standard](https://www.business-standard.com/markets/capital-market-news/rbi-study-shows-tomato-onion-and-potato-farmers-get-only-a-third-of-retail-price-that-consumer-pays-124100400307_1.html) · [RBI TOP WP PDF (TNAU mirror)](https://agritech.tnau.ac.in/govt_schemes_services/pdf/tomato,%20onion%20and%20potato.pdf)
- [ICAR-CIPHET via Frontiers 2026](https://www.frontiersin.org/journals/sustainable-food-systems/articles/10.3389/fsufs.2026.1773566/full) · [PIB post-harvest loss](https://www.pib.gov.in/PressReleaseIframePage.aspx?PRID=1910360)
- [CASI UPenn — Understanding Mandis (Kapur & Krishnamurthy)](https://casi.sas.upenn.edu/sites/default/files/research/Understanding%20Mandis%20-%20D.%20Kapur,%20M.%20Krishnamurthy.pdf)
- [IJEE 125-FPO performance study](https://www.acspublisher.com/journals/index.php/ijee/article/view/6456) · [Informal credit study (SAGE 2024)](https://journals.sagepub.com/doi/10.1177/09730052241262599)
- [Agri loan rates](https://www.bankbazaar.com/personal-loan/agriculture-loan-interest-rates.html)

## Links
[[PS4 - First-Principles Interrogation]] · [[../03 - Personas/The Quant]] · [[../05 - Deliverable/Website Concept]]
