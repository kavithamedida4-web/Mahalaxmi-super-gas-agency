'use client';

import React from 'react';
import { Phone, MessageCircle, MapPin, ExternalLink, Clock, Truck, ShieldAlert, ArrowUpRight } from 'lucide-react';
import { BUSINESS_DATA, createWhatsAppLink, PREFILLED_MESSAGES } from '../config/businessData';

export const ContactLocation: React.FC = () => {
  return (
    <section className="section-padding contact-section" id="contact">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">
            <MapPin size={14} />
            <span>Direct Agency Contact</span>
          </span>
          <h2 className="section-title">
            Visit Us or Contact by Phone &amp; WhatsApp
          </h2>
          <p className="section-description">
            We are accessible directly for customer enquiries. Use the quick links below to dial our phone number, chat on WhatsApp, or navigate using Google Maps.
          </p>
        </div>

        <div className="contact-grid">
          
          {/* Card 1: Primary Phone Call */}
          <div className="contact-card glass-card">
            <div className="contact-icon-wrap phone-icon-wrap">
              <Phone size={24} />
            </div>
            <div className="contact-card-info">
              <span className="contact-label">Telephone Assistance</span>
              <h3 className="contact-value">
                <a href={BUSINESS_DATA.primaryPhoneTel} className="contact-link">
                  {BUSINESS_DATA.primaryPhone}
                </a>
              </h3>
              <p className="contact-desc">
                Speak directly with the agency desk for immediate answers regarding new connection enquiries or urgent repair guidance.
              </p>
              <a
                href={BUSINESS_DATA.primaryPhoneTel}
                className="btn btn-call contact-action-btn"
                id="contact-call-action"
                aria-label={`Call ${BUSINESS_DATA.primaryPhone}`}
              >
                <Phone size={16} />
                <span>Call Now ({BUSINESS_DATA.primaryPhone})</span>
              </a>
            </div>
          </div>

          {/* Card 2: WhatsApp Chat */}
          <div className="contact-card glass-card">
            <div className="contact-icon-wrap wa-icon-wrap">
              <MessageCircle size={24} />
            </div>
            <div className="contact-card-info">
              <span className="contact-label">WhatsApp Enquiry Desk</span>
              <h3 className="contact-value">
                <a
                  href={createWhatsAppLink(PREFILLED_MESSAGES.general)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  +91 96520 09647
                </a>
              </h3>
              <p className="contact-desc">
                Fastest way to request a cylinder refill check or send photos of your gas stove for servicing and spare parts identification.
              </p>
              <a
                href={createWhatsAppLink(PREFILLED_MESSAGES.general)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp contact-action-btn"
                id="contact-wa-action"
                aria-label="Send WhatsApp message"
              >
                <MessageCircle size={16} />
                <span>Message on WhatsApp</span>
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>

          {/* Card 3: Google Maps Navigation */}
          <div className="contact-card glass-card map-card">
            <div className="contact-icon-wrap map-icon-wrap">
              <MapPin size={24} />
            </div>
            <div className="contact-card-info">
              <span className="contact-label">Store Location</span>
              <h3 className="contact-value">Google Maps Directions</h3>
              <p className="contact-desc">
                {BUSINESS_DATA.addressPendingNote}
              </p>
              <a
                href={BUSINESS_DATA.mapsShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary contact-action-btn"
                id="open-google-maps-btn"
                aria-label="Open agency location in Google Maps"
              >
                <MapPin size={16} />
                <span>Open in Google Maps</span>
                <ExternalLink size={15} />
              </a>
            </div>
          </div>

        </div>

        {/* Operational Guidelines & Slots Bar */}
        <div className="operational-info-box">
          <div className="op-item">
            <Clock size={20} className="op-icon" />
            <div>
              <h4 className="op-title">Operational Inquiries</h4>
              <p className="op-text">
                Enquiries typically responded during regular business hours (Mon–Sat). Sunday timings pending owner confirmation.
              </p>
            </div>
          </div>

          <div className="op-item">
            <Truck size={20} className="op-icon" />
            <div>
              <h4 className="op-title">Service &amp; Delivery Areas</h4>
              <p className="op-text">
                Locality-based delivery arrangements are coordinated directly upon receiving your enquiry via WhatsApp or call.
              </p>
            </div>
          </div>

          <div className="op-item">
            <ShieldAlert size={20} className="op-icon" />
            <div>
              <h4 className="op-title">Enquiry Policy</h4>
              <p className="op-text">
                Website interactions are direct enquiries. No financial transactions or bookings occur on this website.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
