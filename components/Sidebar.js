import { memo, useCallback } from 'react';
import styles from './Sidebar.module.css';

const Sidebar = memo(({ sections, activeSection }) => {
  const handleNavClick = useCallback((e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <aside className={styles.sidebar} id="sidebar">
      {sections.map((section, index) => (
        <div key={index} className={styles.sidebarSection}>
          {/* Changed from sidebarTitle to sectionHeader to match CSS */}
          <div className={styles.sectionHeader}>{section.title}</div>
          
          {/* Changed to nav element and removed ul/li structure */}
          <nav className={styles.sidebarNav}>
            {section.items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`${styles.navLink} ${activeSection === item.href.slice(1) ? styles.active : ''}`}
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {/* Add icon support */}
                {item.icon && <i className={`${styles.navIcon} ${item.icon}`}></i>}
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      ))}
    </aside>
  );
});

Sidebar.displayName = 'Sidebar';
export default Sidebar;
