import { useCallback, useEffect, useRef, useState } from 'react';

export function useCountdown() {
  const intervalRef = useRef<number>();
  const [countdown, setCountdown] = useState(0);

  const isEnd = countdown === 0;

  useEffect(() => {
    return () => {
      window.clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    };
  }, []);

  useEffect(() => {
    if (isEnd) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  }, [isEnd]);

  const start = (sec: number) => {
    setCountdown(sec);
    window.clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => {
      setCountdown((d) => Math.max(d - 1, 0));
    }, 1000);
  };

  const reset = useCallback(() => {
    window.clearInterval(intervalRef.current);
    setCountdown(0);
    intervalRef.current = undefined;
  }, []);

  return { start, countdown, reset };
}
