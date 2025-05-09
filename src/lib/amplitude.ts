import * as amplitude from '@amplitude/analytics-react-native';

// Initialize Amplitude with API key
export const initializeAmplitude = () => {
  amplitude.init('6a9e3f7b622ff0db7c10c9f47e3dbd99');
};

// Export the amplitude instance for direct use elsewhere
export { amplitude }; 