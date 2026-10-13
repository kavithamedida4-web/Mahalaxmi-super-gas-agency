'use client';

import React, { useState } from 'react';
import { MessageCircle, Send, CheckCircle2, MapPin, Sparkles } from 'lucide-react';
import { BUSINESS_DATA, createWhatsAppLink } from '../config/businessData';

type EnquiryType = 'cylinder' | 'connection' | 'products' | 'repair' | 'general';

interface OptionDef {
  key: EnquiryType;
  label: string;
  icon: string;
  defaultText: string;
  needsLocality: boolean;
}

const ENQUIRY_OPTIONS: OptionDef[] = [
  {
    key: 'cylinder',
    label: 'Cylinder Refill',
    icon: '🔥',
    defaultText: 'Hello, I would like to enquire about a cylinder refill.',
    needsLocality: true,
  },
  {
    key: 'connection',
    label: 'New Connection',
    icon: '✨',
    defaultText: 'Hello, I would like details about a new gas connection.',
    needsLocality: true,
  },
  {
    key: 'repair',
    label: 'Stove Repair',
    icon: '🔧',
    defaultText: 'Hello, I need help with stove repair.',
    needsLocality: true,
  },
  {
    key: 'products',
    label: 'Stoves & Accessories',
    icon: '🛍️',
    defaultText: 'Hello, I would like to enquire about gas stoves/accessories.',
    needsLocality: false,
  },
  {
    key: 'general',
    label: 'General Enquiry',
    icon: '💬',
    defaultText: 'Hello, I would like to enquire about your gas agency services.',
    needsLocality: false,
  },
];

export const QuickEnquirySection: React.FC = () => {
  const [selectedType, setSelectedType] = useState<EnquiryType>('cylinder');
  const [locality, setLocality] = useState<string>('');
  const [customNotes, setCustomNotes] = useState<string>('');

  const currentOption = ENQUIRY_OPTIONS.find((opt) => opt.key === selectedType) || ENQUIRY_OPTIONS[0];

  const buildMessage = (): string => {
    let msg = currentOption.defaultText;
    if (locality.trim()) {
      msg += ` My locality is: ${locality.trim()}.`;
    }
    if (customNotes.trim()) {
      msg += ` Note: ${customNotes.trim()}.`;
    }
    return msg;
  };

  const finalMessage = buildMessage();
  const whatsappUrl = createWhatsAppLink(finalMessage);

  return (
    <section className="section-padding quick-enquiry-root" id="enquiry-builder">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">
            <Sparkles size={14} />
            <span>Interactive WhatsApp Contact</span>
          </span>
          <h2 className="section-title">
            Prepare Your Enquiry in 1 Tap
          </h2>
          <p className="section-description">
            Select what you need below to generate an editable message formatted directly for our agency WhatsApp (+91 96520 09647).
          </p>
        </div>

        <div className="enquiry-card">
          <div className="enquiry-card-grid">
            
            {/* Step 1: Select Topic */}
            <div className="enquiry-options-pane">
              <label className="pane-label">
                Step 1: Choose Your Enquiry Type
              </label>
              
              <div className="options-grid">
                {ENQUIRY_OPTIONS.map((opt) => {
                  const isSelected = selectedType === opt.key;
                  return (
                    <button
                      key={opt.key}
                      type="button"
                      className={`option-btn ${isSelected ? 'selected' : ''}`}
                      onClick={() => setSelectedType(opt.key)}
                      aria-pressed={isSelected}
                    >
                      <span className="option-icon">{opt.icon}</span>
                      <span className="option-text">{opt.label}</span>
                      {isSelected && <CheckCircle2 size={16} className="selected-check" />}
                    </button>
                  );
                })}
              </div>

              {/* Step 2: Locality Input */}
              <div className="inputs-block">
                <label htmlFor="locality-input" className="pane-label">
                  Step 2: Enter Your Locality / Area <span className="label-optional">(Recommended)</span>
                </label>
                <div className="input-group">
                  <MapPin size={18} className="input-icon" />
                  <input
                    id="locality-input"
                    type="text"
                    className="form-input"
                    placeholder="e.g., Market Road, Gandhi Nagar, Main Bazaar..."
                    value={locality}
                    onChange={(e) => setLocality(e.target.value)}
                  />
                </div>
                <p className="input-hint">
                  Helps our agency check delivery coverage and route scheduling promptly.
                </p>

                {/* Additional notes (optional) */}
                <label htmlFor="notes-input" className="pane-label" style={{ marginTop: '1.25rem' }}>
                  Step 3: Specific details <span className="label-optional">(Optional)</span>
                </label>
                <input
                  id="notes-input"
                  type="text"
                  className="form-input"
                  placeholder={
                    selectedType === 'repair'
                      ? 'e.g., Low flame or gas smell issue'
                      : selectedType === 'products'
                      ? 'e.g., Need 2-burner stove or safety pipe'
                      : 'Any specific questions or urgent timing'
                  }
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                />
              </div>
            </div>

            {/* Step 3: Message Preview & Send */}
            <div className="enquiry-preview-pane">
              <div className="preview-bubble-card">
                <div className="preview-header">
                  <div className="wa-avatar">
                    <MessageCircle size={18} />
                  </div>
                  <div>
                    <div className="wa-recipient">{BUSINESS_DATA.name}</div>
                    <div className="wa-number">+91 96520 09647</div>
                  </div>
                </div>

                <div className="preview-chat-body">
                  <div className="chat-bubble">
                    <p className="chat-text">{finalMessage}</p>
                    <span className="chat-time">Direct Message Draft</span>
                  </div>
                </div>

                <div className="preview-action-block">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp w-full send-cta-btn"
                    id="submit-custom-whatsapp-enquiry"
                    aria-label="Send prepared message on WhatsApp"
                  >
                    <Send size={18} />
                    <span>Open in WhatsApp to Send</span>
                  </a>

                  <div className="enquiry-behavior-disclaimer">
                    <span className="disclaimer-bullet">ℹ️</span>
                    <span>
                      Tapping this button will open WhatsApp on your phone or computer with the text above ready to send. No automatic bookings are made; our agency desk will reply directly to assist you.
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
