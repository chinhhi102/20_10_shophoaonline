import { formatVnd, type Package } from "@/lib/site";

interface PackageCardProps {
  pkg: Package;
  photo: string;
  index: number;
}

/** Thẻ gói quà: ảnh thật phía trên cắt mềm, thân thẻ bo tròn lớn. Gói Mãi Yêu màu mận. */
export function PackageCard({ pkg, photo, index }: PackageCardProps) {
  const featured = pkg.featured === true;
  const muted = featured ? "text-blush/75" : "text-ink-soft";
  return (
    <article
      data-reveal="up"
      className={`group relative flex flex-col overflow-hidden rounded-[2.2rem] transition-transform duration-500 hover:-translate-y-2 ${
        featured
          ? "bg-plum text-cream shadow-[0_40px_80px_-30px_rgba(63,21,48,0.7)] lg:-translate-y-5 lg:hover:-translate-y-7"
          : "bg-white/80 text-ink shadow-[0_30px_60px_-30px_rgba(91,36,64,0.35)]"
      }`}
      style={{ transitionDelay: `${index * 40}ms` }}
    >
      <div className="relative h-60 overflow-hidden" style={{ borderRadius: "0 0 55% 45% / 0 0 22% 22%" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo}
          alt={`Mẫu hoa gói ${pkg.name}`}
          className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
        />
        <div
          className={`absolute inset-0 ${featured ? "bg-gradient-to-t from-plum via-plum/10 to-transparent" : "bg-gradient-to-t from-white/70 to-transparent"}`}
        />
        <span
          className={`absolute left-6 top-6 rounded-full px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] ${
            featured ? "bg-gold text-plum" : "bg-white/85 text-rose-deep"
          }`}
        >
          {pkg.level}
        </span>
      </div>
      <div className="flex flex-1 flex-col px-8 pb-9 pt-2">
        <h3 className={`font-script text-5xl ${featured ? "text-gold-soft" : "text-plum"}`}>{pkg.name}</h3>
        <p className="mt-2 font-display text-2xl">
          {formatVnd(pkg.priceFrom)} <span className={`text-base ${muted}`}>– {formatVnd(pkg.priceTo)}</span>
        </p>
        <p className={`mt-3 text-sm leading-relaxed ${muted}`}>{pkg.promise}</p>
        <ul className="mt-5 space-y-2 text-sm">
          {pkg.includes.map((item) => (
            <li key={item} className="flex gap-2.5">
              <span className={featured ? "text-gold" : "text-rose"}>✿</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className={`mt-5 text-xs ${muted}`}>Hợp với: {pkg.audience}</p>
        <a
          href="#dat-truoc"
          className={`mt-6 inline-block rounded-full py-3.5 text-center text-sm font-medium transition ${
            featured
              ? "bg-rose text-white hover:bg-rose-deep"
              : "bg-blush text-plum hover:bg-blush-deep"
          }`}
        >
          Chọn gói {pkg.name}
        </a>
      </div>
    </article>
  );
}
