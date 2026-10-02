"use client";

import Link from "next/link";
import { useState } from "react";

import { Bouquet } from "@/components/story/Bouquet";
import { LaceHeart } from "@/components/story/LaceHeart";
import { Polaroid } from "@/components/story/Polaroid";
import { useElapsed, type Elapsed } from "@/components/story/useElapsed";
import { asset } from "@/lib/site";
import type { Story } from "@/lib/story-types";

interface SceneProps {
  story: Story;
  onNext: () => void;
}

const TEASER_FACES = [
  { emoji: "😘", reply: "Anh cũng vậy. Mở ra đi!" },
  { emoji: "😮", reply: "Bất ngờ hơn nữa ở trong này." },
  { emoji: "🤔", reply: "Thắc mắc gì thì mở ra là biết." },
];

export function NextButton({ onClick, label = "Tiếp" }: { onClick: () => void; label?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full bg-rose px-7 py-2.5 font-body text-sm font-medium text-white shadow-[0_10px_25px_-10px_rgba(200,83,111,0.9)] transition hover:bg-rose-deep"
    >
      {label}
    </button>
  );
}

export function TeaserScene({ story, onNext }: SceneProps) {
  const [picked, setPicked] = useState<number | null>(null);
  const face = picked === null ? null : TEASER_FACES[picked];
  return (
    <div data-scene className="lace-card mx-auto max-w-sm px-7 py-9 text-center">
      {face === null ? (
        <>
          <p className="font-display text-xl">Khoan mở vội.</p>
          <p className="mt-1 font-display text-xl">Cho anh xem phản ứng của em đã!</p>
          <div className="mt-7 flex justify-center gap-5">
            {TEASER_FACES.map((f, i) => (
              <button
                key={f.emoji}
                type="button"
                onClick={() => setPicked(i)}
                className="text-5xl transition hover:scale-110"
                aria-label={`Chọn ${f.emoji}`}
              >
                {f.emoji}
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <p className="text-5xl">{face.emoji}</p>
          <p className="mt-4 font-display text-xl">{face.reply}</p>
          <p className="mt-1 font-display text-xl">Tất cả là dành cho em, {story.herName}!</p>
          <div className="mt-7">
            <NextButton onClick={onNext} label="Mở ra xem" />
          </div>
        </>
      )}
    </div>
  );
}

function formatVnDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y}`;
}

export function AnniversaryScene({ story, onNext }: SceneProps) {
  const elapsed = useElapsed(story.anniversaryDate);
  return (
    <div className="flex flex-col items-center gap-9 text-center">
      <div data-scene className="lace-card flex flex-col items-center gap-5 px-7 py-7 sm:flex-row sm:text-left">
        {story.coverUrl ? (
          <Polaroid
            url={story.coverUrl}
            caption={`${story.hisName} & ${story.herName}`}
            tilt={-6}
            className="shrink-0 !w-[120px]"
          />
        ) : null}
        <div>
          <p className="font-script text-4xl text-rose-deep">
            {story.anniversaryDate ? "Happy anniversary" : "Happy 20/10"}
          </p>
          {story.anniversaryDate ? (
            <p className="mt-1 font-display text-lg tracking-widest">{formatVnDate(story.anniversaryDate)}</p>
          ) : null}
          {story.intro ? (
            <p className="mt-3 max-w-xs font-display text-base italic text-ink-soft">{story.intro}</p>
          ) : null}
        </div>
      </div>
      {elapsed ? <TogetherCounter elapsed={elapsed} /> : null}
      <NextButton onClick={onNext} />
    </div>
  );
}

const COUNTER_CELLS: [keyof Elapsed, string][] = [
  ["days", "ngày"],
  ["hours", "giờ"],
  ["minutes", "phút"],
  ["seconds", "giây"],
];

function TogetherCounter({ elapsed }: { elapsed: Elapsed }) {
  return (
    <div data-scene className="" style={{ animationDelay: "300ms" }}>
      <p className="font-script text-4xl text-pearl-bright">Mình đã bên nhau</p>
      <div className="mt-4 flex items-end justify-center gap-2 font-display text-pearl-bright">
        {COUNTER_CELLS.map(([key, label], i) => (
          <div key={key} className="flex items-end gap-2">
            {i > 0 ? <span className="pb-6 text-3xl text-petal">:</span> : null}
            <div className="text-center">
              <p className="text-5xl tabular-nums leading-none sm:text-6xl">
                {String(elapsed[key]).padStart(2, "0")}
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.25em] text-petal-soft/80">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

type HeartKey = "five" | "thanks" | "wishes";

const HEARTS: { key: HeartKey; label: string }[] = [
  { key: "five", label: "5 điều anh thích ở em" },
  { key: "thanks", label: "Cảm ơn em vì…" },
  { key: "wishes", label: "Chúc em…" },
];

function HeartContent({ story, which }: { story: Story; which: HeartKey }) {
  if (which === "five") {
    return (
      <ol className="space-y-3 text-left">
        {story.fiveThings.map((item, i) => (
          <li key={item} className="flex gap-3 font-display text-lg leading-snug">
            <span className="font-script text-2xl text-rose">{i + 1}</span>
            <span>{item}</span>
          </li>
        ))}
      </ol>
    );
  }
  const text = which === "thanks" ? story.thanks : story.wishes;
  return <p className="whitespace-pre-line font-display text-lg leading-relaxed">{text}</p>;
}

export function HeartsScene({ story, onNext }: SceneProps) {
  const [open, setOpen] = useState<HeartKey | null>(null);
  const [seen, setSeen] = useState<Set<HeartKey>>(() => new Set());
  const available = HEARTS.filter(
    (h) => (h.key === "five" ? story.fiveThings.length > 0 : story[h.key].trim() !== ""),
  );
  const handleOpen = (key: HeartKey) => {
    setOpen(key);
    setSeen((prev) => new Set(prev).add(key));
  };
  if (open) {
    const label = HEARTS.find((h) => h.key === open)?.label ?? "";
    return (
      <div data-scene className="lace-card mx-auto max-w-sm px-7 py-8">
        <p className="mb-5 text-center font-script text-4xl text-rose-deep">{label}</p>
        <HeartContent story={story} which={open} />
        <div className="mt-7 flex justify-center">
          <NextButton onClick={() => setOpen(null)} label="Quay lại" />
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center gap-8 text-center">
      <p data-scene className=" font-script text-5xl text-pearl-bright">Chọn một trái tim</p>
      <div className="flex flex-wrap justify-center gap-2 sm:gap-6">
        {available.map((h) => (
          <LaceHeart key={h.key} label={h.label} onClick={() => handleOpen(h.key)} />
        ))}
      </div>
      <p className="font-display text-sm italic text-petal-soft/70">
        {seen.size < available.length ? `Đã mở ${seen.size}/${available.length}` : "Em đã mở hết rồi"}
      </p>
      <NextButton onClick={onNext} />
    </div>
  );
}

export function BouquetScene({ story, onNext }: SceneProps) {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <p data-scene className=" font-script text-5xl text-pearl-bright">Hoa cho em</p>
      <div data-scene className="" style={{ animationDelay: "200ms" }}>
        <Bouquet photos={story.photos} />
      </div>
      <NextButton onClick={onNext} />
    </div>
  );
}

const TILTS = [-6, 5, -3, 7, -5, 4];

export function MemoriesScene({ story, onNext }: SceneProps) {
  return (
    <div className="flex flex-col items-center gap-8 text-center">
      <p data-scene className=" font-script text-5xl text-pearl-bright">Full of memories</p>
      <div className="flex max-w-md flex-wrap items-start justify-center gap-x-5 gap-y-8">
        {story.photos.map((p, i) => (
          <Polaroid key={p.url} url={p.url} caption={p.caption} tilt={TILTS[i % TILTS.length]} />
        ))}
      </div>
      <NextButton onClick={onNext} />
    </div>
  );
}

export function LetterScene({ story }: { story: Story }) {
  const locket = [story.coverUrl, story.photos[0]?.url].filter(Boolean) as string[];
  return (
    <div data-scene className="lace-card mx-auto max-w-md px-7 py-9">
      <div className="flex items-start justify-between gap-4">
        <p className="whitespace-pre-line font-display text-lg leading-relaxed">{story.letter}</p>
        {locket.length > 0 ? (
          <div className="flex shrink-0 -space-x-3">
            {locket.map((url) => (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                key={url}
                src={asset(url)}
                alt=""
                className="h-14 w-14 rounded-full border-2 border-pearl object-cover shadow"
              />
            ))}
          </div>
        ) : null}
      </div>
      {story.voiceUrl ? (
        <div className="mt-6">
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-ink-soft">Nghe anh nói</p>
          <audio controls src={asset(story.voiceUrl)} className="w-full" />
        </div>
      ) : null}
      <p className="mt-8 text-right font-script text-4xl text-rose-deep">{story.hisName}</p>
    </div>
  );
}

export function Credit() {
  return (
    <p className="mt-10 text-center text-xs text-petal-soft/60">
      Trang này được làm bởi{" "}
      <Link href="/" className="underline underline-offset-4 hover:text-pearl-bright">
        Hoa & Khoảnh Khắc
      </Link>
      . Bạn cũng có thể gửi một trang như vậy cho người mình thương.
    </p>
  );
}
