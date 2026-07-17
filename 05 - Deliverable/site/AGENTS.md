<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Review rule: live link, not local server
The deliverable for any site change is the **live Vercel production URL**, not a running dev server. After lint + build pass, the main session commits, pushes, and runs `vercel --prod`; the reply to the user must contain the live link. Boot `npm run dev` only for your own verification and kill it before reporting.

Live production URL: https://charan-bcg.vercel.app/ (Vercel project `charan-bcg`). After pushing changes, redeploy so this link reflects them, then share this link.

# Read SITEMAP.md before editing
`SITEMAP.md` (this directory) is the ground-truth flow map: every route, every scene component in scroll order, which files are orphaned vs. live, and the known collision-risk files/routes. Read it first — component names are misleading (e.g. `S2.tsx`/`S5.tsx` are live, `S1.tsx`/`S3.tsx`/`S4.tsx` are dead) and guessing wastes a round-trip. If you are one of several agents editing this site concurrently, check the "known collision risks" section and coordinate (partition by file, or run sequentially) — concurrent commits from parallel agents have already caused one real git divergence that required manual reconciliation.
