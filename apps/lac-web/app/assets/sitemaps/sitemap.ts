import {
  getNumberOfPages,
  getSitemapAssets,
  paginate,
} from "@/_lib/sitemap-helpers";
import { encode } from "html-entities";
import type { MetadataRoute } from "next";

export const generateSitemaps = async () => {
  const sitemapAssets = await getSitemapAssets();
  const numberOfAssetPages = getNumberOfPages(sitemapAssets);

  return Array.from({ length: numberOfAssetPages }).map((_, index) => ({
    id: index,
  }));
};

const sitemap = async ({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> => {
  const sitemapAssets = await getSitemapAssets();
  const page = paginate(sitemapAssets, id + 1);

  return page.map((sitemapAsset) => ({
    url: encode(`https://${sitemapAsset.url}`),
    changeFrequency: sitemapAsset.changefreq,
    priority: Number(sitemapAsset.priority),
  }));
};

export default sitemap;
