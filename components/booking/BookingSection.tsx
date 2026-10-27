import BookingForm from "./BookingForm";
import { delay } from "@/lib/motion";
import { bookingBenefits } from "@/content/booking";
import { site } from "@/content/site";
import { Check, PhoneCall } from "../ui/icons";

/** Full-width appointment section with the booking form. */
export default function BookingSection({ defaultCondition }: { defaultCondition?: string }) {
  return (
    <section id="appointment" className="relative overflow-hidden bg-forest-950 py-24 text-ivory lg:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-gold/10 blur-3xl"
      />
      <div className="shell relative grid items-start gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5 lg:sticky lg:top-28" data-reveal>
          <h2 className="font-display text-[clamp(2.1rem,1.4rem+2.4vw,3.4rem)] font-normal leading-[1.06] tracking-[-0.015em]">
            Start your healing journey with Dr. Shivam Mishra
          </h2>
          <p className="mt-5 max-w-[48ch] text-[1.0625rem] leading-relaxed text-ivory/75">
            Book an in-person consultation at our Mumbai clinic or schedule a global HD video consultation from the
            comfort of your home.
          </p>

          <ul className="mt-9 divide-y divide-ivory/10 border-y border-ivory/10">
            {bookingBenefits.map((b) => (
              <li key={b.title} className="flex gap-4 py-4">
                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gold/15 text-gold">
                  <Check className="h-4 w-4" />
                </span>
                <div>
                  <div className="font-semibold text-ivory">{b.title}</div>
                  <div className="text-sm text-ivory/60">{b.desc}</div>
                </div>
              </li>
            ))}
          </ul>

          <a href={site.phone.tel} className="group mt-9 flex items-center gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gold text-forest-950 transition-transform group-hover:-rotate-6">
              <PhoneCall className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-sm text-ivory/60">Direct desk helpline</span>
              <span className="block whitespace-nowrap font-display text-2xl text-ivory transition-colors group-hover:text-gold-light">
                {site.phone.display}
              </span>
            </span>
          </a>
        </div>

        <div className="lg:col-span-7" data-reveal style={delay(120)}>
          <div className="rounded-[1.75rem] bg-ivory p-6 text-ink shadow-[0_40px_80px_-30px_rgb(0_0_0/0.5)] ring-1 ring-gold/30 sm:p-10">
            <div className="mb-7 border-b border-line pb-6">
              <h3 className="font-display text-[1.75rem] leading-tight text-forest-950">Schedule appointment</h3>
              <p className="mt-1.5 text-sm text-muted">
                Fill out the form below for instant consultation confirmation.
              </p>
            </div>
            <BookingForm defaultCondition={defaultCondition} />
          </div>
        </div>
      </div>
    </section>
  );
}
