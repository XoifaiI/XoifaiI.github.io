import { memo, useCallback } from 'react';
import styles from './Sidebar.module.css';

const Sidebar = memo(({ sections, activeSection }) => {
  const handleNavClick = useCallback((e, href) => {
    e.preventDefault();
    console.log('Clicked href:', href);
    console.log('Current activeSection:', activeSection);
    console.log('Comparison result:', activeSection === href.slice(1));
    
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [activeSection]);

  return (
    <aside className={styles.sidebar} id="sidebar">
      {sections.map((section, index) => (
        <div key={index} className={styles.sidebarSection}>
          <div className={styles.sectionHeader}>{section.title}</div>
          
          <nav className={styles.sidebarNav}>
            {section.items.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              console.log(`Item: ${item.label}, href: ${item.href}, activeSection: ${activeSection}, isActive: ${isActive}`);
              
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`${styles.navLink} ${isActive ? styles.active : ''}`}
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  {item.icon && <i className={`${styles.navIcon} ${item.icon}`}></i>}
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
