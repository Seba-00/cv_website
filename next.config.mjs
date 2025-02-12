 /**@type {import('next').NextConfig} 
const nextConfig = {};

export default nextConfig;*/

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: false,
    domains: [], // add your image domains here
  },
};