import { FC, useMemo } from 'react';
import { Currency } from '@bitzlato/money-js';
import { Box } from 'web/src/components/Box';
import { useT } from 'web/src/hooks/useT';
import { createMoney } from 'web/src/helpers/money';
import { AmountFormat } from 'web/src/components/AmountFormat/AmountFormat';
import { NoAmountFormat } from 'web/src/components/Format/NoAmountFormat';
import { SummaryField } from 'web/src/components';
import { P2PWithdrawInfo } from 'web/src/modules/p2p/withdrawal';

interface Props {
  currency: Currency;
  total: string;
  info: P2PWithdrawInfo | undefined;
}

export const WithdrawP2PSummary: FC<Props> = ({ currency, total, info }) => {
  const t = useT();

  const displayFee = useMemo(() => {
    if (currency.code === 'BTC') {
      return info && info.fee !== undefined ? createMoney(info.fee, currency) : 'dynamic';
    }

    return info?.maxFee !== undefined ? createMoney(info.maxFee, currency) : undefined;
  }, [info, currency]);

  const summaryInfo = useMemo(() => {
    if (!info) {
      return null;
    }

    return {
      available: createMoney(info.available, currency),
      minValue: createMoney(info.min, currency),
      total: createMoney(total || 0, currency),
    };
  }, [currency, info, total]);

  const isDynamicFee = displayFee === 'dynamic';

  return (
    <Box flex="1" col spacing="sm">
      <SummaryField
        message={`${t('page.body.wallets.tabs.withdraw.content.fee')} (${t(
          'withdraw.will_deducted',
        )})`}
      >
        {isDynamicFee ? t('Dynamic') : <NoAmountFormat money={displayFee} />}
      </SummaryField>
      <SummaryField message={t('page.body.wallets.tabs.withdraw.content.total')}>
        {summaryInfo ? <AmountFormat money={summaryInfo.total} /> : null}
      </SummaryField>
      <SummaryField message={t('page.body.wallets.tabs.withdraw.content.min')}>
        {summaryInfo ? <AmountFormat money={summaryInfo.minValue} /> : null}
      </SummaryField>
      <SummaryField message={t('withdraw.available_balance')}>
        {summaryInfo ? <AmountFormat money={summaryInfo.available} /> : null}
      </SummaryField>
    </Box>
  );
};
