"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { CustomEase } from "gsap/dist/CustomEase";

gsap.registerPlugin(ScrollTrigger, CustomEase);

// Emil-law easing curves, registered once as named GSAP eases so every
// scroll reveal in the app "wanes in" on the same curve.
// M0,0 C x1,y1 x2,y2 1,1  <=>  cubic-bezier(x1,y1,x2,y2)
if (!gsap.parseEase("wane-out")) {
  CustomEase.create("wane-out", "M0,0 C0.23,1 0.32,1 1,1");
}

export default function Reveal({
  children,
  className = "",
  delay = 0,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "span" | "li";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      // Reduced motion: opacity-only, no translate, no blur.
      const ctx = gsap.context(() => {
        gsap.fromTo(
          el,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.3,
            delay,
            ease: "power1.out",
            scrollTrigger: {
              trigger: el,
              start: "top 70%",
              toggleActions: "play none none none",
            },
          }
        );
      });
      return () => ctx.revert();
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 16, filter: "blur(4px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.5,
          delay,
          ease: "wane-out",
          scrollTrigger: {
            trigger: el,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => ctx.revert();
  }, [delay]);

  const Tag = as;
  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}
