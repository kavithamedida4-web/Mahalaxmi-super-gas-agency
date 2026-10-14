import React from 'react';
import type { Metadata } from 'next';
import { GalleryPageClient } from './GalleryPageClient';
import { BUSINESS_DATA } from '@/config/businessData';

export const metadata: Metadata = {
  title: 'Store & Service Gallery | Sri Mahalakshmi Super Gas',
  description:
    'Browse photos of agency operations, verified domestic & commercial LPG cylinders, safety regulators, stoves, and workbench at Sri Mahalakshmi Super Gas.',
  alternates: {
    canonical: '/gallery',
  },
  openGraph: {
    title: 'Store & Service Gallery | Sri Mahalakshmi Super Gas',
    description:
      'Browse photos of agency operations, verified domestic & commercial LPG cylinders, safety regulators, stoves, and workbench at Sri Mahalakshmi Super Gas.',
    url: '/gallery',
    type: 'website',
    images: ['/images/agency_counter.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Store & Service Gallery | Sri Mahalakshmi Super Gas',
    description:
      'Browse photos of agency operations, verified domestic & commercial LPG cylinders, safety regulators, stoves, and workbench at Sri Mahalakshmi Super Gas.',
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
