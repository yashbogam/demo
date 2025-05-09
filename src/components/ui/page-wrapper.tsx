"use client";

import React from "react";
import { Header } from "@/components/ui/header";
import { ScrollBlur } from "@/components/ui/scroll-blur";

interface PageWrapperProps {
  children: React.ReactNode;
}

export const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  return (
    <>
      <Header />
      <ScrollBlur>
        {children}
      </ScrollBlur>
    </>
  );
}; 