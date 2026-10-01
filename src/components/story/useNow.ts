"use client";

import { useSyncExternalStore } from "react";

function subscribeEvery(intervalMs: number) {
  return (onChange: () => void) => {
    const id = window.setInterval(onChange, intervalMs);
    return () => window.clearInterval(id);
  };
}

const SUBSCRIBERS = new Map<number, (onChange: () => void) => () => void>();

function subscriberFor(intervalMs: number) {
  let sub = SUBSCRIBERS.get(intervalMs);
  if (!sub) {
    sub = subscribeEvery(intervalMs);
    SUBSCRIBERS.set(intervalMs, sub);
  }
  return sub;
}

/**
 * Thời điểm hiện tại, làm tròn theo intervalMs và cập nhật theo nhịp đó.
 * Trả về 0 khi render trên server để tránh lệch hydration.
 */
export function useNow(intervalMs: number): number {
  return useSyncExternalStore(
    subscriberFor(intervalMs),
    () => Math.floor(Date.now() / intervalMs) * intervalMs,
    () => 0,
  );
}
