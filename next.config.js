
const nextConfig = {
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
