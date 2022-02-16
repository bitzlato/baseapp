import { useMemo } from 'react';
import { Currency } from '@bitzlato/money-js';
import { useT } from 'src/hooks/useT';
import { useAlert } from 'src/hooks/useAlert';
import { Table } from 'src/components';
import { Box } from 'src/components/Box';
import { TransferRecord } from 'src/modules/account/types';
import { useFetch } from 'src/hooks/useFetch';
import { createMoney } from 'src/helpers/money';
import { localeDate } from 'src/helpers/localeDate';
import { MoneyFormat } from 'src/components/MoneyFormat/MoneyFormat';
import { accountUrl } from 'src/api/config';
import { Wallet } from 'src/modules/user/wallets/types';
import { DEFAULT_CURRENCY } from 'src/modules/public/currencies/defaults';
import { TextColor } from 'src/components/Box/Box';
import s from './TransferHistory.postcss';

interface Props {
  currency?: Currency | undefined;
  wallets?: Wallet[] | undefined;
  transfers?: number | undefined;
  className?: string;
  noDataToDisplay?: React.ReactElement
}

export const TransferHistory: React.FC<Props> = ({ currency, wallets, transfers, className, noDataToDisplay }) => {
  const t = useT();

  const { data = [], error } = useFetch<TransferRecord[]>(
    `${accountUrl()}/transfers`,
    {
      credentials: 'include',
    },
    [transfers],
  );

  useAlert(error);

  const header = useMemo(
    () => [t('Date'), t('Status'), t('Transfer from'), t('Transfer to'), t('Amount')],
    [],
  );

  const tableData = data
    .filter((d) => (currency ? d.currency_id === currency.code : true))
    .map((d) => {
      const money = createMoney(
        d.amount,
        currency ?? wallets?.find((w) => d.currency_id === w.currency.code) ?? DEFAULT_CURRENCY,
      );
      const textColor: TextColor =
        d.public_state === 'transfered'
          ? 'success'
          : d.public_state === 'canceled'
          ? 'failed'
          : d.public_state === 'processing'
          ? 'warning'
          : 'secondary';
      return [
        <div title={`#${d.id}`}>{localeDate(d.created_at, 'fullDate')}</div>,
        <Box textColor={textColor}>
          {t(`page.body.wallets.transfers.state.${d.public_state}`)}
        </Box>,
        t(d.source),
        t(d.destination),
        <MoneyFormat money={money} />,
      ];
    });

  if (!tableData.length) {
    return noDataToDisplay ? noDataToDisplay : null;
  }

  return (
    <Box col className={className}>
      {currency ? <h4>{t('Transfer History')}</h4> : null}
      <Table tableClassName={s.transferHistory} header={header} data={tableData} />
    </Box>
  );
};
