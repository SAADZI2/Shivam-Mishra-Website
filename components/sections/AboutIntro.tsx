import Image from "next/image";
import BookButton from "../booking/BookButton";
import SectionHeading from "../ui/SectionHeading";
import { Award, Calendar, Check } from "../ui/icons";
import { about } from "@/content/home";
import { site } from "@/content/site";

type Props = {
  image?: string;
  imageAlt?: string;
};

export default function AboutIntro({
  image = "/images/dr_shivam_official.png",
  imageAlt = "Dr. Shivam Mishra, Senior Ayurvedic Physician",
}: Props) {
  return (
    <section id="about" className="py-24 lg:py-32">
      <div className="shell grid items-center gap-16 lg:grid-cols-12 lg:gap-20">
        <div className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none" data-reveal>
          <div className="arch relative aspect-[4/5] bg-sand ring-1 ring-gold/30">
            <Image
              src={image}
              alt={imageAlt}
              fill
              quality={90}
              sizes="(min-width: 1024px) 600px, 560px"
              className="object-cover object-top"
            />
          </div>
          <div className="absolute -bottom-8 left-4 right-4 rounded-2xl bg-forest-950 p-4 sm:left-1/2 sm:right-auto sm:w-[88%] sm:-translate-x-1/2 sm:p-5 text-ivory shadow-[0_30px_60px_-25px_rgb(10_45_28/0.6)] ring-1 ring-gold/30">
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gold text-forest-950 sm:h-12 sm:w-12">
                <Award className="h-6 w-6" />
              </span>
              <div>
                <p className="whitespace-nowrap font-display text-base leading-tight sm:text-lg">{site.role}</p>
                <p className="mt-1 whitespace-nowrap text-xs text-gold-light sm:text-sm">{site.credentials}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <SectionHeading title={about.heading} />
          <div className="mt-7 space-y-4 text-[1.0625rem] leading-[1.75] text-body" data-reveal>
            {about.paragraphs.map((p, i) => (
              <p key={i}>
                {i === 0 ? (
                  <>
                    <strong className="font-semibold text-forest-950">Dr. Shivam Mishra</strong>
                    {p.replace("Dr. Shivam Mishra", "")}
                  </>
                ) : (
                  p
                )}
              </p>
            ))}
          </div>

          <ul className="mt-9 grid gap-x-8 gap-y-3.5 sm:grid-cols-2" data-reveal>
            {about.features.map((f) => (
              <li key={f} className="flex items-center gap-3 font-semibold text-forest-950">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-mint text-forest-600">
                  <Check className="h-3.5 w-3.5" />
                </span>
                {f}
              </li>
            ))}
          </ul>

          <dl className="mt-10 grid grid-cols-1 gap-px min-[440px]:grid-cols-2 overflow-hidden rounded-2xl bg-line ring-1 ring-line" data-reveal>
            {about.stats.map((s) => (
              <div key={s.label} className="bg-ivory p-5 sm:p-6">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block whitespace-nowrap font-display text-[clamp(1.6rem,1.2rem+1.4vw,2.25rem)] leading-none text-forest-800">
                    {s.value}
                  </span>
                  <span className="mt-2.5 block text-[0.9375rem] font-semibold text-ink">{s.label}</span>
                  <span className="block text-sm text-muted">{s.desc}</span>
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-10" data-reveal>
            <BookButton className="btn btn-lg btn-forest w-full sm:w-auto">
              <Calendar />
              Book consultation with Dr. Shivam
            </BookButton>
          </div>
        </div>
      </div>
    </section>
  );
}
