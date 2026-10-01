import type { StoryPhoto } from "@/lib/story-types";

interface BouquetProps {
  photos: StoryPhoto[];
}

const RING_TEXT =
  "I love you · Anh yêu em · 愛してる · Te amo · Je t'aime · 사랑해 · Ich liebe dich · Ti amo · 我爱你 · ";

const FAN = [
  { angle: -28, lift: 22 },
  { angle: -14, lift: 7 },
  { angle: 0, lift: 0 },
  { angle: 14, lift: 7 },
  { angle: 28, lift: 22 },
];

/** Bó hoa bằng ảnh: mỗi tấm ảnh là một bông, bọc giấy hồng, vòng chữ "I love you" xoay quanh. */
export function Bouquet({ photos }: BouquetProps) {
  const stems = photos.slice(0, 5);
  const offset = Math.floor((5 - stems.length) / 2);
  return (
    <div className="relative mx-auto h-[440px] w-[340px] sm:h-[480px] sm:w-[380px]">
      <svg viewBox="0 0 400 400" className="anim-spin-slow absolute inset-0 h-full w-full">
        <defs>
          <path id="ring" d="M200,200 m-178,0 a178,178 0 1,1 356,0 a178,178 0 1,1 -356,0" />
        </defs>
        <text className="font-display" fill="#efe3c8" fontSize="18" letterSpacing="1.5">
          <textPath href="#ring">{RING_TEXT}</textPath>
        </text>
      </svg>
      <div className="absolute inset-x-0 top-[12%] bottom-[8%]">
        {stems.map((photo, i) => {
          const slot = FAN[i + offset];
          return (
            <div
              key={photo.url}
              className="absolute bottom-[38%] left-1/2 w-[104px] origin-bottom"
              style={{
                transform: `translateX(-50%) rotate(${slot.angle}deg)`,
                zIndex: 5 - Math.abs(2 - (i + offset)),
                paddingBottom: `${slot.lift}px`,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.url}
                alt={photo.caption}
                className="h-[128px] w-[104px] rounded-t-full border-[3px] border-[#fff6f8] object-cover shadow-[0_10px_18px_-6px_rgba(0,0,0,0.6)]"
              />
              <div className="mx-auto h-[70px] w-[10px] bg-gradient-to-b from-[#7a9a6a] to-[#4f6b44]" />
            </div>
          );
        })}
        <div
          className="absolute bottom-0 left-1/2 h-[46%] w-[240px] -translate-x-1/2 bg-gradient-to-b from-[#f8dbe2] via-[#f1c6d1] to-[#e5adbc] shadow-[0_24px_40px_-18px_rgba(0,0,0,0.75)]"
          style={{ clipPath: "polygon(0 0, 100% 0, 68% 100%, 32% 100%)", zIndex: 6 }}
        />
        <div
          className="absolute bottom-[6%] left-1/2 h-[40%] w-[210px] -translate-x-1/2 bg-gradient-to-b from-[#fff3f6] to-[#f5d6de] opacity-90"
          style={{ clipPath: "polygon(0 0, 50% 22%, 100% 0, 66% 100%, 34% 100%)", zIndex: 7 }}
        />
        <div
          className="absolute bottom-[26%] left-1/2 -translate-x-1/2"
          style={{ zIndex: 8 }}
          aria-hidden="true"
        >
          <div className="flex items-center">
            <span className="block h-7 w-11 rounded-full border-[3px] border-[#b2435d] bg-[#c8536f]" />
            <span className="-mx-1 block h-4 w-4 rounded-sm bg-[#8e3047]" />
            <span className="block h-7 w-11 rounded-full border-[3px] border-[#b2435d] bg-[#c8536f]" />
          </div>
        </div>
      </div>
    </div>
  );
}
