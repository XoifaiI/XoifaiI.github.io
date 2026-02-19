import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import CodeBlock from '@theme/CodeBlock';
import { Lock, Zap, Shield, Atom } from 'lucide-react';

const heroCode = `local Crypto = require("@daily3014/cryptography")

-- Hash
local Hash = Crypto.Hashing.Blake3.Digest(Data)

-- Encrypt
local Ciphertext, Tag = Crypto.Encryption.AEAD.Encrypt(Data, Key, Nonce)

-- Sign
local Signature = Crypto.Verification.EdDSA.Sign(Message, SecretKey, PublicKey)`;

function HeroSection() {
  return (
    <div className="hero-container">
      <div className="hero-content">
        <h1 className="hero-title">
          <span className="hero-gradient">rbx-cryptography</span>
        </h1>
        <p className="hero-subtitle">
          The fastest cryptography library for Roblox
        </p>
        <div className="hero-buttons">
          <Link className="hero-button primary" to="/docs/intro">
            Get Started
          </Link>
          <Link className="hero-button secondary" href="https://github.com/daily3014/rbx-cryptography">
            GitHub
          </Link>
        </div>
      </div>
      <div className="hero-code">
        <CodeBlock language="lua">{heroCode}</CodeBlock>
      </div>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="feature-card">
      <div className="feature-icon">
        <Icon size={32} strokeWidth={1.5} />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function FeaturesSection() {
  return (
    <div className="features-section">
      <FeatureCard
        icon={Lock}
        title="Comprehensive"
        description="SHA2, SHA3, BLAKE, HMAC, ChaCha20 Poly1305, AES GCM, Ed25519, X25519, ML DSA, ML KEM"
      />
      <FeatureCard
        icon={Zap}
        title="Blazing Fast"
        description="Optimized for Luau with native compilation. Includes algorithmic optimizations like shoup tables."
      />
      <FeatureCard
        icon={Shield}
        title="Secure"
        description="Constanttime operations. Builtin CSPRNG. Post quantum algorithms. Wycheproof tested."
      />
      <FeatureCard
        icon={Atom}
        title="Post Quantum Ready"
        description="ML DSA and ML KEM implementations for quantum resistant signatures and key exchange."
      />
    </div>
  );
}

function AlgorithmsSection() {
  return (
    <div className="algorithms-section">
      <h2>Everything You Need</h2>
      <div className="algorithm-grid">
        <div className="algorithm-category">
          <h4>Hashing</h4>
          <ul>
            <li>SHA 224/256/384/512</li>
            <li>SHA3 224/256/384/512</li>
            <li>BLAKE2b, BLAKE3</li>
            <li>HMAC, HKDF, KMAC</li>
          </ul>
        </div>
        <div className="algorithm-category">
          <h4>Encryption</h4>
          <ul>
            <li>ChaCha20 Poly1305</li>
            <li>XChaCha20 Poly1305</li>
            <li>AES 128/192/256 GCM</li>
            <li>Simon, Speck</li>
          </ul>
        </div>
        <div className="algorithm-category">
          <h4>Signatures</h4>
          <ul>
            <li>Ed25519</li>
            <li>ML DSA 44/65/87</li>
          </ul>
        </div>
        <div className="algorithm-category">
          <h4>Key Exchange</h4>
          <ul>
            <li>X25519</li>
            <li>ML KEM 512/768/1024</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function InstallSection() {
  return (
    <div className="install-section">
      <h2>Quick Install</h2>
      <div className="install-options">
        <div className="install-option">
          <h4>Wally</h4>
          <CodeBlock language="toml">
            {`Cryptography = "daily3014/cryptography@3.0.1"`}
          </CodeBlock>
        </div>
        <div className="install-option">
          <h4>Pesde</h4>
          <CodeBlock language="bash">
            {`pesde add daily3014/cryptography`}
          </CodeBlock>
        </div>
      </div>
    </div>
  );
}

function DevelopersSection() {
  return (
    <div className="developers-section">
      <h2>Developers</h2>
      <div className="developers-grid">
        <a href="https://github.com/daily3014" className="developer-card">
          <img src="https://github.com/daily3014.png" alt="daily3014" />
          <span>daily3014</span>
        </a>
        <a href="https://github.com/XoifaiI" className="developer-card">
          <img src="https://github.com/XoifaiI.png" alt="Xoifail" />
          <span>Xoifail</span>
        </a>
      </div>
    </div>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title="Home" description={siteConfig.tagline}>
      <main className="homepage">
        <HeroSection />
        <FeaturesSection />
        <AlgorithmsSection />
        <InstallSection />
        <DevelopersSection />
      </main>
    </Layout>
  );
}