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
  title: {
    default: 'Gas Agency in Kondapur | SUPERGAS Agency Kondapur Hyderabad',
    template: '%s | Sri Mahalakshmi Super Gas Agency',
  },
  description:
    'Authorized Super Gas Agency in Kondapur, Hyderabad. Fast domestic & commercial SUPERGAS cylinder booking, new LPG gas connection, refill delivery & stove repairs.',
  keywords: [
    'Gas Agency in Kondapur',
    'Gas Agency in Kodapur',
    'Super Gas Agency in Kondapur',
    'SUPERGAS Agency Kondapur Hyderabad',
    'SUPERGAS Cylinder Booking in Kondapur',
    'SUPERGAS LPG Gas Agency Kondapur',
    'LPG Gas Agency in Kondapur',
    'Sri Mahalakshmi Super Gas Agency',
    'Mahalakshmi Super Gas Agency',
    'LPG cylinder booking Kondapur',
    'Domestic LPG cylinder Kondapur',
    'Commercial LPG cylinder Kondapur',
    'supergas agency',
    'gas stove repair Kondapur',
    'cylinder refill Kondapur',
    'new gas connection Kondapur',
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
    title: 'Gas Agency in Kondapur | SUPERGAS Agency Kondapur Hyderabad',
    description:
      'Authorized Super Gas Agency in Kondapur, Hyderabad. Fast domestic & commercial SUPERGAS cylinder booking, new LPG gas connection, refill delivery & stove repairs.',
    url: siteUrl,
    siteName: 'Sri Mahalakshmi Super Gas Agency',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/images/hero_banner.jpg',
        width: 1200,
        height: 630,
        alt: 'Gas Agency in Kondapur - Sri Mahalakshmi SUPERGAS Agency Hyderabad',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gas Agency in Kondapur | SUPERGAS Agency Kondapur Hyderabad',
    description:
      'Authorized Super Gas Agency in Kondapur, Hyderabad. Fast domestic & commercial SUPERGAS cylinder booking, new LPG gas connection, refill delivery & stove repairs.',
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
