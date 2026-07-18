# Vault rules

## Showing the site (review rule — always applies)
When any work on the site (`05 - Deliverable/site`) is done and ready for review, **always share the live Vercel production link** — never tell the user to check a local dev server, and never leave "dev server running on :3000" as the deliverable. The flow is: build passes → commit → push → deploy to Vercel (`vercel --prod` from the site directory) → reply with the live URL. Local dev servers are for the agent's own verification only; kill them when done.

Live production URL: **https://charan-bcg.vercel.app/** (Vercel project `charan-bcg`, account `lokiragnarock`)

## Voice — applies to ALL site copy and vault prose (anti-patterns)
Impersonal case-document voice. Never:
- First or second person ("we believe", "you'll see") — the document speaks, not a narrator.
- Em-dash chains or double-hyphens in prose and citation titles.
- Rule-of-three padding, "not just X but Y", negative parallelisms, promotional adjectives.
- AI-slop fillers: "delve", "landscape", "robust", "seamless", "leverage" (as a verb).
Write it clean the first time; a de-slop pass after the fact means this rule failed.
