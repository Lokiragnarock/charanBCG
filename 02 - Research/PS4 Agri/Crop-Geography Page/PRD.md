# PRD — Crop & Geography Interactive Page
**Project:** BCG OutPrompt R1 submission artifact · **Owner:** [user] · **Status:** v1 shipped

## 1. Purpose
Communicate, in under 60 seconds of judge attention, WHY banana and WHY the Theni–Tuticorin–Madurai cluster — the "where, concretely" test of the case brief — as an interactive page rather than static slides.

## 2. Users
- **Primary:** competition judges (skim-readers; may spend <1 min)
- **Secondary:** the team (reference during Round 2 build)

## 3. Problem
The crop/geography argument spans two distinct evidence sets (crop economics vs cluster ecosystem). Prose blurs them; the page must let a reader choose a thread and absorb it fast.

## 4. Goals / success criteria
- Judge can state the 3 crop reasons + 3-4 cluster facts after one pass
- Visual identity signals craft (matches OutPrompt brief aesthetic) without distracting
- Loads instantly, zero dependencies beyond Google Fonts, works offline from a single file

## 5. Requirements
**Must have**
- Two tappable tiles (Crop / Geography), each opening exactly one subsection
- Theme shift on selection: banana-yellow (crop), temple-gold (geo); dark default
- Crop subsection: exactly 3 numbered points, each with "Why it matters" line + MOFPI quote box
- Geo subsection: 2 prose paras + 4 fact cards
- Tamil script accents (வாழை / தமிழ்நாடு); mobile responsive
**Won't have (v1)**
- Navigation to other case sections, animations beyond theme fade, data fetching, edit UI

## 6. Content source of truth
handoff-summary.md. Any number shown must trace to GT diagnostic (2021), TNAU, or MOFPI (2021). Two facts flagged UNVERIFIED for this cluster: ripening-chamber count, transport ₹/kg — do not add until checked against GT Cluster 2 chapter.

## 7. Risks
- Tamil glyph rendering varies by device → test before demo
- Theme flip may disorient → mitigated by 0.35s transition + tile active-state
- Judges may never click → tiles carry one-line subs so the surface alone communicates

## 8. Open items
- Verify 2 flagged facts; consider adding a third tile ("The Link") if case write-up needs it
