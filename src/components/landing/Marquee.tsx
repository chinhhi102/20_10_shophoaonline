interface MarqueeProps {
  items: string[];
  className?: string;
}

/** Dải chữ chạy chậm, lặp hai lần để nối liền. */
export function Marquee({ items, className = "" }: MarqueeProps) {
  const row = [...items, ...items];
  return (
    <div className={`overflow-hidden ${className}`} aria-hidden="true">
      <div className="marquee-track gap-10 py-4 font-display text-xl italic text-plum/70 sm:text-2xl">
        {row.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center gap-10 whitespace-nowrap">
            {item}
            <span className="text-rose">✿</span>
          </span>
        ))}
      </div>
    </div>
  );
}
