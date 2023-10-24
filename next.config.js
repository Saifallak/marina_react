/**
 * @type {import('next').NextConfig}
 */
const { i18n } = require('./next-i18next.config');

const nextConfig = {
  /* config options here */
 i18n,
  reactStrictMode: true,
  images: {
    domains: ['admin.marina.com.eg'],
  },
  experimental: {
    largePageDataBytes: 800 * 1000,
  },
}

module.exports = nextConfig