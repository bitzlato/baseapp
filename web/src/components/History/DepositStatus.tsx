import * as React from 'react';
import { Deposit } from 'src/modules/user/history/types';
import { SucceedIcon } from '../../containers/Wallets/SucceedIcon';
import { useT } from 'src/hooks/useT';
import { ExternalLink } from './ExternalLink';
import { ConfirmingStatus } from './ConfirmingStatus';
import { PendingStatus } from './PendingStatus';
import { Box } from '../Box';
import { Label } from '../Label/Label';

interface Props {
  currency: string;
  item: Deposit;
}

export const DepositStatus: React.FC<Props> = ({ item, currency }) => {
  const t = useT();
  switch (item.state) {
    case 'dispatched':
      return (
        <Label successColor>
          <SucceedIcon />
        </Label>
      );
    case 'errored':
      return item.public_message ? (
        <Label failedColor>{item.public_message}</Label>
      ) : (
        <Label failedColor>{t('page.body.history.deposit.content.status.errored')}</Label>
      );
    case 'skipped':
      return <Label failedColor>{t('page.body.history.deposit.content.status.skipped')}</Label>;
    case 'rejected':
      return <Label failedColor>{t('page.body.history.deposit.content.status.canceled')}</Label>;
    case 'submitted':
      return <PendingStatus />;
    case 'invoiced':
      return item.transfer_links ? (
        <Box row spacing>
          {item.transfer_links.map((d) => (
            <ExternalLink key={d.title} href={d.url}>
              <Label warningColor>{d.title}</Label>
            </ExternalLink>
          ))}
        </Box>
      ) : (
        <Label warningColor>{t('page.body.wallets.table.invoiced')}</Label>
      );
    case 'canceled':
      return <Label failedColor>{t('page.body.history.deposit.content.status.canceled')}</Label>;
    case 'accepted':
      return (
        <ConfirmingStatus txid={item.txid} confirmations={item.confirmations} currency={currency} />
      );
    case 'refunding':
      return <Label warningColor>{t('page.body.history.deposit.content.status.refunding')}</Label>;
    default:
      return (
        <Label failedColor capitalize>
          {item.state}
        </Label>
      );
  }
};
