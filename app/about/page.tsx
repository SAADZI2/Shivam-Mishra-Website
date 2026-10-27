import type { Metadata } from "next";
import PageShell from "@/components/layout/PageShell";
import PageHeader from "@/components/layout/PageHeader";
import AboutIntro from "@/components/sections/AboutIntro";
import Pillars from "@/components/sections/Pillars";
import CtaBand from "@/components/sections/CtaBand";

const description =
  "Senior Ayurvedic Physician specializing in authentic, result-driven root-cause treatment for chronic and complex health conditions.";

export const metadata: Metadata = {
  title: "About Dr. Shivam Mishra",
  description,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <PageShell>
      <PageHeader title="About Dr. Shivam Mishra" description={description} crumb="About doctor" />
      <AboutIntro />
      <Pillars />
      <div className="pt-24 lg:pt-32">
        <CtaBand
          title="Start your personalized healing plan today"
          text="Book an in-person consultation at our Mumbai clinic or schedule a global HD video consultation from the comfort of your home."
        />
      </div>
    </PageShell>
  );
}
