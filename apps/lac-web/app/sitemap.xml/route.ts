import {
  getNumberOfPages,
  getSitemapProducts,
  SitemapIndex,
} from "@/_lib/sitemap-helpers";
import { NextResponse } from "next/server";

// We're using a Route Handler to manually generate the index sitemap because
// Next.js doesn't have an inbuilt way to generate one
export const GET = async () => {
  const sitemapProducts = await getSitemapProducts();

  const sitemapIndex = new SitemapIndex([
    "/information/sitemap.xml",
    "/category/sitemap.xml",
  ]);

  const numberOfProductPages = getNumberOfPages(sitemapProducts);
  Array.from({ length: numberOfProductPages }).forEach((_, index) => {
    sitemapIndex.addUrl(`/product/sitemap/${index}.xml`);
  });

  return new NextResponse(sitemapIndex.toString(), {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
    },
  });
};
