// Create a simple test page: pages/test.js
// This will help us isolate the fixed positioning issue

import { useState } from 'react';

export default function TestLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff' }}>
      {/* FIXED HEADER - Inline styles to test */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '70px',
        background: 'rgba(0,0,0,0.9)',
        zIndex: 1000,
        borderBottom: '1px solid #333',
        display: 'flex',
        alignItems: 'center',
        padding: '0 2rem'
      }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
          🔐 Luau Crypto
        </div>
        
        <nav style={{ marginLeft: 'auto', display: 'flex', gap: '1rem' }}>
          <a href="#section1" style={{ color: '#fff', textDecoration: 'none', padding: '0.5rem 1rem' }}>
            Section 1
          </a>
          <a href="#section2" style={{ color: '#fff', textDecoration: 'none', padding: '0.5rem 1rem' }}>
            Section 2
          </a>
        </nav>
        
        <button 
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            marginLeft: '1rem',
            background: '#333',
            border: '1px solid #555',
            color: '#fff',
            padding: '0.5rem',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          ☰
        </button>
      </header>

      {/* FIXED SIDEBAR - Inline styles to test */}
      <aside style={{
        position: 'fixed',
        top: '70px',
        left: mobileOpen ? '0' : (window.innerWidth <= 768 ? '-300px' : '0'),
        width: '300px',
        height: 'calc(100vh - 70px)',
        background: 'rgba(0,0,0,0.8)',
        zIndex: 999,
        borderRight: '1px solid #333',
        padding: '2rem',
        overflowY: 'auto',
        transition: 'left 0.3s ease'
      }}>
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ 
            fontSize: '0.8rem', 
            textTransform: 'uppercase', 
            letterSpacing: '1px',
            marginBottom: '1rem',
            color: '#888'
          }}>
            Getting Started
          </h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '0.5rem' }}>
              <a href="#section1" style={{ 
                color: '#ccc', 
                textDecoration: 'none',
                display: 'block',
                padding: '0.5rem',
                borderRadius: '4px'
              }}>
                Overview
              </a>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <a href="#section2" style={{ 
                color: '#ccc', 
                textDecoration: 'none',
                display: 'block',
                padding: '0.5rem',
                borderRadius: '4px'
              }}>
                Installation
              </a>
            </li>
          </ul>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div 
          onClick={() => setMobileOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.5)',
            zIndex: 998
          }}
        />
      )}

      {/* MAIN CONTENT - With proper spacing */}
      <main style={{
        marginTop: '70px',
        marginLeft: window.innerWidth > 768 ? '300px' : '0',
        padding: '2rem',
        minHeight: 'calc(100vh - 70px)'
      }}>
        <section id="section1" style={{ marginBottom: '3rem', minHeight: '800px' }}>
          <h1>Section 1</h1>
          <p>This is the first section. Scroll down to test the fixed layout.</p>
          {Array.from({ length: 20 }, (_, i) => (
            <p key={i}>
              Paragraph {i + 1}: If the header and sidebar stay fixed while you scroll, 
              then the basic positioning is working. The issue might be in your CSS modules.
            </p>
          ))}
        </section>

        <section id="section2" style={{ marginBottom: '3rem', minHeight: '800px' }}>
          <h1>Section 2</h1>
          <p>This is the second section with more content to scroll.</p>
          {Array.from({ length: 20 }, (_, i) => (
            <p key={i}>
              More content here. If this test works but your main site doesn't, 
              the issue is with CSS modules or class application.
            </p>
          ))}
        </section>
      </main>
    </div>
  );
}
