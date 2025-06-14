import { memo } from 'react';
import styles from './QuickLinks.module.css';

const QuickLinks = memo(() => {
  const links = [
    {
      href: 'https://devforum.roblox.com/t/fastest-cryptography-library-for-roblox/3680271',
      icon: 'fab fa-discourse',
      title: 'DevForum Documentation',
      description: 'Complete documentation and community discussion',
    },
    {
      href: 'https://github.com/daily3014/rbx-cryptography',
      icon: 'fab fa-github',
      title: 'GitHub Repository',
      description: 'Source code, issues, and contributions',
    },
    {
      href: 'https://wally.run/package/daily3014/cryptography',
      icon: 'fas fa-package',
      title: 'Wally Package',
      description: 'Install with Wally package manager',
    },
    {
      href: 'https://pesde.dev/packages/daily3014/cryptography',
      icon: 'fas fa-cube',
      title: 'Pesde Package',
      description: 'Install with Pesde package manager',
    },
  ];

  return (
    <section className={styles.quickLinks}>
      {links.map((link, index) => (
        <a
          key={index}
          href={link.href}
          className={styles.quickLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className={link.icon} aria-hidden="true"></i>
          <h3>{link.title}</h3>
          <p>{link.description}</p>
        </a>
      ))}
    </section>
  );
});

QuickLinks.displayName = 'QuickLinks';

export default QuickLinks;
