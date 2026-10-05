"use client";

import { useState, useEffect, ReactNode, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';

interface SceneContainerProps {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
}

export default function SceneContainer({ children, fallback, className = "" }: SceneContainerProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState(true);

  useEffect(() => {
    // Check WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setWebGLSupported(false);
      }
    } catch {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setWebGLSupported(false);
    }
    
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className={`bg-gray-900 animate-pulse ${className}`} />; // Simple loading skeleton
  }

  if (!webGLSupported) {
    return <div className={className}>{fallback}</div>;
  }

  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]} // Cap DPR at 2 for performance
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        performance={{ min: 0.5 }} // Drops resolution if framerate drops
      >
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
}
