"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ledger } from "@/lib/ledger";

gsap.registerPlugin(ScrollTrigger);

const CX = 120;
const CY = 120;
const STROKE = 9;

type RingKey = "landPct" | "vegPct" | "fruitPct" | "cerealPct";

const RINGS: {
  key: RingKey;
  r: number;
  signal: boolean;
  label: string;
}[] = [
  { key: "landPct", r: 100, signal: false, label: "of agri land" },
  { key: "vegPct", r: 80, signal: true, label: "of vegetables" },
  { key: "fruitPct", r: 62, signal: true, label: "of fruits" },
  { key: "cerealPct", r: 44, signal: true, label: "of cereals" },
];

export default function SmallholderDonut() {
  const svgRef = useRef<SVGSVGElement>(null);
  const arcRefs = useRef<(SVGCircleElement | null)[]>([]);
  const [activeKey, setActiveKey] = useState<RingKey | null>(null);

  const data = ledger.smallholderOutput;

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const els = arcRefs.current.filter(Boolean) as SVGCircleElement[];

    els.forEach((el) => {
      const circumference = Number(el.dataset.circumference);
      const dash = Number(el.dataset.dash);
      if (prefersReducedMotion) {
        // Static — no draw-in, land straight on the final value.
        gsap.set(el, {
          strokeDasharray: circumference,
          strokeDashoffset: circumference - dash,
        });
      } else {
        gsap.set(el, { strokeDasharray: circumference, strokeDashoffset: circumference });
      }
    });

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      els.forEach((el, i) => {
        const circumference = Number(el.dataset.circumference);
        const dash = Number(el.dataset.dash);
        gsap.to(el, {
          strokeDashoffset: circumference - dash,
          duration: 1.1,
          delay: i * 0.12,
          ease: gsap.parseEase("wane-out") ? "wane-out" : "power3.out",
          scrollTrigger: {
            trigger: svgRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        });
      });
    }, svgRef);

    return () => ctx.revert();
  }, []);

  return (
    <div>
      {/* Context line so the chart is self-explanatory without the stage takeaway */}
      <div className="micro-label mb-g3 text-center">
        Smallholders&apos; share of output vs land
      </div>

      <div className="flex flex-col items-center gap-g4 md:flex-row md:justify-center">
        {/* Donut — rings only, hover pop preserved */}
        <div className="w-full max-w-[340px] origin-center transition-transform duration-300 ease-out will-change-transform motion-safe:hover:scale-105">
          <svg
            ref={svgRef}
            viewBox="0 0 240 240"
            className="w-full"
            role="img"
            aria-label={`Smallholders farm ${data.landPct}% of India's agricultural land, but grow ${data.vegPct}% of vegetables, ${data.fruitPct}% of fruits and ${data.cerealPct}% of cereals.`}
          >
            {RINGS.map((ring) => {
              const pct = data[ring.key];
              const circumference = 2 * Math.PI * ring.r;
              const dash = (circumference * pct) / 100;

              return (
                <g
                  key={ring.key}
                  style={{
                    opacity:
                      activeKey === null || activeKey === ring.key ? 1 : 0.35,
                    transition: "opacity 200ms ease-out",
                  }}
                >
                  <circle
                    cx={CX}
                    cy={CY}
                    r={ring.r}
                    fill="none"
                    style={{ stroke: "var(--hairline)" }}
                    strokeWidth={STROKE}
                  />
                  <circle
                    ref={(el) => {
                      arcRefs.current[RINGS.indexOf(ring)] = el;
                    }}
                    cx={CX}
                    cy={CY}
                    r={ring.r}
                    fill="none"
                    style={{ stroke: ring.signal ? "var(--signal)" : "var(--muted)" }}
                    strokeWidth={STROKE}
                    strokeLinecap="round"
                    transform={`rotate(-90 ${CX} ${CY})`}
                    data-circumference={circumference}
                    data-dash={dash}
                  />
                </g>
              );
            })}
          </svg>
        </div>

        {/* Expanding-strip legend (Uiverse pattern by joe-watson-sbf, re-themed
            to our tokens). Hovering / focusing a strip highlights its ring. */}
        <div className="flex h-[260px] w-[230px] shrink-0 gap-[5px] rounded-[4px] bg-white/[0.03] p-[0.4em]">
          {RINGS.map((ring) => {
            const pct = data[ring.key];
            const active = activeKey === ring.key;

            return (
              <div
                key={ring.key}
                tabIndex={0}
                role="button"
                aria-label={`${pct}% ${ring.label}`}
                onMouseEnter={() => setActiveKey(ring.key)}
                onMouseLeave={() => setActiveKey(null)}
                onFocus={() => setActiveKey(ring.key)}
                onBlur={() => setActiveKey(null)}
                className="flex h-full cursor-pointer items-center justify-center overflow-hidden rounded-[2px] outline-none transition-all duration-500 focus-visible:ring-1 focus-visible:ring-signal motion-reduce:transition-none"
                style={{
                  flex: active ? 4 : 1,
                  border: `1px solid ${
                    ring.signal ? "var(--signal)" : "var(--hairline)"
                  }`,
                }}
              >
                <span
                  className="min-w-[14em] p-2 text-center font-mono uppercase transition-all duration-500 motion-reduce:transition-none"
                  style={{
                    fontSize: 13,
                    letterSpacing: "0.1em",
                    whiteSpace: "nowrap",
                    color: ring.signal ? "var(--signal)" : "var(--muted)",
                    transform: active ? "rotate(0deg)" : "rotate(-90deg)",
                  }}
                >
                  {pct}% {ring.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
