'use client';

import React from 'react';
import Image from 'next/image';
import {
  MessageSquare,
  Truck,
  ShieldCheck
} from 'lucide-react';

interface StepItem {
  number: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

const SERVICE_STEPS: Record<string, StepItem[]> = {
  'new-connection': [
    {
      number: '01',
      title: 'Choose Package & Share Aadhaar',
      description:
        'Select Single Cylinder starter kit or Double Cylinder (DBC) family pack. Send your Aadhaar card photo directly on WhatsApp for paperless instant verification.',
      icon: MessageSquare,
    },
    {
      number: '02',
      title: 'Complete Kit Allocation & Fast Dispatch',
      description:
        'Our agency desk prepares your complete hardware set—genuine cylinder, gas stove, Supergas click-on regulator, wiremesh safety hose, and spark lighter.',
      icon: Truck,
    },
    {
      number: '03',
      title: 'Doorstep Delivery & Safe Installation',
      description:
        'Authorized technician delivers to your kitchen within 5 km, fits regulator & safety hose securely, and performs initial burner flame ignition check.',
      icon: ShieldCheck,
    },
  ],
  'cylinder-refill': [
    {
      number: '01',
      title: 'Order Refill via WhatsApp or Phone',
      description:
        'Share your cylinder type (14.2kg Domestic, 19kg Commercial, or 5kg Mini) and delivery address with our agency desk for instant booking confirmation.',
      icon: MessageSquare,
    },
    {
      number: '02',
      title: 'Security Seal Check & Fast Dispatch',
      description:
        'Our desk inspects the tamper-evident holographic security seal, confirms stock availability, and assigns your priority same-day delivery time slot.',
      icon: Truck,
    },
    {
      number: '03',
      title: 'Doorstep Delivery & Weight Verification',
      description:
        'Certified specialist arrives at your doorstep within 5 km, verifies 100% digital gross tare weight in front of you, and conducts a free leak check.',
      icon: ShieldCheck,
    },
  ],
  'stove-repair': [
    {
      number: '01',
      title: 'Report Stove Issue on WhatsApp',
      description:
        'Tell us your stove problem (low flame, yellow smoke, gas smell/leak, or broken knob) and share your kitchen location with our agency desk.',
      icon: MessageSquare,
    },
    {
      number: '02',
      title: 'Technician Dispatch (Fixed ₹200 Visit)',
      description:
        'Our desk confirms the transparent fixed ₹200 inspection charge and dispatches an experienced stove technician equipped with genuine replacement spares.',
      icon: Truck,
    },
    {
      number: '03',
      title: 'Doorstep Repair & 100% Safety Inspection',
      description:
        'Mechanic cleans burners, clears jet nozzles, tests manifold seals, checks for leaks, and verifies uniform high-efficiency blue flame before leaving.',
      icon: ShieldCheck,
    },
  ],
};

const DEFAULT_STEPS: StepItem[] = [
  {
    number: '01',
    title: 'Connect & Set Your Requirements',
    description:
      'Select new LPG connection, refill cylinder, or stove repair. Connect directly with our agency desk via WhatsApp or phone with your locality.',
    icon: MessageSquare,
  },
  {
    number: '02',
    title: 'Desk Verification & Fast Dispatch',
    description:
      'Our team verifies address details, confirms transparent rates and genuine ISI hardware, and assigns your priority delivery time slot.',
    icon: Truck,
  },
  {
    number: '03',
    title: 'Doorstep Delivery & Safety Inspection',
    description:
      'Certified specialist arrives with sealed genuine supplies, conducting free regulator leak check and burner flame ignition test.',
    icon: ShieldCheck,
  },
];

interface HowItWorksProps {
  slug?: string;
  serviceTitle?: string;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ slug, serviceTitle }) => {
  const steps = (slug && SERVICE_STEPS[slug]) ? SERVICE_STEPS[slug] : DEFAULT_STEPS;
  return (
    <section className="hiw-compact-section" id="how-it-works" aria-label="How Sri Mahalakshmi Super Gas Agency Works">
      <div className="container">
        <div className="hiw-compact-grid">
          
          {/* ========================================================
             LEFT COLUMN: TITLE & LARGE DELIVERY SPECIALIST ILLUSTRATION
             ======================================================== */}
          <div className="hiw-left-panel">
            <h2 className="hiw-compact-title">
              Get Started In<br />
              Minutes.
            </h2>

            <div className="hiw-illustration-box">
              <Image
                src="/images/how_it_works_delivery_man.jpg"
                alt="Certified gas delivery specialist carrying red cylinder on shoulder"
                width={460}
                height={460}
                className="hiw-compact-image"
                priority
              />
            </div>
          </div>

          {/* ========================================================
             RIGHT COLUMN: GRADIENT CURVED ARC & 3 CLEAN STEPS
             ======================================================== */}
          <div className="hiw-right-panel">
            
            {/* Gradient Dashed Curved Arc Line */}
            <svg
              className="hiw-arc-svg"
              viewBox="0 0 100 480"
              fill="none"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="hiw-arc-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#DC2626" />
                  <stop offset="50%" stopColor="#EF4444" />
                  <stop offset="100%" stopColor="#DC2626" />
                </linearGradient>
              </defs>
              <path
                d="M 28 35 Q 92 240 28 445"
                stroke="url(#hiw-arc-grad)"
                strokeWidth="2.2"
                strokeDasharray="5 5"
              />
            </svg>

            {/* 3 Clean Step Rows */}
            <div className="hiw-steps-flow">
              {steps.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <div
                    key={step.number}
                    className={`hiw-step-row hiw-step-row-${index + 1}`}
                  >
                    {/* Circle Node */}
                    <div className="hiw-step-circle" aria-label={`Step ${step.number}`}>
                      <span className="hiw-step-digit">{step.number}</span>
                    </div>

                    {/* Step Content */}
                    <div className="hiw-step-text-block">
                      <div className="hiw-step-header">
                        <IconComponent className="w-5 h-5 text-red-600 shrink-0" aria-hidden="true" />
                        <h3 className="hiw-step-name">{step.title}</h3>
                      </div>
                      <p className="hiw-step-detail">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
