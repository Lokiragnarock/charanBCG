"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Reveal from "@/components/Reveal";
import Cite from "@/components/Cite";
import { spectrum, type Cluster } from "@/lib/spectrum";

gsap.registerPlugin(ScrollTrigger);

const CLUSTERS = spectrum.clusters;

// Band geometry (SVG user units)
const BAND_W = 760;
const BAND_H = 280;
const BAND_CY = BAND_H / 2;
const R_MIN = 14;
const R_MAX = 58;
const PAD_X = R_MAX + 10;

const surplusSqrt = CLUSTERS.map((c) => Math.sqrt(c.marketSurplusLMt));
const SURPLUS_SQRT_MIN = Math.min(...surplusSqrt);
const SURPLUS_SQRT_MAX = Math.max(...surplusSqrt);

function radiusFor(surplusLMt: number) {
  const s = Math.sqrt(surplusLMt);
  const t = (s - SURPLUS_SQRT_MIN) / (SURPLUS_SQRT_MAX - SURPLUS_SQRT_MIN || 1);
  return Math.min(R_MAX, Math.max(R_MIN, R_MIN + t * (R_MAX - R_MIN)));
}

function cxFor(delta: number) {
  return PAD_X + delta * (BAND_W - 2 * PAD_X);
}

type Placed = { key: string; cx: number; cy: number; r: number };

/** Deterministic vertical-slot layout, same idiom as the v1 crop spectrum:
    greedily place each bubble at the first non-overlapping y-offset from
    band center, biggest bubbles claim center first. */
function layoutBubbles(): Placed[] {
  const order = [...CLUSTERS].sort(
    (a, b) => radiusFor(b.marketSurplusLMt) - radiusFor(a.marketSurplusLMt)
  );
  const placed: Placed[] = [];
  const offsets = [0, -50, 50, -100, 100, -150, 150, -195, 195];

  order.forEach((c) => {
    const cx = cxFor(c.delta);
    const r = radiusFor(c.marketSurplusLMt);
    let chosen = BAND_CY;
    for (const off of offsets) {
      const cy = Math.min(BAND_H - r - 6, Math.max(r + 6, BAND_CY + off));
      const collides = placed.some((p) => {
        const dx = p.cx - cx;
        const dy = p.cy - cy;
        return Math.sqrt(dx * dx + dy * dy) < p.r + r + 8;
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

function strokeColorFor(delta: number) {
  return `color-mix(in srgb, var(--signal) ${Math.round(
    delta * 100
  )}%, var(--danger) ${Math.round((1 - delta) * 100)}%)`;
}

const GI_LABEL: Record<Cluster["giStatus"], string> = {
  none: "No GI tag",
  monetized: "GI, monetized",
  "unmonetized-hill": "GI, unmonetized",
  "unmonetized-local": "GI, unmarketed",
};

type Overlay = "competition" | "commission";

export default function S4() {
  const [selectedKey, setSelectedKey] = useState("tn-c2");
  const [hoverKey, setHoverKey] = useState<string | null>(null);
  const [overlay, setOverlay] = useState<Overlay>("competition");
  const stageRef = useRef<HTMLDivElement>(null);
  const bubbleGroupRefs = useRef<Record<string, SVGGElement | null>>({});

  const placements = useMemo(() => layoutBubbles(), []);
  const placeByKey = useMemo(() => {
    const m: Record<string, Placed> = {};
    placements.forEach((p) => (m[p.key] = p));
    return m;
  }, [placements]);

  const activeKey = hoverKey ?? selectedKey;
  const active = CLUSTERS.find((c) => c.key === activeKey) ?? CLUSTERS[0];
  const activePlacement = placeByKey[activeKey];

  // Ascending-delta stagger order for entrance (Theni, the pick, lands last).
  const staggerRank = useMemo(() => {
    const ordered = [...CLUSTERS].sort((a, b) => a.delta - b.delta);
    const m: Record<string, number> = {};
    ordered.forEach((c, i) => (m[c.key] = i));
    return m;
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const groups = CLUSTERS.map((c) => bubbleGroupRefs.current[c.key]).filter(
      Boolean
    ) as SVGGElement[];

    if (prefersReducedMotion) {
      gsap.set(groups, { opacity: 1, y: 0, filter: "blur(0px)" });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(groups, { opacity: 0, y: 14, filter: "blur(4px)" });
      CLUSTERS.forEach((c) => {
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
            Eight real banana clusters, scored on an efficiency floor and GI
            headroom &mdash; not on crop choice. Banana is already decided;
            this is <span className="stat">why Theni</span>, inside banana.
          </p>
        </Reveal>

        {/* formula, above the stage */}
        <Reveal delay={0.06} className="mt-8 flex flex-wrap items-center gap-3">
          <div className="font-mono text-xs text-muted">{spectrum.formula}</div>
          <Cite id={CLUSTERS[0].source} />
        </Reveal>

        {/* Stage / plinth: shared idiom with S3's panel */}
        <Reveal delay={0.12}>
          <div className="panel mt-6 grid grid-cols-1 gap-0 overflow-hidden lg:grid-cols-[1fr_2fr_1fr]">
            {/* Left rail: toggles/filters */}
            <div className="border-b border-hairline p-6 lg:border-b-0 lg:border-r">
              <div className="micro-label mb-4">Overlay</div>
              <div
                role="group"
                aria-label="Bubble overlay"
                className="flex gap-1 border border-hairline p-1"
              >
                {(["competition", "commission"] as Overlay[]).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    aria-pressed={overlay === mode}
                    onClick={() => setOverlay(mode)}
                    className={`micro-label flex-1 px-2 py-1.5 text-[10px] transition-colors duration-150 ${
                      overlay === mode
                        ? "bg-signal/15 text-signal"
                        : "text-muted hover:text-text"
                    }`}
                  >
                    {mode === "competition" ? "Competition" : "Commission rate"}
                  </button>
                ))}
              </div>
              <p className="mt-3 text-xs text-muted">
                {overlay === "competition"
                  ? "Corporate direct-sourcing % and input-monopoly presence, per cluster."
                  : "Commission rate charged to traders — TN clusters vs the rest of India."}
              </p>

              <div className="mt-6 border-t border-hairline pt-4">
                <div className="micro-label mb-2 text-[10px]">
                  Constants (do not differentiate clusters)
                </div>
                <ul className="flex flex-col gap-1 text-xs text-muted">
                  <li>
                    Ripening &#8377;{spectrum.constants.ripeningPerKg}/kg
                    everywhere
                  </li>
                  <li>
                    Commission agents{" "}
                    {spectrum.constants.commissionAgentVolumeSharePctLow}&ndash;
                    {spectrum.constants.commissionAgentVolumeSharePctHigh}% of
                    farmer volume everywhere
                    <Cite id={spectrum.constants.source} />
                  </li>
                </ul>
              </div>

              <div className="mt-6 border-t border-hairline pt-4">
                <div className="micro-label mb-2 text-[10px]">
                  Commission rate by region
                  <Cite id={spectrum.commissionRate.source} />
                </div>
                <div className="flex items-baseline gap-3">
                  <div className="font-mono text-lg text-danger">
                    {spectrum.commissionRate.tnPct}%
                  </div>
                  <div className="micro-label text-[9px]">TN clusters</div>
                </div>
                <div className="mt-1 flex items-baseline gap-3">
                  <div className="font-mono text-lg text-text">
                    {spectrum.commissionRate.northPctLow}&ndash;
                    {spectrum.commissionRate.northPctHigh}%
                  </div>
                  <div className="micro-label text-[9px]">Everywhere else</div>
                </div>
              </div>
            </div>

            {/* Center: the spectrum band */}
            <div
              ref={stageRef}
              className="relative flex min-h-[380px] items-center justify-center p-6"
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
                className="relative w-full max-w-[760px]"
                role="img"
                aria-label="Sweet-spot spectrum: bubble size is marketable surplus, position is modelled opportunity delta, Theni (TN C2) is the selected cluster"
              >
                <line
                  x1={PAD_X}
                  y1={BAND_CY}
                  x2={BAND_W - PAD_X}
                  y2={BAND_CY}
                  stroke="var(--hairline)"
                  strokeWidth={1}
                />

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
                      stroke={strokeColorFor(active.delta)}
                      strokeWidth={1.5}
                    />
                    <text
                      x={activePlacement.cx + 46}
                      y={activePlacement.cy - activePlacement.r - 18}
                      className="font-mono"
                      style={{ fontSize: 13, fill: strokeColorFor(active.delta) }}
                    >
                      {active.label}, &Delta; {active.delta.toFixed(2)}
                      {active.pick ? " — selected" : ""}
                    </text>
                  </g>
                )}

                {CLUSTERS.map((c) => {
                  const p = placeByKey[c.key];
                  if (!p) return null;
                  const isPick = Boolean(c.pick);
                  const isActive = c.key === activeKey;
                  const showLabel = p.r >= 20;
                  const dimmed = hoverKey !== null && !isActive;
                  const overlayText =
                    overlay === "competition"
                      ? c.inputMonopoly
                        ? "input monopoly"
                        : c.directSourcingPct
                        ? `${c.directSourcingPct}% direct`
                        : "no organized buyer"
                      : c.commissionRatePct
                      ? `${c.commissionRatePct}%`
                      : `${spectrum.commissionRate.northPctLow}–${spectrum.commissionRate.northPctHigh}%`;
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
                        stroke={strokeColorFor(c.delta)}
                        strokeWidth={isActive ? 2 : 1.5}
                        style={{
                          opacity: dimmed ? 0.45 : 1,
                          transition:
                            "opacity 200ms ease-out, stroke-width 200ms ease-out",
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
                        aria-label={`${c.label}, delta ${c.delta.toFixed(2)}${
                          isPick ? ", selected cluster" : ""
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
                          selected
                        </text>
                      )}
                      {showLabel && (
                        <text
                          x={p.cx}
                          y={p.cy - 4}
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
                          {c.label}
                        </text>
                      )}
                      {showLabel && (
                        <text
                          x={p.cx}
                          y={p.cy + 11}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className="pointer-events-none font-mono"
                          style={{
                            fontSize: 8,
                            fill: "var(--muted)",
                            opacity: dimmed ? 0.35 : 0.8,
                            transition: "opacity 200ms ease-out",
                          }}
                        >
                          {overlayText}
                        </text>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Right rail: detail panel for the active cluster */}
            <div className="border-t border-hairline p-6 lg:border-t-0 lg:border-l">
              <div className="micro-label mb-1 flex items-center gap-2">
                {active.label}
                <Cite id={active.source} />
                {active.pick && (
                  <span className="border border-signal/40 px-1.5 py-0.5 text-[9px] text-signal">
                    SELECTED
                  </span>
                )}
              </div>
              <div className="mb-4 text-xs text-muted">{active.region}</div>

              <div className="mb-4 grid grid-cols-2 gap-3">
                <div>
                  <div className="micro-label mb-1 text-[10px]">
                    Post-harvest loss
                  </div>
                  <div
                    className={`font-mono text-2xl ${
                      active.postHarvestLossPct <= 9
                        ? "text-signal"
                        : "text-danger"
                    }`}
                  >
                    {active.postHarvestLossPct}%
                  </div>
                  {active.postHarvestLossNote && (
                    <p className="mt-1 text-[11px] text-muted">
                      {active.postHarvestLossNote}
                    </p>
                  )}
                </div>
                <div>
                  <div className="micro-label mb-1 text-[10px]">
                    Marketable surplus
                  </div>
                  <div className="font-mono text-2xl text-text">
                    {active.marketSurplusLMt} <span className="text-sm">L MT</span>
                  </div>
                  {active.marketSurplusFlag && (
                    <p className="mt-1 text-[11px] text-danger/90">
                      &#9888; {active.marketSurplusFlag}
                    </p>
                  )}
                  {active.marketSurplusReconcileNote && (
                    <p className="mt-1 text-[11px] text-danger/90">
                      &#9888; {active.marketSurplusReconcileNote}
                      <Cite id={active.marketSurplusReconcileSource!} />
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-4 border-l-2 border-signal/50 pl-3">
                <div className="micro-label mb-1 text-[10px]">
                  Port / market connectivity
                  {active.portConnectivitySource && (
                    <Cite id={active.portConnectivitySource} />
                  )}
                </div>
                <p className="text-sm text-text">{active.portConnectivity}</p>
              </div>

              <div className="mb-4 border-l-2 border-hairline pl-3">
                <div className="micro-label mb-1 flex items-center gap-1 text-[10px]">
                  {GI_LABEL[active.giStatus]}
                  {active.giPremiumPct && (
                    <span className="text-signal">
                      +{active.giPremiumPct}%
                    </span>
                  )}
                </div>
                <p className="text-sm text-text">{active.giNote}</p>
              </div>

              <div className="mb-4">
                <div className="micro-label mb-1 text-[10px]">
                  Competition
                </div>
                <p className="text-xs text-muted">{active.competitionLabel}</p>
              </div>

              <div className="mb-4 flex gap-6">
                <div>
                  <div className="micro-label mb-1 text-[10px]">Area</div>
                  <div className="font-mono text-lg text-text">
                    {active.areaKHa} k Ha
                  </div>
                </div>
                <div>
                  <div className="micro-label mb-1 text-[10px]">Delta score</div>
                  <div className="font-mono text-lg text-signal">
                    {active.delta.toFixed(2)}
                  </div>
                </div>
              </div>

              {active.cons && (
                <div className="border-t border-hairline pt-4">
                  <div className="micro-label mb-2 text-[10px] text-danger">
                    Honest cons
                  </div>
                  <ul className="flex flex-col gap-1.5">
                    {active.cons.map((c) => (
                      <li key={c} className="text-xs text-muted">
                        &mdash; {c}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
