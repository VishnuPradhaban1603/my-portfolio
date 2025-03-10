import React, { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useFBX, Stars } from "@react-three/drei";
import * as THREE from "three"; // Import Three.js
import { motion } from "framer-motion";

// Load FBX model and apply skin material
const My3DModel = () => {
  const fbx = useFBX("/models/my-portfolio.fbx"); // Ensure the correct path

  useEffect(() => {
    fbx.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({ color: "#f4c2c2" }); // Light skin tone
      }
    });
  }, [fbx]);

  return <primitive object={fbx} scale={0.03} />;
};

// Main Model Component with Full-Screen 3D Background
const Model = () => {
  return (
    <motion.div className="absolute top-0 left-0 w-full h-full">
      <Canvas camera={{ position: [0, 1, 5], fov: 50 }} style={{ width: "100vw", height: "100vh" }}>
        {/* Background Effect */}
        <Stars radius={100} depth={50} count={5000} factor={4} fade />

        {/* Lights */}
        <ambientLight intensity={2} /> {/* Increased brightness */}
        <directionalLight position={[5, 5, 5]} intensity={3} />
        <spotLight position={[0, 5, 10]} angle={0.3} penumbra={1} intensity={5} />

        {/* 3D Model */}
        <Suspense fallback={<p>Loading Model...</p>}>
          <My3DModel />
        </Suspense>

        {/* Orbit Controls for Interaction */}
        <OrbitControls autoRotate enableZoom={true} />
      </Canvas>
    </motion.div>
  );
};

export default Model;