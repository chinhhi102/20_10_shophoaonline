import { ContactLinks } from "@/components/landing/ContactLinks";
import { EventCountdown } from "@/components/landing/EventCountdown";
import { Marquee } from "@/components/landing/Marquee";
import { PackageCard } from "@/components/landing/PackageCard";
import { PhoneDemo } from "@/components/landing/PhoneDemo";
import { Wave } from "@/components/landing/Wave";
import { HeroIntro } from "@/components/motion/HeroIntro";
import { Petals } from "@/components/motion/Petals";
import { Reveal } from "@/components/motion/Reveal";
import { PACKAGES, SITE, asset } from "@/lib/site";

const DEMO_PATH = "/minh-and-tra/demo/";

const PACKAGE_PHOTOS: Record<string, string> = {
  "hoa-nho": "/img/bouquet-ribbon.jpg",
  "khoanh-khac": "/img/peony-hold.jpg",
  "mai-yeu": "/img/bouquet-lace.jpg",
};

const MARQUEE = [
  "Hoa tươi giao tận tay",
  "Thiệp in hình",
  "Ảnh AI đóng khung",
  "Trang web kể chuyện riêng",
  "Giao 19 và 20/10",
  "Pre-order mở từ 05/10",
];

const KEEPS = [
  { fear: "Sợ hoa “một màu”, tặng xong là quên", answer: "Mỗi bó đi kèm một thứ để giữ lại: thiệp in hình, ảnh đóng khung, hay cả một trang web riêng." },
  { fear: "Muốn nói nhiều mà ngại nói thành lời", answer: "Bạn gửi vài dòng và vài tấm ảnh, tụi mình dựng thành câu chuyện. Cô ấy đọc, bạn không phải nói." },
  { fear: "Không có thời gian chuẩn bị", answer: "Chỉ cần một tin nhắn Zalo. Hoa, thiệp, ảnh, khung và trang web đều được làm sẵn, giao đúng ngày." },
  { fear: "Lo hoa héo rồi kỷ niệm cũng trôi", answer: "Hoa có thể héo, nhưng ảnh trên bàn và trang web vẫn mở lại được bất cứ lúc nào." },
];

const STEPS = [
  { title: "Nhắn Zalo cho tụi mình", body: "Chọn gói, báo tên hai bạn, ngày kỷ niệm và gửi 5 tấm ảnh cùng vài dòng bạn muốn nói." },
  { title: "Tụi mình dựng trang riêng", body: "Trong 24 giờ bạn nhận link xem trước dạng /tên-anh-and-tên-em/mã-riêng. Sửa đến khi ưng mới chốt." },
  { title: "Cô ấy quét QR trên thiệp", body: "Thiệp in mã QR đi cùng bó hoa. Quét là phong bì mở ra, câu chuyện bắt đầu." },
];

const TIMELINE = [
  { date: "05 – 12/10", title: "Mở pre-order", body: "Nhận cọc 50%. Làm trước hoa sáp và các phần lưu giữ." },
  { date: "13 – 18/10", title: "Chốt đơn", body: "Nhập hoa tươi cận lễ, hoàn thiện ảnh AI, khung và trang web." },
  { date: "19 – 20/10", title: "Giao hoa", body: "Giao đúng giờ hẹn. Đổi bó mới nếu hoa dập trong lúc giao." },
];

const FAQ = [
  { q: "Đặt sớm có lợi gì?", a: "Giữ được mẫu hoa bạn chọn và slot giao đúng khung giờ. Số lượng hoa tươi tụi mình nhập theo đơn đã chốt, cận lễ sẽ không nhận thêm." },
  { q: "Trang web Mãi Yêu tồn tại bao lâu?", a: "Ít nhất một năm. Link chỉ mở được khi có đúng mã riêng, không ai tìm thấy trên Google." },
  { q: "Ảnh AI là gì?", a: "Bạn gửi ảnh chân dung cô ấy, tụi mình tạo bức ảnh cô ấy đang ôm đúng bó hoa bạn tặng, in và đóng khung để bàn." },
  { q: "Giao ở đâu, phí bao nhiêu?", a: "Nội thành, phí giao đã tính trong giá gói. Ngoại thành nhắn Zalo để tụi mình báo phí trước." },
];

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p
      className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.25em] ${
        light ? "bg-white/10 text-blush" : "bg-blush text-rose-deep"
      }`}
    >
      <span className="text-rose">✿</span>
      {children}
    </p>
  );
}

function Header() {
  return (
    <header className="sticky top-4 z-30 px-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full bg-cream/80 px-5 py-2.5 shadow-[0_18px_40px_-24px_rgba(91,36,64,0.45)] backdrop-blur">
        <a href="#" className="font-script text-2xl text-plum sm:text-3xl">
          {SITE.name}
        </a>
        <nav className="hidden items-center gap-7 text-sm text-ink-soft md:flex">
          <a href="#goi-qua" className="transition hover:text-plum">Gói quà</a>
          <a href="#mai-yeu" className="transition hover:text-plum">Mãi Yêu</a>
          <a href="#lich" className="transition hover:text-plum">Lịch giao</a>
          <a href="#hoi-dap" className="transition hover:text-plum">Hỏi đáp</a>
        </nav>
        <a
          href={SITE.zaloUrl}
          target="_blank"
          rel="noopener"
          className="rounded-full bg-gradient-to-r from-rose to-rose-deep px-5 py-2 text-sm font-medium text-white shadow-[0_12px_24px_-10px_rgba(232,112,138,0.9)] transition hover:-translate-y-0.5"
        >
          Đặt trước
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <HeroIntro className="relative -mt-16 overflow-hidden pt-16">
      <div data-hero="glow" className="glow blob -left-40 top-10 h-[520px] w-[520px] bg-blush" />
      <div data-hero="glow" className="glow blob blob-slow right-[-120px] top-[320px] h-[460px] w-[460px] bg-peach" />
      <Petals count={16} />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pb-16 pt-12 lg:grid-cols-[1.05fr_0.95fr] lg:pb-28 lg:pt-20">
        <div>
          <div data-hero="eyebrow">
            <Eyebrow>20/10 · Pre-order mở từ {SITE.preorderOpens}</Eyebrow>
          </div>
          <h1
            data-hero="title"
            className="mt-6 font-display text-[2.9rem] font-medium leading-[1.04] text-plum sm:text-6xl lg:text-7xl"
          >
            <span className="block">Một bó hoa,</span>
            <span className="block">một câu chuyện</span>
            <span className="block font-script text-6xl font-normal text-rose sm:text-7xl lg:text-8xl">
              em giữ được mãi.
            </span>
          </h1>
          <p data-hero="copy" className="mt-6 max-w-lg text-base leading-relaxed text-ink-soft sm:text-lg">
            Hoa tươi giao tận nơi ngày {SITE.deliveryWindow}, đi cùng thiệp in hình, ảnh đóng khung, và với gói
            Mãi Yêu là một trang web riêng kể chuyện của hai người. Cô ấy quét mã QR trên thiệp, phong bì mở ra.
          </p>
          <div data-hero="cta" className="mt-8">
            <ContactLinks />
          </div>
          <dl data-hero="copy" className="mt-10 flex max-w-md flex-wrap gap-x-10 gap-y-4 text-sm">
            {[
              ["Giao hoa", SITE.deliveryWindow],
              ["Giá từ", "299.000đ"],
              ["Cọc giữ chỗ", "50%"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-ink-soft">{k}</dt>
                <dd className="mt-0.5 font-display text-2xl text-plum">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative mx-auto w-full max-w-[440px]">
          <div data-hero="photo" className="soft-photo aspect-[4/5] shadow-[0_60px_100px_-40px_rgba(91,36,64,0.6)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset("/img/hero-bouquet.jpg")} alt="Bó hoa hồng bọc giấy hồng được trao tận tay" className="h-full w-full object-cover" />
          </div>
          <a
            href="#mai-yeu"
            data-hero="float"
            className="soft-card absolute -bottom-6 left-0 flex items-center gap-4 px-5 py-4 sm:-left-10"
          >
            <span className="wax-seal !h-14 !w-14 !text-2xl">♥</span>
            <span>
              <span className="block font-display text-lg text-plum">Quét QR trên thiệp</span>
              <span className="block text-xs text-ink-soft">một trang web chỉ cô ấy mở được</span>
            </span>
          </a>
          <div
            data-hero="float"
            className="soft-card absolute -right-2 top-8 rotate-6 px-4 py-3 text-center sm:-right-8"
          >
            <span className="block font-script text-3xl text-rose">20/10</span>
            <span className="block text-[11px] uppercase tracking-[0.2em] text-ink-soft">giao đúng ngày</span>
          </div>
        </div>
      </div>
      <Marquee items={MARQUEE} className="border-y border-blush bg-white/40" />
    </HeroIntro>
  );
}

function Keeps() {
  return (
    <Reveal as="section" className="relative">
      <div className="glow blob -right-32 top-20 h-[420px] w-[420px] bg-blush" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-24 lg:grid-cols-[0.9fr_1.1fr]">
        <div data-reveal="left" className="relative mx-auto w-full max-w-[460px]">
          <div className="soft-photo aspect-square shadow-[0_50px_90px_-40px_rgba(91,36,64,0.55)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset("/img/bouquet-lace.jpg")} alt="Bó hoa hồng và cẩm chướng đặt trên tấm ren" className="h-full w-full object-cover" />
          </div>
          <p className="soft-card absolute -bottom-6 right-0 max-w-[240px] px-5 py-4 font-display text-lg italic text-plum">
            “Mỗi bó hoa là một câu chuyện. Hãy để người nhận giữ khoảnh khắc ấy mãi.”
          </p>
        </div>
        <div>
          <div data-reveal="up">
            <Eyebrow>Những gì cô ấy giữ lại</Eyebrow>
          </div>
          <h2 data-reveal="up" className="mt-4 max-w-xl font-display text-4xl font-medium text-plum sm:text-5xl">
            Tặng hoa thì dễ. Tặng một thứ cô ấy nhớ mãi mới khó.
          </h2>
          <div className="mt-8 space-y-4">
            {KEEPS.map((k, i) => (
              <div
                key={k.fear}
                data-reveal="right"
                className="soft-card px-6 py-5"
                style={{ marginLeft: `${(i % 2) * 20}px` }}
              >
                <p className="font-display text-xl italic text-plum">“{k.fear}”</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{k.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function Packages() {
  return (
    <Reveal as="section" className="relative scroll-mt-24">
      <div id="goi-qua" className="absolute -top-24" />
      <Wave fill="var(--blush)" />
      <div className="bg-blush">
        <div className="mx-auto max-w-6xl px-5 pb-28 pt-10">
          <div className="text-center">
            <div data-reveal="up">
              <Eyebrow>Ba gói cảm xúc</Eyebrow>
            </div>
            <h2 data-reveal="up" className="mt-4 font-display text-4xl font-medium text-plum sm:text-5xl">
              Chọn theo người bạn muốn tặng
            </h2>
            <p data-reveal="up" className="mx-auto mt-4 max-w-xl text-ink-soft">
              Cả ba gói đều có hoa tươi và thiệp in hình. Khác nhau ở thứ cô ấy giữ lại được sau ngày 20/10.
            </p>
          </div>
          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {PACKAGES.map((pkg, i) => (
              <PackageCard key={pkg.id} pkg={pkg} photo={asset(PACKAGE_PHOTOS[pkg.id])} index={i} />
            ))}
          </div>
        </div>
      </div>
      <Wave fill="var(--cream)" />
    </Reveal>
  );
}

function MaiYeu() {
  return (
    <Reveal as="section" className="relative scroll-mt-24">
      <div id="mai-yeu" className="absolute -top-24" />
      <Wave fill="var(--plum)" />
      <div className="relative overflow-hidden bg-plum text-cream">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset("/img/lily-dark.jpg")}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 h-full w-[60%] object-cover opacity-35 [mask-image:linear-gradient(to_left,black,transparent)]"
        />
        <Petals count={10} tone="dark" />
        <div className="relative mx-auto grid max-w-6xl gap-14 px-5 py-20 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:py-28">
          <div>
            <div data-reveal="up">
              <Eyebrow light>Gói Mãi Yêu hoạt động thế nào</Eyebrow>
            </div>
            <h2 data-reveal="up" className="mt-4 font-display text-4xl font-medium sm:text-5xl">
              Một trang web <span className="font-script text-6xl font-normal text-gold-soft">chỉ cô ấy</span> mở được
            </h2>
            <p data-reveal="up" className="mt-5 text-blush/80">
              Đường link có dạng{" "}
              <code className="rounded-full bg-white/10 px-2 py-0.5 font-body text-sm">hoavakhoanhkhac.vn/minh-and-tra/mã-riêng</code>.
              Không ai tìm thấy nếu không có mã. Chỉ cô ấy, qua mã QR trên tấm thiệp.
            </p>
            <ol className="mt-10 space-y-6">
              {STEPS.map((s, i) => (
                <li key={s.title} data-reveal="left" className="flex gap-5">
                  <span className="wax-seal !h-12 !w-12 shrink-0 !text-xl">{i + 1}</span>
                  <div>
                    <h3 className="font-display text-2xl">{s.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-blush/75">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div data-reveal="up" className="mt-10">
              <ContactLinks variant="dark" compact />
            </div>
          </div>
          <div data-reveal="scale">
            <PhoneDemo src={asset(DEMO_PATH)} />
          </div>
        </div>
      </div>
      <Wave fill="var(--cream)" />
    </Reveal>
  );
}

function Timeline() {
  return (
    <Reveal as="section" className="relative scroll-mt-24">
      <div id="lich" className="absolute -top-24" />
      <div className="glow blob -left-24 bottom-0 h-[380px] w-[380px] bg-peach" />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 py-20 lg:grid-cols-[1fr_1.3fr] lg:items-center">
        <div data-reveal="left" className="rounded-[2.5rem] bg-gradient-to-br from-peach via-blush to-cream p-8 shadow-[0_40px_80px_-40px_rgba(91,36,64,0.4)] sm:p-10">
          <Eyebrow>Còn lại đến 20/10</Eyebrow>
          <div className="mt-6">
            <EventCountdown targetIso={SITE.eventDate} />
          </div>
          <p className="mt-6 text-sm text-ink-soft">
            Pre-order đóng ngày {SITE.preorderCloses}. Hoa tươi nhập theo số đơn đã chốt, nên sau ngày đó tụi mình không nhận thêm.
          </p>
        </div>
        <ol className="space-y-5">
          {TIMELINE.map((t, i) => (
            <li key={t.date} data-reveal="right" className="soft-card flex gap-5 px-6 py-5" style={{ marginLeft: `${i * 18}px` }}>
              <span className="mt-1 h-3 w-3 shrink-0 rounded-full bg-rose shadow-[0_0_0_6px_var(--blush)]" />
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-rose-deep">{t.date}</p>
                <h3 className="mt-1 font-display text-2xl text-plum">{t.title}</h3>
                <p className="mt-1 text-sm text-ink-soft">{t.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Reveal>
  );
}

function Order() {
  return (
    <Reveal as="section" className="relative scroll-mt-24">
      <div id="dat-truoc" className="absolute -top-24" />
      <div className="mx-auto max-w-6xl px-5 py-16">
        <div data-reveal="scale" className="relative overflow-hidden rounded-[3rem] shadow-[0_60px_100px_-50px_rgba(91,36,64,0.6)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset("/img/rose-macro.jpg")} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-cream/95 via-blush/85 to-peach/80" />
          <Petals count={8} />
          <div className="relative px-7 py-16 text-center sm:px-12 sm:py-20">
            <p className="font-script text-7xl text-rose">Đặt trước</p>
            <h2 className="mt-2 font-display text-3xl font-medium text-plum sm:text-4xl">
              Một tin nhắn là xong. Tụi mình lo phần còn lại.
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-ink-soft">
              Nhắn Zalo hoặc gọi, báo gói bạn chọn và ngày muốn nhận. Tụi mình xác nhận hoa, nhận cọc 50% và giữ slot giao cho bạn.
            </p>
            <div className="mt-8 flex justify-center">
              <ContactLinks />
            </div>
            <p className="mt-6 text-sm text-ink-soft">
              Hoặc nhắn Facebook:{" "}
              <a href={SITE.facebookUrl} className="underline underline-offset-4">fb.com/thanhphuong2710</a>
            </p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function Faq() {
  return (
    <Reveal as="section" className="scroll-mt-24">
      <div id="hoi-dap" />
      <div className="mx-auto max-w-3xl px-5 py-20">
        <div data-reveal="up">
          <Eyebrow>Hỏi đáp</Eyebrow>
        </div>
        <h2 data-reveal="up" className="mt-4 font-display text-4xl font-medium text-plum">Trước khi bạn nhắn</h2>
        <div className="mt-8 space-y-3">
          {FAQ.map((f) => (
            <details key={f.q} data-reveal="up" className="group soft-card px-6 py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-xl text-plum">
                {f.q}
                <span className="grid h-8 w-8 place-items-center rounded-full bg-blush text-rose transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

function Footer() {
  return (
    <footer className="relative">
      <Wave fill="var(--plum)" />
      <div className="relative overflow-hidden bg-plum text-blush/80">
        <Petals count={8} tone="dark" />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-6 px-5 pb-12 pt-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-script text-5xl text-gold-soft">{SITE.name}</p>
            <p className="mt-1 text-sm">{SITE.tagline}</p>
          </div>
          <div className="text-sm">
            <p>
              Zalo / Gọi: <a href={`tel:${SITE.phone}`} className="text-cream">{SITE.phoneDisplay}</a>
            </p>
            <p className="mt-1">
              Facebook: <a href={SITE.facebookUrl} className="text-cream">fb.com/thanhphuong2710</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Keeps />
        <Packages />
        <MaiYeu />
        <Timeline />
        <Order />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
