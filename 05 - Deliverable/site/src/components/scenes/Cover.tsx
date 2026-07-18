"use client";

import Reveal from "@/components/Reveal";
import Cite from "@/components/Cite";
import { ledger } from "@/lib/ledger";

const { bananaFarmerShare } = ledger;

/** The consumer keeps the reciprocal — everyone else in the chain, combined. */
const farmerKeepsRounded = Math.round(bananaFarmerShare.value);

export default function Cover() {
  return (
    <section
      id="cover"
      className="relative flex min-h-screen w-full flex-col items-center justify-center px-6 pt-[52px] text-center"
    >
      <Reveal>
        <div className="micro-label">BCG OutPrompt &middot; Problem 4</div>
      </Reveal>

      <Reveal delay={0.1} className="relative mt-g5">
        <div aria-hidden className="hero-ray -top-8 left-1/2 -translate-x-1/2" />
        <p className="relative z-[1] font-display text-fs-2 tracking-tight text-muted sm:text-fs-3">
          Of every &#8377;100 paid for a banana,
        </p>
        <div className="relative z-[1] mt-g2 flex items-baseline justify-center gap-3">
          <span className="shine-signal font-mono text-fs-6 leading-[0.88]">
            &#8377;{farmerKeepsRounded}
          </span>
        </div>
        <p className="relative z-[1] mt-g2 font-display text-fs-2 tracking-tight text-muted sm:text-fs-3">
          is what the farmer keeps.
        </p>
      </Reveal>

      <Reveal delay={0.2} className="mt-g5">
        <p className="font-mono text-sm text-muted">
          {bananaFarmerShare.value}% farmer share &mdash; the lowest of the
          fruits RBI studied
          <Cite id={bananaFarmerShare.source} />
        </p>
      </Reveal>

      <Reveal delay={0.32} className="mt-g6" as="div">
        <a
          href="#problem"
          className="micro-label flex flex-col items-center gap-2 text-muted hover:text-signal"
        >
          Scroll
          <span aria-hidden className="text-lg leading-none">
            &darr;
          </span>
        </a>
      </Reveal>
    </section>
  );
}
