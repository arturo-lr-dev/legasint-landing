import { Barlow, Barlow_Condensed, Montserrat } from 'next/font/google';
import { MotionConfig } from 'framer-motion';
import GoogleAnalytics from '@/analytics/google';
import PostHogProvider from '@/analytics/posthog';
import FloatingSocialIcons from '@/components/FloatingSocialIcons';
import CookieConsent from '@/components/CookieConsent';
import Header from '@/components/Header';
import SmoothScroll from '@/components/landing/SmoothScroll';

const montserrat = Montserrat({ subsets: ['latin'], display: 'swap' });
const barlow = Barlow({ subsets: ['latin'], display: 'swap', weight: ['400', '500', '600', '700'], variable: '--font-barlow' });
const barlowCondensed = Barlow_Condensed({ subsets: ['latin'], display: 'swap', weight: ['500', '600', '700'], variable: '--font-barlow-condensed' });

export default function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <body className={`${montserrat.className} ${barlow.variable} ${barlowCondensed.variable} antialiased overflow-x-hidden bg-brand-canvas text-brand-heading`}>
      <MotionConfig reducedMotion="user">
        <SmoothScroll />
        <Header />
        {children}
        <FloatingSocialIcons />
        <GoogleAnalytics />
        <PostHogProvider>
          <CookieConsent />
        </PostHogProvider>
      </MotionConfig>
    </body>
  );
}
