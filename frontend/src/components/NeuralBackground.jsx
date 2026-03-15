import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Particles() {
  const meshRef = useRef();
  const linesRef = useRef();
  const count = 200;
  const distanceThreshold = 3;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  const velocities = useMemo(() => {
    const vel = [];
    for (let i = 0; i < count; i++) {
      vel.push({
        x: (Math.random() - 0.5) * 0.005,
        y: (Math.random() - 0.5) * 0.005,
        z: (Math.random() - 0.5) * 0.005,
      });
    }
    return vel;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;

    const posArray = meshRef.current.geometry.attributes.position.array;

    // Move particles
    for (let i = 0; i < count; i++) {
      posArray[i * 3] += velocities[i].x;
      posArray[i * 3 + 1] += velocities[i].y;
      posArray[i * 3 + 2] += velocities[i].z;

      // Wrap around
      for (let j = 0; j < 3; j++) {
        if (posArray[i * 3 + j] > 10) posArray[i * 3 + j] = -10;
        if (posArray[i * 3 + j] < -10) posArray[i * 3 + j] = 10;
      }
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;

    // Build lines connecting nearby particles
    const linePositions = [];
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = posArray[i * 3] - posArray[j * 3];
        const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1];
        const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < distanceThreshold) {
          linePositions.push(posArray[i * 3], posArray[i * 3 + 1], posArray[i * 3 + 2]);
          linePositions.push(posArray[j * 3], posArray[j * 3 + 1], posArray[j * 3 + 2]);
        }
      }
    }

    if (linesRef.current) {
      linesRef.current.geometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(linePositions, 3)
      );
    }

    // Slow rotation
    meshRef.current.rotation.y += 0.0005;
    meshRef.current.rotation.x += 0.0002;
    if (linesRef.current) {
      linesRef.current.rotation.y += 0.0005;
      linesRef.current.rotation.x += 0.0002;
    }
  });

  return (
    <>
      <points ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#00D4FF"
          size={0.06}
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial color="#00D4FF" transparent opacity={0.15} />
      </lineSegments>
    </>
  );
}

export default function NeuralBackground() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <Particles />
      </Canvas>
    </div>
  );
}
