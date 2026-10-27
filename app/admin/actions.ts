"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminConfigured, createSession, destroySession, isAdmin, passwordMatches } from "@/lib/auth";
import { BOOKING_STATUSES } from "@/lib/booking-status";
import { bookings, getDb, loginAttempts } from "@/lib/db";
import { ipHash } from "@/lib/security";

export type LoginState = { error?: string };

const MAX_ATTEMPTS = 5;

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  if (!adminConfigured()) return { error: "Admin login is not configured. Set ADMIN_PASSWORD and SESSION_SECRET." };
  const password = String(formData.get("password") ?? "").slice(0, 200);
  const ip = await ipHash();

  let db: Awaited<ReturnType<typeof getDb>> = null;
  try {
    db = await getDb();
  } catch (err) {
    console.error("login: database unreachable", err);
    return { error: "Can't reach the database. Make sure MongoDB is running, then try again." };
  }

  if (db) {
    const recent = await loginAttempts(db).countDocuments({ ipHash: ip, at: { $gt: new Date(Date.now() - 15 * 60_000) } });
    if (recent >= MAX_ATTEMPTS) return { error: "Too many attempts. Try again in 15 minutes." };
  }

  if (!passwordMatches(password)) {
    if (db) await loginAttempts(db).insertOne({ ipHash: ip, at: new Date() });
    await new Promise((r) => setTimeout(r, 600)); // slow down guessing
    return { error: "Incorrect password." };
  }

  if (db) await loginAttempts(db).deleteMany({ ipHash: ip });
  await createSession();
  redirect("/admin");
}

export async function logout() {
  await destroySession();
  redirect("/admin");
}

async function requireAdmin() {
  if (!(await isAdmin())) throw new Error("Unauthorized");
  const db = await getDb();
  if (!db) throw new Error("Database not configured");
  return bookings(db);
}

export async function updateStatus(id: number, status: string) {
  const col = await requireAdmin();
  if (!Number.isInteger(id) || id <= 0) throw new Error("Invalid id");
  if (!(BOOKING_STATUSES as readonly string[]).includes(status)) throw new Error("Invalid status");
  await col.updateOne({ number: id }, { $set: { status } });
  revalidatePath("/admin");
}

export async function deleteBooking(formData: FormData) {
  const col = await requireAdmin();
  const id = Number(formData.get("id"));
  if (!Number.isInteger(id) || id <= 0) throw new Error("Invalid id");
  await col.deleteOne({ number: id });
  revalidatePath("/admin");
}
