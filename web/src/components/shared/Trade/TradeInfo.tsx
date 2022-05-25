import { FC, useState } from 'react';
import { Box } from 'web/src/components/ui/Box';
import ThumbUpIcon from 'web/src/assets/svg/ThumbUp.svg';
import ThumbDownIcon from 'web/src/assets/svg/ThumbDown.svg';
import ShieldIcon from 'web/src/assets/svg/ShieldIcon.svg';
import { useTradeContext } from 'web/src/components/shared/Trade/TradeContext';
import { TradeTab } from 'web/src/components/shared/Trade/TradeTab';
import { Tabs } from 'web/src/components/shared/Trade/types';
import { TradeChat } from 'web/src/components/shared/Trade/TradeChat';
import { Text } from 'src/components/ui/Text';

const TradeInfoBox: FC<{
  title: string;
  elements: { key: string; value: JSX.Element | string | number }[];
}> = ({ title, elements }) => {
  return (
    <Box
      backgroundColor="tradeInfoBox"
      display="flex"
      flexDirection="column"
      gap="3x"
      px="6x"
      py="5x"
    >
      <Box>
        <Box as="span" fontWeight="strong" fontSize="medium" color="tradeInfoBoxTitle">
          {title}
        </Box>
      </Box>

      {elements.map((element) => {
        const content =
          typeof element.value === 'string' || typeof element.value === 'number' ? (
            <Box as="span" fontSize="small" color="tradeInfoBoxValue">
              {element.value}
            </Box>
          ) : (
            element.value
          );

        return (
          <Box key={element.key} display="flex" justifyContent="space-between">
            <Box as="span" fontWeight="strong" fontSize="small" color="tradeInfoBoxKey">
              {element.key}
            </Box>
            {content}
          </Box>
        );
      })}
    </Box>
  );
};

export const TradeInfo: FC = () => {
  const { t } = useTradeContext();

  const [tab, setTab] = useState<Tabs>('tradeInfo');
  const handleChangeTab = (nextTab: string) => {
    setTab(nextTab as Tabs);
  };
  const { trade } = useTradeContext();

  const renderTab = () => {
    if (tab === 'chat') {
      return <TradeChat />;
    }

    if (tab === 'tradeInfo') {
      const dealStat = trade.partner.dealStats.find(
        ({ cryptocurrency }) => cryptocurrency === trade.cryptocurrency.code,
      );

      const successfulTradesAmount = dealStat?.successDeals || 0;
      const cancelTradesAmount = dealStat?.canceledDeals || 0;

      const thumbUp =
        trade.partner.feedbacks.find((feedback) => feedback.type === 'thumb_up')?.count || 0;
      const thumbDown =
        trade.partner.feedbacks.find((feedback) => feedback.type === 'hankey')?.count || 0;

      return (
        <>
          <TradeInfoBox
            title={t('trade.info.trader.title')}
            elements={[
              {
                key: t('trade.info.trader.rating'),
                value: (
                  <Box display="flex" alignItems="center">
                    <ThumbUpIcon />
                    <Box mx="1x">
                      <Box as="span" fontSize="small" color="tradeInfoBoxValue">
                        {thumbUp}
                      </Box>
                    </Box>

                    <ThumbDownIcon />

                    <Box mx="1x">
                      <Box as="span" fontSize="small" color="tradeInfoBoxValue">
                        {thumbDown}
                      </Box>
                    </Box>

                    <Box>
                      <Box as="span" fontSize="small" color="tradeInfoBoxValue">
                        {trade.partner.rating}
                      </Box>
                    </Box>
                  </Box>
                ),
              },
              {
                key: t('trade.info.trader.reputation'),
                value: trade.partner.safetyIndex,
              },
              {
                key: t('trade.info.trader.deals.successful'),
                value: successfulTradesAmount,
              },
              {
                key: t('trade.info.trader.deals.failed'),
                value: cancelTradesAmount,
              },
            ]}
          />

          <TradeInfoBox
            title={t('trade.info.trade.title')}
            elements={[
              {
                key: t('trade.info.rate'),
                value: trade.rate,
              },
              {
                key: t('trade.info.fiat.amount'),
                value: trade.currency.amount,
              },
              {
                key: t('trade.info.fee'),
                value: '0%',
              },
            ]}
          />

          <Box display="flex" alignItems="center" gap="6x">
            <Box flexShrink={0}>
              <ShieldIcon />
            </Box>
            <Text color="secondary">{t('ad.trade.info')}</Text>
          </Box>
        </>
      );
    }

    return null;
  };

  return (
    <Box display="flex" flexDirection="column" gap="4x" height="full">
      <TradeTab tab={tab} onChange={handleChangeTab} />
      {renderTab()}
    </Box>
  );
};
