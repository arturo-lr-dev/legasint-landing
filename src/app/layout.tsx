import type { Metadata } from "next";
import { Montserrat } from 'next/font/google'
import "./globals.css";
import GoogleAnalytics from "@/analytics/google";
import FloatingSocialIcons from "@/components/FloatingSocialIcons";
import Header from "@/components/Header";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/seo/JsonLd";

const inter = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://legasint.com'),
  title: {
    default: 'Legasint - Desarrollo de software a medida y socio tecnológico',
    template: '%s | Legasint',
  },
  description: 'Legasint es tu socio tecnológico: desarrollo de software a medida, automatización, IA y legal tech para despachos y empresas en España. Custom software development and tech partnership.',
  keywords: [
    'desarrollo de software a medida',
    'socio tecnológico',
    'legal tech',
    'automatización de procesos',
    'inteligencia artificial',
    'consultoría tecnológica',
    'custom software development',
    'tech partner Spain',
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

  alternates: {
    canonical: 'https://legasint.com',
  },

  // Open Graph / Facebook
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    alternateLocale: ['en_US'],
    url: 'https://legasint.com',
    siteName: 'Legasint',
    title: 'Legasint - Desarrollo de software a medida y socio tecnológico',
    description: 'Desarrollo de software a medida, automatización, IA y legal tech para despachos y empresas en España.',
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
    title: 'Legasint - Desarrollo de software a medida y socio tecnológico',
    description: 'Desarrollo de software a medida, automatización, IA y legal tech para despachos y empresas en España.',
    images: ['/og-image.png'],
  },

  // Google Search Console verification (replace with your actual code)
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
  },

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="alternate" type="application/rss+xml" title="Legasint Blog" href="/feed.xml" />
        <OrganizationJsonLd />
        <WebSiteJsonLd />
      </head>
      <body
        className={`${inter.className} antialiased overflow-x-hidden`}
      >
        <Header />
        {children}
        <FloatingSocialIcons />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
