import type { Metadata } from "next";
import "../globals.css";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/seo/JsonLd";
import RootShell from "@/components/RootShell";

export const metadata: Metadata = {
  metadataBase: new URL('https://legasint.com'),
  title: {
    default: 'Legasint - Custom Software Development & Tech Partner',
    template: '%s | Legasint',
  },
  description: 'Legasint is your technology partner: custom software development, automation and AI for businesses in Spain and beyond.',
  keywords: [
    'custom software development',
    'tech partner',
    'process automation',
    'artificial intelligence',
    'technology consulting',
  ],
  authors: [{ name: 'Legasint', url: 'https://legasint.com' }],
  creator: 'Legasint',
  publisher: 'Legasint',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon.ico?v=2', sizes: 'any' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: '/manifest.json',

  // Open Graph / Facebook
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['es_ES'],
    url: 'https://legasint.com/en',
    siteName: 'Legasint',
    title: 'Legasint - Custom Software Development & Tech Partner',
    description: 'Custom software development, automation and AI for businesses.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Legasint - Your Vision, Our Technology',
      },
    ],
  },

  // Twitter
  twitter: {
    card: 'summary_large_image',
    site: '@legasint',
    creator: '@legasint',
    title: 'Legasint - Custom Software Development & Tech Partner',
    description: 'Custom software development, automation and AI for businesses.',
    images: ['/og-image.png'],
  },

  // Google Search Console verification (set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION)
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && {
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
  }),

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayoutEn({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="alternate" type="application/rss+xml" title="Legasint Blog" href="/feed.xml" />
        <OrganizationJsonLd />
        <WebSiteJsonLd />
      </head>
      <RootShell>{children}</RootShell>
    </html>
  );
}
