import { isAdmin } from "@/lib/auth";
import { bookings, getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

// Prevents spreadsheet formula injection and quotes every cell.
const cell = (v: unknown) => {
  let s = v == null ? "" : String(v);
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
};

export async function GET() {
  if (!(await isAdmin())) return new Response("Unauthorized", { status: 401 });
  const db = await getDb();
  if (!db) return new Response("Database not configured", { status: 503 });

  const rows = await bookings(db).find({}, { projection: { ipHash: 0 } }).sort({ createdAt: -1 }).toArray();

  const head = ["ID", "Received", "Name", "Phone", "Email", "Concern", "Mode", "Preferred date", "Notes", "Page", "Status"];
  const lines = [head.map(cell).join(",")].concat(
    rows.map((r) =>
      [
        r.number,
        r.createdAt.toISOString(),
        r.name,
        r.phone,
        r.email,
        r.concern,
        r.mode,
        r.preferredDate ?? "",
        r.message,
        r.sourcePage,
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
