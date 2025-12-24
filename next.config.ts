import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone", // 🔴 REQUIRED for cPanel

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "healthnetinternalmedicinespecialitycenter.com",
        pathname: "/public/storage/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
