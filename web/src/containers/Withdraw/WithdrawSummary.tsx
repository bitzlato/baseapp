import * as React from 'react';
import { Box } from 'src/components/Box';
import { ccy, money, MoneyFormat } from 'src/components/MoneyFormat/MoneyFormat';
import { useT } from 'src/hooks/useT';
import { SummaryField } from '../../components';
import { Currency } from '../../modules';

interface Props {
  currency: Currency;
  total: string;
}

export const WithdrawSummary: React.FC<Props> = ({ currency, total }) => {
  const t = useT();

  const mccy = ccy(currency.id, currency.precision);

  return (
    <Box grow col spacing>
      <SummaryField message={t('page.body.wallets.tabs.withdraw.content.fee')}>
        <MoneyFormat money={money(currency.withdraw_fee, mccy)} />
      </SummaryField>
      <SummaryField message={t('page.body.wallets.tabs.withdraw.content.total')}>
        <MoneyFormat money={money(total ? total : 0, mccy)} />
      </SummaryField>
      <SummaryField message={t('page.body.wallets.tabs.withdraw.content.min')}>
        <MoneyFormat money={money(currency.min_withdraw_amount, mccy)} />
      </SummaryField>
      <SummaryField message={t('page.body.wallets.tabs.withdraw.content.limit24h')}>
        <MoneyFormat money={money(currency.withdraw_limit_24h, mccy)} />
      </SummaryField>
      <SummaryField message={t('page.body.wallets.tabs.withdraw.content.limit72h')}>
        <MoneyFormat money={money(currency.withdraw_limit_72h, mccy)} />
      </SummaryField>
    </Box>
  );
};
