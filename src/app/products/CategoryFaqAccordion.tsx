'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

interface CategoryFaqAccordionProps {
  title: string;
  faqs: { question: string; answer: string }[];
}

export const CategoryFaqAccordion: React.FC<CategoryFaqAccordionProps> = ({
  title,
  faqs
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="category-faq-section section-padding">
      <div className="container">
        <div className="section-header text-center" style={{ marginBottom: '2.5rem' }}>
          <span className="section-badge">
            <HelpCircle size={14} />
            <span>EXPERT ANSWERS</span>
          </span>
          <h2 className="section-title">{title}</h2>
          <p className="section-subtitle">
            Frequently asked questions about safety, fitting, delivery, and pricing.
          </p>
        </div>

        <div className="faq-list-wrap" style={{ maxWidth: '820px', margin: '0 auto' }}>
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`faq-item-card ${isOpen ? 'active' : ''}`}
                style={{
                  background: '#ffffff',
                  borderRadius: '14px',
                  marginBottom: '1rem',
                  border: '1px solid #e2e8f0',
                  boxShadow: isOpen ? '0 8px 24px rgba(15,23,42,0.06)' : 'none',
                  overflow: 'hidden',
                  transition: 'all 0.2s ease',
                }}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="faq-question-btn"
                  style={{
                    width: '100%',
                    padding: '1.25rem 1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.05rem',
                    fontWeight: 600,
                    color: isOpen ? '#dc2626' : '#0f172a',
                  }}
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    size={18}
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.25s ease',
                      flexShrink: 0,
                      color: isOpen ? '#dc2626' : '#64748b',
                    }}
                  />
                </button>

                {isOpen && (
                  <div
                    className="faq-answer-body"
                    style={{
                      padding: '0 1.5rem 1.35rem',
                      color: '#475569',
                      fontSize: '0.96rem',
                      lineHeight: '1.65',
                      borderTop: '1px solid #f1f5f9',
                      paddingTop: '1rem',
                    }}
                  >
                    {faq.answer}
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
