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
  title: 'Gas Agency in Kondapur | SUPERGAS Agency Kondapur Hyderabad',
  description:
    'Authorized Super Gas Agency in Kondapur, Hyderabad. Fast domestic & commercial SUPERGAS cylinder booking, new LPG gas connection, refill delivery & gas stove repairs.',
  keywords: [
    'Gas Agency in Kondapur',
    'Gas Agency in Kodapur',
    'Super Gas Agency in Kondapur',
    'SUPERGAS Agency Kondapur Hyderabad',
    'SUPERGAS Cylinder Booking in Kondapur',
    'SUPERGAS LPG Gas Agency Kondapur',
    'LPG Gas Agency in Kondapur',
    'Sri Mahalakshmi Super Gas Agency',
    'Super Gas Agency Kondapur',
    'gas cylinder booking Kondapur',
    'domestic gas cylinder Kondapur',
    'commercial LPG cylinder Kondapur',
    'gas stove repair Kondapur',
    'LPG gas agency Kondapur Hyderabad',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Gas Agency in Kondapur | SUPERGAS Agency Kondapur Hyderabad',
    description:
      'Authorized Super Gas Agency in Kondapur, Hyderabad. Fast domestic & commercial SUPERGAS cylinder booking, new LPG gas connection, refill delivery & gas stove repairs.',
    url: '/',
    siteName: 'Sri Mahalakshmi Super Gas Agency',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/images/hero_banner.jpg',
        width: 1200,
        height: 630,
        alt: 'Gas Agency in Kondapur - Sri Mahalakshmi SUPERGAS Cylinder Booking & Stove Repair',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gas Agency in Kondapur | SUPERGAS Agency Kondapur Hyderabad',
    description:
      'Authorized Super Gas Agency in Kondapur, Hyderabad. Fast domestic & commercial SUPERGAS cylinder booking, new LPG gas connection, refill delivery & gas stove repairs.',
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

