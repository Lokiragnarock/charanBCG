"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { spectrum } from "@/lib/spectrum";

gsap.registerPlugin(ScrollTrigger);

const CLUSTERS = spectrum.clusters;

const BAND_W = 860;
const BAND_H = 360;
const BAND_CY = BAND_H / 2;
const R_MIN = 16;
const R_MAX = 62;
const LABEL_INSIDE_MIN_R = 22;
const PAD_X = R_MAX + 24;

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

type Placed = {
  key: string;
  cx: number;
  cy: number;
  r: number;
  labelOutside: boolean;
  labelSide: "below" | "above";
};

/** Deterministic vertical-slot layout. Small bubbles (label goes outside)
    reserve extra clearance in the collision check so external labels never
    overlap a neighboring bubble or its own label. */
function layoutBubbles(): Placed[] {
  const order = [...CLUSTERS].sort(
    (a, b) => radiusFor(b.marketSurplusLMt) - radiusFor(a.marketSurplusLMt)
  );
  const placed: Placed[] = [];
  const offsets = [0, -60, 60, -120, 120, -170, 170, -220, 220];

  order.forEach((c) => {
    const cx = cxFor(c.delta);
    const r = radiusFor(c.marketSurplusLMt);
    const labelOutside = r < LABEL_INSIDE_MIN_R;
    // Alternate label side so consecutive small bubbles at similar y don't
    // stack their external labels into each other.
    const labelSide: "below" | "above" = placed.length % 2 === 0 ? "below" : "above";
    const clearance = labelOutside ? r + 26 : r + 8;

    let chosen = BAND_CY;
    for (const off of offsets) {
      const cy = Math.min(BAND_H - r - 34, Math.max(r + 34, BAND_CY + off));
      const collides = placed.some((p) => {
        const dx = p.cx - cx;
        const dy = p.cy - cy;
        const pClear = p.labelOutside ? p.r + 26 : p.r + 8;
        return Math.sqrt(dx * dx + dy * dy) < pClear + clearance;
      });
      if (!collides) {
        chosen = cy;
        break;
      }
      chosen = cy;
    }
    placed.push({ key: c.key, cx, cy: chosen, r, labelOutside, labelSide });
  });

  return placed;
}

function strokeColorFor(delta: number) {
  return `color-mix(in srgb, var(--signal) ${Math.round(
    delta * 100
  )}%, var(--danger) ${Math.round((1 - delta) * 100)}%)`;
}

/**
 * The sweet-spot bubble map — the hero visualization, not a fallback.
 * Circle area = marketable surplus, x-position = modelled opportunity
 * delta (red -> green). Direct labels only: inside the circle when it's
 * large enough, otherwise placed clear above/below with a short hairline
 * tick — never a leader line crossing another bubble, never a detached
 * legend. `interactive=false` renders a static beauty-shot (no click/hover
 * wiring) for the main-page exhibit; `interactive=true` (default) drives
 * external selection state for the /clusters two-panel explorer.
 */
export default function ClusterBubbleMap({
  selectedKey,
  onSelect,
  interactive = true,
}: {
  selectedKey?: string;
  onSelect?: (key: string) => void;
  interactive?: boolean;
}) {
  const [hoverKey, setHoverKey] = useState<string | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const bubbleGroupRefs = useRef<Record<string, SVGGElement | null>>({});

  const placements = useMemo(() => layoutBubbles(), []);
  const placeByKey = useMemo(() => {
    const m: Record<string, Placed> = {};
    placements.forEach((p) => (m[p.key] = p));
    return m;
  }, [placements]);

  const pickKey = CLUSTERS.find((c) => c.pick)?.key ?? CLUSTERS[0].key;
  const activeKey = interactive ? hoverKey ?? selectedKey ?? pickKey : pickKey;

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
      gsap.to(groups, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.6,
        stagger: 0.06,
        ease: "wane-out",
        scrollTrigger: {
          trigger: stageRef.current,
          start: "top 82%",
          toggleActions: "play none none none",
        },
      });
    }, stageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={stageRef}
      className="relative flex min-h-[380px] items-center justify-center overflow-x-auto p-6 sm:p-10"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-6 rounded-[2px] sm:inset-10"
        style={{
          backgroundImage:
            "linear-gradient(90deg, color-mix(in srgb, var(--danger) 12%, transparent), color-mix(in srgb, var(--signal) 12%, transparent))",
        }}
      />
      <svg
        viewBox={`0 0 ${BAND_W} ${BAND_H}`}
        className="relative w-full min-w-[640px] max-w-[900px]"
        role="img"
        aria-label="Sweet-spot spectrum: bubble area is marketable surplus, x-position is the modelled opportunity delta from red (concentrated, low surplus) to green (Theni, our pick)"
      >
        <line
          x1={PAD_X}
          y1={BAND_CY}
          x2={BAND_W - PAD_X}
          y2={BAND_CY}
          stroke="var(--hairline)"
          strokeWidth={1}
        />
        <text x={PAD_X} y={BAND_H - 14} className="font-mono" style={{ fontSize: 10, fill: "var(--danger)", opacity: 0.7 }}>
          concentrated / low surplus
        </text>
        <text x={BAND_W - PAD_X} y={BAND_H - 14} textAnchor="end" className="font-mono" style={{ fontSize: 10, fill: "var(--signal)", opacity: 0.85 }}>
          open / efficient / GI headroom
        </text>

        {CLUSTERS.map((c) => {
          const p = placeByKey[c.key];
          if (!p) return null;
          const isPick = Boolean(c.pick);
          const isActive = c.key === activeKey;
          const dimmed = interactive && hoverKey !== null && !isActive;
          const labelY = p.labelSide === "below" ? p.cy + p.r + 16 : p.cy - p.r - 12;
          const tickY1 = p.labelSide === "below" ? p.cy + p.r : p.cy - p.r;
          const tickY2 = p.labelSide === "below" ? p.cy + p.r + 8 : p.cy - p.r - 8;

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
                fill={
                  isPick
                    ? "color-mix(in srgb, var(--signal) 14%, transparent)"
                    : "transparent"
                }
                stroke={strokeColorFor(c.delta)}
                strokeWidth={isActive ? 2.5 : 1.5}
                style={{
                  opacity: dimmed ? 0.4 : 1,
                  transition: "opacity 200ms ease-out, stroke-width 200ms ease-out",
                  ...(isPick
                    ? {
                        filter:
                          "drop-shadow(0 0 14px color-mix(in srgb, var(--signal) 80%, transparent))",
                      }
                    : undefined),
                }}
                className={interactive ? "cursor-pointer" : undefined}
                onMouseEnter={interactive ? () => setHoverKey(c.key) : undefined}
                onMouseLeave={interactive ? () => setHoverKey(null) : undefined}
                onClick={interactive ? () => onSelect?.(c.key) : undefined}
                tabIndex={interactive ? 0 : -1}
                role={interactive ? "button" : undefined}
                aria-label={`${c.label}, delta ${c.delta.toFixed(2)}${
                  isPick ? ", our pick" : ""
                }`}
                onFocus={interactive ? () => setHoverKey(c.key) : undefined}
                onBlur={interactive ? () => setHoverKey(null) : undefined}
                onKeyDown={
                  interactive
                    ? (e) => {
                        if (e.key === "Enter" || e.key === " ") onSelect?.(c.key);
                      }
                    : undefined
                }
              />

              {p.labelOutside && (
                <line
                  x1={p.cx}
                  y1={tickY1}
                  x2={p.cx}
                  y2={tickY2}
                  stroke="var(--hairline)"
                  strokeWidth={1}
                  style={{ opacity: dimmed ? 0.3 : 0.7 }}
                />
              )}

              <text
                x={p.cx}
                y={p.labelOutside ? labelY : p.cy - 4}
                textAnchor="middle"
                dominantBaseline={p.labelOutside ? "auto" : "middle"}
                className="pointer-events-none font-mono"
                style={{
                  fontSize: p.labelOutside ? 11 : 12,
                  fill: isPick ? "var(--signal)" : "var(--text)",
                  opacity: dimmed ? 0.4 : 1,
                  transition: "opacity 200ms ease-out",
                }}
              >
                {c.label}
              </text>

              {!p.labelOutside && (
                <text
                  x={p.cx}
                  y={p.cy + 12}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="pointer-events-none font-mono"
                  style={{
                    fontSize: 9,
                    fill: "var(--muted)",
                    opacity: dimmed ? 0.35 : 0.8,
                    transition: "opacity 200ms ease-out",
                  }}
                >
                  {c.marketSurplusLMt} L MT
                </text>
              )}

              {isPick && (
                <text
                  x={p.cx}
                  y={p.labelSide === "below" ? labelY + 15 : labelY - 15}
                  textAnchor="middle"
                  className="pointer-events-none font-mono uppercase"
                  style={{
                    fontSize: 9,
                    letterSpacing: "0.1em",
                    fill: "var(--signal)",
                    opacity: dimmed ? 0.5 : 1,
                  }}
                >
                  our pick
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
