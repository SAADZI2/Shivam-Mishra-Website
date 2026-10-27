"use client";

import type { ReactNode } from "react";
import { useBooking } from "./BookingProvider";

/** Opens the booking dialog. Lets surrounding sections stay server-rendered. */
export default function BookButton({
  children,
  className = "btn btn-forest",
  condition,
}: {
  children: ReactNode;
  className?: string;
  condition?: string;
}) {
  const { open } = useBooking();
  return (
    <button type="button" className={className} onClick={() => open(condition)}>
      {children}
    </button>
  );
}
