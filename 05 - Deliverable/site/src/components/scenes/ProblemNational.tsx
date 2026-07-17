"use client";

import Link from "next/link";
import Reveal from "@/components/Reveal";
import Cite from "@/components/Cite";
import { ledger } from "@/lib/ledger";

const {
  bananaFarmerShare,
  bananaStageContent,
  topStageSplit,
  holdings,
  mandiDensity,
  eggsChanaShare,
  bvcPrecedent,
  bananaChainUplift,
} = ledger;

const TOP_CROPS: { key: "tomato" | "onion" | "potato"; label: string }[] = [
  { key: "tomato", label: "Tomato" },
  { key: "onion", label: "Onion" },
  { key: "potato", label: "Potato" },
];

const STAGE_COLOR: Record<string, string> = {
  farmer: "var(--signal)",
  trader: "rgba(255,255,255,0.55)",
  wholesaler: "rgba(255,255,255,0.35)",
  retailer: "var(--danger)",
};

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
                  share. They don&apos;t &mdash; most of it sits downstream,
                  at retail and in perishability risk.
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
            <div className="micro-label">Who does what for that money</div>
            <h2 className="font-display mt-3 text-4xl tracking-tight sm:text-5xl">
              Read the chain by reading the money
            </h2>
            <p className="mt-4 max-w-2xl text-muted">
              Banana&apos;s exact stage split isn&apos;t disclosed at this
              resolution. Here is what a fully-verified split chain looks
              like, for the vegetables RBI decomposed in full
              <Cite id={topStageSplit.source} />.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-12 flex flex-col gap-g2">
            {TOP_CROPS.map((crop) => {
              const s = topStageSplit[crop.key];
              return (
                <div key={crop.key} className="flex items-center gap-g3">
                  <div className="w-16 shrink-0 font-mono text-xs text-muted">
                    {crop.label}
                  </div>
                  <div className="flex h-9 flex-1 overflow-hidden rounded-[2px]">
                    {(["farmer", "trader", "wholesaler", "retailer"] as const).map(
                      (stage) => (
                        <div
                          key={stage}
                          style={{
                            flexGrow: s[stage],
                            background:
                              stage === "farmer"
                                ? "color-mix(in srgb, var(--signal) 30%, transparent)"
                                : stage === "retailer"
                                ? "color-mix(in srgb, var(--danger) 20%, transparent)"
                                : "rgba(255,255,255,0.06)",
                            borderRight: "1px solid var(--hairline)",
                          }}
                          className="flex items-center justify-center"
                        >
                          <span
                            className="font-mono text-[11px]"
                            style={{ color: STAGE_COLOR[stage] }}
                          >
                            {s[stage]}%
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              );
            })}
          </Reveal>

          {/* Structural constraint stat cascade */}
          <div className="mx-auto mt-g7 flex max-w-[760px] flex-col items-center gap-g5 text-center">
            <Reveal className="flex flex-col items-center">
              <div className="font-mono text-fs-5 text-signal">
                {holdings.total}
              </div>
              <div className="micro-label mt-2">
                landholdings <Cite id={holdings.source} />
              </div>
            </Reveal>
            <Reveal delay={0.08} className="flex flex-col items-center">
              <div className="font-mono text-fs-4 text-signal">
                {holdings.smallMarginalPct}%
              </div>
              <div className="micro-label mt-2">
                hold under 2 ha <Cite id={holdings.source} />
              </div>
            </Reveal>
            <Reveal delay={0.16} className="flex flex-col items-center">
              <div className="font-mono text-fs-3 text-signal">
                1 / {mandiDensity.actualSqKm}
              </div>
              <div className="micro-label mt-2">
                sq km per mandi, vs 1/{mandiDensity.recommendedSqKm}{" "}
                recommended <Cite id={mandiDensity.source} />
              </div>
            </Reveal>
          </div>
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
              those functions better &mdash; grading, financing, transport,
              ripening, demand-matching &mdash; not deleting the people who
              perform them.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="mt-g6 w-full max-w-[1200px]">
          <div className="grid grid-cols-12 gap-g3">
            <div className="col-span-11 col-start-2 border-l border-t border-b border-hairline p-g4 sm:p-g5 md:col-span-7 md:col-start-6">
              <div className="micro-label mb-2">Contrast case</div>
              <p className="max-w-md text-left text-text">
                Eggs and chana farmers keep{" "}
                <span className="stat text-fs-3">
                  &#8377;{eggsChanaShare.value}
                </span>{" "}
                of every &#8377;100 <Cite id={eggsChanaShare.source} />, proof
                the {bananaFarmerShare.value}% banana outcome is a chain
                problem, not a physics problem.
              </p>
            </div>
          </div>
        </Reveal>
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
              rupee &mdash; without owning a single truck it didn&apos;t need
              to.
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
                  with farmer co-ownership &mdash; same village, same crop,
                  same farmers.{" "}
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
