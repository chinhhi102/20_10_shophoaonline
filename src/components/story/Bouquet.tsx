import { asset } from "@/lib/site";
import type { StoryPhoto } from "@/lib/story-types";

interface BouquetProps {
  photos: StoryPhoto[];
}

const RING_TEXT =
  "I love you · Anh yêu em · 愛してる · Te amo · Je t'aime · 사랑해 · Ich liebe dich · Ti amo · 我爱你 · ";

/** Vị trí 5 bông theo hình bó: giữa cao nhất, hai bên thấp dần. left theo % bề rộng, top theo px. */
const SLOTS = [
  { left: 15, top: 78, angle: -22 },
  { left: 32, top: 40, angle: -11 },
  { left: 50, top: 14, angle: 0 },
  { left: 68, top: 40, angle: 11 },
  { left: 85, top: 78, angle: 22 },
];

const PETAL_COLORS = ["#f9c9d6", "#f4b8c8", "#fbd6e0", "#f1afc0", "#f7c3d1"];
const PETAL_ANGLES = [0, 72, 144, 216, 288];

/** Một bông hoa: 5 cánh hồng xếp quanh ảnh tròn, có cuống xanh. */
function Flower({ photo, index }: { photo: StoryPhoto; index: number }) {
  const slot = SLOTS[index];
  const color = PETAL_COLORS[index % PETAL_COLORS.length];
  return (
    <div
      className="absolute w-[5.6rem] -translate-x-1/2"
      style={{ left: `${slot.left}%`, top: slot.top, zIndex: 5 - Math.abs(2 - index) }}
    >
      <div className="relative h-[5.6rem] w-[5.6rem]" style={{ transform: `rotate(${slot.angle}deg)` }}>
        {PETAL_ANGLES.map((deg) => (
          <span
            key={deg}
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 h-[3.4rem] w-[2.4rem] rounded-[50%_50%_50%_50%/60%_60%_40%_40%] shadow-[0_6px_14px_-6px_rgba(0,0,0,0.5)]"
            style={{ background: color, transform: `translate(-50%,-50%) rotate(${deg}deg) translateY(-1.9rem)` }}
          />
        ))}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset(photo.url)}
          alt={photo.caption}
          className="absolute inset-[0.55rem] h-[calc(100%-1.1rem)] w-[calc(100%-1.1rem)] rounded-full border-[3px] border-white object-cover shadow-[0_10px_20px_-8px_rgba(0,0,0,0.6)]"
        />
      </div>
      <div className="mx-auto -mt-2 h-[3.2rem] w-[0.45rem] rounded-full bg-gradient-to-b from-[#86a673] to-[#4f6b44]" />
    </div>
  );
}

/** Bó hoa bằng ảnh: 5 bông ảnh tròn có cánh, giấy gói hồng SVG, vòng chữ "I love you" xoay quanh. */
export function Bouquet({ photos }: BouquetProps) {
  const flowers = photos.slice(0, 5);
  const offset = Math.floor((5 - flowers.length) / 2);
  return (
    <div className="relative mx-auto h-[23rem] w-[min(20rem,calc(100vw-2.5rem))] sm:h-[25rem] sm:w-[22rem]">
      <svg
        viewBox="0 0 400 400"
        className="anim-spin-slow absolute left-1/2 top-[52%] h-[25rem] w-[25rem] -translate-x-1/2 -translate-y-1/2 opacity-45 sm:h-[29rem] sm:w-[29rem]"
      >
        <defs>
          <path id="ring" d="M200,200 m-186,0 a186,186 0 1,1 372,0 a186,186 0 1,1 -372,0" />
        </defs>
        <text className="font-display" fill="#efe3c8" fontSize="15" letterSpacing="2">
          <textPath href="#ring">{RING_TEXT}</textPath>
        </text>
      </svg>
      <div className="absolute inset-x-0 top-0 h-[60%]">
        {flowers.map((photo, i) => (
          <Flower key={photo.url} photo={photo} index={i + offset} />
        ))}
      </div>
      <svg
        viewBox="0 0 240 200"
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 h-[50%] w-[15rem] -translate-x-1/2 drop-shadow-[0_24px_30px_rgba(0,0,0,0.45)]"
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
  );
}
