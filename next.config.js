/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'out',
  images: {
    unoptimized: true,
  },
  // Uncomment and modify if deploying to a subdirectory
  // basePath: '/your-repo-name',
  // assetPrefix: '/your-repo-name/',
  
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
