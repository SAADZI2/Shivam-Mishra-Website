import type { Metadata } from "next";
import PageShell from "@/components/layout/PageShell";
import HomeHero from "@/components/sections/HomeHero";
import AboutIntro from "@/components/sections/AboutIntro";
import Pillars from "@/components/sections/Pillars";
import ConditionsPreview from "@/components/sections/ConditionsPreview";
import PanchakarmaBand from "@/components/sections/PanchakarmaBand";
import HomeStories from "@/components/sections/HomeStories";
import GalleryPreview from "@/components/sections/GalleryPreview";
import BookingSection from "@/components/booking/BookingSection";
import ContactSection from "@/components/sections/ContactSection";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function HomePage() {
  return (
    <PageShell>
      <HomeHero />
      <AboutIntro image="/images/doctor_consultation.png" imageAlt="Dr. Shivam Mishra's consultation chamber" />
      <Pillars />
      <ConditionsPreview />
      <PanchakarmaBand />
      <HomeStories />
      <GalleryPreview />
      <BookingSection />
      <ContactSection />
    </PageShell>
  );
}
