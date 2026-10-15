# Sri Mahalaxmi Super Gas Agency — Content & Verification Checklist

**Last Updated:** October 7, 2026  
**Status:** Version 1 Working Enquiry Preview Built  
**Central Config File:** [`src/config/businessData.ts`](file:///c:/Users/Medida%20Kavitha/OneDrive/Desktop/mhalaxmi%20super%20gas%20agency/src/config/businessData.ts)

---

## 1. Evidence and Content Status Matrix

| Detail | Source Evidence | v1 Implementation | Launch Action Required | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Business Name** | Handwritten note appears to say *"Sri Mahalaxmi Super Gas Agency"* | Working name in header, hero, meta, and footer | Confirm exact trade license / invoice registered spelling | ⚠️ Pending Confirmation |
| **Storefront Brand** | Storefront photo clearly displays **SUPERGAS** | Displayed as *"Storefront: SUPERGAS"* with explicit brand presence badge | Clarify whether agency holds authorized franchise / dealership status | ⚠️ Pending Confirmation |
| **Primary Phone** | User supplied `096520 09647`; board shows `9652009647` | Implemented across site as `+91 96520 09647` and `tel:+919652009647` | Verified against board photo | ✅ Confirmed |
| **WhatsApp Number** | Shop board displays WhatsApp symbol beside `9652009647` | Base URL `https://wa.me/919652009647` with pre-filled enquiry parameters | Verified active receiver desk | ✅ Implemented |
| **Location Link** | Google Maps share link: `https://share.google/I3kH1FzumhRJKcp9k` | "Open in Google Maps" direct link on website | Verified Google Business Profile linked | ✅ Confirmed |
| **Map Embed** | Share link provided | Link-only used. Embed omitted until verified Google Maps iframe src is obtained | Obtain embeddable Google Maps iframe tag if map embed is desired | ⚠️ Pending Embed Src |
| **New Connections** | Storefront & note: *"New Connection Available"* | Dedicated service card with documentation enquiry flow | Confirm connection package options and document checklist | ⚠️ Enquiry Mode Active |
| **Domestic Refills** | Listed in handwritten note | Dedicated service card with locality-based prefill message | Confirm area coverage, scheduling, and standard delivery timelines | ⚠️ Enquiry Mode Active |
| **Stoves & Accessories** | Note lists stoves, regulators, pipes, lighters, etc. | 7 categorized product cards with *"Ask about availability"* CTAs | Confirm brand names and live in-shop inventory list | ⚠️ Enquiry Mode Active |
| **Stove Repair** | Listed in note and shop board | Dedicated repair service card with issue diagnostic flow | Clarify service scope: in-shop repair vs. home technician visit | ⚠️ Enquiry Mode Active |
| **Indane / HP / Bharatgas** | Mentioned loosely in handwritten notes | **EXCLUDED** from public website copy to avoid false partnership claims | Obtain written confirmation before mentioning any oil company brands | 🚫 Excluded from v1 |
| **Handwritten Numbers (1/2, 150/200)** | Handwritten scribbles | **EXCLUDED** from public packages and pricing | Clarify whether rates should be published or remain phone-quoted | 🚫 Excluded from v1 |
| **Second Phone Number** | Partially obscured on shop board photo | **EXCLUDED** until confirmed by proprietor | Request 10-digit number if secondary hotline is wanted | ⚠️ Pending Confirmation |
| **Business Hours** | Standard retail assumptions | Marked as standard operational hours (Mon–Sat) | Confirm opening/closing times and Sunday status | ⚠️ Pending Confirmation |

---

## 2. Customer Enquiry Behavior Rules Applied in v1

1. **Enquiry Portal Principle:** All Call and WhatsApp actions connect visitors directly to the proprietor. No claims of confirmed booking, payment processing, or delivery arrival are made on the site.
2. **Interactive Prefilled Messages:**
   - General: `"Hello, I would like to enquire about your gas agency services."`
   - Connection: `"Hello, I would like details about a new gas connection."`
   - Cylinder Refill: `"Hello, I would like to enquire about a cylinder refill. My locality is: [Locality]."`
   - Products & Stoves: `"Hello, I would like to enquire about gas stoves/accessories."`
   - Repair: `"Hello, I need help with stove repair. My locality is: [Locality]."`
3. **Privacy Compliance:** No cookies, trackers, advertising pixels, or databases are deployed. Visitor clicks open native phone dialers and WhatsApp apps.

---

## 3. How to Update Content When Confirmed

All business text, numbers, links, and service cards are located in a single file:
**[`src/config/businessData.ts`](file:///c:/Users/Medida%20Kavitha/OneDrive/Desktop/mhalaxmi%20super%20gas%20agency/src/config/businessData.ts)**

When the proprietor confirms details, simply update the values in that file and run `npm run build`.
