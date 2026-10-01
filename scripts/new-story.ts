/**
 * Tạo một trang Mãi Yêu mới:
 *   pnpm story:new "Tên anh" "Tên em"
 *
 * Sinh file content/stories/<slug>.<token>.json, thư mục ảnh public/stories/<slug>/
 * và mã QR public/stories/<slug>/qr-<token>.png trỏ tới URL công khai.
 */
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

import QRCode from "qrcode";

import { coupleSlug, randomToken } from "../src/lib/slug.ts";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hoavakhoanhkhac.vn";

function usage(): never {
  console.error('Cách dùng: pnpm story:new "Tên anh" "Tên em"');
  process.exit(1);
}

function buildTemplate(hisName: string, herName: string, slug: string, token: string) {
  return {
    slug,
    token,
    hisName,
    herName,
    title: "Dear my angel",
    anniversaryDate: "2024-01-01",
    intro: "",
    fiveThings: ["", "", "", "", ""],
    thanks: "",
    wishes: "",
    letter: "",
    coverUrl: `/stories/${slug}/cover.jpg`,
    photos: [1, 2, 3, 4, 5].map((i) => ({ url: `/stories/${slug}/photo-${i}.jpg`, caption: "" })),
    voiceUrl: null,
    musicUrl: null,
    isPublished: false,
  };
}

async function main(): Promise<void> {
  const [hisName, herName] = process.argv.slice(2);
  if (!hisName || !herName) {
    usage();
  }
  const slug = coupleSlug(hisName, herName);
  const token = randomToken();
  const root = process.cwd();
  const jsonPath = path.join(root, "content", "stories", `${slug}.${token}.json`);
  const photoDir = path.join(root, "public", "stories", slug);
  if (existsSync(jsonPath)) {
    throw new Error(`Đã tồn tại ${jsonPath}`);
  }
  mkdirSync(photoDir, { recursive: true });
  writeFileSync(jsonPath, `${JSON.stringify(buildTemplate(hisName, herName, slug, token), null, 2)}\n`);
  const url = `${SITE_URL}/${slug}/${token}/`;
  const qrPath = path.join(photoDir, `qr-${token}.png`);
  await QRCode.toFile(qrPath, url, { width: 1024, margin: 2, color: { dark: "#4b1020", light: "#fbf5f1" } });
  console.log(`Đã tạo:\n  ${jsonPath}\n  ${qrPath}\nURL: ${url}\nBỏ ảnh vào ${photoDir}/ rồi bật "isPublished": true và build lại.`);
}

main().catch((err: unknown) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
