import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { FileText, ArrowLeft, Phone, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { BUSINESS_DATA } from '@/config/businessData';

export const metadata: Metadata = {
  title: 'Terms of Service & Care | Sri Mahalakshmi Super Gas',
  description:
    'Review the operational terms and service guidelines for domestic LPG cylinders, refill delivery, and kitchen stove repairs at Sri Mahalakshmi Super Gas.',
  alternates: {
    canonical: '/terms',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Terms of Service & Care | Sri Mahalakshmi Super Gas',
    description:
      'Review the operational terms and service guidelines for domestic LPG cylinders, refill delivery, and kitchen stove repairs at Sri Mahalakshmi Super Gas.',
    url: '/terms',
    type: 'website',
  },
};

export default function TermsPage() {
  return (
    <main className="privacy-page-root">
      <div className="container privacy-container">
        
        <div className="back-link-wrapper">
          <Link href="/" className="back-link">
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </Link>
        </div>

        <header className="privacy-header">
          <div className="privacy-badge">
            <FileText size={16} />
            <span>Service Conditions</span>
          </div>
          <h1 className="privacy-title">Terms of Service</h1>
          <p className="privacy-subtitle">
            Operational guidelines and customer standards for <strong>{BUSINESS_DATA.name}</strong>.
          </p>
        </header>

        <div className="privacy-content-card">
          
          <section className="policy-section">
            <div className="policy-section-header">
              <ShieldCheck size={20} className="section-icon" />
              <h2>1. Domestic &amp; Commercial LPG Supplies</h2>
            </div>
            <p>
              All gas cylinders provided by {BUSINESS_DATA.name} adhere to statutory safety norms, featuring authentic tamper-evident holographic security seals and verified gross tare weight. Customers are advised to check the seal integrity and weight upon delivery before accepting handoff.
            </p>
          </section>

          <section className="policy-section">
            <div className="policy-section-header">
              <CheckCircle2 size={20} className="section-icon" />
              <h2>2. Refill Booking &amp; Delivery Radius</h2>
            </div>
            <p>
              Doorstep refill deliveries are serviced within our designated 5 km coverage radius across Gollaprolu. Delivery slots operate daily between 7:00 AM and 10:00 PM. Booking enquiries submitted via WhatsApp or phone call will be scheduled based on active stock dispatch availability.
            </p>
          </section>

          <section className="policy-section">
            <div className="policy-section-header">
              <FileText size={20} className="section-icon" />
              <h2>3. Gas Stove Repair &amp; Service Charges</h2>
            </div>
            <p>
              Our skilled doorstep technician visits entail a standard inspection charge of ₹200. Any required genuine replacement parts (burners, brass valves, safety hose pipes, click-on regulators) are transparently quoted and billed after customer approval.
            </p>
          </section>

          <section className="policy-section">
            <div className="policy-section-header">
              <Phone size={20} className="section-icon" />
              <h2>4. Inquiries &amp; Customer Support</h2>
            </div>
            <div className="contact-summary-box">
              <p><strong>Agency:</strong> {BUSINESS_DATA.name}</p>
              <p><strong>Direct Helpline:</strong> <a href={BUSINESS_DATA.primaryPhoneTel}>{BUSINESS_DATA.primaryPhone}</a></p>
              <p><strong>WhatsApp Support:</strong> +91 96520 09647</p>
              <p><strong>Google Maps Location:</strong> <a href={BUSINESS_DATA.mapsShareUrl} target="_blank" rel="noopener noreferrer">Gollaprolu Location Map</a></p>
            </div>
          </section>

        </div>

      </div>
    </main>
  );
}
