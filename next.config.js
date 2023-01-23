/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["mdbootstrap.com", "firebasestorage.googleapis.com"],
  },
};

module.exports = nextConfig;
