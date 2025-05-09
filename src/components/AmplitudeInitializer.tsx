"use client";

import { useEffect } from "react";
import { initializeAmplitude } from "@/lib/amplitude";

export function AmplitudeInitializer({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initializeAmplitude();
  }, []);

  return <>{children}</>;
} 