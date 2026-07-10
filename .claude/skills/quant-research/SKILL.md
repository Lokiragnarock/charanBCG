---
name: quant-research
description: The Quant's number-pulling protocol for the BCG OutPrompt case. Use when researching, verifying, or citing any figure — margins, TAMs, costs, losses, interest rates — or when upgrading Link Ledger rows. Encodes the source registry (which Indian primary sources answer which question), the tagging discipline, and the verification chain the judges will follow.
---

# Quant Research — pulling numbers that survive verification

## Prime rule
The guidelines say judges WILL go back and verify figures, and unsourced figures count AGAINST us. So: **never cite the search result — cite the primary source it points to**, with year and (where possible) page. All figures land in `02 - Research/PS4 - Link Ledger.md` with a tag: 🟢 Verified (we read the primary) · 🟡 Reported (credible secondary) · 🔴 Estimated (our derivation, arithmetic shown) · ⬜ Gap.

## Source registry — who answers what (validated in this project)
| Question type | Go to | Note |
|---|---|---|
| Farm-to-retail price decomposition | **RBI Working Papers / RBI Bulletin** (TOP study 2024 — local copy `RBI_TOP_Vegetables_WP.pdf`) | Gold standard; stage-wise margins |
| Post-harvest losses | **ICAR-CIPHET 2015 (MoFPI-commissioned)**; PIB releases for official recitals | Crop-wise % + ₹ value |
| Farmer household income | **NSSO Situation Assessment Survey** (77th round, NSS Report 587, 2018-19: ₹10,218/mo, crop share ₹3,798) | Income composition is the insight |
| Mandi mechanics, arthiya economics | **Kapur & Krishnamurthy "Understanding Mandis" (CASI UPenn)**; IGC WP "Who is the arthi" | Field-researched fee/credit practice |
| FPO performance/finances | **IJEE 125-FPO study (2022)**, IFPRI blogs, NAARM/NABARD impact evaluations, **ICRA/CARE rating rationales** (for big FPCs like Sahyadri — audited numbers!) | Rating rationales are underused gold |
| Exemplar deep-dives | **MANAGE case studies**, **RBI CAB special studies** | Sahyadri both covered |
| Prices, live | **Agmarknet** (daily mandi), eNAM dashboards | For the simulator's defaults |
| Schemes/finance rails | PIB, scheme guidelines (AIF, 10k-FPO, e-NWR/WDRA), NABARD circulars | Subsidy-as-acceleration analysis |
| Global frame | FAO, WEF (already in brief — cite as "brief, Exhibit X") | Don't re-derive what the brief hands us |

## Protocol per number
1. **Search → identify the primary** (WebSearch finds the news story; the citation is the RBI WP behind it).
2. **Fetch/read the primary** where possible; PDFs saved to vault root or scratchpad. If a PDF resists extraction, spawn a subagent with Python (pypdf/pdfplumber) to dump text.
3. **Record**: value, unit, year, source link, page, tag — as a Link Ledger row. Convert to canonical units (₹/kg by stage; ₹/farmer/year).
4. **Triangulate** any load-bearing number with a second independent source; keep both.
5. **Adversary sentence**: one line on what would make this number wrong (vintage? region-specific? self-reported?).

## Red flags (auto-reject)
- Agritech company blogs quoting their own impact numbers without methodology
- "India wastes 40% of its food" — folk numbers that primary studies (CIPHET: 4.6–15.9%) contradict
- Undated figures; figures whose trail dies at a listicle
- Currency-year mismatches silently compared (deflate or state the vintage)
