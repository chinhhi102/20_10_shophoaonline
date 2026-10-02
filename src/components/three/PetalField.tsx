"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

interface PetalFieldProps {
  tone?: "light" | "dark";
  count?: number;
}

interface PetalParams {
  x: number;
  y: number;
  z: number;
  speed: number;
  swayAmp: number;
  swayFreq: number;
  phase: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  scale: number;
}

const BOUND_X = 7;
const BOUND_Y = 5;
const LIGHT_COLORS = ["#ffc9d6", "#ffb3c6", "#ffe0e8", "#f7a8bd", "#ffd6de"];
const DARK_COLORS = ["#e9a3b5", "#d98aa0", "#f4c9d3", "#c86d87", "#f0b4c4"];

/** Hình cánh hoa: hai đường bezier, sau đó uốn cong nhẹ theo trục x cho có khối. */
function makePetalGeometry(): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  shape.moveTo(0, -0.5);
  shape.bezierCurveTo(0.38, -0.32, 0.42, 0.28, 0, 0.5);
  shape.bezierCurveTo(-0.42, 0.28, -0.38, -0.32, 0, -0.5);
  const geometry = new THREE.ShapeGeometry(shape, 10);
  const pos = geometry.attributes.position;
  for (let i = 0; i < pos.count; i += 1) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    pos.setZ(i, x * x * 0.7 + Math.abs(y) * 0.12);
  }
  geometry.computeVertexNormals();
  return geometry;
}

function randomPetal(startAnywhere: boolean): PetalParams {
  return {
    x: THREE.MathUtils.randFloatSpread(BOUND_X * 2),
    y: startAnywhere ? THREE.MathUtils.randFloatSpread(BOUND_Y * 2) : BOUND_Y + Math.random() * 2,
    z: THREE.MathUtils.randFloat(-6, 0.3),
    speed: THREE.MathUtils.randFloat(0.25, 0.7),
    swayAmp: THREE.MathUtils.randFloat(0.3, 1.1),
    swayFreq: THREE.MathUtils.randFloat(0.3, 0.8),
    phase: Math.random() * Math.PI * 2,
    rotX: THREE.MathUtils.randFloat(-1, 1),
    rotY: THREE.MathUtils.randFloat(-1.2, 1.2),
    rotZ: THREE.MathUtils.randFloat(-0.8, 0.8),
    scale: THREE.MathUtils.randFloat(0.16, 0.38),
  };
}

function Petals({ count, tone }: Required<PetalFieldProps>) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => makePetalGeometry(), []);
  const params = useMemo(() => Array.from({ length: count }, () => randomPetal(true)), [count]);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const pointer = useRef({ x: 0, y: 0 });
  const colors = tone === "light" ? LIGHT_COLORS : DARK_COLORS;

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useEffect(() => {
    const inst = mesh.current;
    if (!inst) {
      return;
    }
    const color = new THREE.Color();
    params.forEach((_, i) => inst.setColorAt(i, color.set(colors[i % colors.length])));
    if (inst.instanceColor) {
      inst.instanceColor.needsUpdate = true;
    }
  }, [params, colors]);

  useFrame((state, delta) => {
    const inst = mesh.current;
    if (!inst) {
      return;
    }
    const t = state.clock.elapsedTime;
    const dt = Math.min(delta, 0.05);
    params.forEach((p, i) => {
      p.y -= p.speed * dt;
      if (p.y < -BOUND_Y - 1) {
        Object.assign(p, randomPetal(false));
      }
      dummy.position.set(p.x + Math.sin(t * p.swayFreq + p.phase) * p.swayAmp, p.y, p.z);
      dummy.rotation.set(t * p.rotX + p.phase, t * p.rotY, t * p.rotZ);
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      inst.setMatrixAt(i, dummy.matrix);
    });
    inst.instanceMatrix.needsUpdate = true;
    // Cả cụm nghiêng nhẹ theo ngón tay / chuột
    inst.rotation.y = THREE.MathUtils.damp(inst.rotation.y, pointer.current.x * 0.25, 2, delta);
    inst.rotation.x = THREE.MathUtils.damp(inst.rotation.x, -pointer.current.y * 0.15, 2, delta);
  });

  return (
    <instancedMesh ref={mesh} args={[geometry, undefined, count]} frustumCulled={false}>
      <meshStandardMaterial side={THREE.DoubleSide} roughness={0.7} metalness={0} transparent opacity={0.92} emissive="#ff9fb8" emissiveIntensity={0.15} />
    </instancedMesh>
  );
}

/** Cánh hoa rơi trong không gian 3D, nghiêng theo chạm hoặc chuột. Nền trong suốt, đặt đè lên section. */
export function PetalField({ tone = "light", count }: PetalFieldProps) {
  const fog = tone === "light" ? "#fff3ee" : "#3f0f1d";
  const n = count ?? (typeof window !== "undefined" && window.innerWidth < 640 ? 70 : 130);
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 8], fov: 50 }}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      <fog attach="fog" args={[fog, 7, 15]} />
      <ambientLight intensity={2.2} />
      <directionalLight position={[3, 5, 4]} intensity={1.4} color="#fff0f3" />
      <pointLight position={[-4, -2, 3]} intensity={0.8} color="#ff9fb8" />
      <Petals count={n} tone={tone} />
    </Canvas>
  );
}
