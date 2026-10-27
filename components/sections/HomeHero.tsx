import Image from "next/image";
import { delay } from "@/lib/motion";
import BookButton from "../booking/BookButton";
import Stars from "../ui/Stars";
import { Award, Calendar, CircleCheck, MessageCircle, Phone } from "../ui/icons";
import { heroHighlights } from "@/content/home";
import { site, whatsappLink } from "@/content/site";

const d = delay;

export default function HomeHero() {
  return (
    <section className="relative isolate overflow-hidden bg-forest-950 text-ivory">
      <Image
        src="/images/hero_ayurvedic_bg.png"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        loading="eager"
        fetchPriority="high"
        quality={70}
        className="-z-20 scale-110 object-cover opacity-35 blur-[2px]"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-forest-950 via-forest-950/92 to-forest-950/55" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-forest-950 to-transparent" />

      <div className="shell grid items-center gap-14 pb-12 pt-14 md:pt-20 lg:grid-cols-[1.12fr_0.88fr] lg:gap-12 lg:pb-16 lg:pt-20">
        {/* Copy */}
        <div>
          <p className="anim-fade flex items-center gap-3 text-sm font-medium text-gold-light">
            <Award className="h-4 w-4" />
            Senior Ayurvedic Physician, Mumbai, India
          </p>

          <h1 className="mt-7 font-display text-[clamp(2rem,0.9rem+5.4vw,4.6rem)] font-normal leading-[0.98] tracking-[-0.025em]">
            <span className="anim-rise block" style={d(0)}>
              Authentic Ayurveda<span className="text-gold">.</span>
            </span>
            <span className="anim-rise block" style={d(60)}>
              Root-cause healing<span className="text-gold">.</span>
            </span>
            <span className="anim-rise block" style={d(120)}>
              Lasting results<span className="text-gold">.</span>
            </span>
          </h1>

          <p className="anim-rise mt-8 max-w-[50ch] text-lg leading-relaxed text-ivory/75" style={d(180)}>
            Trusted by <strong className="font-semibold text-ivory">20,000+ patients</strong> across India and
            internationally for personalized Ayurvedic treatment of chronic and complex health conditions.
          </p>

          <div className="anim-rise mt-10 flex flex-col gap-3 sm:flex-row" style={d(240)}>
            <BookButton className="btn btn-lg btn-gold">
              <Calendar />
              Book appointment
            </BookButton>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-lg btn-outline-light">
              <MessageCircle />
              WhatsApp consultation
            </a>
          </div>

          <a href={site.phone.tel} className="anim-rise group mt-9 inline-flex items-center gap-3.5" style={d(300)}>
            <span className="grid h-11 w-11 place-items-center rounded-full bg-forest-600 text-ivory transition-transform group-hover:-rotate-12">
              <Phone className="h-[18px] w-[18px]" />
            </span>
            <span className="leading-tight">
              <span className="block text-sm text-ivory/60">Direct helpline / WhatsApp</span>
              <span className="block whitespace-nowrap text-lg font-semibold text-ivory transition-colors group-hover:text-gold-light">
                {site.phone.display}
              </span>
            </span>
          </a>
        </div>

        {/* Portrait in the arch */}
        <div className="relative mx-auto w-full max-w-[24rem] sm:max-w-[27rem] lg:mr-0 lg:max-w-[30rem]">
          <svg
            aria-hidden="true"
            viewBox="0 0 100 125"
            preserveAspectRatio="none"
            fill="none"
            className="absolute -inset-3 h-[calc(100%+1.5rem)] w-[calc(100%+1.5rem)] text-gold/60 sm:-inset-4 sm:h-[calc(100%+2rem)] sm:w-[calc(100%+2rem)]"
          >
            <path
              className="anim-draw"
              style={d(150)}
              pathLength={1}
              d="M0.5 124.5V50a49.5 49.5 0 0 1 99 0v74.5"
              stroke="currentColor"
              strokeWidth="0.35"
            />
          </svg>
          <div className="arch anim-arch relative aspect-[4/5] bg-forest-800 ring-1 ring-gold/25" style={d(0)}>
            <Image
              src="/images/dr_shivam_official.png"
              alt="Dr. Shivam Mishra, Senior Ayurvedic Physician"
              fill
              loading="eager"
              fetchPriority="high"
              quality={90}
              sizes="(min-width: 1024px) 740px, (min-width: 640px) 660px, 600px"
              className="object-cover object-top"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-forest-950/70 to-transparent" />
          </div>

          <div
            className="anim-rise absolute -left-3 bottom-8 rounded-2xl bg-ivory px-5 py-4 text-ink shadow-[0_24px_50px_-20px_rgb(0_0_0/0.55)] sm:-left-10"
            style={d(450)}
          >
            <Stars className="h-4 w-4" />
            <p className="mt-1.5 whitespace-nowrap font-display text-xl leading-none text-forest-950">
              {site.stats.rating} Google rating
            </p>
            <p className="mt-1 whitespace-nowrap text-xs text-muted">{site.stats.reviews} verified reviews</p>
          </div>

          <div
            className="anim-rise absolute -right-3 top-[38%] rounded-2xl bg-forest-800/90 px-4 py-3 shadow-xl ring-1 ring-gold/30 backdrop-blur-md sm:-right-8"
            style={d(550)}
          >
            <p className="whitespace-nowrap font-display text-2xl leading-none text-gold-light">{site.stats.patients}</p>
            <p className="mt-1 whitespace-nowrap text-xs text-ivory/75">patients treated</p>
          </div>
        </div>
      </div>

      {/* Highlights */}
      <div className="shell">
        <ul className="anim-fade grid grid-cols-1 gap-x-6 gap-y-5 border-t sm:grid-cols-2 border-ivory/10 py-8 lg:grid-cols-4" style={d(350)}>
          {heroHighlights.map((h) => (
            <li key={h.title} className="flex items-start gap-3">
              <CircleCheck className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
              <div>
                <p className="text-[0.9375rem] font-semibold text-ivory">{h.title}</p>
                <p className="text-sm text-ivory/55">{h.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
