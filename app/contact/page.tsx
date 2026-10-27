import type { Metadata } from "next";
import PageShell from "@/components/layout/PageShell";
import PageHeader from "@/components/layout/PageHeader";
import ContactSection from "@/components/sections/ContactSection";
import BookingSection from "@/components/booking/BookingSection";

const description =
  "Visit Dr. Shivam Mishra’s clinic in Bandra West, Mumbai, or connect via helpline and WhatsApp.";

export const metadata: Metadata = {
  title: "Contact & Clinic Location",
  description,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <PageShell>
      <PageHeader title="Contact & clinic location" description={description} crumb="Contact us" />
      <ContactSection asPageIntro />
      <BookingSection />
    </PageShell>
  );
}
