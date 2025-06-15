import { useEffect, useCallback, useMemo } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import HeroSection from '../components/HeroSection';
import QuickLinks from '../components/QuickLinks';
import InstallationSection from '../components/InstallationSection';
import ApiReference from '../components/ApiReference';
import DemoSection from '../components/DemoSection';
import Credits from '../components/Credits';
import { useScrollManager } from '../hooks/useScrollManager';
import { useCopyHandler } from '../hooks/useCopyHandler';
import { useDemoHandlers } from '../hooks/useDemoHandlers';
import styles from '../styles/Home.module.css';

export default function Home() {
  // Use all functions from useScrollManager
  const { 
    activeSection,      // Detailed section for sidebar
    headerSection,      // Mapped section for header navigation  
    scrollProgress, 
    isMobileMenuOpen, 
    toggleMobileMenu, 
    handleNavClick
  } = useScrollManager();
  
  const { copyCode } = useCopyHandler();
  const { performHash, encodeBase64, decodeBase64 } = useDemoHandlers();

  // Memoized navigation items to prevent unnecessary re-renders
  const navigationItems = useMemo(() => [
    { href: '#overview', label: 'Overview' },
    { href: '#installation', label: 'Installation' },
    { href: '#api-reference', label: 'API Reference' },
    { href: '#demo', label: 'Demo' },
  ], []);

  const sidebarSections = useMemo(() => [
    {
      title: 'Getting Started',
      items: [
        { href: '#overview', label: 'Overview' },
        { href: '#installation', label: 'Installation' },
        { href: '#quick-start', label: 'Quick Start' },
      ],
    },
    {
      title: 'API Reference',
      items: [
        { href: '#hashing', label: 'Hashing (20)' },
        { href: '#encryption', label: 'Encryption (3)' },
        { href: '#signatures', label: 'Digital Signatures (3)' },
        { href: '#utilities', label: 'Utilities (10+)' },
        { href: '#checksums', label: 'Checksums (2)' },
      ],
    },
    {
      title: 'Interactive',
      items: [
        { href: '#demo', label: 'Live Demo' },
      ],
    },
  ], []);

  // Global function exposure for compatibility (cleaned up approach)
  useEffect(() => {
    const globalFunctions = {
      copyCode,
      performHash,
      encodeBase64,
      decodeBase64,
    };

    // Expose functions globally for onclick handlers
    Object.assign(window, globalFunctions);

    // Cleanup function
    return () => {
      Object.keys(globalFunctions).forEach(key => {
        delete window[key];
      });
    };
  }, [copyCode, performHash, encodeBase64, decodeBase64]);

  return (
    <>
      <Head>
        <title>Luau Cryptography - Fastest Crypto Library for Roblox</title>
        <meta name="description" content="The fastest, most advanced cryptography library for Roblox. Production ready with 28+ functions, used in popular games and trusted by developers." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="Roblox, Cryptography, Luau, Encryption, Hashing, Security" />
        <meta property="og:title" content="Luau Cryptography - Fastest Crypto Library for Roblox" />
        <meta property="og:description" content="Production ready cryptography library with 28+ functions for Roblox development" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Preload critical fonts */}
        <link 
          rel="preconnect" 
          href="https://cdnjs.cloudflare.com" 
          crossOrigin="anonymous"
        />
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css" 
        />
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
        />
        
        {/* Preload critical scripts */}
        <link 
          rel="preload" 
          href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-core.min.js" 
          as="script" 
        />
        <link 
          rel="preload" 
          href="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js" 
          as="script" 
        />
      </Head>

      <div className={styles.app}>
        <Header 
          navigationItems={navigationItems} 
          activeSection={headerSection}
          scrollProgress={scrollProgress}
          onNavClick={handleNavClick}
          onMobileMenuToggle={toggleMobileMenu}
          isMobileMenuOpen={isMobileMenuOpen}
        />
        
        <div className={styles.mainLayout}>
          <Sidebar 
            sections={sidebarSections} 
            activeSection={activeSection}
            onNavClick={handleNavClick}
            isMobileMenuOpen={isMobileMenuOpen}
          />
          
          <main className={styles.content}>
            <HeroSection />
            <QuickLinks />
            <InstallationSection />
            <ApiReference />
            <DemoSection />
            <Credits />
          </main>
        </div>
      </div>
      
      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div 
          className={styles.mobileOverlay}
          onClick={toggleMobileMenu}
        />
      )}
    </>
  );
}

// Static generation for optimal performance
export async function getStaticProps() {
  return {
    props: {
      // Add any static data here if needed
     },
  };
}
