"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

/** Chỉ dựng cảnh 3D khi khối chứa nó sắp vào màn hình, để tiết kiệm pin điện thoại. */
export function useInView<T extends HTMLElement>(rootMargin = "200px") {
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      (entries) => setIsInView(entries.some((e) => e.isIntersecting)),
      { rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);
  return { ref, isInView };
}

let cachedCan3D: boolean | null = null;

function detectCan3D(): boolean {
  if (cachedCan3D === null) {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
    cachedCan3D = !reduced && gl !== null;
  }
  return cachedCan3D;
}

const noopSubscribe = () => () => {};

/** WebGL có sẵn và người dùng không tắt chuyển động. Trả về false khi render trên server. */
export function useCanRender3D(): boolean {
  return useSyncExternalStore(noopSubscribe, detectCan3D, () => false);
}
