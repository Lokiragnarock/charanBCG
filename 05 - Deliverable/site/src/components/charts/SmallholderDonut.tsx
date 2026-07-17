"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ledger } from "@/lib/ledger";

gsap.registerPlugin(ScrollTrigger);

type RowKey = "landPct" | "vegPct" | "fruitPct" | "cerealPct";

/**
 * Direct-labeled horizontal bars. Rebuilt from a radial/donut chart whose
 * leader lines crossed the rings into a cramped label block (illegible —
 * user verdict). Pudding rule: the chart IS the paragraph, so every value
 * is labeled on the bar itself, no detached legend, nothing to trace.
 */
const ROWS: { key: RowKey; label: string; signal: boolean }[] = [
  { key: "landPct", label: "Share of agri land", signal: false },
  { key: "vegPct", label: "Share of vegetable output", signal: true },
  { key: "fruitPct", label: "Share of fruit output", signal: true },
  { key: "cerealPct", label: "Share of cereal output", signal: true },
];

export default function SmallholderDonut() {
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const wrapRef = useRef<HTMLDivElement>(null);
  const data = ledger.smallholderOutput;

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const bars = rowRefs.current.filter(Boolean) as HTMLDivElement[];

    if (prefersReducedMotion) {
      gsap.set(bars, { scaleX: 1 });
      return;
    }

    gsap.set(bars, { scaleX: 0 });

    const ctx = gsap.context(() => {
      bars.forEach((bar, i) => {
        gsap.to(bar, {
          scaleX: 1,
          duration: 0.8,
          delay: i * 0.1,
          ease: gsap.parseEase("wane-out") ? "wane-out" : "power3.out",
          scrollTrigger: {
            trigger: wrapRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        });
      });
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef}>
      <div className="micro-label mb-g3 text-center">
        Smallholders&apos; share of output vs land
      </div>

      <div className="flex flex-col gap-g3">
        {ROWS.map((row, i) => {
          const pct = data[row.key];
          return (
            <div key={row.key} className="flex flex-col gap-1.5">
              <div className="flex items-baseline justify-between">
                <span className="micro-label normal-case tracking-normal text-sm text-text">
                  {row.label}
                </span>
                <span
                  className={`font-mono text-fs-2 ${
                    row.signal ? "text-signal" : "text-muted"
                  }`}
                >
                  {pct}%
                </span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-[2px] bg-white/5">
                <div
                  ref={(el) => {
                    rowRefs.current[i] = el;
                  }}
                  className="h-full origin-left rounded-[2px]"
                  style={{
                    width: `${pct}%`,
                    background: row.signal ? "var(--signal)" : "var(--muted)",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-g4 max-w-[52ch] text-center text-xs text-muted">
        44% of land grows 70% of the vegetables, 55% of the fruits, 52% of
        the cereals. The mismatch is the whole argument.
      </p>
    </div>
  );
}
