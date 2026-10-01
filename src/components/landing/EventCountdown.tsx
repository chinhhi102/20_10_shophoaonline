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
    <div className="flex items-end gap-3 font-display text-pearl-bright">
      {cells.map(([label, value], i) => (
        <div key={label} className="flex items-end gap-3">
          {i > 0 ? <span className="pb-5 text-2xl text-petal">:</span> : null}
          <div className="text-center">
            <p className="text-4xl tabular-nums leading-none sm:text-5xl">
              {value === null ? "--" : String(value).padStart(2, "0")}
            </p>
            <p className="mt-1.5 text-[11px] uppercase tracking-[0.25em] text-petal-soft/80">{label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
