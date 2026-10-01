"use client";

import { useRef } from "react";

import { prefersReducedMotion, setupGsap, useGSAP } from "@/components/motion/gsap";

interface PetalsProps {
  count?: number;
  className?: string;
  tone?: "light" | "dark";
}

const PETAL_PATH =
  "M20 0C30 6 40 18 38 32C36 44 26 52 20 56C14 52 4 44 2 32C0 18 10 6 20 0Z";

const LIGHT = ["#ffd3dd", "#ffc2d0", "#ffe4ea", "#f6b7c6"];
const DARK = ["#e9a3b5", "#d98aa0", "#f4c9d3", "#c86d87"];

/** Cánh hoa rơi chậm, lắc nhẹ, lặp vô hạn. Chỉ trang trí, ẩn với trình đọc màn hình. */
export function Petals({ count = 14, className = "", tone = "light" }: PetalsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const colors = tone === "light" ? LIGHT : DARK;

  useGSAP(
    () => {
      const gsap = setupGsap();
      const root = ref.current;
      if (!root || prefersReducedMotion()) {
        return;
      }
      const petals = Array.from(root.children) as HTMLElement[];
      petals.forEach((petal, i) => animatePetal(gsap, petal, i, root.clientHeight));
    },
    { scope: ref },
  );

  return (
    <div ref={ref} aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {Array.from({ length: count }, (_, i) => (
        <svg
          key={i}
          viewBox="0 0 40 56"
          className="absolute -top-16 w-5 opacity-0"
          style={{ left: `${(i * 97) % 100}%`, width: `${14 + ((i * 7) % 12)}px` }}
        >
          <path d={PETAL_PATH} fill={colors[i % colors.length]} />
        </svg>
      ))}
    </div>
  );
}

function animatePetal(gsap: typeof import("gsap").gsap, petal: HTMLElement, index: number, height: number) {
  const fall = () => {
    const duration = 11 + Math.random() * 9;
    gsap.set(petal, { y: -80, x: 0, rotation: Math.random() * 360, opacity: 0 });
    gsap
      .timeline({ onComplete: fall, delay: index === 0 ? 0 : Math.random() * 6 })
      .to(petal, { opacity: 0.9, duration: 1.2 }, 0)
      .to(petal, { y: height + 120, duration, ease: "none" }, 0)
      .to(petal, { x: `+=${60 + Math.random() * 90}`, duration: duration / 2, yoyo: true, repeat: 1, ease: "sine.inOut" }, 0)
      .to(petal, { rotation: `+=${180 + Math.random() * 180}`, duration, ease: "none" }, 0)
      .to(petal, { opacity: 0, duration: 1.5 }, duration - 1.5);
  };
  fall();
}
