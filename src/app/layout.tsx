import type { Metadata } from "next";
import { Montserrat } from 'next/font/google'
import "./globals.css";
import GoogleAnalytics from "@/analitics/google";

const inter = Montserrat({ subsets: ['latin'] })

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
    icon: '/favicon.ico?v=2'
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
        width: 512,
        height: 512,
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
      <body
        className={`${inter.className} antialiased`}
      >
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
