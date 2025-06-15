// hooks/useScrollManager.js
import { useState, useEffect, useCallback, useRef } from 'react';

export function useScrollManager() {
  const [activeSection, setActiveSection] = useState('overview');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const isNavigatingRef = useRef(false);

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
  }, []);

  // Dead simple active section detection
  const updateActiveSection = useCallback(() => {
    if (isNavigatingRef.current) return; // Skip during navigation
    
    const scrollTop = window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    // Special case: if we're at the very top, always show overview
    if (scrollTop < 50) {
      if (activeSection !== 'overview') {
        setActiveSection('overview');
      }
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
    
    // Only update if changed
    if (newActiveSection !== activeSection) {
      setActiveSection(newActiveSection);
    }
  }, [activeSection, sections]);

  // Simple scroll handler
  const handleScroll = useCallback(() => {
    updateScrollProgress();
    updateActiveSection();
  }, [updateScrollProgress, updateActiveSection]);

  // Smooth scroll to section
  const scrollToSection = useCallback((sectionId) => {
    const targetId = sectionId.startsWith('#') ? sectionId.slice(1) : sectionId;
    const target = document.getElementById(targetId);
    
    if (!target) return;

    // Block section detection during navigation
    isNavigatingRef.current = true;
    
    // Update active section immediately
    setActiveSection(targetId);
    
    // Close mobile menu
    setIsMobileMenuOpen(false);
    
    // Update URL
    if (window.history?.pushState) {
      window.history.pushState(null, null, `#${targetId}`);
    }
    
    // Scroll smoothly
    target.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
    
    // Re-enable section detection after scroll
    setTimeout(() => {
      isNavigatingRef.current = false;
      updateScrollProgress();
    }, 1000);
  }, [updateScrollProgress]);

  // Handle navigation clicks
  const handleNavClick = useCallback((e, href) => {
    e.preventDefault();
    scrollToSection(href);
  }, [scrollToSection]);

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
  }, [isMobileMenuOpen, updateScrollProgress]);

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
  }, []);

  // Setup everything
  useEffect(() => {
    const scrollHandler = () => {
      handleScroll();
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
    };
  }, []); // Empty dependency array - run once

  return {
    activeSection,
    scrollProgress,
    isMobileMenuOpen,
    toggleMobileMenu,
    scrollToSection,
    handleNavClick,
  };
}
