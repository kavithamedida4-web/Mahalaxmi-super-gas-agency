'use client';

import React, { useState } from 'react';
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  ExternalLink,
  ArrowUpRight,
  Send,
  CheckCircle2,
  Navigation
} from 'lucide-react';
import { BUSINESS_DATA, DEEP_LINKS, createWhatsAppLink } from '@/config/businessData';

export const ContactInteractiveSection: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<'refill' | 'connection' | 'repair' | 'products' | 'general'>('refill');
  const [locality, setLocality] = useState('');

  const generateWhatsAppUrl = () => {
    const loc = locality.trim() ? ` (My location/area: ${locality.trim()})` : '';
    let message = '';
    
    switch (selectedTopic) {
      case 'refill':
        message = `Hello Sri Mahalakshmi Super Gas, I want to book a domestic cylinder refill.${loc}`;
        break;
      case 'connection':
        message = `Hello Sri Mahalakshmi Super Gas, I want to enquire about applying for a New LPG Gas Connection.${loc}`;
        break;
      case 'repair':
        message = `Hello Sri Mahalakshmi Super Gas, my gas stove requires maintenance or burner repair.${loc}`;
        break;
      case 'products':
        message = `Hello Sri Mahalakshmi Super Gas, I want to inquire about gas stoves and spare parts.${loc}`;
        break;
      default:
        message = `Hello Sri Mahalakshmi Super Gas, I would like to enquire about your services.${loc}`;
        break;
    }

    return createWhatsAppLink(message);
  };

  return (
    <div className="contact-two-col-grid">
      
      {/* ========================================================
         LEFT SIDE: Contact Action Cards + Direct WhatsApp Composer
         ======================================================== */}
      <div className="contact-left-details">
        
        {/* Direct Action Cards Grid */}
        <div className="contact-cards-stack">
          
          {/* Card 1: Telephone Desk */}
          <div className="contact-detail-card card-phone">
            <div className="contact-detail-icon red">
              <Phone size={22} />
            </div>
            <div className="contact-detail-body">
              <span className="contact-detail-label">Direct Telephone Assistance</span>
              <h3 className="contact-detail-val">
                <a href={BUSINESS_DATA.primaryPhoneTel}>
                  {BUSINESS_DATA.primaryPhone}
                </a>
              </h3>
              <p className="contact-detail-sub">
                Speak directly with counter staff for instant refill confirmations and urgent support.
              </p>
              <a
                href={BUSINESS_DATA.primaryPhoneTel}
                className="btn-contact-action btn-phone-action"
                id="contact-page-call-btn"
              >
                <Phone size={15} />
                <span>Call Now ({BUSINESS_DATA.primaryPhone})</span>
              </a>
            </div>
          </div>

          {/* Card 2: WhatsApp Chat Desk */}
          <div className="contact-detail-card card-whatsapp">
            <div className="contact-detail-icon green">
              <MessageCircle size={22} />
            </div>
            <div className="contact-detail-body">
              <span className="contact-detail-label">WhatsApp Enquiry Desk</span>
              <h3 className="contact-detail-val">
                <a
                  href={BUSINESS_DATA.whatsAppBaseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +91 96520 09647
                </a>
              </h3>
              <p className="contact-detail-sub">
                Send cylinder booking messages or photos of your gas stove for quick mechanic assistance.
              </p>
              <a
                href={DEEP_LINKS.general}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-contact-action btn-wa-action"
                id="contact-page-wa-btn"
              >
                <MessageCircle size={15} />
                <span>Chat on WhatsApp</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          {/* Card 3: Counter Timings & Delivery Radius */}
          <div className="contact-detail-card card-hours">
            <div className="contact-detail-icon dark">
              <Clock size={22} />
            </div>
            <div className="contact-detail-body">
              <span className="contact-detail-label">Operating Hours &amp; Delivery Zone</span>
              <h3 className="contact-detail-val">7:00 AM – 10:00 PM</h3>
              <p className="contact-detail-sub">
                Open 7 Days a week (Monday to Sunday) • Fast domestic delivery within 5 km coverage radius across Gollaprolu.
              </p>
            </div>
          </div>

        </div>

        {/* Quick WhatsApp Message Builder */}
        <div className="contact-composer-card">
          <div className="composer-header">
            <h4 className="composer-title">Quick WhatsApp Enquiry</h4>
            <p className="composer-sub">Select your enquiry topic and send directly to our counter desk:</p>
          </div>

          <div className="composer-topic-chips">
            <button
              type="button"
              className={`topic-chip ${selectedTopic === 'refill' ? 'active' : ''}`}
              onClick={() => setSelectedTopic('refill')}
            >
              Cylinder Refill
            </button>
            <button
              type="button"
              className={`topic-chip ${selectedTopic === 'connection' ? 'active' : ''}`}
              onClick={() => setSelectedTopic('connection')}
            >
              New Connection
            </button>
            <button
              type="button"
              className={`topic-chip ${selectedTopic === 'repair' ? 'active' : ''}`}
              onClick={() => setSelectedTopic('repair')}
            >
              Stove Repair (₹200)
            </button>
            <button
              type="button"
              className={`topic-chip ${selectedTopic === 'products' ? 'active' : ''}`}
              onClick={() => setSelectedTopic('products')}
            >
              Stoves &amp; Spares
            </button>
            <button
              type="button"
              className={`topic-chip ${selectedTopic === 'general' ? 'active' : ''}`}
              onClick={() => setSelectedTopic('general')}
            >
              General Enquiry
            </button>
          </div>

          <div className="composer-input-row">
            <input
              type="text"
              placeholder="Your Locality / Landmark (e.g., Gollaprolu Main Road)"
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
              className="composer-input"
            />
            <a
              href={generateWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="composer-send-btn"
              id="composer-send-whatsapp-btn"
            >
              <Send size={15} />
              <span>Send via WhatsApp</span>
            </a>
          </div>
        </div>

      </div>

      {/* ========================================================
         RIGHT SIDE: Embedded Google Map ("onside add map")
         ======================================================== */}
      <div className="contact-right-map">
        <div className="contact-map-frame-box">
          
          {/* Top Location Info Strip */}
          <div className="map-info-top-strip">
            <div className="map-badge-icon">
              <MapPin size={20} />
            </div>
            <div className="map-info-meta">
              <h4 className="map-agency-title">Sri Mahalakshmi Super Gas Agency</h4>
              <p className="map-agency-addr">
                Gollaprolu, Kakinada District, Andhra Pradesh (Coverage: Within 5 km)
              </p>
            </div>
            <a
              href={BUSINESS_DATA.mapsShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="map-open-directions-btn"
              id="map-directions-btn"
            >
              <Navigation size={14} />
              <span>Directions</span>
              <ExternalLink size={12} />
            </a>
          </div>

          {/* Interactive Google Map Iframe */}
          <div className="map-iframe-container">
            <iframe
              title="Sri Mahalakshmi Super Gas Agency Gollaprolu Location Map"
              src="https://maps.google.com/maps?q=Gollaprolu,+Andhra+Pradesh+533445&t=&z=14&ie=UTF8&iwloc=&output=embed"
              className="map-iframe"
              loading="lazy"
              allowFullScreen
            />
          </div>

          {/* Bottom Floating Delivery Highlight */}
          <div className="map-footer-highlight">
            <div className="delivery-radius-badge">
              <CheckCircle2 size={16} />
              <span>Doorstep Gas Delivery within 5 km of Gollaprolu</span>
            </div>
            <a
              href={BUSINESS_DATA.mapsShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="map-share-link"
            >
              Open in Google Maps App →
            </a>
          </div>

        </div>
      </div>

    </div>
  );
};
