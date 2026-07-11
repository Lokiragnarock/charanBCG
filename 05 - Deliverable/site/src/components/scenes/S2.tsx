"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/Reveal";
import Cite from "@/components/Cite";
import { ledger } from "@/lib/ledger";

const LINKS = [
  {
    id: "L0",
    name: "Data",
    stat: `${ledger.enamSharePct.value}%`,
    detail: "eNAM share of commodity trade",
    citeId: ledger.enamSharePct.source,
  },
  {
    id: "L1",
    name: "Input & credit",
    stat: `${ledger.credit.kccEffectivePct}%`,
    detail: "effective KCC rate vs 36%+ informal",
    citeId: ledger.credit.source,
  },
  {
    id: "L2",
    name: "Advisory",
    stat: `+${ledger.advisory.contractFarmingUpliftPct}%`,
    detail: "net income uplift, contract farming",
    citeId: ledger.advisory.source,
  },
  {
    id: "L3",
    name: "Aggregation",
    stat: `${ledger.holdings.avgHa} ha`,
    detail: "average holding feeding the collection point",
    citeId: ledger.holdings.source,
  },
  {
    id: "L4",
    name: "Grading & storage",
    stat: `${ledger.losses.tomatoPct}%`,
    detail: "post-harvest loss, tomato",
    citeId: ledger.losses.source,
  },
  {
    id: "L5",
    name: "Transport",
    stat: "tbd",
    detail: "₹/kg/km rural haulage",
  },
  {
    id: "L6",
    name: "Wholesale → Retail",
    stat: `₹${ledger.residual.tomato}`,
    detail: ledger.residual.label,
    citeId: ledger.residual.source,
  },
];

/**
 * Folder rack: seven compact folder cards in a row. Each card's "paper"
 * slides up out of the folder on hover (or tap / focus on touch and
 * keyboard), revealing the full stat. One paper out at a time; L3
 * Aggregation sits pulled out by default.
 */
export default function S2() {
  const [activeId, setActiveId] = useState<string | null>("L3");
  // Read in event handlers only — no re-render needed, so a ref suffices.
  const canHover = useRef(true);

  useEffect(() => {
    canHover.current = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
  }, []);

  return (
    <section
      id="s2"
      className="relative flex min-h-screen w-full flex-col justify-center px-6 py-24"
    >
      <div className="mx-auto w-full max-w-[1200px]">
        <Reveal>
          <div className="micro-label">Scene 2</div>
          <h2 className="font-display mt-3 text-4xl tracking-tight sm:text-5xl">
            The Chain
          </h2>
          <p className="mt-4 max-w-xl text-muted">
            Seven links, farmgate to fork. Pull a folder to read its number.
          </p>
        </Reveal>

        {/* headroom above the rack so raised papers never collide with copy */}
        <div className="mt-44 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {LINKS.map((link, i) => {
            const active = activeId === link.id;
            return (
              <Reveal key={link.id} delay={i * 0.05}>
                <div
                  className={`relative h-[120px] ${active ? "z-30" : "z-0"}`}
                >
                  {/* paper: hidden behind the opaque folder front at rest,
                      slides up out of the folder when active */}
                  <div
                    aria-hidden={!active}
                    className="absolute inset-x-1.5 top-1.5 z-0 h-[150px] rounded-[2px] border border-hairline bg-panel p-3"
                    style={{
                      transform: active
                        ? "translateY(-130px)"
                        : "translateY(0)",
                      transition: `transform ${
                        active ? 350 : 250
                      }ms var(--ease-out)`,
                    }}
                  >
                    <div className="font-mono text-2xl text-signal">
                      {link.stat}
                      {link.citeId && <Cite id={link.citeId} />}
                    </div>
                    <div className="micro-label mt-2 normal-case tracking-normal text-[10px] text-muted">
                      {link.detail}
                    </div>
                  </div>

                  {/* folder front: compact, opaque, fixed one-line title slot */}
                  <button
                    type="button"
                    aria-expanded={active}
                    aria-label={`${link.id} ${link.name}: ${link.stat}, ${link.detail}`}
                    onMouseEnter={() => {
                      if (canHover.current) setActiveId(link.id);
                    }}
                    onFocus={() => setActiveId(link.id)}
                    onClick={() => {
                      if (!canHover.current)
                        setActiveId(active ? null : link.id);
                    }}
                    className={`absolute inset-0 z-10 flex w-full cursor-pointer flex-col rounded-[2px] border bg-panel p-3 text-left outline-none transition-colors duration-200 ${
                      active
                        ? "border-signal/60"
                        : "border-hairline hover:border-signal/40"
                    } focus-visible:border-signal`}
                  >
                    <div className="micro-label">{link.id}</div>
                    <div className="mt-2 h-5 overflow-hidden text-ellipsis whitespace-nowrap font-display text-[13px] leading-5">
                      {link.name}
                    </div>
                    <div className="pointer-events-none absolute bottom-2 right-3 font-mono text-xs text-muted opacity-50">
                      {link.stat}
                    </div>
                  </button>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
