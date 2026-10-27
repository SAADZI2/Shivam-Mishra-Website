import type { Metadata } from "next";
import PageShell from "@/components/layout/PageShell";
import PageHeader from "@/components/layout/PageHeader";
import GalleryExplorer from "@/components/sections/GalleryExplorer";
import CtaBand from "@/components/sections/CtaBand";

const description =
  "Explore our state-of-the-art Ayurveda facility in Bandra West, Mumbai, custom Panchakarma therapy suites, and authentic herb preparation environment.";

export const metadata: Metadata = {
  title: "Clinic & Panchakarma Gallery",
  description,
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <PageShell>
      <PageHeader title="Clinic & Panchakarma gallery" description={description} crumb="Gallery" />
      <GalleryExplorer />
      <CtaBand />
    </PageShell>
  );
}
