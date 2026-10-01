"use client";

import { useNow } from "@/components/story/useNow";

export interface Elapsed {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function computeElapsed(sinceMs: number, nowMs: number): Elapsed {
  const total = Math.max(0, Math.floor((nowMs - sinceMs) / 1000));
  return {
    days: Math.floor(total / 86_400),
    hours: Math.floor((total % 86_400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

/** Đếm thời gian đã bên nhau, cập nhật mỗi giây. */
export function useElapsed(sinceIso: string | null): Elapsed | null {
  const now = useNow(1000);
  const sinceMs = sinceIso ? new Date(`${sinceIso}T00:00:00+07:00`).getTime() : Number.NaN;
  if (!Number.isFinite(sinceMs) || now === 0) {
    return null;
  }
  return computeElapsed(sinceMs, now);
}
