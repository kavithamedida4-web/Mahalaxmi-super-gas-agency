'use client';

import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { BUSINESS_DATA, DEEP_LINKS } from '../config/businessData';

export const MobileContactBar: React.FC = () => {
  return (
    <nav className="mobile-contact-bar" aria-label="Quick Mobile Actions">
      <div className="mobile-bar-container">
        
        {/* Left Button: Call Now (links to tel:+919652009647) */}
        <a
          href={BUSINESS_DATA.primaryPhoneTel}
          className="mobile-bar-btn call-action"
          id="mobile-bottom-call-btn"
          aria-label={`Call Now at ${BUSINESS_DATA.primaryPhone}`}
        >
          <Phone size={18} />
          <span>Call Now</span>
        </a>

        {/* Right Button: WhatsApp (links to https://wa.me/919652009647) */}
        <a
          href="https://wa.me/919652009647"
          target="_blank"
          rel="noopener noreferrer"
          className="mobile-bar-btn whatsapp-action"
          id="mobile-bottom-whatsapp-btn"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle size={18} />
          <span>WhatsApp</span>
        </a>

      </div>
    </nav>
  );
};
