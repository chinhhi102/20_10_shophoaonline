import type { MetadataRoute } from "next";

import { SITE } from "@/lib/site";

export const dynamic = "force-static";

/** Chỉ liệt kê landing page. Trang Mãi Yêu là link riêng tư, không đưa vào sitemap. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE.url}/`,
      lastModified: new Date("2026-10-02"),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
