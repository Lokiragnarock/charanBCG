"use client";

import { useEffect } from "react";
import { useSceneStore } from "@/lib/store";

const SCENES = [
  { id: "s1", label: "S1 · Cold Open" },
  { id: "s2", label: "S2 · The Chain" },
  { id: "s3", label: "S3 · Living Model" },
  { id: "s4", label: "S4 · Sweet Spot" },
  { id: "s5", label: "S5 · Footnotes" },
];

export default function SceneIndex() {
  const active = useSceneStore((s) => s.active);
  const setActive = useSceneStore((s) => s.setActive);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    SCENES.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [setActive]);

  return (
    <nav
      aria-label="Scene index"
      className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-5 lg:flex"
    >
      {SCENES.map((scene) => (
        <a
          key={scene.id}
          href={`#${scene.id}`}
          className="group flex items-center gap-3"
        >
          <span
            className={`h-1.5 w-1.5 shrink-0 rounded-full border transition-colors ${
              active === scene.id
                ? "border-signal bg-signal"
                : "border-hairline bg-transparent group-hover:border-muted"
            }`}
          />
          <span
            className={`micro-label whitespace-nowrap opacity-0 transition-opacity duration-200 group-hover:opacity-100 ${
              active === scene.id ? "text-signal" : ""
            }`}
          >
            {scene.label}
          </span>
        </a>
      ))}
    </nav>
  );
}
