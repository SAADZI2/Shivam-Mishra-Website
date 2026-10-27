import type { BookingInput } from "./validation";

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** Sends a booking alert through Resend's API. Silently skipped when not configured. */
export async function sendBookingEmail(b: BookingInput, id: number) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.BOOKING_EMAIL_TO;
  if (!key || !to) return;
  const from = process.env.BOOKING_EMAIL_FROM || "Bookings <onboarding@resend.dev>";
  const site = process.env.NEXT_PUBLIC_SITE_URL || "";

  const rows: [string, string][] = [
    ["Name", b.name],
    ["Phone / WhatsApp", b.phone],
    ["Email", b.email || "—"],
    ["Health concern", b.condition],
    ["Consultation mode", b.type],
    ["Preferred date", b.preferredDate || "Earliest available"],
    ["Notes", b.message || "—"],
  ];

  const html = `
  <div style="font-family:Arial,sans-serif;color:#1a1a1a;max-width:560px">
    <h2 style="color:#0f5132;margin:0 0 12px">New appointment request #${id}</h2>
    <table style="border-collapse:collapse;width:100%">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="padding:8px 12px 8px 0;color:#66716b;vertical-align:top;white-space:nowrap">${esc(k)}</td><td style="padding:8px 0;font-weight:600">${esc(v).replace(/\n/g, "<br>")}</td></tr>`
        )
        .join("")}
    </table>
    ${site ? `<p style="margin-top:20px"><a href="${esc(site)}/admin" style="color:#0f5132">Open admin dashboard</a></p>` : ""}
  </div>`;

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: to.split(",").map((s) => s.trim()),
        subject: `New booking: ${b.name} (${b.condition})`,
        html,
        reply_to: b.email || undefined,
      }),
      signal: AbortSignal.timeout(8000),
    });
  } catch {
    // Email is a convenience; the booking is already saved.
  }
}
