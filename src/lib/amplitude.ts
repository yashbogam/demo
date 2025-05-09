import { init, track } from '@amplitude/analytics-browser';

// Initialize Amplitude with API key
export const initializeAmplitude = () => {
  init('6a9e3f7b622ff0db7c10c9f47e3dbd99');
};

// Export tracking function for use elsewhere
export const trackEvent = (eventName: string, eventProperties?: Record<string, any>) => {
  track(eventName, eventProperties);
}; 