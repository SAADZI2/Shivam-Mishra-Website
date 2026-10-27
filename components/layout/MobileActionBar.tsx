"use client";

import { useBooking } from "../booking/BookingProvider";
import { Calendar, MessageCircle, Phone } from "../ui/icons";
import { site, whatsappLink } from "@/content/site";

/** Thumb-reach actions on phones: call, WhatsApp, book. */
export default function MobileActionBar() {
  const { open } = useBooking();
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-ivory/95 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md md:hidden">
      <div className="grid grid-cols-[auto_auto_1fr] gap-2">
        <a href={site.phone.tel} aria-label={`Call ${site.phone.display}`} className="btn btn-outline h-12 w-12 px-0">
          <Phone />
        </a>
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="btn btn-whatsapp h-12 w-12 px-0"
        >
          <MessageCircle />
        </a>
        <button type="button" onClick={() => open()} className="btn btn-forest h-12 w-full">
          <Calendar />
          Book appointment
        </button>
      </div>
    </div>
  );
}
