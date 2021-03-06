import { FC, Suspense } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Adapter } from 'web/src/components/shared/Adapter';
import { lazyRetry } from 'web/src/helpers/lazyRetry';

const Board = lazyRetry(() =>
  import('web/src/components/shared/Ads/Board').then((m) => ({ default: m.Board })),
);

export const BoardScreen: FC = () => {
  const history = useHistory();
  const params = useParams();

  return (
    <Suspense fallback>
      <Adapter Link={Link} history={history} params={params}>
        <Board />
      </Adapter>
    </Suspense>
  );
};
