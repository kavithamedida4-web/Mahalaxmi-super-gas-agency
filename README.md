# Sri Mahalaxmi Super Gas Agency — Website

A responsive, high-performance enquiry website for **Sri Mahalaxmi Super Gas Agency**. Built with Next.js, TypeScript, and modern Vanilla CSS according to the Developer Project Brief.

---

## 🚀 Key Features

- **Direct Call & WhatsApp Action Flows:** Click-to-call (`tel:+919652009647`) and instant WhatsApp chat (`wa.me/919652009647`) with context-specific, URL-encoded prefilled messages.
- **Interactive WhatsApp Enquiry Generator:** Visitors can select their request type (Cylinder Refill, New Connection, Stove/Spares, Repair) and enter their locality name to build and launch customized messages.
- **Four Core Services:**
  1. New Gas Connection Enquiries
  2. Cylinder Refill Enquiries
  3. Gas Stoves & Genuine Accessories
  4. Stove Repair & Servicing Enquiries
- **Product & Spares Catalog:** Filterable categories covering Gas Stoves (2 & 3 burner), LPG Regulators, Reinforced Safety Hoses, Spark Lighters, Brass Burners, Control Knobs, and Cylinder Trolleys with "Ask about availability" actions.
- **Factual, Restrained Content:** strictly adheres to evidence guidelines; no invented testimonials, false claims, unauthorized oil company logos, or unverified package pricing.
- **Centralized Business Configuration:** All business data, phone numbers, links, copy, and pending notes are located in [`src/config/businessData.ts`](src/config/businessData.ts).
- **Sticky Mobile Action Bar:** High-contrast Call and WhatsApp action buttons on mobile screens that do not obscure page content.
- **Privacy Policy Page (`/privacy`):** Fully documented privacy notice explaining how click-to-call and WhatsApp actions work without cookies, trackers, or databases.
- **Internal Content Checklist:** Embedded collapsible reviewer checklist and standalone [`CONTENT_CHECKLIST.md`](CONTENT_CHECKLIST.md) tracking 7 pending items before public launch.

---

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Vanilla CSS design system (`src/app/globals.css`) with CSS custom properties, glassmorphism, responsive breakpoints, and accessible contrast.
- **Icons:** Lucide React
- **Hosting Target:** Compatible with Vercel, Netlify, Cloudflare Pages, or Node.js server.

---

## 💻 Getting Started Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) (or the port displayed in terminal) in your browser.

### 3. Build for Production
```bash
npm run build
```

### 4. Run Production Build
```bash
npm run start -- -p 3001
```

---

## 📝 Updating Business Information

All business details are centralized in one single configuration file:
**[`src/config/businessData.ts`](src/config/businessData.ts)**

To update any detail:
- **Phone number:** Edit `primaryPhone` and `primaryPhoneTel`.
- **WhatsApp number:** Edit `whatsAppNumber`.
- **Storefront Name / Brand:** Edit `name`, `shortName`, and `brandSignboard`.
- **Google Maps link:** Edit `mapsShareUrl`.
- **Services:** Edit items in the `SERVICES` array.
- **Products:** Edit items in the `PRODUCT_CATEGORIES` array.
- **Pre-filled messages:** Edit strings in `PREFILLED_MESSAGES`.

---

## 📋 Launch Requirements (Pending Items)

Before public launch and search indexation, the following items should be confirmed by the proprietor:
1. Exact registered trade name spelling.
2. Official dealership designation with SUPERGAS.
3. Formal street address, door number, and PIN code.
4. Confirmed operating hours and Sunday status.
5. Serviceable delivery localities and delivery fees.
6. Secondary phone number (if required).
7. Written authorization if Indane, HP, or Bharatgas services are to be mentioned.

See [`CONTENT_CHECKLIST.md`](CONTENT_CHECKLIST.md) for full tracking details.
