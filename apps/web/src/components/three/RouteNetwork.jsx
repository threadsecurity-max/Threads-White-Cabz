import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Line } from '@react-three/drei';

const NODES = [
  { name: 'Jalandhar (Hub)', pos: [0, -0.2, 0.5], isHub: true },
  { name: 'Delhi NCR', pos: [3.2, -0.2, -1.5], isHub: false },
  { name: 'Chandigarh', pos: [1.8, 0.4, -0.8], isHub: false },
  { name: 'Amritsar', pos: [-2.6, 0.1, -0.5], isHub: false },
  { name: 'Jammu', pos: [-2.2, 1.2, -2.2], isHub: false },
  { name: 'Manali', pos: [1.2, 1.6, -2.5], isHub: false },
  { name: 'Dharamshala', pos: [-0.4, 1.3, -2.0], isHub: false },
];

const CONNECTIONS = [
  [0, 1], // Jalandhar -> Delhi
  [0, 2], // Jalandhar -> Chandigarh
  [0, 3], // Jalandhar -> Amritsar
  [0, 4], // Jalandhar -> Jammu
  [0, 5], // Jalandhar -> Manali
  [0, 6], // Jalandhar -> Dharamshala
  [2, 1], // Chandigarh -> Delhi
];

export function RouteNetwork() {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.getElapsedTime();
      groupRef.current.rotation.y = Math.sin(t * 0.15) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Connecting animated route lines */}
      {CONNECTIONS.map(([startIndex, endIndex], i) => {
        const start = NODES[startIndex].pos;
        const end = NODES[endIndex].pos;
        return (
          <Line
            key={i}
            points={[start, end]}
            color="#B89344"
            lineWidth={1.5}
            transparent
            opacity={0.45}
            dashed={false}
          />
        );
      })}

      {/* Destination Nodes */}
      {NODES.map((node, i) => (
        <group key={i} position={node.pos}>
          {/* Node sphere */}
          <mesh>
            <sphereGeometry args={[node.isHub ? 0.09 : 0.06, 16, 16]} />
            <meshStandardMaterial
              color={node.isHub ? '#B89344' : '#C5A059'}
              emissive={node.isHub ? '#9E7B2D' : '#D4B36A'}
              emissiveIntensity={1.2}
              roughness={0.2}
            />
          </mesh>

          {/* HTML Label for light background */}
          <Html distanceFactor={8} position={[0, 0.15, 0]} center>
            <div className={`px-2.5 py-0.5 rounded-lg text-[11px] font-bold whitespace-nowrap border pointer-events-none transition-all shadow-md ${
              node.isHub
                ? 'bg-gradient-to-r from-brand-gold-light to-brand-gold text-white border-white scale-110'
                : 'bg-white/95 text-slate-800 border-brand-border backdrop-blur-sm'
            }`}>
              {node.name}
            </div>
          </Html>
        </group>
      ))}
    </group>
  );
}
