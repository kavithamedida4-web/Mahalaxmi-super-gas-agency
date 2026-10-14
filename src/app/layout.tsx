import React from 'react';
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';
import { BUSINESS_DATA } from '@/config/businessData';

import { StructuredData } from '@/components/StructuredData';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mahalaxmi-super-gas-agency.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Sri Mahalakshmi Super Gas Agency | LPG Cylinder Booking',
  description:
    'Sri Mahalakshmi Super Gas Agency: Fast domestic & commercial LPG cylinder delivery, new gas connections, and stove repairs within 5 km. Contact us.',
  keywords: [
    'Sri Mahalakshmi Super Gas Agency',
    'Mahalakshmi Super Gas Agency',
    'LPG gas agency',
    'Gas cylinder booking',
    'Domestic LPG cylinder',
    'Commercial LPG cylinder',
    'supergas agency',
    'gas stove repair',
    'cylinder refill',
    'new gas connection',
    'Gollaprolu gas agency',
  ],
  authors: [{ name: BUSINESS_DATA.name }],
  alternates: {
    canonical: '/',
  },
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
  openGraph: {
    title: 'Sri Mahalakshmi Super Gas Agency | LPG Cylinder Booking',
    description:
      'Sri Mahalakshmi Super Gas Agency: Fast domestic & commercial LPG cylinder delivery, new gas connections, and stove repairs within 5 km. Contact us.',
    url: siteUrl,
    siteName: 'Sri Mahalakshmi Super Gas Agency',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/images/hero_banner.jpg',
        width: 1200,
        height: 630,
        alt: 'Sri Mahalakshmi Super Gas Agency - Gas Cylinders & Stove Servicing',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sri Mahalakshmi Super Gas Agency | LPG Cylinder Booking',
    description:
      'Sri Mahalakshmi Super Gas Agency: Fast domestic & commercial LPG cylinder delivery, new gas connections, and stove repairs within 5 km. Contact us.',
    images: ['/images/hero_banner.jpg'],
  },
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <StructuredData />
        <Header />
        {children}
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
