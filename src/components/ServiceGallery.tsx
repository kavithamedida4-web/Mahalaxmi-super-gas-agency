'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Camera, Eye, X, MessageCircle } from 'lucide-react';
import { createWhatsAppLink } from '@/config/businessData';

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
}

interface ServiceGalleryData {
  badge: string;
  title: string;
  description: string;
  leftItems: GalleryItem[];
  rightItems: GalleryItem[];
}

const SERVICE_GALLERIES: Record<string, ServiceGalleryData> = {
  'new-connection': {
    badge: 'New Connection Showcase',
    title: 'Our Connection & Installation Gallery',
    description:
      'Take a look at our authorized domestic cylinders, storefront desk, verified delivery fleet, and doorstep setup in Kondapur, Hyderabad.',
    leftItems: [
      {
        id: 'nc-1',
        title: 'Authorized SUPERGAS Agency Storefront',
        category: 'Walk-In Booking Desk',
        image: '/images/gallery_supergas_storefront.jpg',
        description:
          'Official Sri Mahalakshmi SUPERGAS agency storefront with walk-in customer booking desk and new connection support in Kondapur.',
      },
      {
        id: 'nc-2',
        title: 'Express Doorstep Connection Delivery',
        category: 'Doorstep Handover',
        image: '/images/gallery_delivery_rider_bike.jpg',
        description:
          'Dedicated delivery technician on TVS XL moped delivering new domestic cylinders and connection kit directly to customer homes.',
      },
      {
        id: 'nc-3',
        title: 'Genuine Sealed Cylinder Delivery in Action',
        category: 'Prompt Delivery Fleet',
        image: '/images/gallery_cylinder_delivery_action.jpg',
        description:
          'Doorstep delivery executive carrying factory-sealed cylinders for prompt new domestic installation in Kondapur.',
      },
    ],
    rightItems: [
      {
        id: 'nc-4',
        title: 'Official SUPERGAS Signboard & Booking Desk',
        category: 'Official Agency Desk',
        image: '/images/gallery_supergas_signboard.jpg',
        description:
          'Official authorized agency board displaying new connections and booking hotlines: 9652009647 / 7993009647.',
      },
      {
        id: 'nc-5',
        title: 'Verified Delivery Executive & Cylinders',
        category: 'Safety & Verification',
        image: '/images/gallery_delivery_executive_front.jpg',
        description:
          'Trained delivery personnel equipped with certified domestic cylinders for prompt doorstep handoff and safety setup.',
      },
      {
        id: 'nc-6',
        title: 'Doorstep Installation & Safety Demo Fleet',
        category: 'Dispatch Ready Fleet',
        image: '/images/gallery_delivery_bike_dispatch.jpg',
        description:
          'Certified delivery fleet equipped to mount the regulator, conduct joint leak checks, and demonstrate safe flame ignition.',
      },
    ],
  },

  'cylinder-refill': {
    badge: 'Cylinder Refill Showcase',
    title: 'Refill Delivery & Verification Gallery',
    description:
      'Take a look at our authentic on-road cylinder delivery fleet, verified delivery executives, and doorstep service across Kondapur, Hyderabad.',
    leftItems: [
      {
        id: 'rf-1',
        title: '30-Minute Priority Refill Delivery',
        category: 'Doorstep Delivery',
        image: '/images/gallery_cylinder_delivery_action.jpg',
        description:
          'Dedicated local delivery personnel carrying genuine sealed domestic cylinders directly to your kitchen across Kondapur.',
      },
      {
        id: 'rf-2',
        title: 'Express Doorstep Moped Delivery in Transit',
        category: 'On-Road Delivery Fleet',
        image: '/images/gallery_delivery_rider_bike.jpg',
        description:
          'Authentic delivery executive on TVS XL moped transporting dual domestic LPG cylinders for prompt doorstep refill delivery.',
      },
      {
        id: 'rf-3',
        title: 'Authorized SUPERGAS Distribution Hub',
        category: 'Agency Storefront',
        image: '/images/gallery_supergas_storefront.jpg',
        description:
          'Sri Mahalakshmi SUPERGAS authorized agency storefront with walk-in customer booking desk and cylinder distribution in Kondapur.',
      },
    ],
    rightItems: [
      {
        id: 'rf-4',
        title: 'Doorstep Digital Tare Weight Check',
        category: 'Weight Verification',
        image: '/images/gallery_delivery_executive_front.jpg',
        description:
          'Every refill cylinder is verified on calibrated digital weighing scales at your doorstep to guarantee 100% accurate net cooking gas.',
      },
      {
        id: 'rf-5',
        title: 'Rapid Cylinder Delivery Fleet in Transit',
        category: 'Express Dispatch Fleet',
        image: '/images/gallery_delivery_bike_dispatch.jpg',
        description:
          'Express LPG cylinder refill delivery vehicle ready for dispatch to homes and commercial kitchens across Kondapur.',
      },
      {
        id: 'rf-6',
        title: 'Official SUPERGAS Signboard & Contact Hotline',
        category: 'Booking Hotlines',
        image: '/images/gallery_supergas_signboard.jpg',
        description:
          'Authorized Sri Mahalakshmi SUPERGAS helpdesk and refill booking contact board: 9652009647 / 7993009647.',
      },
    ],
  },

  'stove-repair': {
    badge: 'Stove Repair Showcase',
    title: 'Stove Repair & Servicing Gallery',
    description:
      'Take a look at our authentic agency repair counter, verified doorstep service technician, express dispatch fleet, and prompt servicing across Kondapur.',
    leftItems: [
      {
        id: 'sr-1',
        title: 'Authorized SUPERGAS Service & Booking Counter',
        category: 'Walk-In Service Desk',
        image: '/images/gallery_supergas_storefront.jpg',
        description:
          'Official Sri Mahalakshmi SUPERGAS agency storefront with walk-in repair drop-off, stove servicing assistance, and booking desk in Kondapur.',
      },
      {
        id: 'sr-2',
        title: 'Verified Doorstep Service Executive',
        category: 'Trained Technician',
        image: '/images/gallery_delivery_executive_front.jpg',
        description:
          'Trained agency service personnel equipped for kitchen platform visits, burner unclogging, valve maintenance, and leak testing.',
      },
      {
        id: 'sr-3',
        title: 'Express Doorstep Service Technician Fleet',
        category: 'Rapid Mobile Transit',
        image: '/images/gallery_delivery_rider_bike.jpg',
        description:
          'Dedicated technician on TVS XL moped for speedy doorstep kitchen visits, low flame repair, and emergency gas servicing across Kondapur.',
      },
    ],
    rightItems: [
      {
        id: 'sr-4',
        title: 'Official Authorized Agency Board & Service Hotline',
        category: 'Direct Helpdesk',
        image: '/images/gallery_supergas_signboard.jpg',
        description:
          'Official authorized agency board displaying direct service hotlines: 9652009647 / 7993009647 for instant ₹200 technician booking.',
      },
      {
        id: 'sr-5',
        title: 'Rapid Service Dispatch Vehicle & Toolkit',
        category: 'Express Dispatch',
        image: '/images/gallery_delivery_bike_dispatch.jpg',
        description:
          'Express doorstep servicing vehicle equipped with genuine brass spares, jet pins, and calibrated joint leak testing tools.',
      },
      {
        id: 'sr-6',
        title: 'Doorstep Safety Inspection & Installation Fleet',
        category: 'On-Site Safety Work',
        image: '/images/gallery_cylinder_delivery_action.jpg',
        description:
          'Comprehensive doorstep stove pressure checking, tare weight verification, burner soot cleaning, and safety certification.',
      },
    ],
  },
};

interface ServiceGalleryProps {
  slug: string;
  serviceTitle: string;
}

export const ServiceGallery: React.FC<ServiceGalleryProps> = ({ slug, serviceTitle }) => {
  const [activeModalItem, setActiveModalItem] = useState<GalleryItem | null>(null);

  const galleryData = SERVICE_GALLERIES[slug] || SERVICE_GALLERIES['new-connection'];

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
    <section className="section-padding gallery-section" id="service-gallery" aria-label={`${serviceTitle} Gallery`}>
      <div className="container">
        
        {/* Section Header matching Home Design */}
        <div className="section-header text-center">
          <span className="section-badge">
            <Camera size={14} />
            <span>{galleryData.badge}</span>
          </span>
          <h2 className="section-title">
            {galleryData.title}
          </h2>
          <p className="section-description">
            {galleryData.description}
          </p>
        </div>

        {/* 5-Item Mosaic Grid matching Home Design (2 squares on left, 3 landscape on right, NO text on images) */}
        <div className="gallery-mosaic-grid">
          <div className="gallery-mosaic-col gallery-mosaic-col-left">
            {galleryData.leftItems.map((item) => renderMosaicTile(item, true))}
          </div>
          <div className="gallery-mosaic-col gallery-mosaic-col-right">
            {galleryData.rightItems.map((item) => renderMosaicTile(item, false))}
          </div>
        </div>

        {/* Lightbox Modal matching Home Design */}
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
                    href={createWhatsAppLink(
                      `Hello Sri Mahalakshmi Super Gas, I am inquiring about "${activeModalItem.title}" (${activeModalItem.category}) for ${serviceTitle}. Please share details.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp"
                    id={`wa-gallery-${activeModalItem.id}`}
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
