"use client";

import { useRef } from "react";

import { ScrollTrigger, SplitText, prefersReducedMotion, setupGsap, useGSAP } from "@/components/motion/gsap";

interface HeroIntroProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Màn mở đầu: tiêu đề hiện từng dòng, chữ chạy lên như hoa nở, ảnh phóng nhẹ rồi lắng,
 * cuộn xuống thì ảnh và blob trôi chậm hơn nền (parallax).
 * Đánh dấu bằng data-hero="eyebrow | title | copy | cta | photo | float".
 */
export function HeroIntro({ children, className }: HeroIntroProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const gsap = setupGsap();
      const root = ref.current;
      if (!root) {
        return;
      }
      const q = gsap.utils.selector(root);
      if (prefersReducedMotion()) {
        gsap.set(q("[data-hero]"), { opacity: 1 });
        return;
      }
      const title = q("[data-hero='title']")[0];
      const split = title ? new SplitText(title, { type: "lines", linesClass: "overflow-hidden" }) : null;
      const lines = split ? split.lines.map((l) => l.firstElementChild ?? l) : [];

      gsap
        .timeline({ defaults: { ease: "power3.out", duration: 1 } })
        .from(q("[data-hero='photo']"), { scale: 1.12, opacity: 0, duration: 1.6, ease: "power2.out" }, 0)
        .from(q("[data-hero='eyebrow']"), { y: 16, opacity: 0, duration: 0.7 }, 0.2)
        .from(lines.length > 0 ? lines : title, { yPercent: 110, opacity: 0, stagger: 0.14 }, 0.35)
        .from(q("[data-hero='copy']"), { y: 24, opacity: 0 }, 0.9)
        .from(q("[data-hero='cta'] > *"), { y: 18, opacity: 0, stagger: 0.08 }, 1.05)
        .from(q("[data-hero='float']"), { y: 30, opacity: 0, rotation: -6, duration: 1.2, ease: "back.out(1.6)" }, 1.2);

      gsap.to(q("[data-hero='photo']"), {
        yPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(q("[data-hero='glow']"), {
        yPercent: -20,
        ease: "none",
        scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true },
      });
      return () => {
        split?.revert();
        ScrollTrigger.getAll().forEach((t) => (t.trigger === root ? t.kill() : undefined));
      };
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
