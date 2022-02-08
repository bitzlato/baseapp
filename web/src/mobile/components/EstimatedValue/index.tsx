import * as React from 'react';
import { useSelector } from 'react-redux';
import { AmountFormat } from 'src/components/AmountFormat/AmountFormat';
import { useT } from 'src/hooks/useT';
import {
  valuationPrimaryCurrency,
  valuationPrimaryCurrencyName,
  valuationSecondaryCurrency,
  valuationSecondaryCurrencyName,
} from '../../../api';
import { estimateUnitValue, estimateValue } from '../../../helpers/estimateValue';
import {
  useCurrenciesFetch,
  useMarketsFetch,
  useMarketsTickersFetch,
  useWalletsFetch,
} from '../../../hooks';
import {
  selectCurrencies,
  selectMarkets,
  selectMarketTickers,
  selectWallets,
} from '../../../modules';

const EstimatedValueMobile = React.memo(() => {
  const t = useT();
  const wallets = useSelector(selectWallets);
  const markets = useSelector(selectMarkets);
  const currencies = useSelector(selectCurrencies);
  const tickers = useSelector(selectMarketTickers);
  const estimatedValue = estimateValue(
    valuationPrimaryCurrency(),
    currencies,
    wallets,
    markets,
    tickers,
  );
  const primaryName = valuationPrimaryCurrencyName().toUpperCase();
  if (primaryName === 'USD') {
    estimatedValue.currency.minorUnit = 2;
  }
  const estimatedSecondaryValue = estimateUnitValue(
    valuationSecondaryCurrency(),
    valuationPrimaryCurrency(),
    +estimatedValue,
    currencies,
    markets,
    tickers,
  );

  useWalletsFetch();
  useMarketsFetch();
  useCurrenciesFetch();
  useMarketsTickersFetch();

  return (
    <div className="cr-mobile-wallets-banner">
      <div className="cr-mobile-wallets-banner__title">
        {t('page.body.wallets.estimated_value')}
      </div>
      <div className="cr-mobile-wallets-banner__body">
        <div className="cr-mobile-wallets-banner__body-wrap">
          <span className="cr-mobile-wallets-banner__body-number">
            <AmountFormat money={estimatedValue} />
          </span>
          <span className="cr-mobile-wallets-banner__body-currency">{primaryName}</span>
        </div>
        <div className="cr-mobile-wallets-banner__body-wrap">
          <span className="cr-mobile-wallets-banner__body-number">
            <AmountFormat money={estimatedSecondaryValue} />
          </span>
          <span className="cr-mobile-wallets-banner__body-currency">
            {valuationSecondaryCurrencyName().toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
});

export { EstimatedValueMobile };
