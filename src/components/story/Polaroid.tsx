interface PolaroidProps {
  url: string;
  caption: string;
  tilt?: number;
  className?: string;
}

export function Polaroid({ url, caption, tilt = 0, className = "" }: PolaroidProps) {
  return (
    <figure
      className={`polaroid anim-float w-[150px] sm:w-[170px] ${className}`}
      style={{ ["--tilt" as string]: `${tilt}deg` }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={url} alt={caption} className="aspect-[4/5] w-full object-cover" />
      <figcaption className="mt-3 text-center font-display text-sm italic text-ink-soft">
        {caption}
      </figcaption>
    </figure>
  );
}
