import Reveal from "@/components/Reveal";
import Cite from "@/components/Cite";
import { ledger } from "@/lib/ledger";

const {
  assetOwnershipBoundary,
  sixFunctionReroute,
  bvcPrecedent,
  governanceMechanisms,
} = ledger;

export default function FPOModel() {
  return (
    <div className="mt-20 border-t border-hairline pt-16">
      <Reveal>
        <div className="micro-label">The FPO model</div>
        <h2 className="font-display mt-3 text-3xl tracking-tight sm:text-4xl">
          One crop, one district, one coordination OS
        </h2>
        <p className="mt-4 max-w-2xl text-muted">
          The FPO is a member-owned company &mdash; farmers as shareholders
          &mdash; operating on banana, in Theni, and nowhere else yet. It is
          not a new middleman layered onto the existing chain. It is a
          replacement operating system for the coordination function that
          contractors, commission agents, and wholesalers currently perform:
          the e-Choupal law of asset-light coordination over ownership, run
          by farmers instead of a buyer.
        </p>
      </Reveal>

      {/* asset ownership boundary */}
      <Reveal delay={0.06} className="mt-12">
        <div className="micro-label mb-4">What it owns vs. what it rents</div>
        <div className="grid grid-cols-1 gap-0 border border-hairline sm:grid-cols-3">
          <div className="border-b border-hairline p-5 sm:border-b-0 sm:border-r">
            <div className="micro-label mb-3 text-[10px] text-signal">
              Owns
            </div>
            <ul className="flex flex-col gap-2 text-sm text-text">
              {assetOwnershipBoundary.own.map((a) => (
                <li key={a.asset}>{a.asset}</li>
              ))}
            </ul>
          </div>
          <div className="border-b border-hairline p-5 sm:border-b-0 sm:border-r">
            <div className="micro-label mb-3 text-[10px]">
              Rents / accesses, year 0&ndash;2
            </div>
            <ul className="flex flex-col gap-2 text-sm text-muted">
              {assetOwnershipBoundary.rentOrAccessYear0to2.map((a) => (
                <li key={a.asset}>{a.asset}</li>
              ))}
            </ul>
          </div>
          <div className="p-5">
            <div className="micro-label mb-3 text-[10px] text-danger/80">
              Never owns
            </div>
            <ul className="flex flex-col gap-2 text-sm text-muted">
              {assetOwnershipBoundary.neverOwned.map((a) => (
                <li key={a.asset}>{a.asset}</li>
              ))}
            </ul>
            <div className="micro-label mb-2 mt-5 text-[10px]">
              Maybe, year 3+
            </div>
            <ul className="flex flex-col gap-2 text-sm text-muted">
              {assetOwnershipBoundary.maybeYear3Plus.map((a) => (
                <li key={a.asset}>{a.asset}</li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-3 max-w-[70ch] text-xs text-muted">
          {assetOwnershipBoundary.note}
        </p>
      </Reveal>

      {/* six functions, condensed */}
      <Reveal delay={0.08} className="mt-16">
        <div className="micro-label mb-4">Six functions, re-routed</div>
        <div className="flex flex-col divide-y divide-hairline border-t border-hairline">
          {sixFunctionReroute.functions.map((f) => (
            <div
              key={f.function}
              className="grid grid-cols-1 gap-2 py-4 md:grid-cols-[1fr_2fr_2fr] md:items-baseline md:gap-4"
            >
              <div className="micro-label text-[11px] text-text">
                {f.function}
              </div>
              <p className="text-xs text-muted">{f.before}</p>
              <p className="text-xs text-signal/90">{f.platform}</p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* the money anchor */}
      <Reveal delay={0.1} className="mt-16">
        <div className="micro-label mb-4">The money anchor</div>
        <div className="panel flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="font-mono text-4xl text-muted sm:text-5xl">
              {bvcPrecedent.bvc1Pct}%
            </div>
            <div className="micro-label mt-2 text-[10px]">
              Baseline &mdash; traditional chain
              <Cite id={bvcPrecedent.source} />
            </div>
          </div>
          <div className="font-mono text-2xl text-hairline sm:text-3xl">
            &rarr;
          </div>
          <div>
            <div className="font-mono text-4xl text-signal sm:text-5xl">
              {bvcPrecedent.bvc2Pct}%
            </div>
            <div className="micro-label mt-2 text-[10px] text-signal/90">
              Proven ceiling &mdash; {bvcPrecedent.village}, {bvcPrecedent.district}
              <Cite id={bvcPrecedent.source} />
            </div>
          </div>
        </div>
        <p className="mt-4 max-w-[70ch] text-sm text-muted">
          This is not a projection &mdash; it is a precedent that already
          exists inside our own cluster. The farmer-co-owned BVC2 chain in
          Chinnamanur, {bvcPrecedent.corridorKm} km from Theni, already
          clears {bvcPrecedent.bvc2Pct}% farmer share. The precedent{" "}
          <em>is</em> the claim; nothing beyond it is asserted here.
        </p>
      </Reveal>

      {/* governance honesty line */}
      <Reveal delay={0.1} className="mt-16">
        <div className="micro-label mb-4">Governance &mdash; the open question</div>
        <div className="border-l-2 border-danger/60 pl-5">
          <p className="max-w-[70ch] text-sm text-muted">
            {governanceMechanisms.fpoCaptureMechanismOpenQuestion.description}
          </p>
          <p className="mt-3 max-w-[70ch] text-xs text-muted/80">
            {governanceMechanisms.fpoCaptureMechanismOpenQuestion.note}
          </p>
        </div>
      </Reveal>
    </div>
  );
}
