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

## The ₹100 waterfall (headline exhibit)
Where the consumer's ₹100 goes — RBI Working Paper, *Vegetables Inflation in India: A Study of Tomato, Onion and Potato (TOP)*, 2024:

| Stage | Tomato | Onion | Potato | Tag |
|---|---|---|---|---|
| **Farmer** | ₹33.5 | ₹36 | ₹37 | 🟡 |
| Trader/aggregator margin | ~₹5.3 | tbd | tbd | 🟡 |
| Wholesaler (secondary) margin | ~₹5.3 | tbd | tbd | 🟡 |
| **Balance: transport + wastage + retail** | **~₹56** | ~₹58 | ~₹63 | 🔴 residual — decompose from WP PDF |
| Contrast: eggs & chana farmer share | ~₹75 | | | 🟡 |

**⚡ The insight the waterfall yields:** the trader and wholesaler — the classic "middlemen" — take ~5% each. The majority of the intermediary share sits at the **retail end + wastage**. "Cut out the middleman" attacks the wrong ₹5; the prize is the ~₹56 downstream block, which is exactly the "move up the chain" evidence in the brief (Exhibit F). This is our margin-decomposition money slide.

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

### L5 — Transport & logistics
| Item | Number | Source | Tag |
|---|---|---|---|
| ₹/kg/km rural haulage | tbd | research queue | ⬜ |
| Share of consumer ₹ | inside the ~₹56 residual | RBI TOP WP decomposition | ⬜ |

### L6 — Wholesale → Retail → Consumer
| Item | Number | Source | Tag |
|---|---|---|---|
| Trader margin (tomato) | ~5.3% | RBI TOP WP 2024 | 🟡 |
| Secondary wholesaler margin (tomato) | ~5.3% | RBI TOP WP 2024 | 🟡 |
| Retail block (margin + wastage + costs) | residual ~50%+ | derive from WP | 🔴 |

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
1. 🔴→🟢 Read RBI TOP WP PDF fully (local copy exists) → exact stage decomposition all 3 crops + authors/WP number
2. Transport ₹/kg/km + pack-house cost benchmarks (NCCD / NABCONS)
3. AI advisory unit cost build-up (tokens + WhatsApp Business API ₹/farmer/yr)
4. Crop TAMs + buyer concentration for sweet-spot scene (onion, banana, pomegranate, tomato-processing, maize-feed, chilli)
5. e-NWR pledge finance: interest rate, LTV, eligible commodities (WDRA)
6. Sahyadri Nashik financials (revenue, farmer count, years to profitability)

## Sources
- [RBI study coverage — Business Standard](https://www.business-standard.com/markets/capital-market-news/rbi-study-shows-tomato-onion-and-potato-farmers-get-only-a-third-of-retail-price-that-consumer-pays-124100400307_1.html) · [RBI TOP WP PDF (TNAU mirror)](https://agritech.tnau.ac.in/govt_schemes_services/pdf/tomato,%20onion%20and%20potato.pdf)
- [ICAR-CIPHET via Frontiers 2026](https://www.frontiersin.org/journals/sustainable-food-systems/articles/10.3389/fsufs.2026.1773566/full) · [PIB post-harvest loss](https://www.pib.gov.in/PressReleaseIframePage.aspx?PRID=1910360)
- [CASI UPenn — Understanding Mandis (Kapur & Krishnamurthy)](https://casi.sas.upenn.edu/sites/default/files/research/Understanding%20Mandis%20-%20D.%20Kapur,%20M.%20Krishnamurthy.pdf)
- [IJEE 125-FPO performance study](https://www.acspublisher.com/journals/index.php/ijee/article/view/6456) · [Informal credit study (SAGE 2024)](https://journals.sagepub.com/doi/10.1177/09730052241262599)
- [Agri loan rates](https://www.bankbazaar.com/personal-loan/agriculture-loan-interest-rates.html)

## Links
[[PS4 - First-Principles Interrogation]] · [[../03 - Personas/The Quant]] · [[../05 - Deliverable/Website Concept]]
