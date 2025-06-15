// hooks/useScrollManager.js
import { useState, useEffect, useCallback, useRef } from 'react';

export function useScrollManager() {
  const [activeSection, setActiveSection] = useState('overview');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const isNavigatingRef = useRef(false);
  const lastScrollTimeRef = useRef(0);
  const timeoutRef = useRef(null);

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

  // Throttled scroll handler for better performance
  const handleScroll = useCallback(() => {
    const now = performance.now();
    if (now - lastScrollTimeRef.current < 16) return; // 60fps throttle
    lastScrollTimeRef.current = now;

    // Skip during programmatic navigation to prevent conflicts
    if (isNavigatingRef.current) return;

    const scrollTop = window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    // Calculate scroll progress
    const scrollHeight = document.documentElement.scrollHeight - windowHeight;
    const progress = Math.min(Math.max((scrollTop / scrollHeight) * 100, 0), 100);
    setScrollProgress(progress);
    
    // Update CSS custom property for progress bar
    document.documentElement.style.setProperty('--scroll-progress', `${progress}%`);

    // Find active section using intersection-based logic
    let newActiveSection = 'overview'; // Default fallback
    
    for (const sectionId of sections) {
      const element = document.getElementById(sectionId);
      if (element) {
        const rect = element.getBoundingClientRect();
        // Section is active if it's in the top 40% of viewport
        if (rect.top <= windowHeight * 0.4 && rect.bottom >= 0) {
          newActiveSection = sectionId;
        }
      }
    }
    
    // Only update if section actually changed
    if (newActiveSection !== activeSection) {
      setActiveSection(newActiveSection);
    }
  }, [activeSection, sections]);

  // Smooth scroll to section with conflict prevention
  const scrollToSection = useCallback((sectionId) => {
    // Clean the section ID (remove # if present)
    const targetId = sectionId.startsWith('#') ? sectionId.slice(1) : sectionId;
    const target = document.getElementById(targetId);
    
    if (!target) {
      return;
    }

    // Set navigation flag to prevent conflicts
    isNavigatingRef.current = true;
    
    // Add smooth scroll class
    document.documentElement.classList.add('smooth-scroll');
    
    // Perform smooth scroll
    target.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start',
      inline: 'nearest'
    });
    
    // Update active section immediately for responsive UI
    setActiveSection(targetId);
    
    // Close mobile menu if open
    setIsMobileMenuOpen(false);
    
    // Update URL without jumping
    if (window.history && window.history.pushState) {
      window.history.pushState(null, null, `#${targetId}`);
    }
    
    // Reset navigation flag after scroll completes
    setTimeout(() => {
      document.documentElement.classList.remove('smooth-scroll');
      isNavigatingRef.current = false;
    }, 1000);
  }, []);

  // Handle navigation clicks
  const handleNavClick = useCallback((e, href) => {
    e.preventDefault();
    scrollToSection(href);
  }, [scrollToSection]);

  // Mobile menu toggle
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => {
      const newState = !prev;
      
      // Prevent body scroll when menu is open
      if (newState) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
      
      return newState;
    });
  }, []);

  // Handle resize to close mobile menu on desktop
  const handleResize = useCallback(() => {
    if (window.innerWidth > 1024 && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  // Handle clicks outside mobile menu
  const handleDocumentClick = useCallback((e) => {
    if (!isMobileMenuOpen) return;
    
    const sidebar = document.getElementById('sidebar');
    const mobileBtn = document.querySelector('.mobileMenuBtn, [class*="mobileMenuBtn"]');
    
    if (sidebar && !sidebar.contains(e.target) && 
        (!mobileBtn || !mobileBtn.contains(e.target))) {
      setIsMobileMenuOpen(false);
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  // Handle header scroll effects
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

  // Main effect - setup all event listeners
  useEffect(() => {
    // Combined scroll handler
    const scrollHandler = () => {
      handleScroll();
      updateHeaderEffects();
    };

    // Add event listeners with passive option for better performance
    window.addEventListener('scroll', scrollHandler, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    document.addEventListener('click', handleDocumentClick);

    // Set initial active section from URL hash or default
    const initialSection = window.location.hash ? 
      window.location.hash.slice(1) : 'overview';
    
    if (sections.includes(initialSection)) {
      setActiveSection(initialSection);
    }

    // Initial scroll progress and header state
    handleScroll();
    updateHeaderEffects();

    // Cleanup function
    return () => {
      window.removeEventListener('scroll', scrollHandler);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('click', handleDocumentClick);
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      // Reset body overflow
      document.body.style.overflow = '';
    };
  }, [handleScroll, handleResize, handleDocumentClick, updateHeaderEffects, sections]);

  return {
    activeSection,
    scrollProgress,
    isMobileMenuOpen,
    toggleMobileMenu,
    scrollToSection,
    handleNavClick, // Export for easy use in components
  };
}
