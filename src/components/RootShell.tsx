import { Montserrat } from 'next/font/google';
import GoogleAnalytics from '@/analytics/google';
import PostHogProvider from '@/analytics/posthog';
import FloatingSocialIcons from '@/components/FloatingSocialIcons';
import CookieConsent from '@/components/CookieConsent';
import Header from '@/components/Header';

const montserrat = Montserrat({ subsets: ['latin'] });

/**
 * Shared page shell used by both root layouts ((es) and (en)):
 * font, header, floating social icons, analytics and cookie consent.
 */
export default function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <body className={`${montserrat.className} antialiased overflow-x-hidden`}>
      <Header />
      {children}
      <FloatingSocialIcons />
      <GoogleAnalytics />
      <PostHogProvider>
        <CookieConsent />
      </PostHogProvider>
    </body>
  );
}
