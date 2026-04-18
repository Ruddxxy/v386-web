import type { MetadataRoute } from "next";
import { getCaseStudyProjects } from "@/lib/projects";

const BASE = "https://vector384.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const caseStudies = getCaseStudyProjects().map((p) => ({
    url: `${BASE}/projects/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: BASE,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    {
      url: `${BASE}/benchmarks`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${BASE}/writing`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    ...caseStudies,
  ];
}
