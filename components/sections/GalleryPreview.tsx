import Image from "next/image";
import { delay } from "@/lib/motion";
import Link from "next/link";
import SectionHeading from "../ui/SectionHeading";
import { ArrowRight } from "../ui/icons";
import { galleryPreview } from "@/content/home";

const layout = [
  "col-span-2 row-span-2 md:col-span-2 md:row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-2 row-span-1 md:col-span-2",
];

export default function GalleryPreview() {
  return (
    <section className="bg-sand py-24 lg:py-32">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading title="Virtual clinic tour" />
          <Link href="/gallery" className="btn btn-lg btn-forest w-full shrink-0 sm:w-auto sm:self-start lg:self-auto" data-reveal>
            Open dedicated facility gallery
            <ArrowRight />
          </Link>
        </div>

        <div className="mt-14 grid auto-rows-[11rem] grid-cols-2 gap-3 sm:auto-rows-[14rem] md:grid-cols-4 md:gap-4">
          {galleryPreview.map((g, i) => (
            <Link
              href="/gallery"
              key={g.src}
              data-reveal
              style={delay(i * 80)}
              className={`group relative overflow-hidden rounded-2xl bg-forest-950 ${layout[i]} ${i === 0 ? "rounded-t-[9999px] md:rounded-t-[12rem]" : ""}`}
            >
              <Image
                src={g.src}
                alt={g.alt}
                fill
                quality={85}
                sizes={i === 0 || i === 3 ? "(min-width: 1280px) 620px, (min-width: 768px) 50vw, 100vw" : "(min-width: 1280px) 310px, (min-width: 768px) 25vw, 50vw"}
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-950/80 to-transparent px-4 pb-3 pt-10 text-sm font-medium text-ivory opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {g.alt}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
