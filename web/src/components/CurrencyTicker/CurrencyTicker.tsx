import { FC } from 'react';

type Props = {
  className?: string;
  symbol: string | undefined;
};

export const CurrencyTicker: FC<Props> = ({ symbol = '', className }) => {
  const [currency] = symbol.split('-');
  return <span className={className}>{currency?.toUpperCase()}</span>;
};
