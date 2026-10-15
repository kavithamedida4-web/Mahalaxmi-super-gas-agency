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
    id: 'storefront',
    title: 'Authorized SUPERGAS Agency Storefront',
    category: 'Agency & Storefront',
    image: '/images/gallery_supergas_storefront.jpg',
    description: 'Official Sri Mahalakshmi SUPERGAS agency storefront with walk-in customer booking desk and new connections in Kondapur.',
  },
  {
    id: 'delivery-action',
    title: 'Doorstep LPG Cylinder Delivery',
    category: 'Prompt Gas Delivery',
    image: '/images/gallery_cylinder_delivery_action.jpg',
    description: 'Same-day doorstep LPG cylinder refill delivery across Kondapur with genuine safety seals and tare weight verification.',
  },
];

const GALLERY_ITEMS_RIGHT: GalleryItem[] = [
  {
    id: 'signboard',
    title: 'Official SUPERGAS Signboard & Booking Desk',
    category: 'Agency Desk',
    image: '/images/gallery_supergas_signboard.jpg',
    description: 'Official authorized agency board displaying new connections and booking hotlines: 9652009647 / 7993009647.',
  },
  {
    id: 'executive-front',
    title: 'Verified Delivery Executive & Cylinders',
    category: 'Safety & Delivery',
    image: '/images/gallery_delivery_executive_front.jpg',
    description: 'Trained delivery personnel equipped with certified domestic cylinders for prompt doorstep handoff in Kondapur.',
  },
  {
    id: 'bike-dispatch',
    title: 'Rapid Cylinder Delivery Fleet',
    category: 'Express Dispatch',
    image: '/images/gallery_delivery_bike_dispatch.jpg',
    description: 'Express LPG cylinder refill delivery vehicle ready for dispatch to homes and commercial kitchens.',
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
