import * as React from 'react';
import { Box } from 'src/components/Box';
import { CurrencyTicker } from 'src/components/CurrencyTicker/CurrencyTicker';
import { Label } from 'src/components/Label/Label';
import { ccy, money, MoneyFormat } from 'src/components/MoneyFormat/MoneyFormat';
import { useT } from 'src/hooks/useT';
import { Wallet } from 'src/modules/user/wallets/types';
import { areEqualSelectedProps } from '../../../helpers/areEqualSelectedProps';

interface Props {
  wallet: Wallet;
}

const WalletBannerComponent: React.FC<Props> = ({ wallet }) => {
  const t = useT();

  const mccy = ccy(wallet.currency, wallet.fixed);

  return (
    <Box padding="2x" row spacing="4x" justifyCenter className="cr-wallet-banner-mobile">
      <Box col spacing="sm">
        <Label size="sm">{t('page.mobile.wallets.banner.locked')}</Label>
        <Box row wrap spacing="sm">
          <Label primaryColor>
            <MoneyFormat money={money(wallet.locked || 0, mccy)} />
          </Label>
          <Label primaryColor>
            <CurrencyTicker symbol={wallet.currency} />
          </Label>
        </Box>
      </Box>
      <Box col spacing="sm">
        <Label size="sm">{t('page.mobile.wallets.banner.available')}</Label>
        <Box row wrap spacing="sm">
          <Label primaryColor>
            <MoneyFormat money={money(wallet.balance || 0, mccy)} />
          </Label>
          <Label primaryColor>
            <CurrencyTicker symbol={wallet.currency} />
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
