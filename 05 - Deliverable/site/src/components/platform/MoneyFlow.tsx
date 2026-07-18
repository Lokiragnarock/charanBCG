import Reveal from "@/components/Reveal";
import Cite from "@/components/Cite";
import { ledger } from "@/lib/ledger";

const {
  platformFeeWorkingAssumption,
  platformFeeBenchmarks,
  ripeningChamberOpexGap,
  backhaulEconomics,
  fpoCreditSubstitutes,
} = ledger;

export default function MoneyFlow() {
  return (
    <Reveal className="mt-24">
      <div className="micro-label">Money flow</div>
      <h2 className="font-display mt-3 max-w-3xl text-3xl tracking-tight sm:text-4xl">
        Where the rupee goes through the platform
      </h2>
      <p className="mt-4 max-w-2xl text-muted">
        Farmer payment, physical costs, and an FPO coordination fee, with any
        waste-value recovered split against opex and a member-facing surplus
        &mdash; and one honest gap in the ripening cost line.
      </p>

      {/* fee assumption vs benchmark, asymmetric 5:7 */}
      <div className="mt-10 grid grid-cols-12 gap-g4">
        <div className="col-span-12 md:col-span-5">
          <div className="panel h-full border-signal/30 p-6">
            <div className="micro-label text-[10px] text-signal">
              Design parameter, set for the model
            </div>
            <div className="stat mt-3 font-mono text-4xl">
              &#8776;{platformFeeWorkingAssumption.assumedPctOfScheduledVolume}%
            </div>
            <p className="mt-2 text-xs text-muted">
              of scheduled volume &mdash; the platform/FPO coordination fee
              set for this model
              <Cite id={platformFeeWorkingAssumption.source} />, to be
              pressure-tested against pilot economics once volume moves
              through the platform.
            </p>
          </div>
        </div>
        <div className="col-span-12 md:col-span-7 md:col-start-6">
          <div className="panel h-full p-6">
            <div className="micro-label text-[10px]">
              Loosest available comparable
            </div>
            <div className="mt-3 font-mono text-2xl text-text">
              {platformFeeBenchmarks.ninjacartGrossMarginPctLow}&ndash;
              {platformFeeBenchmarks.ninjacartGrossMarginPctHigh}%
              <Cite id={platformFeeBenchmarks.source} />
            </div>
            <p className="mt-2 text-xs text-muted">
              Ninjacart&apos;s blended trading-book gross margin &mdash; the
              closest available reference point, not a fee schedule the
              platform fee is set against.
              A circulating &quot;ONDC charges 2&ndash;5%&quot; claim was
              checked and rejected: its only source is an uncited blog with no
              methodology.
            </p>
          </div>
        </div>
      </div>

      {/* three-way waste economics split */}
      <div className="mt-6 grid grid-cols-12 gap-g3">
        <div className="col-span-12 md:col-span-4">
          <div className="panel h-full p-4">
            <div className="micro-label text-[10px] text-signal">
              Avoided loss
            </div>
            <p className="mt-2 text-xs text-muted">
              Fruit that would have been unmanaged waste, now sold at a lower
              tier through the same platform &mdash; a real but uncosted
              saving.
            </p>
          </div>
        </div>
        <div className="col-span-12 md:col-span-4">
          <div className="panel h-full p-4 opacity-70">
            <div className="micro-label text-[10px] text-muted">
              Confirmed recovery revenue
            </div>
            <p className="mt-2 text-xs text-muted">
              None exists yet. No processor or biogas offtake partner is
              confirmed, so there is no confirmed revenue line to show here.
            </p>
          </div>
        </div>
        <div className="col-span-12 md:col-span-4">
          <div className="panel h-full p-4">
            <div className="micro-label text-[10px]">
              Potential future revenue
            </div>
            <p className="mt-2 text-xs text-muted">
              Fiber and biogas-feedstock prices documented in other banana
              value chains &mdash; a potential line, contingent on securing an
              offtake partner, not a projected number.
            </p>
          </div>
        </div>
      </div>

      {/* opex gap, ripening */}
      <div className="mt-8 max-w-[70ch] border-l-2 border-danger/50 pl-4">
        <div className="micro-label mb-1 text-[10px] text-danger/90">
          Ripening opex gap
        </div>
        <p className="text-sm text-muted">
          Chamber capex and subsidy are solidly sourced (NHB Cost Norms). The
          opex side is a genuine unsourced gap: {ripeningChamberOpexGap.knownCostProxy}
          <Cite id={ripeningChamberOpexGap.source} />, and electricity is
          named as the binding constraint. No P&amp;L for FPO-operated
          ripening on this page should be read as fully costed.
        </p>
      </div>

      {/* backhaul + credit substitutes, generic benchmarks */}
      <div className="mt-8 grid grid-cols-12 gap-g4">
        <div className="col-span-12 md:col-span-6">
          <div className="micro-label mb-2 text-[10px]">
            Logistics: backhaul benchmark
          </div>
          <p className="text-sm text-muted">
            {backhaulEconomics.emptyReturnLegPctLow}&ndash;
            {backhaulEconomics.emptyReturnLegPctHigh}% of return legs run
            empty nationally; realized cost cuts of{" "}
            {backhaulEconomics.realizedCostCutPctLow}&ndash;
            {backhaulEconomics.realizedCostCutPctHigh}%
            <Cite id={backhaulEconomics.source} /> are reported where backhaul
            loading works &mdash; generic India road-freight benchmarks, not
            banana- or Theni-specific. No sector-specific precedent (dairy,
            apple) exists despite searching.
          </p>
        </div>
        <div className="col-span-12 md:col-span-6">
          <div className="micro-label mb-2 text-[10px]">
            Financing: credit substitutes
          </div>
          <p className="text-sm text-muted">
            Central Sector FPO scheme provisions: matching equity grant up to
            &#8377;{fpoCreditSubstitutes.fpcMatchingEquityGrantCapLakh} lakh,
            credit guarantee cover{" "}
            {fpoCreditSubstitutes.creditGuaranteeCoverPctUpTo1Cr}% up to
            &#8377;1 Cr
            <Cite id={fpoCreditSubstitutes.source} />. Chinnamanur FPC (the
            BVC2 precedent village) already extends credit to{" "}
            {fpoCreditSubstitutes.chinnamanurFpcCreditExtensionPct}% of active
            members &mdash; a real precedent, describing an existing FPO, not
            a proposed mechanism.
          </p>
        </div>
      </div>
    </Reveal>
  );
}
