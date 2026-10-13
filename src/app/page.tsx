import React from 'react';
import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { Products } from '@/components/Products';
import { About } from '@/components/About';
import { HowItWorks } from '@/components/HowItWorks';
import { Testimonials } from '@/components/Testimonials';
import { Gallery } from '@/components/Gallery';
import { FAQSection } from '@/components/FAQSection';
import { FastBookingContactMap } from '@/components/FastBookingContactMap';

export default function HomePage() {
  return (
    <main id="main-content">
      <Hero />
      <Services />
      <Products />
      <About />
      <HowItWorks />
      <Testimonials />
      <Gallery />
      <FAQSection />
      <FastBookingContactMap />
    </main>
  );
}

