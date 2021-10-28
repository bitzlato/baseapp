import { Money } from '@bitzlato/money-js';
import * as React from 'react';
import { Box } from 'src/components/Box';
import { MoneyFormat } from 'src/components/MoneyFormat/MoneyFormat';
import { useT } from 'src/hooks/useT';
import { SummaryField } from '../../components';
import { Currency } from '../../modules';

interface Props {
  currency: Currency;
  total: string;
}

export const WithdrawSummary: React.FC<Props> = ({ currency, total }) => {
  const t = useT();

  return (
    <Box grow col spacing>
      <SummaryField message={t('page.body.wallets.tabs.withdraw.content.fee')}>
        <MoneyFormat money={currency.withdraw_fee} />
      </SummaryField>
      <SummaryField message={t('page.body.wallets.tabs.withdraw.content.total')}>
        <MoneyFormat money={Money.fromDecimal(total ? total : 0, currency)} />
      </SummaryField>
      <SummaryField message={t('page.body.wallets.tabs.withdraw.content.min')}>
        <MoneyFormat money={currency.min_withdraw_amount} />
      </SummaryField>
      <SummaryField message={t('page.body.wallets.tabs.withdraw.content.limit24h')}>
        <MoneyFormat money={currency.withdraw_limit_24h} />
      </SummaryField>
      <SummaryField message={t('page.body.wallets.tabs.withdraw.content.limit72h')}>
        <MoneyFormat money={currency.withdraw_limit_72h} />
      </SummaryField>
    </Box>
  );
};
