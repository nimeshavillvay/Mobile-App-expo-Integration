import { getFullUrl } from "@/_lib/sitemap-helpers";
import type { MetadataRoute } from "next";

const BASE_PATHS = [
  "/",
  "/sign-in",
  "/laminate-finder",
  "/about-us",
  "/careers",
  "/compliance",
  "/branch-finder",
  "/catalog-main",
  "/catalog-literature",
  "/compliance",
  "/faqs",
  "/government",
  "/privacy-policy",
  "/supply-chain",
  "/tax-form",
  "/Terms-and-Conditions-for-WLACs-Purchase-of-Products-from-Suppliers",
  "/terms-of-sale",
] as const;

const sitemap = (): MetadataRoute.Sitemap => {
  return BASE_PATHS.map((path) => ({
    url: getFullUrl(path),
    changeFrequency: path === "/" ? "daily" : "monthly",
    priority: 1,
  }));
};

export default sitemap;
