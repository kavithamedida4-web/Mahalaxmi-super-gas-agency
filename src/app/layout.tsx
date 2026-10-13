import React from 'react';
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';
import { BUSINESS_DATA } from '@/config/businessData';

export const metadata: Metadata = {
  metadataBase: new URL('https://srimahalakshmisupergas.com'),
  title: `${BUSINESS_DATA.name} | Gas Connections, Cylinders & Stove Enquiries`,
  description: `Enquiry portal for ${BUSINESS_DATA.name}. Contact via WhatsApp or phone (+91 96520 09647) for domestic gas connection information, cylinder refills, stoves, safety pipes, and stove repairs.`,
  keywords: [
    'gas agency',
    'supergas',
    'cylinder refill',
    'new gas connection',
    'gas stove repair',
    'LPG accessories',
    'gas regulator',
    'safety hose pipe',
    'mahalaxmi gas agency'
  ],
  authors: [{ name: BUSINESS_DATA.name }],
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: `${BUSINESS_DATA.name} | Gas Connections & Stove Enquiries`,
    description: `Connect directly with ${BUSINESS_DATA.name} for domestic LPG connections, cylinder refills, and kitchen stove maintenance.`,
    type: 'website',
    locale: 'en_IN',
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
        <Header />
        {children}
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
