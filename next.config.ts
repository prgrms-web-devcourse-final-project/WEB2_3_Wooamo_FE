import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        pathname: "/DevPumpkin0113/test/refs/heads/main/costume/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
