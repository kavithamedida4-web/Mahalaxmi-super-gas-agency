'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Flame,
  MessageCircle,
  MapPin,
  Phone,
  ExternalLink,
  Star,
  CheckCircle2,
  Calendar,
  ChevronDown
} from 'lucide-react';
import { BUSINESS_DATA, createWhatsAppLink } from '@/config/businessData';

export const FastBookingContactMap: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('1. Domestic Cylinder Refill Booking');
  const [location, setLocation] = useState('Gollaprolu Town / Main Center');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedMessage = 
`*SRI MAHALAKSHMI SUPER GAS AGENCY - BOOKING*
━━━━━━━━━━━━━━━━━━━━
• *Customer Name:* ${name.trim() || 'Customer'}
• *Phone Number:* ${phone.trim() || 'Not specified'}
• *Selected Gas Service:* ${service}
• *Delivery Locality:* ${location}
• *Delivery Address / Notes:* ${notes.trim() || 'Please confirm delivery & timings.'}
━━━━━━━━━━━━━━━━━━━━
*Agency Desk:* Gollaprolu Main Road
*Helpline:* +91 96520 09647`;

    const waLink = createWhatsAppLink(formattedMessage);
    setSubmitted(true);
    window.open(waLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="fast-booking-section" id="contact" aria-label="Quick Gas Booking & Agency Location">
      <div className="container">
        <div className="fast-booking-grid">
          
          {/* =========================================================
             LEFT SIDE: Gas Cylinder & Stove Service Booking Form Card
             ========================================================= */}
          <div className="fast-booking-card">
            
            {/* Top Pill Badge */}
            <div className="fast-booking-badge">
              <Flame size={13} className="badge-sparkle-icon" />
              <span>QUICK LPG &amp; STOVE BOOKING</span>
            </div>

            {/* Main Headline */}
            <h2 className="fast-booking-title">
              Book Gas Cylinder <span className="highlight-text">&amp; Stove Service</span> Today!
            </h2>

            {/* Subtitle */}
            <p className="fast-booking-sub">
              Fill out the quick form below for prompt cylinder refill delivery, new gas connection setup, or ₹200 doorstep stove repair in Gollaprolu.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="fast-booking-form">
              
              {/* Row 1: Name & Phone */}
              <div className="form-two-cols">
                <div className="form-field-group">
                  <label htmlFor="fb-name" className="form-field-label">
                    YOUR NAME *
                  </label>
                  <input
                    id="fb-name"
                    type="text"
                    required
                    placeholder="e.g. Suresh Kumar"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-field-input"
                  />
                </div>

                <div className="form-field-group">
                  <label htmlFor="fb-phone" className="form-field-label">
                    PHONE NUMBER *
                  </label>
                  <input
                    id="fb-phone"
                    type="tel"
                    required
                    placeholder="+91 96520 09647"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-field-input"
                  />
                </div>
              </div>

              {/* Row 2: Service & Location Dropdowns */}
              <div className="form-two-cols">
                <div className="form-field-group">
                  <label htmlFor="fb-service" className="form-field-label">
                    SELECT GAS SERVICE *
                  </label>
                  <div className="select-wrapper">
                    <select
                      id="fb-service"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="form-field-select"
                    >
                      <option value="1. Domestic Cylinder Refill Booking">
                        1. Domestic Cylinder Refill Booking
                      </option>
                      <option value="2. New Gas Connection Package">
                        2. New Gas Connection Package
                      </option>
                      <option value="3. Gas Stove Repair & Servicing (₹200)">
                        3. Gas Stove Repair &amp; Servicing (₹200)
                      </option>
                      <option value="4. Gas Stoves, Regulators & Spares">
                        4. Gas Stoves, Regulators &amp; Spares
                      </option>
                      <option value="5. Commercial / Bhatti Connection">
                        5. Commercial / Bhatti Connection
                      </option>
                      <option value="6. General Customer Assistance">
                        6. General Customer Assistance
                      </option>
                    </select>
                    <ChevronDown size={16} className="select-arrow" />
                  </div>
                </div>

                <div className="form-field-group">
                  <label htmlFor="fb-location" className="form-field-label">
                    LOCALITY / AREA IN GOLLAPROLU *
                  </label>
                  <div className="select-wrapper">
                    <select
                      id="fb-location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="form-field-select"
                    >
                      <option value="Gollaprolu Town / Main Center">
                        Gollaprolu / Main Road
                      </option>
                      <option value="Chebrolu Road Area">
                        Chebrolu Road Area
                      </option>
                      <option value="Tatiparthi Route">
                        Tatiparthi Route
                      </option>
                      <option value="Durgada Surrounding">
                        Durgada Surrounding
                      </option>
                      <option value="Within 5 km Coverage Radius">
                        Within 5 km Radius
                      </option>
                      <option value="Other Area in Gollaprolu">
                        Other Gollaprolu Locality
                      </option>
                    </select>
                    <ChevronDown size={16} className="select-arrow" />
                  </div>
                </div>
              </div>

              {/* Row 3: Delivery Address & Notes */}
              <div className="form-field-group">
                <label htmlFor="fb-notes" className="form-field-label">
                  DELIVERY ADDRESS &amp; CONSUMER NO.
                </label>
                <textarea
                  id="fb-notes"
                  rows={2}
                  placeholder="Door number, street name, consumer number, or stove burner issue..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="form-field-textarea"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="fast-booking-submit-btn"
                id="fast-booking-submit-button"
              >
                <MessageCircle size={18} className="btn-wa-icon" />
                <span>Book Now via WhatsApp</span>
              </button>

              {submitted && (
                <div className="booking-feedback-msg" role="status">
                  <CheckCircle2 size={16} />
                  <span>Opening WhatsApp with your booking details...</span>
                </div>
              )}

            </form>

          </div>

          {/* =========================================================
             RIGHT SIDE: Google Map Frame Card ("onside add map")
             ========================================================= */}
          <div className="fast-booking-map-card">
            
            {/* Top Floating Business Card (Matching Reference Design) */}
            <div className="map-floating-biz-card">
              <div className="biz-card-top-row">
                <div className="biz-card-info">
                  <h3 className="biz-card-title">
                    {BUSINESS_DATA.name}
                  </h3>
                  <span className="biz-card-cat">
                    Supergas Authorized Distributor &amp; Service
                  </span>
                  <p className="biz-card-addr">
                    Main Road, Gollaprolu, Kakinada District, AP - 533445
                  </p>
                  <div className="biz-card-rating">
                    <span className="rating-num">4.9</span>
                    <Star size={13} className="rating-star-icon" fill="currentColor" />
                    <span className="rating-count">(180+)</span>
                  </div>
                </div>
                
                <a
                  href={BUSINESS_DATA.mapsShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="biz-card-open-link"
                  aria-label="Open in Google Maps"
                >
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>

            {/* Embedded Google Maps iframe */}
            <div className="map-card-iframe-wrapper">
              <iframe
                title="Sri Mahalakshmi Super Gas Agency Google Maps Location"
                src="https://maps.google.com/maps?q=Gollaprolu,+Andhra+Pradesh+533445&t=&z=14&ie=UTF8&iwloc=&output=embed"
                className="map-card-iframe"
                loading="lazy"
                allowFullScreen
              />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
