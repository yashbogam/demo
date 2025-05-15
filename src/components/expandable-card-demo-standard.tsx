"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";

export default function ExpandableCardDemo() {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null
  );
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0  grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px]  h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <img
                  width={200}
                  height={200}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-bold text-neutral-700 dark:text-neutral-200"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400"
                    >
                      {active.description}
                    </motion.p>
                  </div>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="max-w-5xl mx-auto w-full flex flex-row flex-wrap gap-4 justify-center">
        {cards.map((card, index) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={`card-${card.title}-${id}`}
            className="p-4 flex flex-col w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)] justify-between hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer group"
          >
            <div className="flex gap-3 flex-col">
              <motion.div layoutId={`image-${card.title}-${id}`}>
                <img
                  width={100}
                  height={100}
                  src={card.src}
                  alt={card.title}
                  className="h-36 w-full rounded-lg object-cover object-center"
                />
              </motion.div>
              <div className="flex flex-col">
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className="font-medium text-white text-left text-lg group-hover:text-black"
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.description}-${id}`}
                  className="text-neutral-600 dark:text-neutral-400 text-left text-sm mt-1"
                >
                  {card.description}
                </motion.p>
              </div>
            </div>
            <motion.button
              layoutId={`button-${card.title}-${id}`}
              className="px-4 py-2 text-sm rounded-full font-bold bg-gray-100 text-black group-hover:bg-black group-hover:text-white hover:bg-green-500 hover:text-white hover:cursor-grab mt-4 self-start"
              onClick={(e) => {
                e.stopPropagation();
                setActive(card);
              }}
            >
              {card.ctaText}
            </motion.button>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const cards = [
  {
    title: "Superior Data Quality",
    description: "Expert-curated, clinically accurate, and structured medical data optimized for model training.",
    src: "/optimized-images/data-quality.webp",
    ctaText: "Click-here",
    ctaLink: "#data-quality",
    content: () => {
      return (
        <div>
          <p>• Meticulously curated by medical professionals</p>
          <p>• Clean, structured format ready for model training</p>
          <p>• Clinically accurate content reflecting real-world scenarios</p>
          <p>• Evidence-based responses aligned with medical standards</p>
        </div>
      );
    },
  },
  {
    title: "Comprehensive Coverage",
    description: "Extensive dataset covering all medical specialties, conditions, and question types from basic to complex.",
    src: "/optimized-images/coverage.webp",
    ctaText: "Click-here",
    ctaLink: "#coverage",
    content: () => {
      return (
        <div>
          <p>• Spans all major medical specialties and disciplines</p>
          <p>• Includes basic science and clinical applications</p>
          <p>• Diverse question types and complexity levels</p>
          <p>• Broad coverage of common and rare conditions</p>
        </div>
      );
    },
  },
  {
    title: "Advanced AI Training",
    description: "Tailored for training and fine-tuning AI models in clinical reasoning, Q&A, and medical knowledge retrieval.",
    src: "/optimized-images/ai-training.webp",
    ctaText: "Click-here",
    ctaLink: "#ai-training",
    content: () => {
      return (
        <div>
          <p>• Perfect for fine-tuning medical language models</p>
          <p>• Supports medical reasoning and decision support</p>
          <p>• Enables development of clinical Q&A applications</p>
          <p>• Facilitates training for medical knowledge retrieval</p>
        </div>
      );
    },
  },
  {
    title: "Immediate Integration",
    description: "Plug-and-play JSON format with minimal setup, ready for seamless use in major ML frameworks.",
    src: "/optimized-images/integration.webp",
    ctaText: "Click-here",
    ctaLink: "#integration",
    content: () => {
      return (
        <div>
          <p>• Ready-to-use JSON format with consistent structure</p>
          <p>• Compatible with popular ML frameworks</p>
          <p>• Sample code provided for quick implementation</p>
          <p>• Minimal preprocessing required</p>
        </div>
      );
    },
  }
];
