import { memo } from 'react';
import styles from './Sidebar.module.css';

const Sidebar = memo(({ 
  sections, 
  activeSection, 
  onNavClick,
  isMobileMenuOpen 
}) => {
  return (
    <aside 
      className={`${styles.sidebar} ${isMobileMenuOpen ? styles.mobileOpen : ''}`} 
      id="sidebar"
    >
      {sections.map((section, index) => (
        <div key={index} className={styles.sidebarSection}>
          <div className={styles.sectionHeader}>{section.title}</div>
          
          <nav className={styles.sidebarNav}>
            {section.items.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`${styles.navLink} ${isActive ? styles.active : ''}`}
                  onClick={(e) => onNavClick(e, item.href)}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.icon && <i className={`${styles.navIcon} ${item.icon}`} aria-hidden="true"></i>}
                  {item.label}
                </a>
              );
            })}
          </nav>
        </div>
      ))}
    </aside>
  );
});

Sidebar.displayName = 'Sidebar';
export default Sidebar;
