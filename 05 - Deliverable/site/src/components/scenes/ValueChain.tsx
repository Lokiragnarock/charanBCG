"use client";

import { useEffect, useRef, useState } from "react";
import Cite from "@/components/Cite";
import Reveal from "@/components/Reveal";
import { ledger } from "@/lib/ledger";

const {
  bvcPrecedent,
  corridorLengthComparison,
  contractorAdvanceTerms,
  commissionRateByRegion,
  gradeSpreadCapture,
  retailResidualDerived,
  bananaCultivationCost,
  theniChannelPrices,
  ripeningCharge,
  bananaDomesticTransport,
  bananaValueChainLossTN,
} = ledger;

const farmgateMid =
  (theniChannelPrices.commissionAgentLow + theniChannelPrices.commissionAgentHigh) / 2;
const farmerMarginPerKg = Math.round(farmgateMid - bananaCultivationCost.perKg);

type ToggleState = 1 | 2 | 3;

const TOGGLES: { value: ToggleState; label: string }[] = [
  { value: 1, label: "Players" },
  { value: 2, label: "Value-add" },
  { value: 3, label: "Reinvented" },
];

/** Small fade-through on toggle change, reusing the .wane-in CSS utility
    (opacity + translateY + blur, collapses to opacity-only under
    prefers-reduced-motion via the existing global media query). Skips the
    animation on first mount so state-2's SSR default doesn't flash. */
function useToggleFade(dep: ToggleState) {
  const [dataIn, setDataIn] = useState(true);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setDataIn(false);
    const id = requestAnimationFrame(() => setDataIn(true));
    return () => cancelAnimationFrame(id);
  }, [dep]);

  return dataIn;
}

function NodeCard({
  title,
  accent,
  children,
}: {
  title: string;
  accent?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`panel flex h-full min-h-[168px] flex-col gap-2 p-4 ${
        accent ? "border-signal/40" : ""
      }`}
    >
      <div className={`micro-label ${accent ? "text-signal" : ""}`}>{title}</div>
      <div className="flex flex-1 flex-col justify-center gap-1.5">{children}</div>
    </div>
  );
}

function ShadowCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border border-hairline/60 p-3 opacity-75">
      <div className="micro-label text-[9px]">{title}</div>
      <div className="mt-1.5 flex flex-col gap-1">{children}</div>
    </div>
  );
}

export default function ValueChain() {
  const [state, setState] = useState<ToggleState>(2);
  const dataIn = useToggleFade(state);

  return (
    <section
      id="value-chain"
      className="relative flex min-h-screen w-full flex-col justify-center px-6 py-24"
    >
      <div className="mx-auto w-full max-w-[1300px]">
        <Reveal>
          <div className="micro-label">Value-chain replacement</div>
          <h2 className="font-display mt-3 text-4xl tracking-tight sm:text-5xl">
            The Theni corridor, three ways
          </h2>
          <p className="mt-4 max-w-2xl text-muted">
            This models the <span className="stat">local Theni corridor</span>{" "}
            (&asymp; {corridorLengthComparison.localKm} km,{" "}
            {corridorLengthComparison.localLabel}) &mdash; not the long-haul
            Jalgaon&rarr;Delhi corridor used earlier for the RBI-verified
            30.8% national figure. Baseline farmer share here is{" "}
            <span className="stat font-mono">{bvcPrecedent.bvc1Pct}%</span>
            <Cite id={bvcPrecedent.source} /> (Pauline &amp; Ajjan, TNAU 2014
            &mdash; BVC1, the traditional chain).
          </p>
        </Reveal>

        {/* Segmented control — keyboard accessible, state 2 is the SSR / no-JS default */}
        <Reveal delay={0.06} className="mt-8">
          <div
            role="tablist"
            aria-label="Value-chain state"
            className="inline-flex gap-1 border border-hairline p-1"
          >
            {TOGGLES.map((t) => (
              <button
                key={t.value}
                type="button"
                role="tab"
                aria-selected={state === t.value}
                tabIndex={state === t.value ? 0 : -1}
                onClick={() => setState(t.value)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                    e.preventDefault();
                    const idx = TOGGLES.findIndex((x) => x.value === state);
                    const dir = e.key === "ArrowRight" ? 1 : -1;
                    const next =
                      TOGGLES[(idx + dir + TOGGLES.length) % TOGGLES.length];
                    setState(next.value);
                  }
                }}
                className={`micro-label px-4 py-2 text-[11px] transition-colors duration-150 ${
                  state === t.value
                    ? "bg-signal/15 text-signal"
                    : "text-muted hover:text-text"
                }`}
              >
                {t.value}. {t.label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* The chain: five main nodes */}
        <div
          className="wane-in mt-10"
          data-in={dataIn}
          aria-live="polite"
        >
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {/* Farmer */}
            <NodeCard title="Farmer" accent={state === 3}>
              {state === 1 && <p className="text-sm text-text">Grows the crop.</p>}
              {state === 2 && (
                <>
                  <div className="font-mono text-lg text-text">
                    &#8377;{bananaCultivationCost.perKg}/kg
                    <Cite id={bananaCultivationCost.source} />
                  </div>
                  <div className="text-[11px] text-muted">cultivation cost</div>
                  <div className="mt-1 font-mono text-lg text-signal">
                    &#8377;{theniChannelPrices.commissionAgentLow}&ndash;
                    {theniChannelPrices.commissionAgentHigh}/kg
                    <Cite id={theniChannelPrices.source} />
                  </div>
                  <div className="text-[11px] text-muted">
                    farmgate &rarr; margin &asymp; &#8377;{farmerMarginPerKg}
                  </div>
                </>
              )}
              {state === 3 && (
                <>
                  <p className="text-sm text-text">
                    Farm-gate grading + digital lot ID
                  </p>
                  <p className="text-[11px] text-muted">
                    captures the A/B/C spread instead of losing it to the
                    contractor; planting synced to the retailer order book
                  </p>
                </>
              )}
            </NodeCard>

            {/* Contractor / PHC */}
            <NodeCard title={state === 3 ? "Platform (was Contractor/PHC)" : "Contractor / PHC"} accent={state === 3}>
              {state === 1 && (
                <p className="text-sm text-text">Aggregates, grades, finances.</p>
              )}
              {state === 2 && (
                <>
                  <p className="text-sm text-text">Interest-free advance</p>
                  <p className="text-[11px] text-muted">
                    {contractorAdvanceTerms.adjustedAt}, delays up to{" "}
                    {contractorAdvanceTerms.delayWeeksMax} weeks
                    <Cite id={contractorAdvanceTerms.source} /> &mdash;{" "}
                    {contractorAdvanceTerms.costNote}
                  </p>
                  <p className="mt-1 text-[11px] text-muted">
                    Grades post-sale (A/B/C &#8377;{gradeSpreadCapture.gradeA}/
                    {gradeSpreadCapture.gradeB}/{gradeSpreadCapture.gradeC}
                    <Cite id={gradeSpreadCapture.source} />) &mdash; farmer never
                    captures the spread
                  </p>
                </>
              )}
              {state === 3 && (
                <>
                  <p className="text-sm text-text">
                    Demand scheduling from the retailer order book
                  </p>
                  <p className="text-[11px] text-muted">
                    replaces contractor forecast; platform fee replaces the{" "}
                    {commissionRateByRegion.tnPct}% commission layer
                    <Cite id={commissionRateByRegion.source} />
                  </p>
                </>
              )}
            </NodeCard>

            {/* Commission agent */}
            <NodeCard title={state === 3 ? "Digital auction (was Commission agent)" : "Commission agent"} accent={state === 3}>
              {state === 1 && (
                <p className="text-sm text-text">Charges commission, resells.</p>
              )}
              {state === 2 && (
                <>
                  <div className="font-mono text-lg text-danger">
                    {commissionRateByRegion.tnPct}%
                    <Cite id={commissionRateByRegion.source} />
                  </div>
                  <div className="text-[11px] text-muted">
                    to traders (TN-specific; north clusters{" "}
                    {commissionRateByRegion.northPctLow}&ndash;
                    {commissionRateByRegion.northPctHigh}%)
                  </div>
                </>
              )}
              {state === 3 && (
                <>
                  <p className="text-sm text-text">
                    Rewards Grade A, not averaging
                  </p>
                  <p className="text-[11px] text-muted">
                    commission layer removed; real-time inventory dashboards
                  </p>
                </>
              )}
            </NodeCard>

            {/* Wholesaler */}
            <NodeCard title="Wholesaler" accent={state === 3}>
              {state === 1 && (
                <p className="text-sm text-text">Ripens, ships to retail.</p>
              )}
              {state === 2 && (
                <>
                  <div className="font-mono text-lg text-text">
                    &#8377;{ripeningCharge.perKg}/kg
                    <Cite id={ripeningCharge.source} />
                  </div>
                  <div className="text-[11px] text-muted">ripening</div>
                  <div className="mt-1 font-mono text-lg text-text">
                    &#8377;{bananaDomesticTransport.perKgLow}&ndash;
                    {bananaDomesticTransport.perKgHigh}/kg
                    <Cite id={bananaDomesticTransport.source} />
                  </div>
                  <div className="text-[11px] text-muted">local transport</div>
                </>
              )}
              {state === 3 && (
                <>
                  <p className="text-sm text-text">
                    Ripening allocated by order, not tolled
                  </p>
                  <p className="text-[11px] text-muted">
                    hub-and-spoke logistics with loaded backhauls
                  </p>
                </>
              )}
            </NodeCard>

            {/* Retailer */}
            <NodeCard title="Retailer" accent={state === 3}>
              {state === 1 && (
                <p className="text-sm text-text">Passive buyer of whatever arrives.</p>
              )}
              {state === 2 && (
                <>
                  <div className="font-mono text-lg text-danger">
                    &#8377;{retailResidualDerived.retailImpliedLow}&ndash;
                    {retailResidualDerived.retailImpliedHigh}/kg
                    <Cite id={retailResidualDerived.source} />
                    <span className="ml-1 text-[9px] uppercase">derived</span>
                  </div>
                  <div className="text-[11px] text-muted">
                    local retail (implied by the {retailResidualDerived.bvc1SharePct}
                    % BVC1 share)
                  </div>
                  <div className="mt-1 text-[11px] text-danger/90">
                    {bananaValueChainLossTN.totalPct}% chain loss borne downstream
                    <Cite id={bananaValueChainLossTN.source} />
                  </div>
                </>
              )}
              {state === 3 && (
                <>
                  <p className="text-sm text-text">
                    Demand schedule originates here
                  </p>
                  <p className="text-[11px] text-muted">
                    volume, grade, delivery cadence; day-0 digital payment
                  </p>
                </>
              )}
            </NodeCard>
          </div>

          {/* arrows between the five nodes, desktop only */}
          <div
            aria-hidden
            className="pointer-events-none relative mx-auto hidden max-w-[1300px] lg:block"
            style={{ marginTop: "-96px", height: 0 }}
          >
            <div className="grid grid-cols-5 text-center font-mono text-muted/50">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i}>{i > 0 ? "→" : ""}</div>
              ))}
            </div>
          </div>

          {/* Shadow players */}
          <div className="mt-8 border-t border-hairline pt-6">
            <div className="micro-label mb-3 text-[10px]">
              Shadow players (beneath the chain)
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <ShadowCard title="Financier">
                {state === 1 && <p className="text-xs text-muted">Backs the advance.</p>}
                {state === 2 && (
                  <p className="text-xs text-muted">
                    {contractorAdvanceTerms.type}
                    <Cite id={contractorAdvanceTerms.source} /> &mdash;{" "}
                    {contractorAdvanceTerms.pricingNote}
                  </p>
                )}
                {state === 3 && (
                  <p className="text-xs text-signal">
                    Day-0 digital payment replaces the interest-free-advance
                    lock.
                  </p>
                )}
              </ShadowCard>
              <ShadowCard title="Transporter">
                {state === 1 && <p className="text-xs text-muted">Moves the fruit.</p>}
                {state === 2 && (
                  <p className="text-xs text-muted">
                    &#8377;{bananaDomesticTransport.perKgLow}&ndash;
                    {bananaDomesticTransport.perKgHigh}/kg
                    <Cite id={bananaDomesticTransport.source} />, field&rarr;godown
                    pickups + inter-city
                  </p>
                )}
                {state === 3 && (
                  <p className="text-xs text-signal">
                    Hub-and-spoke routing; backhauls loaded with complementary
                    produce.
                  </p>
                )}
              </ShadowCard>
              <ShadowCard title="Ripening-chamber operator">
                {state === 1 && <p className="text-xs text-muted">Tolls chamber time.</p>}
                {state === 2 && (
                  <p className="text-xs text-muted">
                    &#8377;{ripeningCharge.perKg}/kg usage charge
                    <Cite id={ripeningCharge.source} />, MIDH-assisted units
                  </p>
                )}
                {state === 3 && (
                  <p className="text-xs text-signal">
                    Allocation by grade &times; buyer delivery timeline, not
                    tolled by volume.
                  </p>
                )}
              </ShadowCard>
              <ShadowCard title="Labour">
                {state === 1 && <p className="text-xs text-muted">Sorts, loads, ripens.</p>}
                {state === 2 && (
                  <p className="text-xs text-muted">
                    Embedded in wholesaler and ripening-chamber costs above
                    &mdash; no separately reported rate.
                  </p>
                )}
                {state === 3 && (
                  <p className="text-xs text-signal">
                    Same physical labour, reallocated by digital dispatch.
                  </p>
                )}
              </ShadowCard>
            </div>
          </div>

          {/* Endpoint anchor, state 3 only */}
          {state === 3 && (
            <div className="mt-10 border-t border-hairline pt-8">
              <div className="grid grid-cols-12 items-end gap-g3">
                <div className="col-span-12 md:col-span-5">
                  <div className="micro-label">Endpoint anchor</div>
                  <p className="mt-2 max-w-[42ch] text-sm text-muted">
                    Not a projection &mdash; a precedent. Farmer-co-owned
                    wholesale agents already ran this in{" "}
                    <span className="stat">
                      {bvcPrecedent.village}, {bvcPrecedent.district} district
                    </span>
                    <Cite id={bvcPrecedent.source} />: aggregate, control
                    ripening, sell direct to supermarkets, retailers, and city
                    wholesalers.
                  </p>
                </div>
                <div className="col-span-12 flex items-end gap-g4 md:col-span-7 md:justify-end">
                  <div className="flex flex-col items-center">
                    <div className="font-mono text-fs-3 text-muted">
                      {bvcPrecedent.bvc1Pct}%
                    </div>
                    <div className="micro-label mt-1 text-[10px]">
                      BVC1 &middot; traditional
                    </div>
                  </div>
                  <div className="font-mono text-fs-3 text-muted">&rarr;</div>
                  <div className="flex flex-col items-center">
                    <div className="font-mono text-fs-4 text-signal">
                      {bvcPrecedent.bvc2Pct}%
                    </div>
                    <div className="micro-label mt-1 text-[10px]">
                      BVC2 &middot; farmer co-owned (+{bvcPrecedent.deltaPts} pts)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
