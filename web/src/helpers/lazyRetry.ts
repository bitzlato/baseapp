import { ComponentType, lazy } from 'react';

type Factory<T extends ComponentType<any>> = () => Promise<{ default: T }>;

function retry<T extends ComponentType<any>>(
  factory: Factory<T>,
  retries: number,
  interval: number,
): ReturnType<Factory<T>> {
  return new Promise((resolve, reject) => {
    factory()
      .then(resolve)
      .catch((error) => {
        window.setTimeout(() => {
          if (retries === 1) {
            reject(error);
          } else {
            retry(factory, retries - 1, interval).then(resolve, reject);
          }
        }, interval);
      });
  });
}

export function lazyRetry<T extends ComponentType<any>>(
  factory: Factory<T>,
  retries = 5,
  interval = 1000,
): React.LazyExoticComponent<T> {
  return lazy(() => retry(factory, retries, interval));
}
