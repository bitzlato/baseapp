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
import { useP2PCryptoCurrencies } from 'web/src/hooks/useP2PCryptoCurrencies';
import { useP2PFiatCurrencies } from 'web/src/hooks/useP2PFiatCurrencies';
import { createMoney } from 'web/src/helpers/money';
import { P2PFiatFormat } from 'web/src/components/money/P2PFiatFormat';

type TradeInfoElements = { key: string; value: JSX.Element | string | number };

type TradeInfoBoxProps = {
  title: string;
  elements: TradeInfoElements[];
};

const TradeInfoBox: FC<TradeInfoBoxProps> = ({ title, elements }) => {
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
        <Text as="span" fontWeight="strong" fontSize="medium" color="tradeInfoBoxTitle">
          {title}
        </Text>
      </Box>

      {elements.map((element) => {
        const content =
          typeof element.value === 'string' || typeof element.value === 'number' ? (
            <Text as="span" fontSize="small" color="tradeInfoBoxValue">
              {element.value}
            </Text>
          ) : (
            element.value
          );

        return (
          <Box key={element.key} display="flex" justifyContent="space-between">
            <Box display="flex" alignItems="center">
              <Text as="span" fontWeight="strong" fontSize="small" color="tradeInfoBoxKey">
                {element.key}
              </Text>
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

  const { getFiatCurrency } = useP2PFiatCurrencies();
  const { getCryptoCurrency } = useP2PCryptoCurrencies();

  const ccurrency = getCryptoCurrency(trade.cryptocurrency.code);
  const currency = getFiatCurrency(trade.currency.code);
  const amountMoney = createMoney(trade.currency.amount, currency);
  const rateMoney = createMoney(trade.rate, currency);

  const isMaker = trade.owner;

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

      const tradeInfoElements = [
        {
          key: t('trade.info.rate'),
          value: (
            <Text>
              <P2PFiatFormat cryptoCurrency={ccurrency} money={rateMoney} /> {trade.currency.code}
            </Text>
          ),
        },
        {
          key: t('trade.info.fiat.amount'),
          value: (
            <Text>
              <P2PFiatFormat cryptoCurrency={ccurrency} money={amountMoney} /> {trade.currency.code}
            </Text>
          ),
        },
        !isMaker && {
          key: t('trade.info.fee'),
          value: '0%',
        },
      ].filter(Boolean) as unknown as TradeInfoElements[];

      return (
        <>
          <TradeInfoBox
            title={t('trade.info.trader.title')}
            elements={[
              {
                key: t('trade.info.trader.rating'),
                value: trade.partner.rating,
              },
              {
                key: t('Comments'),
                value: (
                  <Box display="flex" alignItems="center" gap="1x">
                    <ThumbUpIcon />

                    <Text as="span" fontSize="small" color="tradeInfoBoxValue">
                      {thumbUp}
                    </Text>

                    <ThumbDownIcon />

                    <Text as="span" fontSize="small" color="tradeInfoBoxValue">
                      {thumbDown}
                    </Text>
                  </Box>
                ),
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

          <TradeInfoBox title={t('trade.info.trade.title')} elements={tradeInfoElements} />

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
