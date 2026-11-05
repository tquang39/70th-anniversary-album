import { useMemo, useRef, useState, useEffect, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Sparkles, Maximize2, Globe, Dna, Orbit } from "lucide-react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { spherePhotos, type SpherePhoto } from "../data/sphere";
import PhotoLightbox from "./PhotoLightbox";
import type { PhotoItem } from "../types";

export type SphereMode = "sphere" | "helix" | "ring";

const SPHERE_RADIUS = 1.88;
const HOVER_RADIUS_OFFSET = 0.4;
const NEIGHBOR_RADIUS_OFFSET = 0.12;
const TILE_W = 0.64;
const TILE_H = 0.48;
const FRAME_W = 0.685;
const FRAME_H = 0.525;

const ATLAS_COLS = 8;
const ATLAS_ROWS = 8;
const CELL_W = 640;
const CELL_H = 480;
const AW = ATLAS_COLS * CELL_W;
const AH = ATLAS_ROWS * CELL_H;

function buildAtlas(images: HTMLImageElement[]): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = AW;
  c.height = AH;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#EAE3D2";
  ctx.fillRect(0, 0, AW, AH);

  for (let idx = 0; idx < spherePhotos.length; idx++) {
    const img = images[idx];
    if (!img || !img.naturalWidth) continue;
    const col = idx % ATLAS_COLS;
    const row = Math.floor(idx / ATLAS_COLS);
    const x = col * CELL_W;
    const y = row * CELL_H;

    ctx.save();
    ctx.beginPath();
    ctx.rect(x, y, CELL_W, CELL_H);
    ctx.clip();

    const targetAspect = CELL_W / CELL_H;
    const imgAspect = img.naturalWidth / img.naturalHeight;
    let dw: number, dh: number;
    if (imgAspect > targetAspect) {
      dh = CELL_H;
      dw = CELL_H * imgAspect;
    } else {
      dw = CELL_W;
      dh = CELL_W / imgAspect;
    }
    ctx.drawImage(img, x + (CELL_W - dw) / 2, y + (CELL_H - dh) / 2, dw, dh);
    ctx.restore();
  }
  return c;
}

type Pose = {
  position: THREE.Vector3;
  normal: THREE.Vector3;
  quaternion: THREE.Quaternion;
};

type TileNode = {
  index: number;
  photo: SpherePhoto;
  poses: Record<SphereMode, Pose>;
  geometry: THREE.PlaneGeometry;
};

const COLOR_FRAME_IDLE = new THREE.Color("#FBF8F2");
const COLOR_FRAME_HOVER = new THREE.Color("#7C2D2D");
const COLOR_FRAME_NEIGHBOR = new THREE.Color("#C59B43");

function makeOutwardQuaternion(normal: THREE.Vector3, worldUp: THREE.Vector3): THREE.Quaternion {
  const n = normal.clone().normalize();
  let right = new THREE.Vector3().crossVectors(worldUp, n);
  if (right.lengthSq() < 1e-5) {
    right = new THREE.Vector3(1, 0, 0);
  } else {
    right.normalize();
  }
  const up = new THREE.Vector3().crossVectors(n, right).normalize();
  const basis = new THREE.Matrix4().makeBasis(right, up, n);
  return new THREE.Quaternion().setFromRotationMatrix(basis);
}

function FibonacciPhotoSphere({
  texture,
  mode,
  hoveredIndex,
  onHoverChange,
  onPhotoSelect,
  reducedMotion,
}: {
  texture: THREE.Texture | null;
  mode: SphereMode;
  hoveredIndex: number | null;
  onHoverChange: (index: number | null) => void;
  onPhotoSelect: (photo: SpherePhoto) => void;
  reducedMotion: boolean;
}) {
  const rootGroupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Group>(null);
  const tileGroupRefs = useRef<(THREE.Group | null)[]>([]);
  const frameMatRefs = useRef<(THREE.MeshBasicMaterial | null)[]>([]);

  const frameGeometry = useMemo(() => new THREE.PlaneGeometry(FRAME_W, FRAME_H), []);

  const tiles = useMemo<TileNode[]>(() => {
    const count = spherePhotos.length;
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    const worldUp = new THREE.Vector3(0, 1, 0);

    return spherePhotos.map((photo, i) => {
      // 1. Hình thái Khối cầu (Fibonacci Sphere)
      const sy = 1 - ((i + 0.5) / count) * 2;
      const radiusAtY = Math.sqrt(Math.max(0, 1 - sy * sy));
      const stheta = goldenAngle * i;
      const sx = Math.cos(stheta) * radiusAtY;
      const sz = Math.sin(stheta) * radiusAtY;
      const sphereNormal = new THREE.Vector3(sx, sy, sz).normalize();
      const spherePos = sphereNormal.clone().multiplyScalar(SPHERE_RADIUS);
      const sphereQuat = makeOutwardQuaternion(sphereNormal, worldUp);

      // 2. Hình thái Xoắn ốc Thời gian (Double/Cylindrical Helix)
      const t = i / Math.max(1, count - 1);
      const hTheta = i * 0.56;
      const hRadius = 1.92;
      const hy = (0.5 - t) * 3.15;
      const hx = Math.cos(hTheta) * hRadius;
      const hz = Math.sin(hTheta) * hRadius;
      const helixNormal = new THREE.Vector3(Math.cos(hTheta), sy * 0.12, Math.sin(hTheta)).normalize();
      const helixPos = new THREE.Vector3(hx, hy, hz);
      const helixQuat = makeOutwardQuaternion(helixNormal, worldUp);

      // 3. Hình thái Vành đai Quỹ đạo (3-Band Orbital Ring)
      const band = i % 3;
      const bandIndex = Math.floor(i / 3);
      const bandCount = Math.ceil((count - band) / 3);
      const rAngle = (bandIndex / bandCount) * Math.PI * 2 + band * 0.35;
      const rRadius = band === 1 ? 2.18 : band === 0 ? 1.72 : 2.52;
      const ry =
        band === 1
          ? Math.sin(rAngle * 2) * 0.14
          : band === 0
          ? 0.56 + Math.cos(rAngle) * 0.18
          : -0.56 - Math.sin(rAngle) * 0.18;
      const rx = Math.cos(rAngle) * rRadius;
      const rz = Math.sin(rAngle) * rRadius;
      const ringNormal = new THREE.Vector3(
        Math.cos(rAngle),
        band === 0 ? 0.22 : band === 2 ? -0.22 : 0,
        Math.sin(rAngle)
      ).normalize();
      const ringPos = new THREE.Vector3(rx, ry, rz);
      const ringQuat = makeOutwardQuaternion(ringNormal, worldUp);

      // Geometry riêng cho từng thẻ với UV khớp ô trong Atlas
      const geom = new THREE.PlaneGeometry(TILE_W, TILE_H);
      const col = i % ATLAS_COLS;
      const row = Math.floor(i / ATLAS_COLS);
      const padX = 0.0015;
      const padY = 0.0015;
      const u0 = col / ATLAS_COLS + padX;
      const u1 = (col + 1) / ATLAS_COLS - padX;
      const v1 = 1 - row / ATLAS_ROWS - padY;
      const v0 = 1 - (row + 1) / ATLAS_ROWS + padY;

      const uv = geom.attributes.uv as THREE.BufferAttribute;
      uv.setXY(0, u0, v1);
      uv.setXY(1, u1, v1);
      uv.setXY(2, u0, v0);
      uv.setXY(3, u1, v0);
      uv.needsUpdate = true;

      return {
        index: i,
        photo,
        poses: {
          sphere: { position: spherePos, normal: sphereNormal, quaternion: sphereQuat },
          helix: { position: helixPos, normal: helixNormal, quaternion: helixQuat },
          ring: { position: ringPos, normal: ringNormal, quaternion: ringQuat },
        },
        geometry: geom,
      };
    });
  }, []);

  useEffect(() => {
    return () => {
      frameGeometry.dispose();
      tiles.forEach((t) => t.geometry.dispose());
    };
  }, [frameGeometry, tiles]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);

    if (rootGroupRef.current && !reducedMotion && hoveredIndex === null) {
      rootGroupRef.current.rotation.y += dt * 0.11;
    }

    if (coreRef.current && !reducedMotion) {
      coreRef.current.rotation.y -= dt * 0.18;
      coreRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.35) * 0.15;
    }

    const hoveredPose = hoveredIndex !== null ? tiles[hoveredIndex]?.poses[mode] : null;
    const lerpSpeed = 1 - Math.exp(-8.5 * dt);

    for (let i = 0; i < tiles.length; i++) {
      const grp = tileGroupRefs.current[i];
      const frameMat = frameMatRefs.current[i];
      if (!grp) continue;

      const tile = tiles[i];
      const pose = tile.poses[mode];
      const isHovered = hoveredIndex === i;
      let isNeighbor = false;

      if (!isHovered && hoveredPose) {
        const distSq = pose.position.distanceToSquared(hoveredPose.position);
        if (distSq < 0.95) isNeighbor = true;
      }

      const pushOffset = isHovered
        ? HOVER_RADIUS_OFFSET
        : isNeighbor
        ? NEIGHBOR_RADIUS_OFFSET
        : 0;
      const targetScale = isHovered ? 1.32 : isNeighbor ? 1.07 : 1.0;

      const targetX = pose.position.x + pose.normal.x * pushOffset;
      const targetY = pose.position.y + pose.normal.y * pushOffset;
      const targetZ = pose.position.z + pose.normal.z * pushOffset;

      grp.position.x = THREE.MathUtils.lerp(grp.position.x, targetX, lerpSpeed);
      grp.position.y = THREE.MathUtils.lerp(grp.position.y, targetY, lerpSpeed);
      grp.position.z = THREE.MathUtils.lerp(grp.position.z, targetZ, lerpSpeed);

      grp.quaternion.slerp(pose.quaternion, lerpSpeed);

      const nextScale = THREE.MathUtils.lerp(grp.scale.x, targetScale, lerpSpeed);
      grp.scale.setScalar(nextScale);

      if (frameMat) {
        const targetColor = isHovered
          ? COLOR_FRAME_HOVER
          : isNeighbor
          ? COLOR_FRAME_NEIGHBOR
          : COLOR_FRAME_IDLE;
        frameMat.color.lerp(targetColor, lerpSpeed);
      }
    }
  });

  return (
    <group ref={rootGroupRef}>
      {/* Lõi đa diện Toán học (Icosahedron & Octahedron) bên trong tâm quả cầu */}
      <group ref={coreRef}>
        <mesh>
          <icosahedronGeometry args={[1.22, 1]} />
          <meshBasicMaterial color="#9C7830" wireframe transparent opacity={0.18} />
        </mesh>
        <mesh>
          <octahedronGeometry args={[0.78, 0]} />
          <meshBasicMaterial color="#7C2D2D" wireframe transparent opacity={0.16} />
        </mesh>
      </group>

      {/* Hệ vòng quỹ đạo thiên cầu (Armillary Rings) */}
      <mesh rotation={[Math.PI / 2.3, 0.22, 0]}>
        <torusGeometry args={[SPHERE_RADIUS + 0.42, 0.0045, 8, 120]} />
        <meshBasicMaterial color="#9C7830" transparent opacity={0.42} />
      </mesh>
      <mesh rotation={[Math.PI / 1.7, -0.55, 0.2]}>
        <torusGeometry args={[SPHERE_RADIUS + 0.62, 0.0035, 8, 120]} />
        <meshBasicMaterial color="#7C2D2D" transparent opacity={0.22} />
      </mesh>

      {/* 59 Thẻ ảnh 3D có khả năng biến hình (Morphing) */}
      {tiles.map((tile, i) => (
        <group
          key={tile.photo.id}
          ref={(el) => {
            tileGroupRefs.current[i] = el;
          }}
          position={[
            tile.poses.sphere.position.x,
            tile.poses.sphere.position.y,
            tile.poses.sphere.position.z,
          ]}
          quaternion={tile.poses.sphere.quaternion}
        >
          {/* Khung viền kỷ yếu phía sau thẻ ảnh */}
          <mesh geometry={frameGeometry} position={[0, 0, -0.004]}>
            <meshBasicMaterial
              ref={(el) => {
                frameMatRefs.current[i] = el;
              }}
              color="#FBF8F2"
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Bề mặt ảnh tư liệu */}
          <mesh
            geometry={tile.geometry}
            onPointerOver={(e) => {
              e.stopPropagation();
              document.body.style.cursor = "pointer";
              onHoverChange(i);
            }}
            onPointerOut={(e) => {
              e.stopPropagation();
              document.body.style.cursor = "auto";
              onHoverChange(null);
            }}
            onClick={(e) => {
              e.stopPropagation();
              onPhotoSelect(tile.photo);
            }}
          >
            {texture ? (
              <meshBasicMaterial map={texture} toneMapped={false} side={THREE.DoubleSide} />
            ) : (
              <meshStandardMaterial
                color="#DFD5C0"
                metalness={0.05}
                roughness={0.85}
                side={THREE.DoubleSide}
              />
            )}
          </mesh>
        </group>
      ))}
    </group>
  );
}

export default function PhotoSphere() {
  const reduced = usePrefersReducedMotion();
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);
  const [mode, setMode] = useState<SphereMode>("sphere");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedPhotoItem, setSelectedPhotoItem] = useState<SpherePhoto | null>(null);

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
      tex.anisotropy = 8;
      setTexture(tex);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleRandomMemory = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * spherePhotos.length);
    setHoveredIndex(randomIndex);
    setSelectedPhotoItem(spherePhotos[randomIndex]);
  }, []);

  const hoveredPhoto = hoveredIndex !== null ? spherePhotos[hoveredIndex] : null;

  const lightboxPhoto: PhotoItem | null = useMemo(() => {
    if (!selectedPhotoItem) return null;
    return {
      id: selectedPhotoItem.id,
      title: selectedPhotoItem.title,
      year: "",
      period: "",
      description: "",
      image: selectedPhotoItem.src,
      thumbnail: selectedPhotoItem.src,
      source: "",
      tone: "blue" as const,
    };
  }, [selectedPhotoItem]);

  return (
    <div className="sphere-experience">
      <div className="sphere-canvas-holder">
        <Canvas
          camera={{ position: [0, 0.04, 4.48], fov: 42 }}
          dpr={[1, 1.75]}
          gl={{ antialias: true, powerPreference: "high-performance" }}
          onPointerMissed={() => setHoveredIndex(null)}
        >
          <ambientLight intensity={1.6} />
          <pointLight position={[4, 4, 5]} intensity={24} color="#FFF2DD" />
          <pointLight position={[-4, -2, -3]} intensity={14} color="#E8C896" />
          <FibonacciPhotoSphere
            texture={texture}
            mode={mode}
            hoveredIndex={hoveredIndex}
            onHoverChange={setHoveredIndex}
            onPhotoSelect={setSelectedPhotoItem}
            reducedMotion={reduced}
          />
          <OrbitControls
            makeDefault
            enablePan={false}
            enableDamping
            dampingFactor={0.07}
            rotateSpeed={0.55}
            zoomSpeed={0.65}
            minDistance={3.1}
            maxDistance={7.2}
            autoRotate={false}
          />
        </Canvas>

        {/* Thẻ HUD nổi hiển thị tên bức ảnh ngay khi rê chuột lên thẻ 3D */}
        <div
          className={`sphere-hud ${hoveredPhoto ? "is-visible" : ""}`}
          aria-live="polite"
        >
          {hoveredPhoto ? (
            <button
              type="button"
              className="sphere-hud-card"
              onClick={() => setSelectedPhotoItem(hoveredPhoto)}
            >
              <span className="sphere-hud-badge">
                Tư liệu #{String((hoveredIndex ?? 0) + 1).padStart(2, "0")}/
                {spherePhotos.length}
              </span>
              <span className="sphere-hud-title">{hoveredPhoto.title}</span>
              <span className="sphere-hud-action">
                <Maximize2 size={13} aria-hidden="true" />
                <span>Mở ảnh</span>
              </span>
            </button>
          ) : (
            <div className="sphere-hud-idle">
              <span>Rê chuột lên thẻ ảnh 3D để xem chú thích · Kéo để xoay</span>
            </div>
          )}
        </div>
      </div>

      <div className="sphere-toolbar" role="toolbar" aria-label="Điều khiển hình thái 3D">
        <div className="sphere-mode-group" role="group" aria-label="Chọn hình thái không gian 3D">
          <button
            type="button"
            className={`sphere-mode-btn ${mode === "sphere" ? "is-active" : ""}`}
            onClick={() => setMode("sphere")}
            aria-pressed={mode === "sphere"}
          >
            <Globe size={14} aria-hidden="true" />
            <span>Khối cầu</span>
          </button>
          <button
            type="button"
            className={`sphere-mode-btn ${mode === "helix" ? "is-active" : ""}`}
            onClick={() => setMode("helix")}
            aria-pressed={mode === "helix"}
          >
            <Dna size={14} aria-hidden="true" />
            <span>Xoắn ốc</span>
          </button>
          <button
            type="button"
            className={`sphere-mode-btn ${mode === "ring" ? "is-active" : ""}`}
            onClick={() => setMode("ring")}
            aria-pressed={mode === "ring"}
          >
            <Orbit size={14} aria-hidden="true" />
            <span>Vành đai</span>
          </button>
        </div>

        <button
          type="button"
          className="sphere-random-btn"
          onClick={handleRandomMemory}
        >
          <Sparkles size={14} aria-hidden="true" />
          <span>Ký ức ngẫu nhiên</span>
        </button>
      </div>

      {lightboxPhoto && (
        <PhotoLightbox
          photo={lightboxPhoto}
          onClose={() => setSelectedPhotoItem(null)}
        />
      )}
    </div>
  );
}
