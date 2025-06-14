import { memo } from 'react';
import styles from './ApiReference.module.css';

const ApiReference = memo(() => {
  const apiCategories = [
    {
      id: 'hashing',
      icon: 'fas fa-fingerprint',
      title: 'Hashing Functions',
      count: 20,
      functions: [
        {
          signature: 'SHA2.SHA256(Message: buffer, Salt?: buffer) → string',
          description: 'Computes SHA256 hash with optional salt. Most commonly used cryptographic hash function.'
        },
        {
          signature: 'SHA3.SHA3_256(Message: buffer) → string',
          description: 'Modern SHA3-256 hash function. Latest standard approved by NIST.'
        },
        {
          signature: 'Blake3.Digest(Message: buffer, Length?: number) → string',
          description: 'Fastest cryptographic hash function available. Optimized for performance.'
        },
        {
          signature: 'Blake3.DigestKeyed(Key: buffer, Message: buffer, Length?: number) → string',
          description: 'Keyed Blake3 hash for authenticated hashing scenarios.'
        },
        {
          signature: 'HMAC(Message: buffer, Key: buffer, HashFn: function, BlockSize: number) → string',
          description: 'Hash-based message authentication code. Works with any underlying hash function.'
        },
        {
          signature: 'XXH32(Message: buffer, Seed?: number) → number',
          description: 'Ultra-fast non-cryptographic hash function. Perfect for hash tables and checksums.'
        }
      ]
    },
    {
      id: 'encryption',
      icon: 'fas fa-lock',
      title: 'Encryption Functions',
      count: 3,
      functions: [
        {
          signature: 'ChaCha20(Data: buffer, Key: buffer, Nonce: buffer, Counter?: number, Rounds?: number) → buffer',
          description: 'ChaCha20 stream cipher encryption/decryption. Modern, fast, and secure.'
        },
        {
          signature: 'AES.New(Key: buffer, Mode: AESMode, Padding: AESPadding) → AESProfile',
          description: 'Create AES encryption profile with specified mode and padding scheme.'
        },
        {
          signature: 'AEAD.Encrypt(Message: buffer, Key: buffer, Nonce: buffer, AAD?: buffer, Rounds?: number) → (buffer, buffer)',
          description: 'ChaCha20-Poly1305 authenticated encryption. Returns ciphertext and authentication tag.'
        },
        {
          signature: 'AEAD.Decrypt(Ciphertext: buffer, Key: buffer, Nonce: buffer, Tag: buffer, AAD?: buffer, Rounds?: number) → buffer?',
          description: 'ChaCha20-Poly1305 authenticated decryption. Returns plaintext or nil if authentication fails.'
        }
      ]
    },
    {
      id: 'signatures',
      icon: 'fas fa-certificate',
      title: 'Digital Signatures',
      count: 3,
      functions: [
        {
          signature: 'EdDSA.PublicKey(SecretKey: buffer) → buffer',
          description: 'Generate public key from secret key using Ed25519 algorithm.'
        },
        {
          signature: 'EdDSA.Sign(SecretKey: buffer, PublicKey: buffer, Message: buffer) → buffer',
          description: 'Create digital signature for a message using Ed25519.'
        },
        {
          signature: 'EdDSA.Verify(PublicKey: buffer, Message: buffer, Signature: buffer) → boolean',
          description: 'Verify digital signature authenticity. Returns true if signature is valid.'
        }
      ]
    },
    {
      id: 'utilities',
      icon: 'fas fa-tools',
      title: 'Utility Functions',
      count: '10+',
      functions: [
        {
          signature: 'Base64.Encode(Input: buffer) → string',
          description: 'Encode binary data to Base64 string representation.'
        },
        {
          signature: 'Base64.Decode(Input: buffer) → string',
          description: 'Decode Base64 string to binary data.'
        },
        {
          signature: 'RandomString(Length: number) → string',
          description: 'Generate cryptographically secure random string of specified length.'
        },
        {
          signature: 'Conversions.ToHex(Buffer: buffer) → string',
          description: 'Convert buffer to hexadecimal string representation.'
        },
        {
          signature: 'Conversions.FromHex(Hex: string) → buffer',
          description: 'Convert hexadecimal string to buffer.'
        }
      ]
    },
    {
      id: 'checksums',
      icon: 'fas fa-check-circle',
      title: 'Checksum Functions',
      count: 2,
      functions: [
        {
          signature: 'CRC32(Message: buffer, Mode?: "Jam" | "Iso", Hex?: boolean)',
          description: 'Calculate CRC32 checksum with optional mode and output format.'
        },
        {
          signature: 'Adler(Message: buffer)',
          description: 'Calculate Adler checksum. Faster than CRC32 but less reliable.'
        }
      ]
    }
  ];

  return (
    <section id="api-reference" className={styles.apiCategories}>
      <h2 className={styles.sectionTitle}>API Reference</h2>
      <p className={styles.sectionDescription}>
        Complete documentation for all 28+ functions organized by category
      </p>

      {apiCategories.map((category) => (
        <div key={category.id} className={styles.apiCategory} id={category.id}>
          <div className={styles.apiCategoryHeader}>
            <h3 className={styles.categoryTitle}>
              <i className={category.icon} aria-hidden="true"></i>
              {category.title}
              <span className={styles.functionCount}>{category.count}</span>
            </h3>
          </div>
          <div className={styles.apiCategoryContent}>
            {category.functions.map((func, index) => (
              <div key={index} className={styles.apiFunction}>
                <h4 className={styles.functionSignature}>{func.signature}</h4>
                <p className={styles.functionDescription}>{func.description}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
});

ApiReference.displayName = 'ApiReference';

export default ApiReference;
