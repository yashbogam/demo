//Import Mixpanel SDK
import mixpanel from "mixpanel-browser";

const MIXPANEL_TOKEN = "eba35478defa4e4dd6a3f99918ccb291";

export const initMixpanel = () => {
  if (typeof window !== "undefined" && !(window as any).mixpanelInitialized) {
    mixpanel.init(MIXPANEL_TOKEN, {
      debug: true,
      track_pageview: true,
      persistence: "localStorage",
    });
    (window as any).mixpanelInitialized = true;
  }
};

export default mixpanel;