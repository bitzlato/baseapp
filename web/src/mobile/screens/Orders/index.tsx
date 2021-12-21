import * as React from 'react';
import { useHistory } from 'react-router';
import { useT } from 'src/hooks/useT';
import { useRangerConnectFetch } from '../../../hooks';
import { Orders, Subheader } from '../../components';

const OrdersMobileScreenComponent: React.FC = () => {
  useRangerConnectFetch();
  const history = useHistory();
  const t = useT();

  return (
    <>
      <Subheader
        title={t('page.mobile.profileLinks.history.orders')}
        backTitle={t('page.body.profile.header.account')}
        onGoBack={() => history.push('/profile')}
      />
      <div className="pg-mobile-orders-screen">
        <Orders />
      </div>
    </>
  );
};

export const OrdersMobileScreen = React.memo(OrdersMobileScreenComponent);
