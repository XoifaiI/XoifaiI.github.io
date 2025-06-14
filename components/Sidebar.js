import { memo, useCallback, useEffect } from 'react';
import styles from './Sidebar.module.css';

const Sidebar = memo(({ sections, activeSection, isMobileOpen, onClose }) => {
  const handleNavClick = useCallback((e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    // Close mobile menu after navigation
    if (isMobileOpen && onClose) {
      onClose();
    }
  }, [isMobileOpen, onClose]);

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isMobileOpen && onClose) {
        onClose();
      }
    };

    if (isMobileOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileOpen, onClose]);

  return (
    <aside 
      className={`${styles.sidebar} ${isMobileOpen ? styles.mobileOpen : ''}`} 
      id="sidebar"
    >
      {sections.map((section, index) => (
        <div key={index} className={styles.sidebarSection}>
          <div className={styles.sidebarTitle}>{section.title}</div>
          <ul className={styles.sidebarNav}>
            {section.items.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={activeSection === item.href.slice(1) ? styles.active : ''}
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
});

Sidebar.displayName = 'Sidebar';

export default Sidebar;
