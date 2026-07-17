import SmoothScroll from "@/components/SmoothScroll";
import ExhibitStage from "@/components/ExhibitStage";
import SmallholderDonut from "@/components/charts/SmallholderDonut";
import Cover from "@/components/scenes/Cover";
import WhyBananaTheni from "@/components/scenes/WhyBananaTheni";
import ProblemNational from "@/components/scenes/ProblemNational";
import SweetSpotTable from "@/components/scenes/SweetSpotTable";
import ValueChain from "@/components/scenes/ValueChain";
import Close from "@/components/scenes/Close";
import { ledger } from "@/lib/ledger";

export default function Home() {
  return (
    <SmoothScroll>
      <main className="relative">
        <Cover />
        <WhyBananaTheni />
        <ProblemNational />
        <ExhibitStage
          label="Small farms, most of the food"
          takeaway={`Smallholders farm ${ledger.smallholderOutput.landPct}% of India's agricultural land, yet grow the majority of its vegetables, fruits, and cereals.`}
          citeId={ledger.smallholderOutput.source}
        >
          <SmallholderDonut />
        </ExhibitStage>
        <SweetSpotTable />
        <ValueChain />
        <Close />
      </main>
    </SmoothScroll>
  );
}
