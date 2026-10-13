'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Camera, Eye, X, MessageCircle } from 'lucide-react';
import { createWhatsAppLink } from '../config/businessData';

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
}

const GALLERY_ITEMS_LEFT: GalleryItem[] = [
  {
    id: 'counter',
    title: 'Customer Service Counter',
    category: 'Agency Desk',
    image: '/images/agency_counter.jpg',
    description: 'Walk-in customer consultation desk for domestic LPG bookings and new connection inquiries.',
  },
  {
    id: 'cylinders',
    title: 'Domestic LPG Cylinders',
    category: 'Cooking Gas',
    image: '/images/cylinder.jpg',
    description: 'Certified domestic red cooking gas cylinders stored with safety cap and seal intact.',
  },
];

const GALLERY_ITEMS_RIGHT: GalleryItem[] = [
  {
    id: 'stoves',
    title: 'High-Efficiency Gas Stoves',
    category: 'Stoves & Cooktops',
    image: '/images/stove.jpg',
    description: 'Toughened glass top models with high-thermal efficiency solid brass burners.',
  },
  {
    id: 'accessories',
    title: 'Certified Safety Accessories',
    category: 'Safety Spares',
    image: '/images/accessories.jpg',
    description: 'ISI-approved domestic regulators, steel wire-braided safety rubber hoses, and cylinder trolleys.',
  },
  {
    id: 'repairs',
    title: 'Stove Maintenance & Servicing',
    category: 'Expert Repairs',
    image: '/images/repair.jpg',
    description: 'Technical repair workbench for gas flame calibration, burner unclogging, and safety tests.',
  },
];

export const Gallery: React.FC = () => {
  const [activeModalItem, setActiveModalItem] = useState<GalleryItem | null>(null);

  const renderMosaicTile = (item: GalleryItem, isLeftSquare: boolean) => (
    <div
      key={item.id}
      className={`gallery-mosaic-item ${isLeftSquare ? 'is-square' : 'is-landscape'}`}
      onClick={() => setActiveModalItem(item)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          setActiveModalItem(item);
        }
      }}
      aria-label={`View ${item.title}`}
    >
      <Image
        src={item.image}
        alt={item.title}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="gallery-mosaic-img"
      />
      <div className="gallery-mosaic-hover-hint">
        <span className="gallery-mosaic-eye">
          <Eye size={22} />
        </span>
      </div>
    </div>
  );

  return (
    <section className="section-padding gallery-section" id="gallery">
      <div className="container">
        
        <div className="section-header text-center">
          <span className="section-badge">
            <Camera size={14} />
            <span>Store &amp; Work Showcase</span>
          </span>
          <h2 className="section-title">
            Our Agency &amp; Service Gallery
          </h2>
          <p className="section-description">
            Take a look at our customer desk, cooking gas cylinders, certified accessories, and expert maintenance work.
          </p>
        </div>

        {/* 5-Item Mosaic Grid matching reference (2 squares on left, 3 landscape on right) */}
        <div className="gallery-mosaic-grid">
          <div className="gallery-mosaic-col gallery-mosaic-col-left">
            {GALLERY_ITEMS_LEFT.map((item) => renderMosaicTile(item, true))}
          </div>
          <div className="gallery-mosaic-col gallery-mosaic-col-right">
            {GALLERY_ITEMS_RIGHT.map((item) => renderMosaicTile(item, false))}
          </div>
        </div>

        {/* Lightbox Modal */}
        {activeModalItem && (
          <div 
            className="gallery-lightbox-overlay" 
            onClick={() => setActiveModalItem(null)}
            role="dialog"
            aria-modal="true"
          >
            <div 
              className="gallery-lightbox-content" 
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                type="button" 
                className="lightbox-close-btn"
                onClick={() => setActiveModalItem(null)}
                aria-label="Close modal"
              >
                <X size={24} />
              </button>

              <div className="lightbox-img-wrap">
                <Image
                  src={activeModalItem.image}
                  alt={activeModalItem.title}
                  width={720}
                  height={480}
                  className="lightbox-img"
                />
              </div>

              <div className="lightbox-details">
                <span className="lightbox-category">{activeModalItem.category}</span>
                <h3 className="lightbox-title">{activeModalItem.title}</h3>
                <p className="lightbox-desc">{activeModalItem.description}</p>

                <div className="lightbox-actions">
                  <a
                    href={createWhatsAppLink(`Hello, I am interested in: ${activeModalItem.title}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp"
                  >
                    <MessageCircle size={16} />
                    <span>Enquire on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
