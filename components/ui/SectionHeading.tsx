import type { ReactNode } from "react";

type Props = {
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  as?: "h1" | "h2";
  className?: string;
};

/** Section title + lead paragraph with one consistent type scale across the site. */
export default function SectionHeading({ title, lead, align = "left", tone = "light", as = "h2", className = "" }: Props) {
  const Tag = as;
  const center = align === "center";
  return (
    <div data-reveal className={`${center ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      <Tag
        className={`font-display text-[clamp(2rem,1.35rem+2.3vw,3.25rem)] font-normal leading-[1.08] tracking-[-0.015em] ${
          tone === "dark" ? "text-ivory" : "text-forest-950"
        }`}
      >
        {title}
      </Tag>
      {lead && (
        <p
          className={`mt-5 text-[1.0625rem] leading-relaxed ${center ? "mx-auto" : ""} max-w-[62ch] ${
            tone === "dark" ? "text-ivory/75" : "text-body"
          }`}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
