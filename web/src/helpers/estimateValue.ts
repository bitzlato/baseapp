import { DEFAULT_CCY_PRECISION } from '../constants';
import { ApiCurrency, Market, Ticker, Wallet } from '../modules';
import { handleCCYPrecision } from './';
import { createCcy, createMoney, createMoneyWithoutCcy } from './money';

export interface MarketTicker {
  [key: string]: Ticker;
}

const findMarket = (askUnit: string, bidUnit: string, markets: Market[]): Market | null => {
  for (const market of markets) {
    if (
      (market.base_unit === askUnit && market.quote_unit === bidUnit) ||
      (market.base_unit === bidUnit && market.quote_unit === askUnit)
    ) {
      return market;
    }
  }

  return null;
};

const isMarketPresent = (askUnit: string, bidUnit: string, markets: Market[]): boolean => {
  return findMarket(askUnit, bidUnit, markets) !== null;
};

const findMarketTicker = (marketPair: string, marketTickers: MarketTicker) => {
  return marketTickers[marketPair];
};

const getWalletTotal = (wallet: Wallet): number => {
  let amount = createMoney(0, wallet.currency);
  if (wallet.balance) {
    amount = amount.add(wallet.balance);
  }

  if (wallet.locked) {
    amount = amount.add(wallet.locked);
  }

  return Number(amount.toString());
};

export const estimateWithMarket = (
  targetCurrency: string,
  walletCurrency: string,
  walletTotal: number,
  currencies: ApiCurrency[],
  markets: Market[],
  marketTickers: MarketTicker,
): number => {
  const formattedTargetCurrency = targetCurrency.toLowerCase();
  const formattedWalletCurrency = walletCurrency.toLowerCase();
  const market = findMarket(formattedTargetCurrency, formattedWalletCurrency, markets);
  const marketTicker = findMarketTicker((market && market.id) || '', marketTickers);
  const targetCurrencyPrecision = handleCCYPrecision(
    currencies,
    formattedTargetCurrency,
    DEFAULT_CCY_PRECISION,
  );

  if (formattedTargetCurrency === formattedWalletCurrency) {
    return Number(createMoneyWithoutCcy(walletTotal, targetCurrencyPrecision).toString());
  }

  if (market && marketTicker) {
    if (formattedTargetCurrency === market.base_unit) {
      const precisedValue = Number(
        createMoneyWithoutCcy(
          walletTotal * (Number(marketTicker.last) !== 0 ? 1 / Number(marketTicker.last) : 0),
          targetCurrencyPrecision,
        ).toString(),
      );

      return precisedValue;
    } else {
      const precisedValue = Number(
        createMoneyWithoutCcy(walletTotal * Number(marketTicker.last), targetCurrencyPrecision).toString(),
      );

      return precisedValue;
    }
  }

  return 0;
};

const estimateWithoutMarket = (
  targetCurrency: string,
  walletCurrency: string,
  walletTotal: number,
  currencies: ApiCurrency[],
  markets: Market[],
  marketTickers: MarketTicker,
): number => {
  const secondaryCurrencies: string[] = [];
  const formattedTargetCurrency = targetCurrency.toLowerCase();
  const formattedWalletCurrency = walletCurrency.toLowerCase();

  for (const market of markets) {
    if (market.base_unit === formattedTargetCurrency) {
      secondaryCurrencies.push(market.quote_unit);
    }
    if (market.quote_unit === formattedTargetCurrency) {
      secondaryCurrencies.push(market.base_unit);
    }
  }

  let selectedSecondaryCurrency = '';
  outer: for (const secondaryCurrency of secondaryCurrencies) {
    for (const market of markets) {
      if (
        (market.base_unit === secondaryCurrency && market.quote_unit === formattedWalletCurrency) ||
        (market.quote_unit === secondaryCurrency && market.base_unit === formattedWalletCurrency)
      ) {
        selectedSecondaryCurrency = secondaryCurrency;
        break outer;
      }
    }
  }

  if (selectedSecondaryCurrency) {
    const secondaryCurrencyValue = estimateWithMarket(
      selectedSecondaryCurrency,
      formattedWalletCurrency,
      walletTotal,
      currencies,
      markets,
      marketTickers,
    );

    return estimateWithMarket(
      targetCurrency,
      selectedSecondaryCurrency,
      secondaryCurrencyValue,
      currencies,
      markets,
      marketTickers,
    );
  } else {
    // 'No secondary currency found for', wallet.currency
  }

  return 0;
};

export const estimateValue = (
  targetCurrency: string,
  currencies: ApiCurrency[],
  wallets: Wallet[],
  markets: Market[],
  marketTickers: MarketTicker,
) => {
  const formattedTargetCurrency = targetCurrency.toLowerCase();
  let estimatedValue = 0;

  if (wallets && wallets.length) {
    for (const wallet of wallets) {
      const formattedWalletCurrency = wallet.currency.code.toLowerCase();
      if (formattedWalletCurrency === formattedTargetCurrency) {
        estimatedValue += getWalletTotal(wallet);
      } else if (isMarketPresent(formattedTargetCurrency, formattedWalletCurrency, markets)) {
        estimatedValue += estimateWithMarket(
          formattedTargetCurrency,
          formattedWalletCurrency,
          getWalletTotal(wallet),
          currencies,
          markets,
          marketTickers,
        );
      } else {
        estimatedValue += estimateWithoutMarket(
          formattedTargetCurrency,
          wallet.currency.code,
          getWalletTotal(wallet),
          currencies,
          markets,
          marketTickers,
        );
      }
    }
  }

  const targetCurrencyPrecision = handleCCYPrecision(
    currencies,
    formattedTargetCurrency,
    DEFAULT_CCY_PRECISION,
  );
  return createMoney(estimatedValue, createCcy(formattedTargetCurrency, targetCurrencyPrecision));
};

export const estimateUnitValue = (
  targetCurrency: string,
  currentCurrency: string,
  total: number,
  currencies: ApiCurrency[],
  markets: Market[],
  marketTickers: MarketTicker,
) => {
  const estimated =
    estimateWithMarket(
      targetCurrency,
      currentCurrency,
      total,
      currencies,
      markets,
      marketTickers,
    ) ||
    estimateWithoutMarket(
      targetCurrency,
      currentCurrency,
      total,
      currencies,
      markets,
      marketTickers,
    );
  const formattedTargetCurrency = targetCurrency.toLowerCase();
  const targetCurrencyPrecision = handleCCYPrecision(
    currencies,
    formattedTargetCurrency,
    DEFAULT_CCY_PRECISION,
  );

  return createMoney(estimated, createCcy(formattedTargetCurrency, targetCurrencyPrecision));
};
