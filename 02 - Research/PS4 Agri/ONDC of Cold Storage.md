---
title: "ONDC of Cold Storage — networked L4 without owning L4"
type: research
status: active
created: 2026-07-12
tags: [ps4, cold-storage, ondc, L4, coordination-school]
---

# The ONDC-of-Cold-Storage Play

> Focus decision 2026-07-12: the FPO hits **L3 (aggregation + quality gate) and L4 (cold storage)** — but L4 the Coordination-school way. The FPO never buys the cold store. It books, receipts, and finances cooling over open networks, the way ONDC unbundles commerce. Upgrades tangent T4 from "verify GMV" to a structural pillar.

## The claim (idealistic scenario)
The Move-Up-the-Chain school is right that L4 is where destroyable value sits (post-harvest losses: vegetables 4.6-12.4%, tomato worst at 12.44%, Rs 92,651 Cr national; Ledger 🟢). Its kill-condition was capex: median FPO working capital < Rs 3 lakh buys zero cold rooms. The unbundled version dissolves that kill-condition. Three rails already exist:

### Rail 1 — Capacity discovery (the "network" part)
- **Celcius Logistics**: India's asset-light cold-chain marketplace. 3,500+ reefer trucks, 100+ cold storages bookable online, ~Rs 500 Cr revenue, 600+ cities. Proof that discovery-and-booking of cold capacity works as a marketplace. 🟡 (company/press numbers)
- **Ecozen Ecofrost / CoolCrop**: solar micro cold rooms (5-6 t/unit) installed at farmgate or FPO collection points, offered **pay-per-crate or lease** — cooling-as-a-service, no capex. 5,000+ units deployed (2022); claims shelf life x1.5 and +30% FPO profit. AP and Maharashtra already run CaaS through FPOs. 🟡
- The FPO books cooling like a cab: fixed micro cold room at the collection point (rented), overflow and long-haul via marketplace reefers/storages.

### Rail 2 — Receipt + collateral (the "settlement" part)
- **WDRA e-NWR**: 24 horticultural commodities notified for cold-storage negotiable receipts. Deposit produce in a WDRA-registered cold store → e-NWR → pledge to bank at **75-80% LTV**. 🟡
- **CGS-NPF** (Dec 2024): Rs 1,000 Cr credit-guarantee corpus specifically for e-NWR pledge finance. The state is subsidizing exactly this rail. 🟢 (PIB)
- This attacks the Rs 3 lakh working-capital wall directly: stored, graded produce *becomes* the working capital. Also the model's "pledge" finance source made concrete.

### Rail 3 — Demand (the "seller-side" part)
- **ONDC x SFAC**: ~5,000 of ~8,000 registered FPOs onboarded to ONDC; free registration, cataloguing, logistics matching, digital payments. 🟡 (govt statements)
- The FPO's sellable unit on the network is not "produce" — it is the **graded, receipted, financeable lot**. The quality gate (L3) is what makes a lot network-tradable at all. That is the FPO's actual product.

**The sentence:** the FPO doesn't build cold storage; it makes its members' produce *cold-chain-addressable* — graded at the collection point, cooled by rented capacity, receipted on e-NWR, sold where the network finds demand.

## Feasibility stress test (realistic scenario)
1. **Tomato barely cold-stores.** Shelf life x1.5 on tomato means days, not months. Farmgate cold rooms smooth *intra-week* gluts and buy grading/transport time; they do NOT enable seasonal arbitrage. e-NWR pledge on fresh tomato is close to fiction — banks lend against onion/potato in cold stores, not tomatoes. ⚠️ This pushes on crop choice: the storage-finance rail favours onion/potato; tomato gets only the spoilage-avoidance and glut-smoothing benefit. The S3 model (tomato-only) must not claim pledge-finance LTV on tomato lots.
2. **FPOs onboarded ≠ volume traded.** 3,100 SKUs of "value-added products" on ONDC is pickle-and-papad commerce; fresh-produce GMV through ONDC is still the T4 folk-number risk — unverified. Demand rail is the weakest of the three today.
3. **Celcius's network is pharma/dairy-heavy and city-dense.** Rural density of bookable cold storages near our FPO's mandal is unknown; marketplace liquidity at the farmgate is unproven. Need: km-to-nearest-WDRA-cold-store for candidate districts.
4. **Pay-per-use math under price crash.** The storage option is only worth exercising when expected price recovery > (per-crate fee + residual spoilage + interest on pledge). In a Rs 2/kg crash, cooling a worthless tomato is burning money. The simulator should treat rented cold storage as an *option*, not a default flow.
5. **Quality gate is load-bearing.** Every rail assumes the FPO can grade honestly and consistently. If grading fails, e-NWR disputes and network returns kill trust faster than the mandi ever would. (Institution-school insight survives here.)

## Deep-research verdicts (3 subagent reports, 2026-07-12)

**Rail 1 — Capacity: exists as rooms, not as a chain.**
- WDRA Annual Report 2024-25 (primary read): 6,166 active registered warehouses, of which only **151 are cold storages** (2.4%) — roughly 1 per 5 districts. FPO/PACS own 1,417 registrations but only 311 active. 🟢
- NCCD AICIC 2015 (primary read): pack-houses **249 built vs 70,080 required (99.6% gap)**; reefer vehicles 85% gap; cold *storage* gap only ~9%. India has potato warehouses, not a cold chain — the missing piece is the farmgate front end. 🟢
- Horticulture belts do have physical cold stores nearby (MANAGE directory: Nashik ~64, Kolar 12, Chittoor 11 incl. 4 in Madanapalle, mostly multi-purpose). 🟢 (directory, undated)
- But **no organised player publishes a rate card** — Celcius and all 3PL competitors are quote-only and city/pharma/QSR-centric. The real farmgate options are FPO-owned micro cold rooms (subsidy-built: 10t Ecofrost ₹12.5L capex, ₹9.37L subsidised via MIDH+RKVY) and portable units (Tan90). "Rent-not-own" today means *build-with-subsidy-then-rent-out*, not book-on-an-app. 🟡

**Rail 2 — e-NWR pledge finance: real, tiny, and closed to fresh vegetables.**
- Fresh tomato is **not** a WDRA-notified cold-storage commodity; neither is fresh onion (only dehydrated). No bank/NBFC pledge product against fresh vegetables found. Pledge finance works for potato (and durables), full stop. 🟢 (govt source)
- Current e-NWR pledge volume ~₹4,000 Cr vs ₹5.5 lakh Cr potential; CGS-NPF ₹1,000 Cr corpus, guarantee tiers 85/80/75%. The rail is state-backed but embryonic. 🟡
- Cold room buys tomato **~2-3 weeks at 13-15°C** (chilling injury below ~12.5°C for green fruit) vs 2-5 days ambient — market-timing weeks, not finance-grade months. 🟡

**Rail 3 — ONDC demand: pickle-and-papad CONFIRMED.**
- No agri GMV figure has ever been published — the strongest tell. Of ~5,000 "onboarded" FPOs (Mar 2024), ~50% had never made one sale; the only published cohort averaged **~₹5,600/FPO/month**. 🟡→🔴 derivations
- Official SFAC-ONDC catalogue contains **no fresh produce category**. Only fresh pilot ever: HOPCOMS Bengaluru, ~₹57k/month, 2-km radius, explicitly designed to avoid cold chain. No cold-chain network participant on ONDC; FPOs ship via India Post. eNAM-ONDC never passed feasibility study. Meanwhile eNAM itself: ₹3.19 lakh Cr cumulative — 4 orders of magnitude larger. 🟢/🟡

**Verified price points for the model** (best available):
- Farmgate storage: **₹0.20/kg/day** (CoolCrop design tariff) · **₹10 per 50-kg crate** (Dhaanya FPO, Karnataka) · 5-MT unit revenue ₹12-20k/month. 🟡
- Onion storage economics (primary study, W. Maharashtra): cost ₹303.6/qtl/season; Apr→Nov nets **+₹2,133/qtl (+182.7%)** after 30% losses; storing <4 months loses money. 🟢
- Potato cold-store rent (UP, govt-fixed): ₹230/qtl/season ≈ ₹30-35/qtl/month. 🟡
- Haulage: ₹3.6/t-km all-India trunk 🟡; small-lot rural ₹15-30/t-km (🔴 derived) — 1-tonne lot moved 30 km ≈ ₹450-750.

**Net verdict:** the idealistic "three rails" story survives only in reshaped form. The honest sentence: **rentable cold rooms exist; a rentable cold chain does not — and that gap IS the business.** The FPO's wedge is the farmgate front end (pack-house grading + micro cold room + booked transport) that makes the existing warehouse stock and the empty ONDC seller-side usable at all. ONDC is "why now" white space, not a demand channel today. Pledge finance enters the model only if a storable crop (potato; or onion via conventional structures) is in the mix — never against tomato.

## What this changes
- **Spine**: L3+L4 stays the link pair, but L4 = *access via network*, not asset. The Coordination school (C3) absorbs the Move-Up destination without its capex CRASH.
- **Model (S3)**: pledge finance source should be parameterized by crop storability; consider a "rented cold room" lever (per-crate cost vs spoilage reduction) as a scenario.
- **T4** upgrades: ONDC is no longer just demand-side "why now" — it is one of three rails. GMV verification still owed.
- **Quant queue** additions: (a) Ecofrost per-crate tariff + typical utilization; (b) WDRA-registered cold storages by district (rural density); (c) e-NWR pledge volumes for horticulture vs grain (is the 24-commodity notification used in practice?); (d) ONDC fresh-produce GMV.

## Sources (to verify per quant-research protocol)
- [ONDC blog: 1,392 FPOs D&B numbers](https://ondc.org/blog/fpo-collective-gets-d-b-stamp-of-approval-1392-fpos-on-board-ondc-get-unique-number-to-expand-global-footprint/) · [SFAC products on ONDC](https://resources.ondc.org/sfac-products) · [KNN: 6,000 FPO target](https://knnindia.co.in/news/newsdetails/sectors/ondc-to-on-board-6000-farmer-collectives-by-march-2024)
- [Celcius Logistics](https://www.celcius.in/) · [Founder Thesis profile](https://www.founderthesis.com/p/how-swarup-bose-built-celcius-into)
- [Ecozen Ecofrost](https://www.ecozensolutions.com/ecofrost) · [NITI Frontier Tech: reimagining cold chains](https://frontiertech.niti.gov.in/story/reimagining-cold-chains-tech-driven-storage-solutions-for-indias-perishable-agriculture/) · [Mongabay: solar cold storage smallholders](https://india.mongabay.com/2025/11/solar-powered-cold-storage-empowers-smallholder-farmers/)
- [PIB: CGS-NPF launch](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2085018) · [WDRA FAQs](https://wdra.gov.in/web/wdra/faqs)

## Links
[[Schools of Thought]] · [[Tangents]] · [[../PS4 - Link Ledger]] · [[The Spine - Central Argument]] · [[YouTube Source Pack]]
