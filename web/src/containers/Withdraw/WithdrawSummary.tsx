import * as React from 'react';
import { Money } from '@bitzlato/money-js';
import { Box } from 'src/components/Box';
import { AmountFormat } from 'src/components/AmountFormat/AmountFormat';
import { useT } from 'src/hooks/useT';
import { SummaryField } from '../../components';
import { Wallet } from '../../modules';
import { MoneyFormat } from 'src/components/MoneyFormat/MoneyFormat';

interface Props {
  wallet: Wallet;
  total: string;
}

export const WithdrawSummary: React.FC<Props> = ({ wallet, total }) => {
  const t = useT();

  return (
    <Box grow col spacing>
      <SummaryField message={t('page.body.wallets.tabs.withdraw.content.fee')}>
        <AmountFormat money={wallet.withdraw_fee} />
      </SummaryField>
      <SummaryField message={t('page.body.wallets.tabs.withdraw.content.total')}>
        <AmountFormat money={Money.fromDecimal(total ? total : 0, wallet.currency)} />
      </SummaryField>
      <SummaryField message={t('page.body.wallets.tabs.withdraw.content.min')}>
        <AmountFormat money={wallet.min_withdraw_amount} />
      </SummaryField>
      <SummaryField message={t('page.body.wallets.tabs.withdraw.content.limit24h')}>
        {wallet.limit_24_hour.isZero() ? (
          t('page.body.wallets.tabs.withdraw.content.unlimited')
        ) : (
          <MoneyFormat money={wallet.limit_24_hour} />
        )}
      </SummaryField>
      <SummaryField message={t('page.body.wallets.tabs.withdraw.content.limit1month')}>
        {wallet.limit_1_month.isZero() ? (
          t('page.body.wallets.tabs.withdraw.content.unlimited')
        ) : (
          <MoneyFormat money={wallet.limit_1_month} />
        )}
      </SummaryField>
    </Box>
  );
};
