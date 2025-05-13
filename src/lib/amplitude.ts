import * as amplitude from '@amplitude/analytics-browser';

const AMPLITUDE_API_KEY = '6a9e3f7b622ff0db7c10c9f47e3dbd99'; // Your Amplitude API key

export const initAmplitude = () => {
  if (typeof window !== 'undefined' && !(window as any).amplitudeInitialized) {
    amplitude.init(AMPLITUDE_API_KEY, {
      defaultTracking: true,
    });
    (window as any).amplitudeInitialized = true;
  }
};

export default amplitude; 