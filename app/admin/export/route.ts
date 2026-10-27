import { isAdmin } from "@/lib/auth";
import { ensureSchema, getSql, type Booking } from "@/lib/db";

export const dynamic = "force-dynamic";

// Prevents spreadsheet formula injection and quotes every cell.
const cell = (v: unknown) => {
  let s = v == null ? "" : String(v);
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
};

export async function GET() {
  if (!(await isAdmin())) return new Response("Unauthorized", { status: 401 });
  const sql = getSql();
  if (!sql) return new Response("Database not configured", { status: 503 });
  await ensureSchema();

  const rows = (await sql`
    SELECT id, created_at, name, phone, email, concern, mode, preferred_date, message, source_page, status
    FROM bookings ORDER BY created_at DESC`) as Booking[];

  const head = ["ID", "Received", "Name", "Phone", "Email", "Concern", "Mode", "Preferred date", "Notes", "Page", "Status"];
  const lines = [head.map(cell).join(",")].concat(
    rows.map((r) =>
      [
        r.id,
        new Date(r.created_at).toISOString(),
        r.name,
        r.phone,
        r.email,
        r.concern,
        r.mode,
        r.preferred_date ? String(r.preferred_date).slice(0, 10) : "",
        r.message,
        r.source_page,
        r.status,
      ]
        .map(cell)
        .join(",")
    )
  );

  const date = new Date().toISOString().slice(0, 10);
  return new Response("﻿" + lines.join("\r\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="bookings-${date}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
