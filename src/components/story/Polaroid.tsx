import { asset } from "@/lib/site";

interface PolaroidProps {
  url: string;
  caption: string;
  tilt?: number;
  size?: "sm" | "md";
  className?: string;
}

const SIZE_CLASS = {
  sm: "w-[8.5rem]",
  md: "w-full max-w-[11rem]",
};

/** Ảnh polaroid: khung trắng, ảnh 4:5, chú thích ngắn một dòng cân đối. */
export function Polaroid({ url, caption, tilt = 0, size = "md", className = "" }: PolaroidProps) {
  return (
    <figure
      className={`polaroid ${SIZE_CLASS[size]} ${className}`}
      style={{ transform: `rotate(${tilt}deg)` }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={asset(url)} alt={caption} className="aspect-[4/5] w-full object-cover" />
      <figcaption className="mt-2.5 text-balance text-center font-display text-[0.95rem] italic leading-snug text-ink-soft">
        {caption}
      </figcaption>
    </figure>
  );
}
