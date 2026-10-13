import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ChevronRight } from 'lucide-react';
import { FastBookingContactMap } from '@/components/FastBookingContactMap';

export const metadata: Metadata = {
  title: `Contact Us & Store Location | Sri Mahalakshmi Super Gas Agency`,
  description: `Contact Sri Mahalakshmi Super Gas Agency in Gollaprolu. Call +91 9652009647 or WhatsApp for domestic LPG cylinder refills, new gas connections, stove servicing, and Google Maps directions.`,
};

export default function ContactPage() {
  return (
    <main className="contact-page-root">
      {/* Breadcrumb Bar */}
      <div className="contact-breadcrumb-bar">
        <div className="container">
          <nav className="breadcrumb-nav" aria-label="Breadcrumb">
            <Link href="/" className="breadcrumb-link">Home</Link>
            <ChevronRight size={14} className="breadcrumb-separator" />
            <span className="breadcrumb-current" aria-current="page">Contact &amp; Location</span>
          </nav>
        </div>
      </div>

      {/* Same Contact Section (Gas Cylinder & Stove Service Booking Form + Interactive Google Map) */}
      <FastBookingContactMap />
    </main>
  );
}
