"use client";

import { ContactShadows, Float, Sparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

interface EnvelopeProps {
  isOpen: boolean;
  sealTexture: THREE.Texture | null;
  onTap: () => void;
}

const CREAM = "#fbf3ee";
const CREAM_DEEP = "#f1e3dc";
const ROSE = "#e8708a";
const ROSE_DEEP = "#c94c6b";

function makeFlapGeometry(): THREE.ShapeGeometry {
  const shape = new THREE.Shape();
  shape.moveTo(-1.2, 0);
  shape.lineTo(1.2, 0);
  shape.lineTo(0, -0.98);
  shape.closePath();
  return new THREE.ShapeGeometry(shape);
}

function makeSeamGeometry(): THREE.ShapeGeometry {
  const shape = new THREE.Shape();
  shape.moveTo(-1.2, 0.8);
  shape.lineTo(0, -0.12);
  shape.lineTo(1.2, 0.8);
  shape.lineTo(1.2, -0.8);
  shape.lineTo(-1.2, -0.8);
  shape.closePath();
  return new THREE.ShapeGeometry(shape);
}

function makeHeartGeometry(): THREE.ExtrudeGeometry {
  const s = new THREE.Shape();
  s.moveTo(0, -0.42);
  s.bezierCurveTo(0, -0.42, -0.5, -0.1, -0.5, 0.12);
  s.bezierCurveTo(-0.5, 0.36, -0.28, 0.42, -0.2, 0.42);
  s.bezierCurveTo(-0.08, 0.42, 0, 0.3, 0, 0.26);
  s.bezierCurveTo(0, 0.3, 0.08, 0.42, 0.2, 0.42);
  s.bezierCurveTo(0.28, 0.42, 0.5, 0.36, 0.5, 0.12);
  s.bezierCurveTo(0.5, -0.1, 0, -0.42, 0, -0.42);
  const geometry = new THREE.ExtrudeGeometry(s, { depth: 0.22, bevelEnabled: true, bevelSize: 0.06, bevelThickness: 0.06, bevelSegments: 6, curveSegments: 24 });
  geometry.center();
  return geometry;
}

/** Vẽ chữ cái lên mặt sáp bằng canvas 2D, dùng font script của site nếu đã tải. */
function drawSealTexture(initial: string): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const grad = ctx.createRadialGradient(size * 0.35, size * 0.3, 10, size / 2, size / 2, size * 0.55);
    grad.addColorStop(0, "#f3b4c3");
    grad.addColorStop(0.55, "#d6617c");
    grad.addColorStop(1, "#9a3650");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
    ctx.strokeStyle = "rgba(255,255,255,0.35)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size * 0.36, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = "#fde7ee";
    ctx.font = `150px "Great Vibes", cursive`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowColor = "rgba(0,0,0,0.35)";
    ctx.shadowBlur = 6;
    ctx.fillText(initial, size / 2, size / 2 + 10);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/** Tạo texture sáp sau khi font script đã sẵn sàng, để chữ không bị fallback. */
function useSealTexture(initial: string): THREE.Texture | null {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  useEffect(() => {
    let cancelled = false;
    const build = () => {
      if (!cancelled) {
        setTexture(drawSealTexture(initial));
      }
    };
    if (document.fonts?.load) {
      document.fonts.load('150px "Great Vibes"').then(build, build);
    } else {
      build();
    }
    return () => {
      cancelled = true;
    };
  }, [initial]);
  return texture;
}

/** Phong bì: thân, nắp xoay quanh mép trên, sáp niêm ở đầu nắp, trái tim bay lên khi mở. */
function Envelope({ isOpen, sealTexture, onTap }: EnvelopeProps) {
  const group = useRef<THREE.Group>(null);
  const flap = useRef<THREE.Group>(null);
  const heart = useRef<THREE.Mesh>(null);
  const seal = useRef<THREE.Group>(null);
  const flapGeo = useMemo(() => makeFlapGeometry(), []);
  const seamGeo = useMemo(() => makeSeamGeometry(), []);
  const heartGeo = useMemo(() => makeHeartGeometry(), []);

  useFrame((state, delta) => {
    const target = isOpen ? -Math.PI * 0.92 : 0;
    if (flap.current) {
      flap.current.rotation.x = THREE.MathUtils.damp(flap.current.rotation.x, target, 4, delta);
    }
    if (heart.current) {
      const y = isOpen ? 1.15 : -0.1;
      const z = isOpen ? 0.55 : -0.2;
      const s = isOpen ? 1 : 0.001;
      heart.current.position.y = THREE.MathUtils.damp(heart.current.position.y, y, 3, delta);
      heart.current.position.z = THREE.MathUtils.damp(heart.current.position.z, z, 3, delta);
      const k = THREE.MathUtils.damp(heart.current.scale.x, s, 3, delta);
      heart.current.scale.setScalar(k);
      heart.current.rotation.y = isOpen ? Math.sin(state.clock.elapsedTime * 1.3) * 0.7 : 0;
    }
    if (seal.current) {
      seal.current.scale.setScalar(THREE.MathUtils.damp(seal.current.scale.x, isOpen ? 0.001 : 1, 5, delta));
    }
    if (group.current) {
      const { x, y } = state.pointer;
      group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, x * 0.35, 3, delta);
      group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -y * 0.2, 3, delta);
    }
  });

  return (
    <group ref={group} onClick={onTap} onPointerOver={() => (document.body.style.cursor = "pointer")} onPointerOut={() => (document.body.style.cursor = "")}>
      {/* trái tim nằm sau thân, bay lên khi mở */}
      <mesh ref={heart} geometry={heartGeo} position={[0, -0.1, -0.2]} scale={0.001}>
        <meshPhysicalMaterial color={ROSE} emissive={ROSE_DEEP} emissiveIntensity={0.35} clearcoat={1} clearcoatRoughness={0.15} roughness={0.3} />
      </mesh>
      {/* thân phong bì */}
      <mesh>
        <boxGeometry args={[2.4, 1.6, 0.12]} />
        <meshStandardMaterial color={CREAM} roughness={0.85} />
      </mesh>
      <mesh geometry={seamGeo} position={[0, 0, 0.0625]}>
        <meshStandardMaterial color={CREAM_DEEP} roughness={0.9} />
      </mesh>
      {/* nắp */}
      <group ref={flap} position={[0, 0.8, 0.066]}>
        <mesh geometry={flapGeo}>
          <meshStandardMaterial color={CREAM} roughness={0.85} />
        </mesh>
        {/* mặt trong nắp màu hồng phấn, lộ ra khi mở */}
        <mesh geometry={flapGeo} position={[0, 0, -0.004]} rotation={[0, Math.PI, 0]}>
          <meshStandardMaterial color="#f6c9d4" roughness={0.8} />
        </mesh>
        <group ref={seal} position={[0, -0.72, 0.035]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.25, 0.27, 0.07, 28]} />
            <meshStandardMaterial color="#d6617c" roughness={0.35} metalness={0.05} />
          </mesh>
          {/* mặt sáp có chữ cái */}
          <mesh position={[0, 0, 0.037]}>
            <circleGeometry args={[0.245, 40]} />
            {sealTexture ? (
              <meshStandardMaterial map={sealTexture} roughness={0.35} />
            ) : (
              <meshStandardMaterial color="#d6617c" roughness={0.35} />
            )}
          </mesh>
        </group>
      </group>
      {isOpen ? <Sparkles count={50} scale={[3.2, 2.6, 1.2]} size={4} speed={0.5} color="#ffd3dd" position={[0, 0.9, 0.4]} /> : null}
    </group>
  );
}

interface EnvelopeCanvasProps {
  initial: string;
  isOpen: boolean;
  onTap: () => void;
  /** Màu bóng đổ dưới phong bì, chọn theo nền sáng hay tối. */
  shadowColor?: string;
}

/** Cảnh 3D phong bì, điều khiển từ ngoài bằng isOpen. Dùng chung cho landing và trang Mãi Yêu. */
export function EnvelopeCanvas({ initial, isOpen, onTap, shadowColor = "#5b2440" }: EnvelopeCanvasProps) {
  const sealTexture = useSealTexture(initial);
  return (
    <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0.55, 5.2], fov: 36 }} gl={{ alpha: true, antialias: true }} style={{ touchAction: "pan-y" }}>
      <ambientLight intensity={0.9} />
      <directionalLight position={[3, 4, 5]} intensity={1.8} color="#fff4f6" />
      <pointLight position={[-3, 2, 3]} intensity={1.4} color="#ffb6c6" />
      <pointLight position={[2, -2, 2]} intensity={0.6} color="#ffd9c9" />
      <Float speed={1.6} rotationIntensity={0.15} floatIntensity={0.7}>
        <Envelope isOpen={isOpen} sealTexture={sealTexture} onTap={onTap} />
      </Float>
      <ContactShadows position={[0, -1.3, 0]} opacity={0.4} scale={7} blur={2.6} far={2.5} color={shadowColor} />
    </Canvas>
  );
}

interface Envelope3DProps {
  initial?: string;
  className?: string;
}

/** Khối 3D phong bì cho landing: tự quản lý mở/đóng, có nút gợi ý. */
export function Envelope3D({ initial = "♥", className = "" }: Envelope3DProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((v) => !v);
  return (
    <div className={`relative ${className}`}>
      <EnvelopeCanvas initial={initial} isOpen={isOpen} onTap={toggle} />
      <button
        type="button"
        onClick={toggle}
        className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-white/80 px-5 py-2.5 font-display text-base italic text-plum shadow-[0_12px_30px_-16px_rgba(91,36,64,0.6)] backdrop-blur"
      >
        {isOpen ? "Chạm để đóng lại" : "Chạm vào phong bì để mở"}
      </button>
    </div>
  );
}
