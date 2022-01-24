import { RefObject, useEffect } from 'react';

export const useOnClickOutside = (
  refs: RefObject<HTMLElement>[],
  callback: (event: MouseEvent | TouchEvent) => void,
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (refs.some((ref) => ref.current && ref.current.contains(event.target as HTMLElement))) {
        return;
      }

      callback(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [...refs, callback]);
};
