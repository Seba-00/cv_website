 /**@type {import('next').NextConfig} 
const nextConfig = {};

export default nextConfig;*/

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  compress: true,
  swcMinify: true,
  experimental: {
    optimizeCss: true
  },
  poweredByHeader: false
};

export default nextConfig;

 