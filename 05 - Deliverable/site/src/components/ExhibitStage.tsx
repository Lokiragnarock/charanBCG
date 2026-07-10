"use client";

import Reveal from "@/components/Reveal";
import Cite from "@/components/Cite";

/**
 * The Exhibit Stage (design-team doctrine): a chart gets a dedicated
 * full-viewport plinth. Micro-label top-left, the chart alone owning
 * center stage, one takeaway line + citation bottom-left. Nothing else
 * competes — the chart IS the paragraph (Pudding rule).
 */
export default function ExhibitStage({
  label,
  takeaway,
  citeId,
  children,
}: {
  label: string;
  takeaway: string;
  citeId?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="relative flex min-h-screen w-full flex-col px-6 py-g6 sm:px-g4">
      <div className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col">
        <Reveal>
          <div className="micro-label">{label}</div>
        </Reveal>

        <div className="flex flex-1 items-center justify-center py-g5">
          <div className="w-full max-w-[720px]">{children}</div>
        </div>

        <Reveal delay={0.1} className="max-w-md">
          <p className="micro-label normal-case tracking-normal text-sm text-muted">
            {takeaway}
            {citeId && <Cite id={citeId} />}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
