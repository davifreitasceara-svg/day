"use client";

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTheme } from 'next-themes';
import * as THREE from 'three';

const Lines = () => {
  const { theme } = useTheme();
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const isDark = theme === 'dark' || theme === undefined;
  
  const uniforms = useMemo(
    () => ({
      time: { value: 0 },
      colorBase: { value: new THREE.Color(isDark ? '#6C5CE7' : '#A29BFE') },
      colorAccent: { value: new THREE.Color(isDark ? '#00D2FF' : '#0ABDE3') },
    }),
    [isDark]
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime * 0.5;
    }
  });

  const vertexShader = `
    varying vec2 vUv;
    varying vec3 vPos;
    uniform float time;
    
    void main() {
      vUv = uv;
      vPos = position;
      
      vec3 pos = position;
      pos.z += sin(pos.x * 2.0 + time) * 0.5;
      pos.z += cos(pos.y * 1.5 + time) * 0.5;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    varying vec2 vUv;
    varying vec3 vPos;
    uniform float time;
    uniform vec3 colorBase;
    uniform vec3 colorAccent;
    
    void main() {
      float glow = abs(sin(vPos.y * 10.0 - time * 2.0));
      glow = pow(glow, 4.0);
      
      vec3 finalColor = mix(colorBase, colorAccent, vUv.x + sin(time)*0.5);
      finalColor += finalColor * glow * 1.5;
      
      float alpha = smoothstep(0.0, 0.5, vUv.y) * smoothstep(1.0, 0.5, vUv.y);
      
      gl_FragColor = vec4(finalColor, alpha * 0.4);
    }
  `;

  return (
    <mesh rotation={[-Math.PI / 3, 0, 0]} position={[0, -1, -2]}>
      <planeGeometry args={[20, 20, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent={true}
        wireframe={true}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
};

export function ShaderLinesBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none" style={{ opacity: 0.8 }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <Lines />
      </Canvas>
    </div>
  );
}
