import Reveal from "@/components/Reveal";
import Cite from "@/components/Cite";
import { ledger } from "@/lib/ledger";

const { bananaPseudostemExtended, bananaPseudostem, bananaValueChainLossTN } = ledger;

const LOSS_STAGES: { label: string; pct: number }[] = [
  { label: "Field", pct: bananaValueChainLossTN.fieldPct },
  { label: "Transport", pct: bananaValueChainLossTN.transportPct },
  { label: "Wholesale", pct: bananaValueChainLossTN.wholesalePct },
  { label: "Storage / ripening", pct: bananaValueChainLossTN.storageRipeningPct },
  { label: "Retail", pct: bananaValueChainLossTN.retailPct },
];

export default function WasteRecovery() {
  return (
    <Reveal className="mt-24">
      <div className="micro-label">Waste recovery</div>
      <h2 className="font-display mt-3 max-w-3xl text-3xl tracking-tight sm:text-4xl">
        Produce that cannot enter the primary retail channel is rerouted
        before it becomes unmanaged waste.
      </h2>

      <p className="mt-4 max-w-2xl text-muted">
        Tamil Nadu&apos;s documented chain loss runs{" "}
        <span className="stat font-mono">{bananaValueChainLossTN.totalPct}%</span>
        <Cite id={bananaValueChainLossTN.source} />, concentrated at retail and
        storage/ripening. The recovery loop below addresses that loss surface;
        it does not claim to close a specific share of it; no source
        computes that linkage.
      </p>

      {/* loss breakdown, sized bars */}
      <div className="mt-8 flex flex-col gap-2">
        {LOSS_STAGES.map((s) => (
          <div key={s.label} className="flex items-center gap-3">
            <div className="w-36 shrink-0 text-xs text-muted">{s.label}</div>
            <div className="h-2 flex-1 bg-hairline/40">
              <div
                className="h-2 bg-danger/70"
                style={{ width: `${(s.pct / bananaValueChainLossTN.totalPct) * 100}%` }}
              />
            </div>
            <div className="w-10 shrink-0 text-right font-mono text-xs text-danger/90">
              {s.pct}%
            </div>
          </div>
        ))}
      </div>

      {/* recovery-flow diagram, hand-built SVG idiom */}
      <div className="panel mt-10 overflow-x-auto p-6">
        <svg
          viewBox="0 0 960 300"
          className="w-full min-w-[720px]"
          role="img"
          aria-label="Waste recovery flow: farm-gate rejection, ripening loss, and retail rejection feed central segregation, which routes material to secondary market, processor, or biological recovery"
        >
          {["Farm-gate rejection", "Ripening loss", "Retail rejection"].map((label, i) => (
            <g key={label}>
              <rect x={30} y={30 + i * 80} width={190} height={44} rx={2} fill="none" stroke="var(--hairline)" />
              <text x={125} y={30 + i * 80 + 27} textAnchor="middle" className="font-mono" style={{ fontSize: 11, fill: "var(--muted)" }}>
                {label}
              </text>
              <line x1={220} y1={30 + i * 80 + 22} x2={350} y2={150} stroke="var(--hairline)" strokeWidth={1} />
            </g>
          ))}

          <rect x={350} y={115} width={190} height={70} rx={2} fill="color-mix(in srgb, var(--signal) 10%, transparent)" stroke="var(--signal)" />
          <text x={445} y={145} textAnchor="middle" className="font-mono" style={{ fontSize: 12, fill: "var(--signal)" }}>
            Central segregation
          </text>
          <text x={445} y={162} textAnchor="middle" className="font-mono" style={{ fontSize: 10, fill: "var(--muted)" }}>
            grade the reject stream itself
          </text>

          {[
            { label: "Secondary market", y: 30, color: "var(--signal)" },
            { label: "Fiber / biogas processor", y: 115, color: "var(--text)" },
            { label: "Organic residue / compost", y: 200, color: "var(--muted)" },
          ].map((d) => (
            <g key={d.label}>
              <line x1={540} y1={150} x2={700} y2={d.y + 22} stroke={d.color} strokeWidth={1.5} strokeDasharray={d.label.includes("processor") ? "0" : "4 3"} />
              <rect x={700} y={d.y} width={230} height={44} rx={2} fill="none" stroke={d.color} strokeOpacity={0.6} />
              <text x={815} y={d.y + 27} textAnchor="middle" className="font-mono" style={{ fontSize: 11, fill: d.color }}>
                {d.label}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* categories, sized by confidence not equal columns */}
      <div className="mt-8 grid grid-cols-12 gap-g3">
        <div className="col-span-12 md:col-span-4">
          <div className="panel h-full p-4">
            <div className="micro-label text-[10px] text-signal">
              Marketable secondary-grade
            </div>
            <p className="mt-2 text-xs text-muted">
              Off-spec fruit still fit for local/institutional sale:
              routed through the same platform, at a lower price tier.
            </p>
          </div>
        </div>
        <div className="col-span-12 md:col-span-5">
          <div className="panel h-full p-4">
            <div className="micro-label text-[10px]">Processing-suitable</div>
            <p className="mt-2 text-xs text-muted">
              Pseudostem fiber: A-grade &#8377;
              {bananaPseudostem.fiberAGradePerKgLow}&ndash;
              {bananaPseudostem.fiberAGradePerKgHigh}/kg
              <Cite id={bananaPseudostem.source} />, B-grade &#8377;
              {bananaPseudostemExtended.fiberBGradePerKgLow}&ndash;
              {bananaPseudostemExtended.fiberBGradePerKgHigh}/kg, and biogas
              feedstock at USD {bananaPseudostemExtended.biogasFeedstockUsdPerTreeLow}
              &ndash;{bananaPseudostemExtended.biogasFeedstockUsdPerTreeHigh}/tree
              <Cite id={bananaPseudostemExtended.source} />; figures
              from other documented banana value chains, not a confirmed
              Theni offtake. This revenue is not yet validated: no processor
              partner is confirmed.
            </p>
          </div>
        </div>
        <div className="col-span-12 md:col-span-3">
          <div className="panel h-full p-4 opacity-80">
            <div className="micro-label text-[10px] text-muted">
              Organic residue / unavoidable disposal
            </div>
            <p className="mt-2 text-xs text-muted">
              Whatever clears no recovery route: composted or
              discarded, the residual after the loops above.
            </p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
