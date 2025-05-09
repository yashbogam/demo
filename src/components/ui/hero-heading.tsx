"use client";

import React from "react";
import { TypingAnimation } from "./typing-animation";

export const HeroHeading = () => {
  return (
    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
      <div className="whitespace-nowrap">Comprehensive</div>
      <div className="whitespace-nowrap">Medical Datasets</div>
      <div className="whitespace-nowrap">for</div>
      <div>
        <TypingAnimation 
          words={["Research", "Developers"]} 
          typingSpeed={80}
          deletingSpeed={50}
          delayBetweenWords={2000}
          className="text-blue-500 font-bold"
        />
      </div>
    </h1>
  );
}; 