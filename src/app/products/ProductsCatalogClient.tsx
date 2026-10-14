'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import {
  Search,
  X,
  Flame,
  ArrowRight,
  MessageCircle,
} from 'lucide-react';
import {
  PRODUCTS_CATALOG,
  ProductItem,
  createProductWhatsAppLink,
  createWhatsAppLink,
  getProductCategoryKey,
} from '@/config/businessData';
import { getProductsFromSupabase } from '@/lib/supabaseProducts';

export const ProductsCatalogClient: React.FC = () => {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<ProductItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('sri_mahalaxmi_products');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch {
        // fallback
      }
    }
    return PRODUCTS_CATALOG;
  });
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Handle URL query parameter ?category=...
  useEffect(() => {
    const cat = searchParams?.get('category');
    if (cat) {
      if (cat.includes('stove')) setActiveTab('stoves');
      else if (cat.includes('regulator')) setActiveTab('regulators');
      else if (cat.includes('spare') || cat.includes('burner')) setActiveTab('spares');
      else if (cat.includes('cylinder')) setActiveTab('cylinders');
      else if (cat === 'all') setActiveTab('all');
    }
  }, [searchParams]);

  // Sync with Supabase Cloud & Listen for Live Admin Updates
  useEffect(() => {
    // 1. Immediately read cache
    try {
      const stored = localStorage.getItem('sri_mahalaxmi_products');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProducts(parsed);
        }
      }
    } catch {
      // ignore
    }

    // 2. Refresh from Supabase Cloud
    const refreshFromCloud = () => {
      getProductsFromSupabase().then((items) => {
        if (Array.isArray(items) && items.length > 0) {
          setProducts(items);
        }
      }).catch(() => {
        // Keep current products on error
      });
    };

    refreshFromCloud();

    // 3. Real-time sync when product is added/edited in admin or another tab
    const handleProductsUpdated = (e?: any) => {
      if (e?.detail && Array.isArray(e.detail) && e.detail.length > 0) {
        setProducts(e.detail);
      } else {
        refreshFromCloud();
      }
    };

    window.addEventListener('sri_products_updated', handleProductsUpdated);
    window.addEventListener('storage', handleProductsUpdated);
    window.addEventListener('focus', refreshFromCloud);

    return () => {
      window.removeEventListener('sri_products_updated', handleProductsUpdated);
      window.removeEventListener('storage', handleProductsUpdated);
      window.removeEventListener('focus', refreshFromCloud);
    };
  }, []);

  const tabs = [
    { key: 'all', label: 'All Products' },
    { key: 'stoves', label: 'Gas Stoves & Bhattis' },
    { key: 'regulators', label: 'Supergas Regulators & Hoses' },
    { key: 'spares', label: 'Burners & Spares' },
    { key: 'cylinders', label: 'LPG Cylinders' },
  ];

  const filteredProducts = useMemo(() => {
    let result = products;

    if (activeTab !== 'all') {
      result = result.filter((p) => getProductCategoryKey(p) === activeTab);
    }

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((p) => {
        const text = `${p.name} ${p.description} ${p.categoryLabel} ${p.category} ${p.features?.join(' ') || ''}`.toLowerCase();
        return text.includes(q);
      });
    }

    return result;
  }, [products, activeTab, searchQuery]);

  return (
    <div className="allproducts-page-container" id="all-products-grid">

      {/* Search Bar & Category Filter Pills */}
      <div className="container allproducts-controls-bar">
        {/* Professional Section Heading */}
        <div className="allproducts-section-header">
          <div className="allproducts-eyebrow-tag">
            <Flame size={15} className="allproducts-eyebrow-icon" />
            <span>ORIGINAL LPG HARDWARE &amp; ACCESSORIES</span>
          </div>
          <h2 className="allproducts-section-title">
            LPG Stoves, Regulators &amp; Spare Parts
          </h2>
        </div>

        {/* Search Bar */}
        <div className="allproducts-search-wrap">
          <Search size={18} className="allproducts-search-icon" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search stoves, regulators, safety hose, brass burners, cylinders..."
            className="allproducts-search-input"
            aria-label="Search all products"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="allproducts-search-clear"
              aria-label="Clear search query"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="allproducts-filter-pills" role="tablist">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.key}
              className={`allproducts-tab-pill ${activeTab === tab.key ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ALL PRODUCTS GRID */}
      <section className="allproducts-grid-section">
        <div className="container">

          {/* Search Results Feedback (Only visible when user enters a query) */}
          {searchQuery.trim() && (
            <div className="allproducts-results-count">
              Showing results matching &ldquo;<strong>{searchQuery}</strong>&rdquo; ({filteredProducts.length} items found)
            </div>
          )}

          {filteredProducts.length === 0 ? (
            <div className="allproducts-empty-state">
              <p>No products found matching &ldquo;{searchQuery}&rdquo;.</p>
              <button
                type="button"
                onClick={() => { setSearchQuery(''); setActiveTab('all'); }}
                className="btn btn-secondary"
                style={{ marginTop: '0.75rem' }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="allproducts-grid">
              {filteredProducts.map((product) => {
                const catKey = getProductCategoryKey(product);
                const catalogMatch = PRODUCTS_CATALOG.find((c) => c.id === product.id);
                const fallbackImg = catKey === 'cylinders' 
                  ? (product.id.includes('19kg') ? '/images/refill_commercial_19kg.jpg' : product.id.includes('5kg') ? '/images/refill_mini_5kg.jpg' : '/images/cylinder.jpg')
                  : '/images/accessories.jpg';
                const resolvedImage = (product.image && product.image.trim() !== '')
                  ? product.image
                  : (catalogMatch?.image || fallbackImg);

                const waUrl = product.whatsAppMessage
                  ? createWhatsAppLink(product.whatsAppMessage)
                  : createProductWhatsAppLink(product.name, product.categoryLabel);

                const displayPrice = product.price || product.priceTag || 'Best Price';
                const badgeText = product.discountBadge || (product.inStock ? 'IN STOCK' : 'POPULAR');

                return (
                  <article
                    key={product.id}
                    className="allproducts-card"
                    id={`product-card-${product.id}`}
                  >
                    {/* Square Image Box with Badge */}
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="allproducts-card-media"
                      title={`Order ${product.name} on WhatsApp`}
                    >
                      <Image
                        src={resolvedImage}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                        className="allproducts-card-img"
                        style={{ objectFit: 'cover' }}
                        unoptimized
                      />

                      {/* Pill Badge matching Reference Screenshot */}
                      {badgeText && (
                        <span className={`allproducts-card-badge ${badgeText === '25% OFF' ? 'badge-discount' : ''}`}>
                          {badgeText}
                        </span>
                      )}
                    </a>

                    {/* Card Content */}
                    <div className="allproducts-card-body">
                      {/* Sub-category tag */}
                      <span className="allproducts-card-category">
                        {product.categoryLabel || product.category || 'LPG Hardware'}
                      </span>

                      {/* Title */}
                      <h3 className="allproducts-card-title" title={product.name}>
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="allproducts-title-link"
                        >
                          {product.name}
                        </a>
                      </h3>

                      {/* Price Row */}
                      <div className="allproducts-card-price-row">
                        <span className="allproducts-card-price">
                          {displayPrice}
                        </span>
                        <span className="allproducts-card-delivery-note">
                          Doorstep Delivery
                        </span>
                      </div>

                      {/* Product Description */}
                      {product.description && (
                        <p className="allproducts-card-desc" title={product.description}>
                          {product.description}
                        </p>
                      )}

                      {/* Action Buttons: Book Now on Left + WhatsApp Button on Right */}
                      <div className="allproducts-card-actions">
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="allproducts-book-btn"
                          id={`book-now-${product.id}`}
                          aria-label={`Book ${product.name} on WhatsApp`}
                        >
                          <span>Book Now</span>
                          <ArrowRight size={15} className="book-btn-arrow" />
                        </a>

                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="allproducts-wa-icon-btn"
                          id={`wa-btn-${product.id}`}
                          title={`Order ${product.name} on WhatsApp`}
                          aria-label={`WhatsApp order for ${product.name}`}
                        >
                          <MessageCircle size={18} fill="#ffffff" stroke="#ffffff" />
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

        </div>
      </section>

    </div>
  );
};
