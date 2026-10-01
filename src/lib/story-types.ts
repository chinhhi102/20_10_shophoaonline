export interface StoryPhoto {
  url: string;
  caption: string;
}

export interface Story {
  /** Phần đầu URL, dạng `ten-anh-and-ten-em`. */
  slug: string;
  /** Khoá truy cập, chỉ ai có link mới mở được. */
  token: string;
  hisName: string;
  herName: string;
  title: string;
  anniversaryDate: string | null;
  intro: string;
  fiveThings: string[];
  thanks: string;
  wishes: string;
  letter: string;
  photos: StoryPhoto[];
  coverUrl: string | null;
  voiceUrl: string | null;
  musicUrl: string | null;
  isPublished: boolean;
}

export function storyPath(story: Pick<Story, "slug" | "token">): string {
  return `/${story.slug}/${story.token}/`;
}
