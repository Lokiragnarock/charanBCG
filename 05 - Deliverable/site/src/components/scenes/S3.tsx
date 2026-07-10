"use client";

import Reveal from "@/components/Reveal";

const SLIDERS = [
  { label: "Crop", value: "Tomato" },
  { label: "Link(s) owned", value: "L3 + L4" },
  { label: "Payment lag", value: "T+0 vs T+15" },
  { label: "Finance source", value: "Balance sheet / pledge / anchor" },
];

const OUTPUTS = [
  { label: "Farmer ₹/yr uplift", value: "—" },
  { label: "FPO margin", value: "—" },
  { label: "Working capital required", value: "—" },
  { label: "Months to insolvency", value: "—" },
];

export default function S3() {
  return (
    <section
      id="s3"
      className="relative flex min-h-screen w-full flex-col justify-center px-6 py-24"
    >
      <div className="mx-auto w-full max-w-[1200px]">
        <Reveal>
          <div className="micro-label">Scene 3</div>
          <h2 className="font-display mt-3 text-4xl tracking-tight sm:text-5xl">
            The Living Model
          </h2>
          <p className="mt-4 max-w-xl text-muted">
            Stock-and-flow simulator: members, working capital, volume as
            stocks; joins, side-selling, payments, spoilage as flows.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="panel mt-10 p-8">
            <div className="micro-label mb-6 text-signal">
              System dynamics — calibration pending
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {SLIDERS.map((slider) => (
                <div key={slider.label}>
                  <div className="micro-label mb-2">{slider.label}</div>
                  <input
                    type="range"
                    disabled
                    className="w-full accent-[color:var(--muted)] opacity-50"
                  />
                  <div className="font-mono mt-2 text-sm text-muted">
                    {slider.value}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 border-t border-hairline pt-8 sm:grid-cols-4">
              {OUTPUTS.map((out) => (
                <div key={out.label} className="border border-hairline p-4">
                  <div className="micro-label mb-2">{out.label}</div>
                  <div className="font-mono text-3xl text-muted">
                    {out.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
