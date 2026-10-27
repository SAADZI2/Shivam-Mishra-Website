import { MongoClient, type Db } from "mongodb";

export { BOOKING_STATUSES, type BookingStatus } from "./booking-status";

/** A booking document as stored in MongoDB (collection: bookings). */
export type BookingDoc = {
  number: number; // friendly booking number shown to staff (#1, #2, …)
  createdAt: Date;
  name: string;
  phone: string;
  email: string | null;
  concern: string;
  mode: string;
  preferredDate: string | null; // YYYY-MM-DD
  message: string | null;
  sourcePage: string | null;
  status: string;
  ipHash: string;
};

type Cache = { client?: Promise<MongoClient>; ready?: Promise<void> };
// Reuse one connection across hot reloads and requests.
const g = globalThis as unknown as { __dsmMongo?: Cache };
const cache: Cache = (g.__dsmMongo ??= {});

export function dbConfigured() {
  return Boolean(process.env.MONGODB_URI);
}

/** Returns the database, or null when MONGODB_URI is not configured. */
export async function getDb(): Promise<Db | null> {
  const uri = process.env.MONGODB_URI;
  if (!uri) return null;
  if (!cache.client) {
    cache.client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000, maxPoolSize: 10 })
      .connect()
      .catch((err) => {
        cache.client = undefined;
        throw err;
      });
  }
  const db = (await cache.client).db(process.env.MONGODB_DB || "dr_shivam_mishra");

  // Indexes are created once, automatically — no migration step.
  if (!cache.ready) {
    cache.ready = Promise.all([
      db.collection("bookings").createIndex({ createdAt: -1 }),
      db.collection("bookings").createIndex({ number: 1 }, { unique: true }),
      db.collection("bookings").createIndex({ ipHash: 1, createdAt: -1 }),
      db.collection("bookings").createIndex({ status: 1 }),
      // Failed logins are deleted automatically after 15 minutes.
      db.collection("login_attempts").createIndex({ at: 1 }, { expireAfterSeconds: 15 * 60 }),
    ])
      .then(() => undefined)
      .catch((err) => {
        cache.ready = undefined;
        throw err;
      });
  }
  await cache.ready;
  return db;
}

export const bookings = (db: Db) => db.collection<BookingDoc>("bookings");
export const loginAttempts = (db: Db) => db.collection<{ ipHash: string; at: Date }>("login_attempts");

/** Atomic, gap-free booking numbers. */
export async function nextBookingNumber(db: Db) {
  const res = await db
    .collection<{ _id: string; seq: number }>("counters")
    .findOneAndUpdate({ _id: "bookings" }, { $inc: { seq: 1 } }, { upsert: true, returnDocument: "after" });
  return res?.seq ?? 1;
}

/** Escapes user text for safe use inside a MongoDB regex (prevents ReDoS / injection). */
export const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
