import { FC, Suspense } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Adapter } from 'web/src/components/shared/Adapter';
import { lazyRetry } from 'web/src/helpers/lazyRetry';

const Ad = lazyRetry(() =>
  import('web/src/components/shared/Ads/Ad').then((m) => ({ default: m.Ad })),
);

export const AdScreen: FC = () => {
  const history = useHistory();

  return (
    <Suspense fallback>
      <Adapter Link={Link} history={history}>
        <Ad />
      </Adapter>
    </Suspense>
  );
};
