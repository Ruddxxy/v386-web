import { OG_CONTENT_TYPE, OG_SIZE, renderOg } from "@/lib/og";

export const runtime = "edge";
export const alt = "Writing — VECTOR 384";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OgImage() {
  return renderOg({
    eyebrow: "Writing",
    title: "Field notes",
    subtitle: "From shipping Rust, C++, and security tooling.",
  });
}
