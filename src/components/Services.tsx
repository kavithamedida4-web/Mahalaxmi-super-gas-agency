'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Flame,
  Repeat,
  Wrench,
  MessageCircle,
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { SERVICES, createWhatsAppLink } from '../config/businessData';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Flame,
  Repeat,
  Wrench,
};

export const Services: React.FC = () => {
  // Card 0 is active by default (matching the reference image), and hover/scroll switches the active card
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);

    const cards = el.querySelectorAll<HTMLElement>('.service-arch-card');
    if (cards.length > 0) {
      const cardWidth = cards[0].offsetWidth + 18; // width + gap
      const newIndex = Math.round(scrollLeft / cardWidth);
      const clamped = Math.max(0, Math.min(SERVICES.length - 1, newIndex));
      setActiveSlide(clamped);
    }
  }, []);

  useEffect(() => {
    checkScroll();
    const timer = setTimeout(checkScroll, 150);
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll, { passive: true });
    }
    window.addEventListener('resize', checkScroll);
    return () => {
      clearTimeout(timer);
      if (el) {
        el.removeEventListener('scroll', checkScroll);
      }
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll]);

  const scrollToSlide = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cards = el.querySelectorAll<HTMLElement>('.service-arch-card');
    if (cards[index]) {
      cards[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
      setActiveSlide(index);
    }
  };

  const handlePrev = () => {
    const el = scrollRef.current;
    if (!el) return;
    const cards = el.querySelectorAll<HTMLElement>('.service-arch-card');
    const target = Math.max(0, activeSlide - 1);
    if (cards[target]) {
      cards[target].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
      setActiveSlide(target);
    } else {
      el.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    const el = scrollRef.current;
    if (!el) return;
    const cards = el.querySelectorAll<HTMLElement>('.service-arch-card');
    const target = Math.min(SERVICES.length - 1, activeSlide + 1);
    if (cards[target]) {
      cards[target].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
      setActiveSlide(target);
    } else {
      el.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <section className="services-section-arch" id="services">
      <div className="container">
        
        {/* Top Header Row matching Reference Design */}
        <div className="service-arch-header-row">
          <div className="service-arch-header-left">
            <div className="service-arch-tag">
              <Flame size={15} className="service-arch-tag-icon" />
              <span>OUR SERVICES</span>
            </div>
            <h2 className="service-arch-h2">
              Reliable Cooking Gas &amp; Stove Services
            </h2>
          </div>

          <Link href="/services/new-connection" className="service-arch-header-btn" id="view-all-services-btn">
            <span>EXPLORE SERVICES</span>
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* 3 Cards Grid / Mobile Horizontal Scroll with Chamfered Bottom-Right Corners */}
        <div 
          ref={scrollRef}
          className="service-arch-grid"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {SERVICES.map((service, index) => {
            const IconComponent = iconMap[service.iconName] || Flame;
            const waUrl = service.whatsAppMessage?.startsWith('http')
              ? service.whatsAppMessage
              : createWhatsAppLink(service.whatsAppMessage);

            // Active when hovered on desktop, or activeSlide on mobile, defaulting to Card 0
            const isActive = hoveredIndex !== null ? hoveredIndex === index : activeSlide === index;

            return (
              <div 
                key={service.id} 
                className="service-arch-card"
                onMouseEnter={() => setHoveredIndex(index)}
              >
                {/* Top Image Banner */}
                <Link href={`/services/${service.id}`} className="service-arch-image-wrap">
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={480}
                    height={320}
                    className="service-arch-img"
                  />
                </Link>

                {/* Overlapping Content Box with Chamfered Cut-Corner */}
                <div className="service-arch-body-shadow">
                  <div className={`service-arch-body ${isActive ? 'active' : 'inactive'}`}>
                    {/* Card Title */}
                    <h3 className="service-arch-title">
                      <Link href={`/services/${service.id}`} className="service-arch-title-link">
                        {service.title}
                      </Link>
                    </h3>

                    {/* Subtitle Line */}
                    <span className="service-arch-subtitle">
                      {service.subtitle}
                    </span>

                    {/* Description Paragraph */}
                    <p className="service-arch-desc">
                      {service.description}
                    </p>

                    {/* Bottom Action Row */}
                    <div className="service-arch-actions">
                      <Link
                        href={`/services/${service.id}`}
                        className="service-arch-read-more"
                        id={`service-readmore-${service.id}`}
                        aria-label={`Read more about ${service.title}`}
                      >
                        <span>READ MORE</span>
                        <ArrowRight size={13} />
                      </Link>

                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="service-arch-wa-btn"
                        id={`service-wa-${service.id}`}
                        aria-label={`Enquire about ${service.title} on WhatsApp`}
                      >
                        <MessageCircle size={14} />
                        <span>WhatsApp</span>
                      </a>
                    </div>

                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Mobile Navigation with < > Arrows and Position Dots */}
        <div className="service-arch-mobile-dots" aria-label="Services carousel navigation">
          <button
            type="button"
            className={`section-bottom-arrow ${!canScrollLeft ? 'disabled' : ''}`}
            onClick={handlePrev}
            disabled={!canScrollLeft}
            aria-label="Previous service"
            id="services-mobile-prev"
          >
            <ChevronLeft size={18} strokeWidth={2.6} />
          </button>

          <div className="service-arch-dots-group">
            {SERVICES.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`service-arch-dot ${activeSlide === i ? 'active' : ''}`}
                onClick={() => scrollToSlide(i)}
                aria-label={`Go to service ${i + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            className={`section-bottom-arrow ${!canScrollRight ? 'disabled' : ''}`}
            onClick={handleNext}
            disabled={!canScrollRight}
            aria-label="Next service"
            id="services-mobile-next"
          >
            <ChevronRight size={18} strokeWidth={2.6} />
          </button>
        </div>

      </div>
    </section>
  );
};


