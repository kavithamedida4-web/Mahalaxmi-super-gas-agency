'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface ServiceFAQData {
  badge: string;
  title: string;
  description: string;
  faqs: FAQItem[];
}

const SERVICE_FAQS: Record<string, ServiceFAQData> = {
  'new-connection': {
    badge: 'New Connection FAQs',
    title: 'Frequently Asked Questions — New Gas Connection',
    description:
      'Everything you need to know about getting a new domestic LPG connection, required documents, starter packages, and doorstep setup in Gollaprolu.',
    faqs: [
      {
        question: 'What documents are required to apply for a new gas connection?',
        answer:
          'Only your Aadhaar card photo is required! You can simply send it directly to our counter desk via WhatsApp (+91 96520 09647) for rapid, paperless verification. No lengthy forms or complicated office queues required.',
      },
      {
        question: 'What is included in the New Connection starter package?',
        answer:
          'The complete package includes an authorized Supergas domestic cylinder, an ISI-certified high-pressure snap-on regulator, a rat-bite resistant steel-wire reinforced safety hose, a spark lighter, and an optional 2-burner or 3-burner toughened glass or stainless steel stove.',
      },
      {
        question: 'What is the difference between the Single Cylinder and Double Cylinder (DBC) packages?',
        answer:
          'The Single Cylinder package is ideal for smaller families and budget setups. The Double Cylinder (DBC) package gives you an active standby reserve cylinder, ensuring your kitchen never runs out of gas unexpectedly while waiting for a refill delivery.',
      },
      {
        question: 'How quickly is the new connection delivered and set up?',
        answer:
          'Once your Aadhaar details are confirmed over WhatsApp, our delivery technician arrives within your preferred time slot (usually same-day or within 24 hours). The technician mounts the regulator, conducts safety leak checks, and demonstrates safe burner ignition.',
      },
      {
        question: 'Does the agency provide safety guidance during installation?',
        answer:
          'Yes! Our certified technician carries out a free mandatory kitchen safety audit during installation, ensures upright cylinder placement with proper ventilation, tests all joints with soap solution, and explains daily cylinder shutoff procedures.',
      },
    ],
  },

  'cylinder-refill': {
    badge: 'Cylinder Refill FAQs',
    title: 'Frequently Asked Questions — Refill Booking & Delivery',
    description:
      'Answers regarding 30-minute doorstep refill delivery, tare weight verification, tamper-evident seals, and WhatsApp booking in Gollaprolu.',
    faqs: [
      {
        question: 'How quickly will my cylinder refill be delivered?',
        answer:
          'We prioritize prompt 30-minute to same-day doorstep refill delivery within our 5 km coverage radius across Gollaprolu. Our shop desk is open 7 days a week from 7:00 AM to 10:00 PM for prompt dispatch.',
      },
      {
        question: 'How do I verify that my delivered cylinder has full and accurate gas weight?',
        answer:
          'Our delivery specialists carry calibrated digital weighing scales. You can request a live gross weight check right at your doorstep upon delivery to verify that the cylinder contains the exact marked net LPG weight (14.2 kg domestic, 19 kg commercial, or 5 kg mini).',
      },
      {
        question: 'How do I book a refill cylinder without automated phone IVR delays?',
        answer:
          'Simply tap our WhatsApp link or message +91 96520 09647 with your locality or landmark. Our shop desk responds directly to confirm stock, pricing, and your priority delivery slot—no automated robotic menus.',
      },
      {
        question: 'What cylinder sizes can I order for refill?',
        answer:
          'We supply 14.2 kg standard domestic cylinders for household cooking, 19 kg commercial high-volume cylinders for restaurants, hotels, and caterers, as well as 5 kg portable mini cylinders for bachelors and students.',
      },
      {
        question: 'What should I do if the seal or safety cap on the cylinder is damaged?',
        answer:
          'Do not accept a cylinder if the safety seal is torn or missing. Every genuine cylinder dispatched from Sri Mahalakshmi Super Gas Agency features an intact holographic tamper-evident seal and protective plastic valve cap. Our delivery person will swap it immediately.',
      },
    ],
  },

  'stove-repair': {
    badge: 'Stove Repair FAQs',
    title: 'Frequently Asked Questions — Stove Repair & Servicing',
    description:
      'Clear details about our fixed ₹200 inspection visit, burner carbon cleaning, blue flame restoration, genuine spare parts, and emergency leak checks.',
    faqs: [
      {
        question: 'How much does a doorstep gas stove inspection visit cost?',
        answer:
          'We maintain fixed, transparent pricing: exactly ₹200 technician visit and diagnostic inspection charge anywhere within our Gollaprolu service coverage area. If any replacement spare parts are needed, they are quoted upfront before installation.',
      },
      {
        question: 'Why is my stove producing a yellow flame and black soot on utensils?',
        answer:
          'Yellow flames and black carbon residue happen when burner ports are choked with food grease or when the venturi air-to-gas ratio is misaligned. Our technician dismantles, cleans, and calibrates the burners to restore an efficient, clean-burning crisp blue flame.',
      },
      {
        question: 'Do your technicians carry genuine spare parts during the visit?',
        answer:
          'Yes. Our technician travels with an in-stock spare kit containing heavy brass burners, precision jet pins, rotary control switch knobs, pan support stands, O-ring washers, and steel wiremesh safety hoses.',
      },
      {
        question: 'What should I do immediately if I smell gas around my stove or regulator?',
        answer:
          'Immediately turn OFF the cylinder regulator switch. Open all kitchen doors and windows for ventilation. Do NOT touch any electrical switches or light matches. Call our counter desk hotline (+91 96520 09647) immediately for urgent technician dispatch.',
      },
      {
        question: 'Can the technician replace worn or expired safety hoses during the visit?',
        answer:
          'Yes. Gas hoses should be replaced every 2–3 years or immediately if stiff or cracked. Our technician carries ISI-certified steel-wire braided safety hoses that resist rat bites and withstand high pressure, fitting them safely on the spot.',
      },
    ],
  },
};

interface ServiceFAQProps {
  slug: string;
  serviceTitle: string;
}

export const ServiceFAQ: React.FC<ServiceFAQProps> = ({ slug, serviceTitle }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqData = SERVICE_FAQS[slug] || SERVICE_FAQS['new-connection'];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="section-padding faq-section service-faq-section" id="service-faq" aria-label={`${serviceTitle} FAQs`}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header text-center">
          <span className="section-badge">
            <HelpCircle size={14} />
            <span>{faqData.badge}</span>
          </span>
          <h2 className="section-title">
            {faqData.title}
          </h2>
          <p className="section-description">
            {faqData.description}
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="faq-accordion-wrap">
          {faqData.faqs.map((faq, index) => {
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
                  id={`service-faq-btn-${index}`}
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
