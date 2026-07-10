"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Reveal from "@/components/Reveal";
import Cite from "@/components/Cite";
import { ledger } from "@/lib/ledger";

gsap.registerPlugin(ScrollTrigger);

const { farmerShare, traderMargin, wholesalerMargin, residual, holdings, mandiDensity, eggsChanaShare } =
  ledger;

type Segment = {
  key: string;
  label: string;
  value: number;
  color: "signal" | "muted" | "danger";
  citeId?: string;
};

const SEGMENTS: Segment[] = [
  {
    key: "farmer",
    label: "Farmer",
    value: farmerShare.tomato,
    color: "signal",
    citeId: farmerShare.source,
  },
  {
    key: "trader",
    label: "Trader / aggregator",
    value: traderMargin.value,
    color: "muted",
    citeId: traderMargin.source,
  },
  {
    key: "wholesaler",
    label: "Wholesaler",
    value: wholesalerMargin.value,
    color: "muted",
    citeId: wholesalerMargin.source,
  },
  {
    key: "residual",
    label: residual.label,
    value: residual.tomato,
    color: "danger",
    citeId: residual.source,
  },
];

export default function S1() {
  const pinRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const segmentRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const labelRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const segEls = SEGMENTS.map((s) => segmentRefs.current[s.key]).filter(
      Boolean
    ) as HTMLDivElement[];
    const labelEls = SEGMENTS.map((s) => labelRefs.current[s.key]).filter(
      Boolean
    ) as HTMLDivElement[];

    if (prefersReducedMotion) {
      gsap.set(segEls, { gap: "4px" });
      gsap.set(labelEls, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(labelEls, { opacity: 0, y: 16 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top top",
          end: "+=200%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(barRef.current, { gap: "10px", duration: 1, ease: "power1.out" }, 0);
      tl.to(
        labelEls,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power1.out",
        },
        0.15
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="s1" className="relative w-full px-6 pt-32 pb-16">
      <div className="mx-auto flex min-h-[60vh] w-full max-w-[1200px] flex-col justify-center">
        <Reveal>
          <div className="micro-label">BCG OutPrompt — Problem 4</div>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="font-display mt-4 max-w-4xl text-5xl font-medium leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
            THE ₹100 PROBLEM
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-6 max-w-xl text-lg text-muted">
            Of every ₹100 a consumer pays for a tomato, the farmer keeps ₹
            <span className="stat">{farmerShare.tomato}</span>
            <Cite id={farmerShare.source} />. Everyone assumes the traders eat
            the rest. They don&apos;t.
          </p>
        </Reveal>
      </div>

      {/* Pinned scroll-scrubbed waterfall — must stay in plain block flow (no flex/overflow-hidden ancestors) or the pin-spacer mis-measures */}
      <div ref={pinRef} className="flex h-screen w-full flex-col justify-center">
        <div className="mx-auto w-full max-w-[1200px]">
          <div className="micro-label mb-6">
            The consumer&apos;s ₹100 — tomato, farmgate to fork
          </div>
          <div
            ref={barRef}
            className="flex h-20 w-full gap-0 overflow-hidden border border-hairline sm:h-24"
          >
            {SEGMENTS.map((seg) => (
              <div
                key={seg.key}
                ref={(el) => {
                  segmentRefs.current[seg.key] = el;
                }}
                style={{ flexGrow: seg.value }}
                className={`flex items-center justify-center ${
                  seg.color === "signal"
                    ? "bg-signal/20 border-signal"
                    : seg.color === "danger"
                    ? "bg-danger/15 border-danger/60"
                    : "bg-white/5 border-hairline"
                } border-r last:border-r-0`}
              >
                <span
                  className={`font-mono text-sm sm:text-base ${
                    seg.color === "signal"
                      ? "text-signal"
                      : seg.color === "danger"
                      ? "text-danger"
                      : "text-muted"
                  }`}
                >
                  ₹{seg.value}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {SEGMENTS.map((seg) => (
              <div
                key={seg.key}
                ref={(el) => {
                  labelRefs.current[seg.key] = el;
                }}
              >
                <div className="micro-label mb-1">{seg.label}</div>
                <div
                  className={`font-mono text-2xl ${
                    seg.color === "signal"
                      ? "text-signal"
                      : seg.color === "danger"
                      ? "text-danger"
                      : "text-text"
                  }`}
                >
                  ₹{seg.value}
                  {seg.citeId && <Cite id={seg.citeId} />}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-10 max-w-2xl text-muted">
            The trader and the wholesaler — the classic &quot;middlemen&quot;
            — take ~5% each. The majority of the intermediary share sits at
            the retail end and in wastage. &quot;Cut out the middleman&quot;
            attacks the wrong ₹5; the prize is the ~₹56 downstream block.
          </p>
        </div>
      </div>

      {/* Typographic stat hits */}
      <div className="mx-auto mt-24 w-full max-w-[1200px]">
        <div className="micro-label mb-8">The structural constraint</div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <Reveal>
            <div className="font-mono text-4xl text-signal">
              {holdings.total}
            </div>
            <div className="micro-label mt-2">
              landholdings <Cite id={holdings.source} />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="font-mono text-4xl text-signal">
              {holdings.smallMarginalPct}%
            </div>
            <div className="micro-label mt-2">
              hold under 2 ha <Cite id={holdings.source} />
            </div>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="font-mono text-4xl text-signal">
              {holdings.avgHa} ha
            </div>
            <div className="micro-label mt-2">
              average holding, down from {holdings.avgHa1970} ha (1970)
              <Cite id={holdings.source} />
            </div>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="font-mono text-4xl text-signal">
              1 / {mandiDensity.actualSqKm}
            </div>
            <div className="micro-label mt-2">
              sq km per mandi, vs 1/{mandiDensity.recommendedSqKm}{" "}
              recommended <Cite id={mandiDensity.source} />
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.3}>
          <div className="panel mt-10 flex items-center justify-between gap-6 p-8">
            <div>
              <div className="micro-label mb-2">Contrast case</div>
              <p className="max-w-md text-text">
                Eggs and chana farmers keep{" "}
                <span className="stat text-2xl">
                  ₹{eggsChanaShare.value}
                </span>{" "}
                of every ₹100 <Cite id={eggsChanaShare.source} /> — proof
                the ₹{farmerShare.tomato} tomato outcome is a chain problem,
                not a physics problem.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
