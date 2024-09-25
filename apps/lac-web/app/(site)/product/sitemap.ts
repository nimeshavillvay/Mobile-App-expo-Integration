import {
  getFullUrl,
  getNumberOfPages,
  getSitemapProducts,
  paginate,
} from "@/_lib/sitemap-helpers";
import type { MetadataRoute } from "next";

export const generateSitemaps = async () => {
  const sitemapProducts = await getSitemapProducts();
  const numberOfProductPages = getNumberOfPages(sitemapProducts);

  return Array.from({ length: numberOfProductPages }).map((_, index) => ({
    id: index,
  }));
};

const sitemap = async ({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> => {
  const sitemapProducts = await getSitemapProducts();
  const page = paginate(sitemapProducts, id + 1);

  return page.map((sitemapProduct) => ({
    url: getFullUrl(
      `/product/${sitemapProduct.productid}/${sitemapProduct.slug}`,
    ),
    changeFrequency: sitemapProduct.changefreq,
    priority: Number(sitemapProduct.priority),
  }));
};

export default sitemap;
