// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   // images: {
//   //   remotePatterns: [
//   //     {
//   //       protocol: "https",
//   //       hostname: "ik.imagekit.io",
//   //       port: "",
//   //     },
//   //   ],
//   // },
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   typescript: {
//     ignoreBuildErrors: true,
//   },
// };

// export default nextConfig;
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ Disable Turbopack to fix internal font error
  experimental: {
    turbopack: false,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // Uncomment and customize if using external images
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: "https",
  //       hostname: "ik.imagekit.io",
  //       port: "",
  //     },
  //   ],
  // },
};

export default nextConfig;
