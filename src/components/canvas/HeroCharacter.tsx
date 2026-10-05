"use client";

import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

const CharacterShaderMaterial = {
  uniforms: {
    tDiffuse: { value: null },
    rimColor: { value: new THREE.Color('#00ccff') },
    desaturation: { value: 0.6 },
    time: { value: 0 },
    mouse: { value: new THREE.Vector2() },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform vec3 rimColor;
    uniform float desaturation;
    
    varying vec2 vUv;
    
    void main() {
      // Base color
      vec4 texColor = texture2D(tDiffuse, vUv);
      
      // Calculate luminance for desaturation
      float luminance = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
      vec3 desaturatedColor = mix(texColor.rgb, vec3(luminance), desaturation);
      
      // Rim lighting trick using texture offset (samples neighboring pixels to find edges)
      float alphaRight = texture2D(tDiffuse, vUv + vec2(0.01, 0.0)).a;
      float alphaLeft = texture2D(tDiffuse, vUv + vec2(-0.01, 0.0)).a;
      
      // If current pixel is transparent but left pixel is opaque, we are on the right edge
      // If current pixel is opaque but right pixel is transparent, we are on the right edge
      // Let's add a subtle rim light to the right edge and bottom
      float edge = max(0.0, texColor.a - alphaRight);
      
      // Add the rim light to the color (subtle)
      vec3 finalColor = desaturatedColor + (rimColor * edge * 0.8);
      
      // Also add a soft blue tint to the dark areas to integrate with the background
      vec3 tint = vec3(0.05, 0.08, 0.12);
      finalColor = finalColor + tint * (1.0 - luminance) * texColor.a;

      // Bottom fade to black/transparent for seamless integration
      float fade = smoothstep(0.0, 0.2, vUv.y);
      float finalAlpha = texColor.a * fade;

      gl_FragColor = vec4(finalColor, finalAlpha);
    }
  `
};

const ShadowMaterial = {
  uniforms: {
    color: { value: new THREE.Color('#000000') },
    opacity: { value: 0.8 }
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 color;
    uniform float opacity;
    varying vec2 vUv;
    void main() {
      float dist = length(vUv - vec2(0.5));
      // Soft radial gradient from center
      float alpha = smoothstep(0.5, 0.1, dist) * opacity;
      gl_FragColor = vec4(color, alpha);
    }
  `
};

export default function HeroCharacter() {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport, pointer } = useThree();
  
  // Load the transparent bitmoji image
  const texture = useTexture('/koshal_bitmoji_transparent.png');
  
  // Apply filter inside an effect to avoid mutating hook return values during render
  useEffect(() => {
    if (texture) {
      // eslint-disable-next-line react-hooks/immutability
      texture.minFilter = THREE.LinearFilter;
      // eslint-disable-next-line react-hooks/immutability
      texture.needsUpdate = true;
    }
  }, [texture]);
  // Create shader materials
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        tDiffuse: { value: texture },
        rimColor: { value: new THREE.Color('#e0e5ec') }, // Neutral cool-grey/white
        desaturation: { value: 0.4 }, // Slightly less desaturated
      },
      vertexShader: CharacterShaderMaterial.vertexShader,
      fragmentShader: CharacterShaderMaterial.fragmentShader,
      transparent: true,
    });
  }, [texture]);

  const shadowMat = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: ShadowMaterial.uniforms,
      vertexShader: ShadowMaterial.vertexShader,
      fragmentShader: ShadowMaterial.fragmentShader,
      transparent: true,
      depthWrite: false
    });
  }, []);

  // Position precisely in the center-right lane, between typography and right-text
  const isMobile = viewport.width < 5;
  const targetX = isMobile ? 0 : viewport.width * 0.05; 
  
  // Increase scale by another ~10-15%
  const image = texture.image as unknown as HTMLImageElement;
  const imageAspect = image ? image.width / image.height : 0.5;
  const height = isMobile ? viewport.height * 0.77 : viewport.height * 0.94;
  const width = height * imageAspect;
  
  // Shift Y down slightly more on desktop so the taller head doesn't crop
  const targetY = isMobile ? viewport.height * 0.12 : -viewport.height * 0.1;

  // Animation: Subtle parallax and idle breathing
  const prefersReducedMotion = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.getElapsedTime();
      
      // Very slow breathing movement (Y axis float)
      const floatY = prefersReducedMotion ? 0 : Math.sin(t * 0.5) * 0.1;
      
      // Smooth parallax based on mouse
      const targetXPos = prefersReducedMotion ? targetX : targetX + (pointer.x * 0.5);
      const targetYPos = prefersReducedMotion ? targetY : targetY + floatY + (pointer.y * 0.5);
      
      groupRef.current.position.x += (targetXPos - groupRef.current.position.x) * 0.05;
      groupRef.current.position.y += (targetYPos - groupRef.current.position.y) * 0.05;
      
      // Very slight rotation parallax
      const targetRotX = prefersReducedMotion ? 0 : (pointer.y * Math.PI) * 0.02;
      const targetRotY = prefersReducedMotion ? 0 : (pointer.x * Math.PI) * 0.05;
      
      groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.05;
      groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[targetX, targetY, 0]}>
      {/* 2.5D Plane with custom shader */}
      <mesh>
        <planeGeometry args={[width, height, 16, 16]} />
        <primitive object={material} attach="material" />
      </mesh>
      
      {/* Soft grounding shadow */}
      <mesh position={[0, -height/2 + (height * 0.05), -0.5]} rotation={[-Math.PI/2, 0, 0]}>
        <planeGeometry args={[width * 1.2, width * 0.4]} />
        <primitive object={shadowMat} attach="material" />
      </mesh>
    </group>
  );
}
