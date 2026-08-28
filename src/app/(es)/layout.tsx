import type { Metadata } from "next";
import "../globals.css";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/seo/JsonLd";
import RootShell from "@/components/RootShell";
import ConsentDefaultScript from "@/analytics/ConsentDefaultScript";

export const metadata: Metadata = {
  metadataBase: new URL('https://legasint.com'),
  title: {
    default: 'Legasint - Desarrollo de software a medida y socio tecnológico',
    template: '%s | Legasint',
  },
  description: 'Legasint es tu socio tecnológico: desarrollo de software a medida, automatización e inteligencia artificial para empresas en España.',
  keywords: [
    'desarrollo de software a medida',
    'socio tecnológico',
    'automatización de procesos',
    'inteligencia artificial',
    'consultoría tecnológica',
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
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: '/manifest.json',

  // Open Graph / Facebook
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    alternateLocale: ['en_US'],
    url: 'https://legasint.com',
    siteName: 'Legasint',
    title: 'Legasint - Desarrollo de software a medida y socio tecnológico',
    description: 'Desarrollo de software a medida, automatización e inteligencia artificial para empresas en España.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Legasint - Tu visión, nuestra tecnología',
      },
    ],
  },

  // Twitter
  twitter: {
    card: 'summary_large_image',
    site: '@legasint',
    creator: '@legasint',
    title: 'Legasint - Desarrollo de software a medida y socio tecnológico',
    description: 'Desarrollo de software a medida, automatización e inteligencia artificial para empresas en España.',
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

export default function RootLayoutEs({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <ConsentDefaultScript />
        <link rel="alternate" type="application/rss+xml" title="Legasint Blog" href="/feed.xml" />
        <OrganizationJsonLd />
        <WebSiteJsonLd />
      </head>
      <RootShell>{children}</RootShell>
    </html>
  );
}
