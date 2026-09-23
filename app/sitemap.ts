import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { getProducts } from "@/lib/products";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!siteConfig.url) {
    return [];
  }

  const products = await getProducts();

  return [
    {
      url: siteConfig.url,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/products`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...products.map((product) => ({
      url: `${siteConfig.url}/products/${product.slug}`,
      lastModified: product.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
