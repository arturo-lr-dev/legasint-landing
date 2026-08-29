'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import posthog from 'posthog-js';

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY || 'phc_zaqD2RAqgNHVnqodcXifUJgkKuQj9ujynWvgETqyZuZb';
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.posthog.com';

export default function PostHogProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      person_profiles: 'identified_only',
      capture_pageview: false, // manual pageview tracking
      capture_pageleave: true,
      autocapture: true,
      session_recording: {
        maskAllInputs: true,
        maskTextSelector: 'input[type="password"], input[name="email"], input[name="phone"]',
      },
    });

    // Track initial pageview
    posthog.capture('$pageview', { $current_url: window.location.href });
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!pathname) return;

    posthog.capture('$pageview', { $current_url: window.location.href });
  }, [pathname]);

  return <>{children}</>;
}
