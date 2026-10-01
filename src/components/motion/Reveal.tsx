"use client";

import { useRef } from "react";

import { ScrollTrigger, prefersReducedMotion, setupGsap, useGSAP } from "@/components/motion/gsap";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section";
}

/**
 * Mọi phần tử con có `data-reveal` sẽ hiện dần khi cuộn tới.
 * `data-reveal="up" | "left" | "right" | "scale"` chọn hướng.
 */
export function Reveal({ children, className, as = "div" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const gsap = setupGsap();
      const root = ref.current;
      if (!root) {
        return;
      }
      const items = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
      if (prefersReducedMotion()) {
        gsap.set(items, { opacity: 1 });
        return;
      }
      items.forEach((el) => gsap.set(el, fromFor(el.dataset.reveal)));
      ScrollTrigger.batch(items, {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            stagger: 0.12,
            overwrite: true,
          }),
      });
    },
    { scope: ref },
  );
  const Tag = as;
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

function fromFor(kind: string | undefined): gsap.TweenVars {
  switch (kind) {
    case "left":
      return { opacity: 0, x: -40 };
    case "right":
      return { opacity: 0, x: 40 };
    case "scale":
      return { opacity: 0, scale: 0.92 };
    default:
      return { opacity: 0, y: 36 };
  }
}
