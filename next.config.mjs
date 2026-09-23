/** @type {import('next').NextConfig} */
const nextConfig = {
  // GitHub Pages serves files, not a running Next.js server.
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
};
export default nextConfig;
