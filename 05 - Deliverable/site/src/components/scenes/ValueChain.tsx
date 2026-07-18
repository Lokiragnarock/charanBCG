import Link from "next/link";
import Cite from "@/components/Cite";
import Reveal from "@/components/Reveal";
import { ledger } from "@/lib/ledger";

const {
  bvcPrecedent,
  corridorLengthComparison,
  commissionRateByRegion,
  gradeSpreadCapture,
  bananaCultivationCost,
  theniChannelPrices,
  ripeningCharge,
  bananaDomesticTransport,
} = ledger;

const farmgateMid =
  (theniChannelPrices.commissionAgentLow + theniChannelPrices.commissionAgentHigh) / 2;
const farmerMarginPerKg = Math.round(farmgateMid - bananaCultivationCost.perKg);

/** One stop in the toll strip: micro-label, one mono headline number, short caption. */
function TollStop({
  label,
  value,
  citeId,
  caption,
  danger,
}: {
  label: string;
  value: React.ReactNode;
  citeId: string;
  caption: string;
  danger?: boolean;
}) {
  return (
    <div className="flex min-w-[130px] flex-1 flex-col gap-1.5 border-t border-hairline pt-3">
      <div className="micro-label text-[10px]">{label}</div>
      <div className={`font-mono text-xl ${danger ? "text-danger" : "text-text"}`}>
        {value}
        <Cite id={citeId} />
      </div>
      <div className="text-[11px] text-muted">{caption}</div>
    </div>
  );
}

/** One value-delivered stat block, uneven sizing is fine per the design doctrine. */
function ValueStat({
  value,
  citeId,
  caption,
}: {
  value: React.ReactNode;
  citeId: string;
  caption: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="font-mono text-2xl text-signal sm:text-3xl">
        {value}
        <Cite id={citeId} />
      </div>
      <div className="text-xs text-muted">{caption}</div>
    </div>
  );
}

export default function ValueChain() {
  return (
    <section
      id="value-chain"
      className="relative flex min-h-screen w-full flex-col justify-center px-6 py-24"
    >
      <div className="mx-auto w-full max-w-[1300px]">
        {/* Beat 1 -- the problem */}
        <Reveal>
          <div className="micro-label">The corridor, today</div>
          <h2 className="font-display mt-3 text-4xl tracking-tight sm:text-5xl">
            Five tolls between farm and shelf
          </h2>
          <p className="mt-4 max-w-2xl text-muted">
            Theni&apos;s short-haul chain runs{" "}
            <span className="stat">&asymp; {corridorLengthComparison.localKm} km</span>
            <Cite id={corridorLengthComparison.localSource} />, but every
            function on it is a toll charged by someone else.
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-10">
          <div className="flex flex-wrap gap-4 sm:gap-6">
            <TollStop
              label="Farmer"
              value={
                <>
                  &#8377;{theniChannelPrices.commissionAgentLow}&ndash;
                  {theniChannelPrices.commissionAgentHigh}/kg
                </>
              }
              citeId={theniChannelPrices.source}
              caption={`cost ₹${bananaCultivationCost.perKg}/kg, margin ~₹${farmerMarginPerKg}`}
            />
            <TollStop
              label="Contractor / PHC"
              value={
                <>
                  &#8377;{gradeSpreadCapture.gradeA}/{gradeSpreadCapture.gradeB}/
                  {gradeSpreadCapture.gradeC}
                </>
              }
              citeId={gradeSpreadCapture.source}
              caption="graded post-sale; spread lost"
              danger
            />
            <TollStop
              label="Commission agent"
              value={<>{commissionRateByRegion.tnPct}%</>}
              citeId={commissionRateByRegion.source}
              caption="commission on every kilo"
              danger
            />
            <TollStop
              label="Wholesaler"
              value={
                <>
                  &#8377;{ripeningCharge.perKg} + &#8377;{bananaDomesticTransport.perKgLow}
                  &ndash;{bananaDomesticTransport.perKgHigh}/kg
                </>
              }
              citeId={ripeningCharge.source}
              caption="tolled, one-way trucks"
              danger
            />
            <TollStop
              label="Retail"
              value={<>{bvcPrecedent.bvc1Pct}%</>}
              citeId={bvcPrecedent.source}
              caption="all the farmer kept"
              danger
            />
          </div>
        </Reveal>

        {/* Beat 2 -- how the FPO works */}
        <Reveal delay={0.06} className="mt-20 border-t border-hairline pt-16">
          <div className="grid grid-cols-12 gap-g4">
            <div className="col-span-12 md:col-span-4">
              <div className="micro-label">The solution</div>
              <h2 className="font-display mt-3 text-3xl tracking-tight sm:text-4xl">
                One member-owned FPO runs the coordination
              </h2>
              <p className="mt-4 max-w-[36ch] text-sm text-muted">
                Farmers hold the shares. The physical chain stays; the
                coordination changes hands.
              </p>
            </div>
            <div className="col-span-12 flex flex-col divide-y divide-hairline md:col-span-8">
              <div className="py-4 first:pt-0">
                <p className="text-sm font-medium text-text">Orders set planting</p>
                <p className="mt-1 text-sm text-muted">
                  Retailer order book fixes volume, grade, and cadence before
                  harvest.
                </p>
              </div>
              <div className="py-4">
                <p className="text-sm font-medium text-text">Grade at the gate</p>
                <p className="mt-1 text-sm text-muted">
                  Digital lot ID (QR); the &#8377;{gradeSpreadCapture.gradeA}/
                  {gradeSpreadCapture.gradeB}/{gradeSpreadCapture.gradeC}
                  <Cite id={gradeSpreadCapture.source} /> spread goes to the
                  farmer.
                </p>
              </div>
              <div className="py-4 last:pb-0">
                <p className="text-sm font-medium text-text">Paid on day 0</p>
                <p className="mt-1 text-sm text-muted">
                  Digital payment on partner rails (KCC, pledge, anchor
                  finance); the FPO carries no credit book.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Beat 3 -- value delivered */}
        <Reveal delay={0.06} className="mt-20 border-t border-hairline pt-16">
          <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
            The tolls become margins
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-g4 sm:grid-cols-4">
            <ValueStat
              value={<>-{commissionRateByRegion.tnPct}%</>}
              citeId={commissionRateByRegion.source}
              caption="commission layer removed"
            />
            <ValueStat
              value={
                <>
                  &#8377;{gradeSpreadCapture.gradeA}/{gradeSpreadCapture.gradeB}/
                  {gradeSpreadCapture.gradeC}
                </>
              }
              citeId={gradeSpreadCapture.source}
              caption="grade spread captured by the farmer"
            />
            <ValueStat
              value={
                <>
                  &#8377;{bananaDomesticTransport.perKgLow}&ndash;
                  {bananaDomesticTransport.perKgHigh}/kg
                </>
              }
              citeId={bananaDomesticTransport.source}
              caption="backhauls loaded, spread over two legs"
            />
            <ValueStat
              value={<>&#8377;{ripeningCharge.perKg}/kg</>}
              citeId={ripeningCharge.source}
              caption="allocated by order, spent on fruit that sells"
            />
          </div>
        </Reveal>

        {/* Beat 4 -- the gavel */}
        <Reveal delay={0.06} className="mt-20 border-t border-hairline pt-16 text-center">
          <div className="flex flex-wrap items-center justify-center gap-g4">
            <div className="font-mono text-fs-4 text-muted">{bvcPrecedent.bvc1Pct}%</div>
            <div className="font-mono text-fs-3 text-muted">&rarr;</div>
            <div className="font-mono text-fs-5 text-signal">
              {bvcPrecedent.bvc2Pct}%
              <Cite id={bvcPrecedent.source} />
            </div>
          </div>
          <p className="mt-2 micro-label text-signal/80">
            +{bvcPrecedent.deltaPts} pts
          </p>
          <p className="mx-auto mt-4 max-w-[50ch] text-sm text-muted">
            Already running {bvcPrecedent.corridorKm} km away: the
            farmer-co-owned chain in {bvcPrecedent.village},{" "}
            {bvcPrecedent.district} district.
          </p>
          <p className="mt-6 text-sm">
            <Link href="/platform" className="text-signal hover:underline">
              The full operating system &rarr;
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
