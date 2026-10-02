"use client";

import dynamic from "next/dynamic";

import { Petals } from "@/components/motion/Petals";
import { useCanRender3D, useInView } from "@/components/three/useInView";

const PetalField = dynamic(() => import("@/components/three/PetalField").then((m) => m.PetalField), { ssr: false });
const Envelope3D = dynamic(() => import("@/components/three/Envelope3D").then((m) => m.Envelope3D), { ssr: false });

interface PetalsProps {
  tone?: "light" | "dark";
  count?: number;
}

/** Cánh hoa 3D khi máy hỗ trợ WebGL và đang trong tầm nhìn, ngược lại dùng cánh hoa 2D. */
export function Petals3D({ tone = "light", count }: PetalsProps) {
  const { ref, isInView } = useInView<HTMLDivElement>();
  const can3D = useCanRender3D();
  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {can3D ? (isInView ? <PetalField tone={tone} count={count} /> : null) : <Petals tone={tone} count={12} />}
    </div>
  );
}

interface EnvelopeProps {
  initial?: string;
  className?: string;
}

export function EnvelopeScene({ initial, className = "" }: EnvelopeProps) {
  const { ref, isInView } = useInView<HTMLDivElement>("100px");
  const can3D = useCanRender3D();
  return (
    <div ref={ref} className={className}>
      {can3D && isInView ? <Envelope3D initial={initial} className="h-full w-full" /> : <EnvelopeFallback />}
    </div>
  );
}

function EnvelopeFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <span className="wax-seal">♥</span>
    </div>
  );
}
