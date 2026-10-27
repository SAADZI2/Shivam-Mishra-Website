// Downloads the original site's images into public/images (run once: `npm run fetch-images`).
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const BASE = "https://dr-shivam-mishra.vercel.app/images/";
const FILES = [
  "hero_ayurvedic_bg.png",
  "dr_shivam_official.png",
  "panchakarma_room.png",
  "clinic_reception.png",
  "doctor_consultation.png",
  "clinic_lounge.png",
  "ayurvedic_herbs_prep.png",
  "patient_wellness.png",
];

const outDir = join(process.cwd(), "public", "images");
await mkdir(outDir, { recursive: true });

for (const name of FILES) {
  const res = await fetch(BASE + name);
  if (!res.ok) {
    console.error(`✗ ${name} (${res.status})`);
    continue;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(join(outDir, name), buf);
  console.log(`✓ ${name} (${(buf.length / 1024).toFixed(0)} KB)`);
}
