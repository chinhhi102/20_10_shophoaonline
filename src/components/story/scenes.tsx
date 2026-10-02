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

/** Nút chính dùng chung cho mọi cảnh: pill hồng, cao 56px, chữ đậm. */
export function NextButton({
  onClick,
  label = "Tiếp",
  variant = "primary",
}: {
  onClick: () => void;
  label?: string;
  variant?: "primary" | "ghost";
}) {
  const style =
    variant === "primary"
      ? "bg-rose text-white shadow-[0_14px_30px_-12px_rgba(200,83,111,0.9)] hover:bg-rose-deep"
      : "border border-rose/40 bg-transparent text-rose-deep hover:bg-rose/10";
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex min-h-14 min-w-[11rem] items-center justify-center rounded-full px-8 font-body text-[1.05rem] font-semibold transition ${style}`}
    >
      {label}
    </button>
  );
}

/** Tiêu đề cảnh bằng chữ viết tay, cân dòng, không bao giờ một chữ một dòng. */
export function SceneTitle({ children, tone = "light" }: { children: React.ReactNode; tone?: "light" | "dark" }) {
  return (
    <h2
      data-scene
      className={`text-balance text-center font-script text-[2.9rem] leading-[1.1] sm:text-6xl ${
        tone === "light" ? "text-pearl-bright" : "text-rose-deep"
      }`}
    >
      {children}
    </h2>
  );
}

export function TeaserScene({ story, onNext }: SceneProps) {
  const [picked, setPicked] = useState<number | null>(null);
  const face = picked === null ? null : TEASER_FACES[picked];
  return (
    <div data-scene className="story-card mx-auto text-center">
      {face === null ? (
        <>
          <p className="text-balance font-display text-[1.45rem] font-semibold leading-snug text-plum">
            Khoan mở vội. Cho anh xem phản ứng của em đã!
          </p>
          <div className="mt-7 flex justify-center gap-4">
            {TEASER_FACES.map((f, i) => (
              <button
                key={f.emoji}
                type="button"
                onClick={() => setPicked(i)}
                className="grid h-20 w-20 place-items-center rounded-full bg-blush text-[2.6rem] leading-none transition hover:scale-110 active:scale-95"
                aria-label={`Chọn ${f.emoji}`}
              >
                {f.emoji}
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <p className="text-[3.4rem] leading-none">{face.emoji}</p>
          <p className="mt-4 text-balance font-display text-[1.45rem] font-semibold leading-snug text-plum">
            {face.reply}
          </p>
          <p className="mt-2 text-pretty font-body text-[1.05rem] text-ink-soft">
            Tất cả là dành cho em, {story.herName}.
          </p>
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
    <div className="flex flex-col items-center gap-7 text-center">
      <div data-scene className="story-card mx-auto flex flex-col items-center">
        {story.coverUrl ? (
          <Polaroid url={story.coverUrl} caption={`${story.hisName} & ${story.herName}`} tilt={-4} size="sm" />
        ) : null}
        <p className="mt-5 font-script text-[2.6rem] leading-none text-rose-deep">
          {story.anniversaryDate ? "Happy anniversary" : "Happy 20/10"}
        </p>
        {story.anniversaryDate ? (
          <p className="mt-2 font-display text-[1.1rem] font-semibold tracking-[0.25em] text-plum">
            {formatVnDate(story.anniversaryDate)}
          </p>
        ) : null}
        {story.intro ? (
          <p className="mt-4 max-w-[30ch] text-pretty font-body text-[1.05rem] leading-relaxed text-ink-soft">
            {story.intro}
          </p>
        ) : null}
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
    <div data-scene className="w-full max-w-[22rem]">
      <p className="font-script text-[2.3rem] leading-none text-pearl-bright">Mình đã bên nhau</p>
      <div className="mt-4 grid grid-cols-4 gap-2">
        {COUNTER_CELLS.map(([key, label]) => (
          <div key={key} className="rounded-2xl bg-white/10 px-1 py-3 text-center ring-1 ring-white/10">
            <p className="font-display text-[1.75rem] font-semibold tabular-nums leading-none text-pearl-bright sm:text-4xl">
              {String(elapsed[key]).padStart(2, "0")}
            </p>
            <p className="mt-1.5 text-[0.7rem] uppercase tracking-[0.18em] text-petal-soft/80">{label}</p>
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
      <ol className="space-y-3.5 text-left">
        {story.fiveThings.map((item, i) => (
          <li key={item} className="flex gap-3">
            <span className="w-7 shrink-0 font-script text-[1.7rem] leading-none text-rose">{i + 1}</span>
            <span className="text-pretty font-display text-[1.1rem] leading-snug text-plum">{item}</span>
          </li>
        ))}
      </ol>
    );
  }
  const text = which === "thanks" ? story.thanks : story.wishes;
  return (
    <p className="whitespace-pre-line text-pretty text-left font-display text-[1.1rem] leading-[1.7] text-plum">
      {text}
    </p>
  );
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
      <div data-scene className="story-card mx-auto">
        <p className="mb-5 text-balance text-center font-script text-[2.4rem] leading-none text-rose-deep">{label}</p>
        <HeartContent story={story} which={open} />
        <div className="mt-7 flex justify-center">
          <NextButton onClick={() => setOpen(null)} label="Chọn trái tim khác" variant="ghost" />
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <SceneTitle>Chọn một trái tim</SceneTitle>
      <p data-scene className="-mt-3 text-pretty font-body text-[1rem] text-petal-soft/80">
        Mỗi trái tim giấu một điều anh muốn nói.
      </p>
      <div className="grid w-full max-w-[22rem] grid-cols-3 gap-2">
        {available.map((h) => (
          <LaceHeart key={h.key} label={h.label} isSeen={seen.has(h.key)} onClick={() => handleOpen(h.key)} />
        ))}
      </div>
      <p className="font-body text-sm text-petal-soft/70">
        {seen.size < available.length ? `Đã mở ${seen.size}/${available.length}` : "Em đã mở hết rồi"}
      </p>
      <NextButton onClick={onNext} />
    </div>
  );
}

export function BouquetScene({ story, onNext }: SceneProps) {
  return (
    <div className="flex flex-col items-center gap-5 text-center">
      <SceneTitle>Hoa cho em</SceneTitle>
      <p data-scene className="-mt-2 text-pretty font-body text-[1rem] text-petal-soft/80">
        Mỗi bông là một khoảnh khắc của tụi mình.
      </p>
      <div data-scene>
        <Bouquet photos={story.photos} />
      </div>
      <NextButton onClick={onNext} />
    </div>
  );
}

const TILTS = [-2.5, 2, -1.5, 2.5, -2, 1.5];

export function MemoriesScene({ story, onNext }: SceneProps) {
  const isOdd = story.photos.length % 2 === 1;
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <SceneTitle>Full of memories</SceneTitle>
      <div className="grid w-full max-w-[24rem] grid-cols-2 gap-x-4 gap-y-6 px-1">
        {story.photos.map((p, i) => (
          <div
            key={p.url}
            data-scene
            className={isOdd && i === story.photos.length - 1 ? "col-span-2 flex justify-center" : ""}
          >
            <Polaroid url={p.url} caption={p.caption} tilt={TILTS[i % TILTS.length]} size="md" />
          </div>
        ))}
      </div>
      <NextButton onClick={onNext} />
    </div>
  );
}

export function LetterScene({ story }: { story: Story }) {
  const locket = [story.coverUrl, story.photos[0]?.url].filter(Boolean) as string[];
  return (
    <div data-scene className="story-card mx-auto">
      {locket.length > 0 ? (
        <div className="mb-5 flex justify-center -space-x-4">
          {locket.map((url) => (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              key={url}
              src={asset(url)}
              alt=""
              className="h-16 w-16 rounded-full border-[3px] border-pearl-bright object-cover shadow-[0_8px_20px_-8px_rgba(0,0,0,0.5)]"
            />
          ))}
        </div>
      ) : null}
      <p className="mx-auto max-w-[60ch] whitespace-pre-line text-pretty text-left font-display text-[1.1rem] leading-[1.75] text-plum">
        {story.letter}
      </p>
      {story.voiceUrl ? (
        <div className="mt-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft">Nghe anh nói</p>
          <audio controls src={asset(story.voiceUrl)} className="w-full" />
        </div>
      ) : null}
      <p className="mt-7 text-right font-script text-[2.6rem] leading-none text-rose-deep">{story.hisName}</p>
    </div>
  );
}

export function Credit() {
  return (
    <p className="mx-auto mt-8 max-w-[30ch] text-pretty text-center font-body text-sm leading-relaxed text-petal-soft/70">
      Trang này được làm bởi{" "}
      <Link href="/" className="underline underline-offset-4 hover:text-pearl-bright">
        Hoa & Khoảnh Khắc
      </Link>
      . Bạn cũng có thể gửi một trang như vậy cho người mình thương.
    </p>
  );
}
