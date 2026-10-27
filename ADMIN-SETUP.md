# Admin dashboard & bookings — setup (about 10 minutes)

## Where does form data go?
1. A patient submits the booking form on any page.
2. The request is validated **on the server** and saved to a private **MongoDB** database.
3. The clinic gets an **email alert** (via Resend) with every detail and a link to the dashboard.
4. Staff sign in at **`/admin`** to see, search, update the status of, export or delete bookings.

If the database is not connected, the form tells the patient and offers a one-tap WhatsApp fallback, so no request is ever lost.

## 1. Database (MongoDB)
**On your computer:** install MongoDB (e.g. `winget install -e --id MongoDB.Server`) and set
`MONGODB_URI=mongodb://127.0.0.1:27017` (use `127.0.0.1`, not `localhost`).

**On Vercel (live site):** a database on your PC can't be reached from the internet, so use **MongoDB Atlas** (free M0 tier):
- atlas.mongodb.com → create a free cluster (region: Mumbai `ap-south-1`).
- Database Access → add a user with a strong password.
- Network Access → add `0.0.0.0/0` (Vercel has no fixed IP; access is still protected by the user/password and TLS).
- Connect → Drivers → copy the `mongodb+srv://…` string into `MONGODB_URI` in Vercel.

Collections and indexes are created automatically. View the data any time in **MongoDB Compass** (database `dr_shivam_mishra`, collection `bookings`).

## 2. Admin login
In Vercel → Settings → Environment Variables add:
- `ADMIN_PASSWORD` — a long password (12+ characters) for the doctor/staff.
- `SESSION_SECRET` — run `openssl rand -hex 32` and paste the result (64 characters).

## 3. Email alerts (recommended)
- Create a free account at resend.com → API Keys → create one → add `RESEND_API_KEY`.
- `BOOKING_EMAIL_TO` — the inbox that should receive bookings.
- `BOOKING_EMAIL_FROM` — leave the default for testing; for production verify your domain in Resend and use e.g. `Dr. Shivam Mishra <bookings@yourdomain.com>`.

## 4. Redeploy
Vercel → Deployments → Redeploy. Then open `https://your-domain/admin`.

For local testing, copy `.env.example` to `.env.local`, fill it in, and restart `npm run dev`.

## Security built in
- Password compared in constant time; 5 failed logins per 15 minutes per device, then locked out.
- Session is a signed, `httpOnly`, `secure`, `sameSite=strict` cookie that expires after 12 hours.
- Every admin action is re-checked on the server. `/admin` is `noindex` and blocked in robots.txt.
- Bookings: server-side validation, bot honeypot, 5 requests per 10 minutes per device, typed queries with escaped search input (no NoSQL injection), IP addresses stored only as a salted hash.
- CSV export is protected against spreadsheet formula injection.
