import type { Metadata } from "next";
import PageShell from "@/components/layout/PageShell";
import PageHeader from "@/components/layout/PageHeader";
import StoriesCarousel from "@/components/sections/StoriesCarousel";
import ReviewsSection from "@/components/sections/ReviewsSection";

const description =
  "Authentic healing outcomes and verified testimonials from patients treated by Dr. Shivam Mishra.";

export const metadata: Metadata = {
  title: "Patient Recovery Stories",
  description,
  alternates: { canonical: "/patient-stories" },
};

export default function PatientStoriesPage() {
  return (
    <PageShell>
      <PageHeader title="Patient recovery stories" description={description} crumb="Patient stories" />
      <StoriesCarousel showHeading={false} />
      <ReviewsSection />
    </PageShell>
  );
}
