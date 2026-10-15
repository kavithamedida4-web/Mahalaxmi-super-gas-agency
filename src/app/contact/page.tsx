import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ChevronRight } from 'lucide-react';
import { FastBookingContactMap } from '@/components/FastBookingContactMap';

export const metadata: Metadata = {
  title: 'Contact Super Gas Agency Kondapur | Gas Agency Hyderabad',
  description:
    'Contact Sri Mahalakshmi Super Gas Agency in Kondapur, Hyderabad. Call +91 9652009647 or WhatsApp for prompt SUPERGAS cylinder booking, refills, and stove repairs.',
  keywords: [
    'Contact Gas Agency in Kondapur',
    'Gas Agency in Kondapur',
    'Gas Agency in Kodapur',
    'Super Gas Agency in Kondapur',
    'SUPERGAS Agency Kondapur Hyderabad',
    'SUPERGAS Cylinder Booking in Kondapur',
    'Sri Mahalakshmi Super Gas Agency phone number',
  ],
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Super Gas Agency Kondapur | Gas Agency Hyderabad',
    description:
      'Contact Sri Mahalakshmi Super Gas Agency in Kondapur, Hyderabad. Call +91 9652009647 or WhatsApp for prompt SUPERGAS cylinder booking, refills, and stove repairs.',
    url: '/contact',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Super Gas Agency Kondapur | Gas Agency Hyderabad',
    description:
      'Contact Sri Mahalakshmi Super Gas Agency in Kondapur, Hyderabad. Call +91 9652009647 or WhatsApp for prompt SUPERGAS cylinder booking, refills, and stove repairs.',
  },
};

export default function ContactPage() {
  return (
    <main className="contact-page-root">
      <h1 className="sr-only">Contact Sri Mahalakshmi Super Gas Agency</h1>
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
