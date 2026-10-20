import type { MetadataRoute } from "next";
import { SITE_URL } from "@/shared/config/site";

const PUBLIC_PATHS = [
  "",
  "/analyze",
  "/detect",
  "/chat",
  "/monitoring",
  "/report",
  "/support-referral",
  "/login",
  "/signup",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PUBLIC_PATHS.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    priority: path === "" ? 1 : 0.7,
  }));
}
