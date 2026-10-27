"use client";

import { useEffect, useRef } from "react";
import BookingForm from "./BookingForm";
import { ShieldCheck, X } from "../ui/icons";
import { site } from "@/content/site";

type Props = {
  open: boolean;
  onClose: () => void;
  condition: string;
  formKey: number;
};

export default function BookingDialog({ open, onClose, condition, formKey }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      document.documentElement.style.overflow = "hidden";
    } else if (!open && d.open) {
      d.close();
    }
    if (!open) document.documentElement.style.overflow = "";
  }, [open]);

  return (
    <dialog
      ref={ref}
      className="sheet"
      aria-labelledby="booking-title"
      onClose={onClose}
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="flex min-h-full items-end justify-center p-0 sm:items-center sm:p-6"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        {open && (
          <div className="anim-pop relative flex max-h-[100svh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl bg-ivory shadow-2xl sm:max-h-[92svh] sm:rounded-3xl">
            <div className="relative bg-forest-950 px-6 pb-6 pt-7 text-ivory sm:px-8">
              <button
                type="button"
                onClick={onClose}
                className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-ivory/10 text-ivory transition-colors hover:bg-ivory/20"
                aria-label="Close booking form"
              >
                <X className="h-5 w-5" />
              </button>
              <p className="flex items-center gap-2 text-sm font-medium text-gold-light">
                <ShieldCheck className="h-4 w-4" />
                Priority doctor appointment
              </p>
              <h2 id="booking-title" className="mt-2 font-display text-[1.9rem] leading-tight">
                Book consultation
              </h2>
              <p className="mt-1 text-sm text-ivory/70">
                {site.name} • {site.role}
              </p>
            </div>
            <div className="overflow-y-auto px-6 py-6 sm:px-8 sm:py-7">
              <BookingForm key={formKey} defaultCondition={condition} compact />
            </div>
          </div>
        )}
      </div>
    </dialog>
  );
}
