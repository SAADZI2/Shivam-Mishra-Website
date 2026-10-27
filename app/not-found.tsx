import Link from "next/link";
import PageShell from "@/components/layout/PageShell";
import { ArrowRight } from "@/components/ui/icons";

export default function NotFound() {
  return (
    <PageShell>
      <section className="py-28 lg:py-40">
        <div className="shell text-center">
          <p className="font-display text-[6rem] leading-none text-gold-deep">404</p>
          <h1 className="mt-6 font-display text-[clamp(2rem,1.5rem+2vw,3rem)] text-forest-950">
            This page could not be found
          </h1>
          <p className="mx-auto mt-4 max-w-md text-body">
            The link may be outdated or mistyped. Head back home, or book a consultation directly.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/" className="btn btn-lg btn-forest">
              Back to home
              <ArrowRight />
            </Link>
            <Link href="/contact" className="btn btn-lg btn-outline">
              Contact the clinic
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
