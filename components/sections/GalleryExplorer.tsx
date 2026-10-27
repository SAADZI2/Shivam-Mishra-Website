"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Modal from "../ui/Modal";
import { ChevronLeft, ChevronRight, Maximize2, X } from "../ui/icons";
import { gallery, galleryCategories } from "@/content/gallery";

export default function GalleryExplorer() {
  const [category, setCategory] = useState("All");
  const [active, setActive] = useState<number | null>(null);

  const list = category === "All" ? gallery : gallery.filter((g) => g.category === category);
  const item = active === null ? null : list[active];
  const step = (dir: 1 | -1) => setActive((i) => (i === null ? i : (i + dir + list.length) % list.length));

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, list.length]);

  return (
    <section id="gallery" className="py-20 lg:py-28">
      <div className="shell">
        <div className="max-w-2xl">
          <h2 className="font-display text-[clamp(1.9rem,1.4rem+1.8vw,2.75rem)] font-normal leading-[1.1] tracking-[-0.015em] text-forest-950">
            Clinic & facility gallery
          </h2>
          <p className="mt-4 text-[1.0625rem] leading-relaxed text-body">
            Take a virtual tour of our premium Mumbai clinic, state-of-the-art Panchakarma chambers, and herbal medicine
            preparation environment.
          </p>
        </div>

        <div className="-mx-5 mt-10 overflow-x-auto px-5 no-scrollbar md:mx-0 md:px-0">
          <div className="flex w-max gap-2 md:w-auto md:flex-wrap" role="group" aria-label="Filter photos">
            {galleryCategories.map((c) => (
              <button
                key={c}
                type="button"
                className="chip"
                aria-pressed={category === c}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <ul className="mt-10 grid auto-rows-[15rem] gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[16rem]">
          {list.map((g, i) => {
            const feature = category === "All" && i === 0;
            // Last two photos span two columns on desktop so the 4-column grid ends flush.
            const wide = category === "All" && i >= list.length - 2;
            return (
              <li
                key={g.id}
                className={`anim-pop ${feature ? "sm:col-span-2 sm:row-span-2" : ""} ${wide ? "lg:col-span-2" : ""}`}
              >
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  className={`group relative block h-full w-full overflow-hidden bg-forest-950 text-left ${
                    feature ? "rounded-[1.75rem] sm:rounded-t-[16rem]" : "rounded-[1.5rem]"
                  }`}
                  aria-label={`Open photo: ${g.title}`}
                >
                  <Image
                    src={g.src}
                    alt={g.title}
                    fill
                    quality={85}
                    sizes={
                      feature || wide
                        ? "(min-width: 1024px) 620px, (min-width: 640px) 100vw, 100vw"
                        : "(min-width: 1024px) 310px, (min-width: 640px) 50vw, 100vw"
                    }
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-forest-950/85 via-forest-950/10 to-transparent" />
                  <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-ivory">
                    <span>
                      <span className="block text-xs font-medium text-gold-light">{g.category}</span>
                      <span className="mt-1 block font-display text-xl leading-tight">{g.title}</span>
                    </span>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ivory/15 backdrop-blur transition-colors group-hover:bg-gold group-hover:text-forest-950">
                      <Maximize2 className="h-4 w-4" />
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <Modal
        open={item !== null}
        onClose={() => setActive(null)}
        labelledBy="photo-title"
        panelClassName="max-w-5xl bg-forest-950 text-ivory"
      >
        {item && (
          <>
            <div className="relative aspect-[16/10] w-full bg-black">
              <Image key={item.src} src={item.src} alt={item.title} fill quality={90} sizes="(min-width: 1024px) 1024px, 100vw" className="anim-pop object-contain" />
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Close photo"
                className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-black/50 text-ivory backdrop-blur hover:bg-black/75"
              >
                <X className="h-5 w-5" />
              </button>
              {list.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    aria-label="Previous photo"
                    className="absolute left-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/50 text-ivory backdrop-blur hover:bg-black/75"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    aria-label="Next photo"
                    className="absolute right-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/50 text-ivory backdrop-blur hover:bg-black/75"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>
            <div className="flex flex-col gap-2 p-6 sm:flex-row sm:items-end sm:justify-between sm:p-8">
              <div>
                <p className="text-sm font-medium text-gold-light">{item.category}</p>
                <h2 id="photo-title" className="mt-1 font-display text-2xl">
                  {item.title}
                </h2>
                <p className="mt-2 max-w-[60ch] text-ivory/70">{item.desc}</p>
              </div>
              <p className="shrink-0 text-sm text-ivory/50">
                {(active ?? 0) + 1} / {list.length}
              </p>
            </div>
          </>
        )}
      </Modal>
    </section>
  );
}
