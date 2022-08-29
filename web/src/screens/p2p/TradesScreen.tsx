import { FC, Suspense } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Adapter } from 'web/src/components/shared/Adapter';
import { lazyRetry } from 'web/src/helpers/lazyRetry';

const Trades = lazyRetry(() =>
  import('web/src/components/shared/Trades/Trades').then((m) => ({ default: m.Trades })),
);

export const TradesScreen: FC = () => {
  const history = useHistory();
  const params = useParams();

  return (
    <Suspense fallback>
      <Adapter Link={Link} history={history} params={params}>
        <Trades />
      </Adapter>
    </Suspense>
  );
};
