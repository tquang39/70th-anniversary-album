import { useMemo, useRef, useState, useEffect, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { spherePhotos } from "../data/sphere";
import PhotoLightbox from "./PhotoLightbox";
import type { PhotoItem } from "../types";

const SPHERE_RADIUS = 1.45;
const AUTO_ROTATE_SPEED = 0.055;
const ATLAS_COLS = 8;
const ATLAS_ROWS = 8;
const CELL = 512;
const AW = ATLAS_COLS * CELL;
const AH = ATLAS_ROWS * CELL;

function buildAtlas(images: HTMLImageElement[]): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = AW; c.height = AH;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#0a1e38";
  ctx.fillRect(0, 0, AW, AH);
  let idx = 0;
  for (const img of images) {
    if (!img || !img.naturalWidth) continue;
    const col = idx % ATLAS_COLS;
    const row = Math.floor(idx / ATLAS_COLS);
    const x = col * CELL; const y = row * CELL;
    const aspect = img.naturalWidth / img.naturalHeight;
    let dw: number, dh: number;
    if (aspect > 1) { dh = CELL; dw = CELL * aspect; } else { dw = CELL; dh = CELL / aspect; }
    ctx.drawImage(img, x + (CELL - dw) / 2, y + (CELL - dh) / 2, dw, dh);
    ctx.strokeStyle = "rgba(212,175,55,.12)";
    ctx.lineWidth = 1;
    ctx.strokeRect(x + .5, y + .5, CELL - 1, CELL - 1);
    idx++;
  }
  return c;
}

function MemorySphere({ texture, onPhotoClick }: { texture: THREE.Texture | null; onPhotoClick: (src: string) => void }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.04;
  });

  const handleClick = useCallback((e: any) => {
    if (!texture || !e.uv) return;
    const col = Math.floor(e.uv.x * ATLAS_COLS);
    const row = Math.floor((1 - e.uv.y) * ATLAS_ROWS);
    const idx = row * ATLAS_COLS + col;
    const photo = spherePhotos[idx];
    if (photo) onPhotoClick(photo.src);
  }, [texture, onPhotoClick]);

  return (
    <group ref={groupRef}>
      <mesh
        onClick={handleClick}
        onPointerOver={() => { document.body.style.cursor = "pointer"; }}
        onPointerOut={() => { document.body.style.cursor = "auto"; }}
      >
        <sphereGeometry args={[SPHERE_RADIUS, 48, 36]} />
        {texture ? (
          <meshBasicMaterial map={texture} toneMapped={false} />
        ) : (
          <meshStandardMaterial color="#0a1e38" metalness={0.22} roughness={0.78} />
        )}
      </mesh>
      <mesh>
        <sphereGeometry args={[SPHERE_RADIUS + 0.005, 24, 18]} />
        <meshBasicMaterial color="#D4AF37" wireframe transparent opacity={0.06} />
      </mesh>
      <mesh rotation={[Math.PI / 2.4, 0.18, 0]}>
        <torusGeometry args={[SPHERE_RADIUS + 0.42, 0.004, 6, 100]} />
        <meshBasicMaterial color="#D4AF37" transparent opacity={0.35} />
      </mesh>
      <mesh rotation={[Math.PI / 1.75, 0.65, 0]}>
        <torusGeometry args={[SPHERE_RADIUS + 0.68, 0.003, 6, 100]} />
        <meshBasicMaterial color="#D4AF37" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

export default function PhotoSphere() {
  const reduced = usePrefersReducedMotion();
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);
  const [selectedSrc, setSelectedSrc] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const images = spherePhotos.map((p) => {
      const img = new Image();
      img.src = p.src;
      return img;
    });
    Promise.all(
      images.map(
        (img) =>
          new Promise<void>((res) => {
            img.onload = () => res();
            img.onerror = () => res();
          })
      )
    ).then(() => {
      if (cancelled) return;
      const canvas = buildAtlas(images);
      const tex = new THREE.CanvasTexture(canvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = 4;
      setTexture(tex);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const selectedPhoto: PhotoItem | null = useMemo(() => {
    if (!selectedSrc) return null;
    const found = spherePhotos.find((p) => p.src === selectedSrc);
    if (!found) return null;
    return {
      id: found.id,
      title: found.title,
      year: "",
      period: "",
      description: "",
      image: found.src,
      thumbnail: found.src,
      source: "",
      tone: "blue" as const
    };
  }, [selectedSrc]);

  return (
    <>
      <Canvas
        camera={{ position: [0, 0.35, 4.6], fov: 42 }}
        dpr={[1, 1.2]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={1.5} />
        <pointLight position={[4, 4, 5]} intensity={26} color="#8ccdff" />
        <pointLight position={[-4, -2, -3]} intensity={14} color="#2a5cff" />
        <MemorySphere texture={texture} onPhotoClick={setSelectedSrc} />
        <OrbitControls
          makeDefault
          enablePan={false}
          enableDamping
          dampingFactor={0.08}
          rotateSpeed={0.5}
          zoomSpeed={0.6}
          minDistance={2.2}
          maxDistance={7.5}
          autoRotate={!reduced}
          autoRotateSpeed={AUTO_ROTATE_SPEED * 12}
        />
      </Canvas>
      {selectedPhoto && (
        <PhotoLightbox photo={selectedPhoto} onClose={() => setSelectedSrc(null)} />
      )}
    </>
  );
}
