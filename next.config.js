/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'out',
  images: {
    unoptimized: true,
  },
  
  // Remove basePath and assetPrefix for user GitHub Pages sites
  // basePath and assetPrefix are only needed for project sites (username.github.io/repo-name)
  
  // Disable server-side features for static export
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Custom webpack config for better optimization
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Optimize bundle size
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    return config;
  },
  
  // Generate sitemap and optimize SEO
  generateEtags: false,
  
  // Compress and optimize
  compress: true,
  
  // Environment variables for build optimization
  env: {
    CUSTOM_BUILD_ID: process.env.GITHUB_SHA || 'dev',
  },
};

module.exports = nextConfig;
