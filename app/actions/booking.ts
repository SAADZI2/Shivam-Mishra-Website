"use server";

import { bookings, getDb, nextBookingNumber } from "@/lib/db";
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

  try {
    const db = await getDb();
    if (!db) {
      return { ok: false, fallback: true, error: "Online booking is not connected yet. Please send your request on WhatsApp." };
    }
    const col = bookings(db);
    const ip = await ipHash();

    const recent = await col.countDocuments({ ipHash: ip, createdAt: { $gt: new Date(Date.now() - 10 * 60_000) } });
    if (recent >= MAX_PER_10_MIN) {
      return { ok: false, error: "Too many requests from this device. Please call or WhatsApp us instead." };
    }

    const number = await nextBookingNumber(db);
    await col.insertOne({
      number,
      createdAt: new Date(),
      name: b.name,
      phone: b.phone,
      email: b.email || null,
      concern: b.condition,
      mode: b.type,
      preferredDate: b.preferredDate || null,
      message: b.message || null,
      sourcePage: parsed.page || null,
      status: "new",
      ipHash: ip,
    });

    await sendBookingEmail(b, number);
    return { ok: true, id: number };
  } catch (err) {
    console.error("createBooking failed", err);
    return { ok: false, fallback: true, error: "We couldn't save your request just now. Please send it on WhatsApp." };
  }
}
