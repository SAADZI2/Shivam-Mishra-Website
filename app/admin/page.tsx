import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/ui/Logo";
import LoginForm from "@/components/admin/LoginForm";
import StatusSelect from "@/components/admin/StatusSelect";
import { deleteBooking, logout } from "./actions";
import { adminConfigured, isAdmin } from "@/lib/auth";
import { BOOKING_STATUSES } from "@/lib/booking-status";
import { ensureSchema, getSql, type Booking } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false, nocache: true },
};

const PAGE_SIZE = 50;

const fmt = new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" });
const fmtDate = new Intl.DateTimeFormat("en-IN", { timeZone: "UTC", dateStyle: "medium" });

function Shell({ children }: { children: React.ReactNode }) {
  return <main className="min-h-screen bg-sand/60">{children}</main>;
}

function Centered({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Shell>
      <div className="grid min-h-screen place-items-center px-5 py-16">
        <div className="w-full max-w-md rounded-[1.75rem] bg-ivory p-8 shadow-[0_30px_80px_-40px_rgb(10_45_28/0.5)] ring-1 ring-line sm:p-10">
          <Logo />
          <h1 className="mt-8 font-display text-3xl text-forest-950">{title}</h1>
          <div className="mt-6">{children}</div>
        </div>
      </div>
    </Shell>
  );
}

type SearchParams = Promise<{ q?: string; status?: string; page?: string }>;

export default async function AdminPage({ searchParams }: { searchParams: SearchParams }) {
  if (!adminConfigured()) {
    return (
      <Centered title="Admin not set up yet">
        <p className="leading-relaxed text-body">
          Add <code className="rounded bg-sand px-1.5 py-0.5 text-sm">ADMIN_PASSWORD</code> and{" "}
          <code className="rounded bg-sand px-1.5 py-0.5 text-sm">SESSION_SECRET</code> to the environment variables,
          then redeploy. See <strong>ADMIN-SETUP.md</strong> in the project.
        </p>
      </Centered>
    );
  }

  if (!(await isAdmin())) {
    return (
      <Centered title="Clinic admin sign in">
        <LoginForm />
      </Centered>
    );
  }

  const sql = getSql();
  if (!sql) {
    return (
      <Centered title="Database not connected">
        <p className="leading-relaxed text-body">
          Add <code className="rounded bg-sand px-1.5 py-0.5 text-sm">DATABASE_URL</code> to the environment
          variables to start saving bookings. See <strong>ADMIN-SETUP.md</strong>.
        </p>
        <form action={logout} className="mt-6">
          <button className="btn btn-outline w-full">Sign out</button>
        </form>
      </Centered>
    );
  }

  await ensureSchema();
  const sp = await searchParams;
  const q = (sp.q ?? "").trim().slice(0, 80);
  const status = (BOOKING_STATUSES as readonly string[]).includes(sp.status ?? "") ? sp.status! : "all";
  const page = Math.max(1, Number.parseInt(sp.page ?? "1", 10) || 1);
  const like = `%${q.replace(/[%_\\]/g, (m) => `\\${m}`)}%`;

  const [rowsRaw, countsRaw, totalRaw] = await Promise.all([
    sql`
      SELECT id, created_at, name, phone, email, concern, mode, preferred_date, message, source_page, status
      FROM bookings
      WHERE (${status}::text = 'all' OR status = ${status})
        AND (${q}::text = '' OR name ILIKE ${like} OR phone ILIKE ${like} OR email ILIKE ${like} OR concern ILIKE ${like})
      ORDER BY created_at DESC
      LIMIT ${PAGE_SIZE} OFFSET ${(page - 1) * PAGE_SIZE}`,
    sql`SELECT status, count(*)::int AS n FROM bookings GROUP BY status`,
    sql`
      SELECT count(*)::int AS n FROM bookings
      WHERE (${status}::text = 'all' OR status = ${status})
        AND (${q}::text = '' OR name ILIKE ${like} OR phone ILIKE ${like} OR email ILIKE ${like} OR concern ILIKE ${like})`,
  ]);
  const rows = rowsRaw as Booking[];
  const counts = countsRaw as { status: string; n: number }[];
  const totalRows = totalRaw as { n: number }[];

  const countBy = Object.fromEntries(counts.map((c) => [c.status, c.n]));
  const total = counts.reduce((a, c) => a + c.n, 0);
  const matching = totalRows[0]?.n ?? 0;
  const pages = Math.max(1, Math.ceil(matching / PAGE_SIZE));

  const href = (patch: Record<string, string | number | undefined>) => {
    const params = new URLSearchParams();
    const next = { q, status, page: 1, ...patch };
    if (next.q) params.set("q", String(next.q));
    if (next.status && next.status !== "all") params.set("status", String(next.status));
    if (Number(next.page) > 1) params.set("page", String(next.page));
    const s = params.toString();
    return s ? `/admin?${s}` : "/admin";
  };

  return (
    <Shell>
      <header className="sticky top-0 z-30 border-b border-line bg-ivory/90 backdrop-blur-md">
        <div className="shell flex h-[72px] items-center justify-between gap-4">
          <Logo />
          <div className="flex items-center gap-2">
            <Link href="/" className="btn btn-sm btn-outline hidden sm:inline-flex">
              View website
            </Link>
            <form action={logout}>
              <button className="btn btn-sm btn-forest">Sign out</button>
            </form>
          </div>
        </div>
      </header>

      <div className="shell py-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="font-display text-[2.4rem] leading-tight text-forest-950">Appointment requests</h1>
            <p className="mt-1 text-body">
              {total} total · {countBy.new ?? 0} new
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <form action="/admin" className="flex gap-2">
              {status !== "all" && <input type="hidden" name="status" value={status} />}
              <label htmlFor="admin-search" className="sr-only">
                Search bookings
              </label>
              <input
                id="admin-search"
                name="q"
                defaultValue={q}
                placeholder="Search name, phone, email, concern"
                className="field h-11 w-full sm:w-72"
              />
              <button className="btn btn-forest h-11">Search</button>
            </form>
            <a href="/admin/export" className="btn btn-outline h-11" download>
              Export CSV
            </a>
          </div>
        </div>

        <nav aria-label="Filter by status" className="-mx-5 mt-8 overflow-x-auto px-5 no-scrollbar md:mx-0 md:px-0">
          <div className="flex w-max gap-2">
            {(["all", ...BOOKING_STATUSES] as string[]).map((s) => (
              <Link
                key={s}
                href={href({ status: s })}
                aria-pressed={status === s}
                className="chip capitalize"
              >
                {s}
                <span className="ml-2 rounded-full bg-black/5 px-2 py-0.5 text-xs">
                  {s === "all" ? total : (countBy[s] ?? 0)}
                </span>
              </Link>
            ))}
          </div>
        </nav>

        {rows.length === 0 ? (
          <div className="mt-10 rounded-[1.5rem] bg-ivory p-12 text-center ring-1 ring-line">
            <p className="font-display text-2xl text-forest-950">No bookings here yet</p>
            <p className="mt-2 text-body">
              {q || status !== "all"
                ? "Try a different search or status."
                : "New appointment requests from the website appear here instantly."}
            </p>
          </div>
        ) : (
          <ul className="mt-8 grid gap-4">
            {rows.map((b) => {
              const wa = `https://wa.me/${b.phone.replace(/\D/g, "")}`;
              return (
                <li key={b.id} className="rounded-[1.5rem] bg-ivory p-6 ring-1 ring-line">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <h2 className="font-display text-xl text-forest-950">{b.name}</h2>
                        <span className="text-sm text-muted">
                          #{b.id} · {fmt.format(new Date(b.created_at))}
                        </span>
                      </div>
                      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.9375rem]">
                        <a href={`tel:${b.phone}`} className="font-semibold text-forest-800 hover:underline">
                          {b.phone}
                        </a>
                        <a
                          href={wa}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-forest-600 hover:underline"
                        >
                          WhatsApp
                        </a>
                        {b.email && (
                          <a href={`mailto:${b.email}`} className="truncate text-body hover:underline">
                            {b.email}
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <StatusSelect id={Number(b.id)} status={b.status} />
                      <details className="relative">
                        <summary className="btn btn-sm btn-outline list-none [&::-webkit-details-marker]:hidden">
                          Delete
                        </summary>
                        <form
                          action={deleteBooking}
                          className="absolute right-0 top-full z-10 mt-2 w-64 rounded-2xl bg-white p-4 text-sm shadow-xl ring-1 ring-line"
                        >
                          <input type="hidden" name="id" value={b.id} />
                          <p className="text-body">Permanently delete this booking? This can&apos;t be undone.</p>
                          <button className="btn btn-sm mt-3 w-full bg-red-700 text-white hover:bg-red-800">
                            Yes, delete
                          </button>
                        </form>
                      </details>
                    </div>
                  </div>

                  <dl className="mt-5 grid gap-x-8 gap-y-3 border-t border-line pt-5 text-sm sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                      <dt className="text-muted">Health concern</dt>
                      <dd className="mt-0.5 font-semibold text-ink">{b.concern}</dd>
                    </div>
                    <div>
                      <dt className="text-muted">Consultation mode</dt>
                      <dd className="mt-0.5 font-semibold text-ink">{b.mode}</dd>
                    </div>
                    <div>
                      <dt className="text-muted">Preferred date</dt>
                      <dd className="mt-0.5 font-semibold text-ink">
                        {b.preferred_date ? fmtDate.format(new Date(b.preferred_date)) : "Earliest available"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-muted">Booked from</dt>
                      <dd className="mt-0.5 font-semibold text-ink">{b.source_page || "—"}</dd>
                    </div>
                    {b.message && (
                      <div className="sm:col-span-2 lg:col-span-4">
                        <dt className="text-muted">Health notes</dt>
                        <dd className="mt-0.5 whitespace-pre-line text-ink">{b.message}</dd>
                      </div>
                    )}
                  </dl>
                </li>
              );
            })}
          </ul>
        )}

        {pages > 1 && (
          <nav aria-label="Pagination" className="mt-8 flex items-center justify-between">
            <Link
              href={href({ page: page - 1 })}
              aria-disabled={page <= 1}
              className={`btn btn-sm btn-outline ${page <= 1 ? "pointer-events-none opacity-40" : ""}`}
            >
              Previous
            </Link>
            <span className="text-sm text-muted">
              Page {page} of {pages}
            </span>
            <Link
              href={href({ page: page + 1 })}
              aria-disabled={page >= pages}
              className={`btn btn-sm btn-outline ${page >= pages ? "pointer-events-none opacity-40" : ""}`}
            >
              Next
            </Link>
          </nav>
        )}
      </div>
    </Shell>
  );
}
