import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const SPHERE_RADIUS = 1.45;
const AUTO_ROTATE_SPEED = 0.055;
const MARKER_COUNT = 14;

type Marker = {
  position: [number, number, number];
  quaternion: [number, number, number, number];
  accent: string;
};

const MARKER_ACCENTS = ["#cfe6ff", "#e3cfa4", "#8fbdec"];

function createMarkers(count: number): Marker[] {
  const markers: Marker[] = [];
  const forward = new THREE.Vector3(0, 0, 1);

  for (let index = 0; index < count; index += 1) {
    const phi = Math.acos(-1 + (2 * (index + 0.5)) / count);
    const theta = Math.PI * (1 + Math.sqrt(5)) * index;
    const position = new THREE.Vector3(
      SPHERE_RADIUS * Math.sin(phi) * Math.cos(theta),
      SPHERE_RADIUS * Math.cos(phi),
      SPHERE_RADIUS * Math.sin(phi) * Math.sin(theta)
    );
    const quaternion = new THREE.Quaternion().setFromUnitVectors(forward, position.clone().normalize());

    markers.push({
      position: [position.x, position.y, position.z],
      quaternion: quaternion.toArray() as [number, number, number, number],
      accent: MARKER_ACCENTS[index % MARKER_ACCENTS.length]
    });
  }

  return markers;
}

const MARKERS = createMarkers(MARKER_COUNT);

function MemorySphere() {
  const group = useRef<THREE.Group>(null);

  return (
    <group ref={group}>
      <mesh>
        <sphereGeometry args={[SPHERE_RADIUS - 0.03, 56, 40]} />
        <meshStandardMaterial color="#0a1e38" metalness={0.22} roughness={0.78} />
      </mesh>
      <mesh>
        <sphereGeometry args={[SPHERE_RADIUS, 34, 26]} />
        <meshBasicMaterial color="#57aaff" wireframe transparent opacity={0.14} />
      </mesh>
      {MARKERS.map((marker, index) => (
        <mesh key={index} position={marker.position} quaternion={marker.quaternion}>
          <planeGeometry args={[0.38, 0.27]} />
          <meshBasicMaterial color={marker.accent} transparent opacity={0.92} side={THREE.DoubleSide} />
        </mesh>
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

  return (
    <Canvas
      camera={{ position: [0, 0.35, 4.6], fov: 42 }}
      dpr={[1, reduced ? 1.2 : 1.7]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={1.5} />
      <pointLight position={[4, 4, 5]} intensity={26} color="#8ccdff" />
      <pointLight position={[-4, -2, -3]} intensity={14} color="#2a5cff" />
      <MemorySphere />
      <OrbitControls
        makeDefault
        enablePan={false}
        enableDamping
        dampingFactor={0.06}
        rotateSpeed={0.5}
        zoomSpeed={0.6}
        minDistance={2.9}
        maxDistance={7.5}
        autoRotate={!reduced}
        autoRotateSpeed={AUTO_ROTATE_SPEED * 12}
      />
    </Canvas>
  );
}
