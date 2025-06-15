import { memo } from 'react';
import styles from './Header.module.css';

const Header = memo(({ 
  navigationItems, 
  activeSection, 
  scrollProgress, 
  onNavClick,
  onMobileMenuToggle,
  isMobileMenuOpen 
}) => {
  return (
    <header className={`${styles.header} ${scrollProgress > 5 ? styles.scrolled : ''}`}>
      <div className={styles.headerContent}>
        {/* Logo */}
        <a 
          href="#overview" 
          className={styles.logo}
          onClick={(e) => onNavClick(e, '#overview')}
        >
          <i className="fas fa-shield-alt" aria-hidden="true"></i>
          Luau Cryptography
        </a>

        {/* Desktop Navigation */}
        <nav className={styles.navLinks}>
          {navigationItems?.map((item) => {
            const isActive = activeSection === item.href.slice(1);
            return (
              <a
                key={item.href}
                href={item.href}
                className={`${styles.navLink} ${isActive ? styles.active : ''}`}
                onClick={(e) => onNavClick(e, item.href)}
              >
                {item.icon && <i className={item.icon} aria-hidden="true"></i>}
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={`${styles.mobileMenuBtn} ${isMobileMenuOpen ? styles.active : ''}`}
          onClick={onMobileMenuToggle}
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
        >
          <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`} aria-hidden="true"></i>
        </button>
      </div>
    </header>
  );
});

Header.displayName = 'Header';
export default Header;
