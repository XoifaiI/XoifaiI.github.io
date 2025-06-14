import { memo } from 'react';
import styles from './Credits.module.css';

const Credits = memo(() => {
  const contributors = [
    { name: 'Xoifail', role: 'Creator' },
    { name: 'daily3014', role: 'Co-Creator' },
    { name: 'boatbomber', role: 'Contributor' },
    { name: 'Sythivo', role: 'Contributor' },
    { name: 'Green', role: 'Contributor' },
  ];

  return (
    <section className={styles.credits}>
      <h3 className={styles.creditsTitle}>
        Made by developers who XOR their problems away
      </h3>
      <div className={styles.creditsList}>
        {contributors.map((contributor, index) => (
          <div key={index} className={styles.creditItem}>
            <div className={styles.creditName}>{contributor.name}</div>
            <div className={styles.creditRole}>{contributor.role}</div>
          </div>
        ))}
      </div>
    </section>
  );
});

Credits.displayName = 'Credits';

export default Credits;
