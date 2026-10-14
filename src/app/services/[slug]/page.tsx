import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  Flame,
  Repeat,
  ShoppingBag,
  Wrench,
  Phone,
  MessageCircle,
  ArrowLeft,
  ArrowRight,
  ArrowDownLeft,
  CheckCircle2,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  ArrowUpRight,
  Play,
  Truck,
  Clock,
  Award
} from 'lucide-react';
import {
  SERVICES,
  SERVICE_DETAILS,
  BUSINESS_DATA,
  createWhatsAppLink,
  getServiceDetail
} from '@/config/businessData';
import { SubservicesScrollSection } from './SubservicesScrollSection';
import { WhyChooseUsCollage } from '@/components/WhyChooseUsCollage';
import { HowItWorks } from '@/components/HowItWorks';
import { Testimonials } from '@/components/Testimonials';
import { ServiceGallery } from '@/components/ServiceGallery';
import { ServiceFAQ } from '@/components/ServiceFAQ';

const iconMap = {
  Flame: Flame,
  Repeat: Repeat,
  ShoppingBag: ShoppingBag,
  Wrench: Wrench,
};

export function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.id,
  }));
}

const SERVICE_SEO: Record<string, { title: string; description: string; image: string }> = {
  'new-connection': {
    title: 'New Gas Connection | Sri Mahalakshmi Super Gas Agency',
    description:
      'Apply for new single & double cylinder LPG connections with regulator and safety hose pipe from Sri Mahalakshmi Super Gas Agency. Fast doorstep delivery.',
    image: '/images/services_brandblitz_new_connection.jpg',
  },
  'cylinder-refill': {
    title: 'LPG Cylinder Refill | Sri Mahalakshmi Super Gas Agency',
    description:
      'Book genuine 14.2kg domestic & 19kg commercial LPG cylinder refills with tamper-evident seals and verified tare weight from Sri Mahalakshmi Super Gas.',
    image: '/images/refill_domestic_14kg.jpg',
  },
  'stove-repair': {
    title: 'Gas Stove Repair & Service | Sri Mahalakshmi Super Gas',
    description:
      'Doorstep gas stove repair & servicing in Gollaprolu with transparent ₹200 visit charge. Expert burner cleaning, leak detection, and genuine spare parts.',
    image: '/images/indian_stove_repair_clean.jpg',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceDetail(slug);

  if (!service) {
    return {
      title: `Service Not Found | ${BUSINESS_DATA.name}`,
    };
  }

  const seo = SERVICE_SEO[slug] || {
    title: `${service.title} | Sri Mahalakshmi Super Gas`,
    description: `${service.subtitle}. Explore requirements and enquiry options for ${service.title} at Sri Mahalakshmi Super Gas Agency.`,
    image: service.image,
  };

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: `/services/${slug}`,
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `/services/${slug}`,
      type: 'website',
      images: [seo.image],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: [seo.image],
    },
  };
}

interface ServiceHeroConfig {
  headingMain: string;
  headingAccent: string;
  leadText: string;
  primaryBtnText: string;
  secondaryBtnText: string;
  stat1Val: string;
  stat1Label: string;
  stat2Val: string;
  stat2Label: string;
  stat3Val: string;
  stat3Label: string;
  card1Image: string;
  card1Alt: string;
  card2Image: string;
  card2Alt: string;
  card3Image: string;
  card3Alt: string;
}

const SERVICE_HERO_DATA: Record<string, ServiceHeroConfig> = {
  'new-connection': {
    headingMain: 'A smarter way to get',
    headingAccent: '& new gas connection',
    leadText:
      'Complete new domestic LPG gas connection package with genuine Supergas certification, full safety kit, and same-day doorstep installation across Hyderabad.',
    primaryBtnText: 'Apply on WhatsApp',
    secondaryBtnText: 'Call Agency',
    stat1Val: 'Same Day',
    stat1Label: 'Doorstep Setup',
    stat2Val: 'Full Kit',
    stat2Label: 'Cylinder + Stove',
    stat3Val: '100%',
    stat3Label: 'Safety Certified',
    card1Image: '/images/services_brandblitz_new_connection.jpg',
    card1Alt: 'Technician installing brand new cooking gas cylinder and stove in kitchen',
    card2Image: '/images/services_hero_right.jpg',
    card2Alt: 'Technician connecting safety regulator to new cylinder',
    card3Image: '/images/stove.jpg',
    card3Alt: 'Complete starter gas stove, cylinder and accessories package',
  },
  'cylinder-refill': {
    headingMain: 'A faster way to book',
    headingAccent: '& get cylinder refill',
    leadText:
      'Instant domestic (14.2kg), commercial (19kg), and mini (5kg) cylinder refill booking with prompt doorstep delivery within 5 km and 100% tare weight verification.',
    primaryBtnText: 'Book a refill',
    secondaryBtnText: 'Call Agency',
    stat1Val: '15,2K+',
    stat1Label: 'Happy Customers',
    stat2Val: '30 Min',
    stat2Label: 'Doorstep Delivery',
    stat3Val: '100%',
    stat3Label: 'Weight Verified',
    card1Image: '/images/services_hero_delivery.jpg',
    card1Alt: 'Prompt delivery man in red shirt delivering red LPG cylinder to customer doorstep',
    card2Image: '/images/about_indian_delivery_doorstep.jpg',
    card2Alt: 'Doorstep cylinder delivery handed over safely to customer home',
    card3Image: '/images/agency_counter.jpg',
    card3Alt: 'Supergas domestic and commercial cylinders ready for refill dispatch',
  },
  'stove-repair': {
    headingMain: 'A reliable way to get',
    headingAccent: '& expert stove repair',
    leadText:
      'Certified doorstep mechanic visits for low flame issues, burner cleaning, gas smell leakage inspection, and valve fixes. Transparent fixed ₹200 inspection fee.',
    primaryBtnText: 'Book Mechanic (₹200)',
    secondaryBtnText: 'Call Agency',
    stat1Val: '₹200',
    stat1Label: 'Fixed Visit Charge',
    stat2Val: 'Same Day',
    stat2Label: 'Doorstep Visit',
    stat3Val: '100%',
    stat3Label: 'Genuine Spares',
    card1Image: '/images/services_hero_left.jpg',
    card1Alt: 'Certified stove mechanic servicing gas stove burners with spanner',
    card2Image: '/images/indian_stove_repair_clean.jpg',
    card2Alt: 'Technician fine-tuning stove valve and brass jet nozzle',
    card3Image: '/images/burners_knobs_pins.jpg',
    card3Alt: 'Genuine gas stove spare parts, brass burners, knobs and jet pins',
  },
};

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceDetail(slug);

  if (!service) {
    notFound();
  }

  const IconComponent = iconMap[service.iconName] || Flame;
  const mainWaUrl = createWhatsAppLink(service.whatsAppMessage);

  const heroConfig = SERVICE_HERO_DATA[service.id] || {
    headingMain: 'A smarter way to book',
    headingAccent: '& get gas service',
    leadText:
      `${service.subtitle || service.heroTagline}. Sri Mahalakshmi Super Gas Agency provides instant domestic cylinder refills, prompt 5 km doorstep delivery, safety leak audits, and expert gas stove maintenance across Hyderabad.`,
    primaryBtnText: 'Book a refill',
    secondaryBtnText: 'Explore services',
    stat1Val: '15,2K+',
    stat1Label: 'Happy Customers',
    stat2Val: '30 Min',
    stat2Label: 'Doorstep Delivery',
    stat3Val: '100%',
    stat3Label: 'Safety Certified',
    card1Image: '/images/services_brandblitz_hero.jpg',
    card1Alt: 'Service technician with cooking gas cylinder',
    card2Image: '/images/services_hero_right.jpg',
    card2Alt: 'Professional serviceman connecting gas regulator safely',
    card3Image: '/images/services_hero_left.jpg',
    card3Alt: 'Expert stove technician repairing gas stove',
  };

  return (
    <main className="service-detail-page edustyle-page-bg">

      {/* Modern Collage Services Hero Section (Service-Specific Content & Images) */}
      <section className="edustyle-services-hero" id="service-detail-hero">
        <div className="container edustyle-container">

          {/* Large Rounded Island White Card */}
          <div className="edustyle-hero-card">

            {/* Top Breadcrumbs */}
            <nav className="edustyle-breadcrumbs" aria-label="Breadcrumb">
              <Link href="/" className="edustyle-crumb-link">Home</Link>
              <ChevronRight size={13} className="edustyle-crumb-sep" />
              <span className="edustyle-crumb-link" style={{ cursor: 'default' }}>Services</span>
              <ChevronRight size={13} className="edustyle-crumb-sep" />
              <span className="edustyle-crumb-current">{service.title}</span>
            </nav>

            <div className="edustyle-hero-grid">

              {/* Left Column: Heading, Subtitle, Dual Pill Buttons, 3-Column Metrics */}
              <div className="edustyle-left-col">
                
                <h1 className="edustyle-hero-heading">
                  {heroConfig.headingMain} <br />
                  <span className="edustyle-accent-heading">
                    {heroConfig.headingAccent}
                  </span>
                </h1>

                <p className="edustyle-hero-lead">
                  {heroConfig.leadText}
                </p>

                {/* Dual Pill Action Buttons */}
                <div className="edustyle-cta-group">
                  <a
                    href={mainWaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="edustyle-primary-btn"
                    id={`hero-wa-${service.id}`}
                  >
                    <span>{heroConfig.primaryBtnText}</span>
                  </a>

                  <a
                    href={BUSINESS_DATA.primaryPhoneTel}
                    className="edustyle-secondary-btn"
                    id={`hero-call-${service.id}`}
                  >
                    <span>{heroConfig.secondaryBtnText}</span>
                  </a>
                </div>

                {/* 3-Column Stats Row with Dividers */}
                <div className="edustyle-stats-row">
                  <div className="edustyle-stat-item">
                    <span className="edustyle-stat-val">{heroConfig.stat1Val}</span>
                    <span className="edustyle-stat-label">{heroConfig.stat1Label}</span>
                  </div>

                  <div className="edustyle-stat-sep" aria-hidden="true" />

                  <div className="edustyle-stat-item">
                    <span className="edustyle-stat-val">{heroConfig.stat2Val}</span>
                    <span className="edustyle-stat-label">{heroConfig.stat2Label}</span>
                  </div>

                  <div className="edustyle-stat-sep" aria-hidden="true" />

                  <div className="edustyle-stat-item">
                    <div className="edustyle-stat-val edustyle-stat-with-icon">
                      <svg width="24" height="15" viewBox="0 0 38 18" fill="none" stroke="currentColor" strokeWidth="2.5" className="edustyle-stat-ring-icon" aria-hidden="true">
                        <circle cx="9" cy="9" r="7" />
                        <circle cx="19" cy="9" r="7" />
                        <circle cx="29" cy="9" r="7" />
                      </svg>
                      <span>{heroConfig.stat3Val}</span>
                    </div>
                    <span className="edustyle-stat-label">{heroConfig.stat3Label}</span>
                  </div>
                </div>

              </div>

              {/* Right Column: 3-Card Asymmetric Collage with Floating Badges & Accents */}
              <div className="edustyle-right-col">
                <div className="edustyle-collage-wrap">
                  
                  {/* Card 1: Top-Left Tall Rounded Card (Specific to Service) */}
                  <div className="edustyle-card edustyle-card-1">
                    <Image
                      src={heroConfig.card1Image}
                      alt={heroConfig.card1Alt}
                      fill
                      sizes="240px"
                      className="edustyle-card-img"
                      priority
                    />
                    {/* Attached Pill/Circle Arrow Badge */}
                    <div className="edustyle-badge-arrow" aria-hidden="true">
                      <ArrowDownLeft size={20} strokeWidth={2.6} />
                    </div>
                  </div>

                  {/* Card 2: Top-Right Staggered Rounded Card (Specific to Service) */}
                  <div className="edustyle-card edustyle-card-2">
                    <Image
                      src={heroConfig.card2Image}
                      alt={heroConfig.card2Alt}
                      fill
                      sizes="220px"
                      className="edustyle-card-img"
                      priority
                    />
                  </div>

                  {/* Card 3: Bottom Wide Rounded Card (Specific to Service) */}
                  <div className="edustyle-card edustyle-card-3">
                    <Image
                      src={heroConfig.card3Image}
                      alt={heroConfig.card3Alt}
                      fill
                      sizes="290px"
                      className="edustyle-card-img"
                    />
                  </div>

                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Subservices Grid Section */}
      <section className="section-padding subservices-section" id="subservices">
        <div className="container">

          <div className="section-header">
            <span className="section-badge">
              <CheckCircle2 size={14} />
              <span>Available Options</span>
            </span>
            <h2 className="section-title">
              Subservices &amp; Packages for {service.title}
            </h2>
            <p className="section-description">
              Select any subservice below for direct WhatsApp enquiry, package specifications, and guidance.
            </p>
          </div>

          <SubservicesScrollSection
            subServices={service.subServices}
            defaultImage={service.image}
          />

        </div>
      </section>

      {/* Why Choose Us Section (Artistic 4-Panel Collage matching Reference Layout) */}
      <WhyChooseUsCollage />

      {/* How It Works Section */}
      <HowItWorks slug={slug} serviceTitle={service.title} />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Service-Specific Gallery Section */}
      <ServiceGallery slug={slug} serviceTitle={service.title} />

      {/* Service-Specific FAQ Section */}
      <ServiceFAQ slug={slug} serviceTitle={service.title} />
    </main>
  );
}
