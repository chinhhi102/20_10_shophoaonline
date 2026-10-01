interface PhoneDemoProps {
  src: string;
}

/** Khung điện thoại bo mềm chạy trang Mãi Yêu thật, để khách tự chạm thử. */
export function PhoneDemo({ src }: PhoneDemoProps) {
  return (
    <div className="relative mx-auto w-[290px] sm:w-[310px]">
      <div className="blob absolute -inset-10 -z-10 bg-rose/30 blur-2xl" />
      <div className="rounded-[46px] bg-gradient-to-b from-[#3a1428] to-[#1f0a16] p-[9px] shadow-[0_50px_90px_-30px_rgba(0,0,0,0.75)]">
        <div className="relative overflow-hidden rounded-[38px] bg-wine">
          <div className="absolute left-1/2 top-2.5 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-[#1f0a16]" />
          <iframe src={src} title="Demo trang Mãi Yêu" className="h-[600px] w-full" loading="lazy" />
        </div>
      </div>
      <p className="mt-5 text-center font-display text-base italic text-blush/80">
        Chạm vào sáp để mở thử. Đây là trang thật, không phải ảnh.
      </p>
    </div>
  );
}
