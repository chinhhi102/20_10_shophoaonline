interface LaceHeartProps {
  label: string;
  onClick: () => void;
}

const HEART_PATH =
  "M50 88 C20 66, 4 50, 4 32 C4 18, 15 8, 28 8 C37 8, 45 13, 50 21 C55 13, 63 8, 72 8 C85 8, 96 18, 96 32 C96 50, 80 66, 50 88 Z";

/** Trái tim ren trắng, bấm để mở một mục. */
export function LaceHeart({ label, onClick }: LaceHeartProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-scene className="group flex flex-col items-center gap-3 rounded-2xl p-2 transition-transform hover:-translate-y-1 focus-visible:-translate-y-1"
    >
      <svg viewBox="0 0 100 100" className="h-28 w-28 drop-shadow-[0_12px_20px_rgba(0,0,0,0.45)]">
        <path
          d={HEART_PATH}
          fill="none"
          stroke="#fffaf7"
          strokeWidth="7"
          strokeDasharray="0.1 5.2"
          strokeLinecap="round"
        />
        <path d={HEART_PATH} fill="#fffaf7" transform="translate(50 50) scale(0.84) translate(-50 -50)" />
        <path
          d={HEART_PATH}
          fill="none"
          stroke="#f4c9d3"
          strokeWidth="1.2"
          strokeDasharray="2 2"
          transform="translate(50 50) scale(0.72) translate(-50 -50)"
        />
      </svg>
      <span className="font-display text-base text-pearl-bright transition-colors group-hover:text-white">
        {label}
      </span>
    </button>
  );
}
