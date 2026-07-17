import Link from "next/link";
import Reveal from "@/components/Reveal";
import S5 from "@/components/scenes/S5";
import { ledger, sources, tagEmoji } from "@/lib/ledger";

export const metadata = {
  title: "Appendix — The Banana Case",
};

const DATA_QUALITY_NOTES: { title: string; body: string }[] = [
  {
    title: "Jalgaon → Delhi illustrative corridor build-up",
    body: "A synthesized ₹13 → ₹18 → ₹21.5 → ₹25 farmgate-to-retail build-up implies ~52% farmer share, which conflicts with RBI's verified 30.8% headline for the same corridor description. Different year or source, or a synthesis blend across sources — not yet reconciled to a single primary page. Not shown on any reader-facing page; retained here and in ledger.json only.",
  },
  {
    title: "TN C2 (Theni) marketable surplus: two figures",
    body: "0.48 lakh MT in the MoFPI/Grant Thornton diagnostic dataset vs 0.35 lakh MT in the internal GT deck. Not yet reconciled to one number — shown here, not on /clusters or the main page.",
  },
  {
    title: "AP C2 marketable surplus: likely unit slip",
    body: "Stated as 0.82 lakh MT against 2.16 Mn MT production, which reads as an implausible ratio next to the other clusters — most likely a units error in the source (probably meant 0.82 Mn MT). Shown as sourced, not silently corrected, and not surfaced on reader-facing pages.",
  },
  {
    title: "Local retail price (Theni corridor): derived, not quoted",
    body: "₹17.3–19.2/kg is not a directly reported retail price. It is derived by dividing the Theni commission-agent farmgate price (₹9–10/kg) by the BVC1 traditional-chain farmer share (52%). Labeled as derived only here and in the value-chain scene's citation — never asserted as a primary quote.",
  },
];

export default function AppendixPage() {
  const sourceEntries = Object.entries(sources).filter(
    ([id]) => id !== "mock-v0"
  );

  return (
    <main className="relative min-h-screen w-full px-6 pt-[52px] pb-24">
      <div className="mx-auto w-full max-w-[1200px] py-16">
        <Reveal>
          <div className="micro-label">The appendix</div>
          <h1 className="font-display mt-3 text-4xl tracking-tight sm:text-5xl">
            Every number, every decision
          </h1>
          <p className="mt-4 max-w-2xl text-muted">
            Confidence tags and data-quality caveats live here, and only
            here. Every reader-facing figure elsewhere on the site is either
            fully verified or explicitly labeled as modelled &mdash; never
            silently hedged.
          </p>
        </Reveal>

        {/* Data quality notes */}
        <Reveal delay={0.08} className="mt-16">
          <div className="micro-label mb-6">Data-quality notes</div>
          <div className="flex flex-col divide-y divide-hairline border-t border-hairline">
            {DATA_QUALITY_NOTES.map((n) => (
              <div key={n.title} className="py-6">
                <div className="font-display text-lg">{n.title}</div>
                <p className="mt-2 max-w-[70ch] text-sm text-muted">{n.body}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Decision log */}
        <div className="mt-16">
          <S5 />
        </div>

        {/* Full citations table */}
        <Reveal delay={0.1} className="mt-4">
          <div className="micro-label mb-6">Citations table</div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left text-sm">
              <thead>
                <tr className="micro-label border-b border-hairline text-[10px]">
                  <th className="py-3 pr-4">Tag</th>
                  <th className="py-3 pr-4">Source</th>
                  <th className="py-3 pr-4">Year</th>
                </tr>
              </thead>
              <tbody>
                {sourceEntries.map(([id, s]) => (
                  <tr key={id} className="border-b border-hairline/60">
                    <td className="py-3 pr-4">{tagEmoji[s.tag]}</td>
                    <td className="py-3 pr-4">
                      {s.url ? (
                        <a
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-text hover:text-signal"
                        >
                          {s.title}
                        </a>
                      ) : (
                        <span className="text-text">{s.title}</span>
                      )}
                    </td>
                    <td className="py-3 pr-4 font-mono text-muted">{s.year}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-muted">
            Every figure that appears anywhere on this site is bound from{" "}
            <code>src/data/ledger.json</code> and{" "}
            <code>src/data/spectrum.json</code>, sourced above — {" "}
            {Object.keys(ledger).length - 1} data groups, {sourceEntries.length}{" "}
            sources.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-hairline pt-8">
          <p className="text-sm text-muted">Back to the beginning.</p>
          <Link
            href="/"
            className="micro-label border border-hairline px-4 py-2 text-muted transition-colors duration-150 hover:border-signal hover:text-signal"
          >
            Home &rarr;
          </Link>
        </Reveal>
      </div>
    </main>
  );
}
