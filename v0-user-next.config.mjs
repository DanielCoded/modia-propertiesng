/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['hebbkx1anhila5yf.public.blob.vercel-storage.com'],
    unoptimized: true,
  },
  // Remove any experimental settings that might cause issues
  reactStrictMode: true,
};

export default nextConfig;

