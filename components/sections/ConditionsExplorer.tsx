"use client";

import { useState } from "react";
import Modal from "../ui/Modal";
import { useBooking } from "../booking/BookingProvider";
import { ArrowRight, CircleCheck, Clock, Plus, Sparkles, Stethoscope, X } from "../ui/icons";
import { CONDITIONS, CONDITION_CATEGORIES, type Condition } from "@/content/conditions";

export default function ConditionsExplorer() {
  const { open } = useBooking();
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState<Condition | null>(null);

  const list = category === "All" ? CONDITIONS : CONDITIONS.filter((c) => c.category === category);

  return (
    <section id="conditions" className="py-20 lg:py-28">
      <div className="shell">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="font-display text-[clamp(1.9rem,1.4rem+1.8vw,2.75rem)] font-normal leading-[1.1] tracking-[-0.015em] text-forest-950">
              Chronic conditions treated successfully
            </h2>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-body">
              Specialized Ayurvedic root-cause treatment protocols for over 25 complex medical conditions. Select a
              category or open any condition to explore the exact treatment approach.
            </p>
          </div>
          <p className="shrink-0 text-sm text-muted" aria-live="polite">
            Showing <strong className="font-semibold text-ink">{list.length}</strong>{" "}
            {list.length === 1 ? "condition" : "conditions"}
          </p>
        </div>

        <div className="-mx-5 mt-10 overflow-x-auto px-5 no-scrollbar md:mx-0 md:px-0">
          <div className="flex w-max gap-2 md:w-auto md:flex-wrap" role="group" aria-label="Filter by specialty">
            {CONDITION_CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={category === c}
                onClick={() => setCategory(c)}
                className="chip"
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {list.map((c) => (
            <li
              key={c.id}
              className="group anim-pop flex flex-col rounded-[1.5rem] bg-white p-7 ring-1 ring-line transition-shadow duration-300 hover:shadow-[0_24px_50px_-28px_rgb(10_45_28/0.35)] hover:ring-gold/50"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="truncate rounded-full bg-mint px-3 py-1 text-xs font-semibold text-forest-800">
                  {c.category}
                </span>
                <span className="shrink-0 text-xs font-semibold text-gold-ink">{c.dosha.split(" ")[0]}</span>
              </div>
              <h3 className="mt-6 font-display text-[1.45rem] leading-snug text-forest-950">{c.name}</h3>
              <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-body">{c.shortDesc}</p>
              <div className="mt-7 flex items-center justify-between gap-3 border-t border-line pt-5">
                <button
                  type="button"
                  onClick={() => setSelected(c)}
                  className="inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-semibold text-forest-800 hover:text-forest-600"
                >
                  <Plus className="h-4 w-4" />
                  View protocol
                </button>
                <button type="button" onClick={() => open(c.name)} className="btn btn-sm btn-outline">
                  Book consult
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        labelledBy="condition-title"
        panelClassName="max-w-2xl bg-ivory"
      >
        {selected && (
          <>
            <div className="relative bg-forest-950 px-6 pb-7 pt-8 text-ivory sm:px-9">
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-ivory/10 hover:bg-ivory/20"
                aria-label="Close details"
              >
                <X className="h-5 w-5" />
              </button>
              <p className="text-sm font-medium text-gold-light">{selected.category} specialty</p>
              <h2 id="condition-title" className="mt-2 pr-10 font-display text-[1.9rem] leading-tight">
                {selected.name}
              </h2>
              <p className="mt-1.5 text-sm text-ivory/65">Ayurvedic treatment & root-cause healing protocol</p>
            </div>

            <div className="space-y-7 overflow-y-auto px-6 py-7 sm:px-9">
              <div className="grid gap-px overflow-hidden rounded-2xl bg-line ring-1 ring-line sm:grid-cols-2">
                <div className="bg-white p-5">
                  <p className="text-sm text-muted">Primary dosha imbalance</p>
                  <p className="mt-1 font-display text-lg text-forest-950">{selected.dosha}</p>
                </div>
                <div className="bg-white p-5">
                  <p className="text-sm text-muted">Expected recovery window</p>
                  <p className="mt-1 flex items-center gap-2 font-semibold text-ink">
                    <Clock className="h-4 w-4 text-gold-deep" />
                    {selected.expectedTimeline}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="flex items-center gap-2 font-display text-xl text-forest-950">
                  <Stethoscope className="h-5 w-5 text-gold-deep" />
                  Ayurvedic root cause understanding
                </h3>
                <p className="mt-3 leading-relaxed text-body">{selected.rootCause}</p>
              </div>

              <div>
                <h3 className="flex items-center gap-2 font-display text-xl text-forest-950">
                  <Sparkles className="h-5 w-5 text-gold-deep" />
                  Personalized healing plan components
                </h3>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {[
                    { title: "Herbal formulations", items: selected.ayurvedicApproach },
                    { title: "Panchakarma therapies", items: selected.panchakarmaProcedures },
                  ].map((block) => (
                    <div key={block.title} className="rounded-2xl bg-white p-5 ring-1 ring-line">
                      <p className="text-sm font-semibold text-forest-800">{block.title}</p>
                      <ul className="mt-3 space-y-2 text-[0.9375rem] text-body">
                        {block.items.map((it) => (
                          <li key={it} className="flex gap-2.5">
                            <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-forest-600" />
                            {it}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted">
                  Consult Dr. Shivam Mishra for a tailored pulse diagnosis & custom prescription.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    const name = selected.name;
                    setSelected(null);
                    open(name);
                  }}
                  className="btn btn-forest w-full shrink-0 sm:w-auto"
                >
                  Book this consultation
                  <ArrowRight />
                </button>
              </div>
            </div>
          </>
        )}
      </Modal>
    </section>
  );
}
