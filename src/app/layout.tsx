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
  title: 'Legasint - Innovation Made Seamless',
  description: 'Transform your business with cutting-edge technology solutions. Legasint delivers seamless innovation for the modern enterprise.',
  keywords: ['technology', 'innovation', 'digital solutions', 'IT services', 'software development'],
  authors: [{ name: 'Legasint' }],
  creator: 'Legasint',
  publisher: 'Legasint',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico?v=2'
  },
  manifest: '/manifest.json',

  alternates: {
    canonical: 'https://legasint.com',
    languages: {
      'es': 'https://legasint.com',
      'en': 'https://legasint.com',
      'x-default': 'https://legasint.com',
    },
  },

  // Open Graph / Facebook
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['es_ES'],
    url: 'https://legasint.com',
    siteName: 'LegaSint',
    title: 'LegaSint - Innovation Made Seamless',
    description: 'Transform your business with cutting-edge technology solutions. LegaSint delivers seamless innovation for the modern enterprise.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'LegaSint - Innovation Made Seamless',
      },
    ],
  },

  // Twitter
  twitter: {
    card: 'summary_large_image',
    site: '@legasint',
    creator: '@legasint',
    title: 'LegaSint - Innovation Made Seamless',
    description: 'Transform your business with cutting-edge technology solutions. LegaSint delivers seamless innovation for the modern enterprise.',
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
