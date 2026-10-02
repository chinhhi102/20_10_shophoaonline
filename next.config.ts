import type { NextConfig } from "next";

// GitHub Pages phục vụ site dưới /<tên-repo>/, nên cần basePath khi build ở đó.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  images: { unoptimized: true },
};

export default nextConfig;
