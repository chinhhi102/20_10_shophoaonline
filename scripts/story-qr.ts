/**
 * Tạo lại mã QR cho mọi trang Mãi Yêu đã có:
 *   pnpm story:qr
 * Hữu ích khi đổi NEXT_PUBLIC_SITE_URL (ví dụ từ localhost sang tên miền thật).
 */
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";

import QRCode from "qrcode";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hoavakhoanhkhac.vn";
const STORIES_DIR = path.join(process.cwd(), "content", "stories");

interface StoryRef {
  slug: string;
  token: string;
}

async function writeQr({ slug, token }: StoryRef): Promise<string> {
  const url = `${SITE_URL}/${slug}/${token}/`;
  const out = path.join(process.cwd(), "public", "stories", slug, `qr-${token}.png`);
  await QRCode.toFile(out, url, { width: 1024, margin: 2, color: { dark: "#4b1020", light: "#fbf5f1" } });
  return `${url} -> ${path.relative(process.cwd(), out)}`;
}

async function main(): Promise<void> {
  const files = readdirSync(STORIES_DIR).filter((f) => f.endsWith(".json"));
  for (const file of files) {
    const story = JSON.parse(readFileSync(path.join(STORIES_DIR, file), "utf8")) as StoryRef;
    console.log(await writeQr(story));
  }
}

main().catch((err: unknown) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
