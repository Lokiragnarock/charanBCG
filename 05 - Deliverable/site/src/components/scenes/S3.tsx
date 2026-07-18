"use client";

import { useMemo, useState } from "react";
import Reveal from "@/components/Reveal";
import Cite from "@/components/Cite";
import {
  runModel,
  OUR_RECOMMENDATION,
  PARAM_SOURCES,
  type FinanceSource,
  type ModelInputs,
  type PaymentTiming,
} from "@/lib/model";

const PAYMENT_OPTIONS: { value: PaymentTiming; label: string }[] = [
  { value: "day0", label: "Day-0" },
  { value: "t15", label: "T+15" },
];

const FINANCE_OPTIONS: { value: FinanceSource; label: string }[] = [
  { value: "balance-sheet", label: "Balance sheet" },
  { value: "pledge", label: "Pledge" },
  { value: "anchor", label: "Anchor" },
];

const DEFAULT_INPUTS: ModelInputs = {
  paymentTiming: "t15",
  advisoryQuality: 0.2,
  financeSource: "balance-sheet",
  priceShockPct: 0,
};

const money = (v: number) =>
  v >= 100000
    ? `Rs ${(v / 100000).toFixed(1)}L`
    : `Rs ${Math.round(v).toLocaleString("en-IN")}`;

export default function S3() {
  const [inputs, setInputs] = useState<ModelInputs>(DEFAULT_INPUTS);

  const output = useMemo(() => runModel(inputs), [inputs]);

  const isOurRecommendation =
    inputs.paymentTiming === OUR_RECOMMENDATION.paymentTiming &&
    inputs.advisoryQuality === OUR_RECOMMENDATION.advisoryQuality &&
    inputs.financeSource === OUR_RECOMMENDATION.financeSource &&
    inputs.priceShockPct === OUR_RECOMMENDATION.priceShockPct;

  const verdict =
    output.verdict === "solvent"
      ? "Solvent through the 36-month horizon."
      : `Dies in month ${output.monthsToInsolvency}: cash and credit run out.`;

  return (
    <section
      id="s3"
      className="relative flex min-h-screen w-full flex-col justify-center px-8 py-24 md:px-14"
    >
      <div className="mx-auto w-full max-w-[1200px]">
        <Reveal>
          <div className="micro-label">Scene 3</div>
          <h2 className="font-display mt-3 text-4xl tracking-tight sm:text-5xl">
            The Living Model
          </h2>
          <p className="mt-4 max-w-xl text-muted">
            Tomato FPO, monthly stock-and-flow: members, working capital, and
            aggregated volume as stocks; joins, side-selling, payments, and
            spoilage as flows. Same combination the judges can reproduce,
            then break.
          </p>
        </Reveal>

        <Reveal delay={0.06} className="mt-8 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setInputs(OUR_RECOMMENDATION)}
            className={`micro-label border px-3 py-2 transition-colors duration-150 ${
              isOurRecommendation
                ? "border-signal text-signal"
                : "border-hairline text-muted hover:border-signal/50 hover:text-text"
            }`}
          >
            The recommendation
          </button>
          <button
            type="button"
            onClick={() => setInputs(DEFAULT_INPUTS)}
            className="micro-label border border-hairline px-3 py-2 text-muted transition-colors duration-150 hover:border-signal/50 hover:text-text"
          >
            Reset
          </button>
        </Reveal>

        {/* Stage / plinth: shared idiom with S4's panel */}
        <Reveal delay={0.12}>
          <div className="panel mt-6 grid grid-cols-1 gap-0 overflow-hidden lg:grid-cols-2">
            {/* Left: sliders */}
            <div className="border-b border-hairline p-6 sm:p-8 lg:border-b-0 lg:border-r">
              <div className="micro-label mb-6">Scenario inputs</div>

              <div className="mb-7">
                <div className="micro-label mb-2 flex items-center justify-between">
                  <span>Crop</span>
                  <span className="text-text">Tomato (fixed)</span>
                </div>
              </div>

              <div className="mb-7">
                <div className="micro-label mb-2">Farmer payment timing</div>
                <div className="flex gap-2">
                  {PAYMENT_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() =>
                        setInputs((s) => ({ ...s, paymentTiming: opt.value }))
                      }
                      className={`flex-1 border px-3 py-2 font-mono text-sm transition-colors duration-150 ${
                        inputs.paymentTiming === opt.value
                          ? "border-signal text-signal"
                          : "border-hairline text-muted hover:border-signal/40"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-7">
                <div className="micro-label mb-2 flex items-center justify-between">
                  <span>Advisory quality</span>
                  <span className="font-mono text-text">
                    {inputs.advisoryQuality.toFixed(2)}
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={inputs.advisoryQuality}
                  onChange={(e) =>
                    setInputs((s) => ({
                      ...s,
                      advisoryQuality: Number(e.target.value),
                    }))
                  }
                  className="w-full accent-[color:var(--signal)]"
                />
              </div>

              <div className="mb-7">
                <div className="micro-label mb-2">Finance source</div>
                <div className="flex gap-2">
                  {FINANCE_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() =>
                        setInputs((s) => ({ ...s, financeSource: opt.value }))
                      }
                      className={`flex-1 border px-2 py-2 font-mono text-xs transition-colors duration-150 ${
                        inputs.financeSource === opt.value
                          ? "border-signal text-signal"
                          : "border-hairline text-muted hover:border-signal/40"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="micro-label mb-2 flex items-center justify-between">
                  <span>Price shock</span>
                  <span className="font-mono text-text">
                    {inputs.priceShockPct > 0 ? "+" : ""}
                    {inputs.priceShockPct}%
                  </span>
                </div>
                <input
                  type="range"
                  min={-30}
                  max={30}
                  step={5}
                  value={inputs.priceShockPct}
                  onChange={(e) =>
                    setInputs((s) => ({
                      ...s,
                      priceShockPct: Number(e.target.value),
                    }))
                  }
                  className="w-full accent-[color:var(--signal)]"
                />
              </div>
            </div>

            {/* Right: live outputs */}
            <div className="p-6 sm:p-8">
              <div className="micro-label mb-6">Outputs, live</div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="micro-label mb-1 text-[10px]">
                    Farmer uplift, Rs/yr
                    <Cite id={PARAM_SOURCES.baselineIncome} />
                  </div>
                  <div className="font-mono text-fs-3 text-signal">
                    +{Math.round(output.farmerUpliftRsYr).toLocaleString("en-IN")}
                  </div>
                </div>

                <div>
                  <div className="micro-label mb-1 text-[10px]">
                    FPO margin
                    <Cite id={PARAM_SOURCES.fpoMargin} />
                  </div>
                  <div className="font-mono text-fs-3 text-signal">
                    {output.fpoMarginPct.toFixed(1)}%
                  </div>
                </div>

                <div>
                  <div className="micro-label mb-1 text-[10px]">
                    Working capital required
                    <Cite id={PARAM_SOURCES.fpoWorkingCapital} />
                  </div>
                  <div className="font-mono text-fs-3 text-text">
                    {money(output.workingCapitalRequiredRs)}
                  </div>
                </div>

                <div>
                  <div className="micro-label mb-1 text-[10px]">
                    Months to insolvency
                  </div>
                  <div
                    className={`font-mono text-fs-3 ${
                      output.verdict === "solvent" ? "text-signal" : "text-danger"
                    }`}
                  >
                    {output.monthsToInsolvency ?? "36+"}
                  </div>
                </div>
              </div>

              <div
                className={`mt-8 border-l-2 pl-4 font-mono text-sm ${
                  output.verdict === "solvent"
                    ? "border-signal text-signal"
                    : "border-danger text-danger"
                }`}
              >
                {verdict}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
