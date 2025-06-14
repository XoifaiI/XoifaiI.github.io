// Create a new test page: pages/fixedtest.js
// This will test if ANY fixed positioning works on your site

export default function FixedTest() {
  return (
    <div>
      {/* Simple fixed element test */}
      <div style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        width: '200px',
        height: '100px',
        backgroundColor: 'red',
        color: 'white',
        zIndex: 9999,
        padding: '20px',
        fontSize: '16px',
        fontWeight: 'bold'
      }}>
        🚨 FIXED TEST BOX
        <br />
        If you see this staying in place while scrolling, fixed positioning works.
      </div>

      {/* Content to scroll */}
      <div style={{ padding: '20px' }}>
        <h1>Scroll Test Page</h1>
        {Array.from({ length: 50 }, (_, i) => (
          <p key={i} style={{ margin: '20px 0', fontSize: '18px' }}>
            Paragraph {i + 1}: This is test content to create scroll. 
            The red box should stay fixed in the top-right corner while you scroll this content.
          </p>
        ))}
      </div>
    </div>
  );
}
