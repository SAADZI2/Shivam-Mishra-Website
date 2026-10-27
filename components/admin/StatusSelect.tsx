"use client";

import { useState, useTransition } from "react";
import { updateStatus } from "@/app/admin/actions";
import { BOOKING_STATUSES } from "@/lib/booking-status";

const tone: Record<string, string> = {
  new: "bg-gold/15 text-gold-ink ring-gold/40",
  contacted: "bg-mint text-forest-800 ring-forest-600/30",
  confirmed: "bg-forest-800 text-ivory ring-forest-800",
  completed: "bg-sand text-muted ring-line",
  cancelled: "bg-red-50 text-red-800 ring-red-200",
};

export default function StatusSelect({ id, status }: { id: number; status: string }) {
  const [value, setValue] = useState(status);
  const [pending, start] = useTransition();
  return (
    <label className="relative inline-flex">
      <span className="sr-only">Status for booking {id}</span>
      <select
        value={value}
        disabled={pending}
        onChange={(e) => {
          const next = e.target.value;
          setValue(next);
          start(() => updateStatus(id, next));
        }}
        className={`h-9 cursor-pointer appearance-none rounded-full pl-3.5 pr-8 text-sm font-semibold capitalize ring-1 transition-opacity ${
          tone[value] ?? tone.new
        } ${pending ? "opacity-60" : ""}`}
      >
        {BOOKING_STATUSES.map((s) => (
          <option key={s} value={s} className="bg-white text-ink">
            {s}
          </option>
        ))}
      </select>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </label>
  );
}
