"use client";

import Reveal from "@/components/Reveal";
import Cite from "@/components/Cite";
import { ledger } from "@/lib/ledger";

const PRECEDENTS = [
  {
    year: "2000s",
    name: "ITC e-Choupal",
    body: "Village-level kiosks put mandi price information directly in farmers' hands. The lesson: ITC never owned the physical chain, and coordination still beat ownership.",
    caveat:
      "ITC, the buyer, captured the uplift. This design routes it to the FPO's members instead.",
  },
  {
    year: "2010–",
    name: "Sahyadri Farms",
    body: (
      <>
        Demand-first sequencing: contracts before assets. ₹
        {ledger.sahyadri.revenueFY25Cr.toLocaleString("en-IN")} Cr FY25,{" "}
        {ledger.sahyadri.cagrPct}% CAGR,{" "}
        {ledger.sahyadri.farmers.toLocaleString("en-IN")}+ farmers
        <Cite id={ledger.sahyadri.source} />. It built the order book before
        it built cold storage.
      </>
    ),
    caveat: null,
  },
  {
    year: "RBI WPS 06/2024",
    name: "Mango pre-harvest contractor (PHC)",
    body: (
      <>
        Contractors fix price and tonnage off flowering, fund orchard
        upkeep, and aggregate: a bundle, not a toll. Mango farmers keep{" "}
        <span className="stat">
          {ledger.mangoFarmerShare.valueLow}–{ledger.mangoFarmerShare.valueHigh}%
        </span>
        <Cite id={ledger.mangoFarmerShare.source} />, the highest of the
        three fruits studied, with a contractor layer rather than despite
        one.
      </>
    ),
    caveat: null,
  },
];

export default function History() {
  return (
    <section
      id="history"
      className="relative flex min-h-screen w-full flex-col justify-center px-6 py-24"
    >
      <div className="mx-auto w-full max-w-[1200px]">
        <Reveal>
          <div className="micro-label">Precedence</div>
          <h2 className="font-display mt-3 text-4xl tracking-tight sm:text-5xl">
            The case law
          </h2>
          <p className="mt-4 max-w-xl text-muted">
            Three precedents bound the operating model to what has already
            been proven to work, and where each one stops proving it.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-12 gap-g3">
          {PRECEDENTS.map((p, i) => (
            <Reveal
              key={p.name}
              delay={i * 0.1}
              className={`col-span-12 md:col-span-8 ${
                i % 2 === 0 ? "md:col-start-1" : "md:col-start-5"
              }`}
            >
              <div className="border-l border-hairline py-2 pl-6">
                <div className="micro-label text-signal">{p.year}</div>
                <div className="font-display mt-2 text-2xl">{p.name}</div>
                <p className="mt-3 max-w-[58ch] text-muted">{p.body}</p>
                {p.caveat && (
                  <p className="mt-3 max-w-[58ch] border-l border-danger/40 pl-3 text-sm text-danger/90">
                    {p.caveat}
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        {/* Centering rationed to this one thesis line — the gavel */}
        <div className="mt-g7 flex justify-center">
          <Reveal>
            <p className="font-mono text-fs-2 text-center text-signal">
              Coordination over ownership.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
