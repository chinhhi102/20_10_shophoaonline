"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

import { Envelope } from "@/components/story/Envelope";
import { useCanRender3D } from "@/components/three/useInView";

const EnvelopeCanvas = dynamic(() => import("@/components/three/Envelope3D").then((m) => m.EnvelopeCanvas), {
  ssr: false,
  loading: () => <div className="h-full w-full" />,
});

interface StoryEnvelopeProps {
  title: string;
  herName: string;
  initial: string;
  onOpened: () => void;
}

const OPEN_DELAY_MS = 2200;

/**
 * Cảnh mở đầu trang Mãi Yêu: phong bì 3D sáp niêm mang chữ cái tên cô ấy.
 * Chạm là nắp mở, trái tim bay lên, rồi tự sang cảnh tiếp theo.
 * Máy không có WebGL (hoặc bật giảm chuyển động) dùng phong bì CSS.
 */
export function StoryEnvelope({ title, herName, initial, onOpened }: StoryEnvelopeProps) {
  const can3D = useCanRender3D();
  const [isOpen, setIsOpen] = useState(false);

  if (!can3D) {
    return <Envelope title={title} herName={herName} initial={initial} onOpened={onOpened} />;
  }

  const handleOpen = () => {
    if (isOpen) {
      return;
    }
    setIsOpen(true);
    window.setTimeout(onOpened, OPEN_DELAY_MS);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 data-scene className="text-balance text-center font-script text-[3.2rem] leading-[1.1] text-pearl-bright sm:text-6xl">
        {title}
      </h1>
      <div data-scene className="relative h-[21rem] w-[min(24rem,100vw-1rem)] sm:h-[24rem]">
        <EnvelopeCanvas initial={initial} isOpen={isOpen} onTap={handleOpen} shadowColor="#1a0510" />
        <button
          type="button"
          onClick={handleOpen}
          aria-label={`Mở phong bì gửi ${herName}`}
          className="absolute inset-0 -z-10"
        />
      </div>
      <p data-scene className="font-body text-[1rem] text-petal-soft/80" aria-live="polite">
        {isOpen ? "Đang mở…" : "Chạm vào phong bì để mở"}
      </p>
    </div>
  );
}
