"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  children: ReactNode;
  panelClassName?: string;
};

/** Accessible modal built on the native <dialog>: focus trap, Esc to close, click outside to close. */
export default function Modal({ open, onClose, labelledBy, children, panelClassName = "" }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <dialog ref={ref} className="sheet" aria-labelledby={labelledBy} onClose={onClose} onCancel={onClose}>
      <div
        className="flex min-h-full items-end justify-center sm:items-center sm:p-6"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        {open && (
          <div
            className={`anim-pop relative flex max-h-[100svh] w-full flex-col overflow-hidden rounded-t-3xl shadow-2xl sm:max-h-[92svh] sm:rounded-3xl ${panelClassName}`}
          >
            {children}
          </div>
        )}
      </div>
    </dialog>
  );
}
