"use client";

import { useRef } from "react";

import { prefersReducedMotion, setupGsap, useGSAP } from "@/components/motion/gsap";

interface SceneFrameProps {
  sceneKey: string;
  children: React.ReactNode;
}

/** Mỗi cảnh hiện ra mềm: trôi lên, mờ dần rõ, các phần tử con nở theo thứ tự. */
export function SceneFrame({ sceneKey, children }: SceneFrameProps) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const gsap = setupGsap();
      const root = ref.current;
      if (!root || prefersReducedMotion()) {
        return;
      }
      const kids = Array.from(root.querySelectorAll<HTMLElement>("[data-scene]"));
      gsap.from(root, { opacity: 0, y: 24, duration: 0.8, ease: "power3.out" });
      if (kids.length > 0) {
        gsap.from(kids, { opacity: 0, y: 18, scale: 0.98, duration: 0.9, stagger: 0.12, ease: "power3.out", delay: 0.15 });
      }
    },
    { scope: ref, dependencies: [sceneKey] },
  );
  return (
    <div ref={ref} key={sceneKey} className="relative z-10 w-full max-w-lg">
      {children}
    </div>
  );
}
