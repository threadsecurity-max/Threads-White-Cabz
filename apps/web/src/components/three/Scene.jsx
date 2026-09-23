import React, { Suspense } from 'react';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import { CarModel } from './CarModel';

export function Scene() {
  return (
    <>
      {/* Lighting Setup for Clean Presentation */}
      <ambientLight intensity={1.8} />
      <directionalLight
        position={[6, 9, 6]}
        intensity={2.8}
        color="#FFFFFF"
        castShadow
      />
      <directionalLight
        position={[-6, 5, -4]}
        intensity={1.5}
        color="#F5EFEB"
      />
      <pointLight position={[0, 4, 3]} intensity={1.8} color="#FFFBF0" />
      <pointLight position={[0, -2, -2]} intensity={0.8} color="#EADDC4" />

      {/* 3D Car Model firmly placed on the ground with zero continuous movement or floating */}
      <Suspense fallback={null}>
        <CarModel />
      </Suspense>

      {/* Soft Ground Contact Shadow */}
      <ContactShadows
        position={[0, -0.65, 0]}
        opacity={0.4}
        scale={10}
        blur={2}
        far={4}
        color="#4A3B2C"
      />

      {/* Camera Controls for inspection */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        maxPolarAngle={Math.PI / 2.1}
        minPolarAngle={Math.PI / 3.4}
        maxAzimuthAngle={Math.PI / 3.5}
        minAzimuthAngle={-Math.PI / 3.5}
        rotateSpeed={0.5}
      />
    </>
  );
}
