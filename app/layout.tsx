import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["SOFT", "opsz"],
});

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A2D1C",
};

const description =
  "Leading Ayurvedic Physician in Mumbai specializing in authentic root-cause healing for IBS, Psoriasis, Rheumatoid Arthritis, Diabetes & Chronic Conditions. Over 20,000 patients treated with 5-star rating.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Dr. Shivam Mishra | Senior Ayurvedic Physician Mumbai | Root-Cause Healing",
    template: "%s | Dr. Shivam Mishra, Ayurvedic Physician Mumbai",
  },
  description,
  applicationName: site.brand,
  authors: [{ name: site.name }],
  creator: site.name,
  keywords: [
    "Best Ayurvedic Doctor Mumbai",
    "Ayurveda Treatment Mumbai",
    "Panchakarma Therapy Mumbai",
    "IBS Ayurvedic Treatment",
    "Psoriasis Ayurvedic Doctor",
    "Diabetes Ayurvedic Treatment",
    "Joint Pain Ayurvedic Treatment",
    "Chronic Disease Ayurveda",
    "Root Cause Healing Ayurveda",
    "Authentic Ayurveda Mumbai",
    "Dr Shivam Mishra Ayurveda",
  ],
  robots: { index: true, follow: true },
  formatDetection: { telephone: true, address: true, email: false },
  openGraph: {
    title: "Dr. Shivam Mishra | Senior Ayurvedic Physician Mumbai",
    description:
      "Authentic Ayurveda. Root-Cause Healing. Lasting Results. Trusted by 20,000+ patients across India and internationally.",
    url: "/",
    siteName: site.brand,
    locale: "en_IN",
    type: "website",
    images: [{ url: "/images/dr_shivam_official.png", width: 1200, height: 630, alt: "Dr. Shivam Mishra, Senior Ayurvedic Physician, Mumbai" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Shivam Mishra | Senior Ayurvedic Physician Mumbai",
    description: "Root-cause Ayurvedic healing for chronic conditions. 20,000+ patients treated with 5-Star Google rating.",
    images: ["/images/dr_shivam_official.png"],
  },
};

// Structured data so Google can show the clinic, rating, hours and phone in search.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["Physician", "MedicalClinic"],
  name: site.brand,
  description,
  url: site.url,
  image: `${site.url}/images/dr_shivam_official.png`,
  telephone: site.phone.e164,
  medicalSpecialty: "Ayurveda",
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: "IN",
  },
  geo: { "@type": "GeoCoordinates", latitude: site.address.geo.lat, longitude: site.address.geo.lng },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:30",
      closes: "19:30",
    },
  ],
  aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", reviewCount: "47", bestRating: "5" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${fraunces.variable} ${manrope.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
