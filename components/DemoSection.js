import { memo } from 'react';
import styles from './DemoSection.module.css';

const DemoSection = memo(() => {
  return (
    <section id="demo" className={styles.codeSection}>
      <h2 className={styles.sectionTitle}>Interactive Demo</h2>
      <p className={styles.sectionDescription}>
        Try out the cryptographic functions right in your browser
      </p>
      
      {/* Hash Functions Demo */}
      <div className={styles.demoSection}>
        <h3 className={styles.demoTitle}>
          <i className="fas fa-fingerprint" aria-hidden="true"></i> Hash Functions Demo
        </h3>
        <div className={styles.demoControls}>
          <div className={styles.demoInputContainer}>
            <div className={styles.inputGroup}>
              <label htmlFor="hash-input">Input Text:</label>
              <textarea 
                id="hash-input" 
                placeholder="Enter text to hash..." 
                rows="4"
                defaultValue="Hello World!"
                className={styles.demoInput}
              />
            </div>
          </div>
          <div className={styles.demoButtonsContainer}>
            <button 
              className="btn btn-primary" 
              onClick={() => window.performHash && window.performHash()}
            >
              <i className="fas fa-calculator" aria-hidden="true"></i> Calculate Hash
            </button>
            <select 
              id="hash-algorithm"
              className={styles.demoSelect}
            >
              <option value="sha256">SHA256 (most popular)</option>
              <option value="sha1">SHA1 (legacy)</option>
              <option value="md5">MD5 (legacy)</option>
              <option value="sha512">SHA512 (most secure)</option>
            </select>
          </div>
        </div>
        <div className={styles.inputGroup}>
          <label>Hash Output:</label>
          <div className={styles.demoOutput} id="hash-output">
            Click "Calculate Hash" to see the result
          </div>
        </div>
      </div>
      
      {/* Base64 Encoder/Decoder Demo */}
      <div className={styles.demoSection}>
        <h3 className={styles.demoTitle}>
          <i className="fas fa-code" aria-hidden="true"></i> Base64 Encoder/Decoder
        </h3>
        <div className={styles.demoControls}>
          <div className={styles.demoInputContainer}>
            <div className={styles.inputGroup}>
              <label htmlFor="base64-input">Input:</label>
              <textarea 
                id="base64-input" 
                placeholder="Enter text to encode/decode..." 
                rows="4"
                defaultValue="Hello World!"
                className={styles.demoInput}
              />
            </div>
          </div>
          <div className={styles.demoButtonsContainer}>
            <button 
              className="btn btn-primary" 
              onClick={() => window.encodeBase64 && window.encodeBase64()}
            >
              <i className="fas fa-arrow-up" aria-hidden="true"></i> Encode to Base64
            </button>
            <button 
              className="btn btn-secondary" 
              onClick={() => window.decodeBase64 && window.decodeBase64()}
            >
              <i className="fas fa-arrow-down" aria-hidden="true"></i> Decode from Base64
            </button>
          </div>
        </div>
        <div className={styles.inputGroup}>
          <label>Output:</label>
          <div className={styles.demoOutput} id="base64-output">
            Click a button to see the result
          </div>
        </div>
      </div>
    </section>
  );
});

DemoSection.displayName = 'DemoSection';
export default DemoSection;
