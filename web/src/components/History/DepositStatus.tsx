import * as React from 'react';
import { Deposit } from 'src/modules/user/history/types';
import { useT } from 'src/hooks/useT';
import { ExternalLink } from './ExternalLink';
import { ConfirmingStatus } from './ConfirmingStatus';
import { Label } from '../Label/Label';
import { join } from 'src/helpers/join';

interface Props {
  currency: string;
  item: Deposit;
}

export const DepositStatus: React.FC<Props> = ({ item, currency }) => {
  const t = useT();

  switch (item.state) {
    case 'dispatched':
      return <Label successColor>{t('page.body.history.deposit.content.status.confirmed')}</Label>;

    case 'errored':
      return (
        <Label failedColor>
          {item.public_message || t('page.body.history.deposit.content.status.errored')}
        </Label>
      );

    case 'skipped':
      return <Label failedColor>{t('page.body.history.deposit.content.status.skipped')}</Label>;

    case 'rejected':
      return <Label failedColor>{t('page.body.history.deposit.content.status.canceled')}</Label>;

    case 'canceled':
      return <Label failedColor>{t('page.body.history.deposit.content.status.canceled')}</Label>;

    case 'submitted':
      return <Label warningColor>{t('page.body.history.deposit.content.status.confirming')}</Label>;

    case 'invoiced':
      return item.transfer_links ? (
        <>
          <Label key="label" warningColor>
            {t('page.body.history.deposit.content.status.wait_payment')}{' '}
          </Label>
          {join(
            item.transfer_links.map((d) => (
              <ExternalLink key={d.title} href={d.url}>
                {d.title}
              </ExternalLink>
            )),
            <Label key="sep" secondaryColor>
              <span> / </span>
            </Label>,
          )}
        </>
      ) : (
        <Label warningColor>{t('page.body.wallets.table.invoiced')}</Label>
      );

    case 'accepted':
      return (
        <ConfirmingStatus txid={item.txid} confirmations={item.confirmations} currency={currency} />
      );

    case 'refunding':
      return <Label warningColor>{t('page.body.history.deposit.content.status.refunding')}</Label>;

    default:
      return (
        <Label secondaryColor capitalize>
          {item.state}
        </Label>
      );
  }
};
