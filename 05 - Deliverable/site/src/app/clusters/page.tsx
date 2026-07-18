"use client";

import { useState } from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import ClusterBubbleMap from "@/components/ClusterBubbleMap";
import ClusterExplorer from "@/components/ClusterExplorer";
import { spectrum } from "@/lib/spectrum";

export default function ClustersPage() {
  const [selectedKey, setSelectedKey] = useState("tn-c2");

  return (
    <main className="relative min-h-screen w-full px-6 pt-[52px] pb-24">
      <div className="mx-auto w-full max-w-[1200px] py-16">
        <Reveal>
          <div className="micro-label">The full spectrum</div>
          <h1 className="font-display mt-3 text-4xl tracking-tight sm:text-5xl">
            Eight banana clusters
          </h1>
          <p className="mt-4 max-w-2xl text-muted">
            Bubble area is marketable surplus, position is the modelled
            opportunity delta. Select a cluster &mdash; on the map or the
            list below &mdash; to see its supporting documents and the three
            things that decide whether the platform belongs there.
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-4 flex flex-wrap items-center gap-3">
          <div className="font-mono text-xs text-muted">{spectrum.formula}</div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="panel mt-8 overflow-hidden">
            <ClusterBubbleMap selectedKey={selectedKey} onSelect={setSelectedKey} />
          </div>
        </Reveal>

        <div className="mt-10">
          <ClusterExplorer selectedKey={selectedKey} onSelect={setSelectedKey} />
        </div>

        <Reveal delay={0.1} className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-hairline pt-8">
          <p className="text-sm text-muted">
            Next: see how the platform operates inside the selected cluster.
          </p>
          <Link
            href="/platform"
            className="micro-label border border-hairline px-4 py-2 text-muted transition-colors duration-150 hover:border-signal hover:text-signal"
          >
            The Platform &rarr;
          </Link>
        </Reveal>
      </div>
    </main>
  );
}
