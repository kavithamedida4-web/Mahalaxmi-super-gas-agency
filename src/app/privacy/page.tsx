import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ShieldCheck, ArrowLeft, Phone, MessageCircle, Lock, Info, CheckCircle2 } from 'lucide-react';
import { BUSINESS_DATA } from '@/config/businessData';

export const metadata: Metadata = {
  title: `Privacy & Contact Notice | ${BUSINESS_DATA.name}`,
  description: 'Understand how phone calls, WhatsApp messages, and contact actions work on this local gas agency enquiry website.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function PrivacyPage() {
  return (
    <main className="privacy-page-root">
      <div className="container privacy-container">
        
        <div className="back-link-wrapper">
          <Link href="/" className="back-link">
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </Link>
        </div>

        <header className="privacy-header">
          <div className="privacy-badge">
            <ShieldCheck size={16} />
            <span>Transparency Notice</span>
          </div>
          <h1 className="privacy-title">Privacy &amp; Contact Policy</h1>
          <p className="privacy-subtitle">
            Information regarding how visitor contact actions work on the <strong>{BUSINESS_DATA.name}</strong> website.
          </p>
        </header>

        <div className="privacy-content-card">
          
          <section className="policy-section">
            <div className="policy-section-header">
              <Info size={20} className="section-icon" />
              <h2>1. How Contact Actions Work (Call &amp; WhatsApp)</h2>
            </div>
            <p>
              This website is designed strictly as an <strong>enquiry portal</strong> for local residents seeking domestic gas assistance, cylinder refill guidance, stove purchases, or repair services.
            </p>
            <ul>
              <li>
                <strong>Click-to-Call Links:</strong> Clicking on <code>{BUSINESS_DATA.primaryPhone}</code> triggers your device&apos;s standard telephone dialer. No call logs are captured or stored by this website.
              </li>
              <li>
                <strong>WhatsApp Messaging Links:</strong> Clicking our WhatsApp enquiry buttons redirects you to the official WhatsApp interface (<code>wa.me/919652009647</code>) with pre-filled text. You remain in complete control and must press &ldquo;Send&rdquo; within your WhatsApp application.
              </li>
              <li>
                <strong>No Automatic Bookings:</strong> Sending an enquiry message does not constitute an automatic booking, confirmed delivery schedule, or payment processing. The agency proprietor or staff will review your message and reply directly to finalize arrangements.
              </li>
            </ul>
          </section>

          <section className="policy-section">
            <div className="policy-section-header">
              <Lock size={20} className="section-icon" />
              <h2>2. No Trackers, Cookies, or Data Storage</h2>
            </div>
            <p>
              We respect visitor privacy:
            </p>
            <div className="guarantees-grid">
              <div className="guarantee-box">
                <CheckCircle2 size={16} className="guarantee-check" />
                <span><strong>No Tracking Cookies:</strong> We do not set persistent advertising, profiling, or tracking cookies on your device.</span>
              </div>
              <div className="guarantee-box">
                <CheckCircle2 size={16} className="guarantee-check" />
                <span><strong>No Analytics Beacons:</strong> No third-party behavioral surveillance scripts or advertising pixels are loaded.</span>
              </div>
              <div className="guarantee-box">
                <CheckCircle2 size={16} className="guarantee-check" />
                <span><strong>No Form Database:</strong> We do not store your name or phone number in an online database via web forms.</span>
              </div>
            </div>
          </section>

          <section className="policy-section">
            <div className="policy-section-header">
              <MessageCircle size={20} className="section-icon" />
              <h2>3. Communication Privacy</h2>
            </div>
            <p>
              When you choose to contact <strong>{BUSINESS_DATA.name}</strong> via phone or WhatsApp, any details you voluntarily disclose (such as your residential area or appliance model) are used solely by the agency to address your service request. We do not sell, rent, or trade your contact information with external marketing organizations.
            </p>
          </section>

          <section className="policy-section">
            <div className="policy-section-header">
              <Phone size={20} className="section-icon" />
              <h2>4. Agency Contact Details</h2>
            </div>
            <p>
              For any questions regarding our operational procedures or service information, please reach out to us directly:
            </p>
            <div className="contact-summary-box">
              <p><strong>Business:</strong> {BUSINESS_DATA.name}</p>
              <p><strong>Phone:</strong> <a href={BUSINESS_DATA.primaryPhoneTel}>{BUSINESS_DATA.primaryPhone}</a></p>
              <p><strong>WhatsApp:</strong> +91 96520 09647</p>
              <p><strong>Location:</strong> <a href={BUSINESS_DATA.mapsShareUrl} target="_blank" rel="noopener noreferrer">View Google Maps Pin</a></p>
            </div>
          </section>

        </div>

      </div>
    </main>
  );
}
