"use client";

import Reveal from "@/components/Reveal";
import Cite from "@/components/Cite";
import { ledger } from "@/lib/ledger";

const LINKS = [
  {
    id: "L0",
    name: "Data",
    stat: `${ledger.enamSharePct.value}%`,
    detail: "eNAM share of commodity trade",
    citeId: ledger.enamSharePct.source,
  },
  {
    id: "L1",
    name: "Input & credit",
    stat: `${ledger.credit.kccEffectivePct}%`,
    detail: "effective KCC rate vs 36%+ informal",
    citeId: ledger.credit.source,
  },
  {
    id: "L2",
    name: "Advisory",
    stat: `+${ledger.advisory.contractFarmingUpliftPct}%`,
    detail: "net income uplift, contract farming",
    citeId: ledger.advisory.source,
  },
  {
    id: "L3",
    name: "Aggregation",
    stat: `${ledger.holdings.avgHa} ha`,
    detail: "average holding feeding the collection point",
    citeId: ledger.holdings.source,
  },
  {
    id: "L4",
    name: "Grading & storage",
    stat: `${ledger.losses.tomatoPct}%`,
    detail: "post-harvest loss, tomato",
    citeId: ledger.losses.source,
  },
  {
    id: "L5",
    name: "Transport",
    stat: "tbd",
    detail: "₹/kg/km rural haulage",
  },
  {
    id: "L6",
    name: "Wholesale → Retail",
    stat: `₹${ledger.residual.tomato}`,
    detail: ledger.residual.label,
    citeId: ledger.residual.source,
  },
];

export default function S2() {
  return (
    <section
      id="s2"
      className="relative flex min-h-screen w-full flex-col justify-center px-6 py-24"
    >
      <div className="mx-auto w-full max-w-[1200px]">
        <Reveal>
          <div className="micro-label">Scene 2</div>
          <h2 className="font-display mt-3 text-4xl tracking-tight sm:text-5xl">
            The Chain
          </h2>
          <p className="mt-4 max-w-xl text-muted">
            3D journey along the seven links — camera tracks the chain,
            each link expands into a Foundry-style panel. v1.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {LINKS.map((link, i) => (
            <Reveal key={link.id} delay={i * 0.05}>
              <div className="panel flex h-full flex-col justify-between p-4">
                <div className="micro-label">{link.id}</div>
                <div className="font-display mt-3 text-sm">{link.name}</div>
                <div className="font-mono mt-4 text-xl text-signal">
                  {link.stat}
                  {link.citeId && <Cite id={link.citeId} />}
                </div>
                <div className="micro-label mt-2 normal-case tracking-normal text-[10px]">
                  {link.detail}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="micro-label mt-8 border border-dashed border-hairline p-4 text-center">
          Placeholder — 3D journey — v1
        </div>
      </div>
    </section>
  );
}
