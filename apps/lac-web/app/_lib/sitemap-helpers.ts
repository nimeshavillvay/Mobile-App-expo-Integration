import { PRODUCTION_URL, SITEMAP_PAGE_SIZE } from "@/_lib/constants";
import "server-only";
import { z } from "zod";
import { api } from "./api";

export const getFullUrl = (pathname: string) => {
  return `${PRODUCTION_URL}${pathname}`;
};

const changeFrequencySchema = z.enum([
  "always",
  "daily",
  "hourly",
  "monthly",
  "never",
  "weekly",
  "yearly",
]);

export const paginate = <T>(
  list: T[],
  pageNumber: number,
  pageSize = SITEMAP_PAGE_SIZE,
) => {
  return list.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
};

export const getNumberOfPages = <T>(
  list: T[],
  pageSize = SITEMAP_PAGE_SIZE,
) => {
  return Math.ceil(list.length / pageSize);
};

const categorySitemapSchema = z.array(
  z.object({
    category: z.string(),
    categoryid: z.string(),
    priority: z.string(),
    changefreq: changeFrequencySchema,
    clean_url: z.string(),
    image: z.string(),
    slug: z.string(),
  }),
);

export const getSitemapCategories = async () => {
  const response = await api
    .get("assets/sitemap/categories.json", {
      cache: "no-store",
    })
    .json();

  return await categorySitemapSchema.parseAsync(response);
};

const productSitemapSchema = z.array(
  z.object({
    productid: z.string(),
    product: z.string(),
    priority: z.string(),
    changefreq: changeFrequencySchema,
    categoryid: z.string(),
    category: z.string(),
    clean_url: z.string(),
    image: z.string(),
    slug: z.string(),
  }),
);

export const getSitemapProducts = async () => {
  const response = await api
    .get("assets/sitemap/products.json", {
      cache: "no-store",
    })
    .json();

  return productSitemapSchema.parse(response);
};

const assetsSitemapSchema = z.array(
  z.object({
    url: z.string(),
    type: z.string(),
    priority: z.string(),
    changefreq: changeFrequencySchema,
  }),
);

export const getSitemapAssets = async () => {
  const response = await api
    .get("assets/sitemap/assets.json", {
      cache: "no-cache",
    })
    .json();

  return assetsSitemapSchema.parse(response);
};

const imageSitemapSchema = z.array(
  z.object({
    productid: z.string(),
    type: z.string(),
    image: z.string(),
    priority: z.string(),
    changefreq: changeFrequencySchema,
    slug: z.string(),
  }),
);

export const getSitemapImages = async () => {
  const response = await api
    .get("assets/sitemap/images.json", {
      cache: "no-cache",
    })
    .json();

  return imageSitemapSchema.parse(response);
};

export class SitemapIndex {
  private readonly urls: string[] = [];

  constructor(routes: string[] = []) {
    this.urls = routes.map((route) => getFullUrl(route));
  }

  addUrl = (route: string) => {
    this.urls.push(getFullUrl(route));
  };

  toString = () => {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>';
    xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

    this.urls.forEach((url) => {
      xml += "<sitemap>";
      xml += `<loc>${url}</loc>`;
      xml += "</sitemap>";
    });

    xml += "</sitemapindex>";

    return xml;
  };
}
