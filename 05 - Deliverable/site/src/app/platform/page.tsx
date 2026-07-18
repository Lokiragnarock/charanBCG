import Link from "next/link";
import Reveal from "@/components/Reveal";
import PlatformHero from "@/components/platform/PlatformHero";
import FPOModel from "@/components/platform/FPOModel";
import OperatingLoop from "@/components/platform/OperatingLoop";

export const metadata = {
  title: "The Platform — The Banana Case",
};

export default function PlatformPage() {
  return (
    <main className="relative min-h-screen w-full px-6 pt-[52px] pb-24">
      <div className="mx-auto w-full max-w-[1200px] py-16">
        <PlatformHero />

        <FPOModel />

        <OperatingLoop />

        {/* WAVE 3: <OwnershipModel />, <SolutionEngine />, etc. go here */}

        <Reveal delay={0.1} className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-hairline pt-8">
          <p className="text-sm text-muted">
            Next: every number on this site, traced to its source.
          </p>
          <Link
            href="/appendix"
            className="micro-label border border-hairline px-4 py-2 text-muted transition-colors duration-150 hover:border-signal hover:text-signal"
          >
            AI Use Case &rarr;
          </Link>
        </Reveal>
      </div>
    </main>
  );
}
