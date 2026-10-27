import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "../ui/icons";

/** Home teaser for Panchakarma: split layout so the photo is never stretched beyond its real resolution. */
export default function PanchakarmaBand() {
  return (
    <section className="relative overflow-hidden bg-forest-950 text-ivory">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 rounded-full bg-gold/10 blur-3xl"
      />
      <div className="shell relative grid items-center gap-12 py-20 lg:grid-cols-2 lg:gap-16 lg:py-28">
        <div data-reveal>
          <p className="flex items-center gap-2.5 text-sm font-medium text-gold-light">
            <Sparkles className="h-4 w-4" />
            Luxury Panchakarma sanctuary
          </p>
          <h2 className="mt-5 font-display text-[clamp(2.2rem,1.4rem+2.8vw,3.75rem)] font-normal leading-[1.04] tracking-[-0.02em]">
            Experience deep cellular detoxification
          </h2>
          <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-ivory/75">
            Ancient Ayurvedic five-fold bio-purification designed to eliminate systemic toxins, calm the nervous system,
            and restore organ vitality.
          </p>
          <Link href="/panchakarma" className="btn btn-lg btn-gold mt-10 w-full sm:w-auto">
            Learn about Panchakarma procedures
            <ArrowRight />
          </Link>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:max-w-none" data-reveal>
          <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] ring-1 ring-gold/30">
            <Image
              src="/images/panchakarma_room.png"
              alt="Panchakarma therapy room with carved teakwood droni and herbal oils"
              fill
              quality={90}
              sizes="(min-width: 1024px) 600px, (min-width: 640px) 576px, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-5 left-6 rounded-2xl bg-ivory px-5 py-3.5 text-forest-950 shadow-[0_24px_50px_-20px_rgb(0_0_0/0.55)] sm:left-8">
            <p className="whitespace-nowrap font-display text-lg leading-tight">Medically supervised</p>
            <p className="whitespace-nowrap text-xs text-muted">Custom therapy chambers, Bandra West</p>
          </div>
        </div>
      </div>
    </section>
  );
}
