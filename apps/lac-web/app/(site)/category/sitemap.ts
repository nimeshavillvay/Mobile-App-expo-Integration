import { getFullUrl, getSitemapCategories } from "@/_lib/sitemap-helpers";
import type { MetadataRoute } from "next";

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const sitemapCategories = await getSitemapCategories();

  return sitemapCategories.map((sitemapCategory) => ({
    url: getFullUrl(
      `/category/${sitemapCategory.categoryid}/${sitemapCategory.slug}`,
    ),
    changeFrequency: sitemapCategory.changefreq,
    priority: Number(sitemapCategory.priority),
  }));
};

export default sitemap;
