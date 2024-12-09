"use client";

import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { Experience } from "../../components/Experience";
import { UI } from "../../components/UI";

export default function Dashboard() {
  return (
    <div className="fixed inset-0">
      <Loader />   {/* Loading animation for the 3D model */}
      <Leva  />   {/* Leva UI for controls */}
      <UI />   {/* Custom UI */}
      <Canvas shadows camera={{ position: [0, 0, 10], fov: 30 }}>
        <Experience />   {/* 3D model or scene */}
      </Canvas>
    </div>
  );
}
