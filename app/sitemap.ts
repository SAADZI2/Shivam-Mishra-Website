import type { MetadataRoute } from "next";
import { site } from "@/content/site";

const routes = [
  "",
  "/about",
  "/why-trust",
  "/conditions",
  "/panchakarma",
  "/patient-stories",
  "/reviews",
  "/gallery",
  "/faqs",
  "/contact",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((r) => ({
    url: `${site.url}${r}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: r === "" ? 1 : r === "/privacy" || r === "/terms" ? 0.3 : 0.8,
  }));
}
