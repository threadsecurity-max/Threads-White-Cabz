import React from 'react';
import { useGLTF } from '@react-three/drei';

export function CarModel(props) {
  // Load the GLB model from public/models/vehicle.glb
  const { scene } = useGLTF('/models/vehicle.glb');

  return (
    <group {...props} dispose={null}>
      {/* Placed firmly on the ground with zero continuous movement */}
      <primitive
        object={scene}
        scale={1.35}
        position={[0, -0.65, 0]}
        rotation={[0, 0.55, 0]}
      />
    </group>
  );
}

// Preload the model
useGLTF.preload('/models/vehicle.glb');
