import React from 'react';
import type { Metadata } from 'next';
import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { Products } from '@/components/Products';
import { About } from '@/components/About';
import { HowItWorks } from '@/components/HowItWorks';
import { Testimonials } from '@/components/Testimonials';
import { Gallery } from '@/components/Gallery';
import { FAQSection } from '@/components/FAQSection';
import { FastBookingContactMap } from '@/components/FastBookingContactMap';

export const metadata: Metadata = {
  title: 'Super Gas Agency in Manikonda | SUPERGAS Agency Manikonda Hyderabad',
  description:
    'Authorized Super Gas Agency in Manikonda, Hyderabad. Fast domestic & commercial SUPERGAS cylinder booking, new LPG gas connection, refill delivery & gas stove repairs.',
  keywords: [
    'Super Gas Agency in Manikonda',
    'SUPERGAS Agency Manikonda Hyderabad',
    'SUPERGAS Cylinder Booking in Manikonda',
    'SUPERGAS LPG Gas Agency Manikonda',
    'Sri Mahalakshmi Super Gas Agency',
    'Super Gas Agency Manikonda',
    'SUPERGAS Manikonda',
    'LPG cylinder booking Manikonda Hyderabad',
    'domestic gas cylinder Manikonda',
    'commercial LPG cylinder Manikonda',
    'gas stove repair Manikonda',
    'LPG gas agency Manikonda Hyderabad',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Super Gas Agency in Manikonda | SUPERGAS Agency Manikonda Hyderabad',
    description:
      'Authorized Super Gas Agency in Manikonda, Hyderabad. Fast domestic & commercial SUPERGAS cylinder booking, new LPG gas connection, refill delivery & gas stove repairs.',
    url: '/',
    siteName: 'Sri Mahalakshmi Super Gas Agency',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/images/hero_banner.jpg',
        width: 1200,
        height: 630,
        alt: 'Super Gas Agency in Manikonda - Sri Mahalakshmi SUPERGAS Cylinder Booking & Stove Repair',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Super Gas Agency in Manikonda | SUPERGAS Agency Manikonda Hyderabad',
    description:
      'Authorized Super Gas Agency in Manikonda, Hyderabad. Fast domestic & commercial SUPERGAS cylinder booking, new LPG gas connection, refill delivery & gas stove repairs.',
    images: ['/images/hero_banner.jpg'],
  },
};

export default function HomePage() {
  return (
    <main id="main-content">
      <Hero />
      <Services />
      <Products />
      <About />
      <HowItWorks />
      <Testimonials />
      <Gallery />
      <FAQSection />
      <FastBookingContactMap />
    </main>
  );
}

