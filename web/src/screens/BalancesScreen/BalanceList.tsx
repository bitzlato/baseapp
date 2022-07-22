import { FC } from 'react';
import { range } from 'web/src/helpers/range';
import { Balance } from 'web/src/types/balances.types';
import { BalanceItem } from './BalanceItem';

interface Props {
  balances: Balance[] | undefined;
  forceActiveCurrencyCode?: string | undefined;
}

const eightArray = range(0, 7);

export const BalanceList: FC<Props> = ({ balances, forceActiveCurrencyCode }) => {
  if (!balances) {
    return (
      <>
        {eightArray.map((idx) => (
          <BalanceItem key={idx} />
        ))}
      </>
    );
  }

  return (
    <>
      {balances.map((balance) => {
        const { code } = balance.cryptoCurrency;

        return (
          <BalanceItem
            key={code}
            balance={balance}
            forceActive={code === forceActiveCurrencyCode}
          />
        );
      })}
    </>
  );
};
