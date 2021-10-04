import * as React from 'react';
import cn from 'classnames';
import { WarningIcon } from 'src/mobile/assets/images/WarningIcon';
import { useT } from 'src/hooks/useT';
import { SummaryField } from '../SummaryField';
import { ccy, money, MoneyFormat } from '../MoneyFormat/MoneyFormat';
import { Currency } from 'src/modules/public/currencies/types';

interface Props {
  currency: Currency;
}

export const DepositSummary: React.FC<Props> = ({ currency }) => {
  const t = useT();

  const moneyCcy = ccy(currency.id, currency.precision);

  return (
    <div className="cr-col cr-col-spacing">
      <SummaryField message={t('page.body.wallets.tabs.deposit.ccy.message.fee')}>
        <MoneyFormat money={money(currency.deposit_fee, moneyCcy)} />
      </SummaryField>
      <SummaryField message={t('page.body.wallets.tabs.deposit.ccy.message.minimum')}>
        <MoneyFormat money={money(currency.min_deposit_amount, moneyCcy)} />
      </SummaryField>
      <div className="cr-row cr-row-spacing cr-align-start">
        <WarningIcon className="cr-self-start" />
        <div className="cr-warning-text">
          <div>{t('page.body.wallets.tabs.deposit.ccy.message.warning')}</div>
        </div>
      </div>
    </div>
  );
};
