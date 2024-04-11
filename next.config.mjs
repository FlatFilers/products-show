/** @type {import('next').NextConfig} */
let nextConfig = {};
if (process.env.NODE_ENV === "development") {
  nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "loremflickr.com",
          port: "",
          pathname: "/100/100/**",
        },
      ],
    },
  };
}

import preflight from "./preflight.js";

preflight(["DATABASE_URL", "NEXTAUTH_SECRET"]);

export default nextConfig;
