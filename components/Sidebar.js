import { memo } from 'react';
import styles from './HeroSection.module.css';
const HeroSection = memo(() => {
  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  return (
    <section id="overview" className={styles.hero}>
      <h1 className={styles.title}>Luau Cryptography</h1>
      <p className={styles.subtitle}>
        The fastest, most advanced cryptography library for Roblox. Production ready with 28+ functions, used in popular games and trusted by developers.
      </p>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statNumber}>28+</span>
          <span className={styles.statLabel}>Functions</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statNumber}>15+</span>
          <span className={styles.statLabel}>Algorithms</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statNumber}>100%</span>
          <span className={styles.statLabel}>Tested</span>
        </div>
      </div>
      <div className={styles.actions}>
        <a 
          href="#installation" 
          className="btn btn-primary"
          onClick={(e) => handleNavClick(e, '#installation')}
        >
          <i className="fas fa-rocket" aria-hidden="true"></i> Get Started
        </a>
        <a 
          href="#demo" 
          className="btn btn-secondary"
          onClick={(e) => handleNavClick(e, '#demo')}
        >
          <i className="fas fa-play" aria-hidden="true"></i> Try Demo
        </a>
      </div>
    </section>
  );
});
HeroSection.displayName = 'HeroSection';
export default HeroSection;"

"import { memo, useCallback } from 'react';
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
