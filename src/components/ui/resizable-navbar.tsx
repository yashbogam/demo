"use client";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useTransform,
  useSpring,
  useMotionValue,
  MotionValue,
  useMotionTemplate,
} from "motion/react";

import React, { useEffect, useRef, useState, memo } from "react";

// A custom hook that creates a bounded scroll value
function useBoundedScroll(threshold: number) {
  const { scrollY } = useScroll();
  const scrollYBounded = useMotionValue(0);
  const scrollYBoundedProgress = useTransform(
    scrollYBounded,
    [0, threshold],
    [0, 1]
  );

  useEffect(() => {
    return scrollY.on("change", (current) => {
      const previous = scrollY.getPrevious();
      const diff = current - previous;
      const newScrollYBounded = scrollYBounded.get() + diff;

      scrollYBounded.set(clamp(newScrollYBounded, 0, threshold));
    });
  }, [threshold, scrollY, scrollYBounded]);

  return { scrollYBounded, scrollYBoundedProgress };
}

// Helper function to clamp a value between min and max
function clamp(number: number, min: number, max: number) {
  return Math.min(Math.max(number, min), max);
}

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
  scrollProgress?: MotionValue<number>;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
  scrollProgress?: MotionValue<number>;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const [visible, setVisible] = useState<boolean>(false);
  
  // Use the bounded scroll hook with a threshold of 200 pixels
  const { scrollYBoundedProgress } = useBoundedScroll(200);
  
  // Create a smooth spring animation from the bounded scroll progress
  const scrollProgress = useSpring(scrollYBoundedProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Set visible state based on scroll position
  useMotionValueEvent(scrollProgress, "change", (latest) => {
    if (latest > 0.05) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <motion.div
      className={cn("fixed inset-x-0 top-4 z-[100] w-full", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean; scrollProgress?: MotionValue<number> }>,
              { visible, scrollProgress },
            )
          : child,
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible, scrollProgress }: NavBodyProps) => {
  // Create a default motion value for when scrollProgress is not provided
  const defaultScrollProgress = useMotionValue(0);
  const effectiveScrollProgress = scrollProgress || defaultScrollProgress;
  
  // Transform scrollProgress into different properties with more natural breakpoints
  const width = useTransform(
    effectiveScrollProgress, 
    [0, 0.25, 0.5, 0.75, 1], 
    ['100%', '96%', '92%', '88%', '84%']
  );
  
  const borderRadius = useTransform(
    effectiveScrollProgress, 
    [0, 0.5, 1], 
    [8, 12, 16]
  );
  
  const opacity = useTransform(
    effectiveScrollProgress, 
    [0, 1], 
    [0.5, 0.9]
  );
  const backgroundColor = useMotionTemplate`rgba(0, 0, 0, ${opacity})`;
  
  const yOffset = useTransform(
    effectiveScrollProgress, 
    [0, 0.5, 1], 
    [0, 4, 8]
  );
  
  const blur = useTransform(
    effectiveScrollProgress, 
    [0, 1], 
    [0, 10]
  );
  const backdropFilter = useMotionTemplate`blur(${blur}px)`;
  
  const scale = useTransform(
    effectiveScrollProgress, 
    [0, 1], 
    [1, 0.98]
  );
  
  return (
    <motion.div
      style={{
        width,
        borderRadius,
        backgroundColor,
        y: yOffset,
        scale,
        backdropFilter,
        boxShadow: visible
          ? "0 0 24px rgba(0, 0, 0, 0.2), 0 1px 1px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.1), 0 0 4px rgba(0, 0, 0, 0.2), 0 16px 68px rgba(0, 0, 0, 0.2), 0 1px 0 rgba(255, 255, 255, 0.05) inset"
          : "none",
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 40,
      }}
      className={cn(
        "relative z-[60] mx-auto flex w-full max-w-7xl flex-row items-center justify-between self-start px-4 py-3 lg:flex text-white",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = memo(({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-gray-300 transition duration-200 hover:text-white lg:flex lg:space-x-2",
        className,
      )}
    >
      {items.map((item, idx) => (
        <a
          onMouseEnter={() => setHovered(idx)}
          onClick={onItemClick}
          className="relative px-4 py-2 text-gray-300 hover:text-white dark:text-gray-300"
          key={`link-${idx}`}
          href={item.link}
        >
          {hovered === idx && (
            <motion.div
              layoutId="hovered"
              className="absolute inset-0 h-full w-full rounded-full bg-neutral-800 dark:bg-neutral-800"
            />
          )}
          <span className="relative z-20">{item.name}</span>
        </a>
      ))}
    </motion.div>
  );
});
NavItems.displayName = 'NavItems';

export const MobileNav = ({ children, className, visible, scrollProgress }: MobileNavProps) => {
  // Create a default motion value for when scrollProgress is not provided
  const defaultScrollProgress = useMotionValue(0);
  const effectiveScrollProgress = scrollProgress || defaultScrollProgress;
  
  // Transform scrollProgress into different properties with more natural breakpoints
  const width = useTransform(
    effectiveScrollProgress, 
    [0, 0.5, 1], 
    ['98%', '94%', '90%']
  );
  
  const borderRadius = useTransform(
    effectiveScrollProgress, 
    [0, 0.5, 1], 
    [8, 12, 16]
  );
  
  const opacity = useTransform(
    effectiveScrollProgress, 
    [0, 1], 
    [0.5, 0.9]
  );
  const backgroundColor = useMotionTemplate`rgba(0, 0, 0, ${opacity})`;
  
  const yOffset = useTransform(
    effectiveScrollProgress, 
    [0, 0.5, 1], 
    [0, 4, 8]
  );
  
  const padding = useTransform(
    effectiveScrollProgress, 
    [0, 1], 
    [12, 16]
  );
  
  const blur = useTransform(
    effectiveScrollProgress, 
    [0, 1], 
    [0, 10]
  );
  const backdropFilter = useMotionTemplate`blur(${blur}px)`;
  
  const scale = useTransform(
    effectiveScrollProgress, 
    [0, 1], 
    [1, 0.98]
  );
  
  return (
    <motion.div
      style={{
        width,
        borderRadius,
        backgroundColor,
        y: yOffset,
        scale,
        paddingLeft: padding,
        paddingRight: padding,
        backdropFilter,
        boxShadow: visible
          ? "0 0 24px rgba(0, 0, 0, 0.2), 0 1px 1px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.1), 0 0 4px rgba(0, 0, 0, 0.2), 0 16px 68px rgba(0, 0, 0, 0.2), 0 1px 0 rgba(255, 255, 255, 0.05) inset"
          : "none",
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 40,
      }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between py-3 text-white lg:hidden",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = memo(({
  children,
  className,
}: MobileNavHeaderProps) => {
  return null;
});
MobileNavHeader.displayName = 'MobileNavHeader';

export const MobileNavMenu = memo(({
  children,
  className,
  isOpen,
  onClose,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "absolute left-0 top-full mt-2 w-full rounded-lg bg-neutral-900 p-4 shadow-xl",
            className
          )}
        >
          <div className="flex flex-col space-y-2">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});
MobileNavMenu.displayName = 'MobileNavMenu';

export const MobileNavToggle = memo(({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <button onClick={onClick} className="lg:hidden">
      {isOpen ? (
        <IconX className="h-6 w-6 text-white" />
      ) : (
        <IconMenu2 className="h-6 w-6 text-white" />
      )}
    </button>
  );
});
MobileNavToggle.displayName = 'MobileNavToggle';

export const NavbarLogo = memo(() => {
  return (
    <a href="/" className="flex items-center space-x-2">
      {/* Replace with your actual logo SVG or Image component */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-8 w-8 text-blue-500"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
      </svg>
      <span className="text-xl font-bold text-white">DataMaster</span>
    </a>
  );
});
NavbarLogo.displayName = 'NavbarLogo';

export const NavbarButton = memo(({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
} & (
  | React.ComponentPropsWithoutRef<"a">
  | React.ComponentPropsWithoutRef<"button">
)) => {
  const baseStyles =
    "px-4 py-2 rounded-md button text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center";

  const variantStyles = {
    primary:
      "bg-blue-600 text-white shadow-[0_0_24px_rgba(0,0,0,0.2),_0_1px_1px_rgba(0,0,0,0.1),_0_0_0_1px_rgba(0,0,0,0.1),_0_0_4px_rgba(0,0,0,0.2)]",
    secondary: "bg-transparent text-white shadow-none",
    dark: "bg-neutral-800 text-white shadow-[0_0_24px_rgba(0,0,0,0.2),_0_1px_1px_rgba(0,0,0,0.1),_0_0_0_1px_rgba(0,0,0,0.1),_0_0_4px_rgba(0,0,0,0.2)]",
    gradient:
      "bg-gradient-to-b from-blue-600 to-blue-800 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)_inset]",
  };

  return (
    <Tag
      href={href || undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  );
});
NavbarButton.displayName = 'NavbarButton';
