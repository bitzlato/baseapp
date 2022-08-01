import { FC } from 'react';
import LikeIcon from 'web/src/assets/svg/ThumbUp.svg';
import UnLikeIcon from 'web/src/assets/svg/ThumbDown.svg';
import { useAppContext } from 'web/src/components/app/AppContext';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { DealStat, UserInfo } from 'web/src/modules/p2p/user.types';
import { useAdapterContext } from 'web/src/components/shared/Adapter';
import { AdStat } from './AdStat';

type Props = {
  trader: UserInfo;
};

export const AdTraderInfo: FC<Props> = ({ trader }) => {
  const { isMobileDevice } = useAppContext();
  const { t } = useAdapterContext();
  const labelColor = isMobileDevice ? 'text' : undefined;

  const deals =
    trader.dealStats.find((v) => v.cryptocurrency === 'common') ??
    ({ successDeals: 0, canceledDeals: 0 } as DealStat);

  return (
    <>
      <AdStat labelColor={labelColor} label={t('Rating')}>
        <Text>{trader.rating}</Text>
      </AdStat>
      <AdStat labelColor={labelColor} label={t('Comments')}>
        <Box display="flex" alignItems="center" gap="5x">
          <Box display="flex" alignItems="center" gap="1x">
            <Box as={LikeIcon} color="statIcon" />
            <span>{trader.feedbacks.find((v) => v.type === 'thumb_up')?.count ?? 0}</span>
          </Box>
          <Box display="flex" alignItems="center" gap="1x">
            <Box as={UnLikeIcon} color="statIcon" />
            <span>{trader.feedbacks.find((v) => v.type === 'hankey')?.count ?? 0}</span>
          </Box>
        </Box>
      </AdStat>
      <AdStat labelColor={labelColor} label={t('Successful deals')}>
        {deals.successDeals}
      </AdStat>
      <AdStat labelColor={labelColor} label={t('Canceled deals')}>
        {deals.canceledDeals}
      </AdStat>
    </>
  );
};
