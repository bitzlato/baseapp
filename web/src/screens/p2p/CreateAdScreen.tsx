import { FC, Suspense } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Adapter } from 'web/src/components/shared/Adapter';
import { lazyRetry } from 'web/src/helpers/lazyRetry';

const CreateAd = lazyRetry<{}>(() =>
  import('web/src/components/shared/CreateAd/CreateAd').then((m) => ({ default: m.CreateAd })),
);

export const CreateAdScreen: FC = () => {
  const history = useHistory();
  const params = useParams();

  return (
    <Suspense fallback>
      <Adapter Link={Link} history={history} params={params}>
        <CreateAd />
      </Adapter>
    </Suspense>
  );
};
