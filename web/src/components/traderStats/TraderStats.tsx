import { FC, useMemo } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { useT } from 'web/src/hooks/useT';
import { Text } from 'web/src/components/ui/Text';
import { useUserInfo } from 'web/src/hooks/useUserInfo';
import { Stat, StatLabel } from 'web/src/components/ui/Stat';
import LikeIcon from 'web/src/assets/svg/LikeIcon.svg';
import UnLikeIcon from 'web/src/assets/svg/UnLikeIcon.svg';
import { CollapsibleBox } from '../collapsibleBox/CollapsibleBox';
import * as s from './TraderStats.css';

interface TraderStatsProps {
  publicName: string;
  showBasicOnly?: boolean;
  desktopOnly?: boolean;
}

interface DealStat {
  canceledDeals: number;
  defeatInDisputes: number;
  successDeals: number;
}

export const TraderStats: FC<TraderStatsProps> = ({ publicName, showBasicOnly, desktopOnly }) => {
  const t = useT();

  const { data } = useUserInfo(publicName);

  const traderStats: DealStat = useMemo(() => {
    return (data?.dealStats || []).reduce(
      (pValue: DealStat, cValue: DealStat) => {
        return {
          canceledDeals: pValue.canceledDeals + cValue.canceledDeals,
          defeatInDisputes: pValue.defeatInDisputes + cValue.defeatInDisputes,
          successDeals: pValue.successDeals + cValue.successDeals,
        };
      },
      { canceledDeals: 0, defeatInDisputes: 0, successDeals: 0 },
    );
  }, [data]);

  if (!data) return null;

  const thumpUp = (data.feedbacks || []).find(({ type }: { type: string }) => type === 'thumb_up');
  const thumpDown = (data.feedbacks || []).find(({ type }: { type: string }) => type === 'hankey');

  return (
    <>
      <Box
        display={{ desktop: 'flex', mobile: 'none' }}
        w="full"
        backgroundColor="dropdown"
        flexWrap="wrap"
      >
        {showBasicOnly && (
          <Box display="flex" w="full">
            <Box display="flex" mr="2x" mb="2x" w="full">
              <Stat>
                <StatLabel>{t('trader.block.rating')}</StatLabel>
                <Box mb="2x">
                  <Text textAlign="right">{data.rating}</Text>
                </Box>
                <Box display="flex" alignItems="center" justifyContent="flex-end">
                  <LikeIcon />
                  <Box ml="2x" mr="4x">
                    <Text>{thumpUp?.count}</Text>
                  </Box>
                  <UnLikeIcon />
                  <Box ml="2x">
                    <Text>{thumpDown?.count}</Text>
                  </Box>
                </Box>
              </Stat>
            </Box>
            <Box display="flex" mb="2x" w="full">
              <Stat>
                <StatLabel>{t('trader.block.reputation')}</StatLabel>
                <Text textAlign="right" variant="lead">
                  {data.safetyIndex}
                </Text>
              </Stat>
            </Box>
          </Box>
        )}
        {!showBasicOnly && (
          <>
            <Box display="flex" mr="2x" mb="2x" className={s.statBox}>
              <Stat>
                <StatLabel>{t('trader.stats.success')}</StatLabel>
                <Text variant="lead">{traderStats.successDeals}</Text>
              </Stat>
            </Box>
            <Box display="flex" mr="2x" mb="2x" className={s.statBox}>
              <Stat>
                <StatLabel>{t('trader.stats.canceled')}</StatLabel>
                <Text variant="lead">{traderStats.canceledDeals}</Text>
              </Stat>
            </Box>
            <Box display="flex" mr="2x" mb="2x" className={s.statBox}>
              <Stat>
                <StatLabel>{t('trader.stats.defeatin')}</StatLabel>
                <Text variant="lead">{traderStats.defeatInDisputes}</Text>
              </Stat>
            </Box>
            <Box display="flex" mr="2x" mb="2x" className={s.statBox}>
              <Stat>
                <StatLabel>{t('trader.stats.trusted')}</StatLabel>
                <Text variant="lead">{data.trustsCount}</Text>
              </Stat>
            </Box>
            <Box display="flex" className={s.statBox}>
              <Stat>
                <StatLabel>{t('trader.stats.blacklisted')}</StatLabel>
                <Text variant="lead">{data.blacklistedTimes}</Text>
              </Stat>
            </Box>
          </>
        )}
      </Box>
      {!desktopOnly && (
        <Box display={{ desktop: 'none', mobile: 'flex' }} w="full">
          <CollapsibleBox
            visible={
              <>
                <Box display="flex" justifyContent="space-between" alignItems="center" py="2x">
                  <Text>{t('trader.block.rating')}</Text>
                  <Box display="flex" alignItems="center">
                    <LikeIcon />
                    <Box ml="2x" mr="4x">
                      <Text>{thumpUp?.count}</Text>
                    </Box>
                    <UnLikeIcon />
                    <Box ml="2x">
                      <Text>{thumpDown?.count}</Text>
                    </Box>
                  </Box>
                  <Text textAlign="right">{data.rating}</Text>
                </Box>
                <Box display="flex" w="full" justifyContent="space-between" py="2x">
                  <Text>{t('trader.stats.success')}</Text>
                  <Text>{traderStats.successDeals}</Text>
                </Box>
                <Box display="flex" w="full" justifyContent="space-between" py="2x">
                  <Text>{t('trader.stats.canceled')}</Text>
                  <Text>{traderStats.canceledDeals}</Text>
                </Box>
              </>
            }
            hidden={
              <>
                <Box display="flex" w="full" justifyContent="space-between" py="2x">
                  <Text>{t('trader.stats.defeatin')}</Text>
                  <Text>{traderStats.defeatInDisputes}</Text>
                </Box>
                <Box display="flex" w="full" justifyContent="space-between" py="2x">
                  <Text>{t('trader.stats.trusted')}</Text>
                  <Text>{data.trustsCount}</Text>
                </Box>
                <Box display="flex" justifyContent="space-between" w="full" py="2x">
                  <Text>{t('trader.stats.blacklisted')}</Text>
                  <Text>{data.blacklistedTimes}</Text>
                </Box>
              </>
            }
          />
        </Box>
      )}
    </>
  );
};
