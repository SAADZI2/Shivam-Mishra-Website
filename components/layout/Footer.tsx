import Link from "next/link";
import Logo from "../ui/Logo";
import { Clock, MapPin, MessageCircle, Phone, ShieldCheck } from "../ui/icons";
import { site, whatsappLink } from "@/content/site";
import { disclaimer } from "@/content/legal";

const explore = [
  { label: "About Dr. Shivam", href: "/about" },
  { label: "Why patients trust us", href: "/why-trust" },
  { label: "Conditions treated", href: "/conditions" },
  { label: "Panchakarma experience", href: "/panchakarma" },
  { label: "Patient success stories", href: "/patient-stories" },
  { label: "Google reviews", href: "/reviews" },
  { label: "Clinic gallery", href: "/gallery" },
  { label: "Frequently asked questions", href: "/faqs" },
  { label: "Contact & location", href: "/contact" },
];

const specializations = [
  "IBS & Digestive Disorders",
  "Psoriasis & Eczema Skin Care",
  "Rheumatoid & Osteoarthritis",
  "Sciatica & Disc Bulge Protocol",
  "Diabetes & Metabolic Health",
  "Asthma & Chronic Allergies",
  "Kidney Stones & Renal Care",
  "Panchakarma Cellular Detox",
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-forest-950 text-ivory">
      <div className="shell pb-10 pt-20">
        <div className="grid gap-12 border-b border-ivory/10 pb-14 md:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Logo tone="dark" />
            <p className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed text-ivory/65">
              Authentic Ayurvedic root-cause healing for chronic and complex diseases. Over 20,000 patients treated across
              India and internationally with a 5-Star Google rating.
            </p>
            <p className="mt-6 flex items-center gap-2.5 text-sm text-gold-light">
              <ShieldCheck className="h-4 w-4 shrink-0" />
              Certified Ayurvedic Clinical Practice, Mumbai
            </p>
          </div>

          <div className="lg:col-span-3">
            <h2 className="font-display text-lg text-gold-light">Explore</h2>
            <ul className="mt-5 space-y-2.5 text-[0.9375rem]">
              {explore.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-ivory/70 transition-colors hover:text-ivory">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h2 className="font-display text-lg text-gold-light">Specializations</h2>
            <ul className="mt-5 space-y-2.5 text-[0.9375rem] text-ivory/70">
              {specializations.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="font-display text-lg text-gold-light">Visit the clinic</h2>
            <ul className="mt-5 space-y-4 text-[0.9375rem]">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-ivory/70 hover:text-ivory">
                  {site.address.full}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span className="text-ivory/70">{site.hours}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a href={site.phone.tel} className="whitespace-nowrap font-semibold text-ivory hover:text-gold-light">
                  {site.phone.display}
                </a>
              </li>
              <li className="flex gap-3">
                <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ivory/70 hover:text-ivory"
                >
                  WhatsApp consultation desk
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-8 text-sm text-ivory/55 lg:flex-row lg:items-center lg:justify-between">
          <p>
            © {new Date().getFullYear()} {site.brand}. All rights reserved. Designed for authentic root-cause healing.
          </p>
          <div className="flex shrink-0 items-center gap-6 whitespace-nowrap">
            <Link href="/privacy" className="hover:text-ivory">
              Privacy policy
            </Link>
            <Link href="/terms" className="hover:text-ivory">
              Terms of service
            </Link>
          </div>
        </div>
        <p className="mt-8 max-w-4xl text-xs leading-relaxed text-ivory/40">{disclaimer}</p>
      </div>
    </footer>
  );
}
