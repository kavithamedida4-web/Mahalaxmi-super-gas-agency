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
      'Take a look at our authorized domestic cylinders, toughened glass stoves, certified accessories, and doorstep setup in Kondapur, Hyderabad.',
    leftItems: [
      {
        id: 'nc-1',
        title: 'Complete Domestic Connection Setup',
        category: 'New Connection Kit',
        image: '/images/services_brandblitz_new_connection.jpg',
        description:
          'Authorized Supergas domestic cylinder package bundled with a gas stove, certified regulator, safety rubber pipe, and spark lighter.',
      },
      {
        id: 'nc-2',
        title: 'Double Cylinder (DBC) Package',
        category: 'Dual Cylinder Set',
        image: '/images/double_cylinder.jpg',
        description:
          'Continuous dual-cylinder backup setup ensuring uninterrupted daily cooking for busy families without refill wait delays.',
      },
    ],
    rightItems: [
      {
        id: 'nc-3',
        title: 'Toughened Glass & Steel Cooktops',
        category: 'Gas Stoves Included',
        image: '/images/stove.jpg',
        description:
          'High-thermal efficiency 2-burner and 3-burner gas stoves with solid brass burners, provided directly with new connection packages.',
      },
      {
        id: 'nc-4',
        title: 'Certified Safety Regulator & Wiremesh Hose',
        category: 'Safety Accessories',
        image: '/images/accessories.jpg',
        description:
          'Heavy-duty rat-bite resistant steel-wire reinforced safety hose paired with an original Supergas authorized snap-on regulator.',
      },
      {
        id: 'nc-5',
        title: 'Doorstep Installation & Safety Demo',
        category: 'Doorstep Setup',
        image: '/images/gallery_delivery_bike_dispatch.jpg',
        description:
          'Certified delivery technician mounts the regulator, conducts thorough joint leak checks, and demonstrates safe flame ignition.',
      },
    ],
  },

  'cylinder-refill': {
    badge: 'Cylinder Refill Showcase',
    title: 'Refill Delivery & Verification Gallery',
    description:
      'Take a look at our tamper-evident sealed cylinders, digital tare weight verification, and doorstep delivery service across Kondapur, Hyderabad.',
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
        title: '14.2kg Refill with Tamper-Proof Seal',
        category: 'Domestic 14.2kg',
        image: '/images/refill_domestic_14kg.jpg',
        description:
          '100% genuine Supergas cylinder with intact holographic safety security seal and protective valve safety cap.',
      },
    ],
    rightItems: [
      {
        id: 'rf-3',
        title: 'Doorstep Digital Tare Weight Check',
        category: 'Weight Verification',
        image: '/images/gallery_delivery_executive_front.jpg',
        description:
          'Every refill cylinder is verified on calibrated digital weighing scales at your doorstep to guarantee 100% accurate net cooking gas.',
      },
      {
        id: 'rf-4',
        title: '19kg Commercial High-Volume Cylinders',
        category: 'Commercial Supply',
        image: '/images/refill_commercial_19kg.jpg',
        description:
          'Heavy-duty cylinders dispatched on priority for restaurants, hotels, catering kitchens, and outdoor food businesses.',
      },
      {
        id: 'rf-5',
        title: '5kg Portable Mini Cylinder Refill',
        category: 'Compact 5kg',
        image: '/images/refill_mini_5kg.jpg',
        description:
          'Lightweight easy-to-carry mini cylinders ideal for single professionals, bachelor rooms, students, and emergency backups.',
      },
    ],
  },

  'stove-repair': {
    badge: 'Stove Repair Showcase',
    title: 'Stove Repair & Servicing Gallery',
    description:
      'Take a look at our technician doorstep repairs, burner carbon cleaning, genuine spare parts, and flame calibration work.',
    leftItems: [
      {
        id: 'sr-1',
        title: 'Doorstep Diagnostic Visit & Inspection',
        category: 'Fixed ₹200 Visit',
        image: '/images/indian_stove_repair_clean.jpg',
        description:
          'Skilled gas stove technician inspects gas pressure, burner ports, and ignition switches at your kitchen platform.',
      },
      {
        id: 'sr-2',
        title: 'Burner Dismantling & Carbon Cleaning',
        category: 'Burner Servicing',
        image: '/images/subservice_burner_cleaning_v2.jpg',
        description:
          'Thorough clearing of stubborn food grease and carbon build-up from burner ports to restore full heating and stop black cookware soot.',
      },
    ],
    rightItems: [
      {
        id: 'sr-3',
        title: 'Original Brass Jet Pins & Switch Knobs',
        category: 'Genuine Spare Parts',
        image: '/images/subservice_knob_repair_v2.jpg',
        description:
          'In-stock replacement parts including solid brass jets, heat-resistant rotary switch knobs, pan supports, and rubber washers.',
      },
      {
        id: 'sr-4',
        title: 'Air-Gas Ratio & Venturi Calibration',
        category: 'Blue Flame Calibration',
        image: '/images/subservice_low_flame_v2.jpg',
        description:
          'Precision jet calibration and air-mix tuning to achieve maximum cooking heat, eliminating yellow flame and fuel waste.',
      },
      {
        id: 'sr-5',
        title: 'Comprehensive Gas Leak Safety Audit',
        category: 'Safety Leak Check',
        image: '/images/subservice_gas_leak_v2.jpg',
        description:
          'Regulator O-ring inspection, hose degradation check, and soapy solution leak test across all joints for complete family peace of mind.',
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
