export interface BusinessContact {
  name: string;
  shortName: string;
  tagline: string;
  brandIdentity: string;
  brandSignboard: string;
  primaryPhone: string;
  primaryPhoneTel: string;
  whatsAppNumber: string;
  whatsAppBaseUrl: string;
  mapsShareUrl: string;
  shopTimings: string;
  deliveryCoverage: string;
  addressPendingNote: string;
  hoursPendingNote: string;
  deliveryAreaPendingNote: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  whatsAppMessage: string;
  badge: string;
  iconName: 'Flame' | 'Repeat' | 'ShoppingBag' | 'Wrench';
  image: string;
}

export interface PrimaryService {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  note?: string;
  highlight?: string;
  priceTag: string;
  badge: string;
  image: string;
  whatsAppUrl: string;
  whatsAppButtonText: string;
  packagesOrSizesTitle: string;
  packagesOrSizes: {
    title: string;
    description: string;
    tag?: string;
  }[];
  features: string[];
  slug: string;
}

export interface SubServiceItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  whatsAppMessage: string;
  badge?: string;
  image?: string;
  price?: string;
  rating?: number;
  ratingCount?: number;
  discountBadge?: string;
}

export interface ServiceDetailItem extends ServiceItem {
  heroTagline: string;
  fullOverview: string;
  subServices: SubServiceItem[];
  requirementsTitle?: string;
  requirements?: string[];
  safetyChecklist?: string[];
}

export interface ProductItem {
  id: string;
  name: string;
  category: 'Stove' | 'Spare Part' | 'Cylinder';
  subCategory?: 'stoves' | 'regulators-hoses' | 'burners-spares' | 'cylinders';
  categoryLabel: string;
  description: string;
  priceTag: string; // 'WhatsApp for Best Price'
  inStock: boolean;
  image: string;
  features: string[];
  whatsAppMessage: string;
  price?: string;
  rating?: number;
  ratingCount?: number;
  discountBadge?: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  categoryTag: string;
  description: string;
  features: string[];
  whatsAppMessage: string;
  image: string;
  badge: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface PendingChecklistItem {
  item: string;
  currentEvidence: string;
  status: 'In Progress' | 'Pending Owner Confirmation' | 'Enquiry Mode Active';
  actionNeeded: string;
}

export const BUSINESS_DATA: BusinessContact = {
  name: 'Sri Mahalakshmi Super Gas Agency',
  shortName: 'Super Gas Agency',
  tagline: 'Gas Connections, Cylinders & Stove Enquiries',
  brandIdentity: 'Supergas Authorized Agency',
  brandSignboard: 'SUPERGAS Authorized Agency',
  primaryPhone: '+91 9652009647',
  primaryPhoneTel: 'tel:+919652009647',
  whatsAppNumber: '919652009647',
  whatsAppBaseUrl: 'https://wa.me/919652009647',
  mapsShareUrl: 'https://share.google/nGHiENHQo2weJcChe',
  shopTimings: '7:00 AM – 10:00 PM (Monday to Sunday, 7 days open)',
  deliveryCoverage: 'Within 5 km radius',
  addressPendingNote: 'Location available via Google Maps link. Exact building & street address available on enquiry.',
  hoursPendingNote: 'Open Monday to Sunday, 7:00 AM – 10:00 PM (7 Days Open).',
  deliveryAreaPendingNote: 'Fast doorstep delivery within 5 km coverage radius.',
};

export const DEEP_LINKS = {
  newConnection:
    'https://wa.me/919652009647?text=Hello%20Sri%20Mahalakshmi%20Super%20Gas,%20I%20want%20to%20apply%20for%20a%20New%20Gas%20Connection%20(Single/Double%20Cylinder)',
  refill:
    'https://wa.me/919652009647?text=Hello,%20I%20want%20to%20book%20a%20Gas%20Cylinder%20Refill.%20Please%20confirm%20delivery.',
  repair:
    'https://wa.me/919652009647?text=Hello,%20my%20gas%20stove%20needs%20repair.%20Please%20book%20a%20mechanic%20visit%20(%E2%82%B9200%20visit%20charge).',
  products:
    'https://wa.me/919652009647?text=Hello%20Sri%20Mahalakshmi%20Super%20Gas,%20I%20want%20to%20inquire%20about%20gas%20stoves,%20regulators,%20and%20spare%20parts.%20Please%20share%20details.',
  general: 'https://wa.me/919652009647?text=Hello%20Sri%20Mahalakshmi%20Super%20Gas,%20I%20would%20like%20to%20enquire%20about%20your%20services.',
};

export const PREFILLED_MESSAGES = {
  general: 'Hello Sri Mahalakshmi Super Gas, I would like to enquire about your gas agency services.',
  connection: 'Hello Sri Mahalakshmi Super Gas, I want to apply for a New Gas Connection (Single/Double Cylinder)',
  cylinder: (locality: string = '____') =>
    `Hello, I want to book a Gas Cylinder Refill. Please confirm delivery. My locality is: ${locality}.`,
  products: 'Hello Sri Mahalakshmi Super Gas, I want to inquire about gas stoves and spare parts. Please share price details.',
  repair: (locality: string = '____') =>
    `Hello, my gas stove needs repair. Please book a mechanic visit (₹200 visit charge). My locality is: ${locality}.`,
};

export function createWhatsAppLink(message: string, customNumber?: string): string {
  let num = customNumber;
  if (!num && typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('sri_mahalaxmi_whatsapp_number');
      if (stored && stored.trim() !== '') {
        num = stored.trim().replace(/[^0-9]/g, '');
      }
    } catch {
      // fallback
    }
  }
  const cleanNum = num || BUSINESS_DATA.whatsAppNumber;
  return `https://wa.me/${cleanNum}?text=${encodeURIComponent(message.trim())}`;
}

export function createProductWhatsAppLink(productName: string, category: string, customNumber?: string): string {
  const msg = `Hello Sri Mahalakshmi Super Gas, I want to inquire about ${productName} (${category}). Please share best price and availability.`;
  return createWhatsAppLink(msg, customNumber);
}

/**
 * Task 2: Primary Services defined in Project Brief
 */
export const PRIMARY_SERVICES: PrimaryService[] = [
  {
    id: 'new-connection',
    number: '01',
    title: 'New Connection Package',
    subtitle: 'Single Cylinder & Double Cylinder Connections',
    description:
      'Complete new domestic LPG gas connection package with genuine Supergas certification, full safety kit, and direct assistance.',
    note: 'Aadhar card photo required on WhatsApp for verification.',
    priceTag: 'WhatsApp for Best Price',
    badge: 'Popular Choice',
    image: '/images/cylinder.jpg',
    whatsAppUrl: DEEP_LINKS.newConnection,
    whatsAppButtonText: 'Apply on WhatsApp',
    packagesOrSizesTitle: 'Available Connection Packages',
    packagesOrSizes: [
      {
        title: 'Single Cylinder Package',
        description: '1 Cylinder + Gas Stove + Safety Regulator + Reinforced Hose Pipe + Spark Lighter (Complete Setup).',
        tag: 'Complete Starter Kit',
      },
      {
        title: 'Double Cylinder Package (DBC)',
        description: '2 Cylinders for continuous uninterrupted household cooking + Safety Regulator + Safety Hose.',
        tag: 'Ideal for Families',
      },
    ],
    features: [
      'Complete starter kitchen hardware included',
      'Simple WhatsApp paperless verification (Aadhar photo)',
      'Doorstep delivery & installation within 5 km',
    ],
    slug: 'new-connection',
  },
  {
    id: 'cylinder-refill',
    number: '02',
    title: 'Cylinder Refill Booking',
    subtitle: 'Domestic, Commercial & Mini Cylinders',
    description:
      'Fast and reliable LPG refill booking with doorstep delivery within 5 km radius. 100% verified tare weight and security seals.',
    priceTag: 'WhatsApp for Best Price',
    badge: 'Same Day Delivery',
    image: '/images/agency_counter.jpg',
    whatsAppUrl: DEEP_LINKS.refill,
    whatsAppButtonText: 'Book Refill on WhatsApp',
    packagesOrSizesTitle: 'Available Cylinder Sizes',
    packagesOrSizes: [
      {
        title: '14.2 Kg Domestic Cylinder',
        description: 'Supergas authorized domestic cylinder for family kitchen cooking.',
        tag: 'Domestic (Supergas)',
      },
      {
        title: '19 Kg Commercial Cylinder',
        description: 'High-volume commercial cylinders for restaurants, hotels, bakeries, and caterers.',
        tag: 'Commercial (Supergas, HP, Indane)',
      },
      {
        title: '5 Kg Mini Cylinder',
        description: 'Compact, ultra-portable cylinder designed for students, bachelors, and small setups.',
        tag: 'Mini (Supergas, HP, Indane)',
      },
    ],
    features: [
      'Genuine tamper-evident security seal on every cylinder',
      'Accurate weight inspection upon delivery',
      'Open 7:00 AM – 10:00 PM (Monday to Sunday, 7 days open)',
    ],
    slug: 'cylinder-refill',
  },
  {
    id: 'stove-repair',
    number: '03',
    title: 'Stove Repair & Servicing',
    subtitle: 'Doorstep Gas Stove Diagnosis & Servicing',
    description:
      'Certified technician visits to resolve burner blockages, poor flame heating, dangerous gas smells, and jammed dials.',
    highlight: 'Expert Technician Visit: Fixed ₹200 inspection charge (Spare parts extra)',
    priceTag: 'Fixed ₹200 Visit Charge',
    badge: 'Expert Visit',
    image: '/images/repair.jpg',
    whatsAppUrl: DEEP_LINKS.repair,
    whatsAppButtonText: 'Book Mechanic Visit (₹200)',
    packagesOrSizesTitle: 'Core Repair Services Covered',
    packagesOrSizes: [
      {
        title: 'Low Flame Fixing',
        description: 'Clearing jet orifices and burner nozzles to restore strong, energy-efficient blue flame.',
        tag: 'High Heat Restored',
      },
      {
        title: 'Burner Cleaning',
        description: 'Deep carbon and grease extraction from brass and cast-iron burners.',
        tag: 'Clean & Efficient',
      },
      {
        title: 'Leakage Testing',
        description: 'Comprehensive pressure test on regulators, joints, and internal stove manifolds.',
        tag: 'Safety Priority',
      },
      {
        title: 'Knob & Valve Replacement',
        description: 'Smooth replacement of broken switch knobs, stiff gas cocks, and leaking spindle valves.',
        tag: 'Genuine Spares',
      },
    ],
    features: [
      'Fixed ₹200 inspection charge (Spare parts extra)',
      'Doorstep service by experienced technicians within 5 km',
      'Instant WhatsApp booking with fast technician dispatch',
    ],
    slug: 'stove-repair',
  },
];

/**
 * Task 3: Products & Spare Parts Catalog from Project Brief
 */
export const PRODUCTS_CATALOG: ProductItem[] = [
  // Stoves Section (Mapped to "Gas Stoves & Bhattis")
  {
    id: 'stove-2b-steel',
    name: '2-Burner Stainless Steel Stove',
    category: 'Stove',
    subCategory: 'stoves',
    categoryLabel: 'Gas Stove',
    description: 'Durable, rust-free stainless steel body with heavy-duty high-efficiency brass burners for daily household cooking.',
    priceTag: 'WhatsApp for Best Price',
    price: '₹1,850',
    rating: 4.95,
    ratingCount: 128,
    discountBadge: 'POPULAR',
    inStock: true,
    image: '/images/stove.jpg',
    features: ['Rust-proof stainless steel body', 'High-efficiency solid brass burners', 'Heavy vessel pan supports', 'Easy-clean spill trays'],
    whatsAppMessage: 'Hello Sri Mahalakshmi Super Gas, I want to inquire about the 2-Burner Stainless Steel Stove. Please share best price and availability.',
  },
  {
    id: 'stove-glass-top',
    name: '2 & 3-Burner Glass Top Stove',
    category: 'Stove',
    subCategory: 'stoves',
    categoryLabel: 'Glass Cooktop',
    description: 'Modern toughened shatter-resistant glass cooktop with sleek styling, brass burners, and easy-to-wipe glossy surface.',
    priceTag: 'WhatsApp for Best Price',
    price: '₹2,650',
    rating: 5.09,
    ratingCount: 94,
    discountBadge: 'PREMIUM',
    inStock: true,
    image: '/images/stove_glass_top.jpg',
    features: ['Thermal-shock toughened glass', '2-Burner & 3-Burner options', 'Ergonomic heat-proof knobs', 'Sealed spill-proof burner cups'],
    whatsAppMessage: 'Hello Sri Mahalakshmi Super Gas, I want to inquire about the 2-Burner & 3-Burner Glass Top Stove. Please share best price and availability.',
  },
  {
    id: 'stove-1b-single',
    name: '1-Burner Single Stove',
    category: 'Stove',
    subCategory: 'stoves',
    categoryLabel: 'Compact Stove',
    description: 'Compact single-burner stove designed for bachelors, compact kitchen counters, and emergency backup cooking.',
    priceTag: 'WhatsApp for Best Price',
    price: '₹750',
    rating: 4.80,
    ratingCount: 65,
    discountBadge: 'COMPACT',
    inStock: true,
    image: '/images/stove_single_burner.jpg',
    features: ['Space-saving compact body', 'Heavy brass burner', 'Anti-skid rubber feet', 'Fuel-saving blue flame output'],
    whatsAppMessage: 'Hello Sri Mahalakshmi Super Gas, I want to inquire about the 1-Burner Single Stove. Please share best price and availability.',
  },
  {
    id: 'stove-commercial-bhatti',
    name: 'Commercial Bhatti (Hotel / Catering)',
    category: 'Stove',
    subCategory: 'stoves',
    categoryLabel: 'Commercial Bhatti',
    description: 'High-power heavy duty commercial gas bhatti built with sturdy angle frame and jumbo burner for hotels, tea stalls, and caterers.',
    priceTag: 'WhatsApp for Best Price',
    price: '₹2,200',
    rating: 4.90,
    ratingCount: 112,
    discountBadge: 'HEAVY DUTY',
    inStock: true,
    image: '/images/stove_commercial_bhatti.jpg',
    features: ['High-pressure jumbo cast iron burner', 'Heavy steel angle frame structure', 'Accommodates large pots & degchis', 'Commercial food grade build'],
    whatsAppMessage: 'Hello Sri Mahalakshmi Super Gas, I want to inquire about the Heavy Duty Commercial Bhatti (Hotel / Catering). Please share best price and availability.',
  },

  // Spare Parts Section - Supergas Regulators & Hoses
  {
    id: 'spare-regulator-supergas',
    name: 'Gas Regulator (Supergas)',
    category: 'Spare Part',
    subCategory: 'regulators-hoses',
    categoryLabel: 'Certified Safety Part',
    description: 'Supergas authorized domestic cylinder pressure regulator with airtight snap-on lock and excess-flow safety protection.',
    priceTag: 'WhatsApp for Best Price',
    price: '₹390',
    rating: 5.00,
    ratingCount: 240,
    discountBadge: 'SUPERGAS',
    inStock: true,
    image: '/images/regulator_supergas.jpg',
    features: ['Supergas authorized fitting', '100% leak-proof snap lock', 'Internal excess-flow cutoff mechanism', 'Certified safe domestic pressure'],
    whatsAppMessage: 'Hello Sri Mahalakshmi Super Gas, I want to inquire about the Gas Regulator (Supergas). Please share best price and availability.',
  },
  {
    id: 'spare-safety-pipe',
    name: 'Safety Rubber Pipe / Wiremesh Hose',
    category: 'Spare Part',
    subCategory: 'regulators-hoses',
    categoryLabel: 'Safety Piping',
    description: 'ISI-certified 3-layer steel-wire braided safety hose pipe designed to withstand rat bites, fire heat, and pressure spikes.',
    priceTag: 'WhatsApp for Best Price',
    price: '₹280',
    rating: 4.95,
    ratingCount: 185,
    discountBadge: '25% OFF',
    inStock: true,
    image: '/images/safety_pipe_hose.jpg',
    features: ['Embedded steel-wire mesh layer', 'Rodent & rat bite proof guarantee', 'Fire-retardant outer rubber', 'Standard 1.2m & 1.5m kitchen lengths'],
    whatsAppMessage: 'Hello Sri Mahalakshmi Super Gas, I want to inquire about the Safety Rubber Pipe / Wiremesh Hose. Please share best price and availability.',
  },
  {
    id: 'spare-spark-lighter',
    name: 'Spark Lighter',
    category: 'Spare Part',
    subCategory: 'regulators-hoses',
    categoryLabel: 'Kitchen Accessory',
    description: 'Heavy-duty stainless steel spark lighter providing reliable instant ignition without batteries, flint, or refilling hassles.',
    priceTag: 'WhatsApp for Best Price',
    price: '₹120',
    rating: 4.75,
    ratingCount: 88,
    discountBadge: 'ACCESSORY',
    inStock: true,
    image: '/images/accessories.jpg',
    features: ['Corrosion-free stainless steel body', 'Heavy-duty multi-spark spring', 'Ergonomic non-slip handle', 'Safe reach length for stove lighting'],
    whatsAppMessage: 'Hello Sri Mahalakshmi Super Gas, I want to inquire about the Spark Lighter. Please share best price and availability.',
  },

  // Spare Parts Section - Burners, Knobs & Jet Pins
  {
    id: 'spare-burner',
    name: 'Burner (Brass / Cast Iron)',
    category: 'Spare Part',
    subCategory: 'burners-spares',
    categoryLabel: 'Stove Spare Part',
    description: 'Precision-drilled heavy brass and cast iron replacement burners to restore full cooking heat and eliminate yellow smoky flame.',
    priceTag: 'WhatsApp for Best Price',
    price: '₹180',
    rating: 4.85,
    ratingCount: 160,
    discountBadge: 'SOLID BRASS',
    inStock: true,
    image: '/images/burners_knobs_pins.jpg',
    features: ['100% solid brass & cast iron options', 'Precision flame holes', 'Uniform heat distribution', 'Fits standard domestic stoves'],
    whatsAppMessage: 'Hello Sri Mahalakshmi Super Gas, I want to inquire about the Burner (Brass / Cast Iron). Please share best price and availability.',
  },
  {
    id: 'spare-switch-knob',
    name: 'Switch Knob (Pack of 2)',
    category: 'Spare Part',
    subCategory: 'burners-spares',
    categoryLabel: 'Stove Spare Part',
    description: 'Heat-resistant bakelite control knobs with universal D-shaft fitting for smooth, non-slip flame modulation.',
    priceTag: 'WhatsApp for Best Price',
    price: '₹80',
    rating: 4.70,
    ratingCount: 72,
    discountBadge: 'SPARE PART',
    inStock: true,
    image: '/images/burners_knobs_pins.jpg',
    features: ['Heat-resistant ABS / Bakelite', 'Universal D-shaft tight lock', 'Smooth rotation modulation', 'Durable long-lasting grip'],
    whatsAppMessage: 'Hello Sri Mahalakshmi Super Gas, I want to inquire about the Switch Knob. Please share best price and availability.',
  },
  {
    id: 'spare-jet-pin',
    name: 'Jet Pin & Gas Valve Nozzle',
    category: 'Spare Part',
    subCategory: 'burners-spares',
    categoryLabel: 'Precision Component',
    description: 'Accurately calibrated brass gas injector jet pins that eliminate gas choking and restore optimal fuel-air mixing.',
    priceTag: 'WhatsApp for Best Price',
    price: '₹60',
    rating: 4.90,
    ratingCount: 54,
    discountBadge: 'GENUINE',
    inStock: true,
    image: '/images/burners_knobs_pins.jpg',
    features: ['Solid brass orifice calibration', 'Stops carbon & soot accumulation', 'Restores pure blue heating flame', 'Available in all jet sizes'],
    whatsAppMessage: 'Hello Sri Mahalakshmi Super Gas, I want to inquire about the Jet Pin. Please share best price and availability.',
  },
  {
    id: 'spare-pan-stand',
    name: 'Heavy Pan Stand / Support',
    category: 'Spare Part',
    subCategory: 'burners-spares',
    categoryLabel: 'Stove Accessory',
    description: 'Heavy-gauge powder-coated steel and cast-iron pan support stands designed for rock-solid stability of kadhais and pressure cookers.',
    priceTag: 'WhatsApp for Best Price',
    price: '₹140',
    rating: 4.80,
    ratingCount: 66,
    discountBadge: 'HEAVY DUTY',
    inStock: true,
    image: '/images/burners_knobs_pins.jpg',
    features: ['Anti-wobble vessel grip', 'High-heat enamel powder coat', 'Rust and corrosion resistant', 'Fits round & flat bottom cookware'],
    whatsAppMessage: 'Hello Sri Mahalakshmi Super Gas, I want to inquire about the Pan Stand / Support. Please share best price and availability.',
  },

  // Cylinder Refill Sizes (Also showcaseable in catalog)
  {
    id: 'cyl-14kg-domestic',
    name: '14.2 Kg Domestic Cylinder (Supergas)',
    category: 'Cylinder',
    subCategory: 'cylinders',
    categoryLabel: 'Domestic LPG',
    description: 'Standard domestic cooking gas cylinder refill with verified gross weight and tamper-evident seal.',
    priceTag: 'WhatsApp for Best Price',
    price: 'Refill Booking',
    rating: 5.00,
    ratingCount: 310,
    discountBadge: 'SUPERGAS',
    inStock: true,
    image: '/images/refill_domestic_14kg.jpg',
    features: ['14.2 kg certified LPG quantity', 'Prompt doorstep delivery within 5 km', 'Tamper-evident holographic security seal', 'Tare weight verified on delivery'],
    whatsAppMessage: 'Hello Sri Mahalakshmi Super Gas, I want to inquire about booking a 14.2 Kg Domestic Cylinder Refill. Please confirm delivery.',
  },
  {
    id: 'cyl-19kg-commercial',
    name: '19 Kg Commercial Cylinder (Supergas, HP, Indane)',
    category: 'Cylinder',
    subCategory: 'cylinders',
    categoryLabel: 'Commercial LPG',
    description: 'High-capacity commercial blue cylinder for hotels, restaurants, bakeries, cloud kitchens, and caterers.',
    priceTag: 'WhatsApp for Best Price',
    price: 'Commercial Order',
    rating: 4.95,
    ratingCount: 145,
    discountBadge: 'COMMERCIAL',
    inStock: true,
    image: '/images/refill_commercial_19kg.jpg',
    features: ['19 kg high-power fuel capacity', 'Supergas, HP, and Indane availability', 'High-flow commercial regulator compatible', 'Priority dispatch for businesses'],
    whatsAppMessage: 'Hello Sri Mahalakshmi Super Gas, I want to inquire about 19 Kg Commercial Cylinder Refill. Please share delivery details.',
  },
  {
    id: 'cyl-5kg-mini',
    name: '5 Kg Mini Cylinder (Supergas, HP, Indane)',
    category: 'Cylinder',
    subCategory: 'cylinders',
    categoryLabel: 'Mini Portable LPG',
    description: 'Compact and ultra-portable cylinder designed for small apartments, students, bachelors, and outdoor catering.',
    priceTag: 'WhatsApp for Best Price',
    price: 'Portable Mini',
    rating: 4.90,
    ratingCount: 98,
    discountBadge: 'PORTABLE',
    inStock: true,
    image: '/images/refill_mini_5kg.jpg',
    features: ['5 kg lightweight & portable', 'Compact footprint for tight counters', 'Supergas, HP, Indane availability', 'Easy exchange and rapid delivery'],
    whatsAppMessage: 'Hello Sri Mahalakshmi Super Gas, I want to inquire about 5 Kg Mini Cylinder Refill. Please share delivery details.',
  },
];

// Core Services matching Navigation & Primary offerings
export const SERVICES: ServiceItem[] = [
  {
    id: 'new-connection',
    title: 'New Connection Package',
    subtitle: 'Single & Double Cylinder sets with safety kit',
    description: 'Complete Single & Double Cylinder connection packages with stove, regulator, pipe, and lighter.',
    highlights: [
      'Single & Double Cylinder packages',
      'Aadhar card photo on WhatsApp for verification',
      'Doorstep delivery within 5 km radius'
    ],
    whatsAppMessage: PREFILLED_MESSAGES.connection,
    badge: 'Popular Package',
    iconName: 'Flame',
    image: '/images/cylinder.jpg',
  },
  {
    id: 'cylinder-refill',
    title: 'Cylinder Refill Booking',
    subtitle: '14.2kg Domestic, 19kg Commercial & 5kg Mini',
    description: 'Fast booking coordination for cooking gas refills with prompt doorstep delivery within 5 km.',
    highlights: [
      '14.2kg Domestic (Supergas)',
      '19kg Commercial (Supergas, HP, Indane)',
      '5kg Mini Cylinder (Supergas, HP, Indane)'
    ],
    whatsAppMessage: DEEP_LINKS.refill,
    badge: 'Refill Booking',
    iconName: 'Repeat',
    image: '/images/agency_counter.jpg',
  },
  {
    id: 'stove-repair',
    title: 'Stove Repair & Servicing',
    subtitle: 'Fixed ₹200 inspection charge (Spares extra)',
    description: 'Doorstep repair for low flame, burner cleaning, gas leakage testing, and switch knob replacement.',
    highlights: [
      'Fixed ₹200 inspection charge (spares extra)',
      'Low flame fixing & burner cleaning',
      'Leakage testing & knob replacement'
    ],
    whatsAppMessage: DEEP_LINKS.repair,
    badge: 'Repair Service',
    iconName: 'Wrench',
    image: '/images/repair.jpg',
  },
];

export const SERVICE_DETAILS: Record<string, ServiceDetailItem> = {
  'new-connection': {
    ...SERVICES[0],
    heroTagline: 'Complete domestic LPG connection package with stove, regulator, wiremesh pipe, lighter, and prompt delivery.',
    fullOverview:
      'Starting a new domestic LPG connection is simple and straightforward at Sri Mahalakshmi Super Gas Agency. We provide complete setup packages including 1 or 2 cylinders, gas stove, Supergas authorized regulator, steel-wire reinforced safety hose, and spark lighter. Simply send your Aadhar card photo over WhatsApp for rapid paperless verification.',
    requirementsTitle: 'Verification & Requirements',
    requirements: [
      'Aadhaar card photo sent via WhatsApp for identity and address verification',
      'Active mobile number for delivery coordination',
      'Delivery address within our 5 km serviceable radius',
      'Choice of package: Single Cylinder starter kit or Double Cylinder family pack'
    ],
    safetyChecklist: [
      'Ensure kitchen platform has open ventilation and clear air circulation.',
      'Place cylinder upright on a level floor beneath the platform.',
      'Never place cylinder inside completely sealed unventilated wooden cabinets.',
      'Keep stove at least 1 meter away from electric sockets or spark sources.'
    ],
    subServices: [
      {
        id: 'single-cylinder-package',
        name: 'Single Cylinder Package',
        tagline: 'Complete domestic starter kit with stove',
        description: 'Complete setup including 1 cylinder, stove, safety regulator, pipe, and lighter.',
        features: [
          '1 Authorized domestic cylinder',
          'Gas stove included',
          'Certified Supergas regulator & safety pipe',
          'Spark lighter included in package'
        ],
        whatsAppMessage: 'Hello Sri Mahalakshmi Super Gas, I want to apply for the Single Cylinder Complete Package.',
        badge: 'Complete Starter Kit',
        discountBadge: 'POPULAR',
        price: 'Full Starter Kit',
        rating: 4.95,
        ratingCount: 120,
        image: '/images/cylinder.jpg'
      },
      {
        id: 'double-cylinder-package',
        name: 'Double Cylinder Package',
        tagline: 'Continuous uninterrupted cooking set',
        description: 'Dual-cylinder setup with reserve cylinder for seamless cooking for families.',
        features: [
          '2 Authorized domestic cylinders',
          'High-safety snap-on regulator',
          'Ideal for families and frequent cooking',
          'Seamless refill booking support'
        ],
        whatsAppMessage: 'Hello Sri Mahalakshmi Super Gas, I want to apply for the Double Cylinder Package (DBC).',
        badge: 'Recommended for Families',
        discountBadge: 'RECOMMENDED',
        price: '2-Cylinder Set',
        rating: 5.00,
        ratingCount: 98,
        image: '/images/double_cylinder.jpg'
      }
    ]
  },

  'cylinder-refill': {
    ...SERVICES[1],
    heroTagline: 'Prompt cooking gas cylinder refills delivered to your doorstep within 5 km.',
    fullOverview:
      'Running low on LPG? Sri Mahalakshmi Super Gas Agency coordinates fast refill delivery across our 5 km local coverage radius. We provide 14.2kg domestic cylinders, 19kg commercial cylinders, and 5kg mini cylinders with 100% verified gross weight and tamper-evident security seals.',
    requirementsTitle: 'Refill Booking Guidelines',
    requirements: [
      'Locality and landmark within 5 km radius',
      'Empty cylinder ready with safety cap attached',
      'Verify cylinder seal and weight upon delivery',
      'Timings: 7:00 AM – 10:00 PM (Monday to Sunday, 7 days open)'
    ],
    safetyChecklist: [
      'Turn the regulator switch to OFF position before removing it.',
      'Firmly snap the safety cap onto the empty cylinder valve.',
      'Check that the replacement cylinder has an intact security seal.',
      'Never test gas leaks with a flame or matchstick—use soap solution only.'
    ],
    subServices: [
      {
        id: 'domestic-14kg',
        name: '14.2kg Domestic Refill',
        tagline: 'Daily cooking cylinder for households',
        description: 'Supergas authorized domestic refill with intact seal delivered within 5 km.',
        features: [
          '14.2 kg net LPG cooking fuel',
          'Supergas authorized agency supply',
          'Doorstep delivery within 5 km',
          'Fast coordination over WhatsApp'
        ],
        whatsAppMessage: 'Hello, I want to book a 14.2 Kg Domestic Gas Cylinder Refill. Please confirm delivery.',
        badge: 'Everyday Household',
        discountBadge: 'SAME DAY',
        price: 'Refill Booking',
        rating: 4.95,
        ratingCount: 280,
        image: '/images/refill_domestic_14kg.jpg'
      },
      {
        id: 'commercial-19kg',
        name: '19kg Commercial Refill',
        tagline: 'High-volume fuel for hotels & caterers',
        description: 'Commercial 19kg blue cylinders with prompt same-day doorstep delivery.',
        features: [
          '19 kg commercial fuel capacity',
          'Available in Supergas, HP, and Indane',
          'Scheduled or same-day dispatch',
          'Priority service for commercial kitchens'
        ],
        whatsAppMessage: 'Hello, I want to book a 19 Kg Commercial Gas Cylinder Refill. Please confirm delivery.',
        badge: 'Commercial Kitchens',
        discountBadge: 'COMMERCIAL',
        price: 'Bulk Supply',
        rating: 4.90,
        ratingCount: 110,
        image: '/images/refill_commercial_19kg.jpg'
      },
      {
        id: 'mini-5kg',
        name: '5kg Mini Cylinder Refill',
        tagline: 'Compact portable cylinder for bachelors',
        description: 'Lightweight easy-carry mini cylinder ideal for bachelors and students.',
        features: [
          '5 kg portable compact capacity',
          'Available in Supergas, HP, and Indane',
          'Lightweight and easily movable',
          'Fast doorstep delivery within 5 km'
        ],
        whatsAppMessage: 'Hello, I want to book a 5 Kg Mini Gas Cylinder Refill. Please confirm delivery.',
        badge: 'Compact & Portable',
        discountBadge: 'PORTABLE',
        price: 'Mini Refill',
        rating: 4.85,
        ratingCount: 85,
        image: '/images/refill_mini_5kg.jpg'
      }
    ]
  },

  'stove-repair': {
    ...SERVICES[2],
    heroTagline: 'Expert technician doorstep visit with fixed ₹200 inspection charge (spare parts extra).',
    fullOverview:
      'A faulty stove can waste gas, generate black soot, or risk dangerous gas leaks. Sri Mahalakshmi Super Gas Agency provides skilled doorstep mechanic visits. We charge a fixed ₹200 inspection charge, with genuine replacement spare parts available if needed.',
    requirementsTitle: 'Common Stove Problems We Fix',
    requirements: [
      'Low flame or slow cooking heat',
      'Burner choking and black soot on cookware',
      'Gas smell or hissing sound near knob/hose',
      'Jammed, broken, or stiff control switch knobs',
      'Damaged regulator or worn safety pipe'
    ],
    safetyChecklist: [
      'If you smell gas, turn OFF cylinder regulator IMMEDIATELY.',
      'Open all kitchen windows and doors for ventilation.',
      'Do not switch ON or OFF any electrical switches or matchsticks.',
      'Book a technician immediately via WhatsApp or phone call.'
    ],
    subServices: [
      {
        id: 'low-flame-service',
        name: 'Low Flame & Jet Repair',
        tagline: 'Restore powerful blue cooking flame',
        description: 'Clearing carbon build-up and clogged jet nozzles to restore full cooking heat.',
        features: [
          'Deep carbon removal',
          'Precision jet calibration',
          'Eliminates black smoke on utensils',
          'Restores fuel-efficient blue flame'
        ],
        whatsAppMessage: 'Hello, my gas stove has low flame. Please book a mechanic visit (₹200 visit charge).',
        badge: 'High Heat Restored',
        discountBadge: 'FIXED ₹200',
        price: '₹200 Visit',
        rating: 4.95,
        ratingCount: 140,
        image: '/images/subservice_low_flame_v2.jpg'
      },
      {
        id: 'burner-cleaning',
        name: 'Burner Deep Cleaning',
        tagline: 'Deep carbon removal for brass burners',
        description: 'Thorough cleaning and unblocking of burner ports for even flame distribution.',
        features: [
          'Solid brass & cast iron servicing',
          'Uniform circular flame distribution',
          'Prevents uneven vessel heating',
          'Inspection charge: Fixed ₹200'
        ],
        whatsAppMessage: 'Hello, my gas stove burners need cleaning. Please book a mechanic visit (₹200 visit charge).',
        discountBadge: 'DEEP CLEAN',
        price: '₹200 Visit',
        rating: 4.90,
        ratingCount: 115,
        image: '/images/subservice_burner_cleaning_v2.jpg'
      },
      {
        id: 'leakage-testing',
        name: 'Gas Leakage Testing',
        tagline: 'Safety check for regulator & pipe',
        description: 'Positive pressure testing to detect leaks in manifold, clamps, and valve seals.',
        features: [
          'Soap solution positive leak test',
          'Manifold and clamp resealing',
          '100% kitchen safety verification',
          'Inspection charge: Fixed ₹200'
        ],
        whatsAppMessage: 'Hello, I suspect a gas leak or smell near my stove. Please book an urgent mechanic visit (₹200 visit charge).',
        badge: 'Urgent Safety',
        discountBadge: 'SAFETY AUDIT',
        price: '₹200 Visit',
        rating: 5.00,
        ratingCount: 165,
        image: '/images/subservice_gas_leak_v2.jpg'
      },
      {
        id: 'knob-replacement',
        name: 'Knob & Valve Replacement',
        tagline: 'Smooth effortless flame control dials',
        description: 'Replacing cracked, loose, or stuck control knobs with durable bakelite knobs.',
        features: [
          'Heat-resistant bakelite knobs',
          'High-temperature valve grease lubrication',
          'Smooth push-and-turn flame modulation',
          'Inspection charge: Fixed ₹200 (knob extra)'
        ],
        whatsAppMessage: 'Hello, my gas stove knob is broken / jammed. Please book a mechanic visit (₹200 visit charge).',
        discountBadge: 'GENUINE SPARES',
        price: '₹200 Visit',
        rating: 4.85,
        ratingCount: 92,
        image: '/images/subservice_knob_repair_v2.jpg'
      }
    ]
  }
};

export function getServiceDetail(id: string): ServiceDetailItem | undefined {
  return SERVICE_DETAILS[id];
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: 'stoves',
    name: 'Gas Stoves (Cooktops & Bhattis)',
    categoryTag: 'Stoves Section',
    description: 'Stainless steel stoves, toughened glass cooktops, 1-burner stoves, and heavy-duty commercial bhattis for hotels.',
    features: ['2-Burner Stainless Steel Stove', '2 & 3-Burner Glass Top Stove', '1-Burner Single Stove', 'Commercial Bhatti (Hotel / Catering)'],
    whatsAppMessage: PREFILLED_MESSAGES.products,
    image: '/images/stove.jpg',
    badge: 'WhatsApp for Best Price',
  },
  {
    id: 'spares-accessories',
    name: 'Spare Parts & Accessories',
    categoryTag: 'Spares Section',
    description: 'Supergas authorized regulators, steel wiremesh hoses, solid brass burners, switch knobs, jet pins, and pan stands.',
    features: ['Gas Regulator (Supergas)', 'Wiremesh Safety Hose', 'Brass Burners & Jet Pins', 'Switch Knobs & Spark Lighters'],
    whatsAppMessage: 'Hello Sri Mahalakshmi Super Gas, I want to inquire about spare parts and accessories.',
    image: '/images/accessories.jpg',
    badge: 'WhatsApp for Best Price',
  },
  {
    id: 'cylinders',
    name: 'Cylinder Refills & Sizes',
    categoryTag: 'LPG Cylinders',
    description: '14.2kg Domestic Supergas cylinders, 19kg Commercial cylinders, and 5kg Mini cylinders with doorstep delivery.',
    features: ['14.2 Kg Domestic (Supergas)', '19 Kg Commercial (Supergas, HP, Indane)', '5 Kg Mini Cylinder (Supergas, HP, Indane)', 'Doorstep delivery within 5 km'],
    whatsAppMessage: DEEP_LINKS.refill,
    image: '/images/cylinder.jpg',
    badge: 'WhatsApp for Best Price',
  },
];

export const FAQS: FAQItem[] = [
  {
    question: 'How do I book a cylinder refill or apply for a new connection?',
    answer:
      'We keep it fast and simple with zero complicated forms. Simply tap "WhatsApp" or call us at +91 9652009647. For new connections, send your Aadhar card photo over WhatsApp for quick paperless verification.',
  },
  {
    question: 'What are your shop timings and working days?',
    answer:
      'We are open 7 days a week from 7:00 AM to 10:00 PM (Monday to Sunday). You can reach us for urgent refills and emergency service during these hours.',
  },
  {
    question: 'What is your delivery coverage area?',
    answer:
      'We provide fast doorstep delivery within a 5 km radius of our agency for refills, new connection sets, stoves, and spare parts.',
  },
  {
    question: 'How much does a stove repair technician visit cost?',
    answer:
      'We have a fixed ₹200 inspection charge for expert technician visits. If any spare parts (such as knobs, jet pins, brass burners, or valves) are needed, they are charged extra at transparent rates.',
  },
  {
    question: 'What cylinder sizes do you supply?',
    answer:
      'We supply 14.2 Kg Domestic cylinders (Supergas), 19 Kg Commercial cylinders (Supergas, HP, Indane), and 5 Kg Mini cylinders (Supergas, HP, Indane).',
  },
  {
    question: 'How can I get the price for stoves or spare parts?',
    answer:
      'Every product card has a "WhatsApp for Best Price" / "Inquire on WhatsApp" button. Tap it to receive our best current deal, stock confirmation, and delivery scheduling instantly.',
  },
];

export const PENDING_CONTENT_CHECKLIST: PendingChecklistItem[] = [
  {
    item: 'Official Registered Business Name',
    currentEvidence: 'Confirmed in Project Brief: "Sri Mahalakshmi Super Gas Agency"',
    status: 'In Progress',
    actionNeeded: 'Verified against brief specifications.',
  },
  {
    item: 'SUPERGAS Brand Dealership Relationship',
    currentEvidence: 'Confirmed in Project Brief: "Supergas Authorized Agency"',
    status: 'In Progress',
    actionNeeded: 'Aligned with official branding guidelines.',
  },
  {
    item: 'Official Working Hours & Days',
    currentEvidence: 'Confirmed in Project Brief: 7:00 AM – 10:00 PM (Monday to Sunday, 7 days open)',
    status: 'In Progress',
    actionNeeded: 'Integrated into badges and header.',
  },
  {
    item: 'Delivery Coverage Area',
    currentEvidence: 'Confirmed in Project Brief: Within 5 km radius',
    status: 'In Progress',
    actionNeeded: 'Displayed across all service and product touchpoints.',
  },
];

/**
 * Dedicated Product Category Page Configuration
 * Maps the 5 dropdown menu items to rich individual showcase pages
 */
export interface ProductCategoryConfig {
  id: string;
  slug: string;
  aliases: string[];
  name: string;
  categoryKey: 'stoves' | 'regulators' | 'spares' | 'cylinders';
  menuDesc: string;
  badge: string;
  heroHeadingMain: string;
  heroHeadingAccent: string;
  leadText: string;
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
  guideTitle: string;
  guideDescription: string;
  guidePoints: { title: string; desc: string }[];
  faqs: { question: string; answer: string }[];
}

export const PRODUCT_CATEGORY_CONFIGS: Record<string, ProductCategoryConfig> = {
  stoves: {
    id: 'stoves',
    slug: 'stoves',
    aliases: ['gas-stoves-bhattis', 'gas-stoves'],
    name: 'Gas Stoves & Bhattis',
    categoryKey: 'stoves',
    menuDesc: '2-Burner Steel, Glass Top & Hotel Bhattis',
    badge: 'HIGH-EFFICIENCY BURNERS',
    heroHeadingMain: 'A smarter way to upgrade',
    heroHeadingAccent: '& get high-efficiency gas stoves',
    leadText:
      'Explore certified stainless steel cooktops, modern shatter-proof glass stoves, and heavy-duty hotel bhattis with 100% solid brass burners and prompt doorstep delivery across Hyderabad.',
    stat1Val: '100% Brass',
    stat1Label: 'Solid Burners',
    stat2Val: 'Same Day',
    stat2Label: 'Doorstep Setup',
    stat3Val: 'ISI Tested',
    stat3Label: 'Safety Standard',
    card1Image: '/images/stove.jpg',
    card1Alt: '2-Burner Stainless steel gas stove',
    card2Image: '/images/stove_glass_top.jpg',
    card2Alt: 'Modern toughened glass top gas stove',
    card3Image: '/images/stove_commercial_bhatti.jpg',
    card3Alt: 'Heavy duty commercial gas bhatti',
    guideTitle: 'Gas Stove Buyer & Maintenance Guide',
    guideDescription:
      'Expert advice from certified technicians on selecting the best cooktop for your home or commercial kitchen and maintaining clean blue flame efficiency.',
    guidePoints: [
      {
        title: 'Stainless Steel vs Toughened Glass Cooktops',
        desc: 'Stainless steel bodies are ultra-durable, rust-free, and ideal for heavy Indian vessel cooking. Toughened glass tops offer sleek contemporary aesthetics, scratch resistance, and effortless wipe-clean maintenance.',
      },
      {
        title: 'Solid Brass Burners for Blue Flame Heating',
        desc: 'All our stoves feature precision-drilled heavy brass burners that distribute heat uniformly, prevent yellow soot deposit on pots, and consume up to 15% less gas compared to cheap alloy burners.',
      },
      {
        title: 'Commercial Jumbo Bhattis for Catering & Hotels',
        desc: 'Designed with heavy-gauge angle iron frames and high-pressure cast burners to withstand continuous commercial heating, large biryani handis, and high-volume catering demands.',
      },
      {
        title: 'Doorstep Inspection & WhatsApp Best Price',
        desc: 'Every stove includes our agency testing guarantee before delivery. Connect directly over WhatsApp for model stock confirmation and best transparent rates.',
      },
    ],
    faqs: [
      {
        question: 'Which gas stove is best for daily family cooking in Indian kitchens?',
        answer:
          'For most families, our 2-Burner Stainless Steel or 2 & 3-Burner Toughened Glass Stoves are the most popular choices. Both feature heavy brass burners and strong pan supports that securely hold heavy pressure cookers and kadhais.',
      },
      {
        question: 'Do you deliver gas stoves to my home?',
        answer:
          'Yes, we provide prompt doorstep delivery within a 5 km radius across our agency coverage area. Our delivery executive can also assist with initial safe hose connection.',
      },
      {
        question: 'How do I clean clogged brass burners on my gas stove?',
        answer:
          'Soak the brass burners in warm soapy water with a splash of vinegar for 20 minutes, then gently brush the flame ports with a wire brush or pin. If low flame persists, book our technician for ₹200 doorstep deep cleaning.',
      },
      {
        question: 'What is the warranty and genuineness guarantee?',
        answer:
          'All stoves supplied by Sri Mahalakshmi Super Gas Agency are 100% brand new, authentic, and tested for zero leakage before customer handover.',
      },
    ],
  },
  regulators: {
    id: 'regulators',
    slug: 'regulators',
    aliases: ['supergas-regulators-hoses', 'regulators-hoses'],
    name: 'Supergas Regulators & Hoses',
    categoryKey: 'regulators',
    menuDesc: 'Certified regulators & wiremesh safety pipes',
    badge: 'SUPERGAS CERTIFIED SAFETY',
    heroHeadingMain: 'The safest standard for',
    heroHeadingAccent: '& genuine Supergas safety kits',
    leadText:
      'Authorized Supergas click-on regulators, 3-layer steel wiremesh rodent-proof safety hoses, and spark lighters with 100% leak-proof snap locks and certified pressure output.',
    stat1Val: 'Supergas',
    stat1Label: 'Authorized Fit',
    stat2Val: '3-Layer Wire',
    stat2Label: 'Rodent-Proof Pipe',
    stat3Val: '100%',
    stat3Label: 'Leak Tested',
    card1Image: '/images/regulator_supergas.jpg',
    card1Alt: 'Supergas certified domestic regulator',
    card2Image: '/images/safety_pipe_hose.jpg',
    card2Alt: 'Steel wiremesh braided safety pipe',
    card3Image: '/images/accessories.jpg',
    card3Alt: 'Stainless steel spark lighter and accessories',
    guideTitle: 'LPG Safety & Replacement Guidelines',
    guideDescription:
      'Vital home safety protocols regarding regulator lifespan, hose pipe replacement intervals, and leak detection.',
    guidePoints: [
      {
        title: 'Replace Rubber Hose Every 2 to 3 Years',
        desc: 'Over time, normal rubber tubes develop micro-cracks and harden due to heat and LPG vapors. Upgrading to our 3-layer steel-braided hose provides rodent bite protection and fire-retardant peace of mind.',
      },
      {
        title: 'Supergas Authorized Click-On Regulators',
        desc: 'Features an airtight internal O-ring seal and safety cutoff valve that maintains constant calibrated output pressure for your domestic burners.',
      },
      {
        title: 'Steel-Wire Braided Core Protection',
        desc: 'Pests and rats cannot puncture the embedded high-tensile steel mesh sleeve, preventing dangerous midnight gas leaks.',
      },
      {
        title: 'Immediate Doorstep Delivery & Fitting Assistance',
        desc: 'Need an urgent safety pipe or regulator replacement? WhatsApp our agency desk for same-day delivery within 5 km.',
      },
    ],
    faqs: [
      {
        question: 'How often should an LPG gas regulator be replaced?',
        answer:
          'Safety standards recommend replacing domestic LPG regulators every 5 years, or immediately if the switch knob becomes loose, leaks gas smell, or fails to lock securely on the cylinder valve.',
      },
      {
        question: 'Why is a steel wiremesh hose safer than normal orange rubber pipe?',
        answer:
          'A wiremesh safety hose contains a tough embedded steel braid between rubber layers. Rats and rodents cannot bite through it, and it withstands higher heat and physical wear without cracking.',
      },
      {
        question: 'Can your agency technician install the new regulator for me?',
        answer:
          'Yes! When you purchase a regulator or safety hose, our delivery team can safely snap-lock and test the fitting at your doorstep.',
      },
    ],
  },
  spares: {
    id: 'spares',
    slug: 'spares',
    aliases: ['burners-knobs-jet-pins', 'burners-spares'],
    name: 'Burners, Knobs & Jet Pins',
    categoryKey: 'spares',
    menuDesc: 'Brass burners, switch knobs, pan stands',
    badge: '100% GENUINE REPLACEMENTS',
    heroHeadingMain: 'Restore full cooking heat with',
    heroHeadingAccent: '& genuine gas stove spare parts',
    leadText:
      'Precision solid brass replacement burners, flame-modulating control knobs, orifice-calibrated jet pins, and heavy-gauge pan stands to eliminate soot, choking, and low flame.',
    stat1Val: 'Solid Brass',
    stat1Label: 'Genuine Burners',
    stat2Val: 'Universal Fit',
    stat2Label: 'Standard Stoves',
    stat3Val: '₹200 Visit',
    stat3Label: 'Doorstep Mechanic',
    card1Image: '/images/burners_knobs_pins.jpg',
    card1Alt: 'Solid brass burners, knobs and jet pins',
    card2Image: '/images/burner_cleaning_service.jpg',
    card2Alt: 'Burner cleaning and replacement service',
    card3Image: '/images/accessories.jpg',
    card3Alt: 'Pan stands and genuine replacement accessories',
    guideTitle: 'Stove Troubleshooting & Spare Identification',
    guideDescription:
      'How to determine whether your stove needs a replacement burner, new jet pin, control knob, or pan stand.',
    guidePoints: [
      {
        title: 'Yellow Flame & Utensil Blackening → Jet Pin & Burner',
        desc: 'Soot and yellow flame occur when burner holes clog or jet nozzles become enlarged. Replacing with genuine brass jet pins and cleaned burners restores 100% blue flame.',
      },
      {
        title: 'Loose or Stiff Rotation → Heat-Proof Bakelite Knobs',
        desc: 'Cracked or worn knob shafts slip without opening the gas valve. Our universal D-shaft knobs provide a snug, non-slip grip.',
      },
      {
        title: 'Wobbling Cookware → Heavy Gauge Pan Support Stands',
        desc: 'Bent pan stands create spilling hazards with heavy pressure cookers. Our heavy-duty enamel stands provide stable, flat support.',
      },
      {
        title: 'Fixed ₹200 Technician Inspection Charge',
        desc: 'Not sure which spare is required? Book our doorstep mechanic for a fixed ₹200 visit. We carry all genuine spares directly to your home.',
      },
    ],
    faqs: [
      {
        question: 'Do these burners fit all brands of domestic stoves?',
        answer:
          'Yes, our brass burners and jet pins are manufactured to universal standard domestic stove dimensions and fit popular brands like Prestige, Sunflame, Butterfly, Surya, and local stainless steel models.',
      },
      {
        question: 'How do I know if my stove jet pin is blocked or damaged?',
        answer:
          'If gas is hissing but flame is extremely low, or if the flame burns yellow and emits black soot onto cookware, the brass orifice nozzle is usually blocked or corroded and requires replacement.',
      },
      {
        question: 'Can I order spares on WhatsApp and have them delivered?',
        answer:
          'Yes! Tap the WhatsApp button on any item to confirm sizing with our technician and get fast delivery within 5 km.',
      },
    ],
  },
  cylinders: {
    id: 'cylinders',
    slug: 'cylinders',
    aliases: ['lpg-cylinders', 'cylinder-refills'],
    name: 'LPG Cylinders',
    categoryKey: 'cylinders',
    menuDesc: '14.2kg Domestic, 19kg Commercial & 5kg Mini',
    badge: 'VERIFIED WEIGHT & SECURITY SEAL',
    heroHeadingMain: 'Prompt delivery of genuine',
    heroHeadingAccent: '& verified weight LPG cylinders',
    leadText:
      'Domestic 14.2kg Supergas cylinders, 19kg commercial blue cylinders, and 5kg portable mini cylinders with intact security seals, prompt 5 km delivery, and tare weight verification.',
    stat1Val: '14.2kg / 19kg',
    stat1Label: 'Domestic & Commercial',
    stat2Val: '30 Min',
    stat2Label: 'Prompt Delivery',
    stat3Val: '100%',
    stat3Label: 'Weight Verified',
    card1Image: '/images/refill_domestic_14kg.jpg',
    card1Alt: '14.2kg Domestic Supergas cylinder',
    card2Image: '/images/refill_commercial_19kg.jpg',
    card2Alt: '19kg Commercial gas cylinder',
    card3Image: '/images/refill_mini_5kg.jpg',
    card3Alt: '5kg Portable mini gas cylinder',
    guideTitle: 'Cylinder Selection & Safe Booking Guide',
    guideDescription:
      'Select the ideal cylinder capacity for your household, hotel, cloud kitchen, bachelor room, or food truck.',
    guidePoints: [
      {
        title: '14.2 Kg Domestic Cylinder (Supergas)',
        desc: 'The standard domestic cylinder for households and families. Delivers clean, high-calorific cooking fuel for 4 to 6 weeks for average family cooking.',
      },
      {
        title: '19 Kg Commercial Blue Cylinder',
        desc: 'Engineered for continuous, high-volume cooking in restaurants, canteens, dhabas, bakeries, and tea stalls. Available for Supergas, HP, and Indane.',
      },
      {
        title: '5 Kg Portable Mini Cylinder',
        desc: 'Compact, lightweight, and easy to transport for students, bachelors, compact studio kitchens, camping, or emergency backup fuel.',
      },
      {
        title: '100% Weight Verification at Your Doorstep',
        desc: 'Our delivery specialists check tare weight and gross weight on digital hanging scales right at your door with intact holographic safety seals.',
      },
    ],
    faqs: [
      {
        question: 'How do I book a cylinder refill without automated IVR delays?',
        answer:
          'Simply message your consumer details and address to our agency desk on WhatsApp (+91 9652009647). We confirm dispatch immediately.',
      },
      {
        question: 'What is the delivery radius for cylinder delivery?',
        answer:
          'We deliver to homes and businesses located within a 5 km radius of our agency in Hyderabad.',
      },
      {
        question: 'Do I need documents for a new connection?',
        answer:
          'For a new connection, simply send a photo of your Aadhaar card via WhatsApp for fast paperless setup.',
      },
    ],
  },
};

export function getProductCategoryConfig(slugOrAlias: string): ProductCategoryConfig | undefined {
  const norm = slugOrAlias.toLowerCase();
  for (const key of Object.keys(PRODUCT_CATEGORY_CONFIGS)) {
    const config = PRODUCT_CATEGORY_CONFIGS[key];
    if (config.id === norm || config.slug === norm || config.aliases.includes(norm)) {
      return config;
    }
  }
  return undefined;
}

export function getProductCategoryKey(p: ProductItem): 'stoves' | 'regulators' | 'spares' | 'cylinders' {
  if (p.subCategory === 'stoves' || p.category === 'Stove') return 'stoves';
  if (p.subCategory === 'cylinders' || p.category === 'Cylinder') return 'cylinders';
  if (p.subCategory === 'regulators-hoses') return 'regulators';
  if (p.subCategory === 'burners-spares') return 'spares';

  const nameDesc = (p.name + ' ' + p.description).toLowerCase();
  if (
    nameDesc.includes('regulator') ||
    nameDesc.includes('pipe') ||
    nameDesc.includes('hose') ||
    nameDesc.includes('lighter')
  ) {
    return 'regulators';
  }
  return 'spares';
}

export function getProductsByCategory(categoryKey: 'stoves' | 'regulators' | 'spares' | 'cylinders'): ProductItem[] {
  return PRODUCTS_CATALOG.filter((p) => getProductCategoryKey(p) === categoryKey);
}

export function getProductById(id: string): ProductItem | undefined {
  return PRODUCTS_CATALOG.find((p) => p.id === id);
}

