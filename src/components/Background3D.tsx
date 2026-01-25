import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

function FloatingGeometry({ position, scale, color }: { position: [number, number, number]; scale: number; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      meshRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.2) * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.15}
          wireframe
        />
      </mesh>
    </Float>
  );
}

function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 800;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.015;
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
          itemSize={3}
          usage={THREE.StaticDrawUsage}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#8b7cf5"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function GradientPlane() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.5 - 5;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -5, -5]}>
      <planeGeometry args={[50, 50, 32, 32]} />
      <meshStandardMaterial
        color="#6b5ce7"
        transparent
        opacity={0.05}
        wireframe
      />
    </mesh>
  );
}

function MouseLight() {
  const lightRef = useRef<THREE.PointLight>(null);
  const { viewport } = useThree();
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (lightRef.current) {
        const x = (e.clientX / window.innerWidth - 0.5) * viewport.width * 2;
        const y = -(e.clientY / window.innerHeight - 0.5) * viewport.height * 2;
        lightRef.current.position.x = x;
        lightRef.current.position.y = y;
      }
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [viewport]);

  return <pointLight ref={lightRef} position={[0, 0, 5]} intensity={0.5} color="#a78bfa" />;
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <MouseLight />
      
      <Stars 
        radius={50} 
        depth={50} 
        count={1000} 
        factor={2} 
        saturation={0} 
        fade 
        speed={0.5} 
      />
      
      <ParticleField />
      
      <FloatingGeometry position={[-4, 2, -3]} scale={1.5} color="#8b7cf5" />
      <FloatingGeometry position={[4, -1, -4]} scale={1.2} color="#a78bfa" />
      <FloatingGeometry position={[0, 3, -5]} scale={0.8} color="#6b5ce7" />
      <FloatingGeometry position={[-3, -2, -2]} scale={0.6} color="#818cf8" />
      <FloatingGeometry position={[5, 2, -6]} scale={1} color="#7c3aed" />
      
      <GradientPlane />
    </>
  );
}

export function Background3D() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isLowEnd, setIsLowEnd] = useState(false);

useEffect(() => {
  if (typeof window === "undefined") return;

  // Reduced motion preference
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const updateMotion = () => setReducedMotion(mediaQuery.matches);
  updateMotion();
  mediaQuery.addEventListener("change", updateMotion);

  // Low-end GPU detection
  const canvas = document.createElement("canvas");
  const gl = canvas.getContext("webgl");
  if (gl) {
    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    if (debugInfo) {
      const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
      if (/Mali|Adreno/i.test(renderer)) {
        setIsLowEnd(true);
      }
    }
  }

  return () => mediaQuery.removeEventListener("change", updateMotion);
}, []);


  if (reducedMotion || isLowEnd) {
    // Fallback gradient background
    return (
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(ellipse at 30% 20%, hsl(250 40% 40% / 0.15) 0%, transparent 50%),
                         radial-gradient(ellipse at 70% 80%, hsl(280 40% 40% / 0.1) 0%, transparent 50%)`,
          }}
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={isLowEnd ? 1 : [1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
      
      {/* Gradient overlay for better text readability */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(180deg, 
            hsl(var(--background)) 0%, 
            hsl(var(--background) / 0.8) 30%, 
            hsl(var(--background) / 0.9) 70%,
            hsl(var(--background)) 100%)`,
        }}
      />
    </div>
  );
}