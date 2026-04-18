import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png" as const;

export interface OgProps {
  // Small-cap eyebrow above the headline (e.g. "CASE STUDY").
  eyebrow?: string;
  // Main headline; rendered large and tight.
  title: string;
  // One-line subtitle under the headline.
  subtitle?: string;
}

// Shared OG renderer so every route gets the same brand treatment
// with just the three strings swapped. Used by:
//   app/opengraph-image.tsx
//   app/projects/[slug]/opengraph-image.tsx
//   app/benchmarks/opengraph-image.tsx
//   app/writing/opengraph-image.tsx
export function renderOg({ eyebrow, title, subtitle }: OgProps) {
  return new ImageResponse(
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
        padding: 80,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(229,165,55,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(229,165,55,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
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

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          textAlign: "center" as const,
        }}
      >
        {eyebrow && (
          <div
            style={{
              fontSize: 20,
              color: "#E5A537",
              letterSpacing: "0.18em",
              textTransform: "uppercase" as const,
            }}
          >
            {eyebrow}
          </div>
        )}
        <div
          style={{
            fontSize: title.length > 28 ? 64 : 80,
            fontWeight: 800,
            color: "#E2E6EE",
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
            maxWidth: 1000,
          }}
        >
          {title}
        </div>
        {subtitle && (
          <div
            style={{
              fontSize: 24,
              color: "#8B93A8",
              marginTop: 4,
              maxWidth: 900,
            }}
          >
            {subtitle}
          </div>
        )}
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 48,
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
    </div>,
    { ...OG_SIZE },
  );
}
