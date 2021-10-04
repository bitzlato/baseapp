import { useEffect } from 'react';

export const useEscapeKeyDown = (callback: (e: KeyboardEvent) => void) => {
  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        callback(event);
      }
    };

    window.addEventListener('keydown', listener);

    return () => {
      window.removeEventListener('keydown', listener);
    };
  }, [callback]);
};
