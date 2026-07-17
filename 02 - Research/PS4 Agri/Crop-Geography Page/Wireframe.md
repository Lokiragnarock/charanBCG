# Wireframe — Crop & Geography Page

## State 0: Default (dark theme, no tile selected)

```
┌────────────────────────────────────────────────────┐
│  ── OUTPROMPT · PROBLEM 04 · CROP & GEOGRAPHY      │  eyebrow (mono, accent)
│  Banana · Theni–Tuticorin–Madurai        [H1]      │
│  Tap a tile to explore...                [sub]     │
├────────────────────────────────────────────────────┤
│  THE CHOSEN COMBINATION — TAP A TILE               │  section label
│  ┌──────────────────┐  ┌──────────────────┐        │
│  │ THE CROP · வாழை  │  │ THE GEO · தமிழ்நாடு│      │  2-col tile grid
│  │ Banana      [🍌] │  │ Tamil Nadu   [🛕] │        │  SVG art bottom-right
│  │ one-line sub     │  │ one-line sub      │        │
│  └──────────────────┘  └──────────────────┘        │
│                                                    │
│  (no subsection open)                              │
├────────────────────────────────────────────────────┤
│  footer: round-1 note        |  AI-assisted note   │
└────────────────────────────────────────────────────┘
```

## State 1: Crop tile clicked (page → banana-yellow theme)

```
│  [Banana tile: active border]  [TN tile: idle]     │
│  ┌──────────────────────────────────────────────┐  │
│  │ வாழை · THE CROP CASE            [kicker]     │  │
│  │ Why banana                      [H3]         │  │
│  │  (1)● High-value crop, untapped value        │  │  numbered points:
│  │      body text + "Why it matters:" line      │  │  circle num | title
│  │  (2)● Year-round production                  │  │  body / why-line
│  │  (3)● Every part monetizable                 │  │
│  │  ┌─────────────────────────────────────┐     │  │
│  │  │ " MOFPI quote — ₹1,100+ Cr ..."     │     │  │  quote box, banana
│  │  │   — MOFPI (2021)                    │     │  │  left border
│  │  └─────────────────────────────────────┘     │  │
│  └──────────────────────────────────────────────┘  │
```

## State 2: Geo tile clicked (page → temple-gold dark theme)

```
│  [Banana tile: idle]  [TN tile: active border]     │
│  ┌──────────────────────────────────────────────┐  │
│  │ தமிழ்நாடு · THE GEOGRAPHY CASE               │  │
│  │ Why Theni–Tuticorin–Madurai, Tamil Nadu      │  │
│  │  prose para 1 (year-round, premium belt)     │  │
│  │  ┌────┐┌────┐┌────┐┌────┐                    │  │  4-col fact grid
│  │  │12/12││1MT ││ 9% ││₹1-  │                   │  │  num + label cards
│  │  │mo  ││/day││loss││1.5  │                    │  │
│  │  └────┘└────┘└────┘└────┘                    │  │
│  │  prose para 2 (ecosystem: TNAU, GCC, GI)     │  │
│  └──────────────────────────────────────────────┘  │
```

## Layout rules
- Max width 960px, centered, 32px side padding
- Tiles: 2-col grid desktop, 1-col <640px
- Fact grid: 4-col desktop, 2-col mobile
- Only one subsection open at a time; opening scrolls it into view
- Theme transition: 0.35s ease on background/color
