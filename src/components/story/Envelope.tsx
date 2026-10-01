"use client";

import { useState } from "react";

interface EnvelopeProps {
  title: string;
  herName: string;
  initial: string;
  onOpened: () => void;
}

/** Phong bì sáp niêm: bấm vào sáp để mở nắp, sau đó mới sang cảnh tiếp theo. */
export function Envelope({ title, herName, initial, onOpened }: EnvelopeProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (isOpen) {
      return;
    }
    setIsOpen(true);
    window.setTimeout(onOpened, 900);
  };

  return (
    <div className="flex flex-col items-center gap-10">
      <h1 data-scene className="font-script text-5xl text-pearl-bright sm:text-6xl">
        {title}
      </h1>
      <button
        type="button"
        onClick={handleOpen}
        aria-label={`Mở phong bì gửi ${herName}`}
        data-scene className="relative h-[200px] w-[300px] cursor-pointer sm:h-[230px] sm:w-[340px]"
        style={{ perspective: "900px" }}
      >
        <div className="absolute inset-0 rounded-md bg-[#f7f1ec] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)]" />
        <div
          className="absolute inset-x-0 bottom-0 h-[62%] bg-[#efe6e0]"
          style={{ clipPath: "polygon(0 0, 50% 55%, 100% 0, 100% 100%, 0 100%)" }}
        />
        <div
          className="absolute inset-y-0 left-0 w-1/2 bg-[#f3ece7]"
          style={{ clipPath: "polygon(0 0, 100% 50%, 0 100%)" }}
        />
        <div
          className="absolute inset-y-0 right-0 w-1/2 bg-[#f3ece7]"
          style={{ clipPath: "polygon(100% 0, 0 50%, 100% 100%)" }}
        />
        <div
          className="absolute inset-x-0 top-0 h-[58%] origin-top bg-[#fbf6f2] transition-transform duration-700 ease-in-out"
          style={{
            clipPath: "polygon(0 0, 100% 0, 50% 100%)",
            transform: isOpen ? "rotateX(180deg)" : "rotateX(0deg)",
            boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
          }}
        />
        <span
          className={`wax-seal absolute left-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
            isOpen ? "scale-50 opacity-0" : "scale-100 opacity-100"
          }`}
        >
          {initial}
        </span>
      </button>
      <p
        data-scene className="font-display text-lg italic text-petal-soft/80"
      >
        {isOpen ? "Đang mở…" : "Chạm vào sáp để mở"}
      </p>
    </div>
  );
}
