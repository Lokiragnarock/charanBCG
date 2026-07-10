"use client";

import { useEffect, useRef } from "react";
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

// Point on a circle of radius r, at pct% around it starting from 12 o'clock,
// going clockwise — matches the visual effect of `rotate(-90 cx cy)` on the
// stroke-dasharray arc, computed directly (no DOM transform math needed).
function arcEndPoint(r: number, pct: number) {
  const angle = ((-90 + pct * 3.6) * Math.PI) / 180;
  return { x: CX + r * Math.cos(angle), y: CY + r * Math.sin(angle) };
}

export default function SmallholderDonut() {
  const svgRef = useRef<SVGSVGElement>(null);
  const arcRefs = useRef<(SVGCircleElement | null)[]>([]);

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
    <div className="group mx-auto w-full origin-center transition-transform duration-300 ease-out will-change-transform motion-safe:hover:scale-105">
      <svg
        ref={svgRef}
        viewBox="-120 -20 560 280"
        className="w-full"
        role="img"
        aria-label={`Smallholders farm ${data.landPct}% of India's agricultural land, but grow ${data.vegPct}% of vegetables, ${data.fruitPct}% of fruits and ${data.cerealPct}% of cereals.`}
      >
        {RINGS.map((ring, i) => {
          const pct = data[ring.key];
          const circumference = 2 * Math.PI * ring.r;
          const dash = (circumference * pct) / 100;
          const end = arcEndPoint(ring.r, pct);
          const calloutY = 40 + i * 60;
          const calloutX = 300;
          const elbowX = end.x + 24;

          return (
            <g key={ring.key}>
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
              {/* two-segment leader line: arc end -> elbow -> callout */}
              <polyline
                points={`${end.x},${end.y} ${elbowX},${end.y} ${calloutX - 6},${calloutY}`}
                fill="none"
                style={{ stroke: "var(--hairline)" }}
                strokeWidth={1}
              />
              <text
                x={calloutX}
                y={calloutY}
                textAnchor="start"
                dominantBaseline="middle"
                className="font-mono"
                fontSize={11}
                style={{ fill: ring.signal ? "var(--signal)" : "var(--muted)" }}
              >
                {pct}% {ring.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
