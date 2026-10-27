import Image from "next/image";
import Link from "next/link";
import BookButton from "../booking/BookButton";
import SectionHeading from "../ui/SectionHeading";
import { Activity, ArrowRight, Calendar, Droplets, Heart, Shield, Sparkles } from "../ui/icons";
import { panchakarmaPillars } from "@/content/panchakarma";

const icons = { droplets: Droplets, sparkles: Sparkles, heart: Heart, shield: Shield, activity: Activity };

export default function PanchakarmaDetail() {
  return (
    <section id="panchakarma" className="py-24 lg:py-32">
      <div className="shell">
        <SectionHeading
          title="The Panchakarma detox experience"
          lead="Ancient Ayurvedic five-fold bio-purification designed to detoxify tissues at the cellular level and awaken your body's self-healing intelligence."
        />

        <div className="mt-16 grid items-start gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="relative mx-auto w-full max-w-md lg:sticky lg:top-28 lg:col-span-5 lg:max-w-none" data-reveal>
            <div className="arch relative aspect-[4/5] bg-sand ring-1 ring-gold/30">
              <Image
                src="/images/panchakarma_room.png"
                alt="Luxury Panchakarma therapy room at Dr. Shivam Mishra's clinic"
                fill
                quality={90}
                sizes="(min-width: 1024px) 600px, 560px"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-8 left-4 right-4 rounded-2xl sm:left-1/2 sm:right-auto sm:w-[90%] sm:-translate-x-1/2 bg-forest-950 p-5 text-ivory shadow-[0_30px_60px_-25px_rgb(10_45_28/0.6)] ring-1 ring-gold/30">
              <p className="text-sm font-medium text-gold-light">Custom therapy chambers</p>
              <p className="mt-1 font-display text-xl">Medically supervised Panchakarma</p>
              <p className="mt-2 text-sm leading-relaxed text-ivory/65">
                Carved teakwood Droni tables, brass Shirodhara apparatus and pure herbal extracts.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <h3 className="font-display text-[1.9rem] leading-tight text-forest-950" data-reveal>
              5 pillars of medical purification
            </h3>
            <ol className="mt-8 border-t border-line">
              {panchakarmaPillars.map((p, i) => {
                const Icon = icons[p.icon];
                return (
                  <li key={p.title} data-reveal className="grid grid-cols-[auto_1fr] gap-x-6 border-b border-line py-7">
                    <span className="font-display text-[2.5rem] leading-none text-gold-deep" aria-hidden="true">
                      {i + 1}
                    </span>
                    <div>
                      <h4 className="flex items-center gap-2.5 text-lg font-semibold text-forest-950">
                        <Icon className="h-5 w-5 shrink-0 text-forest-600" />
                        {p.title}
                      </h4>
                      <p className="mt-2 leading-relaxed text-body">{p.desc}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center" data-reveal>
              <BookButton condition="Panchakarma Detox Therapy" className="btn btn-lg btn-gold w-full sm:w-auto">
                <Calendar />
                Book Panchakarma consultation
              </BookButton>
              <Link href="/patient-stories" className="link-arrow justify-center px-2 py-3 hover:text-forest-600">
                Read patient recovery outcomes
                <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
