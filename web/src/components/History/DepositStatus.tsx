import * as React from 'react';
import { Deposit } from 'src/modules/user/history/types';
import { Status } from './Status';
import { SucceedIcon } from '../../containers/Wallets/SucceedIcon';
import { useT } from 'src/hooks/useT';
import { ExternalLink } from './ExternalLink';
import { ConfirmingStatus } from './ConfirmingStatus';
import { PendingStatus } from './PendingStatus';

interface Props {
  currency: string;
  item: Deposit;
}

export const DepositStatus: React.FC<Props> = ({ item, currency }) => {
  const t = useT();
  switch (item.state) {
    case 'dispatched':
      return (
        <Status type="success">
          <SucceedIcon />
        </Status>
      );
    case 'errored':
      return item.public_message ? (
        <Status type="failed">{item.public_message}</Status>
      ) : (
        <Status type="failed">{t('page.body.history.deposit.content.status.errored')}</Status>
      );
    case 'skipped':
      return <Status type="failed">{t('page.body.history.deposit.content.status.skipped')}</Status>;
    case 'rejected':
      return (
        <Status type="failed">{t('page.body.history.deposit.content.status.canceled')}</Status>
      );
    case 'submitted':
      return <PendingStatus />;
    case 'invoiced':
      return item.transfer_links ? (
        <div className="cr-row-spacing">
          {item.transfer_links.map((d) => (
            <ExternalLink key={d.title} href={d.url}>
              <Status type="pending">{d.title}</Status>
            </ExternalLink>
          ))}
        </div>
      ) : (
        <Status type="pending">{t('page.body.wallets.table.invoiced')}</Status>
      );
    case 'canceled':
      return (
        <Status type="failed">{t('page.body.history.deposit.content.status.canceled')}</Status>
      );
    case 'accepted':
      return (
        <ConfirmingStatus txid={item.txid} confirmations={item.confirmations} currency={currency} />
      );
    case 'refunding':
      return (
        <Status type="pending">{t('page.body.history.deposit.content.status.refunding')}</Status>
      );
    default:
      return (
        <Status type="failed" style={{ textTransform: 'capitalize' }}>
          {item.state}
        </Status>
      );
  }
};
