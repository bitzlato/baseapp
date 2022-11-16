import { Dispatch, useCallback, useEffect, useState } from 'react';

export const useLocalStorage = <T extends string = string>(
  key: string,
  initialValue: string = '',
): [string, Dispatch<T>] => {
  const [value, setValue] = useState(() => window.localStorage.getItem(key) || initialValue);

  const setItem = useCallback(
    (newValue: T) => {
      setValue(newValue);
      window.localStorage.setItem(key, newValue);
    },
    [key],
  );

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === key && event.newValue !== value) {
        setValue(event.newValue || initialValue);
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [initialValue, key, value]);

  return [value, setItem];
};
