import Link from "next/link";
import { delay } from "@/lib/motion";
import SectionHeading from "../ui/SectionHeading";
import Stars from "../ui/Stars";
import { ArrowRight, Quote, ShieldCheck } from "../ui/icons";
import { homeStories } from "@/content/home";

export default function HomeStories() {
  return (
    <section className="py-24 lg:py-32">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            title="Patient recovery stories"
            lead="Real outcomes from over 20,000 patients who recovered from chronic illness through authentic Ayurveda."
          />
          <Link href="/patient-stories" className="btn btn-lg btn-outline w-full shrink-0 sm:w-auto sm:self-start lg:self-auto" data-reveal>
            Read all patient success stories
            <ArrowRight />
          </Link>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {homeStories.map((s, i) => (
            <figure
              key={s.name}
              data-reveal
              style={delay(i * 100)}
              className="relative flex flex-col justify-between overflow-hidden rounded-[1.75rem] bg-white p-8 ring-1 ring-line lg:p-10"
            >
              <Quote className="absolute -bottom-6 -right-4 h-32 w-32 text-mint" />
              <div className="relative">
                <div className="flex items-center justify-between gap-4">
                  <Stars />
                  <span className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-mint px-3 py-1.5 text-xs font-semibold text-forest-800">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Verified patient
                  </span>
                </div>
                <p className="mt-4 text-sm font-semibold text-gold-ink">{s.condition}</p>
                <blockquote className="mt-4 font-display text-[1.45rem] leading-[1.45] text-forest-950">
                  “{s.story}”
                </blockquote>
              </div>
              <figcaption className="relative mt-8 flex items-center gap-4 border-t border-line pt-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-forest-800 font-display text-lg text-gold-light">
                    {s.name[0]}
                  </span>
                  <div>
                    <p className="font-semibold text-ink">{s.name}</p>
                    <p className="text-sm text-muted">{s.location}</p>
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
