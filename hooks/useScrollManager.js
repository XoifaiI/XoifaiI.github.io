import { useState, useEffect, useCallback, useRef } from 'react';

export function useScrollManager() {
  const [activeSection, setActiveSection] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const isScrollingRef = useRef(false);
  const lastScrollTimeRef = useRef(0);
  const timeoutRef = useRef(null);

  // Optimized scroll handler with throttling
  const handleScroll = useCallback(() => {
    const now = performance.now();
    if (now - lastScrollTimeRef.current < 16) return; // 60fps limit
    lastScrollTimeRef.current = now;

    if (isScrollingRef.current) return;
    isScrollingRef.current = true;

    // Calculate scroll progress
    const scrollTop = window.pageYOffset;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min((scrollTop / scrollHeight) * 100, 100);
    setScrollProgress(progress);

    // Find active section
    const sections = document.querySelectorAll('section[id], .api-category[id]');
    let newActiveSection = null;

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      const rect = section.getBoundingClientRect();
      if (rect.top <= 100) {
        newActiveSection = section.id;
        break;
      }
    }

    if (newActiveSection && newActiveSection !== activeSection) {
      setActiveSection(newActiveSection);
    }

    isScrollingRef.current = false;
  }, [activeSection]);

  // Optimized resize handler
  const handleResize = useCallback(() => {
    if (window.innerWidth > 1024) {
      setIsMobileMenuOpen(false);
    }
  }, []);

  // Smooth scroll to section
  const scrollToSection = useCallback((sectionId) => {
    const target = document.querySelector(sectionId);
    if (target) {
      target.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest'
      });
      setIsMobileMenuOpen(false);
    }
  }, []);

  // Mobile menu toggle
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  // Click handler for navigation
  const handleNavClick = useCallback((e) => {
    // Close mobile menu when clicking outside
    if (isMobileMenuOpen) {
      const sidebar = document.getElementById('sidebar');
      const mobileBtn = document.querySelector('.mobile-menu-btn');
      
      if (sidebar && !sidebar.contains(e.target) && 
          (!mobileBtn || !mobileBtn.contains(e.target))) {
        setIsMobileMenuOpen(false);
      }
    }

    // Handle anchor navigation
    const anchor = e.target.closest('a[href^="#"]');
    if (anchor) {
      e.preventDefault();
      const href = anchor.getAttribute('href');
      if (href && href !== '#') {
        scrollToSection(href);
      }
    }
  }, [isMobileMenuOpen, scrollToSection]);

  useEffect(() => {
    // Add event listeners with passive option for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    document.addEventListener('click', handleNavClick);

    // Set initial active section
    if (typeof window !== 'undefined') {
      const overview = document.querySelector('#overview');
      if (overview) {
        setActiveSection('overview');
      }
    }

    // Cleanup function
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('click', handleNavClick);
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [handleScroll, handleResize, handleNavClick]);

  return {
    activeSection,
    scrollProgress,
    isMobileMenuOpen,
    toggleMobileMenu,
    scrollToSection,
  };
}
