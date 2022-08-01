import { FC } from 'react';
import { UserAdsAlert } from 'web/src/components/shared/UserAds/UserAdsAlert';
import { UserAdvertDetails } from 'web/src/modules/p2p/types';
import { useAdapterContext } from 'web/src/components/shared/Adapter';

// вычисляем варварским способом проценты на JS, да 🤪
// к примеру, на JS нормльно посчитается (0.41 * 100). результат будет 41
// а если попробовать посчитать (0.55 * 100), то будет не 55.00000000000001
export function antiJSCalculationPercent(value: number) {
  return (value + 100) * 100 - 100 * 100; //
}

interface Props {
  ad: UserAdvertDetails;
}

export const UserAdUnactiveAlert: FC<Props> = ({ ad }) => {
  const { t } = useAdapterContext();

  const unactiveReason = (() => {
    if (ad.unactiveReason === 'not_enough_funds' && ad.type === 'purchase' && ad.balanceThreshold) {
      return t('userAd.disabled.unactive_not_enough_funds_for_purchase', {
        minBalance: ad.balanceThreshold,
        cryptocurrency: ad.cryptocurrency,
      });
    }

    if (ad.unactiveReason === '20_percent_diff' && ad.disablePercent) {
      return t('userAd.disabled.unactive_20_percent_diff', {
        percentDiff: antiJSCalculationPercent(ad.disablePercent),
      });
    }

    return t(`userAd.disabled.unactive_${ad.unactiveReason}`);
  })();

  if (!unactiveReason) {
    return null;
  }

  return <UserAdsAlert theme="error">{unactiveReason}</UserAdsAlert>;
};
