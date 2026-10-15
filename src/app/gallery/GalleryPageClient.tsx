'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Flame,
  Truck,
  ShoppingBag,
  ShieldCheck,
  Wrench,
} from 'lucide-react';

interface GalleryItem {
  id: string;
  image: string;
  category: string;
  badge: string;
  title: string;
  description: string;
}

const CATEGORIES = [
  { id: 'all', name: 'All Photos', icon: Sparkles },
  { id: 'domestic', name: 'Domestic LPG', icon: Flame },
  { id: 'commercial', name: 'Commercial LPG', icon: Truck },
  { id: 'stoves', name: 'Gas Stoves', icon: ShoppingBag },
  { id: 'safety', name: 'Safety & Spares', icon: ShieldCheck },
  { id: 'agency', name: 'Agency Desk & Repairs', icon: Wrench },
];

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'supergas-storefront',
    image: '/images/gallery_supergas_storefront.jpg',
    category: 'agency',
    badge: 'AGENCY & STOREFRONT',
    title: 'Sri Mahalakshmi SUPERGAS Storefront',
    description: 'Official SUPERGAS authorized agency premises with customer booking desk, new connection allottee support, and cylinder dispatch hub in Kondapur, Hyderabad.',
  },
  {
    id: 'supergas-signboard',
    image: '/images/gallery_supergas_signboard.jpg',
    category: 'agency',
    badge: 'AUTHORIZED BOARD',
    title: 'Official SUPERGAS Signboard & Helpdesk',
    description: 'Authorized agency board displaying domestic connections and official hotlines: 9652009647 / 7993009647 (Kondapur, Hyderabad 500084).',
  },
  {
    id: 'cylinder-delivery-action',
    image: '/images/gallery_cylinder_delivery_action.jpg',
    category: 'domestic',
    badge: 'DOORSTEP DELIVERY',
    title: 'Express Doorstep Cylinder Delivery',
    description: 'Same-day doorstep delivery executive transporting verified domestic LPG cylinders across Kondapur with safety seals intact.',
  },
  {
    id: 'delivery-executive-front',
    image: '/images/gallery_delivery_executive_front.jpg',
    category: 'domestic',
    badge: 'VERIFIED DELIVERY',
    title: 'Authorized Delivery Executive & Cylinders',
    description: 'Dedicated delivery personnel equipped with verified domestic and commercial red cooking gas cylinders ready for delivery.',
  },
  {
    id: 'delivery-bike-dispatch',
    image: '/images/gallery_delivery_bike_dispatch.jpg',
    category: 'domestic',
    badge: 'RAPID DISPATCH',
    title: 'Rapid Cylinder Delivery Fleet in Transit',
    description: 'Prompt on-demand domestic cylinder delivery to households, apartments, and commercial kitchens across Kondapur and surrounding areas.',
  },
  {
    id: 'delivery-rider-bike',
    image: '/images/gallery_delivery_rider_bike.jpg',
    category: 'domestic',
    badge: 'DOORSTEP FLEET',
    title: 'Express Doorstep Moped Delivery in Kondapur',
    description: 'Authentic Sri Mahalakshmi SUPERGAS delivery personnel on TVS XL moped transporting dual domestic cylinders directly to customer residences.',
  },
  {
    id: 'cylinder-14kg',
    image: '/images/cylinder.jpg',
    category: 'domestic',
    badge: 'DOMESTIC LPG',
    title: 'Standard 14.2kg Domestic Cylinder',
    description: 'Certified domestic red cooking gas cylinder with factory safety cap and tamper-proof safety seal.',
  },
  {
    id: 'double-cylinder',
    image: '/images/double_cylinder.jpg',
    category: 'domestic',
    badge: 'DOMESTIC LPG',
    title: 'Double Bottle Connection (DBC)',
    description: 'Ensure uninterrupted cooking gas supply for your household with a dual cylinder connection setup.',
  },
  {
    id: 'refill-domestic',
    image: '/images/refill_domestic_14kg.jpg',
    category: 'domestic',
    badge: 'DOORSTEP REFILL',
    title: 'Prompt Domestic LPG Refill Delivery',
    description: 'Same-day doorstep delivery with certified gross weight check and safety leak testing at your premises.',
  },
  {
    id: 'refill-commercial',
    image: '/images/refill_commercial_19kg.jpg',
    category: 'commercial',
    badge: 'COMMERCIAL LPG',
    title: '19kg Commercial Blue Cylinder',
    description: 'High-pressure commercial gas delivery tailored for hotels, restaurants, caterers, and bakeries.',
  },
  {
    id: 'refill-mini',
    image: '/images/refill_mini_5kg.jpg',
    category: 'domestic',
    badge: 'PORTABLE LPG',
    title: '5kg Mini Chhotu LPG Cylinder',
    description: 'Compact, portable, lightweight cooking gas cylinder ideal for small households, bachelors, and travel.',
  },
  {
    id: 'stove-glass-top',
    image: '/images/stove_glass_top.jpg',
    category: 'stoves',
    badge: 'GAS COOKTOP',
    title: 'Toughened Glass Top Gas Stove',
    description: 'ISI-approved premium cooktop featuring spill-proof heavy brass burners and easy-clean scratch-resistant glass.',
  },
  {
    id: 'stove-steel',
    image: '/images/stove.jpg',
    category: 'stoves',
    badge: 'GAS COOKTOP',
    title: 'Stainless Steel Double Burner Stove',
    description: 'Heavy-duty rust-proof stainless steel stove with high thermal fuel efficiency and steady uniform flame.',
  },
  {
    id: 'stove-single',
    image: '/images/stove_single_burner.jpg',
    category: 'stoves',
    badge: 'GAS COOKTOP',
    title: 'Heavy Single Burner Cooktop',
    description: 'Space-saving efficient gas stove designed for compact kitchens, hostels, and secondary cooking setups.',
  },
  {
    id: 'stove-commercial',
    image: '/images/stove_commercial_bhatti.jpg',
    category: 'commercial',
    badge: 'COMMERCIAL LPG',
    title: 'Commercial Jumbo Bhatti Stove',
    description: 'High-pressure cast iron industrial burner built for fast high-volume catering, marriage halls, and restaurants.',
  },
  {
    id: 'safety-accessories',
    image: '/images/accessories.jpg',
    category: 'safety',
    badge: 'SAFETY ACCESSORIES',
    title: 'Certified LPG Safety Accessories',
    description: 'Genuine safety regulators, high-pressure pipes, cylinder trolleys, and brass stove fittings.',
  },
  {
    id: 'regulator-supergas',
    image: '/images/regulator_supergas.jpg',
    category: 'safety',
    badge: 'SAFETY REGULATOR',
    title: 'Auto Leak-Lock Gas Regulator',
    description: 'ISI-standard certified domestic regulator with quick-lock mechanism and automatic gas cutoff protection.',
  },
  {
    id: 'safety-hose',
    image: '/images/safety_pipe_hose.jpg',
    category: 'safety',
    badge: 'SURAKSHA HOSE',
    title: 'Suraksha Steel-Braided Safety Hose',
    description: 'Rodent-proof 3-layer reinforced steel wire gas hose ensuring absolute fire retardance and home kitchen safety.',
  },
  {
    id: 'burners-knobs',
    image: '/images/burners_knobs_pins.jpg',
    category: 'safety',
    badge: 'GENUINE SPARES',
    title: 'Genuine Brass Burners & Knobs',
    description: 'Authentic replacement valves, ignition pins, and heavy-duty brass burner tops for all stove brands.',
  },
  {
    id: 'stove-repair',
    image: '/images/repair.jpg',
    category: 'agency',
    badge: 'REPAIR & SERVICE',
    title: 'Certified Stove Repair Workbench',
    description: 'Expert technician servicing for low flame, yellow soot, gas smell leaks, and valve maintenance.',
  },
];

export const GalleryPageClient: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);

  const filteredItems =
    selectedCategory === 'all'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  const getCategoryCount = (catId: string) => {
    if (catId === 'all') return GALLERY_ITEMS.length;
    return GALLERY_ITEMS.filter((item) => item.category === catId).length;
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeImageIndex === null) return;

      if (e.key === 'Escape') {
        setActiveImageIndex(null);
      } else if (e.key === 'ArrowRight') {
        setActiveImageIndex((prev) =>
          prev !== null ? (prev + 1) % filteredItems.length : 0
        );
      } else if (e.key === 'ArrowLeft') {
        setActiveImageIndex((prev) =>
          prev !== null
            ? (prev - 1 + filteredItems.length) % filteredItems.length
            : 0
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImageIndex, filteredItems.length]);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageIndex === null) return;
    setActiveImageIndex((activeImageIndex + 1) % filteredItems.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageIndex === null) return;
    setActiveImageIndex(
      (activeImageIndex - 1 + filteredItems.length) % filteredItems.length
    );
  };

  const activeItem =
    activeImageIndex !== null ? filteredItems[activeImageIndex] : null;

  return (
    <div
      style={{
        minHeight: '85vh',
        backgroundColor: '#f8fafc',
        padding: '2.5rem 1rem 5rem 1rem',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
        }}
      >
        {/* Category Filter Pills Matching Reference Design */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.65rem',
            marginBottom: '2.25rem',
          }}
        >
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            const count = getCategoryCount(cat.id);
            const IconComponent = cat.icon;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setActiveImageIndex(null);
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.55rem',
                  padding: '0.55rem 1.05rem',
                  borderRadius: '9999px',
                  fontSize: '0.88rem',
                  fontWeight: isActive ? 700 : 600,
                  cursor: 'pointer',
                  border: isActive ? '1px solid #dc2626' : '1px solid #e2e8f0',
                  background: isActive
                    ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
                    : '#ffffff',
                  color: isActive ? '#ffffff' : '#334155',
                  boxShadow: isActive
                    ? '0 4px 14px rgba(220, 38, 38, 0.35)'
                    : '0 2px 6px rgba(0, 0, 0, 0.04)',
                  transition: 'all 0.22s ease',
                  userSelect: 'none',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = '#fef2f2';
                    e.currentTarget.style.borderColor = '#fca5a5';
                    e.currentTarget.style.color = '#dc2626';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = '#ffffff';
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.color = '#334155';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
              >
                <IconComponent
                  size={16}
                  style={{
                    color: isActive ? '#ffffff' : '#dc2626',
                    flexShrink: 0,
                  }}
                />
                <span>{cat.name}</span>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: '22px',
                    height: '20px',
                    padding: '0 0.45rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    backgroundColor: isActive
                      ? 'rgba(255, 255, 255, 0.25)'
                      : '#f1f5f9',
                    color: isActive ? '#ffffff' : '#64748b',
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Gallery Image Grid with Category Badges, Bold Titles & Descriptions */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
            gap: '1.4rem',
            width: '100%',
          }}
        >
          {filteredItems.map((item, index) => {
            const isHovered = hoveredCardIndex === index;

            return (
              <div
                key={item.id}
                onClick={() => setActiveImageIndex(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setActiveImageIndex(index);
                  }
                }}
                onMouseEnter={() => setHoveredCardIndex(index)}
                onMouseLeave={() => setHoveredCardIndex(null)}
                aria-label={`View photo of ${item.title}`}
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '310px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  backgroundColor: '#f1f5f9',
                  border: isHovered
                    ? '1.5px solid #dc2626'
                    : '1px solid #e2e8f0',
                  boxShadow: isHovered
                    ? '0 16px 36px rgba(220, 38, 38, 0.16)'
                    : '0 4px 12px rgba(15, 23, 42, 0.05)',
                  transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                  transition:
                    'transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.28s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.25s ease',
                  cursor: 'pointer',
                }}
              >
                {/* Clean Photo with Gentle Zoom on Hover */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  style={{
                    objectFit: 'cover',
                    display: 'block',
                    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                    transition: 'transform 0.45s ease',
                  }}
                  priority={index < 4}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Enlarged Lightbox Modal with Full Info */}
      {activeItem && activeImageIndex !== null && (
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
            aria-label="Close modal"
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

          {/* Centered Enlarged Image Container with Caption */}
          <div
            style={{
              position: 'relative',
              width: '85vw',
              height: '82vh',
              maxWidth: '1050px',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7)',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#020617',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image viewport */}
            <div style={{ position: 'relative', width: '100%', flex: 1 }}>
              <Image
                src={activeItem.image}
                alt={activeItem.title}
                fill
                style={{
                  objectFit: 'contain',
                }}
                priority
              />
            </div>

            {/* Modal Bottom Caption Bar */}
            <div
              style={{
                padding: '1.25rem 1.75rem',
                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                borderTop: '1px solid rgba(255, 255, 255, 0.12)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.35rem',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  flexWrap: 'wrap',
                }}
              >
                <span
                  style={{
                    backgroundColor: 'rgba(239, 68, 68, 0.18)',
                    color: '#ef4444',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '9999px',
                    border: '1px solid rgba(239, 68, 68, 0.35)',
                  }}
                >
                  {activeItem.badge}
                </span>
                <span
                  style={{
                    fontSize: '0.8rem',
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontWeight: 500,
                  }}
                >
                  Photo {activeImageIndex + 1} of {filteredItems.length}
                </span>
              </div>
              <h2
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  margin: '0.2rem 0 0 0',
                }}
              >
                {activeItem.title}
              </h2>
              <p
                style={{
                  fontSize: '0.9rem',
                  color: 'rgba(255, 255, 255, 0.85)',
                  margin: 0,
                  lineHeight: 1.45,
                }}
              >
                {activeItem.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
