// Google Analytics 4 Event Tracking Utilities

type GtagEvent = {
  event_category?: string;
  event_label?: string;
  value?: number;
  [key: string]: string | number | undefined;
};

declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config' | 'js',
      targetId: string | Date,
      params?: GtagEvent | Record<string, unknown>
    ) => void;
  }
}

/**
 * Track a custom event in Google Analytics 4
 */
export const trackEvent = (
  eventName: string,
  params?: GtagEvent
): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
};

// Predefined events for consistency
export const GA_EVENTS = {
  CONTACT_CLICK: 'contact_click',
  WHATSAPP_CLICK: 'whatsapp_click',
  SOCIAL_CLICK: 'social_click',
} as const;
