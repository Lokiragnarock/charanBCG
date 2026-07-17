"use client";

import Link from "next/link";
import Reveal from "@/components/Reveal";
import Cite from "@/components/Cite";
import ClusterBubbleMap from "@/components/ClusterBubbleMap";
import { spectrum, type Cluster } from "@/lib/spectrum";

const CLUSTERS = [...spectrum.clusters].sort((a, b) => b.delta - a.delta);

const GI_LABEL: Record<Cluster["giStatus"], string> = {
  none: "No GI",
  monetized: "GI, monetized",
  "unmonetized-hill": "GI, unmonetized",
  "unmonetized-local": "GI, unmarketed",
};

function competitionLabel(c: Cluster) {
  if (c.inputMonopoly) return "Input monopoly";
  if (c.directSourcingPct) return `${c.directSourcingPct}% direct-sourced`;
  return "No organized buyer";
}

function portLabel(c: Cluster) {
  // Short form of the full connectivity note, for a table cell.
  return c.portConnectivity.split(";")[0].split(",")[0];
}

/**
 * Sweet-spot ranked comparison table: 8 real banana clusters as rows,
 * Theni (our pick) highlighted. This is the ONLY spectrum visualization
 * on the main page — the bubble chart lives at /clusters.
 */
export default function SweetSpotTable() {
  return (
    <section
      id="sweet-spot"
      className="relative flex min-h-screen w-full flex-col justify-center px-6 py-24"
    >
      <div className="mx-auto w-full max-w-[1200px]">
        <Reveal>
          <div className="micro-label">Why banana, why Theni</div>
          <h2 className="font-display mt-3 text-4xl tracking-tight sm:text-5xl">
            Eight clusters, one clear pick
          </h2>
          <p className="mt-4 max-w-2xl text-muted">
            Banana is already decided. This is why Theni, inside banana
            &mdash; scored on an efficiency floor and GI headroom, not on
            crop choice.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="panel mt-10 overflow-hidden">
            <ClusterBubbleMap interactive={false} />
          </div>
        </Reveal>

        <Reveal delay={0.14} className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-left">
            <thead>
              <tr className="micro-label border-b border-hairline text-[10px]">
                <th className="py-3 pr-4">Cluster</th>
                <th className="py-3 pr-4">Marketable surplus</th>
                <th className="py-3 pr-4">Post-harvest loss</th>
                <th className="py-3 pr-4">Port access</th>
                <th className="py-3 pr-4">GI headroom</th>
                <th className="py-3 pr-4">Corporate competition</th>
              </tr>
            </thead>
            <tbody>
              {CLUSTERS.map((c) => (
                <tr
                  key={c.key}
                  className={`border-b border-hairline/60 text-sm transition-colors duration-150 ${
                    c.pick ? "bg-signal/10" : ""
                  }`}
                >
                  <td className="py-3 pr-4 font-mono">
                    <span className={c.pick ? "text-signal" : "text-text"}>
                      {c.label}
                    </span>
                    {c.pick && (
                      <span className="ml-2 border border-signal/40 px-1.5 py-0.5 text-[9px] text-signal">
                        OUR PICK
                      </span>
                    )}
                    <Cite id={c.source} />
                  </td>
                  <td className="py-3 pr-4 font-mono text-muted">
                    {c.marketSurplusLMt} L MT
                  </td>
                  <td
                    className={`py-3 pr-4 font-mono ${
                      c.postHarvestLossPct <= 9 ? "text-signal" : "text-danger"
                    }`}
                  >
                    {c.postHarvestLossPct}%
                  </td>
                  <td className="py-3 pr-4 text-xs text-muted">
                    {portLabel(c)}
                  </td>
                  <td className="py-3 pr-4 text-xs text-muted">
                    {GI_LABEL[c.giStatus]}
                  </td>
                  <td className="py-3 pr-4 text-xs text-muted">
                    {competitionLabel(c)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        <Reveal delay={0.18} className="mt-8 flex flex-wrap items-center justify-between gap-g3">
          <p className="max-w-[60ch] text-sm text-muted">
            Theni ties the lowest post-harvest loss in the set with the only
            unmonetized GI headroom &mdash; the weakest incumbent competition,
            the biggest platform prize.
          </p>
          <Link
            href="/clusters"
            className="micro-label shrink-0 border border-hairline px-4 py-2 text-muted transition-colors duration-150 hover:border-signal hover:text-signal"
          >
            Explore all 8 clusters &rarr;
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
