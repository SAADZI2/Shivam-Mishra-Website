import { consultationModes } from "@/content/booking";

export type BookingInput = {
  name: string;
  phone: string;
  email: string;
  condition: string;
  type: string;
  preferredDate: string;
  message: string;
};

export type RawBooking = BookingInput & { consent: boolean; website: string; page: string };

const clean = (v: unknown, max: number) =>
  String(v ?? "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim()
    .slice(0, max);

/** Server-side validation — never trust what the browser sends. */
export function validateBooking(raw: Partial<RawBooking>):
  | { ok: true; data: BookingInput; page: string }
  | { ok: false; error: string } {
  const data: BookingInput = {
    name: clean(raw.name, 80),
    phone: clean(raw.phone, 20),
    email: clean(raw.email, 120).toLowerCase(),
    condition: clean(raw.condition, 100) || "General Consultation",
    type: clean(raw.type, 40),
    preferredDate: clean(raw.preferredDate, 10),
    message: clean(raw.message, 1000),
  };

  if (data.name.length < 2) return { ok: false, error: "Please enter your full name." };
  if (!/^[0-9+()\-\s]{7,20}$/.test(data.phone) || data.phone.replace(/\D/g, "").length < 7)
    return { ok: false, error: "Please enter a valid phone number." };
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email))
    return { ok: false, error: "Please enter a valid email address, or leave it empty." };
  if (!consultationModes.some((m) => m.id === data.type)) data.type = consultationModes[0].id;
  if (data.preferredDate && !/^\d{4}-\d{2}-\d{2}$/.test(data.preferredDate)) data.preferredDate = "";
  if (!raw.consent) return { ok: false, error: "Please confirm we may use your details to arrange the consultation." };

  return { ok: true, data, page: clean(raw.page, 100) };
}
