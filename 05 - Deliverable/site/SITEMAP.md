# Site map — current flow, file-by-file

> **Read this before editing.** Ground truth as of 2026-07-17, built by reading the actual code (not from memory). If you're a parallel agent editing this site, use this to find the EXACT file and injection point for your change, and check the "known collision risks" section at the bottom before you touch anything another agent might also be touching.

## Global shell (wraps every route)
`src/app/layout.tsx`
```
<html>
  <body>
    <SiteNav />          ← src/components/SiteNav.tsx        (centered deck-ribbon nav, sticky)
    {children}           ← the route below
    <SiteFooter />       ← src/components/SiteFooter.tsx
    <SectionTracker />   ← src/components/SectionTracker.tsx (bottom-right persistent counter)
    <CiteDrawer />       ← src/components/CiteDrawer.tsx     (citation slide-in, global)
  </body>
</html>
```
Theme tokens: `src/app/globals.css` (true-black bg, glowing signal-green — global, edit once here, never per-component).

---

## Route: `/` (main cinematic scroll)
File: `src/app/page.tsx`

```
<SmoothScroll>          ← src/components/SmoothScroll.tsx (Lenis wrapper)
  <main>
    1. <Cover />                ← src/components/scenes/Cover.tsx
    2. <WhyBananaTheni />       ← src/components/scenes/WhyBananaTheni.tsx   (why banana / why Theni beat)
    3. <ProblemNational />      ← src/components/scenes/ProblemNational.tsx (₹100 national problem, landholding stat row)
    4. <ExhibitStage>           ← src/components/ExhibitStage.tsx (generic full-viewport chart plinth)
         <SmallholderDonut />   ← src/components/charts/SmallholderDonut.tsx (land-vs-output bars)
       </ExhibitStage>
    5. <SweetSpotTable />       ← src/components/scenes/SweetSpotTable.tsx (ranked cluster table, why Theni wins)
    6. <ValueChain />           ← src/components/scenes/ValueChain.tsx (3-toggle: Players / Value-add / Reinvented)
    7. <Close />                ← src/components/scenes/Close.tsx (CTA cards → /history /clusters /platform /appendix)
  </main>
</SmoothScroll>
```
`SectionTracker.tsx` derives its "N / 06" counter from a `MAIN_SECTIONS` array that must match this list 1:1 — if you add/remove/reorder a scene here, update `MAIN_SECTIONS` in SectionTracker.tsx AND the corresponding entries in `SiteNav.tsx` in the same commit.

---

## Route: `/history`
File: `src/app/history/page.tsx` (30 lines, thin wrapper)
```
<History />   ← src/components/scenes/History.tsx  (ITC e-Choupal, Sahyadri, mango PHC, BVC2 Chinnamanur — 4 precedent cards)
<S2 />        ← src/components/scenes/S2.tsx        (⚠️ oddly named leftover — legitimately wired here, not orphaned; check its content before assuming it's dead)
```
Next-page link at bottom → `/clusters` (or wherever the page's own CTA points — check the file, don't assume).

## Route: `/clusters`
File: `src/app/clusters/page.tsx` (57 lines)
```
<ClusterBubbleMap selectedKey={state} onSelect={...} />  ← src/components/ClusterBubbleMap.tsx (the hero bubble viz, area=surplus)
<ClusterExplorer selectedKey={state} onSelect={...} />   ← src/components/ClusterExplorer.tsx  (left: doc links / right: 3-component panel per cluster)
```
State (`selectedKey`, default `"tn-c2"` = Theni) lives in the page component, shared between the two children — **if you edit ClusterBubbleMap or ClusterExplorer, check the prop contract in both files, they're coupled.**
Data: `src/data/spectrum.json` (8 clusters), read via `src/lib/spectrum.ts`.

## Route: `/platform`
File: `src/app/platform/page.tsx` — **monolithic, 300 lines, no sub-components.** Four sections by heading, all inline in this one file:
1. "The platform, in depth" (~line 93) — rerouted-chain function blocks
2. "Logistics roadmap" (~line 132) — hub-and-spoke + backhaul SVG diagram
3. "Traceability" (~line 219) — QR lot-ID scan flow
4. "Demand → supply feedback" (~line 244) — GAP/demand-scheduling loop
**If two agents need to edit different sections of /platform simultaneously, they WILL collide — it's one file.** Consider this the top collision-risk route; see below.

## Route: `/appendix`
File: `src/app/appendix/page.tsx` (125 lines)
```
<S5 />   ← src/components/scenes/S5.tsx  (⚠️ oddly named, legitimately wired — citations/decision-log content)
```
Plus inline JSX for the rest of the page — check the file directly for exact structure before editing.

---

## Orphaned files (exist on disk, NOT imported anywhere — confirmed via grep 2026-07-17)
- `src/components/scenes/BananaSplit.tsx`
- `src/components/scenes/S1.tsx`
- `src/components/scenes/S3.tsx` (the killed system-dynamics simulator — intentionally dead, do not resurrect without explicit instruction)
- `src/components/scenes/S4.tsx`
- `src/components/SectionBar.tsx`
**Do not assume these are live just because they're in the repo.** If a task mentions "the S4 scene" or similar, verify against this file list and the import grep above — names are misleading (S2 and S5 ARE live, despite the naming pattern suggesting a dead numbered series).

## Data — single source of truth
- `src/data/ledger.json` — every cited figure on every page, read via `src/lib/ledger.ts`. A new number on ANY page = a new field here first.
- `src/data/spectrum.json` — the 8-cluster dataset, read via `src/lib/spectrum.ts`. Only touched by cluster-related work.

---

## Known collision risks (for parallel-agent coordination)
1. **`layout.tsx` + `SiteNav.tsx` + `SectionTracker.tsx`** are a coupled triplet — any change to the main-page section list or the deep-page set touches all three. One agent should own this triplet per change, not split across parallel agents.
2. **`ledger.json`** is shared by every content-adding task. Two agents adding fields concurrently will conflict on the same JSON block — prefer one agent per ledger-touching task, or explicitly partition by top-level key.
3. **`/platform/page.tsx`** is monolithic — no safe way to parallelize edits within it. Treat as single-owner per session.
4. **`ProblemNational.tsx`** has been the site's most frequently re-edited file (TOP table removal, contrast-case removal, stat-row rebuild all landed here) — check git log for this file specifically before assuming its current state matches an old brief.
5. **General rule proven necessary 2026-07-17:** if you dispatch two site-editing agents in the same session, either (a) partition by file/route so they never touch the same file, or (b) run them sequentially, not concurrently — concurrent commits to the same repo caused a real git divergence that had to be manually reconciled (see `04 - Decision Log` for that incident if it's logged).
