import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//cdnjs.cloudflare.com" />
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossOrigin="anonymous" />
        
        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#4285f4" />
        <meta name="msapplication-TileColor" content="#4285f4" />
        
        {/* Optimize font loading */}
        <link rel="preload" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" as="style" />
        <link rel="preload" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css" as="style" />
        
        {/* Performance hints */}
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
        
        {/* Security headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
        
        {/* Critical CSS inline for better performance */}
        <style jsx>{`
          /* Critical CSS for above-the-fold content */
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          :root {
            --bg-primary: #0b0b0b;
            --bg-secondary: #151515;
            --text-primary: #ffffff;
            --accent: #4285f4;
          }
          
          html {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            scroll-behavior: smooth;
          }
          
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: var(--bg-primary);
            color: var(--text-primary);
            line-height: 1.6;
          }
        `}</style>
      </Head>
      <body>
        <Main />
        <NextScript />
        
        {/* Load non-critical scripts */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Performance optimization
              if ('requestIdleCallback' in window) {
                requestIdleCallback(() => {
                  // Load non-critical resources during idle time
                });
              }
              
              // Error handling
              window.addEventListener('error', (e) => {
                console.error('Global error:', e.error);
              });
              
              window.addEventListener('unhandledrejection', (e) => {
                console.error('Unhandled promise rejection:', e.reason);
              });
            `,
          }}
        />
      </body>
    </Html>
  );
}
