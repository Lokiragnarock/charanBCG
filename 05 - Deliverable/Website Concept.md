---
title: R1 Deliverable — Live Scroll Site
type: idea
status: capture
created: 2026-07-09
tags: [deliverable, website, vercel, 3d-scroll]
---

# The R1 Deliverable — "Website, but live"

## Vision
A **live Vercel-deployed site** in the Anduril / Palantir visual language: dark, cinematic, engineering-serious. One continuous scroll that *is* the submission.

## Scroll journey (draft)
1. **Hero** — 3D scene, the case's central tension in one line
2. **The idea** — recommendation unfolds as you scroll (element 2)
3. **Evidence** — data viz sections, every figure footnoted with its source (element 3)
4. **The graveyard** — what we considered and rejected, shown as branching paths that fade (element 4)
5. **Slide deck** — embedded deck section for judges who want the classic format
6. **Prototype teaser** — R2 build idea, interactive mock (element 5)
7. **Footnotes of the journey** — decision log rendered as a timeline; "Working the AI" moments as annotated exchanges (element 6)

## Likely stack
- Next.js on Vercel
- Three.js / react-three-fiber + drei ScrollControls, or Lenis + GSAP ScrollTrigger for the scroll choreography
- Content driven from this vault's markdown where possible (single source of truth)

## Constraints to respect
- **R1 is scored on analysis, not the build** — flash serves content, never replaces it
- Must degrade gracefully (judges may open on anything); also export a PDF fallback
- File-naming convention still applies to whatever file we submit (likely a PDF/one-pager linking to the live URL)

## Open threads
- [ ] Team name + campus for naming convention
- [ ] Repo: same repo as vault, or separate app repo?
