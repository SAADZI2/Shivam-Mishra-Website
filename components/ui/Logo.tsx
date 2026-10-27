import Link from "next/link";
import { site } from "@/content/site";

export default function Logo({ tone = "light", onClick }: { tone?: "light" | "dark"; onClick?: () => void }) {
  const dark = tone === "dark";
  return (
    <Link href="/" onClick={onClick} className="group flex shrink-0 items-center gap-3" aria-label={`${site.name} — home`}>
      <span
        className={`grid h-11 w-11 shrink-0 place-items-center rounded-[14px] font-display text-[19px] font-medium tracking-tight ring-1 transition-transform duration-300 group-hover:-rotate-3 ${
          dark ? "bg-gold text-forest-950 ring-gold-light/40" : "bg-forest-800 text-gold-light ring-gold/40"
        }`}
        aria-hidden="true"
      >
        DS
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`whitespace-nowrap font-display text-[1.3rem] font-medium tracking-[-0.01em] ${
            dark ? "text-ivory" : "text-forest-950"
          }`}
        >
          {site.name}
        </span>
        <span
          className={`mt-1.5 whitespace-nowrap text-[0.72rem] font-semibold tracking-[0.04em] ${
            dark ? "text-gold-light" : "text-gold-ink"
          }`}
        >
          {site.role}
        </span>
      </span>
    </Link>
  );
}
