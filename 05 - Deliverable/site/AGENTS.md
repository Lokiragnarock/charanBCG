<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Review rule: live link, not local server
The deliverable for any site change is the **live Vercel production URL**, not a running dev server. After lint + build pass, the main session commits, pushes, and runs `vercel --prod`; the reply to the user must contain the live link. Boot `npm run dev` only for your own verification and kill it before reporting.

Live production URL: https://charan-bcg.vercel.app/ (Vercel project `charan-bcg`). After pushing changes, redeploy so this link reflects them, then share this link.
