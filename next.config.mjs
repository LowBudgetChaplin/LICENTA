/** @type {import('next').NextConfig} */
const nextConfig = {
        images: {
          domains: ["utfs.io"]
        },
        webpack: (config) => {
          config.resolve.fallback = { fs: false, path: false, os: false };
          return config;
        },
      };
      
      export default nextConfig;
      