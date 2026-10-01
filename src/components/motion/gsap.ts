"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

let isRegistered = false;

/** Đăng ký plugin một lần, chỉ trên trình duyệt. */
export function setupGsap(): typeof gsap {
  if (!isRegistered && typeof window !== "undefined") {
    gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);
    // Tab nền bị trình duyệt giảm xuống ~1 khung hình/giây; tắt lag smoothing
    // để animation chạy theo thời gian thật thay vì "đóng băng" từng khung.
    gsap.ticker.lagSmoothing(0);
    isRegistered = true;
  }
  return gsap;
}

export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
