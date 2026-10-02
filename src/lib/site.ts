export const SITE = {
  name: "Hoa & Khoảnh Khắc",
  tagline: "Không chỉ là hoa, mà còn lưu giữ cảm xúc",
  description:
    "Hoa tươi 20/10 giao tận nơi, kèm thiệp in hình, ảnh AI đóng khung và trang web kể chuyện tình yêu riêng cho một người.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://hoavakhoanhkhac.vn",
  phone: "0902429265",
  phoneDisplay: "0902 429 265",
  zaloUrl: "https://zalo.me/0902429265",
  facebookUrl: "https://fb.com/thanhphuong2710",
  /** Ngày lễ mục tiêu của chiến dịch. */
  eventDate: "2026-10-20T00:00:00+07:00",
  preorderOpens: "05/10",
  preorderCloses: "18/10",
  deliveryWindow: "19 – 20/10",
} as const;

export type PackageId = "hoa-nho" | "khoanh-khac" | "mai-yeu";

export interface Package {
  id: PackageId;
  name: string;
  level: string;
  priceFrom: number;
  priceTo: number;
  audience: string;
  promise: string;
  includes: string[];
  experience: string;
  featured?: boolean;
}

export const PACKAGES: Package[] = [
  {
    id: "hoa-nho",
    name: "Hoa Nhớ",
    level: "Cơ bản",
    priceFrom: 299_000,
    priceTo: 399_000,
    audience: "Bạn bè, đồng nghiệp, người thân",
    promise: "Một bó hoa chỉn chu và tấm thiệp in hình, đủ để người nhận thấy mình được nhớ đến.",
    includes: [
      "Bó hoa tươi nhỏ gọn (5–7 bông)",
      "Thiệp in hình hoa (3 mẫu)",
      "Lời nhắn viết tay hoặc in",
      "Gói giấy kraft, thắt ruy băng",
    ],
    experience: "Nhận hoa tươi cùng tấm thiệp xinh xắn, cảm giác được trân trọng và chu đáo.",
  },
  {
    id: "khoanh-khac",
    name: "Khoảnh Khắc",
    level: "Trung cấp",
    priceFrom: 499_000,
    priceTo: 699_000,
    audience: "Người yêu, vợ",
    promise: "Khoảnh khắc nhận hoa được chụp lại bằng ảnh AI và đóng khung để bàn.",
    includes: [
      "Bó hoa tươi vừa (9–12 bông)",
      "Thiệp in hình hoa (3 mẫu)",
      "Ảnh AI cô ấy đang ôm bó hoa",
      "Khung ảnh để bàn",
    ],
    experience: "Hoa tươi trên tay, và bức ảnh đóng khung để trưng mãi trên bàn làm việc.",
  },
  {
    id: "mai-yeu",
    name: "Mãi Yêu",
    level: "Cao cấp",
    priceFrom: 699_000,
    priceTo: 999_000,
    audience: "Người yêu, vợ, dịp đặc biệt",
    promise: "Quét mã QR trên thiệp, một trang web riêng mở ra và kể câu chuyện của hai người.",
    includes: [
      "Bó hoa tươi cao cấp (15+ bông)",
      "Thiệp in hình, ảnh AI và khung ảnh",
      "Mã QR dẫn tới trang web tình cảm riêng",
      "5 ảnh, lời nhắn và 4 mục dành riêng cho cô ấy",
    ],
    experience:
      "Cô ấy quét QR, phong bì mở ra: ngày tháng bên nhau, 5 điều anh thích ở em, lời cảm ơn, lời chúc. Cảm xúc vỡ oà.",
    featured: true,
  },
];

/** Tiền tố đường dẫn khi site nằm dưới thư mục con (GitHub Pages). */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Dùng cho mọi src/href viết tay tới file trong public/. */
export function asset(path: string): string {
  return `${BASE_PATH}${path}`;
}

export function formatVnd(amount: number): string {
  return `${amount.toLocaleString("vi-VN")}đ`;
}
