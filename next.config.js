/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  turbopack: {
    root: __dirname,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          {
            // Vercel Live/Toolbar (preview deployments) needs frame-src +
            // script/style/connect/img allowances for vercel.live and its
            // Pusher websocket. Keeping this here so the widget works in
            // previews without CSP warnings in the console.
            key: "Content-Security-Policy-Report-Only",
            value:
              "default-src 'self'; " +
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com https://vercel.live; " +
              "style-src 'self' 'unsafe-inline' https://vercel.live; " +
              "font-src 'self' https://vercel.live https://assets.vercel.com; " +
              "img-src 'self' data: blob: https://vercel.live https://vercel.com; " +
              "connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com https://vercel.live wss://ws-us3.pusher.com; " +
              "frame-src 'self' https://vercel.live;",
          },
        ],
      },
      {
        source: "/",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/:all*(svg|jpg|jpeg|png|gif|ico|webp|woff|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
