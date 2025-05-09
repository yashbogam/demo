"use client";

import React, { useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  MobileNav,
  MobileNavMenu,
  MobileNavToggle,
  NavbarLogo,
  NavbarButton,
  NavItems
} from "@/components/ui/resizable-navbar";

const navItems = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Features",
    link: "#features",
  },
  {
    name: "Testimonials",
    link: "#testimonials",
  },
  {
    name: "Pricing",
    link: "#pricing",
  },
  {
    name: "Contact",
    link: "#contact",
  },
];

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Get scroll progress values from Framer Motion
  const { scrollY } = useScroll();
  
  // Create spring animation for smoother transitions
  const scrollYSpring = useSpring(scrollY, {
    stiffness: 300,
    damping: 40,
    restDelta: 0.001
  });
  
  // Transform scroll values into visual properties
  const headerWidth = useTransform(
    scrollYSpring, 
    [0, 200], 
    ["100%", "84%"]
  );
  
  const headerBorderRadius = useTransform(
    scrollYSpring,
    [0, 200],
    [0, 20]  // Increased border radius for more pronounced pill shape
  );
  
  // Adjusted background for glassmorphism
  const headerBackgroundOpacity = useTransform(
    scrollYSpring,
    [0, 100, 200],
    [0.6, 0.8, 0.9]  // Increased opacity to make content below less visible
  );
  
  // Enhanced blur effect for glassmorphism
  const headerBlur = useTransform(
    scrollYSpring,
    [0, 50, 150, 200],
    [5, 15, 25, 35]  // Increased blur values to obscure content below
  );
  
  const headerY = useTransform(
    scrollYSpring,
    [0, 200],
    [0, 8]
  );
  
  const headerScale = useTransform(
    scrollYSpring,
    [0, 200],
    [1, 0.98]
  );
  
  const paddingY = useTransform(
    scrollYSpring,
    [0, 200],
    [1, 0.6]  // Adjusted for better proportions
  );
  
  const shadowOpacity = useTransform(
    scrollYSpring,
    [0, 200],
    [0, 0.15]  // Subtler shadow for glassmorphism
  );
  
  // New transform for border opacity to achieve glassmorphism effect
  const borderOpacity = useTransform(
    scrollYSpring,
    [0, 100, 200],
    [0, 0.1, 0.15]
  );
  
  // New transform for top highlight to achieve glassmorphism effect
  const highlightOpacity = useTransform(
    scrollYSpring,
    [0, 100, 200],
    [0, 0.05, 0.08]
  );
  
  return (
    <motion.div 
      className="fixed inset-x-0 top-0 z-[100] w-full flex items-center justify-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="relative z-[60] flex w-full flex-row items-center justify-between px-4 py-3 lg:flex text-white mx-auto"
        style={{
          width: headerWidth,
          borderRadius: headerBorderRadius,
          backgroundColor: `rgba(0, 0, 0, ${headerBackgroundOpacity.get()})`,  // Changed from (10, 10, 20) to (0, 0, 0)
          backdropFilter: `blur(${headerBlur}px)`,
          WebkitBackdropFilter: `blur(${headerBlur}px)`,
          y: headerY,
          scale: headerScale,
          paddingTop: useTransform(paddingY, value => `${value * 16}px`),
          paddingBottom: useTransform(paddingY, value => `${value * 16}px`),
          // Glassmorphism border effect
          border: useTransform(
            borderOpacity, 
            (opacity) => `1px solid rgba(255, 255, 255, ${opacity})`
          ),
          // Enhanced shadow for glassmorphism
          boxShadow: useTransform(
            shadowOpacity,
            (opacity) => 
              `0 4px 30px rgba(0, 0, 0, ${opacity}), 
               inset 0 1px 0 0 rgba(255, 255, 255, ${highlightOpacity.get()})`
          ),
          // Subtle inner glow on top
          backgroundImage: useTransform(
            highlightOpacity,
            (opacity) => 
              `linear-gradient(to bottom, 
                rgba(255, 255, 255, ${opacity}) 0%, 
                rgba(255, 255, 255, 0) 50%)`
          ),
          backgroundBlendMode: 'overlay'
        }}
      >
        <NavbarLogo />
        <NavItems items={navItems} />
        <div className="ml-auto flex items-center space-x-2">
          <NavbarButton variant="secondary" href="/login">
            Login
          </NavbarButton>
          <NavbarButton variant="primary" href="/signup">
            Sign Up
          </NavbarButton>
        </div>
      </motion.div>
      
      <MobileNav>
        <div className="flex items-center justify-between w-full p-4">
          <NavbarLogo />
          <MobileNavToggle isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
        </div>
        
        <MobileNavMenu isOpen={isOpen} onClose={() => setIsOpen(false)}>
          {navItems.map((item, idx) => (
            <a
              key={`mobile-link-${idx}`}
              className="w-full rounded-md px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-neutral-800 dark:text-gray-300 dark:hover:bg-neutral-700"
              href={item.link}
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </a>
          ))}
          <div className="mt-4 flex w-full flex-col space-y-2">
            <NavbarButton className="w-full" href="/login" variant="secondary">
              Login
            </NavbarButton>
            <NavbarButton className="w-full" href="/signup" variant="primary">
              Sign Up
            </NavbarButton>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </motion.div>
  );
}; 