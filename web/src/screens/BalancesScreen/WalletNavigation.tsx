import { FC } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Balance } from 'web/src/types/balances.types';
import { useT } from 'web/src/hooks/useT';
import {
  SECTION_DEPOSIT,
  SECTION_GIFT,
  SECTION_RATE,
  SECTION_TRANSFER,
  SECTION_WITHDRAW,
} from 'web/src/screens/BalancesScreen/sections';
import { showGift } from 'web/src/api/config';
import { WalletNavigationItem } from './WalletNavigationItem';

interface Props {
  balance?: Balance | undefined;
  section?: string | undefined;
}

export const WalletNavigation: FC<Props> = ({ section, balance }) => {
  const t = useT();
  const isGiftEnabled = showGift();

  return (
    <Box display="flex" justifyContent="flex-end" gap="4x">
      <WalletNavigationItem
        to={`/balances/${balance?.cryptoCurrency.code}/${SECTION_DEPOSIT}`}
        active={!section || section === SECTION_DEPOSIT}
        disabled={!balance}
      >
        {t('Deposit.noun')}
      </WalletNavigationItem>

      <WalletNavigationItem
        to={`/balances/${balance?.cryptoCurrency.code}/${SECTION_WITHDRAW}`}
        active={section === SECTION_WITHDRAW}
        disabled={!balance}
      >
        {t('Withdraw.noun')}
      </WalletNavigationItem>

      <WalletNavigationItem
        to={`/balances/${balance?.cryptoCurrency.code}/${SECTION_TRANSFER}`}
        active={section === SECTION_TRANSFER}
        disabled={!balance || !balance.features.transfer}
      >
        {t('Transfer.noun')}
      </WalletNavigationItem>

      <WalletNavigationItem
        to={`/balances/${balance?.cryptoCurrency.code}/${SECTION_GIFT}`}
        active={section === SECTION_GIFT}
        disabled={!balance || !isGiftEnabled || !balance.features.gift}
      >
        {t('Gifts')}
      </WalletNavigationItem>

      <WalletNavigationItem
        to={`/balances/${balance?.cryptoCurrency.code}/${SECTION_RATE}`}
        active={section === SECTION_RATE}
        disabled={!balance || !balance.features.changeRate}
      >
        {t('Rate')}
      </WalletNavigationItem>
    </Box>
  );
};
