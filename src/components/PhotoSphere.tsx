import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { spherePhotos } from "../data/sphere";
import PhotoLightbox from "./PhotoLightbox";
import type { PhotoItem } from "../types";

const SPHERE_RADIUS = 1.45;
const PHOTO_OFFSET = 0.02;
const AUTO_ROTATE_SPEED = 0.055;

type PhotoMarker = {
  position: [number, number, number];
  quaternion: [number, number, number, number];
  src: string;
  aspect: number;
};

function createCurvedPlane(width: number, height: number, radius: number, segments: number = 8) {
  const geometry = new THREE.PlaneGeometry(width, height, segments, segments);
  const position = geometry.attributes.position;

  for (let i = 0; i < position.count; i++) {
    const x = position.getX(i);
    const y = position.getY(i);
    const distSq = x * x + y * y;
    const z = -distSq / (2 * radius);
    position.setZ(i, z);
  }

  geometry.computeVertexNormals();
  return geometry;
}

function fibonacciSphere(count: number, radius: number) {
  const points: { position: [number, number, number]; quaternion: THREE.Quaternion }[] = [];
  const forward = new THREE.Vector3(0, 0, 1);

  for (let index = 0; index < count; index += 1) {
    const phi = Math.acos(-1 + (2 * (index + 0.5)) / count);
    const theta = Math.PI * (1 + Math.sqrt(5)) * index;
    const position = new THREE.Vector3(
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta)
    );
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      forward,
      position.clone().normalize()
    );
    points.push({
      position: [position.x, position.y, position.z],
      quaternion
    });
  }
  return points;
}

function PhotoPlane({
  position,
  quaternion,
  src,
  aspect,
  onClick
}: {
  position: [number, number, number];
  quaternion: [number, number, number, number];
  src: string;
  aspect: number;
  onClick: () => void;
}) {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const [hovered, setHovered] = useState(false);

  useMemo(() => {
    const loader = new THREE.TextureLoader();
    loader.load(src, (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      setTexture(tex);
    });
  }, [src]);

  const width = 0.52;
  const height = width / aspect;

  const curvedGeometry = useMemo(
    () => createCurvedPlane(width, height, SPHERE_RADIUS),
    [width, height]
  );

  if (!texture) return null;

  return (
    <mesh
      position={position}
      quaternion={quaternion}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
      scale={hovered ? 1.1 : 1}
      geometry={curvedGeometry}
    >
      <meshBasicMaterial
        map={texture}
        side={THREE.DoubleSide}
        transparent
        opacity={hovered ? 1 : 0.85}
        toneMapped={false}
      />
    </mesh>
  );
}

function MemorySphere({ onPhotoClick }: { onPhotoClick: (src: string) => void }) {
  const groupRef = useRef<THREE.Group>(null);

  const markers: PhotoMarker[] = useMemo(() => {
    const points = fibonacciSphere(spherePhotos.length, SPHERE_RADIUS + PHOTO_OFFSET);
    return spherePhotos.map((photo, index) => {
      const point = points[index];
      return {
        position: point.position,
        quaternion: point.quaternion.toArray() as [number, number, number, number],
        src: photo.src,
        aspect: 4 / 3
      };
    });
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.04;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[SPHERE_RADIUS - 0.03, 56, 40]} />
        <meshStandardMaterial color="#0a1e38" metalness={0.22} roughness={0.78} />
      </mesh>
      <mesh>
        <sphereGeometry args={[SPHERE_RADIUS, 34, 26]} />
        <meshBasicMaterial color="#57aaff" wireframe transparent opacity={0.14} />
      </mesh>
      {markers.map((marker) => (
        <PhotoPlane
          key={marker.src}
          position={marker.position}
          quaternion={marker.quaternion}
          src={marker.src}
          aspect={marker.aspect}
          onClick={() => onPhotoClick(marker.src)}
        />
      ))}
      <mesh rotation={[Math.PI / 2.4, 0.18, 0]}>
        <torusGeometry args={[SPHERE_RADIUS + 0.42, 0.006, 6, 160]} />
        <meshBasicMaterial color="#6db9ff" transparent opacity={0.55} />
      </mesh>
      <mesh rotation={[Math.PI / 1.75, 0.65, 0]}>
        <torusGeometry args={[SPHERE_RADIUS + 0.68, 0.004, 6, 160]} />
        <meshBasicMaterial color="#2f6fae" transparent opacity={0.38} />
      </mesh>
    </group>
  );
}

export default function PhotoSphere() {
  const reduced = usePrefersReducedMotion();
  const [selectedSrc, setSelectedSrc] = useState<string | null>(null);

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
        dpr={[1, reduced ? 1.2 : 1.7]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={1.5} />
        <pointLight position={[4, 4, 5]} intensity={26} color="#8ccdff" />
        <pointLight position={[-4, -2, -3]} intensity={14} color="#2a5cff" />
        <MemorySphere onPhotoClick={setSelectedSrc} />
        <OrbitControls
          makeDefault
          enablePan={false}
          enableDamping
          dampingFactor={0.06}
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
