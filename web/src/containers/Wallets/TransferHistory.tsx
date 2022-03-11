import { useMemo } from 'react';
import { Currency } from '@bitzlato/money-js';
import { useT } from 'src/hooks/useT';
import { Table } from 'src/components';
import { Box } from 'src/components/ui/Box';
import { TransferRecord } from 'src/modules/account/types';
import { createMoney } from 'src/helpers/money';
import { localeDate } from 'src/helpers/localeDate';
import { MoneyFormat } from 'src/components/MoneyFormat/MoneyFormat';
import { accountUrl } from 'src/api/config';
import { Wallet } from 'src/modules/user/wallets/types';
import { DEFAULT_CURRENCY } from 'src/modules/public/currencies/defaults';
import s from './TransferHistory.postcss';
import { useFetch } from 'web/src/hooks/data/useFetch';
import { fetchWithCreds } from 'web/src/helpers/fetch';
import { Spinner } from 'web/src/components/ui/Spinner';
import cn from 'classnames';

interface Props {
  currency?: Currency | undefined;
  wallets?: Wallet[] | undefined;
  className?: string;
  size?: 'small' | 'large' | undefined;
}

export const TransferHistory: React.FC<Props> = ({ currency, wallets, className, size }) => {
  const t = useT();
  const transfersResponse = useFetch<TransferRecord[]>(`${accountUrl()}/transfers`, fetchWithCreds);

  const header = useMemo(
    () => [t('Date'), t('Status'), t('Transfer from'), t('Transfer to'), t('Amount')],
    [],
  );

  const tableData = (transfersResponse.data ?? [])
    .filter((d) => (currency ? d.currency_id === currency.code : true))
    .map((d) => {
      const money = createMoney(
        d.amount,
        currency ?? wallets?.find((w) => d.currency_id === w.currency.code) ?? DEFAULT_CURRENCY,
      );
      const textColor =
        d.public_state === 'transfered'
          ? 'success'
          : d.public_state === 'canceled'
          ? 'danger'
          : d.public_state === 'processing'
          ? 'warning'
          : 'secondary';
      return [
        <div title={`#${d.id}`}>{localeDate(d.created_at, 'fullDate')}</div>,
        <Box color={textColor}>{t(`page.body.wallets.transfers.state.${d.public_state}`)}</Box>,
        t(d.source),
        t(d.destination),
        <MoneyFormat money={money} />,
      ];
    });

  const isLoading = transfersResponse.data === undefined;
  const hasData = tableData.length > 0;

  if (isLoading || !hasData) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        color="secondary"
        className={cn(className, size === 'small' ? s.small : s.large)}
      >
        <Box display="flex" alignItems="center" mb="3x">
          {isLoading && <Spinner />}
          {!hasData && !isLoading ? t('page.noDataToShow') : null}
        </Box>
      </Box>
    );
  }
  return (
    <>
      {currency ? <h4>{t('Transfer History')}</h4> : null}
      <Table tableClassName={s.transferHistory} header={header} data={tableData} />
    </>
  );
};
