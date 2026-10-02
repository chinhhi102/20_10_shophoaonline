interface LaceHeartProps {
  label: string;
  isSeen?: boolean;
  onClick: () => void;
}

const HEART_PATH =
  "M50 88 C20 66, 4 50, 4 32 C4 18, 15 8, 28 8 C37 8, 45 13, 50 21 C55 13, 63 8, 72 8 C85 8, 96 18, 96 32 C96 50, 80 66, 50 88 Z";

/** Trái tim ren trắng, bấm để mở một mục. Ba trái tim xếp một hàng, nhãn cân dòng bên dưới. */
export function LaceHeart({ label, isSeen = false, onClick }: LaceHeartProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-scene
      className="group flex min-h-[10.5rem] flex-col items-center justify-start gap-2 rounded-2xl px-1 py-2 transition-transform hover:-translate-y-1 focus-visible:-translate-y-1 active:scale-95"
    >
      <span className="relative block h-[5.2rem] w-[5.2rem] sm:h-28 sm:w-28">
        <svg viewBox="0 0 100 100" className="h-full w-full drop-shadow-[0_12px_20px_rgba(0,0,0,0.45)]">
          <path d={HEART_PATH} fill="none" stroke="#fffaf7" strokeWidth="7" strokeDasharray="0.1 5.2" strokeLinecap="round" />
          <path d={HEART_PATH} fill={isSeen ? "#f6c9d4" : "#fffaf7"} transform="translate(50 50) scale(0.84) translate(-50 -50)" />
          <path
            d={HEART_PATH}
            fill="none"
            stroke="#e8708a"
            strokeWidth="1.4"
            strokeDasharray="2 2"
            transform="translate(50 50) scale(0.72) translate(-50 -50)"
          />
          {isSeen ? (
            <path d="M36 50 L46 60 L66 40" fill="none" stroke="#c94c6b" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          ) : null}
        </svg>
      </span>
      <span className="text-balance font-display text-[0.95rem] font-semibold leading-tight text-pearl-bright transition-colors group-hover:text-white sm:text-base">
        {label}
      </span>
    </button>
  );
}
