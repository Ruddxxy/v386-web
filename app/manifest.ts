import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "VECTOR 384 — Rudra Mahapatro",
    short_name: "V384",
    description:
      "I build the tools that other engineers depend on. Systems engineer — Rust, C++, offensive security.",
    start_url: "/",
    display: "standalone",
    background_color: "#0E1018",
    theme_color: "#0E1018",
    icons: [
      {
        src: "/logo-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/logo-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
