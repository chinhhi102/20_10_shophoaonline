interface PhoneDemoProps {
  src: string;
}

/** Khung điện thoại chạy trang Mãi Yêu thật, để khách tự chạm thử ngay trên landing. */
export function PhoneDemo({ src }: PhoneDemoProps) {
  return (
    <div className="relative mx-auto w-[300px] sm:w-[320px]">
      <div className="absolute -inset-6 -z-10 rounded-[56px] bg-rose/20 blur-2xl" />
      <div className="rounded-[44px] border-[10px] border-[#1d0a10] bg-[#1d0a10] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]">
        <div className="relative overflow-hidden rounded-[34px] bg-wine">
          <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-[#1d0a10]" />
          <iframe
            src={src}
            title="Demo trang Mãi Yêu"
            className="h-[600px] w-full"
            loading="lazy"
          />
        </div>
      </div>
      <p className="mt-4 text-center font-display text-sm italic text-petal-soft/80">
        Chạm vào sáp để mở thử. Đây là trang thật, không phải ảnh.
      </p>
    </div>
  );
}
