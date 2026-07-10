---
title: "PS4 — RBI TOP Working Paper: Full Value-Chain / Margin Decomposition"
type: research
status: verified
created: 2026-07-10
source: RBI_TOP_Vegetables_WP.pdf
tags: [bcg-outprompt, ps4, numbers, rbi]
---

# RBI TOP Working Paper — Value-Chain Decomposition (primary-source read)

> Read directly from the PDF (pypdf text extraction, all ~50 pages dumped and grepped). Every number below is tied to a printed page number from the document itself (page numbers in the PDF text match the printed footer numbers 1–50).

## Headline findings

- **WP identity**: RBI Working Paper Series **WPS (DEPR): 08/2024**, titled *"Vegetables Inflation in India: A Study of Tomato, Onion and Potato (TOP)"*, by **Ranjana Roy, Sanchit Gupta, Harsh Wardhan, Suvendu Sarkar, Soumasree Tewari, Rohan Bansal, Shelja Bhatia and Ashok Gulati**, Department of Economic and Policy Research, RBI, **October 2024**. (p.1, p.3)
- **Farmer's share of the consumer rupee**: **Tomato 33.5%, Onion 36.2%, Potato 36.7%** — abstract rounds these to "~33%, ~36%, ~37%" (p.3 abstract; p.22, p.24-25, p.27 for exact figures).
- The paper explicitly contrasts this with dairy, where farmers get **~70%** of the final price (p.19).
- Each crop's chain is decomposed into exactly **four stakeholders: Farmer → Trader → Wholesaler → Retailer** (p.22, p.24, p.27 chart data). "Trader" and "Wholesaler" mark-ups are stated to *include costs* (transport, mandi fees, commission, loading/unloading, packaging, labour) *plus margin* — i.e., these are gross mark-ups, not pure profit margins. The retailer's mark-up is the largest in all three crops and is framed as reflecting perishability/wastage risk plus shop rental and transport (p.21-22, p.25, p.27).

## Tomato value chain (Chart 18, p.22; narrative p.21-22)

| Stage | Share of consumer ₹ (mark-up %) | Cumulative price (₹/quintal) | Notes | Page |
|---|---|---|---|---|
| Farmer | 33.5% | ₹1,229 | Includes farmer's own overhead costs of labour and transport above cost of cultivation | 22 |
| Trader | 21.3% | ₹2,011 | Mark-up *includes* transport cost, mandi fees, commission charges, loading/unloading; net **margin ≈ 5.3%** (rest is pass-through cost) | 21-22 |
| Wholesaler (secondary market) | 16.1% | ₹2,603 | Same structure as trader; text states wholesaler margin is "the same" (~5.3%) as trader's | 22 |
| Retailer | 29.1% | ₹3,671 | Highest margin — bears perishability/wastage risk (tomatoes mostly sold in unorganised markets), incurs transport + shop rental | 21-22 |

- Basis: farmer price = weighted average wholesale price, TE 2021-22 (Agmarknet); retail price = Delhi (Dept. of Consumer Affairs); other costs from field visits in Nashik, January 2023 (p.21).
- Case study is specifically the supply chain from major producing regions **to Delhi** (p.21) — not a national average.

## Onion value chain (Chart 19, p.24; narrative p.24-25)

| Stage | Share of consumer ₹ (mark-up %) | Cumulative price (₹/quintal) | Notes | Page |
|---|---|---|---|---|
| Farmer | 36.2% | ₹1,089 | Includes cultivation + overhead costs | 24-25 |
| Trader | 17.6% | ₹1,617 | Includes transport, mandi fees, commission, packaging, labour | 25 |
| Wholesaler | 15.0% | ₹2,067 | Same cost categories as trader | 25 |
| Retailer | 31.3% | ₹3,009 | Largest mark-up | 25 |

- Mandi-level detail (p.24, primary APMC auction stage): mandi fee **1%**, commission charge **4%**, loading/unloading **₹9.02/quintal**; weight loss during storage/transit **~10% for kharif/late-kharif onion, ~5% for rabi onion**; inter-mandi transport (e.g., to Azadpur, Delhi) **~₹240/quintal**, split between primary trader and secondary trader/wholesaler by arrangement.
- Basis: farmer price = weighted average wholesale price from arrivals into Delhi (Maharashtra, MP, Rajasthan, Gujarat), TE 2021-22; other costs from Nashik field visits, January 2023 (p.24).

## Potato value chain (Chart 20, p.27; narrative p.26-27)

| Stage | Share of consumer ₹ (mark-up %) | Cumulative price (₹/quintal) | Notes | Page |
|---|---|---|---|---|
| Farmer | 36.7% | ₹1,049 | Includes transport (₹30/quintal), packaging (₹80/quintal), labour (₹100/quintal), storage (₹250-260/quintal) | 27 |
| Trader | 16.2% | ₹1,513 | Mandi fee 1% + development cess 0.5% (Sikandra mandi, Agra) + loading/unloading + commission | 26-27 |
| Wholesaler | 16.0% | ₹1,971 | Transport cost split between primary trader and wholesaler by arrangement | 26-27 |
| Retailer | 31.0% | ₹2,856 | Highest margin — cost (rental + transport) "much lower than their margins" since retailer deals smaller volumes | 27 |

- Basis: farmer (farmgate proxy) = average Agra wholesale price, Feb-June, TE 2022; retail = Mumbai (major consumption centre); secondary-mandi wholesale price from DoCA; other costs from Agra field visits, December 2022 (p.26-27).
- Potato-specific: farmers store their own produce in cold storage between March-November at **₹250-260/quintal** (p.26). Farmers also **borrow from cold-storage owners at high interest rates** (p.26) — a financing-wedge data point.

## Mandi fees / commissions — consolidated

| Item | Value | Crop | Page |
|---|---|---|---|
| Mandi fee (primary auction) | 1% | Onion | 24 |
| Commission charge | 4% | Onion | 24 |
| Loading/unloading charge | ₹9.02/quintal | Onion | 24 |
| Mandi fee | 1% | Potato (Sikandra mandi, Agra) | 26 |
| Development cess | 0.5% | Potato (Sikandra mandi, Agra) | 26 |
| Inter-mandi transport (primary → secondary, e.g. to Azadpur) | ~₹240/quintal | Onion | 24 |
| Onion weight loss in transit/storage | ~10% kharif/late-kharif, ~5% rabi | Onion | 24 |
| Tomato/onion/potato-specific mandi fee/commission for tomato and potato individually beyond above | Not separately itemised as % — folded into "trader mark-up" | Tomato | 21-22 |

No separate numeric mandi-fee/commission breakout is given for tomato beyond the aggregate 21.3% trader mark-up (the paper states it "includes" mandi fees/commission/transport/loading but does not split them out as it does for onion and potato).

## Storage / wastage / losses (p.33)

- **Storage losses** (CIPHET-ICAR 2015 basis), computed on total stock of previous month: **Potato 0.78%, Onion 2.16%, Tomato 3.03%** (p.33).
- **Total post-harvest loss assumed for tomato: ~12%** (CIPHET study basis) — this is farm-operations loss + storage loss combined, used in the balance-sheet model (p.33).
- **Onion dehydration/storage weight loss** (separate from the 2.16% storage-loss figure — this applies to rabi onion held in storage units): rising monthly schedule **July 10% → August 14% → September 18% → October 22% → November 26% → December 30%** of the weight of stored stock (p.35). Can go "as high as 30% of the weight by November/December" per market-player/farmer feedback (p.35).
- Loss categories used in the model: (i) farm operations (collection, threshing, winnowing/cleaning, drying, packaging, transport) — captured via the Marketed Surplus Ratio; (ii) storage-channel losses across farm, godown/cold store, wholesaler, retailer, and processing unit (p.33).
- Potato Marketed Surplus Ratio (MSR): **89.5% in TE 2014-15** — i.e., ~10.5% is retained by farmers for self-consumption/seed (p.26, footnote sourced to Agricultural Statistics at a Glance 2014-15).

## Price volatility / seasonality context (not itemised as a single %, scattered facts)

- Tomato: rabi season = 67% of production (Dec-June harvest); kharif = 33% (July-Nov harvest) (p.20).
- Onion: rabi = 77% of production (Mar-May harvest, storable Mar-Oct); kharif = 14% (Oct-Dec); late kharif = 9% (Jan-Mar) — only rabi onion can be stored (p.22-23).
- Potato: rabi = ~90% of production; small kharif crop Sept-Nov in Maharashtra/Karnataka/Uttarakhand/HP/Tamil Nadu (p.25).
- Potato price signal: if stored crop at end-March is **below 70-80% of normal storage capacity**, prices are expected to rise by Sept-Nov (p.26).
- Cost of cultivation (A2+FL basis) for onion varies from **₹341.07/quintal (MP, minimum)** to **₹2,305.29/quintal (Tamil Nadu, maximum)**, 2021-22 estimates; other states: Karnataka ₹1,312.57, Andhra Pradesh ₹965.27, Rajasthan ₹782.35, Gujarat ₹697.33, Maharashtra ₹602.67 (p.23).
- Potato cost of cultivation 2019-20: UP ₹411.6/quintal, West Bengal ₹525.5/quintal, Bihar ₹434.9/quintal (p.25).
- Smallholder concentration: tomato — marginal/small farmers hold **82.1%** of land holdings (p.20); onion — **70.4%** of farmers are small/marginal (<2 ha) (p.23); potato — **86.7%** of farmers are small/marginal (p.25).

## Policy recommendations relevant to FPOs/farmer collectives (Section VII, pp.47-49)

**Marketing reforms:**
- **Private mandis**: increase private-mandi presence to improve transparency and give farmers wider selling choice; competitive pressure may also improve APMC infrastructure (p.47).
- **e-NAM**: leverage e-NAM for spatial integration of TOP markets to reduce inefficiencies, raise farmer-received prices and lower consumer-paid prices (p.47).
- **Promoting FPOs**: as of **June 30, 2023**, **10,000 FPOs allocated**, of which **6,319 registered** across the country; recommendation is to scale up farmer collectives and give incentives to raise bargaining power and capture input-procurement economies of scale (p.47).
- **Re-launching futures trading**: potato was traded on commodity exchanges until banned in 2014; recommends relaunching potato futures and launching onion futures (especially rabi variety) for price discovery/risk management (p.47-48).

**Storage solutions:**
- **Spatial distribution**: potato cold storage is concentrated in UP; onion storage is concentrated in Maharashtra — recommends addressing this spatial concentration and capacity deficit (p.48).
- **Solar-powered cold storage**: field survey + FGD with cold-storage owners (Dec 2022) found **35% decline in electricity cost** for a cold storage of **1.71 lakh quintal capacity** (potato) using solar power; recommends a dedicated subsidy slab for solar-equipped cold storage construction (p.48).

**Processing:**
- Raise consumer awareness of processed TOP forms (potato flakes, dehydrated onion, tomato puree) as substitutes when fresh prices spike (p.48).
- Enhance processing capacity: leverage the Mahuva (Gujarat) onion-dehydration cluster further; potato processing is negligible in UP and Bihar (1st and 3rd largest potato states) despite being the biggest producers — recommends building it up there. Explicitly recommends **small-scale processing units opened by FPOs** to produce tomato pulp/puree for supply to large-scale ketchup manufacturers (p.48-49).

**Productivity/R&D:**
- R&D for varietal development (table/processing potato varieties, exportable onion varieties) (p.49).
- **Polyhouse cultivation for tomato** to stabilise yield/supply; explicitly recommends incentives so **FPOs and farmers can afford the capital-intensive technology** (p.49).

**Data infrastructure:**
- Real-time private cold-storage stock data (onion, potato) is not currently available and should be built to improve demand-supply assessment (p.49).
- Real-time acreage data for TOP crops recommended to improve supply estimation and policy calibration (p.49).

## Numbers explicitly NOT in the paper (do not approximate)

- No single national-average consumer-rupee decomposition — all three chains are **city-specific case studies** (tomato/onion → Delhi; potato → Mumbai via Agra), not all-India averages. This should be flagged wherever these numbers are cited.
- No numeric mandi-fee/commission % is given for the **tomato** chain specifically (only bundled into the 21.3% trader mark-up) — unlike onion and potato where mandi fee/cess is separately itemised.
- No separate wholesaler-vs-trader cost/margin split (each mark-up bundles cost + margin together; only tomato's narrative volunteers an implied margin figure of ~5.3% for trader and wholesaler — onion and potato do not get an equivalent margin-only figure, only the gross mark-up %).
- No transport ₹/kg/km rate is given generically — only route-specific absolute figures (₹240/quintal primary→secondary mandi for onion; ₹30/quintal farmer-borne transport for potato).
- No mandi-density or e-NAM-trade-share figures are in this WP (those come from the brief's Exhibit C/D, a different source — do not conflate).

## For the Link Ledger (`02 - Research/PS4 - Link Ledger.md`) — rows now upgradeable to 🟢

Do not edit the Link Ledger; upgrade these rows there with the values below, all sourced to WPS (DEPR): 08/2024 with page numbers:

1. **₹100 waterfall table** — replace the "tbd" cells:
   - Trader/aggregator margin: Tomato ₹21.3 (mark-up, not pure margin — margin component ≈5.3%, p.22), **Onion ₹17.6** (p.25), **Potato ₹16.2** (p.27) → 🟢
   - Wholesaler (secondary) margin: Tomato ₹16.1 (p.22), **Onion ₹15.0** (p.25), **Potato ₹16.0** (p.27) → 🟢
   - Retailer block should be split out as its own row rather than folded into "Balance: transport + wastage + retail": Tomato 29.1%, Onion 31.3%, Potato 31.0% (pp.22,25,27) → 🟢. Note the current "~₹56 / ~₹58 / ~₹63" residual row is **not accurate** — the actual residual after farmer+trader+wholesaler is exactly the retailer mark-up figure above (29.1/31.3/31.0), not 56-63. That residual row conflated retailer mark-up with something larger; recommend correcting it.
   - Farmer row: exact figures are 33.5 / 36.2 / 36.7 (not the rounded 33/36/37 used in the abstract) — pick one convention and cite p.3 (abstract, rounded) vs pp.22/24-25/27 (exact).

2. **L4 — Grading, storage, post-harvest loss table**: add storage-loss-only figures (distinct from the existing CIPHET 6.70-15.88%/4.58-12.44% figures, which are a different CIPHET output): Potato 0.78%, Onion 2.16%, Tomato 3.03% storage loss (p.33); total assumed tomato post-harvest loss ~12% (p.33) → 🟢.

3. **L5 — Transport & logistics**: "Share of consumer ₹ / inside the ~₹56 residual" row should be replaced — there is no ~₹56 residual; use the retailer mark-up (29.1/31.3/31.0%) plus the itemised onion inter-mandi transport cost ₹240/quintal (p.24) and potato farmer-borne transport ₹30/quintal (p.27) → 🟢 for the specific figures, 🔴 still for a generic ₹/kg/km rate (not in this WP).

4. **L6 — Wholesale → Retail → Consumer table**: 
   - "Trader margin (tomato) ~5.3%" and "Secondary wholesaler margin (tomato) ~5.3%" can be upgraded 🟡→🟢 (p.22, confirmed exact text: "traders earn an average of 5.3 per cent margin. The same is true for wholesaler").
   - "Retail block (margin + wastage + costs) residual ~50%+" is **wrong** — correct value is the retailer mark-up 29.1% (tomato)/31.3% (onion)/31.0% (potato), not >50%. Flag for correction, tag 🟢.

5. **Gaps queue item 1** ("Read RBI TOP WP PDF fully... exact stage decomposition all 3 crops + authors/WP number") — **can now be marked done**; WP number and full decomposition captured above.

6. New rows worth adding (not currently in ledger): FPO count (10,000 allocated / 6,319 registered as of 30 June 2023, p.47) 🟢; potato cold-storage electricity saving from solar (35% decline, 1.71 lakh quintal facility, p.48) 🟢; onion mandi fee 1% + commission 4% + loading ₹9.02/quintal (p.24) 🟢; potato mandi fee 1% + cess 0.5% (Sikandra, Agra, p.26) 🟢.

## Full citation

Roy, Ranjana; Gupta, Sanchit; Wardhan, Harsh; Sarkar, Suvendu; Tewari, Soumasree; Bansal, Rohan; Bhatia, Shelja; and Gulati, Ashok (2024). *"Vegetables Inflation in India: A Study of Tomato, Onion and Potato (TOP)."* RBI Working Paper Series, WPS (DEPR): 08/2024. Department of Economic and Policy Research, Reserve Bank of India, Mumbai. October 2024.
