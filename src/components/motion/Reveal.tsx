"use client";

import { useRef } from "react";

import { prefersReducedMotion, setupGsap, useGSAP } from "@/components/motion/gsap";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section";
}

/**
 * Mọi phần tử con có `data-reveal` sẽ hiện dần khi vào màn hình.
 * `data-reveal="up" | "left" | "right" | "scale"` chọn hướng.
 * Dùng IntersectionObserver thay vì ScrollTrigger để vẫn chạy đúng khi trang mở trúng neo (#goi-qua)
 * hoặc khi bố cục đổi vì ảnh và cảnh 3D tải muộn.
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
      if (prefersReducedMotion() || typeof IntersectionObserver === "undefined") {
        gsap.set(items, { opacity: 1 });
        return;
      }
      items.forEach((el) => gsap.set(el, fromFor(el.dataset.reveal)));
      const show = (batch: HTMLElement[]) =>
        gsap.to(batch, { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.9, ease: "power3.out", stagger: 0.1, overwrite: true });
      const observer = new IntersectionObserver(
        (entries) => {
          const entered = entries.filter((e) => e.isIntersecting).map((e) => e.target as HTMLElement);
          if (entered.length === 0) {
            return;
          }
          entered.forEach((el) => observer.unobserve(el));
          show(entered);
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
      );
      items.forEach((el) => observer.observe(el));
      // Lưới an toàn: sau 2,5 giây, phần tử nào đang trong màn hình mà chưa hiện thì hiện luôn.
      const safety = window.setTimeout(() => {
        const vh = window.innerHeight;
        const pending = items.filter((el) => {
          const r = el.getBoundingClientRect();
          return r.top < vh && r.bottom > 0 && Number(getComputedStyle(el).opacity) < 1;
        });
        if (pending.length > 0) {
          pending.forEach((el) => observer.unobserve(el));
          show(pending);
        }
      }, 2500);
      return () => {
        observer.disconnect();
        window.clearTimeout(safety);
      };
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
