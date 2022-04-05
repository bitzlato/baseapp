import { ComponentType, lazy } from 'react';

type Factory = () => Promise<{ default: ComponentType }>;

function retry(factory: Factory, retries: number, interval: number): ReturnType<Factory> {
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

export function lazyRetry(
  factory: Factory,
  retries = 5,
  interval = 1000,
): React.LazyExoticComponent<React.ComponentType> {
  return lazy(() => retry(factory, retries, interval));
}
