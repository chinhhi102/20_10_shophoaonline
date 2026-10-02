import { asset } from "@/lib/site";
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
    <div className="relative mx-auto h-[440px] w-[min(340px,calc(100vw-40px))] sm:h-[480px] sm:w-[380px]">
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
                src={asset(photo.url)}
                alt={photo.caption}
                className="h-[128px] w-[104px] rounded-t-full border-[3px] border-[#fff6f8] object-cover shadow-[0_10px_18px_-6px_rgba(0,0,0,0.6)]"
              />
              <div className="mx-auto h-[70px] w-[10px] bg-gradient-to-b from-[#7a9a6a] to-[#4f6b44]" />
            </div>
          );
        })}
        <svg
          viewBox="0 0 240 200"
          aria-hidden="true"
          className="absolute bottom-0 left-1/2 h-[48%] w-[250px] -translate-x-1/2 drop-shadow-[0_24px_30px_rgba(0,0,0,0.45)]"
          style={{ zIndex: 6 }}
        >
          <defs>
            <linearGradient id="wrap" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fbe3e9" />
              <stop offset="1" stopColor="#e9b4c2" />
            </linearGradient>
            <linearGradient id="fold" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fff6f8" />
              <stop offset="1" stopColor="#f3cdd7" />
            </linearGradient>
          </defs>
          <path
            d="M6 14 C 40 -4, 80 22, 120 8 C 160 -6, 200 20, 234 12 C 226 70, 190 150, 150 196 C 136 200, 104 200, 90 196 C 50 150, 14 70, 6 14 Z"
            fill="url(#wrap)"
          />
          <path
            d="M34 40 C 70 24, 100 48, 120 34 C 140 20, 170 40, 206 36 C 196 84, 172 140, 146 186 C 130 190, 110 190, 94 186 C 68 140, 44 84, 34 40 Z"
            fill="url(#fold)"
            opacity="0.9"
          />
          <g transform="translate(120 112)">
            <path d="M0 0 C -14 -22, -44 -22, -40 -4 C -38 10, -14 12, 0 0 Z" fill="#d6617c" />
            <path d="M0 0 C 14 -22, 44 -22, 40 -4 C 38 10, 14 12, 0 0 Z" fill="#d6617c" />
            <path d="M0 2 C -8 18, -16 30, -12 40 C -6 34, -2 20, 0 2 Z" fill="#c24d69" />
            <path d="M0 2 C 8 18, 16 30, 12 40 C 6 34, 2 20, 0 2 Z" fill="#c24d69" />
            <circle r="6" fill="#b2435d" />
          </g>
        </svg>
      </div>
    </div>
  );
}
