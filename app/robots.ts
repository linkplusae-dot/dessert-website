import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/account/",
        "/api/",
        "/cart",
        "/checkout",
        "/forgot-password",
        "/login",
        "/order-success",
        "/payment",
        "/reset-password",
        "/signup",
      ],
    },
    ...(siteConfig.url && {
      sitemap: `${siteConfig.url}/sitemap.xml`,
    }),
  };
}
