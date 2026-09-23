/** @type {import('next').NextConfig} */
const nextConfig = {
  // GitHub Pages serves files, not a running Next.js server.
  output: 'export',
  distDir: process.env.NODE_ENV === 'development' ? '.next-dev' : '.next',
  trailingSlash: true,
  images: { unoptimized: true },
};
export default nextConfig;

