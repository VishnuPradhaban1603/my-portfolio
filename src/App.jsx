import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Model from "./components/Model"; // Import 3D Model

const App = () => {
  const [bgColor, setBgColor] = useState("#000"); // Default background color

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY; // Get scroll position
      console.log("Scroll Position:", scrollPosition); // Debugging

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

  return (
    <motion.div
      className="min-h-screen w-full flex flex-col items-center justify-center text-white relative"
      animate={{ backgroundColor: bgColor }}
      transition={{ duration: 0.5 }}
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
          <p key={i}>Scroll down to change the background color dynamically! 🌈 {i}</p>
        ))}
      </div>
    </motion.div>
  );
};

export default App;