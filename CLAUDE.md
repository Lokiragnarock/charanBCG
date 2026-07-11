# Vault rules

## Showing the site (review rule — always applies)
When any work on the site (`05 - Deliverable/site`) is done and ready for review, **always share the live Vercel production link** — never tell the user to check a local dev server, and never leave "dev server running on :3000" as the deliverable. The flow is: build passes → commit → push → deploy to Vercel (`vercel --prod` from the site directory) → reply with the live URL. Local dev servers are for the agent's own verification only; kill them when done.

Live production URL: **https://charan-bcg.vercel.app/** (Vercel project `charan-bcg`, account `lokiragnarock`)
