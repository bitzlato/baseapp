import { FC } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { CryptoCurrencyIcon } from 'web/src/components/ui/CryptoCurrencyIcon';
import { Skeleton } from 'web/src/components/ui/Skeleton';
import { Balance } from 'web/src/types/balances.types';

interface Props {
  balance?: Balance | undefined;
}

export const BalanceBrand: FC<Props> = ({ balance }) => {
  return (
    <Box as="span" display="flex" gap="4x">
      {balance ? (
        <CryptoCurrencyIcon size="11x" currency={balance.cryptoCurrency.code} />
      ) : (
        <Skeleton size="11x" borderRadius="circle" />
      )}
      <Box as="span" display="flex" flexDirection="column">
        <Box as="span" fontSize="large" fontWeight="strong">
          {balance?.cryptoCurrency.code ?? <Skeleton w="10x" />}
        </Box>
        <Box as="span" fontSize="medium">
          {balance?.name ?? <Skeleton w="20x" />}
        </Box>
      </Box>
    </Box>
  );
};
