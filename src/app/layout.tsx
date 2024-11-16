import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import "./globals.css";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://legasint.com'), // Cambia esto a tu dominio
  title: 'LegaSint - Innovation Made Seamless',
  description: 'Transform your business with cutting-edge technology solutions. LegaSint delivers seamless innovation for the modern enterprise.',
  keywords: ['technology', 'innovation', 'digital solutions', 'IT services', 'software development'],
  authors: [{ name: 'LegaSint' }],
  creator: 'LegaSint',
  publisher: 'LegaSint',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/apple-touch-icon-precomposed.png',
    },
  },
  manifest: '/manifest.json',
  
  // Open Graph / Facebook
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://legasint.com',
    siteName: 'LegaSint',
    title: 'LegaSint - Innovation Made Seamless',
    description: 'Transform your business with cutting-edge technology solutions. LegaSint delivers seamless innovation for the modern enterprise.',
    images: [
      {
        url: '/og-image.png', // Imagen de 1200x630px
        width: 1200,
        height: 630,
        alt: 'LegaSint - Innovation Made Seamless',
      },
    ],
  },
  
  // Twitter
  twitter: {
    card: 'summary_large_image',
    site: '@legasint', // Tu handle de Twitter
    creator: '@legasint',
    title: 'LegaSint - Innovation Made Seamless',
    description: 'Transform your business with cutting-edge technology solutions. LegaSint delivers seamless innovation for the modern enterprise.',
    images: ['/og-image.png'], // Imagen de 1200x600px
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
    <html lang="en">

      {/* Canonical URL */}
      <link rel="canonical" href="https://legasint.com" />
        
      {/* PWA tags */}
      <meta name="application-name" content="LegaSint" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="LegaSint" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="msapplication-TileColor" content="#2B5797" />
      <meta name="theme-color" content="#1E40AF" />
      
      {/* Color del navegador en móviles */}
      <meta name="theme-color" content="#1E40AF" />
      
      {/* Prevención de cacheo telefónico */}
      <meta name="format-detection" content="telephone=no" />

      <body
        className={`${inter.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
