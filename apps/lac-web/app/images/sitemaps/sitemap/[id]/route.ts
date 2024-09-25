import {
  getFullUrl,
  getNumberOfPages,
  getSitemapImages,
  paginate,
} from "@/_lib/sitemap-helpers";
import { notFound } from "next/navigation";
import { NextResponse, type NextRequest } from "next/server";

export const generateStaticParams = async () => {
  const sitemapImages = await getSitemapImages();
  const numberOfImagePages = getNumberOfPages(sitemapImages);

  return Array.from({ length: numberOfImagePages }).map((_, index) => ({
    id: index.toString(),
  }));
};

// TODO Switch to native Next.js sitemap generator with Next 15
export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } },
) => {
  const sitemapImages = await getSitemapImages();
  const numberOfImagePages = getNumberOfPages(sitemapImages);

  const parsedId = parseInt(params.id);

  if (isNaN(parsedId) || parsedId < 0 || parsedId >= numberOfImagePages) {
    return notFound();
  }

  const page = paginate(sitemapImages, parsedId + 1);

  let xml = '<?xml version="1.0" encoding="UTF-8"?>';
  xml +=
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">';
  page.forEach((sitemapImage) => {
    xml += "<url>";
    xml += `<loc>${getFullUrl(`/product/${sitemapImage.productid}/${sitemapImage.slug}`)}</loc>`;
    xml += `<image:image>`;
    xml += `<image:loc>${sitemapImage.image}</image:loc>`;
    xml += `</image:image>`;
    xml += `<changefreq>${sitemapImage.changefreq}</changefreq>`;
    xml += `<priority>${sitemapImage.priority}</priority>`;
    xml += "</url>";
  });
  xml += "</urlset>";

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
    },
  });
};
