// hooks/useScrollManager.js
import { useState, useEffect, useCallback, useRef } from 'react';

export function useScrollManager() {
  const [activeSection, setActiveSection] = useState('overview');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const isNavigatingRef = useRef(false);
  const navigationTimeoutRef = useRef(null);

  // Define all possible sections in order
  const sections = [
    'overview',
    'installation', 
    'quick-start',
    'hashing',
    'encryption',
    'signatures', 
    'utilities',
    'checksums',
    'demo'
  ];

  // Map sub-sections to their parent sections for header navigation
  const sectionMapping = {
    'overview': 'overview',
    'installation': 'installation', 
    'quick-start': 'installation', // Quick start is part of installation
    'hashing': 'api-reference',
    'encryption': 'api-reference',
    'signatures': 'api-reference',
    'utilities': 'api-reference',
    'checksums': 'api-reference',
    'demo': 'demo'
  };

  // Get the header-level section for the current active section
  const getHeaderSection = useCallback((section) => {
    return sectionMapping[section] || section;
  }, []);

  // Simple, stable scroll progress calculation
  const updateScrollProgress = useCallback(() => {
    const scrollTop = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollHeight = documentHeight - windowHeight;
    
    if (scrollHeight <= 0) {
      setScrollProgress(0);
      return;
    }
    
    const progress = Math.min(Math.max((scrollTop / scrollHeight) * 100, 0), 100);
    setScrollProgress(progress);
    document.documentElement.style.setProperty('--scroll-progress', `${progress}%`);
  }, []); // No dependencies

  // Dead simple active section detection
  const updateActiveSection = useCallback(() => {
    // Double-check navigation state to prevent bouncing
    if (isNavigatingRef.current) {
      return; // Skip during navigation
    }
    
    const scrollTop = window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    // Special case: if we're at the very top, always show overview
    if (scrollTop <= 100) { // Increased threshold
      setActiveSection('overview');
      return;
    }
    
    const triggerPoint = windowHeight * 0.3; // 30% down from top
    
    // Find the last section whose top is above the trigger point
    let newActiveSection = 'overview';
    
    for (const sectionId of sections) {
      const element = document.getElementById(sectionId);
      if (element) {
        const rect = element.getBoundingClientRect();
        
        // If section top is above trigger point, it's the active one
        if (rect.top <= triggerPoint) {
          newActiveSection = sectionId;
        } else {
          // Stop at first section below trigger point
          break;
        }
      }
    }
    
    // Final check: don't update if we're still navigating
    if (!isNavigatingRef.current) {
      setActiveSection(newActiveSection);
    }
  }, []); // Remove dependencies to prevent stale closures

  // Simple scroll handler
  const handleScroll = useCallback(() => {
    updateScrollProgress();
    updateActiveSection();
  }, []); // Remove dependencies

  // Smooth scroll to section with better navigation blocking
  const scrollToSection = useCallback((sectionId) => {
    let targetId = sectionId.startsWith('#') ? sectionId.slice(1) : sectionId;
    
    // Handle header-level navigation - map to first sub-section
    if (targetId === 'api-reference') {
      targetId = 'hashing'; // Scroll to first API section
    }
    
    const target = document.getElementById(targetId);
    
    if (!target) return;

    // Clear any existing navigation timeout
    if (navigationTimeoutRef.current) {
      clearTimeout(navigationTimeoutRef.current);
    }

    // Block section detection during navigation IMMEDIATELY
    isNavigatingRef.current = true;
    
    // Update active section immediately to prevent bouncing
    setActiveSection(targetId);
    
    // Close mobile menu
    setIsMobileMenuOpen(false);
    
    // Update URL - use original sectionId for header links
    const urlHash = sectionId.startsWith('#') ? sectionId.slice(1) : sectionId;
    if (window.history?.pushState) {
      window.history.pushState(null, null, `#${urlHash}`);
    }
    
    // Small delay to ensure the flag is set before scrolling starts
    setTimeout(() => {
      // Scroll smoothly
      target.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
      
      // Re-enable section detection after scroll completes
      navigationTimeoutRef.current = setTimeout(() => {
        isNavigatingRef.current = false;
        updateScrollProgress();
        // Force a final section update to make sure we're correct
        setTimeout(() => {
          if (!isNavigatingRef.current) {
            updateActiveSection();
          }
        }, 100);
      }, 1500); // Increased timeout for longer scrolls
    }, 10); // Small delay to ensure flag is set
  }, []); // No dependencies

  // Handle navigation clicks
  const handleNavClick = useCallback((e, href) => {
    e.preventDefault();
    scrollToSection(href);
  }, []); // No dependencies

  // Mobile menu toggle
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => {
      const newState = !prev;
      document.body.style.overflow = newState ? 'hidden' : '';
      return newState;
    });
  }, []);

  // Handle resize
  const handleResize = useCallback(() => {
    if (window.innerWidth > 1024 && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
      document.body.style.overflow = '';
    }
    updateScrollProgress();
  }, [isMobileMenuOpen]); // Only include state that changes

  // Handle clicks outside mobile menu
  const handleDocumentClick = useCallback((e) => {
    if (!isMobileMenuOpen) return;
    
    const sidebar = document.getElementById('sidebar');
    const mobileBtn = document.querySelector('[class*="mobileMenuBtn"]');
    
    if (sidebar && !sidebar.contains(e.target) && 
        (!mobileBtn || !mobileBtn.contains(e.target))) {
      setIsMobileMenuOpen(false);
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  // Header scroll effects
  const updateHeaderEffects = useCallback(() => {
    const header = document.querySelector('[class*="header"]');
    if (header) {
      if (window.pageYOffset > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  }, []); // No dependencies

  // Setup everything
  useEffect(() => {
    const scrollHandler = () => {
      updateScrollProgress();
      updateActiveSection();
      updateHeaderEffects();
    };

    // Add listeners
    window.addEventListener('scroll', scrollHandler, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    document.addEventListener('click', handleDocumentClick);

    // Set initial section from URL
    const initialSection = window.location.hash?.slice(1) || 'overview';
    if (sections.includes(initialSection)) {
      setActiveSection(initialSection);
    }

    // Initial updates
    updateScrollProgress();
    updateActiveSection();
    updateHeaderEffects();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', scrollHandler);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('click', handleDocumentClick);
      document.body.style.overflow = '';
      
      // Clear navigation timeout
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
      }
    };
  }, [handleResize, handleDocumentClick]); // Minimal dependencies

  return {
    activeSection, // Detailed section for sidebar
    headerSection: getHeaderSection(activeSection), // Mapped section for header
    scrollProgress,
    isMobileMenuOpen,
    toggleMobileMenu,
    scrollToSection,
    handleNavClick,
  };
}
