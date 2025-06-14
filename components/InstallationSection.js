import { memo } from 'react';
import styles from './InstallationSection.module.css';

const InstallationSection = memo(() => {
  const codeExamples = [
    {
      title: 'Installation & Basic Usage',
      code: `-- Require the library
local Cryptography = require(game:GetService("ReplicatedStorage").Cryptography)

-- Module shortcuts for cleaner code
local Hashing = Cryptography.Hashing
local Encryption = Cryptography.Encryption
local Utilities = Cryptography.Utilities
local Verification = Cryptography.Verification
local Checksums = Cryptography.Checksums

-- Hash something quickly
local MessageBuffer = buffer.fromstring("Hello World!")
local Hash = Hashing.SHA2.SHA256(MessageBuffer)
print("SHA256:", Hash) -- Output is already in hex format

-- Encrypt with AEAD (ChaCha20-Poly1305)
local Cryptography = require(game:GetService("ReplicatedStorage").Cryptography)
local Encryption = Cryptography.Encryption
local PlainText = buffer.fromstring("Hello World")
local Key = buffer.fromstring(string.rep("k", 32))
local Nonce = buffer.fromstring(string.rep("n", 12))
local AAD = buffer.fromstring("additional data")
local Ciphertext, Tag = Encryption.AEAD.Encrypt(PlainText, Key, Nonce, AAD)
local DecryptedText = Encryption.AEAD.Decrypt(Ciphertext, Key, Nonce, Tag, AAD)`
    },
    {
      title: 'Quick Start - Password Hashing',
      id: 'quick-start',
      code: `-- Quick Start: Secure password hashing
local Cryptography = require(game:GetService("ReplicatedStorage").Cryptography)
local SHA256 = Cryptography.Hashing.SHA2.SHA256

-- Hash a password with salt
local function HashPassword(Password, Salt)
    local PasswordBuffer = buffer.fromstring(Password)
    local SaltBuffer = buffer.fromstring(Salt or "defaultsalt")
    local Hash = SHA256(PasswordBuffer, SaltBuffer)
    return Hash -- Output is already in hex format
end

-- Example usage
local UserPassword = "MySecurePassword123"
local HashedPassword = HashPassword(UserPassword, "randomsalt")
print("Hashed password:", HashedPassword)

-- Verify password by comparing hashes
local function VerifyPassword(InputPassword, StoredHash, Salt)
    local InputHash = HashPassword(InputPassword, Salt)
    return InputHash == StoredHash
end

local IsValid = VerifyPassword("MySecurePassword123", HashedPassword, "randomsalt")
print("Password is valid:", IsValid)`
    },
    {
      title: 'Advanced AES Encryption',
      code: `-- Advanced AES encryption with CBC mode and PKCS7 padding
local AES = Cryptography.Encryption.AES

-- Create AES profile with specific mode and padding
local AESProfile = AES.New(
    buffer.fromstring("A24ByteEncryptionKeyHere"),
    AES.Modes.CBC,
    AES.Pads.Pkcs7
)

local Message = buffer.fromstring("Confidential information here")
local InitVector = buffer.fromstring("0123456789ABCDEF")

-- Encrypt and decrypt
local Encrypted = AESProfile:Encrypt(Message, nil, InitVector)
local Decrypted = AESProfile:Decrypt(Encrypted, nil, InitVector)

print("Message secured and verified!")`
    },
    {
      title: 'Digital Signatures with EdDSA',
      code: `-- Digital signature generation and verification
local EdDSA = Cryptography.Verification.EdDSA

-- Generate keypair
local PrivateKey = Cryptography.Utilities.RandomString(32)
local PublicKey = EdDSA.PublicKey(PrivateKey)

-- Sign a message
local Message = buffer.fromstring("Important message")
local Signature = EdDSA.Sign(PrivateKey, PublicKey, Message)

-- Verify signature
local IsValid = EdDSA.Verify(PublicKey, Message, Signature)
print("Signature valid:", IsValid)`
    }
  ];

  return (
    <section id="installation" className={styles.codeSection}>
      <h2 className={styles.sectionTitle}>Installation & Basic Usage</h2>
      
      {codeExamples.map((example, index) => (
        <div key={index} className={styles.codeExample} id={example.id}>
          <div className={styles.codeHeader}>
            <span className={styles.codeTitle}>{example.title}</span>
            <button 
              className="copy-btn" 
              onClick={() => window.copyCode && window.copyCode(event.target)}
            >
              Copy
            </button>
          </div>
          <pre className={styles.codeContent}>
            <code className="language-lua">{example.code}</code>
          </pre>
        </div>
      ))}
    </section>
  );
});

InstallationSection.displayName = 'InstallationSection';

export default InstallationSection;
