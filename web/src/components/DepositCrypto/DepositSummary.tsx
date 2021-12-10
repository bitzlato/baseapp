import * as React from 'react';
import { WarningIcon } from 'src/mobile/assets/images/WarningIcon';
import { useT } from 'src/hooks/useT';
import { SummaryField } from 'src/components/SummaryField';
import { AmountFormat } from 'src/components/AmountFormat/AmountFormat';
import { ApiCurrency } from 'src/modules/public/currencies/types';
import { Box } from 'src/components/Box';
import { Label } from 'src/components/Label';

interface Props {
  currency: ApiCurrency;
  showWarning?: boolean;
}

export const DepositSummary: React.FC<Props> = ({ currency, showWarning }) => {
  const t = useT();

  return (
    <Box grow col spacing>
      <SummaryField message={t('page.body.wallets.tabs.deposit.ccy.message.fee')}>
        {currency.deposit_fee.isZero() ? (
          t('page.body.wallets.tabs.deposit.ccy.message.fee.free')
        ) : (
          <AmountFormat money={currency.deposit_fee} />
        )}
      </SummaryField>
      <SummaryField message={t('page.body.wallets.tabs.deposit.ccy.message.minimum')}>
        <AmountFormat money={currency.min_deposit_amount} />
      </SummaryField>
      {showWarning && (
        <Box row spacing alignStart>
          <Box selfStart>
            <WarningIcon />
          </Box>
          <Label color="warning">{t('page.body.wallets.tabs.deposit.ccy.message.warning')}</Label>
        </Box>
      )}
      {process.env.REACT_APP_RELEASE_STAGE === 'sandbox' && (
        <span>
          <span>You can top up your balance by address </span>
          {currency.id === 'eth' && (
            <a href="https://faucet.ropsten.be/" target="_blank" rel="noopener noreferrer">
              faucet.ropsten.be/
            </a>
          )}
          {currency.id === 'bnb' && (
            <a
              href="https://testnet.binance.org/faucet-smart"
              target="_blank"
              rel="noopener noreferrer"
            >
              testnet.binance.org/faucet-smart
            </a>
          )}
        </span>
      )}
    </Box>
  );
};
