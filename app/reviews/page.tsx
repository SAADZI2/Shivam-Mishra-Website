import type { Metadata } from "next";
import PageShell from "@/components/layout/PageShell";
import PageHeader from "@/components/layout/PageHeader";
import ReviewsSection from "@/components/sections/ReviewsSection";
import StoriesCarousel from "@/components/sections/StoriesCarousel";

const description =
  "Rated 5.0 out of 5 stars based on 47+ verified patient reviews across Mumbai and internationally.";

export const metadata: Metadata = {
  title: "Verified Google Reviews",
  description,
  alternates: { canonical: "/reviews" },
};

export default function ReviewsPage() {
  return (
    <PageShell>
      <PageHeader title="Verified Google reviews" description={description} crumb="Google reviews" />
      <ReviewsSection showHeading={false} />
      <StoriesCarousel />
    </PageShell>
  );
}
