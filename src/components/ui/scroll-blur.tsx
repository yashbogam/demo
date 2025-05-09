"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollBlurProps {
  children: React.ReactNode;
}

export const ScrollBlur: React.FC<ScrollBlurProps> = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();
  
  // Create transforms based on scroll position
  const contentBlur = useTransform(
    scrollY,
    [0, 50, 100, 200],
    [0, 0, 3, 6]
  );
  
  const overlayOpacity = useTransform(
    scrollY,
    [0, 50, 100, 200],
    [0, 0, 0.1, 0.2]
  );

  // Only enable on client side to avoid hydration errors
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <>{children}</>;

  return (
    <div className="relative">
      {/* Main content with blur effect */}
      <motion.div
        style={{
          filter: `blur(${contentBlur}px)`,
          WebkitFilter: `blur(${contentBlur}px)`,
        }}
      >
        {children}
      </motion.div>
      
      {/* Overlay that appears when scrolling to enhance the blur effect */}
      <motion.div
        className="fixed inset-0 pointer-events-none bg-black/20 z-10"
        style={{
          opacity: overlayOpacity,
        }}
      />
    </div>
  );
}; 