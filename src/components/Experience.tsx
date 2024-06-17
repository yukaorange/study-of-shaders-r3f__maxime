import { OrbitControls } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import vertexshader from "@shaders/vertexshader.glsl";
import fragmentshader from "@shaders/fragmentshader.glsl";
import { useFrame } from "@react-three/fiber";

export const Experience = (): JSX.Element => {
  const vertexshadersource: string = vertexshader;
  const fragmentshadersource: string = fragmentshader;

  const mesh = useRef<THREE.Mesh>(null);

  const hover = useRef<boolean | null>(null);

  const uniforms = useMemo(() => {
    return {
      u_time: {
        value: 0.0,
      },
      u_intensity: {
        value: 0.3,
      },
      u_colorA: { value: new THREE.Color("#ff0000") },
      u_colorB: { value: new THREE.Color("#0000ff") },
    };
  }, []);

  useFrame((state) => {
    const { clock } = state;

    if (mesh.current) {
      (mesh.current.material as THREE.ShaderMaterial).uniforms.u_time.value =
        clock.getElapsedTime();

      (
        mesh.current.material as THREE.ShaderMaterial
      ).uniforms.u_intensity.value = THREE.MathUtils.lerp(
        (mesh.current.material as THREE.ShaderMaterial).uniforms.u_intensity
          .value,
        hover.current == true ? 0.85 : 0.15,
        0.02
      );
    }
  });

  return (
    <>
      <OrbitControls />
      <mesh
        ref={mesh}
        onPointerOver={() => {
          hover.current = true;
        }}
        onPointerOut={() => {
          hover.current = false;
        }}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <icosahedronGeometry args={[0.7, 30]} />

        <shaderMaterial
          vertexShader={vertexshadersource}
          fragmentShader={fragmentshadersource}
          uniforms={uniforms}
        />
      </mesh>
    </>
  );
};
