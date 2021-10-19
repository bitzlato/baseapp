import * as React from 'react';
import { WarningIcon } from 'src/mobile/assets/images/WarningIcon';
import { useT } from 'src/hooks/useT';
import { SummaryField } from '../SummaryField';
import { ccy, money, MoneyFormat } from '../MoneyFormat/MoneyFormat';
import { Currency } from 'src/modules/public/currencies/types';
import { Box } from '../Box';
import { Label } from '../Label';

interface Props {
  currency: Currency;
  showWarning?: boolean;
}

export const DepositSummary: React.FC<Props> = ({ currency, showWarning }) => {
  const t = useT();

  const moneyCcy = ccy(currency.id, currency.precision);

  return (
    <Box grow col spacing>
      <SummaryField message={t('page.body.wallets.tabs.deposit.ccy.message.fee')}>
        {Number(currency.deposit_fee) == 0 ? (
          t('page.body.wallets.tabs.deposit.ccy.message.fee.free')
        ) : (
          <MoneyFormat money={money(currency.deposit_fee, moneyCcy)} />
        )}
      </SummaryField>
      <SummaryField message={t('page.body.wallets.tabs.deposit.ccy.message.minimum')}>
        <MoneyFormat money={money(currency.min_deposit_amount, moneyCcy)} />
      </SummaryField>
      {showWarning && (
        <Box row spacing alignStart>
          <Box selfStart>
            <WarningIcon />
          </Box>
          <Label warningColor>{t('page.body.wallets.tabs.deposit.ccy.message.warning')}</Label>
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
