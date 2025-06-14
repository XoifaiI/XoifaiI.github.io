import { memo, useState, useCallback } from 'react';
import styles from './Header.module.css';

const Header = memo(({ navigationItems, activeSection, scrollProgress }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const handleNavClick = useCallback((e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMobileMenuOpen(false);
    }
  }, []);

  return (
    <header className={styles.header} style={{ '--scroll-progress': `${scrollProgress}%` }}>
      <div className={styles.headerContent}>
        <a 
          href="#overview" 
          className={styles.logo}
          onClick={(e) => handleNavClick(e, '#overview')}
        >
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
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
        >
          <i className="fas fa-bars" aria-hidden="true"></i>
        </button>
      </div>
    </header>
  );
});

Header.displayName = 'Header';

export default Header;
