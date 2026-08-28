// Google Analytics 4 & Google Ads Conversion Tracking Utilities

export const GOOGLE_ADS_ID = 'AW-18414116550';
export const GOOGLE_ADS_CONVERSION_LABEL =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL || 'YmEoCNKphukcEMa9xMxE';

type GtagEvent = {
  event_category?: string;
  event_label?: string;
  value?: number;
  currency?: string;
  [key: string]: string | number | undefined;
};

type GtagConversionParams = {
  value?: number;
  currency?: string;
  transaction_id?: string;
  [key: string]: string | number | undefined;
};

export type ConsentState = 'granted' | 'denied';

export type ConsentSettings = {
  ad_storage?: ConsentState;
  analytics_storage?: ConsentState;
  ad_user_data?: ConsentState;
  ad_personalization?: ConsentState;
};

declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config' | 'js' | 'consent',
      targetId: string | Date | 'default' | 'update',
      params?: GtagEvent | Record<string, unknown> | ConsentSettings
    ) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Apply Consent Mode v2 settings (default or update).
 * Must be called before loading GA/Ads scripts for 'default'.
 */
export const setConsent = (
  mode: 'default' | 'update',
  settings: ConsentSettings
): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('consent', mode, settings);
  }
};

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

/**
 * Track a Google Ads conversion.
 * If no label is passed, it uses NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL.
 * Example: trackGoogleAdsConversion('ABC123def456', { value: 1.0, currency: 'EUR' });
 */
export const trackGoogleAdsConversion = (
  conversionLabel?: string,
  params?: GtagConversionParams,
  callback?: () => void
): void => {
  const label = conversionLabel || GOOGLE_ADS_CONVERSION_LABEL;
  if (!label) return;

  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: `${GOOGLE_ADS_ID}/${label}`,
      ...params,
      ...(callback && { event_callback: callback, event_timeout: 2000 }),
    });
  } else if (callback) {
    callback();
  }
};

/**
 * Track a lead generation event in GA4 (recommended event for Google Ads lead campaigns).
 */
export const trackLead = (
  channel: string,
  params?: Omit<GtagEvent, 'event_category' | 'event_label'>
): void => {
  trackEvent(GA_EVENTS.GENERATE_LEAD, {
    event_category: 'lead',
    event_label: channel,
    ...params,
  });
};

/**
 * Track an outbound contact action (WhatsApp, email, vcf download) and then navigate.
 * Uses contact_click (engagement), not generate_lead, so only form submissions count as leads.
 */
export const trackOutboundContact = (
  url: string,
  channel: string
): boolean => {
  if (typeof window === 'undefined') return true;

  const navigate = () => {
    window.location.href = url;
  };

  if (!window.gtag) {
    navigate();
    return false;
  }

  window.gtag('event', GA_EVENTS.CONTACT_CLICK, {
    event_category: 'lead',
    event_label: channel,
    event_callback: navigate,
    event_timeout: 2000,
  });

  return false;
};

// Predefined events for consistency
export const GA_EVENTS = {
  CONTACT_CLICK: 'contact_click',
  WHATSAPP_CLICK: 'whatsapp_click',
  SOCIAL_CLICK: 'social_click',
  GENERATE_LEAD: 'generate_lead',
} as const;
