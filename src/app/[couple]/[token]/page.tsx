import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { StoryPlayer } from "@/components/story/StoryPlayer";
import { asset } from "@/lib/site";
import { getStoryByPath, listStories } from "@/lib/stories";

export const dynamicParams = false;

type Props = PageProps<"/[couple]/[token]">;

export function generateStaticParams(): { couple: string; token: string }[] {
  return listStories().map((s) => ({ couple: s.slug, token: s.token }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { couple, token } = await params;
  const story = getStoryByPath(couple, token);
  if (!story) {
    return { title: "Không tìm thấy", robots: { index: false } };
  }
  return {
    title: `${story.title} · ${story.herName}`,
    description: `Một món quà ${story.hisName} dành riêng cho ${story.herName}.`,
    robots: { index: false, follow: false },
    openGraph: {
      title: `${story.title}, ${story.herName}`,
      description: "Có người gửi em một điều đặc biệt. Mở ra nhé.",
      images: story.coverUrl ? [{ url: asset(story.coverUrl) }] : undefined,
    },
  };
}

export default async function StoryPage({ params }: Props) {
  const { couple, token } = await params;
  const story = getStoryByPath(couple, token);
  if (!story) {
    notFound();
  }
  return <StoryPlayer story={story} />;
}
