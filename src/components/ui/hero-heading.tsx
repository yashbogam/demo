"use client";

import React from "react";
import { TypingAnimation } from "./typing-animation";

export const HeroHeading = () => {
  return (
    <div className="mb-6">
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white whitespace-nowrap">Comprehensive</h1>
      <div className="text-5xl md:text-6xl lg:text-7xl font-bold text-white whitespace-nowrap">Medical Datasets</div>
      <div className="text-5xl md:text-6xl lg:text-7xl font-bold text-white whitespace-nowrap">for</div>
      <div className="text-5xl md:text-6xl lg:text-7xl font-bold">
        <TypingAnimation 
          words={["Research", "Developers"]} 
          typingSpeed={80}
          deletingSpeed={50}
          delayBetweenWords={2000}
          className="bg-gradient-to-t from-[#ff6e7f] to-[#bfe9ff] bg-clip-text text-transparent font-bold"
        />
      </div>
    </div>
  );
}; 