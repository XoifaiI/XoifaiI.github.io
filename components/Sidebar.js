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
          <div className={styles.sidebarTitle}>{section.title}</div>
          <ul className={styles.sidebarNav}>
            {section.items.map((item) => (
              <li key={item.href}>

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
