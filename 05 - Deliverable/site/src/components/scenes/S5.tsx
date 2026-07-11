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

export default function S5() {
  return (
    <section
      id="s5"
      className="relative flex min-h-screen w-full flex-col justify-center px-6 py-24"
    >
      <div className="mx-auto w-full max-w-[1200px]">
        <Reveal>
          <div className="micro-label">Scene 5</div>
          <h2 className="font-display mt-3 text-4xl tracking-tight sm:text-5xl">
            Footnotes of the Journey
          </h2>
          <p className="mt-4 max-w-xl text-muted">
            What we considered, rejected, and why. End-credits style:
            expandable entries, v1 stub below.
          </p>
        </Reveal>

        <div className="mt-12 flex flex-col divide-y divide-hairline border-t border-hairline">
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

        <div className="micro-label mt-10 border border-dashed border-hairline p-4 text-center">
          Full decision log: expandable end-credits scroll, v1
        </div>
      </div>
    </section>
  );
}
