import SmoothScroll from "@/components/SmoothScroll";
import SceneIndex from "@/components/SceneIndex";
import S1 from "@/components/scenes/S1";
import S2 from "@/components/scenes/S2";
import S3 from "@/components/scenes/S3";
import S4 from "@/components/scenes/S4";
import S5 from "@/components/scenes/S5";

export default function Home() {
  return (
    <SmoothScroll>
      <SceneIndex />
      <main className="relative">
        <S1 />
        <S2 />
        <S3 />
        <S4 />
        <S5 />
      </main>
    </SmoothScroll>
  );
}
