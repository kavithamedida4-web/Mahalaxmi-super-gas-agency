'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { BUSINESS_DATA } from '@/config/businessData';

export const FloatingWhatsApp: React.FC = () => {
  const cleanPhone = BUSINESS_DATA.whatsAppNumber.replace(/[^0-9]/g, '');
  const waUrl = `https://wa.me/91${cleanPhone}?text=Hello%20Sri%20Mahalakshmi%20Super%20Gas,%20I%20would%20like%20to%20enquire%20about%20your%20services%20and%20products.`;

  return (
    <aside aria-label="Floating WhatsApp Help" className="floating-wa-container">
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp-right"
        id="floating-whatsapp-right-btn"
        aria-label="Chat with Sri Mahalakshmi Super Gas on WhatsApp"
        title="Chat with Sri Mahalakshmi Super Gas on WhatsApp (+91 96520 09647)"
      >
        <span className="floating-wa-icon-wrap">
          <MessageCircle size={24} className="floating-wa-icon" fill="#ffffff" stroke="#25d366" />
          <span className="floating-wa-pulse" />
        </span>
        <span className="floating-wa-label">
          Chat With Us
        </span>
      </a>
    </aside>
  );
};
