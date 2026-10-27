import { delay } from "@/lib/motion";
import Link from "next/link";
import { ChevronRight } from "../ui/icons";

type Props = {
  title: string;
  description: string;
  crumb: string;
};

/** Inner-page masthead: breadcrumb, title, summary — with the arch motif drawn in gold. */
export default function PageHeader({ title, description, crumb }: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-forest-950 text-ivory">
      {/* Soft light pools instead of a photo: crisp at any size and no image to download */}
      <div
        aria-hidden="true"
        className="absolute -left-40 -top-40 -z-10 h-[30rem] w-[30rem] rounded-full bg-forest-600/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-48 right-[10%] -z-10 h-[26rem] w-[26rem] rounded-full bg-gold/10 blur-3xl"
      />

      {/* Arch motif */}
      <svg
        aria-hidden="true"
        viewBox="0 0 200 250"
        fill="none"
        className="pointer-events-none absolute -bottom-10 right-[4%] hidden h-[115%] text-gold/25 md:block"
      >
        <path
          className="anim-draw"
          pathLength={1}
          d="M10 250V100a90 90 0 0 1 180 0v150"
          stroke="currentColor"
          strokeWidth="0.6"
        />
        <path
          className="anim-draw"
          style={delay(250)}
          pathLength={1}
          d="M34 250V104a66 66 0 0 1 132 0v146"
          stroke="currentColor"
          strokeWidth="0.6"
        />
      </svg>

      <div className="shell relative py-16 md:py-24">
        <nav aria-label="Breadcrumb" className="anim-fade">
          <ol className="flex items-center gap-1.5 text-sm text-ivory/60">
            <li>
              <Link href="/" className="transition-colors hover:text-gold-light">
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-3.5 w-3.5" />
            </li>
            <li aria-current="page" className="font-medium text-gold-light">
              {crumb}
            </li>
          </ol>
        </nav>
        <h1
          className="anim-rise mt-6 max-w-4xl font-display text-[clamp(2.5rem,1.5rem+3.8vw,4.75rem)] font-normal leading-[1.02] tracking-[-0.02em]"
          style={delay(80)}
        >
          {title}
        </h1>
        <p
          className="anim-rise mt-6 max-w-[58ch] text-[1.0625rem] leading-relaxed text-ivory/75 md:text-lg"
          style={delay(180)}
        >
          {description}
        </p>
      </div>
    </section>
  );
}
