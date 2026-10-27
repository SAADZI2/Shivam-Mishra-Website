"use client";

import { useEffect, useId, useState, useTransition, type FormEvent } from "react";
import { createBooking } from "@/app/actions/booking";
import { consultationModes, concernOptions } from "@/content/booking";
import { openWhatsApp, site } from "@/content/site";
import { CircleCheck, MessageCircle, ShieldCheck } from "../ui/icons";

type Props = {
  defaultCondition?: string;
  /** Visual density: the dialog uses a slightly tighter layout. */
  compact?: boolean;
};

type FormState = {
  name: string;
  phone: string;
  email: string;
  condition: string;
  type: string;
  preferredDate: string;
  message: string;
};

function buildMessage(f: FormState) {
  return `Hello Dr. Shivam Mishra, I would like to book a ${f.type} consultation.

*Name:* ${f.name || "Patient"}
*Phone:* ${f.phone}${f.email ? `\n*Email:* ${f.email}` : ""}
*Concern:* ${f.condition}
*Preferred Date:* ${f.preferredDate || "Earliest Available"}
*Notes:* ${f.message || "-"}`;
}

/**
 * Appointment request form.
 * Submitting saves the request securely (server action → database) and emails the clinic.
 * The clinic sees every request in /admin. WhatsApp stays available as a fallback.
 */
export default function BookingForm({ defaultCondition, compact = false }: Props) {
  const uid = useId();
  const initialCondition = defaultCondition || "General Consultation";
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    email: "",
    condition: initialCondition,
    type: consultationModes[0].id,
    preferredDate: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [error, setError] = useState<string>();
  const [fallback, setFallback] = useState(false);
  const [pending, startTransition] = useTransition();
  const [minDate, setMinDate] = useState<string>();

  useEffect(() => {
    const d = new Date();
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    setMinDate(d.toISOString().slice(0, 10));
  }, []);

  // If a condition was chosen elsewhere on the page (e.g. a condition card), make sure it is selectable.
  const options = concernOptions.some((o) => o.value === initialCondition)
    ? concernOptions
    : [{ value: initialCondition, label: initialCondition }, ...concernOptions];

  const set = (key: keyof FormState) => (value: string) => setForm((f) => ({ ...f, [key]: value }));

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (pending) return;
    setError(undefined);
    setFallback(false);
    startTransition(async () => {
      try {
        const res = await createBooking({ ...form, consent, website: honeypot, page: window.location.pathname });
        if (res.ok) setSubmitted(true);
        else {
          setError(res.error);
          setFallback(Boolean(res.fallback));
        }
      } catch {
        setError("Connection problem. Please check your internet, or send your request on WhatsApp.");
        setFallback(true);
      }
    });
  };

  if (submitted) {
    return (
      <div className="anim-pop py-6 text-center" role="status" aria-live="polite">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-mint text-forest-600">
          <CircleCheck className="h-9 w-9" />
        </div>
        <h3 className="mt-5 font-display text-2xl text-forest-950">Appointment request received</h3>
        <p className="mx-auto mt-3 max-w-md text-[0.95rem] leading-relaxed text-body">
          Thank you{form.name ? `, ${form.name}` : ""}. Our clinical desk will call you on{" "}
          <strong className="font-semibold text-forest-950">{form.phone}</strong> within 30 minutes during clinic hours
          to confirm your <strong className="font-semibold text-forest-950">{form.type}</strong> time slot.
        </p>
        <dl className="mx-auto mt-6 grid max-w-md grid-cols-[auto_1fr] gap-x-6 gap-y-2 rounded-2xl border border-line bg-white p-5 text-left text-sm">
          <dt className="text-muted">Patient</dt>
          <dd className="font-medium text-ink">{form.name}</dd>
          <dt className="text-muted">Phone</dt>
          <dd className="font-medium text-ink">{form.phone}</dd>
          <dt className="text-muted">Concern</dt>
          <dd className="font-medium text-ink">{form.condition}</dd>
          <dt className="text-muted">Mode</dt>
          <dd className="font-medium text-ink">{form.type}</dd>
        </dl>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button type="button" onClick={() => openWhatsApp(buildMessage(form))} className="btn btn-whatsapp">
            <MessageCircle />
            Also send on WhatsApp
          </button>
        </div>
      </div>
    );
  }

  const gap = compact ? "gap-4" : "gap-5";

  return (
    <form onSubmit={onSubmit} className={`grid ${gap}`} aria-busy={pending}>
      {/* Honeypot — hidden from people and screen readers; bots fill it in. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </label>
      </div>

      <div className={`grid ${gap} sm:grid-cols-2`}>
        <div>
          <label htmlFor={`${uid}-name`} className="label">
            Full name <span className="text-gold-ink">*</span>
          </label>
          <input
            id={`${uid}-name`}
            className="field"
            type="text"
            required
            maxLength={80}
            autoComplete="name"
            placeholder="e.g. Rahul Sharma"
            value={form.name}
            onChange={(e) => set("name")(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor={`${uid}-phone`} className="label">
            Phone / WhatsApp <span className="text-gold-ink">*</span>
          </label>
          <input
            id={`${uid}-phone`}
            className="field"
            type="tel"
            required
            inputMode="tel"
            pattern="[0-9+()\-\s]{7,20}"
            title="Enter a valid phone number"
            maxLength={20}
            autoComplete="tel"
            placeholder="+91 98765 43210"
            value={form.phone}
            onChange={(e) => set("phone")(e.target.value)}
          />
        </div>
      </div>

      <div className={`grid ${gap} sm:grid-cols-2`}>
        <div>
          <label htmlFor={`${uid}-email`} className="label">
            Email address <span className="font-normal text-muted">(optional)</span>
          </label>
          <input
            id={`${uid}-email`}
            className="field"
            type="email"
            maxLength={120}
            autoComplete="email"
            placeholder="name@example.com"
            value={form.email}
            onChange={(e) => set("email")(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor={`${uid}-concern`} className="label">
            Primary health concern
          </label>
          <select
            id={`${uid}-concern`}
            className="field"
            value={form.condition}
            onChange={(e) => set("condition")(e.target.value)}
          >
            {options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <fieldset>
        <legend className="label">Preferred consultation mode</legend>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {consultationModes.map((m) => {
            const checked = form.type === m.id;
            return (
              <label
                key={m.id}
                className={`relative flex cursor-pointer items-center gap-3 rounded-2xl border p-3.5 transition-colors sm:flex-col sm:items-start sm:gap-1 ${
                  checked
                    ? "border-forest-600 bg-mint ring-1 ring-forest-600"
                    : "border-line bg-white hover:border-forest-600/40"
                }`}
              >
                <input
                  type="radio"
                  name={`${uid}-mode`}
                  value={m.id}
                  checked={checked}
                  onChange={() => set("type")(m.id)}
                  className="sr-only"
                />
                <span className="whitespace-nowrap text-sm font-semibold text-forest-950">{m.label}</span>
                <span className="text-xs text-muted">{m.desc}</span>
                {checked && <CircleCheck className="absolute right-3 top-3 h-4 w-4 text-forest-600" />}
              </label>
            );
          })}
        </div>
      </fieldset>

      <div>
        <label htmlFor={`${uid}-date`} className="label">
          Preferred date
        </label>
        <input
          id={`${uid}-date`}
          className="field"
          type="date"
          min={minDate}
          value={form.preferredDate}
          onChange={(e) => set("preferredDate")(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor={`${uid}-notes`} className="label">
          Health notes <span className="font-normal text-muted">(optional)</span>
        </label>
        <textarea
          id={`${uid}-notes`}
          className="field"
          rows={compact ? 3 : 4}
          maxLength={1000}
          placeholder="Briefly describe your symptoms, medical history or current medications…"
          value={form.message}
          onChange={(e) => set("message")(e.target.value)}
        />
      </div>

      <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-body">
        <input
          type="checkbox"
          required
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 h-4 w-4 shrink-0 accent-forest-600"
        />
        <span>
          I agree that the clinic may store these details and contact me to arrange my consultation, as described in
          the{" "}
          <a href="/privacy" className="font-semibold text-forest-800 underline underline-offset-2">
            privacy policy
          </a>
          .
        </span>
      </label>

      {error && (
        <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          <p>{error}</p>
          {fallback && (
            <button
              type="button"
              onClick={() => openWhatsApp(buildMessage(form))}
              className="btn btn-sm btn-whatsapp mt-3"
            >
              <MessageCircle />
              Send on WhatsApp
            </button>
          )}
        </div>
      )}

      <div className="flex flex-col gap-3 pt-1 sm:flex-row">
        <button type="submit" disabled={pending} className="btn btn-lg btn-forest w-full disabled:opacity-70 sm:flex-1">
          {pending ? "Sending your request…" : "Book consultation now"}
        </button>
        <a
          href={`${site.whatsapp.url}?text=${encodeURIComponent(site.whatsapp.defaultMessage)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-lg btn-whatsapp w-full sm:w-auto"
        >
          <MessageCircle />
          WhatsApp direct
        </a>
      </div>
      <p className="flex items-start gap-2 text-xs leading-relaxed text-muted">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-forest-600" />
        Sent over an encrypted connection and seen only by the clinic. Our clinical desk replies within 30 minutes
        during clinic hours.
      </p>
    </form>
  );
}
