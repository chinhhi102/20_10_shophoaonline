import { SITE } from "@/lib/site";

/** Thanh nút dính đáy màn hình điện thoại: Zalo và gọi luôn trong tầm ngón cái. */
export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(12px,env(safe-area-inset-bottom))] lg:hidden">
      <div className="mx-auto flex max-w-md gap-2 rounded-full bg-cream/90 p-2 shadow-[0_-10px_40px_-10px_rgba(91,36,64,0.35),0_20px_40px_-20px_rgba(91,36,64,0.5)] backdrop-blur">
        <a
          href={SITE.zaloUrl}
          target="_blank"
          rel="noopener"
          className="flex h-14 flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-rose to-rose-deep text-base font-medium text-white"
        >
          <span aria-hidden="true">💬</span>
          Nhắn Zalo đặt hoa
        </a>
        <a
          href={`tel:${SITE.phone}`}
          className="flex h-14 items-center justify-center gap-2 rounded-full bg-white px-5 text-base font-medium text-plum"
        >
          <span aria-hidden="true">📞</span>
          Gọi
        </a>
      </div>
    </div>
  );
}
