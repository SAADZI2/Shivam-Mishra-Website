import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

let client: NeonQueryFunction<false, false> | null = null;
let schemaReady: Promise<void> | null = null;

/** Returns the database client, or null when DATABASE_URL is not configured. */
export function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  if (!client) client = neon(url);
  return client;
}

/** Creates tables on first use (idempotent), so there is no separate migration step. */
export async function ensureSchema() {
  const sql = getSql();
  if (!sql) return;
  if (!schemaReady) {
    schemaReady = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS bookings (
          id BIGSERIAL PRIMARY KEY,
          created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
          name TEXT NOT NULL,
          phone TEXT NOT NULL,
          email TEXT,
          concern TEXT NOT NULL,
          mode TEXT NOT NULL,
          preferred_date DATE,
          message TEXT,
          source_page TEXT,
          status TEXT NOT NULL DEFAULT 'new',
          ip_hash TEXT
        )`;
      await sql`CREATE INDEX IF NOT EXISTS bookings_created_idx ON bookings (created_at DESC)`;
      await sql`
        CREATE TABLE IF NOT EXISTS login_attempts (
          id BIGSERIAL PRIMARY KEY,
          ip_hash TEXT NOT NULL,
          at TIMESTAMPTZ NOT NULL DEFAULT now()
        )`;
    })().catch((err) => {
      schemaReady = null;
      throw err;
    });
  }
  await schemaReady;
}

export type Booking = {
  id: number;
  created_at: string;
  name: string;
  phone: string;
  email: string | null;
  concern: string;
  mode: string;
  preferred_date: string | null;
  message: string | null;
  source_page: string | null;
  status: string;
};

export { BOOKING_STATUSES, type BookingStatus } from "./booking-status";
