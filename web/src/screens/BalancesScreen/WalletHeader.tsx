import { FC } from 'react';
import { MoneyFormat } from 'web/src/components/MoneyFormat/MoneyFormat';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { Skeleton } from 'web/src/components/ui/Skeleton';
import { useT } from 'web/src/hooks/useT';
import { Balance } from 'web/src/types/balances.types';
import { AmountFormat } from 'web/src/components/AmountFormat/AmountFormat';
import { CurrencyBadge } from 'web/src/components/ui/CurrencyBadge';
import { WalletNavigation } from 'web/src/screens/BalancesScreen/WalletNavigation';
import { useTotalBalance } from 'web/src/hooks/data/useTotalBalance';
import { BalanceBrand } from './BalanceBrand';
import * as s from './WalletHeader.css';

interface Props {
  balance?: Balance | undefined;
}

{
  /* <Box className={s.brand}>
        <BalanceBrand balance={balance} />
      </Box>
      <Box display="flex" alignItems="center" gap="3x" fontSize="large">
        <Box color="textMuted">{t('page.body.wallets.balance')}:</Box>
        {balance?.totalBalance ? (
          <>
            <Box display="flex" alignItems="center" gap="2x">
              <AmountFormat money={balance.totalBalance} />
              <CurrencyBadge currency={balance.totalBalance.currency} />
            </Box>

            {balance.totalBalanceInFiat && (
              <Text as="span" variant="caption">
                {' '}
                ≈ <MoneyFormat money={balance.totalBalanceInFiat} />
              </Text>
            )}
          </>
        ) : (
          <Skeleton w="20x" />
        )}
      </Box> */
}

export const WalletHeader: FC<Props> = () => {
  const t = useT();
  const totalBalance = useTotalBalance();

  return (
    <Box color="text" display="flex" alignItems="center" pb="5x" px="4x">
      <Box fontSize="medium" mr="4x">
        {t('Total balance')}:
      </Box>
      <Box display="flex" alignItems="center" gap="3x" mr="8x">
        {totalBalance?.USD ? (
          <>
            <Text as="div" variant="title">
              <AmountFormat money={totalBalance.USD} />
            </Text>
            <CurrencyBadge size="large" currency={totalBalance.USD.currency} />
          </>
        ) : (
          <Skeleton w="20x" />
        )}
      </Box>
      <Box display="flex" alignItems="center" gap="3x">
        {totalBalance?.BTC ? (
          <>
            <Text as="div" variant="title">
              <AmountFormat money={totalBalance.BTC} />
            </Text>
            <CurrencyBadge size="large" currency={totalBalance.BTC.currency} />
          </>
        ) : (
          <Skeleton w="20x" />
        )}
      </Box>
    </Box>
  );
};
