"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import Cite from "@/components/Cite";
import { ledger } from "@/lib/ledger";

const { assetOwnershipBoundary, ripeningChamberCapex } = ledger;

type Posture = "own" | "partner" | "later";

const POSTURES: { value: Posture; label: string }[] = [
  { value: "own", label: "Own now" },
  { value: "partner", label: "Partner now" },
  { value: "later", label: "Own after scale" },
];

export default function OwnershipModel() {
  const [posture, setPosture] = useState<Posture>("own");

  return (
    <Reveal className="mt-24">
      <div className="micro-label">Ownership boundary</div>
      <h2 className="font-display mt-3 max-w-3xl text-3xl tracking-tight sm:text-4xl">
        The FPO owns the demand contract, the quality gate, and the
        coordination logic. It rents or partners for chambers, trucks, and
        financing &mdash; and never owns farmland.
      </h2>

      <div
        role="tablist"
        aria-label="Ownership posture"
        className="mt-8 inline-flex gap-1 border border-hairline p-1"
      >
        {POSTURES.map((p) => (
          <button
            key={p.value}
            type="button"
            role="tab"
            aria-selected={posture === p.value}
            onClick={() => setPosture(p.value)}
            className={`micro-label px-4 py-2 text-[11px] transition-colors duration-150 ${
              posture === p.value
                ? "bg-signal/15 text-signal"
                : "text-muted hover:text-text"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* asymmetric 5:7 split — posture detail on the left, structural aside on the right */}
      <div className="mt-8 grid grid-cols-12 gap-g4">
        <div className="col-span-12 md:col-span-5">
          {posture === "own" && (
            <ul className="flex flex-col gap-4">
              {assetOwnershipBoundary.own.map((a) => (
                <li key={a.asset} className="panel p-4">
                  <div className="text-sm text-text">{a.asset}</div>
                  <div className="mt-1 text-xs text-muted">{a.basis}</div>
                </li>
              ))}
            </ul>
          )}
          {posture === "partner" && (
            <ul className="flex flex-col gap-4">
              {assetOwnershipBoundary.rentOrAccessYear0to2.map((a) => (
                <li key={a.asset} className="panel p-4">
                  <div className="text-sm text-text">{a.asset}</div>
                  <div className="mt-1 text-xs text-muted">{a.basis}</div>
                </li>
              ))}
            </ul>
          )}
          {posture === "later" && (
            <ul className="flex flex-col gap-4">
              {assetOwnershipBoundary.maybeYear3Plus.map((a) => (
                <li key={a.asset} className="panel border-signal/40 p-4">
                  <div className="text-sm text-text">{a.asset}</div>
                  <div className="mt-1 text-xs text-muted">{a.basis}</div>
                  <div className="mt-3 font-mono text-lg text-signal">
                    &#8377;{ripeningChamberCapex.perMtLakh} lakh/MT
                    <Cite id={ripeningChamberCapex.source} />
                  </div>
                  <div className="text-[11px] text-muted">
                    capex, {ripeningChamberCapex.subsidyPctGeneral}% subsidised
                    (general) &mdash; the asset this posture is naming, not yet
                    acquired
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="col-span-12 md:col-span-7 md:col-start-6">
          <div className="micro-label mb-2 text-[10px]">
            Never owned
          </div>
          <p className="max-w-[52ch] text-sm text-muted">
            {assetOwnershipBoundary.neverOwned[0].asset} &mdash;{" "}
            {assetOwnershipBoundary.neverOwned[0].basis}. This is a structural
            fact of the model, not a hedge: the FPO is a coordination layer
            over independent smallholdings, not a landholder.
          </p>
          <p className="mt-6 max-w-[56ch] text-xs text-muted">
            {assetOwnershipBoundary.note}
          </p>
        </div>
      </div>
    </Reveal>
  );
}
