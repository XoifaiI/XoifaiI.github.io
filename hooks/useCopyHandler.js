import { useCallback, useRef } from 'react';

export function useCopyHandler() {
  const copyStatesRef = useRef(new Map());
  const timeoutsRef = useRef(new Set());

  const copyCode = useCallback((button) => {
    if (!button) return;

    const codeBlock = button.closest('.code-example')?.querySelector('code');
    if (!codeBlock) return;

    const text = codeBlock.textContent;

    // Clear existing timeout for this button
    const existingTimeout = copyStatesRef.current.get(button);
    if (existingTimeout) {
      clearTimeout(existingTimeout);
      timeoutsRef.current.delete(existingTimeout);
    }

    const resetButton = () => {
      if (button.isConnected) { // Check if button still exists in DOM
        button.innerHTML = 'Copy';
        button.style.background = 'var(--accent)';
      }
      copyStatesRef.current.delete(button);
    };

    const showSuccess = () => {
      if (button.isConnected) {
        button.innerHTML = '<i class="fas fa-check"></i> Copied!';
        button.style.background = 'var(--success)';
      }
      const timeoutId = setTimeout(resetButton, 2000);
      timeoutsRef.current.add(timeoutId);
      copyStatesRef.current.set(button, timeoutId);
    };

    const showError = () => {
      if (button.isConnected) {
        button.innerHTML = '<i class="fas fa-times"></i> Failed';
        button.style.background = 'var(--danger)';
      }
      const timeoutId = setTimeout(resetButton, 2000);
      timeoutsRef.current.add(timeoutId);
      copyStatesRef.current.set(button, timeoutId);
    };

    // Try modern clipboard API first
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text)
        .then(showSuccess)
        .catch(showError);
    } else {
      // Fallback for older browsers
      try {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.cssText = 'position:fixed;left:-9999px;top:-9999px;opacity:0;';
        document.body.appendChild(textArea);
        textArea.select();
        textArea.setSelectionRange(0, 99999); // For mobile devices
        
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (successful) {
          showSuccess();
        } else {
          showError();
        }
      } catch (err) {
        console.warn('Copy fallback failed:', err);
        showError();
      }
    }
  }, []);

  // Cleanup function to be called on unmount
  const cleanup = useCallback(() => {
    // Clear all timeouts
    timeoutsRef.current.forEach(timeoutId => {
      clearTimeout(timeoutId);
    });
    timeoutsRef.current.clear();
    copyStatesRef.current.clear();
  }, []);

  // Effect cleanup is handled by the consuming component
  return { copyCode, cleanup };
}
