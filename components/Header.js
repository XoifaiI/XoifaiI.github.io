// Temporarily replace your Header component with this minimal version
// This will help us isolate if there are any conflicts

import { memo } from 'react';

const Header = memo(({ navigationItems, activeSection }) => {
  console.log('🔍 Header rendering...');

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '70px',
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      zIndex: 1000,
      borderBottom: '1px solid #333',
      display: 'flex',
      alignItems: 'center',
      padding: '0 2rem',
      color: 'white'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        width: '100%',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <a 
          href="#overview" 
          onClick={(e) => handleNavClick(e, '#overview')}
          style={{
            color: 'white',
            textDecoration: 'none',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          🔐 Luau Cryptography
        </a>
        
        <nav style={{ display: 'flex', gap: '1rem' }}>
          {navigationItems?.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              style={{
                color: activeSection === item.href.slice(1) ? '#0070f3' : '#ccc',
                textDecoration: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                transition: 'color 0.2s'
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
});

Header.displayName = 'Header';
export default Header;
