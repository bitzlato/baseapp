import { FC, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Adapter } from 'web/src/components/shared/Adapter';
import { lazyRetry } from 'web/src/helpers/lazyRetry';

const Trader = lazyRetry(() =>
  import('web/src/components/shared/Trader/Trader').then((m) => ({ default: m.Trader })),
);

export const TraderScreen: FC = () => (
  <Suspense fallback>
    <Adapter Link={Link}>
      <Trader />
    </Adapter>
  </Suspense>
);
