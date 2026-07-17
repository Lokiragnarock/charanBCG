import Link from "next/link";
import Reveal from "@/components/Reveal";
import Cite from "@/components/Cite";
import { ledger } from "@/lib/ledger";

export const metadata = {
  title: "The Platform — The Banana Case",
};

const {
  commissionRateByRegion,
  gradeSpreadCapture,
  contractorAdvanceTerms,
  ripeningCharge,
  bananaDomesticTransport,
  theniChannelPrices,
} = ledger;

const FUNCTIONS: {
  name: string;
  before: string;
  platform: string;
  money: React.ReactNode;
}[] = [
  {
    name: "Demand scheduling",
    before: "Contractors forecast volume and tonnage off flowering — a guess, fixed months early.",
    platform: "The retailer order book drives volume, grade, and delivery cadence directly.",
    money: (
      <>
        Platform fee replaces the {commissionRateByRegion.tnPct}%
        <Cite id={commissionRateByRegion.source} /> commission layer.
      </>
    ),
  },
  {
    name: "Farm-gate grading + lot ID",
    before: "Grading happens post-sale, in the contractor's hands — the farmer sells at a flat price and never sees the spread.",
    platform: "Farm-gate grading with a digital lot ID captures grade at the source.",
    money: (
      <>
        A/B/C grades resolve to &#8377;{gradeSpreadCapture.gradeA}/
        {gradeSpreadCapture.gradeB}/{gradeSpreadCapture.gradeC} per kg
        <Cite id={gradeSpreadCapture.source} /> — paid to the farmer, not
        absorbed downstream.
      </>
    ),
  },
  {
    name: "Financing / day-0 payment",
    before: `Interest-free cash advance, ${contractorAdvanceTerms.adjustedAt}, delays up to ${contractorAdvanceTerms.delayWeeksMax} weeks.`,
    platform: "Day-0 digital payment on delivery replaces the advance lock.",
    money: (
      <>
        The advance always cost price, not interest
        <Cite id={contractorAdvanceTerms.source} /> — removing the lock
        removes that cost, not a rate.
      </>
    ),
  },
  {
    name: "Ripening allocation",
    before: `Ripening-chamber time tolled by volume, &#8377;${ripeningCharge.perKg}/kg regardless of order.`,
    platform: "Allocation by grade and buyer delivery timeline, not by who arrives first.",
    money: (
      <>
        Same &#8377;{ripeningCharge.perKg}/kg
        <Cite id={ripeningCharge.source} /> chamber cost, spent on the fruit
        that&apos;s actually sold.
      </>
    ),
  },
  {
    name: "Logistics",
    before: "Ad hoc lorry transport, one leg at a time, empty on the return.",
    platform: "Hub-and-spoke routing with backhauls loaded on every return leg.",
    money: (
      <>
        &#8377;{bananaDomesticTransport.perKgLow}&ndash;
        {bananaDomesticTransport.perKgHigh}/kg
        <Cite id={bananaDomesticTransport.source} /> domestic transport cost —
        spread across two loaded legs instead of one.
      </>
    ),
  },
];

export default function PlatformPage() {
  return (
    <main className="relative min-h-screen w-full px-6 pt-[52px] pb-24">
      <div className="mx-auto w-full max-w-[1200px] py-16">
        <Reveal>
          <div className="micro-label">The platform, in depth</div>
          <h1 className="font-display mt-3 text-4xl tracking-tight sm:text-5xl">
            The rerouted chain
          </h1>
          <p className="mt-4 max-w-2xl text-muted">
            Same physical functions, same physical labour &mdash; scheduled,
            graded, financed, and routed by the platform instead of by an
            informal chain of tolls.
          </p>
        </Reveal>

        {/* a) function-by-function reroute */}
        <div className="mt-16 flex flex-col divide-y divide-hairline border-t border-hairline">
          {FUNCTIONS.map((f, i) => (
            <Reveal key={f.name} delay={i * 0.06}>
              <div className="grid grid-cols-1 gap-4 py-8 md:grid-cols-[1fr_1fr_1fr]">
                <div>
                  <div className="micro-label text-signal">{f.name}</div>
                </div>
                <div>
                  <div className="micro-label mb-1 text-[10px] text-danger/80">
                    Before
                  </div>
                  <p className="text-sm text-muted">{f.before}</p>
                </div>
                <div>
                  <div className="micro-label mb-1 text-[10px]">
                    Platform
                  </div>
                  <p className="text-sm text-text">{f.platform}</p>
                  <p className="mt-2 text-xs text-muted">{f.money}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* b) hub-and-spoke + backhaul roadmap */}
        <Reveal delay={0.1} className="mt-20">
          <div className="micro-label">Logistics roadmap</div>
          <h2 className="font-display mt-3 text-3xl tracking-tight">
            Hub-and-spoke, with the truck never idle
          </h2>
          <p className="mt-4 max-w-2xl text-muted">
            Design intent, not history &mdash; anchored to the one cost we
            can cite: {" "}
            &#8377;{bananaDomesticTransport.perKgLow}&ndash;
            {bananaDomesticTransport.perKgHigh}/kg domestic transport
            <Cite id={bananaDomesticTransport.source} />, and{" "}
            {theniChannelPrices.year} port access at Cochin
            <Cite id={theniChannelPrices.source} />.
          </p>

          <div className="panel mt-8 overflow-x-auto p-6">
            <svg
              viewBox="0 0 900 260"
              className="w-full min-w-[640px]"
              role="img"
              aria-label="Hub-and-spoke logistics roadmap: Theni collection spokes feed a ripening hub, which delivers to retail and returns loaded with Karnataka goods"
            >
              {/* spokes */}
              {[0, 1, 2].map((i) => (
                <g key={i}>
                  <rect
                    x={40}
                    y={40 + i * 70}
                    width={110}
                    height={40}
                    rx={2}
                    fill="none"
                    stroke="var(--hairline)"
                  />
                  <text x={95} y={64 + i * 70} textAnchor="middle" className="font-mono" style={{ fontSize: 11, fill: "var(--muted)" }}>
                    Collection spoke {i + 1}
                  </text>
                  <line x1={150} y1={60 + i * 70} x2={260} y2={130} stroke="var(--hairline)" strokeWidth={1} />
                </g>
              ))}

              {/* hub */}
              <rect x={260} y={95} width={160} height={70} rx={2} fill="color-mix(in srgb, var(--signal) 10%, transparent)" stroke="var(--signal)" />
              <text x={340} y={125} textAnchor="middle" className="font-mono" style={{ fontSize: 12, fill: "var(--signal)" }}>
                Ripening hub
              </text>
              <text x={340} y={142} textAnchor="middle" className="font-mono" style={{ fontSize: 10, fill: "var(--muted)" }}>
                Theni
              </text>

              {/* outbound to retail */}
              <line x1={420} y1={120} x2={620} y2={70} stroke="var(--signal)" strokeWidth={1.5} markerEnd="url(#arrow)" />
              <rect x={620} y={40} width={160} height={40} rx={2} fill="none" stroke="var(--hairline)" />
              <text x={700} y={64} textAnchor="middle" className="font-mono" style={{ fontSize: 11, fill: "var(--text)" }}>
                Retail delivery
              </text>

              {/* backhaul loop */}
              <line x1={780} y1={80} x2={780} y2={190} stroke="var(--danger)" strokeWidth={1.5} strokeDasharray="4 3" />
              <line x1={780} y1={190} x2={430} y2={190} stroke="var(--danger)" strokeWidth={1.5} strokeDasharray="4 3" markerEnd="url(#arrow-danger)" />
              <rect x={620} y={175} width={160} height={40} rx={2} fill="none" stroke="var(--danger)" strokeOpacity={0.5} />
              <text x={700} y={199} textAnchor="middle" className="font-mono" style={{ fontSize: 11, fill: "var(--danger)" }}>
                Karnataka backhaul
              </text>
              <text x={520} y={205} textAnchor="middle" className="font-mono" style={{ fontSize: 10, fill: "var(--muted)" }}>
                coffee, loaded return
              </text>

              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M0,0 L10,5 L0,10 z" fill="var(--signal)" />
                </marker>
                <marker id="arrow-danger" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M0,0 L10,5 L0,10 z" fill="var(--danger)" />
                </marker>
              </defs>
            </svg>
          </div>
          <p className="mt-3 max-w-[64ch] text-xs text-muted">
            Collection spokes feed one ripening hub; delivery legs run
            forward loaded, backhaul legs return loaded with Karnataka-cluster
            goods (coffee and others) instead of running empty &mdash;
            maximizing truck uptime on the same corridor.
          </p>
        </Reveal>

        {/* c) traceability */}
        <Reveal delay={0.1} className="mt-20">
          <div className="micro-label">Traceability</div>
          <h2 className="font-display mt-3 text-3xl tracking-tight">
            One scan, the whole lot&apos;s story
          </h2>
          <p className="mt-4 max-w-2xl text-muted">
            Every lot gets a digital ID at farm-gate grading. A retailer
            scanning the QR code at any point downstream sees:
          </p>
          <div className="panel mt-8 grid grid-cols-2 gap-0 overflow-hidden sm:grid-cols-3 md:max-w-[560px]">
            {["Farmer & village", "Harvest date", "Grade (A/B/C)", "Ripening status", "Chain of custody", "Buyer spec match"].map(
              (item) => (
                <div key={item} className="border-b border-r border-hairline p-4 last:border-r-0">
                  <div className="micro-label text-[10px]">{item}</div>
                </div>
              )
            )}
          </div>
          <p className="mt-4 max-w-[60ch] text-sm text-muted">
            Retailers subscribe to a spec (grade, variety, ripening window) —
            the platform only routes lots that match it to that buyer.
          </p>
        </Reveal>

        {/* d) demand scheduling + GAP feedback loop */}
        <Reveal delay={0.1} className="mt-20">
          <div className="micro-label">Demand &rarr; supply feedback</div>
          <h2 className="font-display mt-3 text-3xl tracking-tight">
            Orders set the planting calendar
          </h2>
          <div className="panel mt-8 overflow-x-auto p-6">
            <div className="flex min-w-[720px] items-center justify-between gap-2 font-mono text-xs">
              {[
                "Retail orders",
                "Demand schedule",
                "Synchronized planting",
                "Forecast supply",
              ].map((step, i, arr) => (
                <div key={step} className="flex items-center gap-2">
                  <div className="border border-hairline px-4 py-3 text-center text-text">
                    {step}
                  </div>
                  {i < arr.length - 1 && (
                    <span aria-hidden className="text-signal">
                      &rarr;
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-center">
              <span className="font-mono text-xs text-muted">
                (forecast supply feeds back into next season&apos;s orders)
              </span>
            </div>
            <div className="mt-6 border-t border-hairline pt-6">
              <div className="micro-label mb-2 text-[10px] text-signal">
                Branches off &quot;Synchronized planting&quot;
              </div>
              <p className="max-w-[60ch] text-sm text-muted">
                GAP advisory customized per order spec &mdash; practices and
                pesticide discipline tuned so the harvest matches the
                buyer&apos;s grade requirement, not a generic playbook.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-hairline pt-8">
          <p className="text-sm text-muted">
            Next: every number on this site, traced to its source.
          </p>
          <Link
            href="/appendix"
            className="micro-label border border-hairline px-4 py-2 text-muted transition-colors duration-150 hover:border-signal hover:text-signal"
          >
            The Appendix &rarr;
          </Link>
        </Reveal>
      </div>
    </main>
  );
}
