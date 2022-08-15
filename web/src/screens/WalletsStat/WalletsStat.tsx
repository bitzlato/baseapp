import { FC, Suspense } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Adapter } from 'web/src/components/shared/Adapter';
import { lazyRetry } from 'web/src/helpers/lazyRetry';

const WalletsStat = lazyRetry(() =>
  import('web/src/components/shared/WalletsStat/WalletsStat').then((m) => ({
    default: m.WalletsStat,
  })),
);

export const WalletsStatScreen: FC = () => {
  const history = useHistory();
  const params = useParams();

  return (
    <Suspense fallback>
      <Adapter Link={Link} history={history} params={params}>
        <WalletsStat />
      </Adapter>
    </Suspense>
  );
};
