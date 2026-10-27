import type { Metadata } from "next";
import PageShell from "@/components/layout/PageShell";
import PageHeader from "@/components/layout/PageHeader";
import { terms } from "@/content/legal";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms for consultations and appointments with Dr. Shivam Mishra Ayurveda.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  const [intro, ...items] = terms;
  return (
    <PageShell>
      <PageHeader
        title="Terms of service"
        description="Terms for consultations and appointments at our clinic and online."
        crumb="Terms of service"
      />
      <section className="py-20 lg:py-28">
        <div className="shell">
          <div className="max-w-[68ch] text-[1.0625rem] leading-[1.8] text-body">
            <p>{intro}</p>
            <ol className="mt-8 space-y-5">
              {items.map((t, i) => (
                <li key={t} className="grid grid-cols-[2rem_1fr] gap-2">
                  <span className="font-display text-xl leading-[1.6] text-gold-deep">{i + 1}.</span>
                  <span>{t}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
