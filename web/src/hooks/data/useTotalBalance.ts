import { Money } from '@bitzlato/money-js';
import { createMoney } from 'web/src/helpers/money';
import { useFetchTotalBalance } from 'web/src/hooks/data/whaler/useFetchTotalBalance';
import { useP2PCryptoCurrencies } from 'web/src/hooks/useP2PCryptoCurrencies';

export const useTotalBalance = (): Record<string, Money | undefined> | undefined => {
  const { getCryptoCurrency } = useP2PCryptoCurrencies();
  const { data } = useFetchTotalBalance();

  return data?.total.reduce<Record<string, Money | undefined>>((acc, item) => {
    acc[item.currency_id] = createMoney(item.balance, getCryptoCurrency(item.currency_id));

    return acc;
  }, {});
};
