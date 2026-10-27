import SectionHeading from "../ui/SectionHeading";
import { delay } from "@/lib/motion";
import Stars from "../ui/Stars";
import { ArrowUpRight, ShieldCheck, ThumbsUp } from "../ui/icons";
import { reviews } from "@/content/reviews";
import { site } from "@/content/site";

export default function ReviewsSection({ showHeading = true }: { showHeading?: boolean }) {
  return (
    <section id="reviews" className="bg-sand py-24 lg:py-32">
      <div className="shell">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {showHeading ? (
              <SectionHeading
                title="Rated 5.0 out of 5 stars on Google"
                lead="Read authentic feedback from 47+ verified patients who experienced life-changing healing at Dr. Shivam Mishra’s Ayurveda clinic in Mumbai."
              />
            ) : (
              <p className="max-w-[60ch] text-[1.0625rem] leading-relaxed text-body" data-reveal>
                Read authentic feedback from 47+ verified patients who experienced life-changing healing at Dr. Shivam
                Mishra’s Ayurveda clinic in Mumbai.
              </p>
            )}
          </div>
          <div className="lg:col-span-5" data-reveal>
            <div className="flex flex-col items-start gap-4 rounded-[1.75rem] bg-forest-950 p-7 text-ivory min-[420px]:flex-row min-[420px]:items-center min-[420px]:gap-6">
              <p className="font-display text-[3.75rem] leading-none text-gold-light">{site.stats.rating}</p>
              <div className="min-w-0">
                <Stars className="h-5 w-5" />
                <p className="mt-2 text-sm text-ivory/70">Based on 47+ verified patient reviews</p>
                <a
                  href={site.googleProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 whitespace-nowrap text-sm font-semibold text-gold-light hover:text-ivory"
                >
                  View Google business profile
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 columns-1 gap-5 md:columns-2 lg:columns-3">
          {reviews.map((r, i) => (
            <figure
              key={r.name}
              data-reveal
              style={delay((i % 3) * 80)}
              className="mb-5 break-inside-avoid rounded-[1.5rem] bg-white p-7 ring-1 ring-line"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-forest-600 font-semibold text-ivory">
                    {r.name[0]}
                  </span>
                  <div className="leading-tight">
                    <figcaption className="font-semibold text-ink">{r.name}</figcaption>
                    <p className="mt-0.5 text-xs text-muted">{r.date}</p>
                  </div>
                </div>
                <Stars count={r.rating} className="h-3.5 w-3.5" />
              </div>
              <blockquote className="mt-5 leading-relaxed text-body">“{r.review}”</blockquote>
              <div className="mt-6 flex items-center justify-between border-t border-line pt-4 text-xs">
                <span className="inline-flex items-center gap-1.5 font-semibold text-forest-600">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Verified Google review
                </span>
                <span className="inline-flex items-center gap-1.5 text-muted">
                  <ThumbsUp className="h-3.5 w-3.5" />
                  {r.likes}
                </span>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
