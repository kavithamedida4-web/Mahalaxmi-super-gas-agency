'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Star, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  quote: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'Rajeshwar G.',
    location: 'Main Road, Gollaprolu',
    quote:
      'Prompt domestic cylinder delivery within a couple of hours of booking! The delivery specialist verified cylinder weight on the spot and made sure the tamper-evident seal and safety cap were completely intact. Extremely dependable service.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Kiran K.',
    location: 'Chebrolu Road Area',
    quote:
      'Our double-burner gas stove had severe yellow flame and low pressure issues. Their technician arrived the same afternoon, dismantled and cleaned the burners, replaced the worn washer, and tested everything for ₹200 only. Flame is crisp blue now!',
    rating: 5,
  },
  {
    id: 3,
    name: 'Sandhya Y.',
    location: 'Tatiparthi Route, Gollaprolu',
    quote:
      'Got our new domestic cooking gas connection setup with zero hassle. They provided an authentic ISI-certified steel wiremesh safety hose pipe, high-pressure brass regulator, and completed the doorstep inspection smoothly.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Venkateswara Rao M.',
    location: 'Station Road, Gollaprolu',
    quote:
      'Booking through WhatsApp directly with the agency desk is a lifesaver. No confusing automated telephone IVR menus. I just message my consumer details and the refill cylinder arrives right at my doorstep on time.',
    rating: 5,
  },
  {
    id: 5,
    name: 'Srinivasa Reddy P.',
    location: 'Gollaprolu Bypass',
    quote:
      'We run a busy food catering kitchen and regular fuel supply is critical. Sri Mahalakshmi Super Gas ensures our commercial cylinders are dispatched on priority without unexpected delays. Highly professional team.',
    rating: 5,
  },
  {
    id: 6,
    name: 'Lakshmi Prasanna D.',
    location: 'Durgada Surrounding',
    quote:
      'Had a mild smell around the regulator valve one evening. Called their customer helpline and their technician was at our house in 20 minutes to replace the damaged rubber O-ring. True peace of mind for our family.',
    rating: 5,
  },
];

export const Testimonials: React.FC = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);

  // Responsive cards per page calculation
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerPage(2);
      } else {
        setCardsPerPage(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, TESTIMONIALS.length - cardsPerPage);

  const handlePrev = () => {
    setStartIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  const visibleTestimonials = TESTIMONIALS.slice(startIndex, startIndex + cardsPerPage);

  // In case slice is smaller than cardsPerPage when wrapping
  if (visibleTestimonials.length < cardsPerPage) {
    visibleTestimonials.push(...TESTIMONIALS.slice(0, cardsPerPage - visibleTestimonials.length));
  }

  return (
    <section className="testimonial-ref-section" id="testimonials" aria-label="Customer Reviews">
      <div className="container">
        
        {/* Section Header (Matching Reference Design) */}
        <div className="testimonial-ref-header">
          <div className="testimonial-pill-badge">
            <span>CUSTOMER REVIEWS</span>
          </div>

          <h2 className="testimonial-ref-title">
            What Our Customers <span className="title-highlight">Say</span>
          </h2>

          <p className="testimonial-ref-sub">
            Read real feedback from households, eateries, and satisfied families across Gollaprolu who trust us for uninterrupted cooking gas and certified stove maintenance.
          </p>
        </div>

        {/* Carousel Container with Left/Right Arrow Navigation */}
        <div className="testimonial-carousel-wrapper" ref={containerRef}>
          
          {/* Left Arrow Button */}
          <button
            type="button"
            className="carousel-arrow-btn prev-btn"
            onClick={handlePrev}
            aria-label="Previous customer testimonials"
            id="testimonial-prev-button"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Cards Grid */}
          <div className="testimonial-cards-grid">
            {visibleTestimonials.map((item, index) => (
              <div key={`${item.id}-${index}`} className="testimonial-card">
                
                {/* Top Row: 5 Gold Stars & Verified Badge */}
                <div className="card-top-row">
                  <div className="card-stars-row" aria-label="5 out of 5 stars">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star
                        key={i}
                        size={15}
                        className="card-star-icon"
                        fill="#f59e0b"
                        color="#f59e0b"
                      />
                    ))}
                  </div>

                  <span className="card-verified-badge">
                    <CheckCircle2 size={13} className="verified-check-icon" />
                    <span>VERIFIED</span>
                  </span>
                </div>

                {/* Review Quote Body */}
                <p className="card-quote-text">
                  &ldquo;{item.quote}&rdquo;
                </p>

                {/* Bottom Customer Info */}
                <div className="card-author-info">
                  <h3 className="card-author-name">{item.name}</h3>
                  <span className="card-author-locality">{item.location}</span>
                </div>

              </div>
            ))}
          </div>

          {/* Right Arrow Button */}
          <button
            type="button"
            className="carousel-arrow-btn next-btn"
            onClick={handleNext}
            aria-label="Next customer testimonials"
            id="testimonial-next-button"
          >
            <ChevronRight size={20} />
          </button>

        </div>

      </div>
    </section>
  );
};
