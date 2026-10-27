import BookButton from "../booking/BookButton";
import { Calendar, Phone } from "../ui/icons";
import { site } from "@/content/site";

export default function CtaBand({
  title = "Experience healing in our luxury sanctuary",
  text = "Book your in-clinic consultation at our Bandra West, Mumbai clinic or schedule a convenient online video consultation today.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="pb-24 lg:pb-32">
      <div className="shell">
        <div
          data-reveal
          className="relative overflow-hidden rounded-[2rem] bg-mint px-7 py-14 text-center ring-1 ring-forest-600/15 sm:px-12 lg:py-20"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 200 250"
            fill="none"
            className="pointer-events-none absolute -bottom-24 left-1/2 h-[140%] -translate-x-1/2 text-forest-600/10"
          >
            <path d="M10 250V100a90 90 0 0 1 180 0v150" stroke="currentColor" strokeWidth="1" />
          </svg>
          <h2 className="relative mx-auto max-w-2xl font-display text-[clamp(1.9rem,1.4rem+1.8vw,2.9rem)] font-normal leading-[1.1] text-forest-950">
            {title}
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-[1.0625rem] leading-relaxed text-body">{text}</p>
          <div className="relative mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <BookButton className="btn btn-lg btn-forest">
              <Calendar />
              Book consultation now
            </BookButton>
            <a href={site.phone.tel} className="btn btn-lg btn-outline bg-ivory">
              <Phone />
              {site.phone.display}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
