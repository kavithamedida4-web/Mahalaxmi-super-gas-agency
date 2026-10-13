'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const GALLERY_IMAGES: string[] = [
  '/images/agency_counter.jpg',
  '/images/cylinder.jpg',
  '/images/double_cylinder.jpg',
  '/images/refill_domestic_14kg.jpg',
  '/images/refill_commercial_19kg.jpg',
  '/images/refill_mini_5kg.jpg',
  '/images/stove_glass_top.jpg',
  '/images/stove.jpg',
  '/images/stove_single_burner.jpg',
  '/images/stove_commercial_bhatti.jpg',
  '/images/accessories.jpg',
  '/images/regulator_supergas.jpg',
  '/images/safety_pipe_hose.jpg',
  '/images/burners_knobs_pins.jpg',
  '/images/repair.jpg',
  '/images/about_indian_delivery_doorstep.jpg',
];

export const GalleryPageClient: React.FC = () => {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeImageIndex === null) return;

      if (e.key === 'Escape') {
        setActiveImageIndex(null);
      } else if (e.key === 'ArrowRight') {
        setActiveImageIndex((prev) =>
          prev !== null ? (prev + 1) % GALLERY_IMAGES.length : 0
        );
      } else if (e.key === 'ArrowLeft') {
        setActiveImageIndex((prev) =>
          prev !== null ? (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length : 0
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImageIndex]);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageIndex === null) return;
    setActiveImageIndex((activeImageIndex + 1) % GALLERY_IMAGES.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageIndex === null) return;
    setActiveImageIndex(
      (activeImageIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length
    );
  };

  return (
    <div
      style={{
        minHeight: '85vh',
        backgroundColor: '#f8fafc',
        padding: '2rem 1rem 4rem 1rem',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
        }}
      >
        {/* Pure Image Grid - Only Images, No Content & No Text */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '1.25rem',
            width: '100%',
          }}
        >
          {GALLERY_IMAGES.map((imgSrc, index) => (
            <div
              key={`${imgSrc}-${index}`}
              onClick={() => setActiveImageIndex(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setActiveImageIndex(index);
                }
              }}
              aria-label={`Gallery photo ${index + 1}`}
              style={{
                position: 'relative',
                width: '100%',
                height: '240px',
                borderRadius: '14px',
                overflow: 'hidden',
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 14px rgba(15, 23, 42, 0.05)',
                cursor: 'pointer',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 14px 28px rgba(15, 23, 42, 0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 14px rgba(15, 23, 42, 0.05)';
              }}
            >
              <Image
                src={imgSrc}
                alt={`Sri Mahalakshmi Super Gas Agency gallery photo ${index + 1}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                style={{
                  objectFit: 'cover',
                  display: 'block',
                }}
                priority={index < 4}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Pure Image Lightbox Modal */}
      {activeImageIndex !== null && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.94)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
          onClick={() => setActiveImageIndex(null)}
          role="dialog"
          aria-modal="true"
        >
          {/* Close Button */}
          <button
            type="button"
            style={{
              position: 'absolute',
              top: '1.5rem',
              right: '1.5rem',
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.18)',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 100002,
              transition: 'background-color 0.2s ease, transform 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#dc2626';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.18)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
            onClick={() => setActiveImageIndex(null)}
            aria-label="Close"
          >
            <X size={26} />
          </button>

          {/* Previous Arrow */}
          <button
            type="button"
            style={{
              position: 'absolute',
              top: '50%',
              left: '1.5rem',
              transform: 'translateY(-50%)',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.18)',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 100001,
              transition: 'background-color 0.2s ease, transform 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#dc2626';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.18)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
            }}
            onClick={handlePrev}
            aria-label="Previous photo"
          >
            <ChevronLeft size={32} />
          </button>

          {/* Next Arrow */}
          <button
            type="button"
            style={{
              position: 'absolute',
              top: '50%',
              right: '1.5rem',
              transform: 'translateY(-50%)',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.18)',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 100001,
              transition: 'background-color 0.2s ease, transform 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#dc2626';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.18)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
            }}
            onClick={handleNext}
            aria-label="Next photo"
          >
            <ChevronRight size={32} />
          </button>

          {/* Centered Enlarged Image Container */}
          <div
            style={{
              position: 'relative',
              width: '85vw',
              height: '82vh',
              maxWidth: '1100px',
              borderRadius: '14px',
              overflow: 'hidden',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={GALLERY_IMAGES[activeImageIndex]}
              alt={`Gallery enlarged view photo ${activeImageIndex + 1}`}
              fill
              style={{
                objectFit: 'contain',
              }}
              priority
            />
          </div>
        </div>
      )}
    </div>
  );
};
