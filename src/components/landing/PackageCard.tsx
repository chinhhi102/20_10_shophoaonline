import { formatVnd, type Package } from "@/lib/site";

interface PackageCardProps {
  pkg: Package;
}

/** Thẻ gói quà có nắp phong bì và sáp niêm, gói Mãi Yêu nền đỏ rượu. */
export function PackageCard({ pkg }: PackageCardProps) {
  const featured = pkg.featured === true;
  const surface = featured ? "bg-wine text-pearl-bright" : "bg-white/80 text-ink";
  const muted = featured ? "text-petal-soft/80" : "text-ink-soft";
  const flap = featured ? "bg-wine-deep" : "bg-lace-deep";
  return (
    <article
      className={`relative flex flex-col overflow-hidden rounded-2xl ${surface} shadow-[0_30px_60px_-30px_rgba(75,16,32,0.45)] ${
        featured ? "ring-2 ring-rose/60 lg:-translate-y-4" : "ring-1 ring-petal"
      }`}
    >
      <div className={`relative h-20 ${flap}`} style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }} />
      <span className="wax-seal absolute left-1/2 top-9 -translate-x-1/2 !h-16 !w-16 !text-2xl">
        {pkg.name.charAt(0)}
      </span>
      <div className="flex flex-1 flex-col px-7 pb-8 pt-10">
        <p className={`text-[11px] font-medium uppercase tracking-[0.25em] ${muted}`}>{pkg.level}</p>
        <h3 className="mt-1 font-script text-5xl">{pkg.name}</h3>
        <p className="mt-3 font-display text-2xl">
          {formatVnd(pkg.priceFrom)} <span className={`text-base ${muted}`}>– {formatVnd(pkg.priceTo)}</span>
        </p>
        <p className={`mt-3 text-sm leading-relaxed ${muted}`}>{pkg.promise}</p>
        <ul className="mt-5 space-y-2 text-sm">
          {pkg.includes.map((item) => (
            <li key={item} className="flex gap-2.5">
              <span className={featured ? "text-petal" : "text-rose"}>✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className={`mt-5 border-t pt-4 text-xs ${featured ? "border-pearl/20" : "border-petal"} ${muted}`}>
          Hợp với: {pkg.audience}
        </p>
        <a
          href="#dat-truoc"
          className={`mt-6 inline-block rounded-full py-3 text-center text-sm font-medium transition ${
            featured ? "bg-rose text-white hover:bg-rose-deep" : "bg-ink text-lace hover:bg-wine"
          }`}
        >
          Chọn gói {pkg.name}
        </a>
      </div>
    </article>
  );
}
