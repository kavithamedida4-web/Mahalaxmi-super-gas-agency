import React from 'react';
import type { Metadata } from 'next';
import { GalleryPageClient } from './GalleryPageClient';
import { BUSINESS_DATA } from '@/config/businessData';

export const metadata: Metadata = {
  title: 'Super Gas Agency Operations & Service Gallery | Kondapur',
  description:
    'Browse photos of SUPERGAS agency operations, verified domestic & commercial LPG cylinders, safety regulators, stoves, and workbench in Kondapur, Hyderabad.',
  keywords: [
    'Super Gas Agencies in Kondapur',
    'SUPERGAS Agency in Kondapur, Hyderabad',
    'SUPERGAS Gas Agency Kondapur',
    'Super Gas Agency Gallery',
    'Gas Agency in Kondapur',
    'Gas Agency in Kodapur',
    'Super Gas Agency in Kondapur',
    'LPG cylinders photos Hyderabad',
  ],
  alternates: {
    canonical: '/gallery',
  },
  openGraph: {
    title: 'Super Gas Agency Operations & Service Gallery | Kondapur',
    description:
      'Browse photos of SUPERGAS agency operations, verified domestic & commercial LPG cylinders, safety regulators, stoves, and workbench in Kondapur, Hyderabad.',
    url: '/gallery',
    type: 'website',
    images: ['/images/agency_counter.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Super Gas Agency Operations & Service Gallery | Kondapur',
    description:
      'Browse photos of SUPERGAS agency operations, verified domestic & commercial LPG cylinders, safety regulators, stoves, and workbench in Kondapur, Hyderabad.',
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
