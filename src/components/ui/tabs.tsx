"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type Tab = {
  title: string;
  value: string;
  content?: string | React.ReactNode | any;
};

export const Tabs = ({
  tabs: propTabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
}: {
  tabs: Tab[];
  containerClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
  contentClassName?: string;
}) => {
  const [active, setActive] = useState<Tab>(propTabs[0]);
  const [tabs, setTabs] = useState<Tab[]>(propTabs);
  const [hovering, setHovering] = useState(false);
  const [autoRotatePaused, setAutoRotatePaused] = useState(false);
  
  const rotationTimerRef = useRef<NodeJS.Timeout | null>(null);
  const pauseTimerRef = useRef<NodeJS.Timeout | null>(null);
  const currentTabIndexRef = useRef(0);

  // Reset auto-rotation timer
  const resetAutoRotation = useCallback(() => {
    if (rotationTimerRef.current) {
      clearInterval(rotationTimerRef.current);
    }
    
    if (!autoRotatePaused) {
      rotationTimerRef.current = setInterval(() => {
        const nextIndex = (currentTabIndexRef.current + 1) % propTabs.length;
        moveSelectedTabToTop(nextIndex);
        currentTabIndexRef.current = nextIndex;
      }, 10000); // 10 seconds
    }
  }, [autoRotatePaused, propTabs.length]);

  // Pause auto-rotation on user interaction
  const handleUserInteraction = useCallback(() => {
    setAutoRotatePaused(true);
    
    if (pauseTimerRef.current) {
      clearTimeout(pauseTimerRef.current);
    }
    
    pauseTimerRef.current = setTimeout(() => {
      setAutoRotatePaused(false);
    }, 5 * 60 * 1000); // 5 minutes
  }, []);

  // Set up the auto-rotation
  useEffect(() => {
    resetAutoRotation();
    
    return () => {
      if (rotationTimerRef.current) {
        clearInterval(rotationTimerRef.current);
      }
      if (pauseTimerRef.current) {
        clearTimeout(pauseTimerRef.current);
      }
    };
  }, [resetAutoRotation, autoRotatePaused]);

  const moveSelectedTabToTop = (idx: number) => {
    const newTabs = [...propTabs];
    const selectedTab = newTabs.splice(idx, 1);
    newTabs.unshift(selectedTab[0]);
    setTabs(newTabs);
    setActive(newTabs[0]);
    
    // Update current index reference for auto-rotation
    currentTabIndexRef.current = idx;
  };

  return (
    <>
      <div
        className={cn(
          "flex flex-row items-center justify-start [perspective:1000px] relative overflow-auto sm:overflow-visible no-visible-scrollbar max-w-full w-full",
          containerClassName
        )}
      >
        {propTabs.map((tab, idx) => (
          <button
            key={tab.title}
            onClick={() => {
              moveSelectedTabToTop(idx);
              handleUserInteraction();
            }}
            onMouseEnter={() => {
              setHovering(true);
              handleUserInteraction();
            }}
            onMouseLeave={() => setHovering(false)}
            className={cn("relative px-4 py-2 rounded-full", tabClassName)}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {active.value === tab.value && (
              <motion.div
                layoutId="clickedbutton"
                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                className={cn(
                  "absolute inset-0 rounded-full",
                  tab.title !== "Researchers & Academic Institutions" && 
                  tab.title !== "Healthcare Technology" && 
                  tab.title !== "Medical Education" ? "bg-gray-200 dark:bg-zinc-800" : "",
                  activeTabClassName
                )}
                style={{
                  background: tab.title === "Researchers & Academic Institutions" ? 
                    "linear-gradient(to right, #000428, #004e92)" :
                    tab.title === "Healthcare Technology" ?
                    "linear-gradient(to right, #155799, #159957)" : 
                    tab.title === "Medical Education" ?
                    "linear-gradient(to right, #3a6186, #89253e)" : ""
                }}
              />
            )}

            <span className="relative block text-white">
              {tab.title}
            </span>
          </button>
        ))}
      </div>
      <FadeInDiv
        tabs={tabs}
        active={active}
        key={active.value}
        hovering={hovering}
        className={cn("mt-32", contentClassName)}
        handleUserInteraction={handleUserInteraction}
      />
    </>
  );
};

export const FadeInDiv = ({
  className,
  tabs,
  hovering,
  handleUserInteraction,
}: {
  className?: string;
  key?: string;
  tabs: Tab[];
  active: Tab;
  hovering?: boolean;
  handleUserInteraction?: () => void;
}) => {
  const isActive = (tab: Tab) => {
    return tab.value === tabs[0].value;
  };
  return (
    <div 
      className="relative w-full h-full perspective-1000"
      onClick={handleUserInteraction}
      onMouseEnter={handleUserInteraction}
    >
      {tabs.map((tab, idx) => (
        <motion.div
          key={tab.value}
          layoutId={tab.value}
          style={{
            scale: 1 - idx * 0.05,
            top: idx * 15,
            zIndex: 10 - idx,
            opacity: idx === 0 ? 1 : idx < 3 ? 0.8 - idx * 0.2 : 0,
            transform: idx === 0 ? "translateZ(0px)" : `translateZ(-${idx * 20}px) translateY(${idx * 10}px)`,
            transformOrigin: "center top",
            boxShadow: idx > 0 ? `0 ${idx * 2}px ${idx * 4}px rgba(0,0,0,0.15)` : "none"
          }}
          animate={{
            y: isActive(tab) ? [0, 20, 0] : 0,
          }}
          transition={{
            duration: 0.5,
            ease: "easeInOut"
          }}
          className={cn("w-full h-full absolute top-0 left-0 rounded-lg", className)}
        >
          {tab.content}
        </motion.div>
      ))}
    </div>
  );
};
