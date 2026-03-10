import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://vector384.com",
      lastModified: new Date("2026-03-10"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
