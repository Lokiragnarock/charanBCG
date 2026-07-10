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
  /** visual weight in the post-waterfall label row: "hero" (fs-4) or "quiet" (fs-2, muted) */
  weight: "hero" | "quiet";
};

const SEGMENTS: Segment[] = [
  {
    key: "farmer",
    label: "Farmer",
    value: farmerShare.tomato,
    color: "signal",
    citeId: farmerShare.source,
    weight: "hero",
  },
  {
    key: "trader",
    label: "Trader / aggregator",
    value: traderMargin.value,
    color: "muted",
    citeId: traderMargin.source,
    weight: "quiet",
  },
  {
    key: "wholesaler",
    label: "Wholesaler",
    value: wholesalerMargin.value,
    color: "muted",
    citeId: wholesalerMargin.source,
    weight: "quiet",
  },
  {
    key: "residual",
    label: residual.label,
    value: residual.tomato,
    color: "danger",
    citeId: residual.source,
    weight: "hero",
  },
];

export default function S1() {
  const pinRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const segmentRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const labelRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const statLandRef = useRef<HTMLDivElement>(null);
  const statSmallRef = useRef<HTMLDivElement>(null);
  const statAvgRef = useRef<HTMLDivElement>(null);
  const statMandiRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const configs: {
      el: HTMLDivElement | null;
      target: number;
      format: (v: number) => string;
    }[] = [
      {
        el: statLandRef.current,
        target: parseFloat(holdings.total),
        format: (v) => `${Math.round(v)}M`,
      },
      {
        el: statSmallRef.current,
        target: holdings.smallMarginalPct,
        format: (v) => `${Math.round(v)}%`,
      },
      {
        el: statAvgRef.current,
        target: holdings.avgHa,
        format: (v) => `${v.toFixed(2)} ha`,
      },
      {
        el: statMandiRef.current,
        target: mandiDensity.actualSqKm,
        format: (v) => `1 / ${Math.round(v)}`,
      },
    ];

    if (prefersReducedMotion) {
      configs.forEach(({ el, target, format }) => {
        if (el) el.textContent = format(target);
      });
      return;
    }

    const ctx = gsap.context(() => {
      configs.forEach(({ el, target, format }) => {
        if (!el) return;
        const counter = { value: 0 };
        gsap.to(counter, {
          value: target,
          duration: 1.2,
          ease: "wane-out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            el.textContent = format(counter.value);
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="s1" className="relative w-full">
      {/* FORTISSIMO — the eye travels: top-left label -> huge right numeral -> low-left paragraph */}
      <div className="mx-auto w-full max-w-[1200px] px-8 md:px-14 pt-32 pb-g6">
        <Reveal>
          <div className="micro-label">BCG OutPrompt — Problem 4</div>
        </Reveal>

        <div className="mt-g5 grid min-h-[68vh] grid-cols-12 items-end gap-g3">
          {/* low-left: the answer, in the 5-column side, low */}
          <div className="col-span-12 md:col-span-5 md:self-end">
            <Reveal delay={0.2}>
              <p className="max-w-[34ch] text-lg text-muted">
                Of every ₹100 a consumer pays for a tomato, the farmer keeps ₹
                <span className="stat">{farmerShare.tomato}</span>
                <Cite id={farmerShare.source} />. Everyone assumes the
                traders eat the rest. They don&apos;t.
              </p>
            </Reveal>
          </div>

          {/* huge right: the numeral owns 7 of 12 columns */}
          <div className="col-span-12 text-right md:col-span-7">
            <Reveal delay={0.04}>
              <div className="font-display text-fs-3 leading-none tracking-tight text-text/60">
                THE
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <h1 className="font-mono text-fs-6 leading-[0.88] text-signal">
                ₹100
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="font-display text-fs-3 leading-none tracking-tight text-text/60">
                PROBLEM
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Pinned scroll-scrubbed waterfall — must stay in plain block flow (no flex/overflow-hidden ancestors) or the pin-spacer mis-measures */}
      <div ref={pinRef} className="flex h-screen w-full flex-col justify-center">
        <div className="mx-auto w-full max-w-[1200px] px-8 md:px-14">
          <div className="micro-label mb-g3">
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

          {/* centered row — items-center puts smaller numbers at the vertical
              middle of the larger ones; each label is centered over its own number */}
          <div className="mt-g4 flex items-center justify-between gap-g3">
            {SEGMENTS.map((seg) => (
              <div
                key={seg.key}
                ref={(el) => {
                  labelRefs.current[seg.key] = el;
                }}
                className="flex flex-col items-center text-center"
              >
                <div className="micro-label mb-1">{seg.label}</div>
                <div
                  className={`font-mono ${
                    seg.weight === "hero" ? "text-fs-4" : "text-fs-2 opacity-70"
                  } ${
                    seg.color === "signal"
                      ? "text-signal"
                      : seg.color === "danger"
                      ? "text-danger"
                      : "text-muted"
                  }`}
                >
                  ₹{seg.value}
                  {seg.citeId && <Cite id={seg.citeId} />}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-g5 max-w-[52ch] text-muted">
            The trader and the wholesaler — the classic &quot;middlemen&quot;
            — take ~5% each. The majority of the intermediary share sits at
            the retail end and in wastage. &quot;Cut out the middleman&quot;
            attacks the wrong ₹5; the prize is the ~₹56 downstream block.
          </p>
        </div>
      </div>

      {/* PIANISSIMO — centering rationed to exactly this one thesis line, the gavel */}
      <div className="flex min-h-screen w-full items-center justify-center px-6">
        <Reveal>
          <p className="font-mono text-fs-2 text-center text-muted">
            The middleman takes ₹{Math.round(traderMargin.value)}. The system
            takes ₹{residual.tomato}.
          </p>
        </Reveal>
      </div>

      {/* Stat cascade — a centered descent */}
      <div className="mx-auto w-full max-w-[1200px] px-8 md:px-14 pt-g5 pb-g6">
        <Reveal className="text-center">
          <div className="micro-label">The structural constraint</div>
        </Reveal>

        <div className="mx-auto mt-g5 flex max-w-[760px] flex-col items-center gap-g5 text-center">
          <Reveal className="flex flex-col items-center">
            <div ref={statLandRef} className="font-mono text-fs-5 text-signal">
              {holdings.total}
            </div>
            <div className="micro-label mt-2">
              landholdings <Cite id={holdings.source} />
            </div>
          </Reveal>

          <Reveal delay={0.08} className="flex flex-col items-center">
            <div ref={statSmallRef} className="font-mono text-fs-4 text-signal">
              {holdings.smallMarginalPct}%
            </div>
            <div className="micro-label mt-2">
              hold under 2 ha <Cite id={holdings.source} />
            </div>
          </Reveal>

          <Reveal delay={0.16} className="flex flex-col items-center">
            <div ref={statAvgRef} className="font-mono text-fs-3 text-signal">
              {holdings.avgHa} ha
            </div>
            <div className="micro-label mt-2">
              average holding, down from {holdings.avgHa1970} ha (1970)
              <Cite id={holdings.source} />
            </div>
          </Reveal>

          <Reveal delay={0.24} className="flex flex-col items-center">
            <div ref={statMandiRef} className="font-mono text-fs-3 text-signal">
              1 / {mandiDensity.actualSqKm}
            </div>
            <div className="micro-label mt-2">
              sq km per mandi, vs 1/{mandiDensity.recommendedSqKm}{" "}
              recommended <Cite id={mandiDensity.source} />
            </div>
          </Reveal>
        </div>
      </div>

      {/* Pull-quote that breaks the right margin — full viewport width so the
          panel can bleed to the true viewport edge, not just the container. */}
      <div className="w-full pb-g6">
        <div className="grid grid-cols-12 gap-g3 pl-8 sm:pl-[max(2rem,calc((100vw-1200px)/2+3.5rem))]">
          <Reveal className="col-span-11 col-start-2 md:col-span-7 md:col-start-6">
            <div className="border-l border-t border-b border-hairline p-g4 sm:p-g5">
              <div className="micro-label mb-2">Contrast case</div>
              <p className="max-w-md text-text">
                Eggs and chana farmers keep{" "}
                <span className="stat text-fs-3">
                  ₹{eggsChanaShare.value}
                </span>{" "}
                of every ₹100 <Cite id={eggsChanaShare.source} /> — proof
                the ₹{farmerShare.tomato} tomato outcome is a chain problem,
                not a physics problem.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
