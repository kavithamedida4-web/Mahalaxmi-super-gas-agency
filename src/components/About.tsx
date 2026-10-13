'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Clock,
  Flame,
  ShieldCheck,
  ArrowRight,
  Award,
  CheckCircle2,
  Phone
} from 'lucide-react';
import { BUSINESS_DATA } from '../config/businessData';

export const About: React.FC = () => {
  return (
    <section className="about-boldman-section" id="about" aria-label="About Sri Mahalakshmi Super Gas Agency">
      <div className="container">
        <div className="about-boldman-grid">
          
          {/* ========================================================
             LEFT SIDE: 2 OVERLAPPING IMAGES COMPOSITION (REFERENCE DESIGN)
             ======================================================== */}
          <div className="about-boldman-images-col">
            <div className="about-boldman-images-wrapper">
              
              {/* Background Decorative Blueprint / Sketch Watermark */}
              <div className="about-decor-watermark" aria-hidden="true">
                <svg width="220" height="220" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 210H210M20 210V30H80V210M80 70H140V210M140 110H200V210M40 50H60M40 80H60M40 110H60M40 140H60M100 90H120M100 120H120M100 150H120M160 130H180M160 160H180" stroke="rgba(220, 38, 38, 0.08)" strokeWidth="2" strokeDasharray="4 4" />
                </svg>
              </div>

              {/* Main Primary Photo: Delivery Specialist / Technician */}
              <div className="about-main-photo-box">
                <Image
                  src="/images/about_indian_delivery_clean.jpg"
                  alt="Sri Mahalakshmi Super Gas Agency delivery specialist delivering gas cylinder"
                  width={460}
                  height={540}
                  className="about-main-photo-img"
                  priority
                />
              </div>

              {/* Overlapping Secondary Photo: Hands-on Stove Repair & Servicing with Thick White Border */}
              <div className="about-overlap-photo-box">
                <Image
                  src="/images/about_indian_service.jpg"
                  alt="Certified gas technician performing stove burner maintenance and leak inspection"
                  width={320}
                  height={280}
                  className="about-overlap-photo-img"
                />
              </div>

            </div>
          </div>

          {/* ========================================================
             RIGHT SIDE: EDITORIAL CONTENT & 3-FEATURE HIGHLIGHTS
             ======================================================== */}
          <div className="about-boldman-content-col">
            
            {/* Top Eyebrow with Vertical Accent Bar */}
            <div className="boldman-eyebrow">
              <span className="boldman-accent-bar" aria-hidden="true" />
              <span className="boldman-eyebrow-text">ABOUT SRI MAHALAKSHMI SUPER GAS</span>
            </div>

            {/* Main Headline */}
            <h2 className="boldman-title">
              We Deliver Safety, Trust &amp; Comfort for Your Home
            </h2>

            {/* Concise High-Impact Summary for Home Page */}
            <p className="boldman-paragraph boldman-lead">
              Sri Mahalakshmi Super Gas Agency is Gollaprolu&apos;s authorized Supergas partner. We provide prompt doorstep cylinder refill delivery, certified new gas connection packages, and skilled ₹200 stove maintenance with 100% verified tare weight and tamper-proof security seals.
            </p>

            {/* Quick Trust Highlights */}
            <div className="about-quick-bullets">
              <div className="about-bullet-item">
                <CheckCircle2 size={16} className="bullet-check-icon" />
                <span>100% Verified Gross Tare Weight</span>
              </div>
              <div className="about-bullet-item">
                <CheckCircle2 size={16} className="bullet-check-icon" />
                <span>Prompt Doorstep Delivery within 5 km</span>
              </div>
              <div className="about-bullet-item">
                <CheckCircle2 size={16} className="bullet-check-icon" />
                <span>Fixed ₹200 Doorstep Stove Maintenance</span>
              </div>
            </div>

            {/* Action Link: LEARN MORE ABOUT US > */}
            <div className="boldman-link-wrap">
              <Link href="/about" className="boldman-more-link" id="about-more-link">
                <span>LEARN MORE ABOUT US</span>
                <ArrowRight size={15} className="more-link-arrow" />
              </Link>
            </div>

            {/* Bottom 3 Inline Features Row */}
            <div className="boldman-features-row">
              
              {/* Feature 1: Ontime at Services */}
              <div className="boldman-feature-item">
                <div className="boldman-feature-icon-circle">
                  <Clock size={20} />
                </div>
                <div className="boldman-feature-text">
                  <span className="feature-bold-label">Ontime at</span>
                  <span className="feature-sub-label">Services</span>
                </div>
              </div>

              {/* Feature 2: 7 Days / Prompt Service */}
              <div className="boldman-feature-item">
                <div className="boldman-feature-icon-circle">
                  <Flame size={20} />
                </div>
                <div className="boldman-feature-text">
                  <span className="feature-bold-label">7 Days Open</span>
                  <span className="feature-sub-label">Assistance</span>
                </div>
              </div>

              {/* Feature 3: Verified Professionals */}
              <div className="boldman-feature-item">
                <div className="boldman-feature-icon-circle">
                  <Award size={20} />
                </div>
                <div className="boldman-feature-text">
                  <span className="feature-bold-label">Verified</span>
                  <span className="feature-sub-label">Professionals</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
