// Simple Scroll Manager - Fixed header/sidebar + progress bar
// Create this file as: utils/scrollManager.js

class ScrollManager {
  constructor() {
    this.isNavigating = false;
    this.init();
  }

  init() {
    this.setupSmoothScroll();
    this.setupScrollProgress();
    this.setupHeaderEffects();
    this.preventScrollConflicts();
  }

  // Setup smooth scrolling for navigation links only
  setupSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          this.isNavigating = true;
          
          // Scroll to element with offset for fixed header
          const headerHeight = 70;
          const elementTop = targetElement.offsetTop - headerHeight;
          
          window.scrollTo({
            top: elementTop,
            behavior: 'smooth'
          });
          
          // Reset navigation flag
          setTimeout(() => {
            this.isNavigating = false;
          }, 1000);
          
          // Update URL without jumping
          if (history.pushState) {
            history.pushState(null, null, `#${targetId}`);
          }
        }
      });
    });
  }

  // Setup scroll progress bar
  setupScrollProgress() {
    let ticking = false;
    
    const updateProgress = () => {
      const scrolled = window.pageYOffset;
      const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(Math.max((scrolled / maxHeight) * 100, 0), 100);
      
      // Update CSS custom property for progress bar
      document.documentElement.style.setProperty('--scroll-progress', `${progress}%`);
      
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateProgress);
        ticking = true;
      }
    }, { passive: true });
    
    // Initial update
    updateProgress();
  }

  // Setup header scroll effects
  setupHeaderEffects() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    let ticking = false;

    const updateHeader = () => {
      const currentScrollY = window.pageYOffset;
      
      // Add scrolled class when scrolled down
      if (currentScrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      
      ticking = false;
    };
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
      }
    }, { passive: true });
  }

  // Prevent scroll conflicts during navigation
  preventScrollConflicts() {
    let userScrolled = false;
    
    // Detect user scroll during navigation
    window.addEventListener('wheel', () => {
      if (this.isNavigating) {
        userScrolled = true;
      }
    }, { passive: true });
    
    // Detect touch scroll during navigation
    window.addEventListener('touchmove', () => {
      if (this.isNavigating) {
        userScrolled = true;
      }
    }, { passive: true });
    
    // Reset navigation flag if user scrolls manually
    window.addEventListener('scroll', () => {
      if (userScrolled && this.isNavigating) {
        this.isNavigating = false;
        userScrolled = false;
      }
    }, { passive: true });
  }
}

// Mobile menu functionality
class MobileMenu {
  constructor() {
    this.init();
  }

  init() {
    this.setupMobileMenu();
  }

  setupMobileMenu() {
    // Create overlay if it doesn't exist
    let overlay = document.querySelector('.sidebarOverlay');
    if (!overlay) {
      overlay = this.createOverlay();
    }

    // Mobile menu toggle button
    const mobileMenuBtn = document.querySelector('.mobileMenuBtn');
    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleMobileMenu();
      });
    }

    // Close sidebar when clicking overlay
    overlay.addEventListener('click', () => {
      this.closeMobileMenu();
    });

    // Close sidebar when clicking a navigation link on mobile
    const navLinks = document.querySelectorAll('.sidebarNav a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 1024) {
          this.closeMobileMenu();
        }
      });
    });

    // Handle window resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024) {
        this.closeMobileMenu();
      }
    });

    // Close menu with escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeMobileMenu();
      }
    });
  }

  createOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'sidebarOverlay';
    document.body.appendChild(overlay);
    return overlay;
  }

  toggleMobileMenu() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebarOverlay');
    
    if (sidebar && overlay) {
      const isOpen = sidebar.classList.contains('mobileOpen');
      
      if (isOpen) {
        this.closeMobileMenu();
      } else {
        sidebar.classList.add('mobileOpen');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    }
  }

  closeMobileMenu() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebarOverlay');
    
    if (sidebar) sidebar.classList.remove('mobileOpen');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Initialize everything when DOM is ready
function initializeScrollManager() {
  console.log('🚀 Initializing scroll manager...');
  
  window.scrollManager = new ScrollManager();
  window.mobileMenu = new MobileMenu();
  
  // Add global mobile menu toggle function
  window.toggleMobileMenu = () => {
    window.mobileMenu.toggleMobileMenu();
  };
  
  console.log('✅ Scroll manager initialized!');
}

// Multiple initialization methods for compatibility
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeScrollManager);
} else {
  // DOM is already loaded
  initializeScrollManager();
}

// Fallback for older browsers
window.addEventListener('load', () => {
  if (!window.scrollManager) {
    initializeScrollManager();
  }
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ScrollManager, MobileMenu };
}
