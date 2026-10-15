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
    default: 'Super Gas Agencies in Kondapur | SUPERGAS Agency Hyderabad',
    template: '%s | Sri Mahalakshmi Super Gas Agency',
  },
  description:
    'Authorized SUPERGAS Gas Agency in Kondapur, Hyderabad. Fast domestic & commercial cylinder booking, new LPG gas connection, refill delivery & stove repair near you.',
  keywords: [
    'Super Gas Agencies in Kondapur',
    'SUPERGAS Agency in Kondapur, Hyderabad',
    'SUPERGAS Gas Agency Kondapur',
    'SUPERGAS LPG Distributor Kondapur',
    'SUPERGAS Cylinder Booking in Kondapur',
    'SUPERGAS Gas Delivery in Kondapur',
    'SUPERGAS Agency Near Me',
    'Super Gas Agency in Kondapur',
    'Gas Agency in Kondapur',
    'Gas Agency in Kodapur',
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
    title: 'Super Gas Agencies in Kondapur | SUPERGAS Agency Hyderabad',
    description:
      'Authorized SUPERGAS Gas Agency in Kondapur, Hyderabad. Fast domestic & commercial cylinder booking, new LPG gas connection, refill delivery & stove repair near you.',
    url: siteUrl,
    siteName: 'Sri Mahalakshmi Super Gas Agency',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/images/hero_banner.jpg',
        width: 1200,
        height: 630,
        alt: 'Super Gas Agencies in Kondapur - Sri Mahalakshmi SUPERGAS Agency Hyderabad',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Super Gas Agencies in Kondapur | SUPERGAS Agency Hyderabad',
    description:
      'Authorized SUPERGAS Gas Agency in Kondapur, Hyderabad. Fast domestic & commercial cylinder booking, new LPG gas connection, refill delivery & stove repair near you.',
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
