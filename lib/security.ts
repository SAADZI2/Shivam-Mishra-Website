import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { headers } from "next/headers";

function secret() {
  const s = process.env.SESSION_SECRET;
  if (!s || s.length < 32) throw new Error("SESSION_SECRET must be set (32+ characters).");
  return s;
}

export function safeEqual(a: string, b: string) {
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
}

export function sign(value: string) {
  return createHmac("sha256", secret()).update(value).digest("base64url");
}

/** Client IP, hashed with the server secret so raw IPs are never stored. */
export async function ipHash() {
  const h = await headers();
  const ip = (h.get("x-forwarded-for") || h.get("x-real-ip") || "unknown").split(",")[0].trim();
  return createHmac("sha256", process.env.SESSION_SECRET || "dev-only").update(ip).digest("hex").slice(0, 32);
}
