
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

module.exports = nextConfig;
