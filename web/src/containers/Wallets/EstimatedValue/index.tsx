import * as React from 'react';
import { useSelector } from 'react-redux';
import {
  useMarketsFetch,
  useMarketsTickersFetch,
  useRangerConnectFetch,
  useWalletsFetch,
} from 'src/hooks';
import { AmountFormat } from 'src/components/AmountFormat/AmountFormat';
import { useT } from 'src/hooks/useT';
import {
  valuationPrimaryCurrency,
  valuationPrimaryCurrencyName,
  valuationSecondaryCurrency,
  valuationSecondaryCurrencyName,
} from '../../../api';
import { estimateUnitValue, estimateValue } from '../../../helpers/estimateValue';
import { selectCurrencies, selectMarkets, selectMarketTickers, Wallet } from '../../../modules';

interface EstimatedValueProps {
  wallets: Wallet[];
}

type Props = EstimatedValueProps;

const EstimatedValue: React.FC<Props> = (props: Props): React.ReactElement => {
  const t = useT();

  const { wallets } = props;
  const currencies = useSelector(selectCurrencies);
  const markets = useSelector(selectMarkets);
  const tickers = useSelector(selectMarketTickers);

  useMarketsTickersFetch();
  useMarketsFetch();
  useWalletsFetch();
  useRangerConnectFetch();

  const renderSecondaryCurrencyValuation = React.useCallback(
    (total: string) => {
      const value = estimateUnitValue(
        valuationSecondaryCurrency(),
        valuationPrimaryCurrency(),
        +total,
        currencies,
        markets,
        tickers,
      );

      return (
        <span className="value-container">
          <span className="value">
            <AmountFormat money={value} />
          </span>
          <span className="value-sign">{valuationSecondaryCurrencyName().toUpperCase()}</span>
        </span>
      );
    },
    [currencies, markets, tickers],
  );

  const primaryName = valuationPrimaryCurrencyName().toUpperCase();

  const estimatedValue = React.useMemo(() => {
    const value = estimateValue(valuationPrimaryCurrency(), currencies, wallets, markets, tickers);
    if (primaryName === 'USD') {
      value.currency.minorUnit = 2;
    }
    return value;
  }, [currencies, wallets, markets, tickers]);

  return (
    <div className="pg-estimated-value">
      <span className="pg-estimated-value__title">{t('page.body.wallets.estimated_value')}</span>
      <div className="pg-estimated-value__container">
        <span className="value-container">
          <span className="value">
            <AmountFormat money={estimatedValue} />
          </span>
          <span className="value-sign">{primaryName}</span>
        </span>
        {valuationSecondaryCurrency() &&
          renderSecondaryCurrencyValuation(estimatedValue.toString())}
      </div>
    </div>
  );
};

export { EstimatedValue };
