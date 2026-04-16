"use client";

import { Canvas } from "@react-three/fiber";
import { Center, Clone, Float, useGLTF } from "@react-three/drei";
import { Suspense } from "react";
import { HERO_PHONE_MODEL_URL } from "@/lib/hero-phone-model";

useGLTF.preload(HERO_PHONE_MODEL_URL);

function HeroPhoneModel() {
  const gltf = useGLTF(HERO_PHONE_MODEL_URL);

  return (
    <Float
      speed={1.35}
      rotationIntensity={0.28}
      floatIntensity={0.5}
      floatingRange={[-0.1, 0.1]}
    >
      <Center>
        <Clone
          object={gltf.scene}
          scale={1.45}
          castShadow
          receiveShadow
        />
      </Center>
    </Float>
  );
}

export function HeroPhoneModelScene() {
  return (
    <Canvas
      className="h-full w-full touch-none"
      camera={{ position: [0, 0, 4.2], fov: 42 }}
      dpr={[1, 1.75]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[6, 8, 5]} intensity={1.05} />
      <directionalLight position={[-5, 2, -3]} intensity={0.35} />
      <spotLight
        position={[0, 6, 2]}
        intensity={0.5}
        angle={0.55}
        penumbra={0.85}
        color="#ffffff"
      />
      <Suspense fallback={null}>
        <HeroPhoneModel />
      </Suspense>
    </Canvas>
  );
}
