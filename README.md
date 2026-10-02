# Hoa & Khoảnh Khắc – landing page 20/10 và trang "Mãi Yêu"

Website tĩnh (Next.js, `output: "export"`). Không có server, không có database.
Build xong, toàn bộ site nằm trong thư mục `out/` và có thể đưa lên bất kỳ hosting tĩnh nào
(Cloudflare Pages, Netlify, Vercel, GitHub Pages, hoặc một VPS chạy nginx).

## Chạy thử

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # xuất site tĩnh ra ./out
```

## Cấu trúc

| Đường dẫn | Nội dung |
| --- | --- |
| `/` | Landing page quảng bá, 3 gói Hoa Nhớ / Khoảnh Khắc / Mãi Yêu, đặt hàng qua Zalo / SĐT / Facebook |
| `/<ten-anh>-and-<ten-em>/<ma-rieng>/` | Trang Mãi Yêu cho một cặp đôi, chỉ ai có link (hoặc quét QR) mới mở được |
| `/minh-and-tra/demo/` | Trang demo được nhúng trong khung điện thoại ở landing |

Thông tin liên hệ, giá gói, ngày giao chỉnh trong `src/lib/site.ts`.

## Tạo một trang Mãi Yêu mới

Mỗi trang là một file JSON trong `content/stories/`. Cách nhanh nhất:

```bash
pnpm story:new "Minh" "Trà"
```

Lệnh này tạo:

- `content/stories/minh-and-tra.<token>.json` – nội dung trang, đang để `"isPublished": false`
- `public/stories/minh-and-tra/` – thư mục chứa ảnh
- `public/stories/minh-and-tra/qr-<token>.png` – mã QR in lên thiệp, trỏ tới URL thật

Sau đó:

1. Bỏ ảnh vào thư mục ảnh: `cover.jpg` (ảnh hai bạn) và `photo-1.jpg` … `photo-5.jpg`.
2. Mở file JSON, điền `anniversaryDate` (dạng `YYYY-MM-DD`), `intro`, `fiveThings` (5 dòng),
   `thanks`, `wishes`, `letter`, và `caption` cho từng ảnh. Có thể thêm `voiceUrl` (file .mp3 ghi âm)
   và `musicUrl` (nhạc nền) nếu muốn, đặt file trong cùng thư mục ảnh.
3. Đổi `"isPublished": true`.
4. `pnpm build` rồi deploy lại thư mục `out/`.

Muốn ẩn một trang, đặt `isPublished` về `false` và build lại. Muốn đổi mã riêng, sửa `token` trong
JSON, đổi tên file cho khớp, rồi chạy `pnpm story:qr` để tạo lại QR.

Khi đã có tên miền thật, đặt biến `NEXT_PUBLIC_SITE_URL` trước khi build và tạo QR:

```bash
NEXT_PUBLIC_SITE_URL=https://ten-mien-cua-ban.vn pnpm story:qr
NEXT_PUBLIC_SITE_URL=https://ten-mien-cua-ban.vn pnpm build
```

## Các cảnh trong trang Mãi Yêu

Phong bì sáp niêm (chữ cái đầu tên cô ấy) → thiệp trêu "khoan mở vội" → kỷ niệm + đếm ngày bên nhau →
ba trái tim ren (5 điều anh thích ở em, cảm ơn em, chúc em) → bó hoa bằng ảnh → album polaroid → lá thư.
Cảnh nào không có nội dung sẽ tự được bỏ qua.

## Deploy lên hosting tĩnh

- **Cloudflare Pages / Netlify / Vercel**: build command `pnpm build`, output directory `out`.
- **nginx**: copy `out/` lên server, trỏ `root` vào đó, bật `try_files $uri $uri/ /404.html;`.

## Deploy lên GitHub Pages

Workflow `.github/workflows/deploy.yml` tự build và deploy mỗi khi push lên `main`.
Site nằm tại `https://<user>.github.io/<tên-repo>/`, nên build dùng `NEXT_PUBLIC_BASE_PATH=/<tên-repo>`.
Mọi đường dẫn tới file trong `public/` phải đi qua hàm `asset()` trong `src/lib/site.ts`.
