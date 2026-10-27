import type { Metadata } from "next";
import PageShell from "@/components/layout/PageShell";
import PageHeader from "@/components/layout/PageHeader";
import PanchakarmaDetail from "@/components/sections/PanchakarmaDetail";
import BookingSection from "@/components/booking/BookingSection";

const description =
  "Deep cellular bio-purification, organ rejuvenation, and stress relief in our luxury Bandra West facility.";

export const metadata: Metadata = {
  title: "Panchakarma Detox Experience",
  description,
  alternates: { canonical: "/panchakarma" },
};

export default function PanchakarmaPage() {
  return (
    <PageShell defaultCondition="Panchakarma Detox Therapy">
      <PageHeader title="Panchakarma detox experience" description={description} crumb="Panchakarma" />
      <PanchakarmaDetail />
      <BookingSection defaultCondition="Panchakarma Detox Therapy" />
    </PageShell>
  );
}
