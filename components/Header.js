import { memo, useCallback, useEffect, useState } from 'react';
import styles from './Header.module.css';

const Header = memo(({ navigationItems, activeSection, onMobileMenuToggle }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      setIsScrolled(scrollTop > 50);
      setScrollProgress(scrollPercent);
      
      // Update CSS custom property for progress bar
      document.documentElement.style.setProperty('--scroll-progress', `${scrollPercent}%`);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = useCallback((e, href) => {
    e.preventDefault();
    console.log('Header clicked href:', href);
    console.log('Header current activeSection:', activeSection);
    console.log('Header comparison result:', activeSection === href.slice(1));
    
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [activeSection]);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.headerContent}>
        {/* Logo */}
        <a 
          href="#overview" 
          className={styles.logo}
          onClick={(e) => handleNavClick(e, '#overview')}
        >
          <i className="fas fa-shield-alt" aria-hidden="true"></i>
          Luau Cryptography
        </a>

        {/* Desktop Navigation */}
        <nav className={styles.navLinks}>
          {navigationItems?.map((item) => {
            const isActive = activeSection === item.href.slice(1);
            console.log(`Header Item: ${item.label}, href: ${item.href}, activeSection: ${activeSection}, isActive: ${isActive}`);
            
            return (
              <a
                key={item.href}
                href={item.href}
                className={`${styles.navLink} ${isActive ? styles.active : ''}`}
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.icon && <i className={item.icon} aria-hidden="true"></i>}
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={styles.mobileMenuBtn}
          onClick={onMobileMenuToggle}
          aria-label="Toggle mobile menu"
        >
          <i className="fas fa-bars" aria-hidden="true"></i>
        </button>
      </div>
    </header>
  );
});

Header.displayName = 'Header';
export default Header;
