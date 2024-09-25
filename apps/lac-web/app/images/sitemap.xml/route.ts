import {
  SitemapIndex,
  getNumberOfPages,
  getSitemapImages,
} from "@/_lib/sitemap-helpers";
import { NextResponse } from "next/server";

export const GET = async () => {
  const sitemapImages = await getSitemapImages();

  const sitemapIndex = new SitemapIndex();

  const numberOfImagePages = getNumberOfPages(sitemapImages);
  Array.from({ length: numberOfImagePages }).forEach((_, index) => {
    sitemapIndex.addUrl(`/images/sitemaps/sitemap/${index}.xml`);
  });

  return new NextResponse(sitemapIndex.toString(), {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
    },
  });
};
