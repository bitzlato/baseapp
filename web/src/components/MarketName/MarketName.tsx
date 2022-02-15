import { FC } from 'react';
import { CurrencyTicker } from 'src/components/CurrencyTicker/CurrencyTicker';

type Props = {
  name: string;
};

export const MarketName: FC<Props> = ({ name }: Props) => {
  const [from, to] = name.split('/');

  return (
    <>
      <CurrencyTicker symbol={from} />
      {to !== undefined && (
        <>
          /<CurrencyTicker symbol={to} />
        </>
      )}
    </>
  );
};
