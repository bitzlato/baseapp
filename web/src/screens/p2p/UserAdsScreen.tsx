import { FC, Suspense } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Adapter } from 'web/src/components/shared/Adapter';
import { lazyRetry } from 'web/src/helpers/lazyRetry';

const UserAds = lazyRetry<{}>(() =>
  import('web/src/components/shared/UserAds/UserAds').then((m) => ({ default: m.UserAds })),
);

export const UserAdsScreen: FC = () => {
  const history = useHistory();
  const params = useParams();

  return (
    <Suspense fallback>
      <Adapter Link={Link} history={history} params={params}>
        <UserAds />
      </Adapter>
    </Suspense>
  );
};
