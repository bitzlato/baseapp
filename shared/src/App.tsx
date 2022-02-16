import { FC, lazy, Suspense } from 'react';

const Main = lazy(() => import('./Main'));

export const App: FC = () => (
  <Suspense fallback="loading">
    <Main />
  </Suspense>
);
