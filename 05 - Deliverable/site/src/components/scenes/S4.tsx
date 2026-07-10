"use client";

import Reveal from "@/components/Reveal";

export default function S4() {
  return (
    <section
      id="s4"
      className="relative flex min-h-screen w-full flex-col justify-center px-6 py-24"
    >
      <div className="mx-auto w-full max-w-[1200px]">
        <Reveal>
          <div className="micro-label">Scene 4</div>
          <h2 className="font-display mt-3 text-4xl tracking-tight sm:text-5xl">
            The Sweet-Spot Spectrum
          </h2>
          <p className="mt-4 max-w-xl text-muted">
            TAM bubbles per candidate crop; concentration vs opportunity.
            Background aura: red (high concentration / low TAM) → green
            (the sweet spot).
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            className="relative mt-10 grid grid-cols-1 gap-0 overflow-hidden border border-hairline lg:grid-cols-[1fr_2fr_1fr]"
            style={{
              backgroundImage:
                "linear-gradient(90deg, color-mix(in srgb, var(--danger) 18%, transparent), color-mix(in srgb, var(--signal) 18%, transparent))",
            }}
          >
            <div className="border-b border-hairline p-6 lg:border-b-0 lg:border-r">
              <div className="micro-label mb-4">Clippings</div>
              <div className="micro-label normal-case tracking-normal text-[11px] text-muted">
                Incumbent headlines — placeholder
              </div>
            </div>
            <div className="flex min-h-[320px] items-center justify-center p-6">
              <div className="micro-label border border-dashed border-hairline px-6 py-10 text-center">
                Bubble chart — TAM × concentration
                <br />
                v1
              </div>
            </div>
            <div className="border-t border-hairline p-6 lg:border-t-0 lg:border-l">
              <div className="micro-label mb-4">Concentration</div>
              <div className="micro-label normal-case tracking-normal text-[11px] text-muted">
                Top-3 share bars — placeholder
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
