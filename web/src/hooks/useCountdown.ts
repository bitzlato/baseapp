import { useEffect, useRef, useState } from 'react';

export function useCountdown() {
  const intervalRef = useRef<number>();
  const [countdown, setCountdown] = useState(0);

  const isEnd = countdown < 1;

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
      setCountdown((d) => d - 1);
    }, 1000);
  };

  return { start, countdown };
}
