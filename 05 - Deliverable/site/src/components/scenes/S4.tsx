"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Reveal from "@/components/Reveal";
import Cite from "@/components/Cite";
import { spectrum } from "@/lib/spectrum";

gsap.registerPlugin(ScrollTrigger);

const CANDIDATES = spectrum.candidates;

const CLIPPINGS = [
  "PepsiCo expands potato contract farming",
  "Suguna widens integrator network",
  "Amul posts record FY25 revenue",
  "Sahyadri Farms crosses Rs 1,950 Cr",
  "Q-commerce ties up dedicated farms",
];

// Band geometry (SVG user units)
const BAND_W = 720;
const BAND_H = 260;
const BAND_CY = BAND_H / 2;
const R_MIN = 12;
const R_MAX = 56;
const PAD_X = R_MAX + 8;

const tamSqrt = CANDIDATES.map((c) => Math.sqrt(c.tamCr));
const TAM_SQRT_MIN = Math.min(...tamSqrt);
const TAM_SQRT_MAX = Math.max(...tamSqrt);

function radiusFor(tamCr: number) {
  const s = Math.sqrt(tamCr);
  const t = (s - TAM_SQRT_MIN) / (TAM_SQRT_MAX - TAM_SQRT_MIN || 1);
  return Math.min(R_MAX, Math.max(R_MIN, R_MIN + t * (R_MAX - R_MIN)));
}

function cxFor(score: number) {
  return PAD_X + score * (BAND_W - 2 * PAD_X);
}

type Placed = { key: string; cx: number; cy: number; r: number };

/** Deterministic vertical-slot layout: greedily place each bubble at the
    first non-overlapping y-offset from band center, trying wider offsets
    outward. Order = descending radius so the big ones claim center first. */
function layoutBubbles(): Placed[] {
  const order = [...CANDIDATES].sort(
    (a, b) => radiusFor(b.tamCr) - radiusFor(a.tamCr)
  );
  const placed: Placed[] = [];
  const offsets = [0, -46, 46, -92, 92, -134, 134, -172, 172, -206];

  order.forEach((c) => {
    const cx = cxFor(c.score);
    const r = radiusFor(c.tamCr);
    let chosen = BAND_CY;
    for (const off of offsets) {
      const cy = Math.min(
        BAND_H - r - 4,
        Math.max(r + 4, BAND_CY + off)
      );
      const collides = placed.some((p) => {
        const dx = p.cx - cx;
        const dy = p.cy - cy;
        return Math.sqrt(dx * dx + dy * dy) < p.r + r + 6;
      });
      if (!collides) {
        chosen = cy;
        break;
      }
      chosen = cy;
    }
    placed.push({ key: c.key, cx, cy: chosen, r });
  });

  return placed;
}

function strokeColorFor(score: number) {
  return `color-mix(in srgb, var(--signal) ${Math.round(
    score * 100
  )}%, var(--danger) ${Math.round((1 - score) * 100)}%)`;
}

export default function S4() {
  const [selectedKey, setSelectedKey] = useState("banana");
  const [hoverKey, setHoverKey] = useState<string | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const bubbleGroupRefs = useRef<Record<string, SVGGElement | null>>({});

  const placements = useMemo(() => layoutBubbles(), []);
  const placeByKey = useMemo(() => {
    const m: Record<string, Placed> = {};
    placements.forEach((p) => (m[p.key] = p));
    return m;
  }, [placements]);

  const activeKey = hoverKey ?? selectedKey;
  const active = CANDIDATES.find((c) => c.key === activeKey) ?? CANDIDATES[0];
  const activePlacement = placeByKey[activeKey];

  // Ascending-score stagger order for entrance (tomato, highest score, last).
  const staggerRank = useMemo(() => {
    const ordered = [...CANDIDATES].sort((a, b) => a.score - b.score);
    const m: Record<string, number> = {};
    ordered.forEach((c, i) => (m[c.key] = i));
    return m;
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const groups = CANDIDATES.map((c) => bubbleGroupRefs.current[c.key]).filter(
      Boolean
    ) as SVGGElement[];

    if (prefersReducedMotion) {
      gsap.set(groups, { opacity: 1, y: 0, filter: "blur(0px)" });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(groups, { opacity: 0, y: 14, filter: "blur(4px)" });
      CANDIDATES.forEach((c) => {
        const g = bubbleGroupRefs.current[c.key];
        if (!g) return;
        gsap.to(g, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.6,
          delay: staggerRank[c.key] * 0.09,
          ease: "wane-out",
          scrollTrigger: {
            trigger: stageRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      });
    }, stageRef);

    return () => ctx.revert();
  }, [staggerRank]);

  return (
    <section
      id="s4"
      className="relative flex min-h-screen w-full flex-col justify-center px-8 py-24 md:px-14"
    >
      <div className="mx-auto w-full max-w-[1200px]">
        <Reveal>
          <div className="micro-label">Scene 4</div>
          <h2 className="font-display mt-3 text-4xl tracking-tight sm:text-5xl">
            The Sweet-Spot Spectrum
          </h2>
          <p className="mt-4 max-w-xl text-muted">
            Ten candidate crops, scored on TAM, incumbent concentration, and
            opening. The scoring is honest — it is not rigged to justify a
            choice: <span className="stat">Banana</span> is our pick on
            strategic fit (the Theni cluster and the e-Choupal coordination
            thesis), not on topping this chart.
          </p>
        </Reveal>

        {/* formula + MOCK badge, above the stage */}
        <Reveal delay={0.06} className="mt-8 flex flex-wrap items-center gap-3">
          <div className="font-mono text-xs text-muted">
            score = sqrt(min(TAM / 1L Cr, 1)) x (1 - top3 share) x opening
          </div>
          <div className="micro-label flex items-center gap-1.5 border border-danger/40 px-2 py-1 text-danger">
            <span aria-hidden>&#9679;</span> MOCK v0
            <Cite id="mock-v0" />
          </div>
        </Reveal>

        {/* Stage / plinth: shared idiom with S3's panel */}
        <Reveal delay={0.12}>
          <div className="panel mt-6 grid grid-cols-1 gap-0 overflow-hidden lg:grid-cols-[1fr_2fr_1fr]">
            {/* Left rail: mock clippings */}
            <div className="border-b border-hairline p-6 lg:border-b-0 lg:border-r">
              <div className="micro-label mb-4">Clippings</div>
              <ul className="flex flex-col gap-3">
                {CLIPPINGS.map((headline) => (
                  <li key={headline} className="text-sm text-muted">
                    <span className="micro-label mr-2 text-danger">MOCK</span>
                    {headline}
                  </li>
                ))}
              </ul>
            </div>

            {/* Center: the spectrum band */}
            <div
              ref={stageRef}
              className="relative flex min-h-[360px] items-center justify-center p-6"
            >

              <div
                aria-hidden
                className="pointer-events-none absolute inset-6 rounded-[2px]"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, color-mix(in srgb, var(--danger) 15%, transparent), color-mix(in srgb, var(--signal) 15%, transparent))",
                }}
              />
              <svg
                viewBox={`0 0 ${BAND_W} ${BAND_H}`}
                className="relative w-full max-w-[720px]"
                role="img"
                aria-label="Sweet-spot spectrum: bubble size is TAM, position is opportunity score, tomato is the recommended crop"
              >
                {/* baseline */}
                <line
                  x1={PAD_X}
                  y1={BAND_CY}
                  x2={BAND_W - PAD_X}
                  y2={BAND_CY}
                  stroke="var(--hairline)"
                  strokeWidth={1}
                />

                {/* callout leader line for the active bubble */}
                {activePlacement && (
                  <g style={{ transition: "opacity 200ms ease-out" }}>
                    <polyline
                      points={`${activePlacement.cx},${
                        activePlacement.cy - activePlacement.r
                      } ${activePlacement.cx},${
                        activePlacement.cy - activePlacement.r - 22
                      } ${activePlacement.cx + 40},${
                        activePlacement.cy - activePlacement.r - 22
                      }`}
                      fill="none"
                      stroke={strokeColorFor(active.score)}
                      strokeWidth={1.5}
                    />
                    <text
                      x={activePlacement.cx + 46}
                      y={activePlacement.cy - activePlacement.r - 18}
                      className="font-mono"
                      style={{ fontSize: 13, fill: strokeColorFor(active.score) }}
                    >
                      {active.label}, score {active.score.toFixed(2)}
                      {active.pick ? " — our pick" : ""}
                    </text>
                  </g>
                )}

                {CANDIDATES.map((c) => {
                  const p = placeByKey[c.key];
                  if (!p) return null;
                  const isPick = Boolean(c.pick);
                  const isActive = c.key === activeKey;
                  const showLabel = p.r >= 20;
                  const dimmed = hoverKey !== null && !isActive;
                  return (
                    <g
                      key={c.key}
                      ref={(el) => {
                        bubbleGroupRefs.current[c.key] = el;
                      }}
                    >
                      <circle
                        cx={p.cx}
                        cy={p.cy}
                        r={p.r}
                        fill="transparent"
                        stroke={strokeColorFor(c.score)}
                        strokeWidth={isActive ? 2 : 1.5}
                        style={{
                          opacity: dimmed ? 0.45 : 1,
                          transition: "opacity 200ms ease-out, stroke-width 200ms ease-out",
                          ...(isPick
                            ? {
                                filter:
                                  "drop-shadow(0 0 10px color-mix(in srgb, var(--signal) 70%, transparent))",
                              }
                            : undefined),
                        }}
                        className="cursor-pointer"
                        onMouseEnter={() => setHoverKey(c.key)}
                        onMouseLeave={() => setHoverKey(null)}
                        onClick={() => setSelectedKey(c.key)}
                        tabIndex={0}
                        role="button"
                        aria-label={`${c.label}, score ${c.score.toFixed(2)}${
                          isPick ? ", our pick" : ""
                        }`}
                        onFocus={() => setHoverKey(c.key)}
                        onBlur={() => setHoverKey(null)}
                      />
                      {isPick && !isActive && (
                        <text
                          x={p.cx}
                          y={p.cy - p.r - 8}
                          textAnchor="middle"
                          className="pointer-events-none font-mono uppercase"
                          style={{
                            fontSize: 9,
                            letterSpacing: "0.1em",
                            fill: "var(--signal)",
                            opacity: hoverKey !== null ? 0.45 : 1,
                          }}
                        >
                          our pick
                        </text>
                      )}
                      {showLabel && (
                        <text
                          x={p.cx}
                          y={p.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className="pointer-events-none font-mono"
                          style={{
                            fontSize: 11,
                            fill: "var(--text)",
                            opacity: dimmed ? 0.45 : 1,
                            transition: "opacity 200ms ease-out",
                          }}
                        >
                          {c.label.split(" ")[0].split("/")[0]}
                        </text>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Right rail: detail panel for the active candidate */}
            <div className="border-t border-hairline p-6 lg:border-t-0 lg:border-l">
              <div className="micro-label mb-4 flex items-center gap-2">
                {active.label}
                <Cite id={active.source} />
                {active.pick && (
                  <span className="border border-signal/40 px-1.5 py-0.5 text-[9px] text-signal">
                    OUR PICK
                  </span>
                )}
              </div>

              {active.cluster && (
                <div className="mb-4 border-l-2 border-signal/50 pl-3">
                  <div className="micro-label mb-1 text-[10px]">
                    Segment / cluster
                    {active.clusterSource && <Cite id={active.clusterSource} />}
                  </div>
                  <div className="font-mono text-sm text-signal">
                    {active.cluster}
                  </div>
                  {active.clusterNote && (
                    <p className="mt-1 text-xs text-muted">
                      {active.clusterNote}
                    </p>
                  )}
                </div>
              )}

              <div className="mb-4">
                <div className="micro-label mb-1 text-[10px]">
                  TAM (Rs Cr/yr) <span className="text-danger">est.</span>
                </div>
                <div className="font-mono text-2xl text-text">
                  {active.tamCr.toLocaleString("en-IN")}
                </div>
              </div>

              <div className="mb-4">
                <div className="micro-label mb-1 text-[10px]">
                  Top-3 share, {active.top3Pct}%
                </div>
                <div className="h-2 w-full overflow-hidden rounded-[2px] bg-white/5">
                  <div
                    className="h-full"
                    style={{
                      width: `${active.top3Pct}%`,
                      background: "var(--danger)",
                    }}
                  />
                </div>
                <ul className="mt-2 flex flex-col gap-0.5">
                  {active.top3.map((name) => (
                    <li key={name} className="text-xs text-muted">
                      {name}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-4 flex gap-6">
                <div>
                  <div className="micro-label mb-1 text-[10px]">Opening</div>
                  <div className="font-mono text-lg text-signal">
                    {active.opening.toFixed(2)}
                  </div>
                </div>
                <div>
                  <div className="micro-label mb-1 text-[10px]">
                    Farmer share
                  </div>
                  <div className="font-mono text-lg text-signal">
                    {active.farmerShare}%
                    {active.farmerShareSource && (
                      <Cite id={active.farmerShareSource} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
