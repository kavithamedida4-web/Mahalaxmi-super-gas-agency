'use client';

import React from 'react';
import Image from 'next/image';
import { Flame, ShieldCheck } from 'lucide-react';

export const PromoBanner: React.FC = () => {
  return (
    <section className="promo-banner-section" aria-label="LPG Safety Banner">
      <div className="container">
        <div className="promo-banner-card">
          
          {/* Left: Burner Flame Visual */}
          <div className="promo-banner-media">
            <Image
              src="/images/stove.jpg"
              alt="Clean Blue LPG Flame"
              width={260}
              height={140}
              className="promo-banner-img"
            />
            <div className="promo-banner-glow" />
          </div>

          {/* Center: Clean Energy Message */}
          <div className="promo-banner-content">
            <span className="promo-banner-tag">
              CLEAN • SAFE • EFFICIENT
            </span>
            <h3 className="promo-banner-title">
              LPG – The Energy for Your Life
            </h3>
            <p className="promo-banner-desc">
              From your domestic family kitchen to your commercial business, we power your everyday cooking safely.
            </p>
          </div>

          {/* Right: Angled Red Safety Callout matching Reference Mockup */}
          <div className="promo-banner-badge-box">
            <div className="promo-banner-badge-icon">
              <Flame size={28} className="promo-flame-icon" />
            </div>
            <div className="promo-banner-badge-text">
              <span className="promo-badge-line1">Choose Safety.</span>
              <span className="promo-badge-line2">Choose LPG.</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
