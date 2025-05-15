"use client";

import React, { useState, useEffect } from "react";
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
  const [viewportHeight, setViewportHeight] = useState(0);
  
  // Get viewport height on client side
  useEffect(() => {
    setViewportHeight(window.innerHeight);
    const handleResize = () => setViewportHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Get scroll progress values from Framer Motion
  const { scrollY } = useScroll();
  
  // Create spring animation for smoother transitions
  const scrollYSpring = useSpring(scrollY, {
    stiffness: 300,
    damping: 40,
    restDelta: 0.001
  });
  
  // Calculate a higher scroll threshold to account for MacbookScroll (about 1 viewport height total)
  const scrollThreshold = viewportHeight;
  
  // Transform scroll values into visual properties with extended range
  const headerWidth = useTransform(
    scrollYSpring, 
    [0, scrollThreshold], 
    ["100%", "84%"]
  );
  
  const headerBorderRadius = useTransform(
    scrollYSpring,
    [0, scrollThreshold],
    [0, 20]  // Increased border radius for more pronounced pill shape
  );
  
  // Adjusted background for glassmorphism
  const headerBackgroundOpacity = useTransform(
    scrollYSpring,
    [0, scrollThreshold * 0.5, scrollThreshold],
    [0.6, 0.8, 0.9]  // Increased opacity to make content below less visible
  );
  
  // Enhanced blur effect for glassmorphism
  const headerBlur = useTransform(
    scrollYSpring,
    [0, scrollThreshold * 0.25, scrollThreshold * 0.75, scrollThreshold],
    [5, 15, 25, 35]  // Increased blur values to obscure content below
  );
  
  const headerY = useTransform(
    scrollYSpring,
    [0, scrollThreshold],
    [0, 8]
  );
  
  const headerScale = useTransform(
    scrollYSpring,
    [0, scrollThreshold],
    [1, 0.98]
  );
  
  const paddingY = useTransform(
    scrollYSpring,
    [0, scrollThreshold],
    [1, 0.6]  // Adjusted for better proportions
  );
  
  const shadowOpacity = useTransform(
    scrollYSpring,
    [0, scrollThreshold],
    [0, 0.15]  // Subtler shadow for glassmorphism
  );
  
  // New transform for border opacity to achieve glassmorphism effect
  const borderOpacity = useTransform(
    scrollYSpring,
    [0, scrollThreshold * 0.5, scrollThreshold],
    [0, 0.1, 0.15]
  );
  
  // New transform for top highlight to achieve glassmorphism effect
  const highlightOpacity = useTransform(
    scrollYSpring,
    [0, scrollThreshold * 0.5, scrollThreshold],
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
        className="relative z-[60] hidden w-full flex-row items-center justify-between px-4 py-3 lg:flex text-white mx-auto"
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
      
      {/* Mobile header section wrapper */}
      <div className="lg:hidden w-full bg-transparent">
        {/* Pill-shaped bar */}
        <div className="flex items-center justify-between w-[calc(100%-2rem)] sm:w-auto sm:min-w-[320px] sm:max-w-xs mx-auto rounded-full bg-black/70 backdrop-blur-md p-3 shadow-lg my-2">
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
      </div>
    </motion.div>
  );
}; 