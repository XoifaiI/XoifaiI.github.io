import { useCallback, useEffect, useRef } from 'react';

export function useDemoHandlers() {
  const cryptoJSRef = useRef(null);

  // Load CryptoJS dynamically
  useEffect(() => {
    const loadCryptoJS = async () => {
      if (typeof window !== 'undefined' && !window.CryptoJS) {
        try {
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

  // ULTRA AGGRESSIVE positioning function
  const forceTopAlignment = (element) => {
    if (!element) return;
    
    // Clear any existing styles that might cause centering
    element.style.cssText = '';
    
    // Force aggressive top-left positioning
    element.style.display = 'block';
    element.style.textAlign = 'left';
    element.style.verticalAlign = 'top';
    element.style.alignItems = 'flex-start';
    element.style.justifyContent = 'flex-start';
    element.style.alignContent = 'flex-start';
    element.style.position = 'relative';
    element.style.top = '0';
    element.style.left = '0';
    element.style.margin = '0';
    element.style.padding = '1rem';
    element.style.minHeight = 'auto';
    element.style.height = 'auto';
    
    // Force all child elements to top-left too
    const children = element.querySelectorAll('*');
    children.forEach(child => {
      child.style.textAlign = 'left';
      child.style.verticalAlign = 'top';
      child.style.display = child.tagName.toLowerCase() === 'br' ? 'block' : 'inline';
    });
  };

  const performHash = useCallback(() => {
    const input = document.getElementById('hash-input')?.value;
    const algorithm = document.getElementById('hash-algorithm')?.value;
    const output = document.getElementById('hash-output');

    if (!input || !output) return;

    if (!input.trim()) {
      output.innerHTML = '<span style="color: var(--warning); display: inline;">Please enter some text to hash.</span>';
      forceTopAlignment(output);
      return;
    }

    if (!cryptoJSRef.current) {
      output.innerHTML = '<span style="color: var(--warning); display: inline;">Loading crypto library...</span>';
      forceTopAlignment(output);
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

      // NUCLEAR OPTION: Create elements directly instead of innerHTML
      output.innerHTML = '';
      
      const container = document.createElement('div');
      container.style.cssText = 'display: block !important; text-align: left !important; margin: 0 !important; padding: 0 !important; position: static !important;';
      
      const label = document.createElement('strong');
      label.style.cssText = 'color: var(--accent); display: inline;';
      label.textContent = `${algorithm.toUpperCase()}:`;
      
      const lineBreak = document.createElement('br');
      
      const hashSpan = document.createElement('span');
      hashSpan.style.cssText = 'color: var(--success); word-break: break-all; font-family: monospace; font-size: 0.85rem; display: inline;';
      hashSpan.textContent = hash;
      
      container.appendChild(label);
      container.appendChild(lineBreak);
      container.appendChild(hashSpan);
      
      output.appendChild(container);
      forceTopAlignment(output);
      
    } catch (error) {
      console.error('Hash error:', error);
      output.innerHTML = `<span style="color: var(--danger); display: inline;">Error: ${error.message}</span>`;
      forceTopAlignment(output);
    }
  }, []);

  const encodeBase64 = useCallback(() => {
    const input = document.getElementById('base64-input')?.value;
    const output = document.getElementById('base64-output');

    if (!input || !output) return;

    if (!input.trim()) {
      output.innerHTML = '<span style="color: var(--warning); display: inline;">Please enter text to encode.</span>';
      forceTopAlignment(output);
      return;
    }

    try {
      const encoded = btoa(unescape(encodeURIComponent(input)));
      
      // NUCLEAR OPTION: Create elements directly
      output.innerHTML = '';
      
      const container = document.createElement('div');
      container.style.cssText = 'display: block !important; text-align: left !important; margin: 0 !important; padding: 0 !important; position: static !important;';
      
      const label = document.createElement('strong');
      label.style.cssText = 'color: var(--accent); display: inline;';
      label.textContent = 'Base64 Encoded:';
      
      const lineBreak = document.createElement('br');
      
      const encodedSpan = document.createElement('span');
      encodedSpan.style.cssText = 'color: var(--success); word-break: break-all; font-family: monospace; font-size: 0.85rem; display: inline;';
      encodedSpan.textContent = encoded;
      
      container.appendChild(label);
      container.appendChild(lineBreak);
      container.appendChild(encodedSpan);
      
      output.appendChild(container);
      forceTopAlignment(output);
      
    } catch (error) {
      console.error('Base64 encode error:', error);
      output.innerHTML = `<span style="color: var(--danger); display: inline;">Error: ${error.message}</span>`;
      forceTopAlignment(output);
    }
  }, []);

  const decodeBase64 = useCallback(() => {
    const input = document.getElementById('base64-input')?.value;
    const output = document.getElementById('base64-output');

    if (!input || !output) return;

    if (!input.trim()) {
      output.innerHTML = '<span style="color: var(--warning); display: inline;">Please enter base64 to decode.</span>';
      forceTopAlignment(output);
      return;
    }

    try {
      const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
      const cleanInput = input.trim().replace(/\s/g, '');
      
      if (!base64Regex.test(cleanInput)) {
        throw new Error('Invalid Base64 format');
      }

      const decoded = decodeURIComponent(escape(atob(cleanInput)));
      
      // NUCLEAR OPTION: Create elements directly
      output.innerHTML = '';
      
      const container = document.createElement('div');
      container.style.cssText = 'display: block !important; text-align: left !important; margin: 0 !important; padding: 0 !important; position: static !important;';
      
      const label = document.createElement('strong');
      label.style.cssText = 'color: var(--accent); display: inline;';
      label.textContent = 'Decoded:';
      
      const lineBreak = document.createElement('br');
      
      const decodedSpan = document.createElement('span');
      decodedSpan.style.cssText = 'color: var(--success); font-family: monospace; white-space: pre-wrap; display: inline;';
      decodedSpan.textContent = decoded;
      
      container.appendChild(label);
      container.appendChild(lineBreak);
      container.appendChild(decodedSpan);
      
      output.appendChild(container);
      forceTopAlignment(output);
      
    } catch (error) {
      console.error('Base64 decode error:', error);
      output.innerHTML = '<span style="color: var(--danger); display: inline;">Error: Invalid Base64 input</span>';
      forceTopAlignment(output);
    }
  }, []);

  return {
    performHash,
    encodeBase64,
    decodeBase64,
  };
}
