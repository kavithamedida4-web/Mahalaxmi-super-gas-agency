import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import {
  ChevronRight,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { HowItWorks } from '@/components/HowItWorks';

export const metadata: Metadata = {
  title: 'About Super Gas Agency | Kondapur Hyderabad',
  description:
    'Learn about Sri Mahalakshmi Super Gas Agency serving Kondapur & Hyderabad. Authorized SUPERGAS LPG distributor for verified tare weight LPG cylinders & stove servicing.',
  keywords: [
    'About Super Gas Agency',
    'Super Gas Agencies in Kondapur',
    'SUPERGAS Agency in Kondapur, Hyderabad',
    'SUPERGAS LPG Distributor Kondapur',
    'SUPERGAS Gas Agency Kondapur',
    'Sri Mahalakshmi Super Gas Agency',
    'LPG cylinder agency Hyderabad',
  ],
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Super Gas Agency | Kondapur Hyderabad',
    description:
      'Learn about Sri Mahalakshmi Super Gas Agency serving Kondapur & Hyderabad. Authorized SUPERGAS LPG distributor for verified tare weight LPG cylinders & stove servicing.',
    url: '/about',
    type: 'website',
    images: ['/images/about_indian_delivery_clean.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Super Gas Agency | Kondapur Hyderabad',
    description:
      'Learn about Sri Mahalakshmi Super Gas Agency serving Kondapur & Hyderabad. Authorized SUPERGAS LPG distributor for verified tare weight LPG cylinders & stove servicing.',
    images: ['/images/about_indian_delivery_clean.jpg'],
  },
};

export default function AboutPage() {
  return (
    <main className="about-page-root">
      
      {/* 1. Top Panoramic Hero Banner with Dark Tint & Centered Content */}
      <section className="about-panoramic-hero">
        <div className="about-panoramic-overlay" />
        <div className="container about-panoramic-content">
          <h1 className="about-panoramic-title">About Us</h1>
          <nav className="about-panoramic-breadcrumbs" aria-label="Breadcrumb">
            <Link href="/" className="pano-breadcrumb-link">Home</Link>
            <ChevronRight size={14} className="pano-breadcrumb-sep" />
            <span className="pano-breadcrumb-current" aria-current="page">About Us</span>
          </nav>
        </div>
      </section>

      {/* 2. Main Reference Showcase Section */}
      <section className="about-showcase-section">
        <div className="container">
          <div className="about-showcase-grid">

            {/* Left Column: 2 Rounded Photos Collage with Floating Red Badge */}
            <div className="about-showcase-media-col">
              <div className="about-collage-stage">
                
                {/* Top Photo: Delivery specialist delivering cylinder */}
                <div className="about-collage-card-top">
                  <Image
                    src="/images/about_indian_delivery_clean.jpg"
                    alt="Sri Mahalakshmi Super Gas Agency delivery specialist delivering cylinder"
                    width={480}
                    height={400}
                    className="about-collage-img-top"
                    priority
                  />
                </div>

                {/* Floating Brand Badge (Top-Right of Card 1) */}
                <div className="about-collage-badge">
                  <span className="about-badge-number">25+</span>
                  <span className="about-badge-label">
                    YEARS OF<br />LOCAL TRUST
                  </span>
                </div>

                {/* Bottom Overlapping Photo: Stove maintenance specialist with thick white border */}
                <div className="about-collage-card-bottom">
                  <Image
                    src="/images/about_indian_service.jpg"
                    alt="Certified gas technician performing kitchen stove maintenance"
                    width={340}
                    height={290}
                    className="about-collage-img-bottom"
                  />
                </div>

              </div>
            </div>

            {/* Right Column: Editorial Copy, 2-Col Checklist, Pill CTA */}
            <div className="about-showcase-info-col">
              <div className="boldman-eyebrow">
                <span className="boldman-accent-bar" aria-hidden="true" />
                <span className="boldman-eyebrow-text">COMPANY ABOUT</span>
              </div>

              <h2 className="about-editorial-headline">
                One of the Most Trusted Partners for{' '}
                <span className="about-headline-highlight">Safe Cooking Gas &amp; Kitchen Care</span>
              </h2>

              <p className="about-editorial-desc">
                Sri Mahalakshmi Super Gas Agency is an authorized Supergas distributor dedicated to Gollaprolu and surrounding routes. We provide households and commercial kitchens with 100% verified tare weight LPG cylinders, tamper-evident seals, fast 5 km doorstep delivery, and transparent ₹200 stove maintenance.
              </p>

              <div className="about-special-services-wrap">
                <h3 className="about-services-subtitle">Agency Special Services:</h3>
                
                <div className="about-services-checklist-grid">
                  <div className="about-check-item">
                    <CheckCircle2 size={18} className="about-check-icon" />
                    <span>Emergency Solutions Anytime</span>
                  </div>
                  <div className="about-check-item">
                    <CheckCircle2 size={18} className="about-check-icon" />
                    <span>100% Verified Cylinder Weight</span>
                  </div>
                  <div className="about-check-item">
                    <CheckCircle2 size={18} className="about-check-icon" />
                    <span>Affordable ₹200 Stove Repairs</span>
                  </div>
                  <div className="about-check-item">
                    <CheckCircle2 size={18} className="about-check-icon" />
                    <span>Reliable &amp; Experienced Team</span>
                  </div>
                </div>
              </div>

              <div className="about-action-pill-wrap">
                <Link href="/contact" className="about-pill-cta-btn">
                  <span>GET A QUOTE</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Step by Step Flow */}
      <HowItWorks />

    </main>
  );
}
