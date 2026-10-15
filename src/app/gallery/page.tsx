import React from 'react';
import type { Metadata } from 'next';
import { GalleryPageClient } from './GalleryPageClient';
import { BUSINESS_DATA } from '@/config/businessData';

export const metadata: Metadata = {
  title: 'Super Gas Agency Operations & Service Gallery | Manikonda',
  description:
    'Browse photos of SUPERGAS agency operations, verified domestic & commercial LPG cylinders, safety regulators, stoves, and workbench in Manikonda, Hyderabad.',
  keywords: [
    'Super Gas Agency Gallery',
    'Super Gas Agency in Manikonda',
    'SUPERGAS Agency Manikonda Hyderabad',
    'SUPERGAS Cylinder Booking in Manikonda',
    'LPG cylinders photos Hyderabad',
  ],
  alternates: {
    canonical: '/gallery',
  },
  openGraph: {
    title: 'Super Gas Agency Operations & Service Gallery | Manikonda',
    description:
      'Browse photos of SUPERGAS agency operations, verified domestic & commercial LPG cylinders, safety regulators, stoves, and workbench in Manikonda, Hyderabad.',
    url: '/gallery',
    type: 'website',
    images: ['/images/agency_counter.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Super Gas Agency Operations & Service Gallery | Manikonda',
    description:
      'Browse photos of SUPERGAS agency operations, verified domestic & commercial LPG cylinders, safety regulators, stoves, and workbench in Manikonda, Hyderabad.',
    images: ['/images/agency_counter.jpg'],
  },
};

export default function GalleryPage() {
  return (
    <main className="gallery-page-root">
      <h1 className="sr-only">Sri Mahalakshmi Super Gas Agency Store &amp; Service Gallery</h1>
      <GalleryPageClient />
    </main>
  );
}
