"use client";

import React from "react";
import { motion } from "motion/react";
import Image from "next/image";

interface LogoCarouselProps {
  columns?: number;
}

// Tech logos for the carousel
const techLogos = [
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
    alt: "ChatGPT",
    width: 120,
    height: 30
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    alt: "Microsoft",
    width: 120,
    height: 30
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    alt: "Google",
    width: 120,
    height: 30
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Kaggle_logo.png",
    alt: "Kaggle",
    width: 100,
    height: 30
  },
  {
    src: "https://huggingface.co/front/assets/huggingface_logo-noborder.svg",
    alt: "HuggingFace",
    width: 130,
    height: 30
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/en/2/21/Nvidia_logo.svg",
    alt: "NVIDIA",
    width: 120,
    height: 30
  }
];

export const LogoCarousel = ({ columns = 3 }: LogoCarouselProps) => {
  // Calculate the rows based on the columns to show all logos
  const totalLogos = techLogos.length;
  const rows = Math.ceil(totalLogos / columns);
  
  // Divide logos into rows
  const logosInRows = Array.from({ length: rows }, (_, rowIndex) => {
    const start = rowIndex * columns;
    return techLogos.slice(start, start + columns);
  });

  return (
    <div className="w-full mt-8 overflow-hidden">
      {logosInRows.map((rowLogos, rowIndex) => (
        <div 
          key={`row-${rowIndex}`} 
          className="flex items-center justify-center space-x-12 py-4"
        >
          {rowLogos.map((logo, logoIndex) => (
            <motion.div
              key={`logo-${logoIndex}-${rowIndex}`}
              className="flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="relative h-12 flex items-center justify-center">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                  className="object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            </motion.div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default LogoCarousel; 