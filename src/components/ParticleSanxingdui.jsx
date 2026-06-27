import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Preload } from '@react-three/drei';
import * as THREE from 'three';
import { createColors, createInitialPoints, createShapePoints, randomUnit } from '../lib/particleShapes.js';

function useResponsiveCount(count) {
  const [safeCount, setSafeCount] = useState(() => {
    if (typeof window === 'undefined') return count;
    return window.innerWidth < 720 ? Math.min(count, 2800) : count;
  });

  useEffect(() => {
    const update = () => {
      setSafeCount(window.innerWidth < 720 ? Math.min(count, 2800) : count);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [count]);

  return safeCount;
}

function ParticleCloud({ activeShape, particleCount, explodeSignal, autoRotate, onExplode }) {
  const count = useResponsiveCount(particleCount);
  const pointsRef = useRef(null);
  const geometryRef = useRef(null);
  const explosionPower = useRef(0);
  const dragBoost = useRef(0);
  const { pointer, viewport } = useThree();

  const initialPositions = useMemo(() => createInitialPoints(count), [count]);
  const targetPositions = useMemo(() => createShapePoints(activeShape, count), [activeShape, count]);
  const colors = useMemo(() => createColors(activeShape, count), [activeShape, count]);

  useEffect(() => {
    explosionPower.current = 2.4;
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
    const mouseX = pointer.x * viewport.width * 0.26;
    const mouseY = pointer.y * viewport.height * 0.26;

    if (autoRotate) {
      points.rotation.y += delta * 0.18;
      points.rotation.x = Math.sin(elapsed * 0.24) * 0.06;
    }

    dragBoost.current *= 0.94;
    explosionPower.current *= 0.91;

    for (let i = 0; i < count; i += 1) {
      const id = i * 3;
      const px = positions[id];
      const py = positions[id + 1];
      const pz = positions[id + 2];

      const tx = targetPositions[id];
      const ty = targetPositions[id + 1];
      const tz = targetPositions[id + 2];

      const rhythm = Math.sin(elapsed * 1.15 + i * 0.018) * 0.003;
      positions[id] += (tx - px) * 0.048 + rhythm;
      positions[id + 1] += (ty - py) * 0.048 + Math.cos(elapsed + i * 0.01) * 0.002;
      positions[id + 2] += (tz - pz) * 0.048 + Math.sin(elapsed * 0.8 + i * 0.02) * 0.002;

      const dx = px - mouseX;
      const dy = py - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy + pz * pz * 0.12) + 0.001;
      if (dist < 0.86) {
        const force = (0.86 - dist) * 0.026;
        positions[id] += (dx / dist) * force;
        positions[id + 1] += (dy / dist) * force;
        positions[id + 2] += Math.sin(elapsed + i) * force * 0.8;
      }

      if (explosionPower.current > 0.012) {
        const [ux, uy, uz] = randomUnit(i);
        const burst = explosionPower.current * 0.035;
        positions[id] += ux * burst;
        positions[id + 1] += uy * burst;
        positions[id + 2] += uz * burst;
      }
    }

    geometry.attributes.position.needsUpdate = true;
  });

  const handlePointerDown = () => {
    dragBoost.current = 1;
  };

  return (
    <points
      ref={pointsRef}
      onClick={(event) => {
        event.stopPropagation();
        onExplode?.();
      }}
      onPointerDown={handlePointerDown}
    >
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute attach="attributes-position" args={[initialPositions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.026}
        vertexColors
        transparent
        opacity={0.96}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

function AmbientDust() {
  const dustRef = useRef(null);
  const count = 520;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      arr[i * 3] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 6;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 5 - 1;
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    if (!dustRef.current) return;
    dustRef.current.rotation.y += delta * 0.015;
    dustRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.04;
  });

  return (
    <points ref={dustRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#9acabd" size={0.01} transparent opacity={0.35} depthWrite={false} />
    </points>
  );
}

export default function ParticleSanxingdui({ activeShape, particleCount, explodeSignal, autoRotate, onExplode }) {
  return (
    <div className="particle-canvas" aria-label="三星堆青铜器粒子交互画布">
      <Canvas camera={{ position: [0, 0, 6.2], fov: 48 }} dpr={[1, 1.6]} gl={{ antialias: true, alpha: true }}>
        <color attach="background" args={['#05080a']} />
        <fog attach="fog" args={['#05080a', 5, 11]} />
        <ambientLight intensity={0.7} />
        <pointLight position={[2, 3, 5]} color="#d6b56d" intensity={2.2} />
        <pointLight position={[-3, -1, 2]} color="#2e6b5f" intensity={2.8} />
        <AmbientDust />
        <ParticleCloud
          activeShape={activeShape}
          particleCount={particleCount}
          explodeSignal={explodeSignal}
          autoRotate={autoRotate}
          onExplode={onExplode}
        />
        <OrbitControls enablePan={false} enableZoom={false} rotateSpeed={0.65} dampingFactor={0.08} enableDamping />
        <Preload all />
      </Canvas>
    </div>
  );
}
