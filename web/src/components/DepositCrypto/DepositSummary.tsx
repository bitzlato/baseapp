import * as React from 'react';
import { WarningIcon } from 'src/mobile/assets/images/WarningIcon';
import { useT } from 'src/hooks/useT';
import { SummaryField } from '../SummaryField';
import { ccy, money, MoneyFormat } from '../MoneyFormat/MoneyFormat';
import { Currency } from 'src/modules/public/currencies/types';
import { Box } from '../Box';

interface Props {
  currency: Currency;
}

export const DepositSummary: React.FC<Props> = ({ currency }) => {
  const t = useT();

  const moneyCcy = ccy(currency.id, currency.precision);

  return (
    <Box col spacing>
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
      <Box row spacing alignStart>
        <Box selfStart>
          <WarningIcon />
        </Box>
        <Box warningColor>{t('page.body.wallets.tabs.deposit.ccy.message.warning')}</Box>
      </Box>
    </Box>
  );
};
