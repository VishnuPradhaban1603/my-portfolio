import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Model from "./components/Model"; // Import 3D Model

const App = () => {
  const [bgColor, setBgColor] = useState("#000"); // Default background color

  // Function to change background color based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      if (scrollPosition < 200) setBgColor("#000"); // Black
      else if (scrollPosition < 400) setBgColor("#1a1a2e"); // Dark Blue
      else if (scrollPosition < 600) setBgColor("#16213e"); // Deep Blue
      else if (scrollPosition < 800) setBgColor("#0f3460"); // Indigo
      else if (scrollPosition < 1000) setBgColor("#e94560"); // Vibrant Red
      else setBgColor("#f4c2c2"); // Light Skin Tone
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Function to change background color based on mouse movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX / window.innerWidth; // Normalize X (0 to 1)
      const y = e.clientY / window.innerHeight; // Normalize Y (0 to 1)

      // Generate a dynamic color based on mouse position
      const newColor = `rgb(${Math.floor(x * 255)}, ${Math.floor(y * 255)}, 150)`;
      setBgColor(newColor);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      className="min-h-screen w-full flex flex-col items-center justify-center text-white relative"
      animate={{ backgroundColor: bgColor }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <motion.h1
        className="absolute top-6 text-4xl font-bold text-center"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        🚀 Vishnu's 3D Portfolio
      </motion.h1>

      {/* Full-Screen 3D Model */}
      <div className="absolute inset-0">
        <Model />
      </div>

      {/* Scroll Content */}
      <div className="relative z-10 mt-[100vh] flex flex-col items-center space-y-40 p-20 text-lg">
        {[...Array(10)].map((_, i) => (
          <p key={i}>Move your mouse or scroll to change the background dynamically! 🌈 {i}</p>
        ))}
      </div>
    </motion.div>
  );
};

export default App;