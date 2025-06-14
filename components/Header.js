// Step 1: Add debugging to your Header component
import { memo, useState, useCallback, useEffect } from 'react';
import styles from './Header.module.css'; // ← CHECK THIS PATH!

const Header = memo(({ navigationItems, activeSection, scrollProgress, onMobileMenuToggle }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // 🚨 DEBUG: Add this to see if styles are loading
  useEffect(() => {
    console.log('🔍 DEBUG - Header styles object:', styles);
    console.log('🔍 DEBUG - Header styles.header:', styles.header);
    console.log('🔍 DEBUG - All style keys:', Object.keys(styles));
  }, []);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update CSS custom property for scroll progress
  useEffect(() => {
    document.documentElement.style.setProperty('--scroll-progress', `${scrollProgress || 0}%`);
  }, [scrollProgress]);

  const handleNavClick = useCallback((e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleMobileMenuToggle = useCallback(() => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);
    
    if (onMobileMenuToggle) {
      onMobileMenuToggle(newState);
    }
  }, [isMobileMenuOpen, onMobileMenuToggle]);

  // Close mobile menu when clicking outside or on navigation
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMobileMenuOpen && !e.target.closest('#sidebar') && !e.target.closest(`.${styles.mobileMenuBtn}`)) {
        setIsMobileMenuOpen(false);
        if (onMobileMenuToggle) {
          onMobileMenuToggle(false);
        }
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen, onMobileMenuToggle]);

  return (
    <>
      {/* 🚨 DEBUG: Add inline styles to test if positioning works */}
      <header 
        className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: 'rgba(255, 0, 0, 0.8)', // RED background for testing
          height: '70px'
        }}
      >
        <div className={styles.headerContent}>
          <a href="#overview" className={styles.logo} onClick={(e) => handleNavClick(e, '#overview')}>
            <i className="fas fa-shield-alt" aria-hidden="true"></i>
            Luau Cryptography
          </a>
          
          <nav className={styles.navLinks}>
            {navigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={activeSection === item.href.slice(1) ? styles.active : ''}
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.label}
              </a>
            ))}
          </nav>
          
          <button 
            className={styles.mobileMenuBtn}
            onClick={handleMobileMenuToggle}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            <i className={isMobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'} aria-hidden="true"></i>
          </button>
        </div>
      </header>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className={`${styles.mobileOverlay} ${styles.active}`}
          onClick={() => {
            setIsMobileMenuOpen(false);
            if (onMobileMenuToggle) {
              onMobileMenuToggle(false);
            }
          }}
        />
      )}
    </>
  );
});

Header.displayName = 'Header';
export default Header;
