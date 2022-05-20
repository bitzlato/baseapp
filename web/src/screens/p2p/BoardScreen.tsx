import { FC, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Adapter } from 'web/src/components/shared/Adapter';
import { lazyRetry } from 'web/src/helpers/lazyRetry';

const Board = lazyRetry(() =>
  import('web/src/components/shared/Ads/Board').then((m) => ({ default: m.Board })),
);

export const BoardScreen: FC = () => (
  <Suspense fallback>
    <Adapter Link={Link}>
      <Board />
    </Adapter>
  </Suspense>
);
