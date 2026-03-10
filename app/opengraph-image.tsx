import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Rudra Mahapatro — Systems Engineer | Rust, C++, Offensive Security | VECTOR 384";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0E1018",
          position: "relative",
        }}
      >
        {/* Grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(229,165,55,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(229,165,55,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Amber accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background:
              "linear-gradient(90deg, transparent, #E5A537, transparent)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: "#E2E6EE",
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            VECTOR 384
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#E5A537",
              letterSpacing: "0.08em",
              textTransform: "uppercase" as const,
            }}
          >
            Rudra Mahapatro
          </div>
          <div
            style={{
              fontSize: 20,
              color: "#8B93A8",
              marginTop: 8,
            }}
          >
            Systems Engineer — Rust / C++ / Offensive Security
          </div>
        </div>

        {/* Bottom accent */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            display: "flex",
            gap: 12,
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "#E5A537",
            }}
          />
          <div
            style={{
              fontSize: 14,
              color: "#515868",
              letterSpacing: "0.12em",
              textTransform: "uppercase" as const,
            }}
          >
            vector384.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
