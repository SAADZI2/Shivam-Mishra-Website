import BookButton from "../booking/BookButton";
import SectionHeading from "../ui/SectionHeading";
import { Calendar, MessageCircle, Plus } from "../ui/icons";
import { faqs } from "@/content/faqs";
import { whatsappLink } from "@/content/site";

/** FAQ accordion built on native <details> — works without JavaScript. */
export default function FaqList() {
  return (
    <section id="faqs" className="py-20 lg:py-28">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              title="Got questions? We have answers"
              lead="Clear, honest answers regarding Ayurvedic treatments, online video consultations, Panchakarma procedures, and appointment scheduling."
            />
            <div className="mt-10 rounded-[1.5rem] bg-forest-950 p-7 text-ivory" data-reveal>
              <h3 className="font-display text-xl">Have a specific medical question?</h3>
              <p className="mt-2 text-sm leading-relaxed text-ivory/70">
                Speak directly with Dr. Shivam Mishra’s clinical team on WhatsApp or schedule your personal consultation
                today.
              </p>
              <div className="mt-6 grid gap-2.5">
                <BookButton className="btn btn-gold w-full">
                  <Calendar />
                  Book consultation now
                </BookButton>
                <a
                  href={whatsappLink("Hello Dr. Shivam, I have a question regarding Ayurvedic treatment.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp w-full"
                >
                  <MessageCircle />
                  Ask on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8">
          <div className="border-t border-line">
            {faqs.map((f, i) => (
              <details
                key={f.q}
                {...({ name: "faq" } as Record<string, string>)}
                open={i === 0}
                className="group border-b border-line"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-7 [&::-webkit-details-marker]:hidden">
                  <span className="font-display text-[1.3rem] leading-snug text-forest-950 transition-colors group-hover:text-forest-600 sm:text-[1.45rem]">
                    {f.q}
                  </span>
                  <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line text-forest-800 transition-all duration-300 group-open:rotate-45 group-open:border-forest-800 group-open:bg-forest-800 group-open:text-gold-light">
                    <Plus className="h-4 w-4" />
                  </span>
                </summary>
                <p className="-mt-1 max-w-[68ch] pb-8 pr-14 text-[1.0625rem] leading-[1.75] text-body">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
