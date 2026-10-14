'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Flame,
  ShieldCheck,
  Wrench,
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface ProductShowcaseItem {
  id: string;
  name: string;
  description: string;
  image: string;
  targetUrl: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

export const Products: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const showcaseProducts: ProductShowcaseItem[] = [
    {
      id: 'gas-stoves-bhattis',
      name: 'Gas Stoves & Bhattis',
      description: '2-Burner steel & toughened glass cooktops, and commercial bhattis.',
      image: '/images/stove.jpg',
      targetUrl: '/products?category=stoves',
      icon: Flame,
    },
    {
      id: 'supergas-regulators-hoses',
      name: 'Supergas Regulators & Hoses',
      description: 'Certified leak-proof regulators and 3-layer steel wiremesh safety pipes.',
      image: '/images/regulator_supergas.jpg',
      targetUrl: '/products?category=regulators-hoses',
      icon: ShieldCheck,
    },
    {
      id: 'burners-knobs-pins',
      name: 'Burners, Knobs & Jet Pins',
      description: 'Heavy replacement brass burners, universal switch knobs, and pan stands.',
      image: '/images/burners_knobs_pins.jpg',
      targetUrl: '/products?category=burners-spares',
      icon: Wrench,
    },
  ];

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);

    const cards = el.querySelectorAll<HTMLElement>('.product-ref-card');
    if (cards.length > 0) {
      const cardWidth = cards[0].offsetWidth + 18; // width + gap
      const newIndex = Math.round(scrollLeft / cardWidth);
      const clamped = Math.max(0, Math.min(showcaseProducts.length - 1, newIndex));
      setActiveSlide(clamped);
    }
  }, [showcaseProducts.length]);

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
    const cards = el.querySelectorAll<HTMLElement>('.product-ref-card');
    if (cards[index]) {
      cards[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
      setActiveSlide(index);
    }
  };

  const handlePrev = () => {
    const el = scrollRef.current;
    if (!el) return;
    const cards = el.querySelectorAll<HTMLElement>('.product-ref-card');
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
    const cards = el.querySelectorAll<HTMLElement>('.product-ref-card');
    const target = Math.min(showcaseProducts.length - 1, activeSlide + 1);
    if (cards[target]) {
      cards[target].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
      setActiveSlide(target);
    } else {
      el.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <section className="section-padding products-section-ref" id="products">
      <div className="container">
        
        {/* Section Header matching User Reference Design */}
        <div className="product-ref-header text-center">
          <div className="product-ref-tag">
            <Flame size={14} className="product-ref-tag-icon" />
            <span>OUR PRODUCTS</span>
          </div>
          <h2 className="product-ref-title-main">
            Stoves &amp; Certified <span className="title-highlight">Spare Parts</span>
          </h2>
        </div>

        {/* 3 Showcase Product Cards matching User Reference Design with Horizontal Scroll on Mobile */}
        <div className="product-carousel-wrapper">
          {/* Mobile Floating Arrow (<) */}
          <button
            type="button"
            className={`section-mobile-arrow section-mobile-arrow-prev ${!canScrollLeft ? 'disabled' : ''}`}
            onClick={handlePrev}
            disabled={!canScrollLeft}
            aria-label="Previous product"
            id="products-mobile-prev"
          >
            <ChevronLeft size={20} strokeWidth={2.6} />
          </button>

          <div 
            ref={scrollRef}
            className="product-ref-grid"
          >
            {showcaseProducts.map((product) => {
              const Icon = product.icon;

              return (
                <Link
                  key={product.id}
                  href={product.targetUrl}
                  className="product-ref-card"
                  id={`card-${product.id}`}
                  aria-label={`Explore ${product.name}`}
                >
                  {/* Top Image Banner with Upward Arch Curve */}
                  <div className="product-ref-img-wrap">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={480}
                      height={300}
                      className="product-ref-img"
                    />
                    {/* Gentle upward curve matching reference design */}
                    <svg
                      className="product-ref-arc"
                      viewBox="0 0 500 40"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                    >
                      <path d="M 0 40 Q 250 4 500 40 L 500 41 L 0 41 Z" fill="#ffffff" />
                    </svg>
                  </div>

                  {/* Overlapping Rounded White Body with Centered Orange Circle */}
                  <div className="product-ref-body">
                    {/* Floating Circular Orange Badge on Center Seam */}
                    <div className="product-ref-icon-circle">
                      <Icon size={24} />
                    </div>

                    {/* Card Title */}
                    <h3 className="product-ref-card-title">
                      {product.name}
                    </h3>

                    {/* Concise Description matching Reference Screenshot */}
                    <p className="product-ref-card-desc">
                      {product.description}
                    </p>
                  </div>

                </Link>
              );
            })}
          </div>

          {/* Mobile Floating Arrow (>) */}
          <button
            type="button"
            className={`section-mobile-arrow section-mobile-arrow-next ${!canScrollRight ? 'disabled' : ''}`}
            onClick={handleNext}
            disabled={!canScrollRight}
            aria-label="Next product"
            id="products-mobile-next"
          >
            <ChevronRight size={20} strokeWidth={2.6} />
          </button>
        </div>

        {/* Mobile Swipe Indicators & Dots with < > arrows */}
        <div className="product-ref-mobile-dots" aria-label="Products carousel navigation">
          <button
            type="button"
            className={`section-bottom-arrow ${!canScrollLeft ? 'disabled' : ''}`}
            onClick={handlePrev}
            disabled={!canScrollLeft}
            aria-label="Previous product"
          >
            <ChevronLeft size={16} strokeWidth={2.4} />
          </button>

          <div className="product-ref-dots-group">
            {showcaseProducts.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`product-ref-dot ${activeSlide === i ? 'active' : ''}`}
                onClick={() => scrollToSlide(i)}
                aria-label={`Go to product ${i + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            className={`section-bottom-arrow ${!canScrollRight ? 'disabled' : ''}`}
            onClick={handleNext}
            disabled={!canScrollRight}
            aria-label="Next product"
          >
            <ChevronRight size={16} strokeWidth={2.4} />
          </button>
        </div>

        {/* View Full Products Page Button */}
        <div className="product-ref-footer-row text-center">
          <Link
            href="/products"
            className="btn btn-primary product-ref-all-btn"
            id="view-full-products-btn"
          >
            <span>View Full Products Page</span>
            <ArrowRight size={16} />
          </Link>
        </div>

      </div>
    </section>
  );
};
