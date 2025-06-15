// hooks/useScrollManager.js
import { useState, useEffect, useCallback, useRef } from 'react';

export function useScrollManager() {
  const [activeSection, setActiveSection] = useState('overview');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const isNavigatingRef = useRef(false);
  const lastScrollTimeRef = useRef(0);
  const timeoutRef = useRef(null);
  const sectionUpdateTimeoutRef = useRef(null);

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

  // Calculate and update scroll progress
  const updateScrollProgress = useCallback(() => {
    const scrollTop = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight - windowHeight;
    
    // Handle edge case where page is shorter than viewport
    if (scrollHeight <= 0) {
      setScrollProgress(0);
      document.documentElement.style.setProperty('--scroll-progress', '0%');
      return;
    }
    
    // Calculate progress (0-100%)
    const progress = Math.min(Math.max((scrollTop / scrollHeight) * 100, 0), 100);
    setScrollProgress(progress);
    
    // Update CSS custom property for progress bar
    document.documentElement.style.setProperty('--scroll-progress', `${progress}%`);
  }, []);

  // Find and update active section with stable detection
  const updateActiveSection = useCallback(() => {
    const windowHeight = window.innerHeight;
    const scrollTop = window.pageYOffset;
    
    // Use a more stable approach: find the section that occupies the most viewport space
    let bestSection = 'overview';
    let maxVisibleArea = 0;
    
    for (const sectionId of sections) {
      const element = document.getElementById(sectionId);
      if (element) {
        const rect = element.getBoundingClientRect();
        
        // Calculate visible area of this section
        const visibleTop = Math.max(0, rect.top);
        const visibleBottom = Math.min(windowHeight, rect.bottom);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
        
        // Only consider sections that are actually visible
        if (visibleHeight > 0) {
          // Bias towards sections in the upper portion of the viewport
          const topBias = rect.top < windowHeight * 0.3 ? 1.5 : 1.0;
          const adjustedArea = visibleHeight * topBias;
          
          if (adjustedArea > maxVisibleArea) {
            maxVisibleArea = adjustedArea;
            bestSection = sectionId;
          }
        }
      }
    }
    
    // Add stability: only change if the new section has significantly more visible area
    // OR if the current section is barely visible
    const currentElement = document.getElementById(activeSection);
    if (currentElement && bestSection !== activeSection) {
      const currentRect = currentElement.getBoundingClientRect();
      const currentVisibleTop = Math.max(0, currentRect.top);
      const currentVisibleBottom = Math.min(windowHeight, currentRect.bottom);
      const currentVisibleHeight = Math.max(0, currentVisibleBottom - currentVisibleTop);
      
      // If current section still has decent visibility, don't switch unless there's a big difference
      if (currentVisibleHeight > windowHeight * 0.15) {
        const threshold = currentVisibleHeight * 1.3; // Require 30% more visibility to switch
        if (maxVisibleArea < threshold) {
          return; // Stay with current section
        }
      }
    }
    
    // Safe to switch to new section
    if (bestSection !== activeSection) {
      setActiveSection(bestSection);
    }
  }, [activeSection, sections]);

  // Debounced section update to prevent rapid switching
  const debouncedUpdateActiveSection = useCallback(() => {
    if (sectionUpdateTimeoutRef.current) {
      clearTimeout(sectionUpdateTimeoutRef.current);
    }
    
    sectionUpdateTimeoutRef.current = setTimeout(() => {
      updateActiveSection();
    }, 100); // 100ms debounce
  }, [updateActiveSection]);

  // Throttled scroll handler for better performance
  const handleScroll = useCallback(() => {
    const now = performance.now();
    if (now - lastScrollTimeRef.current < 16) return; // 60fps throttle
    lastScrollTimeRef.current = now;

    // Always update scroll progress (even during navigation)
    updateScrollProgress();

    // Only skip section detection during navigation to prevent conflicts
    if (!isNavigatingRef.current) {
      debouncedUpdateActiveSection();
    }
  }, [updateScrollProgress, debouncedUpdateActiveSection]);

  // Smooth scroll to section with immediate progress update
  const scrollToSection = useCallback((sectionId) => {
    // Clean the section ID (remove # if present)
    const targetId = sectionId.startsWith('#') ? sectionId.slice(1) : sectionId;
    const target = document.getElementById(targetId);
    
    if (!target) {
      return;
    }

    // Set navigation flag to prevent section detection conflicts
    isNavigatingRef.current = true;
    
    // Add smooth scroll class
    document.documentElement.classList.add('smooth-scroll');
    
    // Update active section immediately for responsive UI
    setActiveSection(targetId);
    
    // Close mobile menu if open
    setIsMobileMenuOpen(false);
    
    // Update URL without jumping
    if (window.history && window.history.pushState) {
      window.history.pushState(null, null, `#${targetId}`);
    }
    
    // Perform smooth scroll
    target.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start',
      inline: 'nearest'
    });
    
    // Force immediate progress update
    setTimeout(() => {
      updateScrollProgress();
    }, 50);
    
    // Set up progress tracking during scroll
    const progressUpdateInterval = setInterval(() => {
      updateScrollProgress();
    }, 50);
    
    // Reset navigation flag after scroll completes (reduced timeout)
    setTimeout(() => {
      document.documentElement.classList.remove('smooth-scroll');
      isNavigatingRef.current = false;
      clearInterval(progressUpdateInterval);
      
      // Final updates
      updateScrollProgress();
      updateActiveSection();
    }, 500); // Reduced from 1000ms to 500ms
  }, [updateScrollProgress, updateActiveSection]);

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
    
    // Recalculate progress on resize
    updateScrollProgress();
  }, [isMobileMenuOpen, updateScrollProgress]);

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
    updateScrollProgress();
    updateActiveSection();
    updateHeaderEffects();

    // Cleanup function
    return () => {
      window.removeEventListener('scroll', scrollHandler);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('click', handleDocumentClick);
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      if (sectionUpdateTimeoutRef.current) {
        clearTimeout(sectionUpdateTimeoutRef.current);
      }
      
      // Reset body overflow
      document.body.style.overflow = '';
    };
  }, [handleScroll, handleResize, handleDocumentClick, updateHeaderEffects, updateScrollProgress, updateActiveSection, debouncedUpdateActiveSection, sections]);

  return {
    activeSection,
    scrollProgress,
    isMobileMenuOpen,
    toggleMobileMenu,
    scrollToSection,
    handleNavClick, // Export for easy use in components
  };
}
