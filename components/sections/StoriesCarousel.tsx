"use client";

import { useRef, useState } from "react";
import SectionHeading from "../ui/SectionHeading";
import Stars from "../ui/Stars";
import BookButton from "../booking/BookButton";
import { ArrowRight, ChevronLeft, ChevronRight, CircleCheck, Quote, ShieldCheck } from "../ui/icons";
import { stories, storyCategories } from "@/content/stories";

export default function StoriesCarousel({ showHeading = true }: { showHeading?: boolean }) {
  const [category, setCategory] = useState("All");
  const [index, setIndex] = useState(0);
  const touchX = useRef<number | null>(null);

  const list = category === "All" ? stories : stories.filter((s) => s.category === category);
  const s = list[Math.min(index, list.length - 1)];
  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + list.length) % list.length);

  return (
    <section id="stories" className="py-24 lg:py-32">
      <div className="shell">
        {showHeading && (
          <SectionHeading
            title="Patient success stories"
            lead="Real recovery journeys from patients who overcame debilitating chronic illness through Dr. Shivam Mishra's personalized root-cause treatment protocols."
          />
        )}

        <div className={`-mx-5 overflow-x-auto px-5 no-scrollbar md:mx-0 md:px-0 ${showHeading ? "mt-10" : ""}`}>
          <div className="flex w-max gap-2 md:w-auto md:flex-wrap" role="group" aria-label="Filter stories by specialty">
            {storyCategories.map((c) => (
              <button
                key={c}
                type="button"
                className="chip"
                aria-pressed={category === c}
                onClick={() => {
                  setCategory(c);
                  setIndex(0);
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div
          className="mt-10 grid overflow-hidden rounded-[1.75rem] ring-1 ring-line lg:grid-cols-12"
          role="region"
          aria-roledescription="carousel"
          aria-label="Patient stories"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") go(1);
            if (e.key === "ArrowLeft") go(-1);
          }}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          {/* Patient */}
          <div key={`p-${s.id}`} className="anim-pop bg-forest-950 p-7 text-ivory sm:p-10 lg:col-span-5">
            <div className="flex items-center gap-4">
              <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-gold font-display text-2xl text-forest-950">
                {s.patientName[0]}
              </span>
              <div>
                <h3 className="font-display text-2xl leading-tight">{s.patientName}</h3>
                <p className="mt-1 text-sm text-ivory/65">
                  Age {s.age}, {s.location}
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Stars count={s.rating} />
              <span className="inline-flex items-center gap-1.5 rounded-full bg-ivory/10 px-3 py-1 text-xs font-semibold text-ivory">
                <ShieldCheck className="h-3.5 w-3.5 text-gold-light" />
                Verified patient
              </span>
            </div>
            <dl className="mt-8 space-y-4 border-t border-ivory/10 pt-6 text-sm">
              <div>
                <dt className="text-ivory/55">Condition</dt>
                <dd className="mt-0.5 font-semibold text-ivory">{s.condition}</dd>
              </div>
              <div>
                <dt className="text-ivory/55">Treatment timeline</dt>
                <dd className="mt-0.5 font-semibold text-ivory">{s.timeline}</dd>
              </div>
              <div>
                <dt className="text-ivory/55">Documented outcome</dt>
                <dd className="mt-1 flex items-start gap-2 font-semibold text-gold-light">
                  <CircleCheck className="mt-0.5 h-4 w-4 shrink-0" />
                  {s.outcome}
                </dd>
              </div>
            </dl>
          </div>

          {/* Story */}
          <div className="relative flex flex-col bg-white p-7 sm:p-10 lg:col-span-7 lg:p-14">
            <Quote className="h-10 w-10 text-gold" />
            <blockquote
              key={`q-${s.id}`}
              className="anim-pop mt-6 flex-1 font-display text-[clamp(1.25rem,1.05rem+0.8vw,1.75rem)] leading-[1.5] text-forest-950"
              aria-live="polite"
            >
              {s.story}
            </blockquote>
            <div className="mt-10 flex items-center justify-between gap-4 border-t border-line pt-6">
              <div className="flex items-center gap-4">
                <span className="whitespace-nowrap text-sm text-muted">
                  Story <strong className="font-semibold text-ink">{index + 1}</strong> of {list.length}
                </span>
                <div className="hidden gap-1.5 sm:flex" aria-hidden="true">
                  {list.map((it, i) => (
                    <span
                      key={it.id}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === index ? "w-6 bg-forest-800" : "w-1.5 bg-line"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous story"
                  className="grid h-12 w-12 place-items-center rounded-full border border-line text-forest-950 transition-colors hover:border-forest-800 hover:bg-mint"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next story"
                  className="grid h-12 w-12 place-items-center rounded-full bg-forest-800 text-gold-light transition-colors hover:bg-forest-950"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-center" data-reveal>
          <BookButton className="btn btn-lg btn-forest w-full sm:w-auto">
            <span className="sm:hidden">Become our next success story</span>
            <span className="hidden sm:inline">Become our next recovery success story</span>
            <ArrowRight />
          </BookButton>
        </div>
      </div>
    </section>
  );
}
