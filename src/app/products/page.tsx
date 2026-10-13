import React, { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import {
  ChevronRight,
  ArrowDownLeft,
  ShieldCheck,
  Phone,
  Truck,
  Award
} from 'lucide-react';
import {
  BUSINESS_DATA,
  DEEP_LINKS
} from '@/config/businessData';
import { ProductsCatalogClient } from './ProductsCatalogClient';

export const metadata: Metadata = {
  title: `All Products & Spare Parts | Sri Mahalakshmi Super Gas Agency`,
  description: `Browse authentic stoves, Supergas click-on regulators, wiremesh safety hose pipes, brass burners, knobs, and LPG cylinders with prompt doorstep delivery across Hyderabad. Direct WhatsApp ordering.`,
};

export default function ProductsPage() {
  return (
    <main className="single-products-page-root edustyle-page-bg" id="main-content">

      {/* Hero Section (Exact Same Design as Service Hero Section) */}
      <section className="edustyle-services-hero" id="products-hero">
        <div className="container edustyle-container">

          {/* Large Rounded Island White Card */}
          <div className="edustyle-hero-card">

            {/* Top Breadcrumbs */}
            <nav className="edustyle-breadcrumbs" aria-label="Breadcrumb">
              <Link href="/" className="edustyle-crumb-link">Home</Link>
              <ChevronRight size={13} className="edustyle-crumb-sep" />
              <span className="edustyle-crumb-current">All Products &amp; Spares</span>
            </nav>

            <div className="edustyle-hero-grid">

              {/* Left Column: Heading, Subtitle, Dual Pill Buttons, 3-Column Metrics */}
              <div className="edustyle-left-col">
                
                <h1 className="edustyle-hero-heading">
                  All genuine products <br />
                  <span className="edustyle-accent-heading">&amp; certified spare parts</span>
                </h1>

                <p className="edustyle-hero-lead">
                  Sri Mahalakshmi Super Gas Agency provides authentic stainless steel and glass gas stoves, Supergas certified click-on regulators, 3-layer steel wiremesh safety hoses, genuine replacement brass burners, and verified weight LPG cylinders across Hyderabad.
                </p>

                {/* Dual Pill Action Buttons */}
                <div className="edustyle-cta-group">
                  <a
                    href={DEEP_LINKS.products}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="edustyle-primary-btn"
                    id="products-hero-order-btn"
                  >
                    <span>Order on WhatsApp</span>
                  </a>

                  <a
                    href="#all-products-grid"
                    className="edustyle-secondary-btn"
                    id="products-hero-explore-btn"
                  >
                    <span>Explore catalog</span>
                  </a>
                </div>

                {/* 3-Column Stats Row with Dividers */}
                <div className="edustyle-stats-row">
                  <div className="edustyle-stat-item">
                    <span className="edustyle-stat-val">Full Range</span>
                    <span className="edustyle-stat-label">Authentic Hardware</span>
                  </div>

                  <div className="edustyle-stat-sep" aria-hidden="true" />

                  <div className="edustyle-stat-item">
                    <span className="edustyle-stat-val">30 Min</span>
                    <span className="edustyle-stat-label">Doorstep Delivery</span>
                  </div>

                  <div className="edustyle-stat-sep" aria-hidden="true" />

                  <div className="edustyle-stat-item">
                    <div className="edustyle-stat-val edustyle-stat-with-icon">
                      <svg width="24" height="15" viewBox="0 0 38 18" fill="none" stroke="currentColor" strokeWidth="2.5" className="edustyle-stat-ring-icon" aria-hidden="true">
                        <circle cx="9" cy="9" r="7" />
                        <circle cx="19" cy="9" r="7" />
                        <circle cx="29" cy="9" r="7" />
                      </svg>
                      <span>100%</span>
                    </div>
                    <span className="edustyle-stat-label">Supergas Certified</span>
                  </div>
                </div>

              </div>

              {/* Right Column: 3-Card Asymmetric Collage with Floating Badges & Accents */}
              <div className="edustyle-right-col">
                <div className="edustyle-collage-wrap">
                  
                  {/* Card 1: Top-Left Tall Rounded Card */}
                  <div className="edustyle-card edustyle-card-1">
                    <Image
                      src="/images/stove.jpg"
                      alt="2-Burner Stainless Steel gas stove"
                      fill
                      sizes="240px"
                      className="edustyle-card-img"
                      priority
                    />
                    {/* Attached Pill/Circle Arrow Badge */}
                    <div className="edustyle-badge-arrow" aria-hidden="true">
                      <ArrowDownLeft size={20} strokeWidth={2.6} />
                    </div>
                  </div>

                  {/* Card 2: Top-Right Staggered Rounded Card */}
                  <div className="edustyle-card edustyle-card-2">
                    <Image
                      src="/images/regulator_supergas.jpg"
                      alt="Supergas certified click-on safety regulator"
                      fill
                      sizes="220px"
                      className="edustyle-card-img"
                      priority
                    />
                    {/* Floating Orange Pill "Safety First" */}
                    <div className="edustyle-badge-safety">
                      <ShieldCheck size={14} className="safety-icon" />
                      <span>Safety First</span>
                    </div>
                  </div>

                  {/* Card 3: Bottom Wide Rounded Card */}
                  <div className="edustyle-card edustyle-card-3">
                    <Image
                      src="/images/refill_domestic_14kg.jpg"
                      alt="14.2kg Domestic cooking gas cylinder"
                      fill
                      sizes="290px"
                      className="edustyle-card-img"
                    />
                    {/* Phone badge */}
                    <a
                      href={BUSINESS_DATA.primaryPhoneTel}
                      className="edustyle-badge-play"
                      title="Quick Phone Consultation"
                      aria-label="Call agency for phone consultation"
                    >
                      <Phone size={16} fill="currentColor" />
                    </a>
                  </div>

                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Interactive Products Catalog Client (Search, Filter Tabs, 4-Column Grid) */}
      <Suspense fallback={<div className="container text-center" style={{ padding: '4rem 0' }}>Loading products catalog...</div>}>
        <ProductsCatalogClient />
      </Suspense>

      {/* Trust & Guarantees Strip */}
      <section className="product-trust-strip">
        <div className="container">
          <div className="product-trust-grid">
            <div className="product-trust-item">
              <ShieldCheck size={28} className="trust-icon" />
              <div>
                <h4>100% Genuine &amp; ISI Tested</h4>
                <p>Every stove, regulator and hose meets strict BIS / ISI quality standards.</p>
              </div>
            </div>
            <div className="product-trust-item">
              <Truck size={28} className="trust-icon" />
              <div>
                <h4>Prompt Doorstep Delivery</h4>
                <p>Fast dispatch within our 5 km coverage area across Hyderabad &amp; Gollaprolu.</p>
              </div>
            </div>
            <div className="product-trust-item">
              <Award size={28} className="trust-icon" />
              <div>
                <h4>Supergas Authorized</h4>
                <p>Authorized agency ensuring verified tare weight and tamper-proof seals.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
