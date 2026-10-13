'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ChevronRight,
  Star
} from 'lucide-react';
import {
  DEEP_LINKS
} from '../config/businessData';

export const Hero: React.FC = () => {
  return (
    <section className="hero-banner-section" id="hero">
      {/* Cinematic dark gradient overlay on left for high-contrast typography matching Image 2 */}
      <div className="hero-banner-backdrop-gradient" />

      <div className="container hero-banner-container">
        <div className="hero-banner-content-dvs">
          
          {/* Eyebrow Pill Tag matching Image 2: — SUPERGAS AUTHORIZED AGENCY */}
          <div className="hero-dvs-eyebrow">
            <span className="dvs-eyebrow-dash">—</span>
            <span className="dvs-eyebrow-text">SUPERGAS AUTHORIZED AGENCY</span>
          </div>

          {/* Heading matching Image 2 font, alignment and gold highlight */}
          <h1 className="hero-dvs-heading">
            Sri Mahalakshmi <br />
            <span className="hero-dvs-highlight">Super Gas Agency.</span>
          </h1>

          {/* Description Subtext matching Image 2 font and layout */}
          <p className="hero-dvs-subtext">
            <span className="subtext-desktop">
              Fast doorstep LPG refills, complete new connection starter packages (Single &amp; Double Cylinder), certified kitchen safety hardware, and expert stove repairs.
            </span>
            <span className="subtext-mobile">
              Fast doorstep LPG refills &amp; expert stove repairs.
            </span>
          </p>

          {/* Dual Action Buttons matching Image 2 styling */}
          <div className="hero-dvs-actions">
            <a
              href={DEEP_LINKS.general}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-dvs-primary"
              id="hero-whatsapp-cta"
              aria-label="Enquire on WhatsApp"
            >
              <span>Enquire on WhatsApp</span>
              <span className="btn-dvs-arrow-circle">
                <ArrowRight size={15} />
              </span>
            </a>

            <Link
              href="/services/new-connection"
              className="btn-dvs-secondary"
              id="hero-services-cta"
            >
              <span>Our Services</span>
              <ChevronRight size={16} />
            </Link>
          </div>

          {/* Stats Highlight Bar */}
          <div className="hero-dvs-stats-row">
            <div className="hero-dvs-stat-item">
              <span className="stat-number">5 km</span>
              <span className="stat-caption">DELIVERY</span>
            </div>

            <div className="hero-dvs-stat-item">
              <span className="stat-number">7 AM–10 PM</span>
              <span className="stat-caption">SUPPORT</span>
            </div>

            <div className="hero-dvs-stat-item">
              <span className="stat-number">
                5<Star size={13} className="stat-star-icon" fill="currentColor" />
              </span>
              <span className="stat-caption">RATED</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
