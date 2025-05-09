"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface TypingAnimationProps {
  words: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenWords?: number;
}

export const TypingAnimation: React.FC<TypingAnimationProps> = ({
  words,
  className,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetweenWords = 1500,
}) => {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const currentWord = words[wordIndex];
    
    const handleTyping = () => {
      if (isDeleting) {
        setText(currentWord.substring(0, text.length - 1));
      } else {
        setText(currentWord.substring(0, text.length + 1));
      }
    };

    const determineNextAction = () => {
      if (!isDeleting && text === currentWord) {
        // Finished typing current word, wait then start deleting
        setTimeout(() => setIsDeleting(true), delayBetweenWords);
        return;
      }
      
      if (isDeleting && text === "") {
        // Finished deleting, move to next word
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    };

    const timer = setTimeout(() => {
      handleTyping();
      determineNextAction();
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, delayBetweenWords]);

  return (
    <span className={cn("text-blue-500", className)}>
      {text}
      <span className="animate-blink">|</span>
    </span>
  );
}; 