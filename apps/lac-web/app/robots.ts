import { PRODUCTION_URL } from "@/_lib/constants";
import type { MetadataRoute } from "next";

const robots = (): MetadataRoute.Robots => {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/myaccount/",
          "/cart/",
          "/checkout/",
          "/confirmation/",
          "/osr/",
          "/email/subscription-confirmation/",
          "/search/",
          "/laminate-finder/",
          "/no-bot/",
        ],
      },
    ],
    host: PRODUCTION_URL,
    sitemap: [
      `${PRODUCTION_URL}/sitemap.xml`,
      `${PRODUCTION_URL}/assets/sitemap.xml`,
      `${PRODUCTION_URL}/images/sitemap.xml`,
    ],
  };
};

export default robots;
