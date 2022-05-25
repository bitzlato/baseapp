import { FC, useState } from 'react';
import { Box } from 'web/src/components/ui/Box';
import ThumbUp from 'web/src/assets/svg/ThumbUp.svg';
import ThumbDown from 'web/src/assets/svg/ThumbDown.svg';
import { CollapsibleBox } from 'web/src/components/collapsibleBox/CollapsibleBox';
import { useTradeContext } from 'web/src/components/shared/Trade/TradeContext';
import { TradePartnerShort } from 'web/src/components/shared/Trade/TradePartnerShort';
import { MobileTabs } from 'web/src/components/shared/Trade/types';
import { MobileTradeTab } from 'web/src/components/shared/Trade/mobile/TradeTab';
import { TradeHistory } from 'web/src/components/shared/Trade/TradeHistory';

const MobileTradeInfoBoxCollapsible: FC<{
  elements: { key: string; value: JSX.Element | string | number }[];
}> = ({ elements }) => {
  const visible = (
    <Box display="flex" justifyContent="space-between" py="2x">
      <Box as="span" fontWeight="strong" fontSize="medium" color="tradeMobileInfoBoxKey">
        {elements[0]?.key}
      </Box>
      <Box as="span" fontSize="medium" color="tradeMobileInfoBoxValue">
        {elements[0]?.value}
      </Box>
    </Box>
  );

  const hidden = (() => {
    return (
      <>
        {elements.slice(1, 4).map((element) => {
          const content =
            typeof element.value === 'string' || typeof element.value === 'number' ? (
              <Box as="span" fontSize="medium" color="tradeMobileInfoBoxValue">
                {element.value}
              </Box>
            ) : (
              element.value
            );

          return (
            <Box key={element.key} display="flex" justifyContent="space-between" py="2x">
              <Box as="span" fontWeight="strong" fontSize="medium" color="tradeMobileInfoBoxKey">
                {element.key}
              </Box>
              {content}
            </Box>
          );
        })}
      </>
    );
  })();

  return (
    <Box
      backgroundColor="tradeMobileInfoBackgroundPrimary"
      display="flex"
      flexDirection="column"
      gap="3x"
      borderRadius="1.5x"
    >
      <CollapsibleBox visible={visible} hidden={hidden} transparent />
    </Box>
  );
};

const MobileTradeInfoBox: FC<{
  elements: { key: string; value: JSX.Element | string | number }[];
}> = ({ elements }) => {
  return (
    <Box display="flex" flexDirection="column" gap="1x" borderRadius="1.5x">
      {elements.map((element) => {
        const content =
          typeof element.value === 'string' || typeof element.value === 'number' ? (
            <Box as="span" fontSize="medium" color="tradeMobileInfoBoxValue">
              {element.value}
            </Box>
          ) : (
            element.value
          );

        return (
          <Box key={element.key} display="flex" justifyContent="space-between" py="2x">
            <Box as="span" fontWeight="strong" fontSize="medium">
              {element.key}
            </Box>
            {content}
          </Box>
        );
      })}
    </Box>
  );
};

export const MobileTradeInfo: FC = () => {
  const { t } = useTradeContext();

  const [tab, setTab] = useState<MobileTabs>('trader');
  const handleChangeTab = (nextTab: string) => {
    setTab(nextTab as MobileTabs);
  };
  const { trade } = useTradeContext();

  const renderTab = (() => {
    if (tab === 'trader') {
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
        <Box display="flex" flexDirection="column" gap="3x">
          <TradePartnerShort />
          <MobileTradeInfoBoxCollapsible
            elements={[
              {
                key: t('trade.info.trader.rating'),
                value: (
                  <Box display="flex" alignItems="center">
                    <ThumbUp />
                    <Box mx="2x">
                      <Box as="span" fontSize="medium" color="tradeMobileInfoBoxValue">
                        {thumbUp}
                      </Box>
                    </Box>

                    <ThumbDown />

                    <Box mx="2x">
                      <Box as="span" fontSize="medium" color="tradeMobileInfoBoxValue">
                        {thumbDown}
                      </Box>
                    </Box>

                    <Box>
                      <Box as="span" fontSize="medium" color="tradeMobileInfoBoxValue">
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

          <Box backgroundColor="tradeMobileInfoBackgroundPrimary" borderRadius="1.5x" py="2x">
            <CollapsibleBox
              visible={
                <Box py="2x">
                  <Box
                    as="span"
                    fontWeight="strong"
                    fontSize="medium"
                    color="tradeMobileInfoBoxKey"
                  >
                    {t('trade.terms.history')}
                  </Box>
                </Box>
              }
              hidden={
                <Box pb="4x">
                  <Box as="span" fontSize="medium" color="tradeMobileInfoBoxValue">
                    {trade.terms}
                  </Box>
                </Box>
              }
              transparent
            />
          </Box>
        </Box>
      );
    }

    if (tab === 'trade') {
      return (
        <Box display="flex" flexDirection="column" gap="3x">
          <Box
            px="3x"
            py="5x"
            backgroundColor="tradeMobileInfoBackgroundPrimary"
            borderRadius="1.5x"
          >
            <Box mb="3x">
              <Box as="span" fontWeight="strong" fontSize="medium" color="tradeMobileInfoBoxKey">
                {t('trade.info.trade.title')}
              </Box>
            </Box>

            <MobileTradeInfoBox
              elements={[
                {
                  key: t('trade.info.rate'),
                  value: `${trade.rate} ${trade.currency.code}`,
                },
                {
                  key: t('trade.info.fiat.amount'),
                  value: `${trade.currency.amount} ${trade.currency.code}`,
                },
                {
                  key: t('trade.info.fee'),
                  value: '0%',
                },
              ]}
            />
          </Box>

          <Box backgroundColor="tradeMobileInfoBackgroundPrimary" borderRadius="1.5x">
            <TradeHistory />
          </Box>
        </Box>
      );
    }

    return null;
  })();

  return (
    <Box display="flex" flexDirection="column" gap="4x" height="full">
      <MobileTradeTab tab={tab} onChange={handleChangeTab} />
      {renderTab}
    </Box>
  );
};
