'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Phone,
  PhoneCall,
  MessageCircle,
  Menu,
  X,
  Flame,
  ChevronDown,
  Shield
} from 'lucide-react';
import {
  BUSINESS_DATA,
  createWhatsAppLink,
  DEEP_LINKS
} from '../config/businessData';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const servicesTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
  };

  const closeAllDropdowns = () => {
    if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
    setServicesDropdownOpen(false);
  };

  const handleServicesEnter = () => {
    if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
    setServicesDropdownOpen(true);
  };

  const handleServicesLeave = () => {
    servicesTimeoutRef.current = setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 250);
  };

  useEffect(() => {
    if (isAdminRoute) return;

    const updateHeaderHeight = () => {
      if (headerRef.current) {
        const height = headerRef.current.getBoundingClientRect().height;
        if (height > 0) {
          document.documentElement.style.setProperty('--site-header-height', `${height}px`);
        }
      }
    };
    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);

    const handleOutsideClick = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        closeAllDropdowns();
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeAllDropdowns();
        closeMobileMenu();
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('resize', updateHeaderHeight);
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isAdminRoute]);

  if (isAdminRoute) {
    return null;
  }

  return (
    <header className="header-root" ref={headerRef}>
      <nav className="header-navbar" aria-label="Main Navigation">
        <div className="container header-nav-content">
          
          <Link href="/" className="header-brand" onClick={closeMobileMenu}>
            <div className="brand-icon-wrapper">
              <Flame size={20} className="brand-flame-icon" />
            </div>
            <div className="brand-text-container">
              <span className="brand-title">Sri Mahalakshmi</span>
              <span className="brand-subtitle">Super Gas Agency</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <ul className="desktop-nav-links">
            <li>
              <Link href="/" className="nav-link" onClick={closeAllDropdowns}>Home</Link>
            </li>

            {/* Services Dropdown */}
            <li 
              className="nav-item-dropdown"
              onMouseEnter={handleServicesEnter}
              onMouseLeave={handleServicesLeave}
            >
              <button
                type="button"
                className={`nav-link dropdown-toggle-link ${servicesDropdownOpen ? 'active' : ''}`}
                onClick={() => {
                  setServicesDropdownOpen(!servicesDropdownOpen);
                }}
                aria-expanded={servicesDropdownOpen}
                aria-haspopup="true"
              >
                <span>Services</span>
                <ChevronDown
                  size={13}
                  strokeWidth={2.2}
                  className={`nav-dropdown-chevron ${servicesDropdownOpen ? 'rotated' : ''}`}
                />
              </button>

              {servicesDropdownOpen && (
                <div className="dropdown-menu-box" role="menu">
                  <Link
                    href="/services/new-connection"
                    className="dropdown-item"
                    onClick={closeAllDropdowns}
                    role="menuitem"
                  >
                    <span className="dropdown-item-title">New Connection Package</span>
                  </Link>
                  <Link
                    href="/services/cylinder-refill"
                    className="dropdown-item"
                    onClick={closeAllDropdowns}
                    role="menuitem"
                  >
                    <span className="dropdown-item-title">Cylinder Refill Booking</span>
                  </Link>
                  <Link
                    href="/services/stove-repair"
                    className="dropdown-item"
                    onClick={closeAllDropdowns}
                    role="menuitem"
                  >
                    <span className="dropdown-item-title">Stove Repair &amp; Servicing</span>
                  </Link>
                </div>
              )}
            </li>

            {/* Product Link (Direct link to All Products) */}
            <li>
              <Link href="/products" className="nav-link" onClick={closeAllDropdowns}>Product</Link>
            </li>

            <li>
              <Link href="/about" className="nav-link" onClick={closeAllDropdowns}>About</Link>
            </li>
            <li>
              <Link href="/gallery" className="nav-link" onClick={closeAllDropdowns}>Gallery</Link>
            </li>
          </ul>

          {/* Desktop Action Buttons */}
          <div className="header-cta-group">
            <Link
              href="/contact"
              className="header-btn-primary-red"
              id="header-contact-btn"
              onClick={closeAllDropdowns}
              aria-label="Contact Us"
            >
              <PhoneCall size={15} />
              <span>Contact Us</span>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className="mobile-menu-toggle"
              onClick={toggleMobileMenu}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
              id="mobile-nav-toggle-btn"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={closeMobileMenu}>
          <div className="mobile-menu-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <span className="mobile-drawer-title">{BUSINESS_DATA.name}</span>
              <button 
                type="button" 
                onClick={closeMobileMenu} 
                className="mobile-close-btn" 
                aria-label="Close navigation menu"
              >
                <X size={22} />
              </button>
            </div>
            
            <ul className="mobile-nav-list">
              <li>
                <Link href="/" onClick={closeMobileMenu} className="mobile-nav-link">
                  Home
                </Link>
              </li>

              {/* Mobile Services Accordion */}
              <li className="mobile-nav-item-dropdown">
                <button
                  type="button"
                  className="mobile-nav-link-dropdown-btn"
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  aria-expanded={mobileServicesOpen}
                >
                  <span>Services</span>
                  <ChevronDown
                    size={16}
                    strokeWidth={2.5}
                    className={`nav-dropdown-chevron ${mobileServicesOpen ? 'rotated' : ''}`}
                  />
                </button>
                {mobileServicesOpen && (
                  <div className="mobile-sub-list">
                    <Link href="/services/new-connection" onClick={closeMobileMenu} className="mobile-sub-link">
                      • New Connection Package
                    </Link>
                    <Link href="/services/cylinder-refill" onClick={closeMobileMenu} className="mobile-sub-link">
                      • Cylinder Refill Booking
                    </Link>
                    <Link href="/services/stove-repair" onClick={closeMobileMenu} className="mobile-sub-link">
                      • Stove Repair &amp; Servicing
                    </Link>
                  </div>
                )}
              </li>

              {/* Mobile Product Link */}
              <li>
                <Link href="/products" onClick={closeMobileMenu} className="mobile-nav-link">
                  Product
                </Link>
              </li>

              <li>
                <Link href="/about" onClick={closeMobileMenu} className="mobile-nav-link">
                  About
                </Link>
              </li>
              <li>
                <Link href="/gallery" onClick={closeMobileMenu} className="mobile-nav-link">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/contact" onClick={closeMobileMenu} className="mobile-nav-link">
                  Contact
                </Link>
              </li>
            </ul>

            <div className="mobile-menu-footer">
              <p className="mobile-menu-note">
                Open 7:00 AM – 10:00 PM • Delivery within 5 km
              </p>
              <div className="mobile-drawer-actions">
                <a
                  href={BUSINESS_DATA.primaryPhoneTel}
                  className="btn btn-call w-full"
                  onClick={closeMobileMenu}
                >
                  <Phone size={16} />
                  <span>Call {BUSINESS_DATA.primaryPhone}</span>
                </a>
                <a
                  href={DEEP_LINKS.general}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp w-full"
                  onClick={closeMobileMenu}
                >
                  <MessageCircle size={16} />
                  <span>Message on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
