"use client";

import Reveal from "@/components/Reveal";

const DECISIONS = [
  {
    title: "Rejected: 'cut out the middleman' framing",
    body: "First AI answer targeted the trader/wholesaler ~10.6% margin. The Link Ledger showed the real prize sits in the ~₹56 retail + wastage residual: reframed the whole thesis around moving up the chain, not around them.",
  },
  {
    title: "Rejected: link ownership requiring crore-scale capital",
    body: "Median FPO working capital is under ₹3 lakh, roughly one truckload of onions. Any link whose entry ticket is measured in crores was ruled out early as fantasy without external finance.",
  },
  {
    title: "Considered: human agronomist advisory model",
    body: "Contract-farming uplift data (+81% net income) is real, but the unit economics only work at AI-advisory cost (target <₹50/farmer/yr), not a human-agronomist headcount model: logged as an open cost-build gap in the Link Ledger.",
  },
];

const AI_USE_CASES = [
  {
    title: "Rapid research",
    body: "Used GPT to digest 100+ pages of government reports, research papers, and industry articles into actionable insights in hours instead of days.",
  },
  {
    title: "Deconstructing concepts",
    body: "Broke down complex value chains, identified root causes, and simplified technical concepts to build a first-principles understanding before jumping to solutions.",
  },
  {
    title: "Cross-verification",
    body: "Validated every major hypothesis using multiple sources, ensuring recommendations were backed by data rather than assumptions.",
  },
  {
    title: "Crop selection",
    body: "Evaluated 100+ crops (tomatoes to turmeric) using a weighted framework based on factors such as market size, value creation potential, seasonality, perishability, processing opportunities, export potential, FPO fit, and AI applicability. Pressure-tested the top 10 shortlisted crops before selecting bananas.",
  },
  {
    title: "Website creation",
    body: "Used GPT to plan the website architecture, refine content, and shape the user experience for the FPO's digital marketplace and branding platform.",
  },
  {
    title: "Guesstimates & financial modelling",
    body: "Leveraged secondary research and structured modelling to estimate market size, revenue potential, branding premiums, export opportunity, and the business case for proposed interventions.",
  },
];

export default function S5() {
  return (
    <section
      id="s5"
      className="relative flex min-h-screen w-full flex-col justify-center px-6 py-24"
    >
      <div className="mx-auto w-full max-w-[1200px]">
        <Reveal>
          <div className="micro-label">AI use case</div>
          <h2 className="font-display mt-3 text-4xl tracking-tight sm:text-5xl">
            AI Use Case
          </h2>
          <p className="mt-4 max-w-xl text-muted">
            How AI was actually used to build this case: the
            methodology, not just the output.
          </p>
        </Reveal>

        <div className="mt-12 flex flex-col divide-y divide-hairline border-t border-hairline">
          {AI_USE_CASES.map((d, i) => (
            <Reveal key={d.title} delay={i * 0.06}>
              <div className="py-8 md:flex md:items-start md:gap-6">
                <div className="font-mono text-2xl text-signal md:w-14 md:shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <div className="font-display text-xl">{d.title}</div>
                  <p className="mt-2 max-w-2xl text-muted">{d.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="micro-label mt-16">Decision log</div>
          <p className="mt-3 max-w-xl text-muted">
            Options considered, rejected, and why.
          </p>
        </Reveal>

        <div className="mt-8 flex flex-col divide-y divide-hairline border-t border-hairline">
          {DECISIONS.map((d, i) => (
            <Reveal key={d.title} delay={i * 0.08}>
              <div className="py-8">
                <div className="micro-label mb-3">
                  Decision log · {String(i + 1).padStart(2, "0")}
                </div>
                <div className="font-display text-xl">{d.title}</div>
                <p className="mt-3 max-w-2xl text-muted">{d.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
