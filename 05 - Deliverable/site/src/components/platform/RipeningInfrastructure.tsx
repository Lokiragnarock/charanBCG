import Reveal from "@/components/Reveal";
import Cite from "@/components/Cite";
import { ledger } from "@/lib/ledger";

const { ripeningOwnershipStages, ripeningChamberOpexGap, ripeningChamberCapex } = ledger;

export default function RipeningInfrastructure() {
  const [access, control, lease, own] = ripeningOwnershipStages.stages;

  return (
    <Reveal className="mt-24">
      <div className="micro-label">Ripening ownership staging</div>
      <h2 className="font-display mt-3 max-w-3xl text-3xl tracking-tight sm:text-4xl">
        Control ripening immediately. Own capacity after utilisation is
        proven.
      </h2>
      <p className="mt-4 max-w-2xl text-muted">
        The proposed sequencing of ripening-asset ownership &mdash;
        a design construct, not an established model. Two of the three
        gates below cannot honestly be called passable with the information
        that exists today.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-0 overflow-hidden border border-hairline sm:grid-cols-4">
        {[access, control, lease, own].map((s, i) => (
          <div
            key={s.stage}
            className={`p-5 ${i > 0 ? "border-t border-hairline sm:border-l sm:border-t-0" : ""} ${
              i === 3 ? "opacity-70" : ""
            }`}
          >
            <div className="micro-label text-[10px] text-muted">
              Stage {i + 1}
            </div>
            <div className={`font-display mt-1 text-xl ${i <= 1 ? "text-signal" : "text-text"}`}>
              {s.stage}
            </div>
            <p className="mt-2 text-xs text-muted">{s.description}</p>
          </div>
        ))}
      </div>

      {/* stage gates — explicitly not-yet-passable */}
      <div className="mt-8 grid grid-cols-12 gap-g3">
        {ripeningOwnershipStages.stageGates.map((g, i) => (
          <div key={g.gate} className="col-span-12 md:col-span-4">
            <div className="panel h-full p-4">
              <div className="micro-label text-[10px]">{g.gate}</div>
              <p className="mt-2 text-xs text-muted">{g.condition}</p>
              {i > 0 && (
                <div className="mt-3 border-t border-danger/30 pt-3 text-[11px] text-danger/90">
                  Not yet passable &mdash; the number this gate needs doesn&apos;t
                  exist yet.
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 max-w-[70ch] border-l-2 border-danger/50 pl-4">
        <p className="text-sm text-muted">
          The Control &rarr; Lease gate needs a known electricity cost per kg
          processed. No Rs/kWh or Rs/kg opex figure exists anywhere &mdash;{" "}
          {ripeningChamberOpexGap.knownCostProxy}
          <Cite id={ripeningChamberOpexGap.source} />, and electricity is
          flagged as the binding constraint in the primary source table. The
          Lease &rarr; Own gate needs demonstrated lease-vs-own economics
          across multiple seasons &mdash; not yet modeled, no reference case
          exists. Capex for the Own stage is costed (&#8377;
          {ripeningChamberCapex.perMtLakh} lakh/MT
          <Cite id={ripeningChamberCapex.source} />,{" "}
          {ripeningChamberCapex.subsidyPctGeneral}% subsidised); the opex side
          that would signal when to move there is not.
        </p>
      </div>
    </Reveal>
  );
}
