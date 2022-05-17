import { FC, Suspense } from 'react';
import { lazyRetry } from 'web/src/helpers/lazyRetry';

const Board = lazyRetry(() =>
  import('web/src/components/shared/Ads/Board').then((m) => ({ default: m.Board })),
);

export const BoardScreen: FC = () => (
  <Suspense fallback>
    <Board />
  </Suspense>
);
