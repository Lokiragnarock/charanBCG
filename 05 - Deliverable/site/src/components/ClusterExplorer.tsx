"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import { sources, tagEmoji } from "@/lib/ledger";
import { ledger } from "@/lib/ledger";
import { spectrum, type Cluster } from "@/lib/spectrum";

const CLUSTERS = [...spectrum.clusters].sort((a, b) => b.delta - a.delta);
const JALGAON = spectrum.clusters.find((c) => c.key === "mh-c1")!;

const GI_LABEL: Record<Cluster["giStatus"], string> = {
  none: "No GI tag",
  monetized: "GI, monetized",
  "unmonetized-hill": "GI, unmonetized (hill varieties)",
  "unmonetized-local": "GI, unmarketed (local varieties)",
};

/** Supporting-document source ids for a cluster — dedup, cluster-specific
    extras layered on top of the shared diagnostic source. */
function docsFor(c: Cluster): string[] {
  const ids = new Set<string>([c.source]);
  if (c.commissionRatePct) ids.add(spectrum.commissionRate.source);
  if (c.key === "tn-c2") {
    ids.add("tnau-pauline-ajjan-2014");
    ids.add("gt-deck");
  }
  return Array.from(ids);
}

function competitionWhitespace(c: Cluster) {
  if (c.inputMonopoly) return "Input-supplier monopoly present — whitespace is thin.";
  if (c.directSourcingPct)
    return `${c.directSourcingPct}% corporate direct-sourcing — most volume still open.`;
  return "No organized corporate buyer — the whole cluster is open.";
}

export default function ClusterExplorer({
  selectedKey: controlledKey,
  onSelect,
}: {
  selectedKey?: string;
  onSelect?: (key: string) => void;
} = {}) {
  const [internalKey, setInternalKey] = useState("tn-c2");
  const selectedKey = controlledKey ?? internalKey;
  const setSelectedKey = onSelect ?? setInternalKey;
  const active = CLUSTERS.find((c) => c.key === selectedKey) ?? CLUSTERS[0];
  const docs = docsFor(active);

  return (
    <div>
      {/* Selector: 8 clusters, ranked by delta */}
      <Reveal className="flex flex-wrap gap-2">
        {CLUSTERS.map((c) => (
          <button
            key={c.key}
            type="button"
            onClick={() => setSelectedKey(c.key)}
            aria-pressed={selectedKey === c.key}
            className={`micro-label border px-3 py-2 text-[10px] transition-colors duration-150 ${
              selectedKey === c.key
                ? "border-signal bg-signal/15 text-signal"
                : "border-hairline text-muted hover:border-signal/40 hover:text-text"
            }`}
          >
            {c.label}
            {c.pick && " ★"}
          </button>
        ))}
      </Reveal>

      {/* Two-panel: documents (left) / three components (right) */}
      <Reveal delay={0.08}>
        <div className="panel mt-6 grid grid-cols-1 gap-0 overflow-hidden lg:grid-cols-[1fr_2fr]">
          {/* LEFT: supporting documents */}
          <div className="border-b border-hairline p-6 lg:border-b-0 lg:border-r">
            <div className="micro-label mb-1">{active.label}</div>
            <div className="mb-4 text-xs text-muted">{active.region}</div>
            <div className="micro-label mb-3 text-[10px]">Supporting documents</div>
            <div className="flex flex-col gap-3">
              {docs.map((id) => {
                const s = sources[id];
                if (!s) return null;
                return (
                  <div key={id} className="border-l-2 border-hairline pl-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm leading-none">{tagEmoji[s.tag]}</span>
                      {s.url ? (
                        <a
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-text hover:text-signal"
                        >
                          {s.title}
                        </a>
                      ) : (
                        <span className="text-sm text-text">{s.title}</span>
                      )}
                    </div>
                    <div className="micro-label mt-0.5 text-[9px]">{s.year}</div>
                  </div>
                );
              })}
              {active.giStatus !== "none" && (
                <div className="border-l-2 border-signal/40 pl-3">
                  <div className="text-sm text-text">{GI_LABEL[active.giStatus]}</div>
                  <p className="mt-1 text-xs text-muted">{active.giNote}</p>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: exactly three components + branding strip */}
          <div className="p-6">
            {/* a) Achievable share of market */}
            <div className="mb-6 border-b border-hairline pb-6">
              <div className="micro-label mb-2 text-signal">
                a. Achievable share of market
              </div>
              <div className="flex items-baseline gap-3">
                <div className="font-mono text-3xl text-text">
                  {active.marketSurplusLMt} <span className="text-sm">L MT</span>
                </div>
                <div className="text-xs text-muted">marketable surplus</div>
              </div>
              <div className="mt-2 flex items-baseline gap-3">
                <div className="font-mono text-lg text-muted">
                  {active.delta.toFixed(2)}
                </div>
                <div className="text-xs text-muted">
                  opportunity score (modelled — efficiency &times; GI headroom,
                  not a market-share %)
                </div>
              </div>
            </div>

            {/* b) Delta of improvement */}
            <div className="mb-6 border-b border-hairline pb-6">
              <div className="micro-label mb-2 text-signal">
                b. Delta of improvement
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="font-mono text-xl text-danger">
                    {active.postHarvestLossPct}%
                  </div>
                  <div className="micro-label mt-1 text-[10px]">
                    post-harvest loss
                  </div>
                </div>
                <div>
                  <div className="font-mono text-xl text-danger">
                    {active.commissionRatePct
                      ? `${active.commissionRatePct}%`
                      : `${spectrum.commissionRate.northPctLow}–${spectrum.commissionRate.northPctHigh}%`}
                  </div>
                  <div className="micro-label mt-1 text-[10px]">
                    commission drag
                  </div>
                </div>
              </div>
              <p className="mt-3 text-xs text-muted">{competitionWhitespace(active)}</p>
              {active.key === "tn-c2" && (
                <p className="mt-2 text-xs text-muted">
                  {ledger.theniFpoStructure.theniCount} of{" "}
                  {ledger.theniFpoStructure.clusterTotal} cluster FPOs sit in
                  Theni itself — organized capacity exists but is thin
                  relative to volume.
                </p>
              )}
            </div>

            {/* c) Platform engagement */}
            <div>
              <div className="micro-label mb-2 text-signal">
                c. Platform engagement
              </div>
              <ul className="flex flex-col gap-2 text-sm text-muted">
                <li>
                  Ripening capacity:{" "}
                  {active.ripeningCapacityMt
                    ? `${active.ripeningCapacityMt} MT`
                    : "not reported at cluster level"}
                </li>
                <li>Port / transport: {active.portConnectivity}</li>
                <li>Variety mix: {active.variety}</li>
              </ul>
              {active.cons && (
                <div className="mt-4 border-t border-hairline pt-4">
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
        </div>
      </Reveal>

      {/* Marketing & branding value strip — GI premium precedent */}
      <Reveal delay={0.14} className="mt-6">
        <div className="panel flex flex-wrap items-center justify-between gap-4 p-6">
          <div>
            <div className="micro-label mb-1">Marketing &amp; branding value</div>
            <p className="max-w-[52ch] text-sm text-muted">
              Jalgaon&apos;s monetized GI already proves the mechanism.
              Theni&apos;s Virupakshi and Sirumalai carry the same GI status
              with zero brand recall &mdash; the premium is unclaimed, not
              unavailable.
            </p>
          </div>
          <div className="text-right">
            <div className="font-mono text-3xl text-signal">
              +{JALGAON.giPremiumPct}%
            </div>
            <div className="micro-label mt-1 text-[10px]">
              Jalgaon GI premium
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
