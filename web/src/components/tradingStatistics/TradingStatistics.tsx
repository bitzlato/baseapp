import { FC, useEffect, useState } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { Button } from 'web/src/components/ui/Button';
import { CryptoCurrencySelect } from 'web/src/components/cryptoCurrencySelect/CryptoCurrencySelect';
import { Card, CardBody, CardHeader } from 'web/src/components/ui/Card';
import { Container } from 'web/src/components/ui/Container';
import { useCryptoCurrencies } from 'web/src/hooks/useCryptoCurrencies';
import { BaseCurrency } from 'web/src/types/currencies.types';
import { useT } from 'web/src/hooks/useT';
import { useMarketsFetch } from 'web/src/hooks/useMarketsFetch';
import { useTradingViewMarkets } from 'web/src/hooks/useTradingViewMarkets';
import { TradingViewMarketOption } from 'web/src/types/tradingView.types';
import { ControlledTradingChart } from 'web/src/containers/TradingChart/ControlledTradingChart';
import { Spinner } from 'web/src/components/ui/Spinner';
import { useHistory } from 'react-router-dom';
import { TradingStatisticsMarketSelect } from './TradingStatisticsMarketSelect';
import * as s from './TradingStatistics.css';

interface Props {
  initialMarketSymbol?: string | undefined;
}

export const TradingStatistics: FC<Props> = ({ initialMarketSymbol }) => {
  const history = useHistory();
  const t = useT();
  const cryptoCurrencies = useCryptoCurrencies()?.filter((c) => c.code === 'BTC');
  useMarketsFetch();

  const [selectedCryptoCurrency, setSelectedCryptoCurrency] = useState<BaseCurrency>();
  const [selectedMarket, setSelectedMarket] = useState<TradingViewMarketOption>();

  const handleCryproCyrrencyChange = (value: BaseCurrency) => {
    setSelectedCryptoCurrency(value);
    setSelectedMarket(undefined);
  };
  const handleMarketChange = (value: TradingViewMarketOption) => {
    setSelectedMarket(value);
    history.replace(`/trading-view/${value.symbol}`);
  };

  const cryptoCurrency = selectedCryptoCurrency ?? cryptoCurrencies?.[0];
  const markets = useTradingViewMarkets(cryptoCurrency?.code);
  const initialMarket = initialMarketSymbol
    ? markets?.find(({ symbol }) => symbol === initialMarketSymbol)
    : undefined;
  const market = selectedMarket ?? initialMarket ?? markets?.[0];

  useEffect(() => {
    if (!initialMarketSymbol && market) {
      history.replace(`/trading-view/${market.symbol}`);
    }
  }, [history, initialMarketSymbol, market]);

  return (
    <Container maxWidth="xl" p="8x">
      <Card>
        {cryptoCurrencies ? (
          <>
            <CardHeader>
              <Box display="flex" alignItems="flex-end" justifyContent="space-between" gap="8x">
                <Box display="flex">
                  <div className={s.cryptoCurrency}>
                    <Text variant="caption" fontWeight="strong">
                      {t('Coin')}
                    </Text>
                    <CryptoCurrencySelect
                      options={cryptoCurrencies}
                      value={cryptoCurrency}
                      onChange={handleCryproCyrrencyChange}
                    />
                  </div>
                </Box>
                <Box display="flex" mr="auto">
                  <div className={s.market}>
                    <Text variant="caption" fontWeight="strong">
                      {t('page.body.trade.header.newOrder.content.orderType.market')}
                    </Text>
                    <TradingStatisticsMarketSelect
                      options={markets ?? []}
                      value={market}
                      onChange={handleMarketChange}
                    />
                  </div>
                </Box>
                {market && (
                  <Box>
                    <Button
                      as="a"
                      href={
                        market.isExchange
                          ? `/trading/${market.symbol}`
                          : `/p2p/buy-${market.currencyCode.toLowerCase()}-${market.symbol
                              .split('_')[1]
                              ?.toLowerCase()}` // : `/p2p/buy-${market.symbol.replace('_', '-')}`
                      }
                    >
                      {market.isExchange
                        ? t('page.body.landing.marketInfo.title.button')
                        : t('Start P2P Trading')}
                    </Button>
                  </Box>
                )}
              </Box>
            </CardHeader>
            <CardBody>
              <div className={s.chart}>
                {market ? (
                  <ControlledTradingChart
                    currentMarket={market.id}
                    markets={markets ?? []}
                    marketKind={!market.isExchange ? 'p2p-k-line' : 'k-line'}
                  />
                ) : (
                  <Box textAlign="center" fontSize="large" py="8x">
                    {t('page.body.quick.exchange.no-market')}
                  </Box>
                )}
              </div>
            </CardBody>
          </>
        ) : (
          <CardBody>
            <Box className={s.chart} display="flex" alignItems="center" justifyContent="center">
              <Spinner />
            </Box>
          </CardBody>
        )}
      </Card>
    </Container>
  );
};
