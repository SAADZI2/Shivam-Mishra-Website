import type { Metadata } from "next";
import PageShell from "@/components/layout/PageShell";
import PageHeader from "@/components/layout/PageHeader";
import ConditionsExplorer from "@/components/sections/ConditionsExplorer";
import BookingSection from "@/components/booking/BookingSection";

const description =
  "Comprehensive Ayurvedic root-cause treatment protocols for over 25 chronic medical conditions.";

export const metadata: Metadata = {
  title: "Chronic Conditions Treated",
  description,
  alternates: { canonical: "/conditions" },
};

export default function ConditionsPage() {
  return (
    <PageShell>
      <PageHeader title="Chronic conditions treated" description={description} crumb="Conditions" />
      <ConditionsExplorer />
      <BookingSection />
    </PageShell>
  );
}
