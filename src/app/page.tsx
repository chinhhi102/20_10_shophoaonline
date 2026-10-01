import { ContactLinks } from "@/components/landing/ContactLinks";
import { EventCountdown } from "@/components/landing/EventCountdown";
import { PackageCard } from "@/components/landing/PackageCard";
import { PhoneDemo } from "@/components/landing/PhoneDemo";
import { PACKAGES, SITE } from "@/lib/site";

const DEMO_PATH = "/minh-and-tra/demo/";

const PAINS = [
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
    <p className={`text-[11px] font-medium uppercase tracking-[0.3em] ${light ? "text-petal" : "text-rose-deep"}`}>
      {children}
    </p>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-petal/60 bg-lace/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <a href="#" className="font-script text-3xl text-wine">
          {SITE.name}
        </a>
        <nav className="hidden items-center gap-7 text-sm text-ink-soft md:flex">
          <a href="#goi-qua" className="hover:text-ink">Gói quà</a>
          <a href="#mai-yeu" className="hover:text-ink">Mãi Yêu</a>
          <a href="#lich" className="hover:text-ink">Lịch giao</a>
          <a href="#hoi-dap" className="hover:text-ink">Hỏi đáp</a>
        </nav>
        <a
          href={SITE.zaloUrl}
          target="_blank"
          rel="noopener"
          className="rounded-full bg-rose px-4 py-2 text-sm font-medium text-white hover:bg-rose-deep"
        >
          Đặt trước
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-y-0 right-0 hidden w-[46%] bg-wine lg:block" />
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-14 lg:grid-cols-[1.1fr_0.9fr] lg:pb-28 lg:pt-20">
        <div>
          <Eyebrow>20/10 · Pre-order mở từ {SITE.preorderOpens}</Eyebrow>
          <h1 className="mt-5 font-display text-5xl font-medium leading-[1.05] text-wine sm:text-6xl lg:text-7xl">
            Một bó hoa,
            <br />
            một câu chuyện
            <br />
            <span className="font-script text-6xl font-normal text-rose sm:text-7xl lg:text-8xl">em giữ được mãi.</span>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-ink-soft sm:text-lg">
            Hoa tươi giao tận nơi ngày {SITE.deliveryWindow}, đi cùng thiệp in hình, ảnh đóng khung,
            và với gói Mãi Yêu là một trang web riêng kể chuyện của hai người. Cô ấy quét mã QR trên thiệp,
            phong bì mở ra.
          </p>
          <div className="mt-8">
            <ContactLinks />
          </div>
          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-petal pt-6 text-sm">
            <div>
              <dt className="text-ink-soft">Giao hoa</dt>
              <dd className="mt-1 font-display text-xl text-wine">{SITE.deliveryWindow}</dd>
            </div>
            <div>
              <dt className="text-ink-soft">Giá từ</dt>
              <dd className="mt-1 font-display text-xl text-wine">299.000đ</dd>
            </div>
            <div>
              <dt className="text-ink-soft">Cọc giữ chỗ</dt>
              <dd className="mt-1 font-display text-xl text-wine">50%</dd>
            </div>
          </dl>
        </div>
        <div className="rounded-3xl bg-wine px-6 py-10 lg:bg-transparent lg:p-0">
          <PhoneDemo src={DEMO_PATH} />
        </div>
      </div>
    </section>
  );
}

function Pains() {
  return (
    <section className="lace-edge bg-petal-soft" style={{ ["--lace-color" as string]: "var(--petal-soft)" }}>
      <div className="mx-auto max-w-6xl px-5 py-20">
        <Eyebrow>Nếu bạn từng nghĩ</Eyebrow>
        <h2 className="mt-3 max-w-2xl font-display text-4xl font-medium text-wine">
          Tặng hoa thì dễ. Tặng một thứ cô ấy nhớ mãi mới khó.
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {PAINS.map((p) => (
            <div key={p.fear} className="rounded-2xl bg-white/70 p-6 ring-1 ring-petal">
              <p className="font-display text-xl italic text-ink">“{p.fear}”</p>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{p.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Packages() {
  return (
    <section id="goi-qua" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-5 py-24">
        <div className="text-center">
          <Eyebrow>Ba gói cảm xúc</Eyebrow>
          <h2 className="mt-3 font-display text-4xl font-medium text-wine sm:text-5xl">
            Chọn theo người bạn muốn tặng
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-ink-soft">
            Cả ba gói đều có hoa tươi và thiệp in hình. Khác nhau ở thứ cô ấy giữ lại được sau ngày 20/10.
          </p>
        </div>
        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {PACKAGES.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MaiYeu() {
  return (
    <section
      id="mai-yeu"
      className="lace-edge scroll-mt-20 bg-wine text-pearl-bright"
      style={{ ["--lace-color" as string]: "var(--wine)" }}
    >
      <div className="mx-auto grid max-w-6xl gap-14 px-5 py-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <Eyebrow light>Gói Mãi Yêu hoạt động thế nào</Eyebrow>
          <h2 className="mt-3 font-display text-4xl font-medium sm:text-5xl">
            Một trang web <span className="font-script text-6xl font-normal text-petal">chỉ cô ấy</span> mở được
          </h2>
          <p className="mt-5 text-petal-soft/85">
            Đường link có dạng <code className="rounded bg-white/10 px-1.5 py-0.5 font-body text-sm">hoavakhoanhkhac.vn/minh-and-tra/mã-riêng</code>.
            Không ai tìm thấy nếu không có mã. Chỉ cô ấy, qua mã QR trên tấm thiệp.
          </p>
          <ol className="mt-10 space-y-7">
            {STEPS.map((s, i) => (
              <li key={s.title} className="flex gap-5">
                <span className="wax-seal !h-12 !w-12 shrink-0 !text-xl">{i + 1}</span>
                <div>
                  <h3 className="font-display text-2xl">{s.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-petal-soft/80">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-10">
            <ContactLinks variant="dark" compact />
          </div>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {[
            ["Phong bì sáp niêm", "Chạm vào sáp mang chữ cái tên cô ấy để mở."],
            ["Đếm ngày bên nhau", "Chạy từng giây kể từ ngày kỷ niệm của hai bạn."],
            ["5 điều anh thích ở em", "Ba trái tim ren, mỗi trái tim một mục: 5 điều, cảm ơn, lời chúc."],
            ["Bó hoa bằng ảnh", "Ảnh hai bạn gói thành bó hoa, vòng chữ “I love you” xoay quanh."],
            ["Album kỷ niệm", "Ảnh polaroid với chú thích do bạn viết."],
            ["Thư và giọng nói", "Lá thư ký tên bạn, kèm đoạn ghi âm nếu bạn muốn."],
          ].map(([title, body]) => (
            <li key={title} className="rounded-2xl border border-pearl/20 bg-white/5 p-5">
              <p className="font-display text-xl">{title}</p>
              <p className="mt-1 text-sm text-petal-soft/75">{body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Timeline() {
  return (
    <section id="lich" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-5 py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-start">
          <div className="rounded-3xl bg-wine p-8 text-pearl-bright">
            <Eyebrow light>Còn lại đến 20/10</Eyebrow>
            <div className="mt-4">
              <EventCountdown targetIso={SITE.eventDate} />
            </div>
            <p className="mt-6 text-sm text-petal-soft/80">
              Pre-order đóng ngày {SITE.preorderCloses}. Hoa tươi nhập theo số đơn đã chốt, nên sau ngày đó tụi mình không nhận thêm.
            </p>
          </div>
          <ol className="relative space-y-8 border-l border-petal pl-8">
            {TIMELINE.map((t) => (
              <li key={t.date} className="relative">
                <span className="absolute -left-[37px] top-1.5 h-3.5 w-3.5 rounded-full bg-rose ring-4 ring-lace" />
                <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-rose-deep">{t.date}</p>
                <h3 className="mt-1 font-display text-2xl text-wine">{t.title}</h3>
                <p className="mt-1 text-sm text-ink-soft">{t.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Order() {
  return (
    <section
      id="dat-truoc"
      className="lace-edge scroll-mt-20 bg-petal-soft"
      style={{ ["--lace-color" as string]: "var(--petal-soft)" }}
    >
      <div className="mx-auto max-w-6xl px-5 py-24">
        <div className="lace-card mx-auto max-w-3xl px-7 py-12 text-center sm:px-12">
          <p className="font-script text-6xl text-rose-deep">Đặt trước</p>
          <h2 className="mt-2 font-display text-3xl font-medium text-wine">
            Một tin nhắn là xong. Tụi mình lo phần còn lại.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-ink-soft">
            Nhắn Zalo hoặc gọi, báo gói bạn chọn và ngày muốn nhận. Tụi mình xác nhận hoa, nhận cọc 50% và giữ slot giao cho bạn.
          </p>
          <div className="mt-8 flex justify-center">
            <ContactLinks />
          </div>
          <p className="mt-6 text-sm text-ink-soft">
            Hoặc nhắn Facebook: <a href={SITE.facebookUrl} className="underline underline-offset-4">fb.com/thanhphuong2710</a>
          </p>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section id="hoi-dap" className="scroll-mt-20">
      <div className="mx-auto max-w-3xl px-5 py-24">
        <Eyebrow>Hỏi đáp</Eyebrow>
        <h2 className="mt-3 font-display text-4xl font-medium text-wine">Trước khi bạn nhắn</h2>
        <div className="mt-8 divide-y divide-petal">
          {FAQ.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-xl text-ink">
                {f.q}
                <span className="text-rose transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-wine text-petal-soft/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-12 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-script text-4xl text-pearl-bright">{SITE.name}</p>
          <p className="mt-1 text-sm">{SITE.tagline}</p>
        </div>
        <div className="text-sm">
          <p>
            Zalo / Gọi: <a href={`tel:${SITE.phone}`} className="text-pearl-bright">{SITE.phoneDisplay}</a>
          </p>
          <p className="mt-1">
            Facebook: <a href={SITE.facebookUrl} className="text-pearl-bright">fb.com/thanhphuong2710</a>
          </p>
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
        <Pains />
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
