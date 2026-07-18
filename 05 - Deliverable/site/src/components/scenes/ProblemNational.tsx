"use client";

import Link from "next/link";
import Reveal from "@/components/Reveal";
import Cite from "@/components/Cite";
import { ledger } from "@/lib/ledger";

const {
  bananaFarmerShare,
  bananaStageContent,
  holdings,
  mandiDensity,
  bvcPrecedent,
  bananaChainUplift,
} = ledger;

/**
 * The Problem, framed nationally — no Theni-specific corridor numbers here
 * (those live in the value-chain scene, after the reader has seen the
 * cluster get picked). Five stacked beats under one #problem anchor:
 * a) the banana rupee split, b) what a fully-verified split chain looks
 * like, c) the punchline (functions, not theft), d) the headroom proof.
 */
export default function ProblemNational() {
  return (
    <section
      id="problem"
      className="relative flex w-full flex-col"
    >
      {/* a) What does a banana cost? — the hero split, descriptive not fabricated */}
      <div className="flex min-h-screen w-full flex-col justify-center px-6 py-24">
        <div className="mx-auto w-full max-w-[1200px]">
          <Reveal>
            <div className="micro-label">The Problem</div>
            <h2 className="font-display mt-3 text-4xl tracking-tight sm:text-5xl">
              What does a banana cost?
            </h2>
          </Reveal>

          <div className="mt-16 grid grid-cols-12 items-end gap-g3">
            <div className="col-span-12 md:col-span-5 md:self-end">
              <Reveal delay={0.1}>
                <p className="max-w-[36ch] text-lg text-muted">
                  Everyone assumes traders and wholesalers eat the missing
                  share. They don&apos;t; most of it sits downstream, at
                  retail and in perishability risk.
                </p>
              </Reveal>
            </div>

            <div className="relative col-span-12 text-right md:col-span-7">
              <Reveal delay={0.02}>
                <div className="micro-label">Farmer keeps</div>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="font-mono text-fs-6 leading-[0.88] text-signal">
                  {bananaFarmerShare.value}%
                  <Cite id={bananaFarmerShare.source} />
                </div>
              </Reveal>
              <Reveal delay={0.18}>
                <div className="font-mono text-sm text-muted">
                  range {bananaFarmerShare.rangeLow}&ndash;
                  {bananaFarmerShare.rangeHigh}%, ~{bananaFarmerShare.postPeak}%
                  post-peak
                </div>
              </Reveal>
            </div>
          </div>

          <Reveal delay={0.1} className="mt-g6">
            <div className="grid grid-cols-1 gap-g2 border-t border-hairline pt-g4 sm:grid-cols-3">
              <div>
                <div className="micro-label text-danger/80">Trader mark-up &asymp;</div>
                <div className="mt-1 text-sm text-text">
                  {bananaStageContent.trader}
                </div>
              </div>
              <div>
                <div className="micro-label text-danger/80">Wholesaler mark-up &asymp;</div>
                <div className="mt-1 text-sm text-text">
                  {bananaStageContent.wholesaler}
                </div>
              </div>
              <div>
                <div className="micro-label text-danger/80">Retailer mark-up &asymp;</div>
                <div className="mt-1 text-sm text-text">
                  {bananaStageContent.retailer}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* b) who does what for that money — a fully-verified chain, for scale */}
      <div className="flex min-h-screen w-full flex-col justify-center px-6 py-24">
        <div className="mx-auto w-full max-w-[1200px]">
          <Reveal>
            <div className="micro-label">The structural constraint</div>
            <h2 className="font-display mt-3 text-4xl tracking-tight sm:text-5xl">
              The base the chain sits on
            </h2>
            <p className="mt-4 max-w-2xl text-muted">
              Before the chain comes the farm: fragmented holdings meeting
              thin market infrastructure, nationwide.
            </p>
          </Reveal>

          {/* Structural constraint stat row — left to right, equal weight, one screen */}
          <Reveal delay={0.1} className="mt-g7">
            <div className="grid grid-cols-2 gap-g4 border-t border-hairline pt-g5 sm:grid-cols-4 sm:gap-0 sm:divide-x sm:divide-hairline">
              <div className="flex flex-col items-center gap-2 text-center sm:px-g3 sm:first:pl-0">
                <div className="font-mono text-fs-4 text-signal">
                  {holdings.total}
                </div>
                <div className="micro-label">
                  landholdings <Cite id={holdings.source} />
                </div>
              </div>
              <div className="flex flex-col items-center gap-2 text-center sm:px-g3">
                <div className="font-mono text-fs-4 text-signal">
                  {holdings.smallMarginalPct}%
                </div>
                <div className="micro-label">
                  hold under 2 ha <Cite id={holdings.source} />
                </div>
              </div>
              <div className="flex flex-col items-center gap-2 text-center sm:px-g3">
                <div className="font-mono text-fs-4 text-signal">
                  {holdings.avgHa.toFixed(2)} ha
                </div>
                <div className="micro-label">
                  average holding, down from {holdings.avgHa1970} ha (1970)
                  <Cite id={holdings.source} />
                </div>
              </div>
              <div className="flex flex-col items-center gap-2 text-center sm:px-g3 sm:last:pr-0">
                <div className="font-mono text-fs-4 text-signal">
                  1 / {mandiDensity.actualSqKm}
                </div>
                <div className="micro-label">
                  sq km per mandi, vs 1/{mandiDensity.recommendedSqKm}{" "}
                  recommended <Cite id={mandiDensity.source} />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* c) the punchline — functions, not theft */}
      <div className="flex min-h-screen w-full flex-col items-center justify-center px-6 py-24 text-center">
        <div className="mx-auto w-full max-w-[900px]">
          <Reveal>
            <p className="font-mono text-fs-2 leading-tight text-text">
              The money isn&apos;t stolen. It pays for real functions performed
              inefficiently, and real risk absorbed informally.
            </p>
          </Reveal>
          <Reveal delay={0.12} className="mt-g4">
            <p className="mx-auto max-w-[56ch] text-muted">
              Uncertainty is the product. Capturing value means re-performing
              the functions (grading, financing, transport, ripening,
              demand-matching) better, not deleting the people who perform
              them.
            </p>
          </Reveal>
        </div>
      </div>

      {/* d) headroom proof */}
      <div className="flex min-h-screen w-full flex-col justify-center px-6 py-24">
        <div className="mx-auto w-full max-w-[1200px]">
          <Reveal>
            <div className="micro-label">The headroom is proven, not hoped for</div>
            <h2 className="font-display mt-3 text-4xl tracking-tight sm:text-5xl">
              This has already been done once
            </h2>
            <p className="mt-4 max-w-2xl text-muted">
              A farmer-co-owned wholesale agency, in a real banana cluster,
              already replaced the traditional chain and kept more of the
              rupee, without owning a single truck it didn&apos;t need to.
            </p>
          </Reveal>

          <Reveal delay={0.12} className="mt-12">
            <div className="grid grid-cols-12 items-end gap-g3 border-t border-hairline pt-g5">
              <div className="col-span-12 md:col-span-5">
                <div className="micro-label">
                  {bvcPrecedent.village}, {bvcPrecedent.district} district
                  <Cite id={bvcPrecedent.source} />
                </div>
                <p className="mt-2 max-w-[42ch] text-sm text-muted">
                  Traditional multi-layer chain vs. a modern wholesale agency
                  with farmer co-ownership: same village, same crop, same
                  farmers.{" "}
                  <Link href="/history" className="text-signal hover:underline">
                    Read the full precedent &rarr;
                  </Link>
                </p>
              </div>
              <div className="col-span-12 flex items-end gap-g4 md:col-span-7 md:justify-end">
                <div className="flex flex-col items-center">
                  <div className="font-mono text-fs-3 text-muted">
                    {bananaChainUplift.traditionalPct}%
                  </div>
                  <div className="micro-label mt-1 text-[10px]">
                    Traditional chain
                  </div>
                </div>
                <div className="font-mono text-fs-3 text-muted">&rarr;</div>
                <div className="flex flex-col items-center">
                  <div className="font-mono text-fs-4 text-signal">
                    {bananaChainUplift.modernPct}%
                  </div>
                  <div className="micro-label mt-1 text-[10px]">
                    Farmer co-owned
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
