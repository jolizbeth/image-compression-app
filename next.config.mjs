/** @type {import('next').NextConfig} */

const nextConfig = { 
  allowedDevOrigins: ['http://localhost:3000'],
  experimental: {
    serverActions: {
      enabled: true,
    },
  },
  images: {
    domains: ['localhost'],
  },
};


export default nextConfig;
