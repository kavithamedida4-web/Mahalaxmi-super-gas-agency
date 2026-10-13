'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
  category?: string;
}

const FAQS_LIST: FAQ[] = [
  {
    category: 'New Connection',
    question: 'How do I apply for a new domestic cooking gas connection?',
    answer: 'Connect with our agency desk via WhatsApp or phone with your ID proof (Aadhaar / Voter ID) and address proof. We guide you through domestic LPG allotment, genuine cylinder issuance, certified regulator setup, and initial stove inspection.',
  },
  {
    category: 'Refills & Delivery',
    question: 'How can I book an LPG cylinder refill and check delivery timing?',
    answer: 'Simply share your locality and consumer details with our agency desk (+91 96520 09647). We verify stock availability promptly and coordinate doorstep delivery to your home without automated interactive voice response delays.',
  },
  {
    category: 'Safety & Verification',
    question: 'How do I check that my delivered LPG cylinder is genuine and safe?',
    answer: 'Every genuine cylinder from our agency arrives with an authentic tamper-evident seal and safety cap intact. Our delivery technicians can perform seal checks, O-ring safety inspection, and leakage tests upon delivery.',
  },
  {
    category: 'Repairs & Servicing',
    question: 'Do you offer doorstep gas stove repair and flame maintenance?',
    answer: 'Yes! We repair common issues such as low or yellow flame, burner carbon clogging, loose control knobs, and gas leakage. Share your stove model and issue over WhatsApp to schedule an on-site technician visit.',
  },
  {
    category: 'Products & Accessories',
    question: 'Can I purchase ISI-certified regulators, pipes, and stoves at the agency?',
    answer: 'Yes. We stock toughened glass & stainless steel gas stoves (2-burner & 3-burner), steel wire-braided safety hose pipes, high-efficiency brass regulators, spark lighters, and heavy-duty cylinder roller trolleys.',
  },
  {
    category: 'Agency & Location',
    question: 'Where is Sri Mahalaxmi Super Gas Agency located and what are the timings?',
    answer: 'Our agency and customer consultation desk is located centrally in town. Detailed interactive Google Map route directions and contact numbers are provided in the section below.',
  },
];

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="section-padding faq-section" id="faq">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header text-center">
          <span className="section-badge">
            <HelpCircle size={14} />
            <span>Got Questions?</span>
          </span>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-description">
            Quick, reliable answers regarding new LPG connections, refill bookings, cylinder safety, and stove maintenance.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="faq-accordion-wrap">
          {FAQS_LIST.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div 
                key={index} 
                className={`faq-accordion-item ${isOpen ? 'active' : ''}`}
              >
                <button
                  type="button"
                  className="faq-accordion-question"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  id={`faq-btn-${index}`}
                >
                  <div className="faq-question-content">
                    <span className="faq-num-pill">{String(index + 1).padStart(2, '0')}</span>
                    <span className="faq-question-text">{faq.question}</span>
                  </div>
                  <div className={`faq-chevron-box ${isOpen ? 'rotated' : ''}`}>
                    <ChevronDown size={18} />
                  </div>
                </button>

                {isOpen && (
                  <div className="faq-accordion-answer">
                    <p className="faq-answer-text">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
