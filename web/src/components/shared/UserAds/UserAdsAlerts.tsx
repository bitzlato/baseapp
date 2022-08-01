import { FC, ReactNode } from 'react';
import { AdvertType } from 'web/src/modules/p2p/types';
import { useFetchP2PTradesAlerts } from 'web/src/hooks/data/useFetchP2PTradesAlerts';
import { useAdapterContext } from 'web/src/components/shared/Adapter';
import { Box } from 'web/src/components/ui/Box';
import { UserAdsAlert } from './UserAdsAlert';

interface Props {
  cryptocurrency: string;
  type: AdvertType;
}

export const UserAdsAlerts: FC<Props> = ({ cryptocurrency, type }) => {
  const { t, Link } = useAdapterContext();
  const { data: alertList } = useFetchP2PTradesAlerts(cryptocurrency);
  const isPurchase = type === 'purchase';
  const alertListFiltered = alertList?.filter((alert) =>
    alert.code === 'not_enough_funds' ? isPurchase : true,
  );

  return alertListFiltered && alertListFiltered.length > 0 ? (
    <Box mt="5x">
      {alertListFiltered.map((alert) => {
        let body: ReactNode | null = (
          <UserAdsAlert key={alert.code} theme="warning">
            {t(`alerts.${alert.code}`)}
          </UserAdsAlert>
        );

        if (alert.code === 'not_verified') {
          body = (
            <UserAdsAlert theme="info">
              {t('alerts.not_verified')} {t('alerts.not_verified.please')}{' '}
              <Box
                as={Link}
                to="/profile"
                fontWeight="strong"
                color={{ default: 'advertsAlertInfoLink', hover: 'advertsAlertInfoLinkHover' }}
              >
                {t('alerts.not_verified.verification')}
              </Box>
            </UserAdsAlert>
          );
        }

        if (alert.code === 'not_enough_funds' && alert.data && 'minBalance' in alert.data) {
          body = isPurchase ? (
            <UserAdsAlert theme="warning">
              <Box
                as="span"
                display={{ mobile: 'block', tablet: 'inline-block' }}
                mb={{ mobile: '2x', tablet: '0' }}
                fontSize="caption"
                fontWeight="medium"
              >
                {t('alerts.not_enough_funds', { currency: alert.data.minBalance.currency })}
              </Box>{' '}
              {t('alerts.not_enough_funds.notice', {
                amount: alert.data.minBalance.amount,
                currency: alert.data.minBalance.cryptocurrency,
              })}
            </UserAdsAlert>
          ) : null;
        }

        return body ? (
          <Box key={alert.code} my="2x">
            {body}
          </Box>
        ) : null;
      })}
    </Box>
  ) : null;
};
