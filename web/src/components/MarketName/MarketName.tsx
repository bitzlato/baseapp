import { FC } from 'react';
import { CurrencyTicker } from 'src/components/CurrencyTicker/CurrencyTicker';
import { Box } from 'web/src/components/Box/Box';

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
          <Box as="span" textColor="secondary">
            /
          </Box>
          <CurrencyTicker symbol={to} />
        </>
      )}
    </>
  );
};
