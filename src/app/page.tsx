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
  title: 'Super Gas Agencies in Kondapur | SUPERGAS Agency Hyderabad',
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
    'LPG cylinder delivery Kondapur',
    'gas stove repair Kondapur',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Super Gas Agencies in Kondapur | SUPERGAS Agency Hyderabad',
    description:
      'Authorized SUPERGAS Gas Agency in Kondapur, Hyderabad. Fast domestic & commercial cylinder booking, new LPG gas connection, refill delivery & stove repair near you.',
    url: '/',
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

