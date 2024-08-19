/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/login',
        destination: '/api/auth/signin',
        permanent: true,
      },
      {
        source: '/signup',
        destination: '/api/auth/signup',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;