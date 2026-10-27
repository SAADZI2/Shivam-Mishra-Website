import type { Metadata } from "next";
import PageShell from "@/components/layout/PageShell";
import PageHeader from "@/components/layout/PageHeader";
import FaqList from "@/components/sections/FaqList";
import BookingSection from "@/components/booking/BookingSection";
import { faqs } from "@/content/faqs";

const description =
  "Comprehensive answers to common questions about Ayurvedic consultations, root-cause healing, Panchakarma, and medicine delivery.";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description,
  alternates: { canonical: "/faqs" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FaqsPage() {
  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
      />
      <PageHeader title="Frequently asked questions" description={description} crumb="FAQs" />
      <FaqList />
      <BookingSection />
    </PageShell>
  );
}
