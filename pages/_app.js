import { useEffect } from 'react';
import '../styles/globals.css';
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Load Prism.js for syntax highlighting
    const loadPrism = async () => {
      if (typeof window !== 'undefined') {
        // Load Prism core
        const prismCore = document.createElement('script');
        prismCore.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-core.min.js';
        prismCore.async = true;

        prismCore.onload = () => {
          // Load Lua syntax highlighting
          const prismLua = document.createElement('script');
          prismLua.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-lua.min.js';
          prismLua.async = true;

          prismLua.onload = () => {
            // Highlight all code blocks
            if (window.Prism) {
              window.Prism.highlightAll();
            }
          };

          document.head.appendChild(prismLua);
        };

        document.head.appendChild(prismCore);
      }
    };
    loadPrism();
    // Performance monitoring
    if (process.env.NODE_ENV === 'development') {
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(console.log);
        getFID(console.log);
        getFCP(console.log);
        getLCP(console.log);
        getTTFB(console.log);
      });
    }
    // Service Worker registration for better caching (production only)
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        // Service worker registration failed, but continue without it
      });
    }
  }, []);
  return <Component {...pageProps} />;
}
export default MyApp;
