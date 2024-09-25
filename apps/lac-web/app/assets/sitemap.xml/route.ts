import {
  SitemapIndex,
  getNumberOfPages,
  getSitemapAssets,
} from "@/_lib/sitemap-helpers";
import { NextResponse } from "next/server";

export const GET = async () => {
  const sitemapAssets = await getSitemapAssets();

  const sitemapIndex = new SitemapIndex();

  const numberOfAssetPages = getNumberOfPages(sitemapAssets);
  Array.from({ length: numberOfAssetPages }).forEach((_, index) => {
    sitemapIndex.addUrl(`/assets/sitemaps/sitemap/${index}.xml`);
  });

  return new NextResponse(sitemapIndex.toString(), {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
    },
  });
};
