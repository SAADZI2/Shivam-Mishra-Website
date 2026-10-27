/**
 * ─────────────────────────────────────────────────────────────
 *  SITE SETTINGS — edit contact details here and they update
 *  everywhere (header, footer, booking, contact page, SEO).
 * ─────────────────────────────────────────────────────────────
 */
export const site = {
  name: "Dr. Shivam Mishra",
  brand: "Dr. Shivam Mishra Ayurveda",
  role: "Senior Ayurvedic Physician",
  credentials: "BAMS • Root-Cause Healing Specialist",
  tagline: "Authentic Ayurveda. Root-Cause Healing. Lasting Results.",
  url: "https://drshivammishra.com",

  phone: {
    display: "+91 96890 92980",
    tel: "tel:+919689092980",
    e164: "+919689092980",
  },
  whatsapp: {
    number: "919689092980",
    url: "https://wa.me/919689092980",
    defaultMessage: "Hello Dr. Shivam Mishra, I would like to inquire about a consultation.",
  },
  address: {
    street: "Ayurveda Wellness Center, Turner Road, Bandra West",
    city: "Mumbai",
    region: "Maharashtra",
    postalCode: "400050",
    country: "India",
    full: "Ayurveda Wellness Center, Turner Road, Bandra West, Mumbai, Maharashtra 400050, India",
    short: "Bandra West, Mumbai, India",
    geo: { lat: 19.059639, lng: 72.827552 },
  },
  hours: "Mon – Sat: 09:30 AM – 07:30 PM (Prior Appointment)",
  hoursShort: "Mon – Sat, 09:30 AM – 07:30 PM",
  consultation: "In-Clinic + Online Video",

  mapsUrl: "https://maps.google.com/?q=Bandra+West+Mumbai+Ayurveda",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.793751761803!2d72.827552!3d19.059639!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9135063065b%3A0x605658fcfd8c7c94!2sBandra%20West%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  googleProfileUrl: "https://google.com/maps",

  stats: {
    patients: "20,000+",
    rating: "5.0",
    reviews: "47+",
    countries: "30+",
  },
} as const;

/** WhatsApp link with an optional prefilled message. */
export function whatsappLink(message: string = site.whatsapp.defaultMessage) {
  return `${site.whatsapp.url}?text=${encodeURIComponent(message)}`;
}

/** Opens WhatsApp in a new tab (client-side only). */
export function openWhatsApp(message?: string) {
  window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
}

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; desc: string }[];
};

/** Main navigation — grouped so the header never wraps. */
export const nav: NavItem[] = [
  {
    label: "About",
    href: "/about",
    children: [
      { label: "About Dr. Shivam Mishra", href: "/about", desc: "Background, philosophy and credentials" },
      { label: "Why patients trust us", href: "/why-trust", desc: "Six pillars of clinical care" },
    ],
  },
  {
    label: "Treatments",
    href: "/conditions",
    children: [
      { label: "Conditions treated", href: "/conditions", desc: "Protocols for 25+ chronic conditions" },
      { label: "Panchakarma", href: "/panchakarma", desc: "Five-fold detox and rejuvenation" },
    ],
  },
  {
    label: "Patient stories",
    href: "/patient-stories",
    children: [
      { label: "Recovery stories", href: "/patient-stories", desc: "Verified outcomes from real patients" },
      { label: "Google reviews", href: "/reviews", desc: "Rated 5.0 from 47+ reviews" },
    ],
  },
  { label: "Gallery", href: "/gallery" },
  { label: "FAQs", href: "/faqs" },
  { label: "Contact", href: "/contact" },
];
