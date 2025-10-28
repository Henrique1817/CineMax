/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
    unoptimized: false,
  },
  experimental: {
    optimizePackageImports: ['react-icons'],
  },
}

module.exports = nextConfig