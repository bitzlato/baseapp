import * as React from 'react';
import { Box } from 'src/components/Box';
import { CurrencyTicker } from 'src/components/CurrencyTicker/CurrencyTicker';
import { Label } from 'src/components/Label/Label';
import { AmountFormat } from 'src/components/AmountFormat/AmountFormat';
import { useT } from 'src/hooks/useT';
import { Wallet } from 'src/modules/user/wallets/types';
import { areEqualSelectedProps } from '../../../helpers/areEqualSelectedProps';
import { createMoney } from 'src/helpers/money';

interface Props {
  wallet: Wallet;
}

const WalletBannerComponent: React.FC<Props> = ({ wallet }) => {
  const zeroMoney = createMoney(0, wallet.currency);
  const t = useT();

  return (
    <Box padding="2x" row spacing="4x" justifyCenter className="cr-wallet-banner-mobile">
      <Box col spacing="sm">
        <Label size="sm">{t('page.mobile.wallets.banner.locked')}</Label>
        <Box row wrap spacing="sm">
          <Label color="primary">
            <AmountFormat money={wallet.locked ?? zeroMoney} />
          </Label>
          <Label color="primary">
            <CurrencyTicker symbol={wallet.currency.code} />
          </Label>
        </Box>
      </Box>
      <Box col spacing="sm">
        <Label size="sm">{t('page.mobile.wallets.banner.available')}</Label>
        <Box row wrap spacing="sm">
          <Label color="primary">
            <AmountFormat money={wallet.balance ?? zeroMoney} />
          </Label>
          <Label color="primary">
            <CurrencyTicker symbol={wallet.currency.code} />
          </Label>
        </Box>
      </Box>
    </Box>
  );
};

export const WalletBanner = React.memo(
  WalletBannerComponent,
  areEqualSelectedProps('wallet', ['balance', 'locked', 'currency', 'fixed']),
);
