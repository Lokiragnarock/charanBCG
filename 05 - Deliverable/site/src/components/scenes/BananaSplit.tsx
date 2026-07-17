"use client";

import Reveal from "@/components/Reveal";
import Cite from "@/components/Cite";
import { ledger } from "@/lib/ledger";

const {
  bananaFarmerShare,
  bananaStageContent,
  topStageSplit,
  bananaCultivationCost,
  theniChannelPrices,
  ripeningCharge,
  bananaDomesticTransport,
  bananaValueChainLossTN,
  bananaElasticity,
  bananaCorridorIllustrative,
  bananaChainUplift,
  bananaGradePricesByState,
  bananaNendranFarmgate,
  bananaCertificationPremium,
  bananaPseudostem,
} = ledger;

const CORRIDOR_STEPS: { label: string; value: number; note?: string }[] = [
  { label: "Farmgate", value: bananaCorridorIllustrative.farmgate },
  {
    label: "Trader",
    value: bananaCorridorIllustrative.trader,
    note: bananaCorridorIllustrative.traderNote,
  },
  {
    label: "Wholesale",
    value: bananaCorridorIllustrative.wholesale,
    note: bananaCorridorIllustrative.wholesaleNote,
  },
  { label: "Retail", value: bananaCorridorIllustrative.retail },
];

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

export default function BananaSplit() {
  return (
    <section
      id="banana-split"
      className="relative flex min-h-screen w-full flex-col justify-center px-6 py-24"
    >
      <div className="mx-auto w-full max-w-[1200px]">
        <Reveal>
          <div className="micro-label">The rupee split</div>
          <h2 className="font-display mt-3 text-4xl tracking-tight sm:text-5xl">
            The banana chain, Jalgaon &rarr; Delhi
          </h2>
        </Reveal>

        {/* fortissimo: the hero farmer-share number, asymmetric 5:7 */}
        <div className="mt-16 grid grid-cols-12 items-end gap-g3">
          <div className="col-span-12 md:col-span-5 md:self-end">
            <Reveal delay={0.1}>
              <p className="max-w-[36ch] text-lg text-muted">
                Of every rupee a consumer pays for a banana, the farmer
                keeps the least of the three fruits studied — even less
                than mango or grapes.
              </p>
              <p className="mt-4 max-w-[36ch] text-sm text-muted">
                {bananaStageContent.note}
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
                range {bananaFarmerShare.rangeLow}–{bananaFarmerShare.rangeHigh}%,
                ~{bananaFarmerShare.postPeak}% post-peak
              </div>
            </Reveal>
          </div>
        </div>

        {/* stage cost content — descriptive, not fabricated percentages */}
        <Reveal delay={0.1} className="mt-g6">
          <div className="grid grid-cols-1 gap-g2 border-t border-hairline pt-g4 sm:grid-cols-3">
            <div>
              <div className="micro-label text-danger/80">Trader mark-up ≈</div>
              <div className="mt-1 text-sm text-text">
                {bananaStageContent.trader}
              </div>
            </div>
            <div>
              <div className="micro-label text-danger/80">Wholesaler mark-up ≈</div>
              <div className="mt-1 text-sm text-text">
                {bananaStageContent.wholesaler}
              </div>
            </div>
            <div>
              <div className="micro-label text-danger/80">Retailer mark-up ≈</div>
              <div className="mt-1 text-sm text-text">
                {bananaStageContent.retailer}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Comparison: verified TOP stage-wise split, clearly labeled as a different chain */}
        <Reveal delay={0.15} className="mt-g6">
          <div className="micro-label mb-g3">
            For comparison only — verified stage-wise split, TOP vegetables
            <Cite id={topStageSplit.source} />
          </div>
          <div className="flex flex-col gap-g2">
            {TOP_CROPS.map((crop) => {
              const s = topStageSplit[crop.key];
              return (
                <div key={crop.key} className="flex items-center gap-g3">
                  <div className="w-16 shrink-0 font-mono text-xs text-muted">
                    {crop.label}
                  </div>
                  <div className="flex h-7 flex-1 overflow-hidden rounded-[2px]">
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
                            className="font-mono text-[10px]"
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
          </div>
          <p className="mt-g3 max-w-[60ch] text-xs text-muted">
            Banana&apos;s exact stage split is not disclosed at this
            resolution &mdash; the TOP decomposition is shown only to
            demonstrate what a fully-verified chain looks like, not as a
            banana stand-in.
          </p>
        </Reveal>

        {/* Theni economics — diagonal stat cascade, not equal columns */}
        <div className="mt-g7 grid grid-cols-12 gap-g3">
          <Reveal className="col-span-12 sm:col-span-6 md:col-start-1">
            <div className="font-mono text-fs-3 text-signal">
              &#8377;{bananaCultivationCost.perKg}/kg
            </div>
            <div className="micro-label mt-2">
              cultivation cost
              <Cite id={bananaCultivationCost.source} />
            </div>
          </Reveal>

          <Reveal delay={0.06} className="col-span-12 sm:col-span-6 md:col-start-7 md:mt-g4">
            <div className="font-mono text-fs-3 text-signal">
              &#8377;{theniChannelPrices.commissionAgentLow}&ndash;{theniChannelPrices.commissionAgentHigh}/kg
            </div>
            <div className="micro-label mt-2">
              commission agents, {theniChannelPrices.commissionAgentSharePct[0]}
              &ndash;{theniChannelPrices.commissionAgentSharePct[1]}% of Theni
              farmers <Cite id={theniChannelPrices.source} />
            </div>
          </Reveal>

          <Reveal delay={0.12} className="col-span-12 sm:col-span-6 md:col-start-3 md:mt-g5">
            <div className="font-mono text-fs-3 text-signal">
              &#8377;{theniChannelPrices.organizedLow}&ndash;{theniChannelPrices.organizedHigh}/kg
            </div>
            <div className="micro-label mt-2">
              organized trade, {theniChannelPrices.organizedSharePct[0]}
              &ndash;{theniChannelPrices.organizedSharePct[1]}% of Theni
              farmers <Cite id={theniChannelPrices.source} />
            </div>
          </Reveal>

          <Reveal delay={0.18} className="col-span-6 sm:col-span-3 md:col-start-9 md:mt-g6">
            <div className="font-mono text-fs-3 text-signal">
              &#8377;{ripeningCharge.perKg}/kg
            </div>
            <div className="micro-label mt-2">
              ripening usage charge <Cite id={ripeningCharge.source} />
            </div>
          </Reveal>

          <Reveal delay={0.24} className="col-span-6 sm:col-span-3 md:col-start-1 md:mt-g7">
            <div className="font-mono text-fs-3 text-signal">
              &#8377;{bananaDomesticTransport.perKgLow}&ndash;{bananaDomesticTransport.perKgHigh}/kg
            </div>
            <div className="micro-label mt-2">
              domestic transport <Cite id={bananaDomesticTransport.source} />
            </div>
          </Reveal>

          <Reveal delay={0.3} className="col-span-6 sm:col-span-3 md:col-start-5 md:mt-g5">
            <div className="font-mono text-fs-3 text-danger">
              {bananaValueChainLossTN.totalPct}%
            </div>
            <div className="micro-label mt-2">
              TN value-chain loss <Cite id={bananaValueChainLossTN.source} />
            </div>
          </Reveal>

          <Reveal delay={0.36} className="col-span-6 sm:col-span-3 md:col-start-10 md:mt-g4">
            <div className="font-mono text-fs-3 text-text">
              {bananaElasticity.value}%
            </div>
            <div className="micro-label mt-2">
              ARDL price-smoothing elasticity
              <Cite id={bananaElasticity.source} />
            </div>
          </Reveal>
        </div>

        {/* ILLUSTRATIVE corridor build-up — visually and semantically separated
            from the RBI-verified anchor above. Tag 🟡, conflict stated plainly. */}
        <Reveal delay={0.1} className="mt-g7">
          <div className="border border-dashed border-danger/40 p-g4 sm:p-g5">
            <div className="micro-label mb-1 flex flex-wrap items-center gap-2 text-danger">
              <span className="border border-danger/50 px-1.5 py-0.5 text-[9px]">
                ILLUSTRATIVE
              </span>
              An illustrative corridor build-up (sources being reconciled)
              <Cite id={bananaCorridorIllustrative.source} />
            </div>
            <p className="mt-2 max-w-[64ch] text-sm text-muted">
              Distinct from the RBI decomposition above: an illustrative
              build-up of the Jalgaon &rarr; Delhi corridor compiled from
              secondary sources, presented separately because the two
              estimates conflict.
            </p>

            <div className="mt-g4 flex flex-wrap items-stretch gap-0">
              {CORRIDOR_STEPS.map((step, i) => (
                <div key={step.label} className="flex items-center">
                  {i > 0 && (
                    <div className="mx-3 font-mono text-muted">&rarr;</div>
                  )}
                  <div className="flex flex-col items-center">
                    <div className="font-mono text-fs-2 text-text">
                      &#8377;{step.value}
                    </div>
                    <div className="micro-label mt-1 text-[10px]">
                      {step.label}
                    </div>
                    {step.note && (
                      <div className="mt-0.5 text-[11px] text-muted">
                        {step.note}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-g4 max-w-[64ch] border-l-2 border-danger/50 pl-3 text-xs text-danger/90">
              &#9888; {bananaCorridorIllustrative.impliedFarmerSharePct}%
              implied farmer share (&#8377;{bananaCorridorIllustrative.farmgate}
              /&#8377;{bananaCorridorIllustrative.retail}) conflicts with the
              verified {bananaFarmerShare.value}% above.{" "}
              {bananaCorridorIllustrative.conflictNote}
            </p>
          </div>
        </Reveal>

        {/* The value-prop number — what the platform delivers, citable version
            of the (unciteable) "22 -> 55" claim. */}
        <Reveal delay={0.16} className="mt-g6">
          <div className="grid grid-cols-12 items-end gap-g3 border-t border-hairline pt-g5">
            <div className="col-span-12 md:col-span-5">
              <div className="micro-label">What the platform delivers</div>
              <p className="mt-2 max-w-[42ch] text-sm text-muted">
                Farmer-owned aggregation that bypasses retail-level
                commission agents &mdash; a modern wholesale agency with
                farmer co-ownership, South India case study
                <Cite id={bananaChainUplift.source} />.
              </p>
            </div>
            <div className="col-span-12 flex items-end gap-g4 md:col-span-7 md:justify-end">
              <div className="flex flex-col items-center">
                <div className="font-mono text-fs-3 text-muted">
                  {bananaChainUplift.traditionalPct}%
                </div>
                <div className="micro-label mt-1 text-[10px]">
                  BVC1 &middot; traditional
                </div>
              </div>
              <div className="font-mono text-fs-3 text-muted">&rarr;</div>
              <div className="flex flex-col items-center">
                <div className="font-mono text-fs-4 text-signal">
                  {bananaChainUplift.modernPct}%
                </div>
                <div className="micro-label mt-1 text-[10px]">
                  BVC2 &middot; farmer co-owned
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Supporting reference rows — smaller weight, not competing with the
            hero numbers above. All 🟡 pending primary-page traceback. */}
        <Reveal delay={0.2} className="mt-g6">
          <div className="micro-label mb-g3">Supporting reference data</div>
          <div className="grid grid-cols-1 gap-g3 border-t border-hairline pt-g4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="font-mono text-sm text-text">
                TN {bananaGradePricesByState.gjTn[0]}/
                {bananaGradePricesByState.gjTn[1]}/
                {bananaGradePricesByState.gjTn[2]}
                <Cite id={bananaGradePricesByState.source} />
              </div>
              <div className="micro-label mt-1 text-[10px]">
                grade A/B/C, &#8377;/kg ({bananaGradePricesByState.year})
              </div>
            </div>
            <div>
              <div className="font-mono text-sm text-text">
                &#8377;{bananaNendranFarmgate.perKgLow}&ndash;
                {bananaNendranFarmgate.perKgHigh}/kg
                <Cite id={bananaNendranFarmgate.source} />
              </div>
              <div className="micro-label mt-1 text-[10px]">
                Nendran farmgate, chips-grade
              </div>
            </div>
            <div>
              <div className="font-mono text-sm text-text">
                USD {bananaCertificationPremium.conventionalUsd.toFixed(2)}
                {" -> "}
                {bananaCertificationPremium.fairtradeOrganicUsd.toFixed(2)}
                <Cite id={bananaCertificationPremium.source} />
              </div>
              <div className="micro-label mt-1 text-[10px]">
                conventional vs Fairtrade-Organic FOB/kg
              </div>
            </div>
            <div>
              <div className="font-mono text-sm text-text">
                +{bananaPseudostem.profitabilityUpliftPctLow}&ndash;
                {bananaPseudostem.profitabilityUpliftPctHigh}%
                <Cite id={bananaPseudostem.source} />
              </div>
              <div className="micro-label mt-1 text-[10px]">
                farm profitability, pseudostem monetization
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
