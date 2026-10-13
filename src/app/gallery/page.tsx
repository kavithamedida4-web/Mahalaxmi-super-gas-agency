import React from 'react';
import type { Metadata } from 'next';
import { GalleryPageClient } from './GalleryPageClient';
import { BUSINESS_DATA } from '@/config/businessData';

export const metadata: Metadata = {
  title: `Store & Service Gallery | ${BUSINESS_DATA.name}`,
  description: `Browse photographs of our agency desk, certified domestic & commercial LPG gas cylinders, safety regulators, stoves, and repair workbench at Sri Mahalakshmi Super Gas Agency in Gollaprolu.`,
};

export default function GalleryPage() {
  return (
    <main className="gallery-page-root">
      <GalleryPageClient />
    </main>
  );
}
