interface WaveProps {
  /** Màu của phần nằm dưới đường cong (section phía dưới). */
  fill: string;
  flip?: boolean;
  className?: string;
}

/** Đường chia section mềm: một gợn sóng lệch, không đối xứng. */
export function Wave({ fill, flip = false, className = "" }: WaveProps) {
  return (
    <svg
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`block h-[44px] w-full sm:h-[80px] lg:h-[110px] ${flip ? "rotate-180" : ""} ${className}`}
    >
      <path
        d="M0 72 C 220 20, 380 118, 620 76 S 1000 10, 1200 58 S 1380 96, 1440 70 L1440 120 L0 120 Z"
        fill={fill}
      />
    </svg>
  );
}
