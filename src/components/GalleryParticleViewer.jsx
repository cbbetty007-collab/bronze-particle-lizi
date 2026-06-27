import React, { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Preload } from '@react-three/drei';
import * as THREE from 'three';
import { createInitialPoints, createShapePoints, randomUnit } from '../lib/particleShapes.js';

const PALETTES = {
  patina: {
    name: '铜绿青金',
    colors: [
      [0.16, 0.62, 0.55],
      [0.62, 0.48, 0.25],
      [0.95, 0.76, 0.34],
    ],
  },
  fire: {
    name: '熔铸暖金',
    colors: [
      [0.95, 0.42, 0.18],
      [0.92, 0.72, 0.28],
      [0.36, 0.82, 0.76],
    ],
  },
  night: {
    name: '幽蓝星尘',
    colors: [
      [0.22, 0.42, 0.92],
      [0.46, 0.86, 0.78],
      [0.94, 0.84, 0.48],
    ],
  },
};

function mix(a, b, t) {
  return a + (b - a) * t;
}

function makePaletteColors(count, paletteKey) {
  const palette = PALETTES[paletteKey] ?? PALETTES.patina;
  const data = new Float32Array(count * 3);

  for (let i = 0; i < count; i += 1) {
    const wave = (Math.sin(i * 0.017) + 1) / 2;
    const shimmer = (Math.sin(i * 0.071) + 1) / 2;
    const base = palette.colors[Math.floor(wave * palette.colors.length) % palette.colors.length];
    const next = palette.colors[(Math.floor(wave * palette.colors.length) + 1) % palette.colors.length];
    const t = shimmer * 0.5;
    data[i * 3] = mix(base[0], next[0], t);
    data[i * 3 + 1] = mix(base[1], next[1], t);
    data[i * 3 + 2] = mix(base[2], next[2], t);
  }

  return data;
}

function GalleryParticles({ shape, palette, autoRotate, explodeSignal, disturbLevel }) {
  const count = 4200;
  const pointsRef = useRef(null);
  const geometryRef = useRef(null);
  const burstPower = useRef(0);
  const { pointer, viewport } = useThree();

  const initialPositions = useMemo(() => createInitialPoints(count), []);
  const targetPositions = useMemo(() => createShapePoints(shape, count), [shape]);
  const colors = useMemo(() => makePaletteColors(count, palette), [palette]);

  useEffect(() => {
    burstPower.current = 2.7;
  }, [explodeSignal]);

  useEffect(() => {
    if (!geometryRef.current) return;
    geometryRef.current.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometryRef.current.attributes.color.needsUpdate = true;
  }, [colors]);

  useFrame((state, delta) => {
    const geometry = geometryRef.current;
    const points = pointsRef.current;
    if (!geometry || !points) return;

    const positions = geometry.attributes.position.array;
    const elapsed = state.clock.elapsedTime;
    const mouseX = pointer.x * viewport.width * 0.32;
    const mouseY = pointer.y * viewport.height * 0.32;

    if (autoRotate) {
      points.rotation.y += delta * 0.26;
      points.rotation.x = Math.sin(elapsed * 0.32) * 0.08;
    }

    burstPower.current *= 0.9;

    for (let i = 0; i < count; i += 1) {
      const id = i * 3;
      const tx = targetPositions[id];
      const ty = targetPositions[id + 1];
      const tz = targetPositions[id + 2];
      const px = positions[id];
      const py = positions[id + 1];
      const pz = positions[id + 2];

      positions[id] += (tx - px) * 0.055 + Math.sin(elapsed * 1.2 + i * 0.01) * 0.002;
      positions[id + 1] += (ty - py) * 0.055 + Math.cos(elapsed * 0.9 + i * 0.012) * 0.002;
      positions[id + 2] += (tz - pz) * 0.055;

      const dx = px - mouseX;
      const dy = py - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy + pz * pz * 0.12) + 0.001;
      if (dist < 1.05) {
        const force = (1.05 - dist) * 0.024 * disturbLevel;
        positions[id] += (dx / dist) * force;
        positions[id + 1] += (dy / dist) * force;
        positions[id + 2] += Math.sin(elapsed + i) * force;
      }

      if (burstPower.current > 0.01) {
        const [ux, uy, uz] = randomUnit(i + 400);
        const burst = burstPower.current * 0.045;
        positions[id] += ux * burst;
        positions[id + 1] += uy * burst;
        positions[id + 2] += uz * burst;
      }
    }

    geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute attach="attributes-position" args={[initialPositions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
        vertexColors
        transparent
        opacity={0.95}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

export { PALETTES };

export default function GalleryParticleViewer({ shape, palette, autoRotate, explodeSignal, disturbLevel, onExplode }) {
  return (
    <div className="gallery-particle-stage" onClick={onExplode}>
      <Canvas camera={{ position: [0, 0, 5.7], fov: 48 }} dpr={[1, 1.6]} gl={{ antialias: true, alpha: true }}>
        <color attach="background" args={['#040708']} />
        <fog attach="fog" args={['#040708', 4.6, 10]} />
        <ambientLight intensity={0.72} />
        <pointLight position={[2.4, 3.2, 4.8]} color="#e7bd65" intensity={2.4} />
        <pointLight position={[-3, -1, 2.2]} color="#43b7a2" intensity={2.2} />
        <GalleryParticles
          shape={shape}
          palette={palette}
          autoRotate={autoRotate}
          explodeSignal={explodeSignal}
          disturbLevel={disturbLevel}
        />
        <OrbitControls enablePan={false} enableZoom={false} rotateSpeed={0.8} dampingFactor={0.08} enableDamping />
        <Preload all />
      </Canvas>
    </div>
  );
}
