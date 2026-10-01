"use client";

import { useRef, useState } from "react";

import { Petals } from "@/components/motion/Petals";
import { Envelope } from "@/components/story/Envelope";
import { SceneFrame } from "@/components/story/SceneFrame";
import {
  AnniversaryScene,
  BouquetScene,
  Credit,
  HeartsScene,
  LetterScene,
  MemoriesScene,
  TeaserScene,
} from "@/components/story/scenes";
import type { Story } from "@/lib/story-types";

interface StoryPlayerProps {
  story: Story;
}

type SceneKey = "envelope" | "teaser" | "anniversary" | "hearts" | "bouquet" | "memories" | "letter";

function buildScenes(story: Story): SceneKey[] {
  const scenes: SceneKey[] = ["envelope", "teaser", "anniversary"];
  const hasHearts =
    story.fiveThings.length > 0 || story.thanks.trim() !== "" || story.wishes.trim() !== "";
  if (hasHearts) {
    scenes.push("hearts");
  }
  if (story.photos.length > 0) {
    scenes.push("bouquet", "memories");
  }
  if (story.letter.trim() !== "") {
    scenes.push("letter");
  }
  return scenes;
}

function MusicToggle({ src }: { src: string }) {
  const ref = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const toggle = () => {
    const el = ref.current;
    if (!el) {
      return;
    }
    if (isPlaying) {
      el.pause();
    } else {
      void el.play();
    }
    setIsPlaying(!isPlaying);
  };
  return (
    <>
      <audio ref={ref} src={src} loop preload="none" />
      <button
        type="button"
        onClick={toggle}
        aria-pressed={isPlaying}
        className="absolute right-4 top-4 z-10 rounded-full border border-pearl/40 px-3 py-1 font-display text-sm text-pearl-bright"
      >
        {isPlaying ? "♪ Đang phát" : "♪ Bật nhạc"}
      </button>
    </>
  );
}

export function StoryPlayer({ story }: StoryPlayerProps) {
  const scenes = buildScenes(story);
  const [index, setIndex] = useState(0);
  const current = scenes[index];
  const goNext = () => setIndex((i) => Math.min(i + 1, scenes.length - 1));
  const goBack = () => setIndex((i) => Math.max(i - 1, 0));
  const initial = story.herName.trim().charAt(0).toUpperCase() || "♥";

  return (
    <main
      className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-wine px-5 py-10 text-pearl-bright"
      style={{
        backgroundImage:
          "radial-gradient(ellipse at 50% 0%, rgba(200,83,111,0.28), transparent 60%), radial-gradient(ellipse at 50% 100%, rgba(0,0,0,0.5), transparent 60%)",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/img/lily-dark.jpg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]"
      />
      <Petals count={12} tone="dark" />
      {story.musicUrl ? <MusicToggle src={story.musicUrl} /> : null}
      <SceneFrame sceneKey={current}>
        {current === "envelope" ? (
          <Envelope title={story.title} herName={story.herName} initial={initial} onOpened={goNext} />
        ) : null}
        {current === "teaser" ? <TeaserScene story={story} onNext={goNext} /> : null}
        {current === "anniversary" ? <AnniversaryScene story={story} onNext={goNext} /> : null}
        {current === "hearts" ? <HeartsScene story={story} onNext={goNext} /> : null}
        {current === "bouquet" ? <BouquetScene story={story} onNext={goNext} /> : null}
        {current === "memories" ? <MemoriesScene story={story} onNext={goNext} /> : null}
        {current === "letter" ? (
          <>
            <LetterScene story={story} />
            <Credit />
          </>
        ) : null}
      </SceneFrame>
      {index > 1 ? (
        <nav className="relative z-10 mt-8 flex items-center justify-center gap-4 text-xs text-petal-soft/70">
          <button type="button" onClick={goBack} className="underline underline-offset-4">
            Quay lại
          </button>
          <span aria-hidden="true">·</span>
          <span>
            {index} / {scenes.length - 1}
          </span>
        </nav>
      ) : null}
    </main>
  );
}
