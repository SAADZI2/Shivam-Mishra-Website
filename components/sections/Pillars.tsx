import BookButton from "../booking/BookButton";
import { delay } from "@/lib/motion";
import SectionHeading from "../ui/SectionHeading";
import { ArrowRight, FileText, HeartPulse, Leaf, Search, Sparkles, Users } from "../ui/icons";
import { pillars } from "@/content/pillars";

const icons = {
  users: Users,
  search: Search,
  file: FileText,
  leaf: Leaf,
  sparkles: Sparkles,
  "heart-pulse": HeartPulse,
};

export default function Pillars() {
  return (
    <section id="why-trust" className="bg-sand py-24 lg:py-32">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            title="Why thousands choose Dr. Shivam Mishra"
            lead="Combining authentic Ayurvedic scripts with patient-centric clinical care to deliver transformative, lasting health outcomes."
          />
          <div data-reveal className="shrink-0">
            <BookButton className="btn btn-lg btn-forest w-full sm:w-auto">
              <span className="sm:hidden">Start your healing plan</span>
              <span className="hidden sm:inline">Start your personalized healing plan today</span>
              <ArrowRight />
            </BookButton>
          </div>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-[1.75rem] bg-line ring-1 ring-line md:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p, i) => {
            const Icon = icons[p.icon];
            return (
              <article
                key={p.title}
                data-reveal
                style={delay((i % 3) * 90)}
                className="group bg-ivory p-8 transition-colors duration-300 hover:bg-white lg:p-10"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-mint text-forest-800 transition-colors duration-300 group-hover:bg-forest-800 group-hover:text-gold-light">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="rounded-full border border-gold/40 px-3 py-1 text-xs font-semibold text-gold-ink">
                    {p.badge}
                  </span>
                </div>
                <h3 className="mt-8 font-display text-[1.6rem] leading-tight text-forest-950">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-body">{p.desc}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
