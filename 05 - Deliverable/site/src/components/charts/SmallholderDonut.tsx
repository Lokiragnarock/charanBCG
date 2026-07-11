"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
  meaning: string;
}[] = [
  {
    key: "landPct",
    r: 100,
    signal: false,
    label: "of agri land",
    meaning: "the land smallholders farm",
  },
  {
    key: "vegPct",
    r: 80,
    signal: true,
    label: "of vegetables",
    meaning: "grown by smallholders",
  },
  {
    key: "fruitPct",
    r: 62,
    signal: true,
    label: "of fruits",
    meaning: "grown by smallholders",
  },
  {
    key: "cerealPct",
    r: 44,
    signal: true,
    label: "of cereals",
    meaning: "grown by smallholders",
  },
];

type Line = { points: string; color: string };

export default function SmallholderDonut() {
  const svgRef = useRef<SVGSVGElement>(null);
  const arcRefs = useRef<(SVGCircleElement | null)[]>([]);
  const rowRef = useRef<HTMLDivElement>(null);
  const stripRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeKey, setActiveKey] = useState<RingKey | null>(null);
  const [lines, setLines] = useState<Line[]>([]);

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

  /** Connector lines: strip top/bottom-center -> elbow -> ring attach point.
      Alternating rings route above / below the donut so no two lines overlap.
      Only drawn in the side-by-side (md+) layout. */
  const computeLines = useCallback(() => {
    const row = rowRef.current;
    const donut = svgRef.current;
    if (!row || !donut) return;

    if (!window.matchMedia("(min-width: 768px)").matches) {
      setLines([]);
      return;
    }

    const rowRect = row.getBoundingClientRect();
    const dRect = donut.getBoundingClientRect();
    const scale = dRect.width / 240;
    const cx = dRect.left - rowRect.left + dRect.width / 2;
    const cy = dRect.top - rowRect.top + dRect.height / 2;

    const next: Line[] = [];
    RINGS.forEach((ring, i) => {
      const strip = stripRefs.current[i];
      if (!strip) return;
      const sRect = strip.getBoundingClientRect();
      const sx = sRect.left - rowRect.left + sRect.width / 2;
      const top = i % 2 === 0;
      const sy = top
        ? sRect.top - rowRect.top
        : sRect.bottom - rowRect.top;
      // ring attach point: top or bottom of the ring circle
      const ry = top ? cy - ring.r * scale : cy + ring.r * scale;
      next.push({
        points: `${sx},${sy} ${sx},${ry} ${cx},${ry}`,
        color: ring.signal ? "var(--signal)" : "rgba(255,255,255,0.75)",
      });
    });
    setLines(next);
  }, []);

  useEffect(() => {
    computeLines();
    const row = rowRef.current;
    if (!row) return;
    const ro = new ResizeObserver(() => computeLines());
    ro.observe(row);
    window.addEventListener("resize", computeLines);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", computeLines);
    };
  }, [computeLines]);

  // Strips reflow while a strip expands/collapses; track the endpoints
  // through the 500ms flex transition.
  useEffect(() => {
    const timers = [60, 180, 320, 460, 560].map((t) =>
      window.setTimeout(computeLines, t)
    );
    return () => timers.forEach(clearTimeout);
  }, [activeKey, computeLines]);

  return (
    <div>
      {/* Context line so the chart is self-explanatory without the stage takeaway */}
      <div className="micro-label mb-g3 text-center">
        Smallholders&apos; share of output vs land
      </div>

      <div
        ref={rowRef}
        className="relative flex flex-col items-center gap-g4 md:flex-row md:justify-center"
      >
        {/* connector lines overlay */}
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 h-full w-full overflow-visible"
        >
          {lines.map((line, i) => (
            <polyline
              key={i}
              points={line.points}
              fill="none"
              stroke={line.color}
              strokeWidth={1.5}
            />
          ))}
        </svg>

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

        {/* Expanding-strip legend. Hover / focus expands a strip into a
            readable data block and highlights its ring. */}
        <div className="flex h-[260px] w-[250px] shrink-0 gap-[5px] rounded-[4px] bg-white/[0.03] p-[0.4em]">
          {RINGS.map((ring, i) => {
            const pct = data[ring.key];
            const active = activeKey === ring.key;
            const color = ring.signal ? "var(--signal)" : "var(--muted)";

            return (
              <div
                key={ring.key}
                ref={(el) => {
                  stripRefs.current[i] = el;
                }}
                tabIndex={0}
                role="button"
                aria-label={`${pct}% ${ring.label}, ${ring.meaning}`}
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
                {active ? (
                  <span className="flex flex-col items-center gap-1 px-2 text-center">
                    <span
                      className="font-mono text-fs-3 leading-none"
                      style={{ color }}
                    >
                      {pct}%
                    </span>
                    <span
                      className="font-mono uppercase"
                      style={{
                        fontSize: 12,
                        letterSpacing: "0.1em",
                        color,
                      }}
                    >
                      {ring.label}
                    </span>
                    <span
                      className="font-mono text-muted"
                      style={{ fontSize: 11 }}
                    >
                      {ring.meaning}
                    </span>
                  </span>
                ) : (
                  <span
                    className="min-w-[14em] p-2 text-center font-mono uppercase"
                    style={{
                      fontSize: 13,
                      letterSpacing: "0.1em",
                      whiteSpace: "nowrap",
                      color,
                      transform: "rotate(-90deg)",
                    }}
                  >
                    {pct}% {ring.label}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
