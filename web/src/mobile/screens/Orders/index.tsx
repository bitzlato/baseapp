import * as React from 'react';
import { BackButtonMobile } from 'web/src/components/shared/Header/BackButtonMobile';
import { useT } from 'web/src/hooks/useT';
import { useRangerConnectFetch } from '../../../hooks';
import { Orders } from '../../components';

const OrdersMobileScreenComponent: React.FC = () => {
  const t = useT();
  useRangerConnectFetch();

  return (
    <>
      <BackButtonMobile to="/profile">{t('page.body.profile.header.account')}</BackButtonMobile>
      <div className="pg-mobile-orders-screen">
        <Orders />
      </div>
    </>
  );
};

export const OrdersMobileScreen = React.memo(OrdersMobileScreenComponent);
