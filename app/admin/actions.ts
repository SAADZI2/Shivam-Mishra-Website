"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminConfigured, createSession, destroySession, isAdmin, passwordMatches } from "@/lib/auth";
import { BOOKING_STATUSES } from "@/lib/booking-status";
import { ensureSchema, getSql } from "@/lib/db";
import { ipHash } from "@/lib/security";

export type LoginState = { error?: string };

const MAX_ATTEMPTS = 5;

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  if (!adminConfigured()) return { error: "Admin login is not configured. Set ADMIN_PASSWORD and SESSION_SECRET." };
  const sql = getSql();
  const password = String(formData.get("password") ?? "").slice(0, 200);
  const ip = await ipHash();

  if (sql) {
    await ensureSchema();
    const rows = (await sql`
      SELECT count(*)::int AS n FROM login_attempts
      WHERE ip_hash = ${ip} AND at > now() - interval '15 minutes'`) as { n: number }[];
    if ((rows[0]?.n ?? 0) >= MAX_ATTEMPTS) {
      return { error: "Too many attempts. Try again in 15 minutes." };
    }
  }

  if (!passwordMatches(password)) {
    if (sql) await sql`INSERT INTO login_attempts (ip_hash) VALUES (${ip})`;
    await new Promise((r) => setTimeout(r, 600)); // slow down guessing
    return { error: "Incorrect password." };
  }

  if (sql) await sql`DELETE FROM login_attempts WHERE ip_hash = ${ip}`;
  await createSession();
  redirect("/admin");
}

export async function logout() {
  await destroySession();
  redirect("/admin");
}

async function requireAdmin() {
  if (!(await isAdmin())) throw new Error("Unauthorized");
  const sql = getSql();
  if (!sql) throw new Error("Database not configured");
  await ensureSchema();
  return sql;
}

export async function updateStatus(id: number, status: string) {
  const sql = await requireAdmin();
  if (!Number.isInteger(id) || id <= 0) throw new Error("Invalid id");
  if (!(BOOKING_STATUSES as readonly string[]).includes(status)) throw new Error("Invalid status");
  await sql`UPDATE bookings SET status = ${status} WHERE id = ${id}`;
  revalidatePath("/admin");
}

export async function deleteBooking(formData: FormData) {
  const sql = await requireAdmin();
  const id = Number(formData.get("id"));
  if (!Number.isInteger(id) || id <= 0) throw new Error("Invalid id");
  await sql`DELETE FROM bookings WHERE id = ${id}`;
  revalidatePath("/admin");
}
