import type { CSSProperties } from "react";

/** Inline style that sets the animation/transition delay used by .anim-* and [data-reveal]. */
export function delay(ms: number): CSSProperties {
  return { "--d": `${ms}ms` } as CSSProperties;
}
