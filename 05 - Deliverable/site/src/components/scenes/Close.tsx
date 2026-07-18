"use client";

import Link from "next/link";
import Reveal from "@/components/Reveal";
import Cite from "@/components/Cite";
import { ledger } from "@/lib/ledger";

const { bananaFarmerShare, bananaChainUplift } = ledger;

const CARDS: { href: string; title: string; body: string }[] = [
  {
    href: "/history",
    title: "Read the history",
    body: "ITC e-Choupal, Sahyadri, mango PHC, and the Chinnamanur precedent, in depth.",
  },
  {
    href: "/clusters",
    title: "Explore the clusters",
    body: "All 8 banana clusters, the full spectrum, and Theni's honest cons.",
  },
  {
    href: "/platform",
    title: "See the platform",
    body: "The rerouted chain, the logistics roadmap, and how traceability works.",
  },
  {
    href: "/appendix",
    title: "Check every number",
    body: "Every figure, its source, and the decision log behind this case.",
  },
];

export default function Close() {
  return (
    <section
      id="close"
      className="relative flex min-h-screen w-full flex-col items-center justify-center px-6 py-24 text-center"
    >
      <div className="mx-auto w-full max-w-[1000px]">
        <Reveal>
          <p className="font-mono text-fs-2 leading-tight text-text sm:text-fs-3">
            The farmer keeps {bananaFarmerShare.value}%
            <Cite id={bananaFarmerShare.source} />. A farmer-co-owned chain
            already got it to {bananaChainUplift.modernPct}%.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="mt-g4">
          <p className="mx-auto max-w-[52ch] text-muted">
            Theni is where the efficiency floor and the GI headroom meet.
            The platform is the route there.
          </p>
        </Reveal>

        <Reveal delay={0.2} className="mt-g6 grid grid-cols-1 gap-g3 text-left sm:grid-cols-2">
          {CARDS.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="panel group flex flex-col gap-2 p-g4 transition-colors duration-150 hover:border-signal/50"
            >
              <div className="micro-label text-signal">
                {c.title} &rarr;
              </div>
              <p className="text-sm text-muted group-hover:text-text">
                {c.body}
              </p>
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
