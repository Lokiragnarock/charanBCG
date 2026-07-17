import Link from "next/link";
import Reveal from "@/components/Reveal";
import History from "@/components/scenes/History";
import S2 from "@/components/scenes/S2";

export const metadata = {
  title: "History & Precedents — The Banana Case",
};

export default function HistoryPage() {
  return (
    <main className="relative min-h-screen w-full pt-[52px]">
      <History />
      <S2 />
      <div className="mx-auto w-full max-w-[1200px] px-6 pb-24">
        <Reveal className="flex flex-wrap items-center justify-between gap-4 border-t border-hairline pt-8">
          <p className="text-sm text-muted">
            Next: which cluster earns the right to run this model.
          </p>
          <Link
            href="/clusters"
            className="micro-label border border-hairline px-4 py-2 text-muted transition-colors duration-150 hover:border-signal hover:text-signal"
          >
            The Clusters &rarr;
          </Link>
        </Reveal>
      </div>
    </main>
  );
}
