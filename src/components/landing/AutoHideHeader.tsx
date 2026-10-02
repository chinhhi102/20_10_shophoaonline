"use client";

import { useEffect, useRef } from "react";

interface AutoHideHeaderProps {
  children: React.ReactNode;
  className?: string;
}

/** Header trượt lên ẩn khi cuộn xuống, hiện lại khi cuộn lên. Không dùng state để tránh re-render. */
export function AutoHideHeader({ children, className = "" }: AutoHideHeaderProps) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return undefined;
    }
    let lastY = window.scrollY;
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      const goingDown = y > lastY + 4;
      const goingUp = y < lastY - 4;
      if (goingDown && y > 120) {
        el.style.transform = "translateY(-130%)";
      } else if (goingUp || y <= 120) {
        el.style.transform = "translateY(0)";
      }
      lastY = y;
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header ref={ref} className={`transition-transform duration-300 ease-out ${className}`}>
      {children}
    </header>
  );
}
