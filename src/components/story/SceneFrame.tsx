"use client";

import type { RefObject } from "react";

import { prefersReducedMotion, setupGsap, useGSAP } from "@/components/motion/gsap";

interface SceneFrameProps {
  sceneKey: string;
  frameRef: RefObject<HTMLDivElement | null>;
  children: React.ReactNode;
}

/** Mỗi cảnh hiện ra mềm: trôi lên, mờ dần rõ, các phần tử con nở theo thứ tự. */
export function SceneFrame({ sceneKey, frameRef, children }: SceneFrameProps) {
  useGSAP(
    () => {
      const gsap = setupGsap();
      const root = frameRef.current;
      if (!root || prefersReducedMotion()) {
        return;
      }
      const kids = Array.from(root.querySelectorAll<HTMLElement>("[data-scene]"));
      gsap.fromTo(root, { opacity: 0, y: 28, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out" });
      if (kids.length > 0) {
        gsap.from(kids, { opacity: 0, y: 16, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.12 });
      }
    },
    { scope: frameRef, dependencies: [sceneKey] },
  );
  return (
    <div ref={frameRef} key={sceneKey} className="relative z-10 w-full max-w-lg will-change-transform">
      {children}
    </div>
  );
}
