const VIET_D = /đ/g;
const VIET_D_UPPER = /Đ/g;
const NON_ALNUM = /[^a-z0-9]+/g;
const EDGE_DASH = /^-+|-+$/g;
const TOKEN_ALPHABET = "abcdefghjkmnpqrstuvwxyz23456789";

/** Bỏ dấu tiếng Việt và chuẩn hoá thành slug url. */
export function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(VIET_D, "d")
    .replace(VIET_D_UPPER, "D")
    .toLowerCase()
    .replace(NON_ALNUM, "-")
    .replace(EDGE_DASH, "");
}

/** Slug cặp đôi dạng `ten-anh-and-ten-em`. */
export function coupleSlug(hisName: string, herName: string): string {
  return `${slugify(hisName)}-and-${slugify(herName)}`;
}

/** Token ngắn, dễ đọc, không có ký tự dễ nhầm (0/o, 1/l). */
export function randomToken(length = 8): string {
  const bytes = crypto.getRandomValues(new Uint8Array(length));
  let out = "";
  for (const b of bytes) {
    out += TOKEN_ALPHABET[b % TOKEN_ALPHABET.length];
  }
  return out;
}
