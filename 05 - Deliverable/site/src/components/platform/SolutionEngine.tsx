import Reveal from "@/components/Reveal";
import Cite from "@/components/Cite";
import { ledger } from "@/lib/ledger";

const { sixFunctionReroute, bananaPseudostem, bananaPseudostemExtended } = ledger;

type Pillar = {
  name: string;
  pain: string;
  intervention: string;
  value: React.ReactNode;
  dependency: string;
  design?: boolean;
};

const PILLARS: Pillar[] = sixFunctionReroute.functions.map((f) => ({
  name: f.function,
  pain: f.before,
  intervention: f.platform,
  value: (
    <>Same physical function, rerouted &mdash; not a new cost line.</>
  ),
  dependency: "Retailer order-book adoption and farm-gate lot-ID compliance.",
  design: true,
}));

PILLARS.push({
  name: "Waste management",
  pain: "Pseudostem and off-grade fruit are field residue today &mdash; no monetization route exists in the Theni chain as currently run.",
  intervention:
    "Reroute pseudostem to fiber and biogas-feedstock buyers instead of leaving it as residue.",
  value: (
    <>
      Raw stem &#8377;{bananaPseudostem.rawStemPerMt}/MT
      <Cite id={bananaPseudostem.source} />, A-grade fiber &#8377;
      {bananaPseudostem.fiberAGradePerKgLow}&ndash;
      {bananaPseudostem.fiberAGradePerKgHigh}/kg, B-grade &#8377;
      {bananaPseudostemExtended.fiberBGradePerKgLow}&ndash;
      {bananaPseudostemExtended.fiberBGradePerKgHigh}/kg
      <Cite id={bananaPseudostemExtended.source} /> &mdash; documented uplift
      of {bananaPseudostem.profitabilityUpliftPctLow}&ndash;
      {bananaPseudostem.profitabilityUpliftPctHigh}% elsewhere in banana value
      chains, not yet a Theni-specific result.
    </>
  ),
  dependency:
    "A confirmed offtake partner for fiber/biogas feedstock &mdash; not yet secured.",
  design: false,
});

export default function SolutionEngine() {
  return (
    <Reveal className="mt-24">
      <div className="micro-label">Seven solution pillars</div>
      <h2 className="font-display mt-3 max-w-3xl text-3xl tracking-tight sm:text-4xl">
        Six functions rerouted, one function added
      </h2>
      <p className="mt-4 max-w-2xl text-muted">
        The first six are the same physical functions the chain already
        performs &mdash; scheduled, graded, financed, and routed differently.
        The seventh, waste management, is new: it did not exist as a captured
        function before.
      </p>

      <div className="mt-10 flex flex-col divide-y divide-hairline border-t border-hairline">
        {PILLARS.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.05}>
            <div className="grid grid-cols-12 gap-g3 py-8">
              <div className="col-span-12 md:col-span-3">
                <div className="micro-label text-signal">{p.name}</div>
                {!p.design && (
                  <div className="mt-2 text-[10px] text-danger/80">
                    New pillar &mdash; no offtake partner confirmed yet
                  </div>
                )}
              </div>
              <div className="col-span-12 md:col-span-4">
                <div className="micro-label mb-1 text-[10px] text-danger/80">
                  Pain point
                </div>
                <p className="text-sm text-muted">{p.pain}</p>
              </div>
              <div className="col-span-12 md:col-span-5">
                <div className="micro-label mb-1 text-[10px]">
                  {p.design ? "Proposed intervention" : "Intervention"}
                </div>
                <p className="text-sm text-text">{p.intervention}</p>
                <p className="mt-2 text-xs text-muted">{p.value}</p>
                <p className="mt-2 text-[11px] text-muted/80">
                  Depends on: {p.dependency}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Reveal>
  );
}
