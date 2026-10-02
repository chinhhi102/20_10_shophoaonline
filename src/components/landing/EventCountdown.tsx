"use client";

import { useNow } from "@/components/story/useNow";

interface Remaining {
  days: number;
  hours: number;
  minutes: number;
}

function remainingUntil(targetMs: number, nowMs: number): Remaining {
  const total = Math.max(0, Math.floor((targetMs - nowMs) / 60_000));
  return { days: Math.floor(total / 1440), hours: Math.floor((total % 1440) / 60), minutes: total % 60 };
}

export function EventCountdown({ targetIso }: { targetIso: string }) {
  const now = useNow(30_000);
  const left = now === 0 ? null : remainingUntil(new Date(targetIso).getTime(), now);

  const cells: [string, number | null][] = [
    ["ngày", left?.days ?? null],
    ["giờ", left?.hours ?? null],
    ["phút", left?.minutes ?? null],
  ];
  return (
    <div className="grid grid-cols-3 gap-2 font-display text-plum sm:flex sm:gap-3">
      {cells.map(([label, value]) => (
        <div
          key={label}
          className="rounded-3xl bg-white/70 px-2 py-4 text-center shadow-[0_16px_30px_-20px_rgba(91,36,64,0.5)] sm:px-5"
        >
          <p className="text-[2.6rem] tabular-nums leading-none sm:text-5xl">
            {value === null ? "--" : String(value).padStart(2, "0")}
          </p>
          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-ink-soft">{label}</p>
        </div>
      ))}
    </div>
  );
}
