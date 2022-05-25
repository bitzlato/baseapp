import { FC } from 'react';
import { useParams } from 'react-router';
import { Adapter } from 'web/src/components/shared/Adapter';
import { SharedTrade } from 'web/src/components/shared/Trade/Trade';
import { Link, useHistory } from 'react-router-dom';

export const TradeScreen: FC = () => {
  const history = useHistory();
  const params = useParams<{ tradeId?: string }>();

  return (
    <Adapter Link={Link} history={history} params={params}>
      <SharedTrade />
    </Adapter>
  );
};
