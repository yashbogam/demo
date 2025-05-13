"use client";

import { useEffect } from "react";
import { initAmplitude } from "@/lib/amplitude";

export function AmplitudeInitializer({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initAmplitude();
  }, []);

  return <>{children}</>;
} 