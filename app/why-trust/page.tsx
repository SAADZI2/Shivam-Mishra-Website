import type { Metadata } from "next";
import PageShell from "@/components/layout/PageShell";
import PageHeader from "@/components/layout/PageHeader";
import Pillars from "@/components/sections/Pillars";
import StoriesCarousel from "@/components/sections/StoriesCarousel";

const description =
  "Discover the 6 core pillars of clinical precision, authentic herbs, and personalized root-cause healing.";

export const metadata: Metadata = {
  title: "Why Patients Trust Dr. Shivam",
  description,
  alternates: { canonical: "/why-trust" },
};

export default function WhyTrustPage() {
  return (
    <PageShell>
      <PageHeader title="Why patients trust Dr. Shivam" description={description} crumb="Why trust us" />
      <Pillars />
      <StoriesCarousel />
    </PageShell>
  );
}
