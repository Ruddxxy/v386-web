import { getProject } from "@/lib/projects";
import { OG_CONTENT_TYPE, OG_SIZE, renderOg } from "@/lib/og";

export const runtime = "edge";
export const alt = "Case study — VECTOR 384";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

// No generateStaticParams here — Next.js forbids it alongside edge runtime.
// The page.tsx restricts crawl to the 3 case-study slugs via dynamicParams=false,
// so the OG will be rendered on first request for each known slug and cached.
export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) {
    return renderOg({
      eyebrow: "Case study",
      title: "VECTOR 384",
      subtitle: "vector384.com",
    });
  }
  return renderOg({
    eyebrow: "Case study",
    title: project.title,
    subtitle: project.tagline,
  });
}
