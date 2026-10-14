import React from 'react';
import { BUSINESS_DATA } from '@/config/businessData';

export const StructuredData: React.FC = () => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mahalaxmi-super-gas-agency.vercel.app';

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'GasStation'],
    '@id': `${baseUrl}/#localbusiness`,
    name: BUSINESS_DATA.name,
    alternateName: [
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
      'Authorized Supergas agency in Gollaprolu providing domestic & commercial LPG cylinder refills, new gas connections, safety accessories, and kitchen gas stove repairs.',
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
    alternateName: 'Mahalakshmi Super Gas Agency',
    description:
      'Domestic & commercial LPG cylinder booking, new connections, and stove servicing portal in Gollaprolu.',
    publisher: {
      '@id': `${baseUrl}/#localbusiness`,
    },
    inLanguage: 'en-IN',
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
    </>
  );
};
