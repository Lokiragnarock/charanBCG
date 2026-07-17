"use client";

import Reveal from "@/components/Reveal";
import Cite from "@/components/Cite";
import { ledger } from "@/lib/ledger";

const {
  bananaGlobalRank,
  bananaFruitEconomyShare,
  bananaYearRoundTN,
  bananaPseudostem,
  theniClusterStats,
  clusterLossComparison,
  bananaDomesticTransport,
  bananaRipeningCapacityTheni,
  giHeadroomTheni,
} = ledger;

/**
 * The beat the sweet-spot table only implies: why banana as a crop, why
 * Theni as a geography, stated plainly before the reader ever sees the
 * 8-cluster comparison. Two screens, asymmetric per the design doctrine
 * (no equal-column grids) -- three numbered banana points that alternate
 * label/stat sides, then a Theni prose beat + 4-fact row.
 */
export default function WhyBananaTheni() {
  return (
    <section
      id="why"
      className="relative flex w-full flex-col"
    >
      {/* Why banana -- three points, alternating sides so the eye travels diagonally */}
      <div className="flex min-h-screen w-full flex-col justify-center px-6 py-24">
        <div className="mx-auto w-full max-w-[1200px]">
          <Reveal>
            <div className="micro-label">Before the sweet spot</div>
            <h2 className="font-display mt-3 text-4xl tracking-tight sm:text-5xl">
              Why banana
            </h2>
          </Reveal>

          {/* 01 -- label left, stat right */}
          <Reveal delay={0.1} className="mt-g7">
            <div className="grid grid-cols-12 items-end gap-g3 border-t border-hairline pt-g5">
              <div className="col-span-12 md:col-span-5">
                <div className="micro-label text-signal/80">01</div>
                <p className="font-display mt-2 max-w-[30ch] text-2xl tracking-tight">
                  The world&apos;s largest producer
                </p>
              </div>
              <div className="col-span-12 text-right md:col-span-7">
                <div className="font-mono text-fs-4 leading-[0.9] text-signal">
                  {bananaGlobalRank.globalSharePct}%
                  <Cite id={bananaGlobalRank.source} />
                </div>
                <p className="mt-2 text-sm text-muted">
                  of global production &mdash; {bananaGlobalRank.mmt} MMT in{" "}
                  {bananaGlobalRank.year}. India&apos;s #{bananaFruitEconomyShare.rank}{" "}
                  fruit by land and value: {bananaFruitEconomyShare.areaSharePct}%
                  of fruit area, {bananaFruitEconomyShare.valueSharePct}% of
                  fruit output value
                  <Cite id={bananaFruitEconomyShare.source} />.
                </p>
              </div>
            </div>
          </Reveal>

          {/* 02 -- reversed: text left, label/heading right */}
          <Reveal delay={0.14} className="mt-g5">
            <div className="grid grid-cols-12 items-end gap-g3 border-t border-hairline pt-g5">
              <div className="col-span-12 md:col-span-7 md:order-1">
                <p className="max-w-[46ch] text-sm text-muted">
                  Unlike seasonal fruits, Tamil Nadu can plant banana nearly
                  any time of year except peak summer &mdash; meaning
                  supply-smoothing, our core lever, is agronomically possible
                  here specifically
                  <Cite id={bananaYearRoundTN.source} />.
                </p>
              </div>
              <div className="col-span-12 text-right md:col-span-5 md:order-2">
                <div className="micro-label text-signal/80">02</div>
                <p className="font-display mt-2 ml-auto max-w-[26ch] text-2xl tracking-tight">
                  Available year-round, in Tamil Nadu specifically
                </p>
              </div>
            </div>
          </Reveal>

          {/* 03 -- label left, stat right again */}
          <Reveal delay={0.18} className="mt-g5">
            <div className="grid grid-cols-12 items-end gap-g3 border-t border-hairline pt-g5">
              <div className="col-span-12 md:col-span-5">
                <div className="micro-label text-signal/80">03</div>
                <p className="font-display mt-2 max-w-[30ch] text-2xl tracking-tight">
                  Every part of the plant monetizes
                </p>
              </div>
              <div className="col-span-12 text-right md:col-span-7">
                <div className="font-mono text-fs-3 leading-[0.9] text-signal">
                  {bananaPseudostem.yieldPerHaMtLow}&ndash;
                  {bananaPseudostem.yieldPerHaMtHigh} MT/ha
                  <Cite id="rbi-fruits-2024" />
                </div>
                <p className="mt-2 text-sm text-muted">
                  of pseudostem waste, convertible to fibre (
                  {bananaPseudostem.fiberAGradePerKgLow}&ndash;
                  {bananaPseudostem.fiberAGradePerKgHigh}/kg A-grade), food
                  products, and bio-fertiliser &mdash; beyond the fruit itself.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Why Theni -- prose + 4-fact grid */}
      <div className="flex min-h-screen w-full flex-col justify-center px-6 py-24">
        <div className="mx-auto w-full max-w-[1200px]">
          <Reveal>
            <div className="micro-label">Inside banana</div>
            <h2 className="font-display mt-3 text-4xl tracking-tight sm:text-5xl">
              Why Theni
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="mt-10">
            <div className="grid grid-cols-12 gap-g3">
              <div className="col-span-12 md:col-span-8">
                <p className="max-w-[60ch] text-lg text-muted">
                  Theni is Tamil Nadu&apos;s growth cluster &mdash; GT
                  diagnostic Cluster 2, alongside Tuticorin and Madurai.
                  Stable at{" "}
                  <span className="text-text">
                    {theniClusterStats.areaKHa.toLocaleString()},000 Ha
                  </span>
                  , with production growing at{" "}
                  <span className="font-mono text-signal">
                    {theniClusterStats.productionCagrPct}% CAGR
                  </span>{" "}
                  via high-density planting and drip fertigation. Kerala
                  absorbs nearly all of its surplus
                  <Cite id={theniClusterStats.source} />.
                </p>
              </div>
            </div>
          </Reveal>

          {/* 4-fact grid, per-cell divider rule, same idiom as the Problem scene's stat row */}
          <Reveal delay={0.16} className="mt-g7">
            <div className="grid grid-cols-1 gap-g4 border-t border-hairline pt-g5 sm:grid-cols-2 lg:grid-cols-4 sm:gap-0 lg:divide-x lg:divide-hairline">
              <div className="flex flex-col gap-2 lg:px-g3 lg:first:pl-0">
                <div className="font-mono text-fs-3 text-signal">
                  {clusterLossComparison.tnPct}%
                  <Cite id={clusterLossComparison.source} />
                </div>
                <div className="micro-label">
                  total post-harvest loss &mdash; the lowest of any surveyed
                  cluster (vs {clusterLossComparison.gjPctLow}&ndash;
                  {clusterLossComparison.mhPct}% elsewhere)
                </div>
              </div>
              <div className="flex flex-col gap-2 lg:px-g3">
                <div className="font-mono text-fs-3 text-signal">
                  &#8377;{bananaDomesticTransport.perKgLow}&ndash;
                  {bananaDomesticTransport.perKgHigh}/kg
                  <Cite id={bananaDomesticTransport.source} />
                </div>
                <div className="micro-label">
                  transport cost to Cochin, 3&ndash;6 hour transit
                </div>
              </div>
              <div className="flex flex-col gap-2 lg:px-g3">
                <div className="font-mono text-fs-3 text-signal">
                  {bananaRipeningCapacityTheni.chambers} chambers
                  <Cite id={bananaRipeningCapacityTheni.source} />
                </div>
                <div className="micro-label">
                  {bananaRipeningCapacityTheni.capacityMt} MT in-cluster
                  ripening capacity, &#8377;2/kg usage charge
                </div>
              </div>
              <div className="flex flex-col gap-2 lg:px-g3 lg:last:pr-0">
                <div className="font-mono text-fs-3 text-signal">
                  {giHeadroomTheni.tags.length} GI tags
                  <Cite id={giHeadroomTheni.source} />
                </div>
                <div className="micro-label">
                  {giHeadroomTheni.brandRecall} brand recall &mdash; the
                  headroom {giHeadroomTheni.precedentCluster}&apos;s GI already
                  proved (+{giHeadroomTheni.precedentPremiumPct}%/kg premium)
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
