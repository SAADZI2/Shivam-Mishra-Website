"use server";

import { ensureSchema, getSql } from "@/lib/db";
import { sendBookingEmail } from "@/lib/email";
import { ipHash } from "@/lib/security";
import { validateBooking, type RawBooking } from "@/lib/validation";

export type BookingResult =
  | { ok: true; id: number }
  | { ok: false; error: string; fallback?: boolean };

const MAX_PER_10_MIN = 5;

/** Saves an appointment request, then emails the clinic. */
export async function createBooking(raw: Partial<RawBooking>): Promise<BookingResult> {
  // Honeypot: real visitors never see or fill this field.
  if (raw.website) return { ok: true, id: 0 };

  const parsed = validateBooking(raw);
  if (!parsed.ok) return parsed;
  const b = parsed.data;

  const sql = getSql();
  if (!sql) {
    return { ok: false, fallback: true, error: "Online booking is not connected yet. Please send your request on WhatsApp." };
  }

  try {
    await ensureSchema();
    const ip = await ipHash();

    const recent = (await sql`
      SELECT count(*)::int AS n FROM bookings
      WHERE ip_hash = ${ip} AND created_at > now() - interval '10 minutes'`) as { n: number }[];
    if ((recent[0]?.n ?? 0) >= MAX_PER_10_MIN) {
      return { ok: false, error: "Too many requests from this device. Please call or WhatsApp us instead." };
    }

    const rows = (await sql`
      INSERT INTO bookings (name, phone, email, concern, mode, preferred_date, message, source_page, ip_hash)
      VALUES (${b.name}, ${b.phone}, ${b.email || null}, ${b.condition}, ${b.type},
              ${b.preferredDate || null}, ${b.message || null}, ${parsed.page || null}, ${ip})
      RETURNING id`) as { id: number }[];

    const id = Number(rows[0].id);
    await sendBookingEmail(b, id);
    return { ok: true, id };
  } catch (err) {
    console.error("createBooking failed", err);
    return { ok: false, fallback: true, error: "We couldn't save your request just now. Please send it on WhatsApp." };
  }
}
