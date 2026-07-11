# S4 Sweet-Spot Spectrum: Mock Data v0

**Status: ALL VALUES MOCK / ESTIMATED. Off-the-cuff placeholders to unblock the S4 build.**
Every number below must pass the Quant protocol (source registry, tag upgrade) before the scene ships with citations. The structure and formula are the deliverable; the values are scaffolding.

Created 2026-07-10. Feeds: `05 - Deliverable/site` -> future `src/data/spectrum.json`.

## What S4 shows
Crop/segment opportunity map. Center: TAM bubbles per candidate. Right rail: top-3 organized-player concentration bars. Left rail: dated incumbent news clippings. Background aura interpolates red to green with the score. The formula is displayed on screen; the spectrum is honest.

## Scoring formula (v0)

```
tamNorm      = min(TAM_cr / 100000, 1)          // caps the dairy-scale outlier
opportunity  = sqrt(tamNorm) * (1 - top3Pct/100) * opening
```

- sqrt damps raw market size so TAM doesn't drown structure.
- top3Pct = share of the **organized/integrated** value chain held by the top 3 players (not share of total production; what matters is whether the chain is already owned).
- opening (0 to 1, judgment score) = how broken and reachable the chain is for an FPO-side entrant: high farmer-share gap + no integrator lock-in + policy tailwind = high.

**Aura mapping:** score >= 0.55 full green (--signal), 0.30 to 0.55 interpolate, < 0.30 red (--danger). Bubble x-position = score, bubble radius proportional to sqrt(TAM).

## Candidate set (v0 mock values)

| # | Segment | TAM (Rs Cr/yr, consumer) | Top-3 org. share % | Opening (0-1) | Farmer share Rs/100 | Score | Aura |
|---|---|---|---|---|---|---|---|
| 1 | **Tomato (TOP veg)** | 62,000 | 6 | 0.90 | 33.5 (rbi-top-2024, verified) | **0.67** | GREEN, sweet spot |
| 2 | Onion | 40,000 | 8 | 0.80 | 36 (rbi-top-2024) | 0.47 | yellow-green |
| 3 | Potato | 38,000 | 15 | 0.70 | 37 (rbi-top-2024) | 0.37 | yellow |
| 4 | Banana | 30,000 | 12 | 0.65 | ~30 (mock) | 0.31 | yellow |
| 5 | Chana / pulses | 85,000 | 30 | 0.45 | 75 (rbi-top-2024) | 0.29 | orange |
| 6 | Maize (feed) | 45,000 | 25 | 0.40 | ~60 (mock) | 0.20 | orange |
| 7 | Export horti (grapes, pomegranate) | 18,000 | 35 | 0.50 | ~45 (mock) | 0.14 | red |
| 8 | Eggs & broiler | 1,20,000 | 55 | 0.25 | 75 (rbi-top-2024, eggs) | 0.11 | red |
| 9 | Exotic / leafy veg (q-commerce) | 9,000 | 40 | 0.50 | ~35 (mock) | 0.09 | red |
| 10 | Dairy | 10,00,000 | 50 | 0.15 | ~70 (mock) | 0.08 | red, solved chain |

**The argument the table makes:** the high-farmer-share segments (eggs, chana, dairy) score LOW because their chains are already fixed, by integrators or co-ops. The sweet spot is where TAM is large AND the chain is still broken AND nobody organized owns it: TOP vegetables, tomato first. The Rs 33.5 story closes its own loop.

## Right-rail concentration bars (mock top-3 per segment)
- Eggs/broiler: Suguna, Venky's, IB Group (shares unknown, sum ~55%)
- Dairy: Amul (GCMMF), Nandini (KMF), Mother Dairy (sum ~50% of organized)
- Potato (processing): PepsiCo/Lay's, ITC Bingo, Balaji (sum ~15% of chain)
- Export grapes: Sahyadri, Mahagrapes, Freshtrop (sum ~35% of exports)
- Tomato: no organized top-3 exists. The bar renders near-empty; that emptiness IS the visual argument.

## Left-rail clipping candidates (search leads, not citations yet)
1. PepsiCo expanding potato contract farming (~27,000+ farmers): integrators fencing potato
2. Suguna / IB Group integrator expansion: broiler chain closed
3. Amul FY25 revenue (~Rs 65-66k Cr): dairy solved
4. Sahyadri Farms FY25 Rs 1,954.7 Cr (already in ledger: sahyadri-financials): the FPO model works at export-horti scale
5. Quick-commerce (Zepto/Blinkit) dedicated-farm sourcing tie-ups: exotic-veg fencing in progress

## Quant TODO (to upgrade mock -> reported/verified)
- [ ] TAM per segment: cross NHB/MoAFW production volumes x retail price; note methodology per row
- [ ] Define + source "organized share" per segment (integrator revenue / est. chain value)
- [ ] Replace opening judgment scores with a stated rubric (farmer-share gap, integrator lock-in, policy risk, each 0-1, averaged) so judges see the machinery
- [ ] Pull 5 real dated clipping URLs for the left rail
- [ ] Banana / maize / exotic-veg farmer shares: find any study, else drop those rows

## JSON shape for the site (when built)

```json
{
  "spectrum": {
    "formula": "sqrt(min(tamCr/100000,1)) * (1 - top3Pct/100) * opening",
    "candidates": [
      { "key": "tomato", "label": "Tomato", "tamCr": 62000, "top3Pct": 6, "opening": 0.9, "farmerShare": 33.5, "score": 0.67, "source": "MOCK-v0" }
    ]
  }
}
```

Every row carries a source field; nothing renders on the site without a ledger id. MOCK-v0 must be visibly badged as estimated if it ever hits a deployed build.
