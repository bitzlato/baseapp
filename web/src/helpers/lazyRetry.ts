import { ComponentType, lazy } from 'react';

type Factory<P = {}> = () => Promise<{ default: ComponentType<P> }>;

function retry<P = {}>(
  factory: Factory<P>,
  retries: number,
  interval: number,
): ReturnType<Factory<P>> {
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

export function lazyRetry<P = {}>(
  factory: Factory<P>,
  retries = 5,
  interval = 1000,
): React.LazyExoticComponent<React.ComponentType<P>> {
  return lazy(() => retry(factory, retries, interval));
}
