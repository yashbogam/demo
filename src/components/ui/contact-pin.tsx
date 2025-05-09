"use client";

import { PinContainer } from "./3d-pin";

export function ContactPin() {
  return (
    <div className="fixed bottom-8 right-8 z-50">
      <PinContainer
        title="Contact Us"
        containerClassName="w-48 h-48"
        href="/contact"
      >
        <div className="flex flex-col items-center justify-center p-4">
          <h3 className="text-xl font-bold text-white mb-2">Need Help?</h3>
          <p className="text-center text-sm text-white/80">
            Get in touch with our support team
          </p>
        </div>
      </PinContainer>
    </div>
  );
} 