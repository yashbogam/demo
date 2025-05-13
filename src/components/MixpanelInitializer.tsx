'use client';

import { useEffect } from 'react';
import { initMixpanel } from '@/lib/mixpanel';

export default function MixpanelInitializer() {
  useEffect(() => {
    initMixpanel();
  }, []);
  
  return null;
} 