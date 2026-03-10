import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "VECTOR 384 — Rudra Mahapatro",
    short_name: "V384",
    description:
      "Systems Engineer specializing in Rust/C++, Offensive Security, and High-Frequency Infrastructure.",
    start_url: "/",
    display: "standalone",
    background_color: "#0E1018",
    theme_color: "#0E1018",
    icons: [
      {
        src: "/logo.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
  };
}
