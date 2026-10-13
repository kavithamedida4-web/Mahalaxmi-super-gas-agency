'use client';

import React from 'react';
import Image from 'next/image';
import { Flame, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface WhyChooseUsCollageProps {
  title?: string;
  subtitle?: string;
}

export const WhyChooseUsCollage: React.FC<WhyChooseUsCollageProps> = ({
  title = 'Delivering Safety, Speed & Genuine Cooking Gas',
  subtitle = 'Sri Mahalakshmi Super Gas Agency is your authorized local partner for genuine Supergas cooking connections, instant cylinder refill booking, and doorstep gas stove repair. 100% verified gross weight and tamper-evident security seals on every cylinder.'
}) => {
  return (
    <section className="why-choose-collage-section" id="why-choose-us" aria-label="Why Choose Sri Mahalakshmi Super Gas Agency">
      <div className="container">
        <div className="why-choose-collage-grid">

          {/* ========================================================
             LEFT COLUMN: 4-PANEL ARTISTIC PHOTO COLLAGE WITH BADGE
             ======================================================== */}
          <div className="why-choose-collage-left">
            <div className="why-choose-collage-canvas">

              {/* Decorative Accent: Top-Left Brand Curve */}
              <div className="why-choose-accent-tl" aria-hidden="true" />

              {/* Decorative Accent: Bottom-Right Dark Navy Curve */}
              <div className="why-choose-accent-br" aria-hidden="true" />

              {/* 4 Image Panels Grid */}
              <div className="why-choose-photos-grid">
                
                {/* Photo 1: Top-Left (Agency Customer Desk) */}
                <div className="why-photo-panel panel-tl">
                  <Image
                    src="/images/agency_counter.jpg"
                    alt="Sri Mahalakshmi Super Gas Agency customer desk"
                    fill
                    sizes="(max-width: 768px) 50vw, 240px"
                    className="why-photo-img"
                  />
                </div>

                {/* Photo 2: Top-Right (Delivery Specialist with Cylinder) */}
                <div className="why-photo-panel panel-tr">
                  <Image
                    src="/images/services_hero_delivery.jpg"
                    alt="Prompt doorstep delivery specialist carrying gas cylinder"
                    fill
                    sizes="(max-width: 768px) 50vw, 240px"
                    className="why-photo-img"
                  />
                </div>

                {/* Photo 3: Bottom-Left (Certified Stove Repair Technician) */}
                <div className="why-photo-panel panel-bl">
                  <Image
                    src="/images/repair.jpg"
                    alt="Expert gas stove technician repairing burner with wrench"
                    fill
                    sizes="(max-width: 768px) 50vw, 240px"
                    className="why-photo-img"
                  />
                </div>

                {/* Photo 4: Bottom-Right (Genuine LPG Cylinders) */}
                <div className="why-photo-panel panel-br">
                  <Image
                    src="/images/double_cylinder.jpg"
                    alt="Genuine Supergas domestic cooking gas cylinders"
                    fill
                    sizes="(max-width: 768px) 50vw, 240px"
                    className="why-photo-img"
                  />
                </div>

              </div>

              {/* Center Floating Seal Badge */}
              <div className="why-choose-center-badge" aria-label="Authorized Agency Seal">
                <div className="why-badge-inner">
                  <Flame size={20} className="why-badge-icon" />
                  <span className="why-badge-text">SUPERGAS</span>
                  <span className="why-badge-sub">AGENCY</span>
                </div>
              </div>

            </div>
          </div>

          {/* ========================================================
             RIGHT COLUMN: CONTENT, HEADLINE, STATS & SIGNATURE
             ======================================================== */}
          <div className="why-choose-collage-right">

            {/* Tagline Pill */}
            <div className="why-choose-tag">
              <span className="why-tag-slashes">//</span>
              <span>WHY CHOOSE US</span>
            </div>

            {/* Main Headline matching reference layout */}
            <h2 className="why-choose-heading">
              Delivering <span className="why-heading-highlight">Pure Safety</span> &amp; Reliable Cooking Gas
            </h2>

            {/* Overview Paragraph */}
            <p className="why-choose-desc">
              {subtitle}
            </p>

            {/* 3 Metric Stat Counters */}
            <div className="why-choose-stats-row">
              <div className="why-stat-box">
                <span className="why-stat-num">15,000+</span>
                <span className="why-stat-label">Happy Households</span>
              </div>

              <div className="why-stat-divider" aria-hidden="true" />

              <div className="why-stat-box">
                <span className="why-stat-num">30 Min</span>
                <span className="why-stat-label">Doorstep Delivery</span>
              </div>

              <div className="why-stat-divider" aria-hidden="true" />

              <div className="why-stat-box">
                <span className="why-stat-num">100%</span>
                <span className="why-stat-label">Tare Weight Verified</span>
              </div>
            </div>


          </div>

        </div>
      </div>
    </section>
  );
};
