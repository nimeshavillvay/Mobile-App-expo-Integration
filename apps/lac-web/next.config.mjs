// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@repo/web-ui"],
  images: {
    unoptimized: process.env.VERCEL_ENV !== "production", // Optimize images only in the production environment in Vercel
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "xcart.wurthlac.com",
      },
      {
        protocol: "https",
        hostname: "wurthmachinery.com",
      },
    ],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
  },
  eslint: {
    dirs: ["app"],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
