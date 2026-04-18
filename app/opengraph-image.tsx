import { OG_CONTENT_TYPE, OG_SIZE, renderOg } from "@/lib/og";

export const runtime = "edge";

export const alt =
  "Rudra Mahapatro — Systems Engineer | Rust, C++, Offensive Security | VECTOR 384";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OgImage() {
  return renderOg({
    eyebrow: "Rudra Mahapatro",
    title: "VECTOR 384",
    subtitle: "Systems Engineer — Rust / C++ / Offensive Security",
  });
}
