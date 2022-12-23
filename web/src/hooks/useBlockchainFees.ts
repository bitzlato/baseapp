import { useMemo } from 'react';
import { createMoney, USD_CCY } from 'web/src/helpers/money';
import { useFetchBlockchainFees } from 'web/src/hooks/data/belomor/useFetchBlockchainFees';
import { useMarketCurrencies } from 'web/src/hooks/useMarketCurrencies';
import { BlockchainFees } from 'web/src/types/blockchains.types';

export const useBlockchainFees = (
  params: { blockchainKey: string; currencyCode: string } | undefined,
  { isConvertToFiat = true }: { isConvertToFiat?: boolean | undefined } = {},
): BlockchainFees | undefined => {
  const { data } = useFetchBlockchainFees(params);
  const { getMarketCurrency } = useMarketCurrencies();

  return useMemo(() => {
    if (!data) {
      return undefined;
    }

    const currency = getMarketCurrency(data.currency_fee.currency_id.toUpperCase());
    const low = data.currency_fee.low ? createMoney(data.currency_fee.low, currency) : undefined;
    const lowInFiat =
      currency.apiCurrency && low && isConvertToFiat
        ? low.convert(currency.apiCurrency.price, USD_CCY)
        : undefined;
    const market = data.currency_fee.market
      ? createMoney(data.currency_fee.market, currency)
      : undefined;
    const marketInFiat =
      currency.apiCurrency && market && isConvertToFiat
        ? market.convert(currency.apiCurrency.price, USD_CCY)
        : undefined;
    const aggressive = data.currency_fee.aggressive
      ? createMoney(data.currency_fee.aggressive, currency)
      : undefined;
    const aggressiveInFiat =
      currency.apiCurrency && aggressive && isConvertToFiat
        ? aggressive.convert(currency.apiCurrency.price, USD_CCY)
        : undefined;

    return {
      ...data,
      fees: {
        ...data.currency_fee,
        lowOriginal: data.currency_fee.low,
        low,
        lowInFiat,
        marketOriginal: data.currency_fee.market,
        market,
        marketInFiat,
        aggressiveOriginal: data.currency_fee.aggressive,
        aggressive,
        aggressiveInFiat,
      },
    };
  }, [data, getMarketCurrency, isConvertToFiat]);
};
