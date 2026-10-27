import Link from "next/link";
import { delay } from "@/lib/motion";
import BookButton from "../booking/BookButton";
import SectionHeading from "../ui/SectionHeading";
import { ArrowRight } from "../ui/icons";
import { featuredConditions } from "@/content/home";

export default function ConditionsPreview() {
  return (
    <section className="py-24 lg:py-32">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            title="Chronic health conditions treated"
            lead="Personalized Ayurvedic root-cause treatment protocols for over 25 chronic and complex diseases."
          />
          <Link href="/conditions" className="btn btn-lg btn-outline w-full shrink-0 sm:w-auto sm:self-start lg:self-auto" data-reveal>
            Explore all 25 conditions treated
            <ArrowRight />
          </Link>
        </div>

        <ul className="mt-14 grid gap-x-16 md:grid-cols-2">
          {featuredConditions.map((c, i) => (
            <li
              key={c.name}
              data-reveal
              style={delay((i % 2) * 90)}
              className="group border-t border-line py-8"
            >
              <p className="text-sm font-semibold text-gold-ink">{c.dosha}</p>
              <h3 className="mt-2 font-display text-[1.65rem] leading-tight text-forest-950">{c.name}</h3>
              <p className="mt-3 max-w-[52ch] leading-relaxed text-body">{c.desc}</p>
              <BookButton condition={c.name} className="link-arrow mt-5 text-[0.9375rem] hover:text-forest-600">
                Book consultation
                <ArrowRight />
              </BookButton>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
