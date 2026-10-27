import type { Metadata } from "next";
import PageShell from "@/components/layout/PageShell";
import PageHeader from "@/components/layout/PageHeader";
import { privacy } from "@/content/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Dr. Shivam Mishra Ayurveda protects your personal and medical information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <PageShell>
      <PageHeader
        title="Privacy policy"
        description="How we protect your personal and medical information."
        crumb="Privacy policy"
      />
      <section className="py-20 lg:py-28">
        <div className="shell">
          <div className="max-w-[68ch] space-y-6 text-[1.0625rem] leading-[1.8] text-body">
            {privacy.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
