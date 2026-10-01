import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";

import type { Story } from "@/lib/story-types";

export const STORIES_DIR = path.resolve(process.cwd(), "content", "stories");

function readStoryFile(file: string): Story {
  const raw = readFileSync(path.join(STORIES_DIR, file), "utf8");
  const data = JSON.parse(raw) as Partial<Story>;
  if (!data.slug || !data.token || !data.hisName || !data.herName) {
    throw new Error(`Story ${file} thiếu slug, token, hisName hoặc herName`);
  }
  return {
    slug: data.slug,
    token: data.token,
    hisName: data.hisName,
    herName: data.herName,
    title: data.title ?? "Dear my angel",
    anniversaryDate: data.anniversaryDate ?? null,
    intro: data.intro ?? "",
    fiveThings: data.fiveThings ?? [],
    thanks: data.thanks ?? "",
    wishes: data.wishes ?? "",
    letter: data.letter ?? "",
    photos: data.photos ?? [],
    coverUrl: data.coverUrl ?? null,
    voiceUrl: data.voiceUrl ?? null,
    musicUrl: data.musicUrl ?? null,
    isPublished: data.isPublished !== false,
  };
}

/** Mỗi file JSON trong content/stories là một trang Mãi Yêu. Chỉ lấy trang đã bật isPublished. */
export function listStories(): Story[] {
  return readdirSync(STORIES_DIR)
    .filter((f) => f.endsWith(".json"))
    .map(readStoryFile)
    .filter((s) => s.isPublished);
}

export function getStoryByPath(slug: string, token: string): Story | null {
  return listStories().find((s) => s.slug === slug && s.token === token) ?? null;
}
