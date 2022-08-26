import { FC, Suspense } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Adapter } from 'web/src/components/shared/Adapter';
import { lazyRetry } from 'web/src/helpers/lazyRetry';

const UserAd = lazyRetry<{}>(() =>
  import('web/src/components/shared/UserAd/UserAd').then((m) => ({ default: m.UserAd })),
);

export const UserAdScreen: FC = () => {
  const history = useHistory();
  const params = useParams();

  return (
    <Suspense fallback>
      <Adapter Link={Link} history={history} params={params}>
        <UserAd />
      </Adapter>
    </Suspense>
  );
};
