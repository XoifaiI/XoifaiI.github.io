import { useCallback, useEffect, useRef } from 'react';

export function useDemoHandlers() {
  const cryptoJSRef = useRef(null);

  // Load CryptoJS dynamically
  useEffect(() => {
    const loadCryptoJS = async () => {
      if (typeof window !== 'undefined' && !window.CryptoJS) {
        try {
          // Dynamically import CryptoJS
          const script = document.createElement('script');
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js';
          script.async = true;
          script.onload = () => {
            cryptoJSRef.current = window.CryptoJS;
          };
          document.head.appendChild(script);
        } catch (error) {
          console.error('Failed to load CryptoJS:', error);
        }
      } else if (window.CryptoJS) {
        cryptoJSRef.current = window.CryptoJS;
      }
    };

    loadCryptoJS();
  }, []);

  const performHash = useCallback(() => {
    const input = document.getElementById('hash-input')?.value;
    const algorithm = document.getElementById('hash-algorithm')?.value;
    const output = document.getElementById('hash-output');

    if (!input || !output) return;

    if (!input.trim()) {
      output.innerHTML = '<span style="color: var(--warning)">Please enter some text to hash.</span>';
      return;
    }

    if (!cryptoJSRef.current) {
      output.innerHTML = '<span style="color: var(--warning)">Loading crypto library...</span>';
      return;
    }

    try {
      let hash;
      const CryptoJS = cryptoJSRef.current;
      
      switch (algorithm) {
        case 'sha256':
          hash = CryptoJS.SHA256(input).toString();
          break;
        case 'sha1':
          hash = CryptoJS.SHA1(input).toString();
          break;
        case 'md5':
          hash = CryptoJS.MD5(input).toString();
          break;
        case 'sha512':
          hash = CryptoJS.SHA512(input).toString();
          break;
        default:
          hash = CryptoJS.SHA256(input).toString();
      }

      output.innerHTML = `
        <strong style="color: var(--accent)">${algorithm.toUpperCase()}:</strong><br>
        <span style="color: var(--success); word-break: break-all; font-family: monospace; font-size: 0.85rem;">
          ${hash}
        </span>
      `;
    } catch (error) {
      console.error('Hash error:', error);
      output.innerHTML = `<span style="color: var(--danger)">Error: ${error.message}</span>`;
    }
  }, []);

  const encodeBase64 = useCallback(() => {
    const input = document.getElementById('base64-input')?.value;
    const output = document.getElementById('base64-output');

    if (!input || !output) return;

    if (!input.trim()) {
      output.innerHTML = '<span style="color: var(--warning)">Please enter text to encode.</span>';
      return;
    }

    try {
      // Handle UTF-8 encoding properly
      const encoded = btoa(unescape(encodeURIComponent(input)));
      output.innerHTML = `
        <strong style="color: var(--accent)">Base64 Encoded:</strong><br>
        <span style="color: var(--success); word-break: break-all; font-family: monospace; font-size: 0.85rem;">
          ${encoded}
        </span>
      `;
    } catch (error) {
      console.error('Base64 encode error:', error);
      output.innerHTML = `<span style="color: var(--danger)">Error: ${error.message}</span>`;
    }
  }, []);

  const decodeBase64 = useCallback(() => {
    const input = document.getElementById('base64-input')?.value;
    const output = document.getElementById('base64-output');

    if (!input || !output) return;

    if (!input.trim()) {
      output.innerHTML = '<span style="color: var(--warning)">Please enter base64 to decode.</span>';
      return;
    }

    try {
      // Validate base64 format
      const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
      const cleanInput = input.trim().replace(/\s/g, '');
      
      if (!base64Regex.test(cleanInput)) {
        throw new Error('Invalid Base64 format');
      }

      const decoded = decodeURIComponent(escape(atob(cleanInput)));
      output.innerHTML = `
        <strong style="color: var(--accent)">Decoded:</strong><br>
        <span style="color: var(--success); font-family: monospace; white-space: pre-wrap;">
          ${decoded}
        </span>
      `;
    } catch (error) {
      console.error('Base64 decode error:', error);
      output.innerHTML = '<span style="color: var(--danger)">Error: Invalid Base64 input</span>';
    }
  }, []);

  return {
    performHash,
    encodeBase64,
    decodeBase64,
  };
}
