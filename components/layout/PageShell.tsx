import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import MobileActionBar from "./MobileActionBar";
import WhatsAppWidget from "./WhatsAppWidget";
import BookingProvider from "../booking/BookingProvider";

/** Shared frame for every page: header, content, footer, booking dialog and quick actions. */
export default function PageShell({
  children,
  defaultCondition,
}: {
  children: ReactNode;
  defaultCondition?: string;
}) {
  return (
    <BookingProvider defaultCondition={defaultCondition}>
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-forest-800 px-5 py-3 text-ivory focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        {children}
      </main>
      <Footer />
      <div aria-hidden="true" className="h-[4.5rem] bg-forest-950 md:hidden" />
      <MobileActionBar />
      <WhatsAppWidget />
    </BookingProvider>
  );
}
