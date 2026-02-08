/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['mermaid-isomorphic', 'playwright', 'rehype-mermaid'],
  images: {
    unoptimized: true,
  },
  output: 'export',
  trailingSlash: true,
  distDir: 'out',
}

export default nextConfig
