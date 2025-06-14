// Enhanced Scroll Manager - Dynamic lighting and smooth progress
class ScrollManager {
  constructor() {
    this.isNavigating = false;
    this.scrollTimeout = null;
    this.init();
  }

  init() {
    this.setupSmoothScroll();
    this.setupScrollProgress();
    this.setupHeaderEffects();
    this.setupDynamicLighting();
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
          
          // Add smooth scroll class temporarily
          document.documentElement.classList.add('smooth-scroll');
          
          // Scroll to element
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          // Remove smooth scroll class after navigation
          setTimeout(() => {
            document.documentElement.classList.remove('smooth-scroll');
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

  // Enhanced scroll progress with smooth updates
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
    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const updateHeader = () => {
      const currentScrollY = window.pageYOffset;
      
      // Add scrolled class when scrolled down
      if (currentScrollY > 50) {
        header?.classList.add('scrolled');
      } else {
        header?.classList.remove('scrolled');
      }
      
      lastScrollY = currentScrollY;
      ticking = false;
    };
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
      }
    }, { passive: true });
  }

  // Setup dynamic lighting effects
  setupDynamicLighting() {
    let animationId;
    let time = 0;
    
    const updateLighting = () => {
      time += 0.01;
      
      // Dynamic light positions
      const light1X = 20 + Math.sin(time * 0.5) * 40;
      const light1Y = 30 + Math.cos(time * 0.3) * 30;
      const light2X = 80 + Math.sin(time * 0.7) * 25;
      const light2Y = 70 + Math.cos(time * 0.4) * 35;
      const light3X = 40 + Math.sin(time * 0.9) * 45;
      const light3Y = 20 + Math.cos(time * 0.6) * 40;
      const light4X = 70 + Math.sin(time * 0.4) * 30;
      const light4Y = 90 + Math.cos(time * 0.8) * 20;
      const light5X = 10 + Math.sin(time * 0.6) * 50;
      const light5Y = 80 + Math.cos(time * 0.5) * 25;
      
      // Dynamic beam angles
      const beam1Angle = 45 + Math.sin(time * 0.3) * 60;
      const beam2Angle = -30 + Math.cos(time * 0.4) * 80;
      const beam3Angle = 60 + Math.sin(time * 0.6) * 90;
      
      // Update CSS custom properties
      document.documentElement.style.setProperty('--light-1-x', `${light1X}%`);
      document.documentElement.style.setProperty('--light-1-y', `${light1Y}%`);
      document.documentElement.style.setProperty('--light-2-x', `${light2X}%`);
      document.documentElement.style.setProperty('--light-2-y', `${light2Y}%`);
      document.documentElement.style.setProperty('--light-3-x', `${light3X}%`);
      document.documentElement.style.setProperty('--light-3-y', `${light3Y}%`);
      document.documentElement.style.setProperty('--light-4-x', `${light4X}%`);
      document.documentElement.style.setProperty('--light-4-y', `${light4Y}%`);
      document.documentElement.style.setProperty('--light-5-x', `${light5X}%`);
      document.documentElement.style.setProperty('--light-5-y', `${light5Y}%`);
      
      document.documentElement.style.setProperty('--beam-1-angle', `${beam1Angle}deg`);
      document.documentElement.style.setProperty('--beam-2-angle', `${beam2Angle}deg`);
      document.documentElement.style.setProperty('--beam-3-angle', `${beam3Angle}deg`);
      
      animationId = requestAnimationFrame(updateLighting);
    };
    
    // Start the animation
    updateLighting();
    
    // Pause animation when page is not visible (performance optimization)
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(animationId);
      } else {
        updateLighting();
      }
    });
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
        document.documentElement.classList.remove('smooth-scroll');
        userScrolled = false;
      }
    }, { passive: true });
  }

  // Utility method to scroll to element without conflicts
  scrollToElement(elementId, offset = 0) {
    const element = document.getElementById(elementId);
    if (!element) return;

    this.isNavigating = true;
    document.documentElement.classList.add('smooth-scroll');

    const elementTop = element.offsetTop - offset;
    
    window.scrollTo({
      top: elementTop,
      behavior: 'smooth'
    });

    setTimeout(() => {
      document.documentElement.classList.remove('smooth-scroll');
      this.isNavigating = false;
    }, 800);
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
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobileMenuBtn');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebarOverlay') || this.createOverlay();

    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener('click', () => {
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
    
    sidebar?.classList.toggle('mobileOpen');
    overlay?.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (sidebar?.classList.contains('mobileOpen')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeMobileMenu() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebarOverlay');
    
    sidebar?.classList.remove('mobileOpen');
    overlay?.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Initialize everything when DOM is ready
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    window.scrollManager = new ScrollManager();
    window.mobileMenu = new MobileMenu();
    
    // Add global mobile menu toggle function
    window.toggleMobileMenu = () => {
      window.mobileMenu.toggleMobileMenu();
    };
  });
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ScrollManager, MobileMenu };
}
