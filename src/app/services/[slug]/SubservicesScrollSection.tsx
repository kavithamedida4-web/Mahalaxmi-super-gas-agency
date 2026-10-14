'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { SubServiceItem } from '@/config/businessData';

interface SubservicesScrollSectionProps {
  subServices: SubServiceItem[];
  defaultImage: string;
}

export const SubservicesScrollSection: React.FC<SubservicesScrollSectionProps> = ({
  subServices,
  defaultImage,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const overflow = scrollWidth > clientWidth + 4;
    setHasOverflow(overflow);
    setCanScrollLeft(scrollLeft > 8);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 8);
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
  }, [checkScroll, subServices]);

  const handleScroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = 340;
    el.scrollBy({
      left: dir === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const isFew = subServices.length <= 2;
  const showControls = subServices.length > 1;

  return (
    <div className="subservices-horizontal-section">
      {/* Left Navigation Arrow (<) */}
      {showControls && (
        <button
          type="button"
          className={`subservices-slider-btn subservices-slider-btn-prev ${!canScrollLeft ? 'disabled' : ''}`}
          onClick={() => handleScroll('left')}
          disabled={!canScrollLeft}
          aria-label="Previous service options"
          title="Previous options"
        >
          <ChevronLeft size={22} strokeWidth={2.5} />
        </button>
      )}

      {/* Horizontal Scroll Track */}
      <div
        ref={scrollRef}
        className={`subservices-scroll-track ${isFew ? 'center-few' : ''}`}
      >
        {subServices.map((sub) => {
          const cardImg = sub.image || defaultImage || '/images/cylinder.jpg';
          const displayPrice = sub.price || sub.badge || 'Available';
          const badgeText = sub.discountBadge || sub.badge || null;

          return (
            <div
              key={sub.id}
              className="bestseller-card"
              id={`subservice-card-${sub.id}`}
            >
              {/* 1. Square Image Wrap with Clean Studio Backdrop */}
              <div className="bestseller-img-wrap">
                <Image
                  src={cardImg}
                  alt={sub.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  className="bestseller-img"
                  style={{ objectFit: 'cover' }}
                  unoptimized
                />

                {/* Bright Red Discount / Status Badge in Top-Right */}
                {badgeText && (
                  <span className="bestseller-badge">
                    {badgeText}
                  </span>
                )}
              </div>

              {/* 2. Product Name & Bright Red Price Line */}
              <div className="bestseller-info-row">
                <h3 className="bestseller-title" title={sub.name}>
                  {sub.name}
                </h3>
                <span className="bestseller-price">
                  {displayPrice}
                </span>
              </div>

              {/* 3. Subservice Description */}
              {(sub.description || sub.tagline) && (
                <p className="bestseller-desc" title={sub.description || sub.tagline}>
                  {sub.description || sub.tagline}
                </p>
              )}

              {/* 4. Full Width Bold Bright Red Button: BOOK NOW > */}
              <Link
                href="/contact"
                className="bestseller-action-btn"
                id={`subservice-book-now-${sub.id}`}
                aria-label={`Book ${sub.name} on Contact page`}
              >
                <span>BOOK NOW</span>
                <ChevronRight size={15} strokeWidth={2.8} />
              </Link>
            </div>
          );
        })}
      </div>

      {/* Right Navigation Arrow (>) */}
      {showControls && (
        <button
          type="button"
          className={`subservices-slider-btn subservices-slider-btn-next ${!canScrollRight ? 'disabled' : ''}`}
          onClick={() => handleScroll('right')}
          disabled={!canScrollRight}
          aria-label="Next service options"
          title="Next options"
        >
          <ChevronRight size={22} strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
};

