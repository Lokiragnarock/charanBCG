# SPEC — crop-geography.html
Single self-contained HTML file. No build step, no JS deps. Fonts via Google Fonts CDN (Space Grotesk, Inter, JetBrains Mono).

## 1. Themes (CSS custom properties on :root / body class)
| Token | Default (dark) | body.theme-banana | body.theme-tn |
|---|---|---|---|
| --bg | #0A0F0B | #FAF3D4 | #1A1208 |
| --surface1 | #111811 | #FFFDF2 | #241A0C |
| --surface2 | #182018 | #F1E6B4 | #2F2310 |
| --border | #253026 | #D8C98F | #4A3A1C |
| --accent | #8FE05C | #3A7D2C | #E3B04B |
| --accent-dim | #3E5C2C | #D2BF6A | #6E5520 |
| --text | #ECEFE9 | #2B2416 | #F2E8D5 |
| --text2 | #8E9C8C | #6B5F3F | #B3A17C |
| --text3 | #5E6A5C | #9A8C63 | #7A6B4A |
| --glow (rgb) | 143,224,92 | 58,125,44 | 227,176,75 |

Sub-theme accents: --banana #E8C33F · --banana-deep #B98F12 · --tn-gold #D9A441 · --tn-maroon #7E2F3A (unused, reserved).
body{transition: background .35s ease, color .35s ease}

## 2. Typography
- H1: Space Grotesk 700, 42px (28px mobile), -0.01em
- Tile title: Space Grotesk 700 30px · Sub H3: 24px · Point title: 16.5px/700
- Body/prose: Inter, 14–14.5px, line-height 1.6, color --text2
- Eyebrow/kicker/labels: JetBrains Mono 11-12px, uppercase, letter-spacing .1em

## 3. Layout
.wrap: max-width 960px, margin auto, padding 0 32px. Header pad 56px 0 40px.
.rays: absolute header backdrop — radial gradient rgba(var(--glow),.10) + 5-line SVG fan (stroke currentColor, opacity .25, color:var(--accent)).

## 4. Components
**.cg-tiles** grid 1fr 1fr gap 16 (1-col ≤640px)
**.cg-tile** rel; pad 26/24/20; radius 10; border .5px --border; min-h 150; hover/.active → themed border (--banana / --tn-gold). Children: .cg-tile-eyebrow (themed color), .cg-tile-title, .cg-tile-sub (75% width), .cg-tile-art (SVG abs right 10 bottom 6, 110×74).
  - crop art: two banana-curve paths (fills --banana/--banana-deep)
  - geo art: stepped gopuram path + base rect + finial circle (fill --tn-gold)
  - geo tile bg adds kolam dot grid: radial-gradient dot 1.2px, background-size 26px 26px
**.cg-sub** hidden; .open → block. pad 28 30; radius 10; themed border tint + gradient wash (+ dot grid for geo)
**.cg-point** grid 34px 1fr gap 14. .cg-point-num: 30px circle, Space Grotesk 700, themed border/color, bg rgba(glow,.14)
**.cg-quote** grid 36px 1fr; border-left 3px --banana; bg rgba(var(--glow),.05); mark 40px; text italic 14.5; attr mono 11.5
**.cg-grid** 4-col fact cards (2-col mobile): .cg-fact pad 14, radius 8, bg rgba(var(--glow),.05); num Space Grotesk 20/700 themed; label 11.5px

## 5. Behavior (vanilla JS, ~20 lines)
openSub(which):
- toggle .open on subCrop/subGeo (mutually exclusive)
- toggle .active on tiles
- body.classList: theme-banana ⇔ crop, theme-tn ⇔ geo (never both)
- scrollIntoView({smooth, nearest}) on opened subsection
Listeners: tileCrop→openSub('crop'), tileGeo→openSub('geo'). No state persistence.

## 6. Content slots (edit points)
- H1 / header sub
- Tile: eyebrow (incl. Tamil), title, one-line sub
- Crop sub: kicker, H3, 3× {num, title, body, why-line}, quote {text, attribution}
- Geo sub: kicker, H3, prose-1, 4× fact {num, label}, prose-2

## 7. Constraints
- Keep single-file; inline all CSS/JS
- No localStorage/sessionStorage
- All colors via CSS vars only (theme integrity)
- Tamil strings UTF-8; test glyph rendering on target device
- Unverified facts (chamber count, transport ₹/kg for Cluster 2) must not be added without source
