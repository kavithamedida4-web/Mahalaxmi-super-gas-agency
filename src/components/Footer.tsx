'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Flame,
  Phone,
  Mail,
  MapPin,
  Clock
} from 'lucide-react';
import {
  BUSINESS_DATA,
  DEEP_LINKS
} from '../config/businessData';

export const Footer: React.FC = () => {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  if (isAdminRoute) {
    return null;
  }

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-root" id="footer" aria-label="Website Footer">
      <div className="container">
        
        <div className="footer-top-grid">
          
          {/* Col 1: Brand & Bio */}
          <div className="footer-brand-col">
            <div className="footer-brand-header">
              <div className="footer-brand-badge" aria-hidden="true">
                <Flame size={24} className="footer-badge-icon" />
              </div>
              <div className="footer-brand-title-wrap">
                <span className="footer-brand-main">SRI MAHALAKSHMI</span>
                <span className="footer-brand-sub">SUPERGAS AUTHORIZED AGENCY</span>
              </div>
            </div>

            <p className="footer-desc">
              <strong>Sri Mahalakshmi Super Gas Agency</strong> is Gollaprolu and Kakinada District&apos;s trusted domestic LPG gas partner. With our authorized counter at <strong>Gollaprolu Main Road</strong> and rapid delivery across <strong>a 5 km local radius</strong>, we deliver certified Supergas connection packages, 100% verified gross tare weight, tamper-evident safety seals, and doorstep ₹200 stove maintenance <span className="footer-accent-sep">&#9670;</span> all dedicated to 1,000+ satisfied households.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="footer-nav-col">
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-links">
              <li>
                <Link href="/">
                  <span className="link-arrow">&gt;</span> Home
                </Link>
              </li>
              <li>
                <Link href="/services/new-connection">
                  <span className="link-arrow">&gt;</span> Services
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <span className="link-arrow">&gt;</span> About Us
                </Link>
              </li>
              <li>
                <Link href="/gallery">
                  <span className="link-arrow">&gt;</span> Store Gallery
                </Link>
              </li>
              <li>
                <Link href="/products">
                  <span className="link-arrow">&gt;</span> Products &amp; Stoves
                </Link>
              </li>
              <li>
                <a href="/#contact">
                  <span className="link-arrow">&gt;</span> Book Refill / Delivery
                </a>
              </li>
              <li>
                <a href="/#faq">
                  <span className="link-arrow">&gt;</span> FAQs &amp; Help
                </a>
              </li>
              <li>
                <Link href="/privacy">
                  <span className="link-arrow">&gt;</span> Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms">
                  <span className="link-arrow">&gt;</span> Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div className="footer-nav-col">
            <h4 className="footer-col-title">Services</h4>
            <ul className="footer-links">
              <li>
                <Link href="/services/new-connection">
                  <span className="link-arrow">&gt;</span> New Connection Package
                </Link>
              </li>
              <li>
                <Link href="/services/cylinder-refill">
                  <span className="link-arrow">&gt;</span> Cylinder Refill Booking
                </Link>
              </li>
              <li>
                <Link href="/services/stove-repair">
                  <span className="link-arrow">&gt;</span> Stove Repair (Fixed ₹200)
                </Link>
              </li>
              <li>
                <Link href="/products">
                  <span className="link-arrow">&gt;</span> Stoves &amp; Spare Parts
                </Link>
              </li>
              <li>
                <Link href="/services/cylinder-refill">
                  <span className="link-arrow">&gt;</span> Commercial LPG Cylinders
                </Link>
              </li>
              <li>
                <Link href="/services/stove-repair">
                  <span className="link-arrow">&gt;</span> Kitchen Safety &amp; Leak Check
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Us */}
          <div className="footer-contact-col">
            <h4 className="footer-col-title">Contact Us</h4>
            <ul className="footer-contact-items">
              <li className="footer-contact-item">
                <Phone size={18} className="contact-item-icon" />
                <div className="contact-item-details">
                  <a href={BUSINESS_DATA.primaryPhoneTel} className="contact-item-link">
                    {BUSINESS_DATA.primaryPhone}
                  </a>
                  <a 
                    href={DEEP_LINKS.general} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="contact-item-link"
                  >
                    +91 9652009647 (WhatsApp)
                  </a>
                </div>
              </li>

              <li className="footer-contact-item">
                <Mail size={18} className="contact-item-icon" />
                <div className="contact-item-details">
                  <a href="mailto:contact@srimahalakshmisupergas.com" className="contact-item-link">
                    contact@srimahalakshmisupergas.com
                  </a>
                </div>
              </li>

              <li className="footer-contact-item">
                <MapPin size={18} className="contact-item-icon" />
                <div className="contact-item-details">
                  <span className="contact-address-text">
                    Main Road, Gollaprolu, Kakinada District, Andhra Pradesh 533445
                  </span>
                  <a 
                    href={BUSINESS_DATA.mapsShareUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="contact-maps-link"
                  >
                    View locations on Google Maps
                  </a>
                </div>
              </li>

              <li className="footer-contact-item">
                <Clock size={18} className="contact-item-icon" />
                <div className="contact-item-details">
                  <span className="contact-timing-text">
                    Mon &#9670; Sun: 7:00 AM &#9670; 10:00 PM
                  </span>
                  <span className="contact-timing-sub">
                    Doorstep Delivery: Daily 7 Days (Within 5 km)
                  </span>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-bottom-container">
            <div className="footer-bottom-left">
              <span>&copy; {currentYear} {BUSINESS_DATA.name}. All rights reserved.</span>
            </div>
            <div className="footer-bottom-right">
              <span>Designed &amp; Developed by <strong className="edone-credit">Edone Solutions</strong></span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
