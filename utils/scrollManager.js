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

  // Setup scroll progress indicator
  setupScrollProgress() {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxHeight) * 100;
      
      document.documentElement.style.setProperty('--scroll-progress', `${progress}%`);
    }, { passive: true });
  }

  // Setup header scroll effects
  setupHeaderEffects() {
    const header = document.querySelector('.header');
    let lastScrollY = window.pageYOffset;
    
    window.addEventListener('scroll', () => {
      const currentScrollY = window.pageYOffset;
      
      // Add scrolled class when scrolled down
      if (currentScrollY > 50) {
        header?.classList.add('scrolled');
      } else {
        header?.classList.remove('scrolled');
      }
      
      lastScrollY = currentScrollY;
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

// Initialize scroll manager when DOM is ready
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    window.scrollManager = new ScrollManager();
  });
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ScrollManager;
}
