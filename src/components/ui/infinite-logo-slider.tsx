"use client";

import React from "react";
import { motion } from "motion/react";
import Image from "next/image";

interface Logo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export const InfiniteLogoSlider = ({ logos, speed = 30 }: { logos: Logo[], speed?: number }) => {
  // Duplicate logos to create the infinite effect
  const duplicatedLogos = [...logos, ...logos];

  return (
    <div className="relative flex overflow-hidden w-full py-8 bg-black">
      <div className="flex-none w-full flex items-center justify-around">
        <motion.div 
          className="flex items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            duration: speed, 
            ease: "linear", 
            repeat: Infinity,
            repeatType: "loop" 
          }}
        >
          {duplicatedLogos.map((logo, idx) => (
            <div 
              key={`logo-${idx}`} 
              className="flex-none grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300 px-10"
              style={{ width: '200px', display: 'flex', justifyContent: 'center' }}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                className="h-10 w-auto object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}; 