import React from 'react';
import { BUSINESS_DATA } from '@/config/businessData';

export const StructuredData: React.FC = () => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mahalaxmi-super-gas-agency.vercel.app';

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'GasStation', 'ProfessionalService'],
    '@id': `${baseUrl}/#localbusiness`,
    name: BUSINESS_DATA.name,
    legalName: BUSINESS_DATA.name,
    alternateName: [
      'Super Gas Agency in Manikonda',
      'SUPERGAS Agency Manikonda Hyderabad',
      'SUPERGAS Cylinder Booking in Manikonda',
      'SUPERGAS LPG Gas Agency Manikonda',
      'Sri Mahalakshmi Super Gas Agency',
      'Mahalakshmi Super Gas Agency',
      'Sri Mahalakshmi Supergas',
      'Super Gas Agency',
      BUSINESS_DATA.shortName,
    ],
    url: baseUrl,
    logo: `${baseUrl}/images/hero_banner.jpg`,
    image: [
      `${baseUrl}/images/hero_banner.jpg`,
      `${baseUrl}/images/about_indian_delivery_clean.jpg`,
      `${baseUrl}/images/agency_counter.jpg`,
    ],
    description:
      'Authorized SUPERGAS agency in Manikonda, Hyderabad providing domestic & commercial LPG cylinder booking, refills, new gas connections, safety accessories, and kitchen gas stove repairs.',
    telephone: '+91-9652009647',
    email: 'contact@srimahalakshmisupergas.com',
    priceRange: '₹₹',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, UPI, PhonePe, Google Pay',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Main Road, Opp. Police Station Area',
      addressLocality: 'Gollaprolu',
      addressRegion: 'Andhra Pradesh',
      postalCode: '533445',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 17.1517,
      longitude: 82.2858,
    },
    hasMap: BUSINESS_DATA.mapsShareUrl,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '07:00',
        closes: '22:00',
      },
    ],
    areaServed: [
      {
        '@type': 'AdministrativeArea',
        name: 'Manikonda',
      },
      {
        '@type': 'City',
        name: 'Hyderabad',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Gollaprolu',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Kakinada District',
      },
      {
        '@type': 'GeoCircle',
        geoMidpoint: {
          '@type': 'GeoCoordinates',
          latitude: 17.1517,
          longitude: 82.2858,
        },
        geoRadius: '5000',
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'SUPERGAS Services & Cylinder Booking',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'SUPERGAS Cylinder Booking in Manikonda',
            description:
              'Fast booking of domestic 14.2kg and commercial 19kg SUPERGAS LPG cylinder refills with verified tare weight and tamper-evident seal.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'New SUPERGAS LPG Gas Connection in Manikonda',
            description:
              'Complete new domestic LPG gas connection packages with single/double cylinder, click-on safety regulator, wiremesh pipe, and doorstep installation.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Gas Stove Repair & Servicing in Manikonda',
            description:
              'Expert doorstep gas stove repair, low flame fixing, burner cleaning, and leak testing with transparent ₹200 technician visit charge.',
          },
        },
      ],
    },
    knowsAbout: [
      'Super Gas Agency in Manikonda',
      'SUPERGAS Cylinder Booking',
      'Domestic LPG Cylinder Refill',
      'Commercial LPG Cylinders',
      'New Gas Connection Packages',
      'Kitchen Gas Stove Servicing',
    ],
    sameAs: [
      BUSINESS_DATA.mapsShareUrl,
      'https://wa.me/919652009647',
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    url: baseUrl,
    name: BUSINESS_DATA.name,
    alternateName: [
      'Super Gas Agency in Manikonda',
      'SUPERGAS Agency Manikonda Hyderabad',
      'SUPERGAS Cylinder Booking in Manikonda',
      'Sri Mahalakshmi Super Gas Agency',
    ],
    description:
      'Authorized Super Gas Agency in Manikonda, Hyderabad. Fast domestic & commercial SUPERGAS cylinder booking, new LPG gas connections, and stove servicing portal.',
    publisher: {
      '@id': `${baseUrl}/#localbusiness`,
    },
    inLanguage: 'en-IN',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I apply for a new domestic cooking gas connection in Manikonda?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Connect with our agency desk via WhatsApp or phone (+91 96520 09647) with your ID proof (Aadhaar / Voter ID) and address proof. We guide you through domestic LPG allotment, genuine cylinder issuance, certified regulator setup, and initial stove inspection.',
        },
      },
      {
        '@type': 'Question',
        name: 'How can I book a SUPERGAS cylinder refill and check delivery timing in Manikonda?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Simply share your locality and consumer details with our agency desk (+91 96520 09647). We verify stock availability promptly and coordinate doorstep delivery to your home without automated interactive voice response delays.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I check that my delivered LPG cylinder is genuine and safe?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Every genuine cylinder from our agency arrives with an authentic tamper-evident seal and safety cap intact. Our delivery technicians can perform seal checks, O-ring safety inspection, and leakage tests upon delivery.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you offer doorstep gas stove repair and flame maintenance in Manikonda?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! We repair common issues such as low or yellow flame, burner carbon clogging, loose control knobs, and gas leakage with a transparent ₹200 visit charge. Share your stove model and issue over WhatsApp to schedule an on-site technician visit.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I purchase ISI-certified regulators, pipes, and stoves at the agency?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. We stock toughened glass & stainless steel gas stoves (2-burner & 3-burner), steel wire-braided safety hose pipes, high-efficiency brass regulators, spark lighters, and heavy-duty cylinder roller trolleys.',
        },
      },
      {
        '@type': 'Question',
        name: 'Where is Sri Mahalakshmi Super Gas Agency located and what are the timings?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our agency and customer consultation desk is open Monday to Sunday from 7:00 AM to 10:00 PM (7 days open). Doorstep cylinder delivery operates across a 5 km coverage radius.',
        },
      },
    ],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${baseUrl}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Services',
        item: `${baseUrl}/services/new-connection`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Products',
        item: `${baseUrl}/products`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Contact',
        item: `${baseUrl}/contact`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
};
