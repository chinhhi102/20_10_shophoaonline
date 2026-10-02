import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro, Great_Vibes, Playfair_Display } from "next/font/google";

import { SITE } from "@/lib/site";

import "./globals.css";

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin", "vietnamese"],
  weight: "400",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const beVietnam = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600"],
});

const TITLE = "Đặt hoa 20/10 online, giao tận nơi, kèm trang web kể chuyện tình yêu";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${TITLE} · ${SITE.name}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "đặt hoa 20/10",
    "hoa 20/10",
    "quà 20/10 cho người yêu",
    "quà 20/10 cho vợ",
    "hoa tươi giao tận nơi",
    "thiệp 20/10",
    "website tình yêu",
    "quà kỷ niệm cặp đôi",
    "Ngày Phụ nữ Việt Nam",
  ],
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  category: "shopping",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "/",
    siteName: SITE.name,
    title: `${TITLE} · ${SITE.name}`,
    description: SITE.description,
    images: [{ url: "/brand/greeting-2010.jpg", width: 1536, height: 1024, alt: "Thiệp chúc 20/10 với bó hoa ly hồng" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} · ${SITE.name}`,
    description: SITE.description,
    images: ["/brand/greeting-2010.jpg"],
  },
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  themeColor: "#fff8f3",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="vi"
      className={`${greatVibes.variable} ${playfair.variable} ${beVietnam.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
