"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X } from "../ui/icons";
import { openWhatsApp, site } from "@/content/site";

/** Desktop WhatsApp chat starter (phones use the bottom action bar instead). */
export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  return (
    <div ref={panelRef} className="fixed bottom-6 right-6 z-30 hidden flex-col items-end md:flex">
      {open && (
        <div
          role="dialog"
          aria-label="Chat on WhatsApp"
          className="anim-pop mb-4 w-[22rem] overflow-hidden rounded-3xl bg-white shadow-[0_30px_70px_-25px_rgb(10_45_28/0.45)] ring-1 ring-line"
        >
          <div className="flex items-center justify-between bg-forest-950 px-5 py-4 text-ivory">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-gold font-display text-forest-950">
                DS
              </span>
              <div className="leading-tight">
                <div className="font-display text-[1.05rem]">{site.name}</div>
                <div className="mt-0.5 flex items-center gap-1.5 text-xs text-ivory/70">
                  <span className="h-2 w-2 rounded-full bg-whatsapp" aria-hidden="true" />
                  Typically replies in 15 mins
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="grid h-9 w-9 place-items-center rounded-full text-ivory/80 transition-colors hover:bg-ivory/10 hover:text-ivory"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="space-y-3 bg-sand/60 p-5">
            <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-white px-4 py-3 text-sm leading-relaxed text-ink shadow-sm">
              Namaste {"\u{1F64F}"} How can Dr. Shivam Mishra&apos;s medical team assist you today?
            </div>
            <label htmlFor="wa-message" className="sr-only">
              Your message
            </label>
            <textarea
              id="wa-message"
              rows={3}
              maxLength={1000}
              placeholder="Type your health question or preferred appointment date…"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="field text-sm"
            />
            <button
              type="button"
              onClick={() => {
                openWhatsApp(message || undefined);
                setOpen(false);
              }}
              className="btn btn-whatsapp w-full"
            >
              <Send />
              Start WhatsApp chat
            </button>
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? "Close WhatsApp chat" : "Chat on WhatsApp"}
        className="relative grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-forest-950 shadow-[0_18px_40px_-12px_rgb(37_211_102/0.6)] transition-transform hover:scale-105 active:scale-95"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        {!open && (
          <span className="absolute -right-0.5 -top-0.5 h-4 w-4 rounded-full border-2 border-ivory bg-gold" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
