import SmoothScroll from "@/components/SmoothScroll";
import ExhibitStage from "@/components/ExhibitStage";
import SmallholderDonut from "@/components/charts/SmallholderDonut";
import S1 from "@/components/scenes/S1";
import S2 from "@/components/scenes/S2";
import S3 from "@/components/scenes/S3";
import S4 from "@/components/scenes/S4";
import S5 from "@/components/scenes/S5";
import { ledger } from "@/lib/ledger";

export default function Home() {
  return (
    <SmoothScroll>
      <main className="relative">
        <S1 />
        <ExhibitStage
          label="Small farms, most of the food"
          takeaway={`Smallholders farm ${ledger.smallholderOutput.landPct}% of India's agricultural land — and grow the majority of its vegetables, fruits, and cereals.`}
          citeId={ledger.smallholderOutput.source}
        >
          <div className="mx-auto w-full max-w-[420px]">
            <SmallholderDonut />
          </div>
        </ExhibitStage>
        <S2 />
        <S3 />
        <S4 />
        <S5 />
      </main>
    </SmoothScroll>
  );
}
