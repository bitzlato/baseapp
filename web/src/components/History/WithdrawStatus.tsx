import * as React from 'react';
import { Withdraw } from 'src/modules/user/history/types';
import { Label } from '../Label';
import { useT } from 'src/hooks/useT';
import { BlockchainLink } from './ExternalLink';
import { ConfirmingStatus } from './ConfirmingStatus';

interface Props {
  currency: string;
  item: Withdraw;
}

export const WithdrawStatus: React.FC<Props> = ({ item, currency }) => {
  const t = useT();

  switch (item.state) {
    case 'prepared':
    case 'accepted':
    case 'processing':
    case 'transfering':
      return (
        <Label color="warning">{t('page.body.history.withdraw.content.status.processing')}</Label>
      );

    case 'confirming':
      return (
        <ConfirmingStatus
          currency={currency}
          txid={item.blockchain_txid}
          confirmations={item.confirmations}
        />
      );

    case 'succeed':
      return (
        <BlockchainLink txid={item.blockchain_txid} currency={currency}>
          <Label color="success">{t('page.body.history.withdraw.content.status.succeed')}</Label>
        </BlockchainLink>
      );

    case 'skipped':
    case 'failed':
    case 'errored':
      return (
        <Label color="failed">
          {item.public_message || t(`page.body.history.withdraw.content.status.${item.state}`)}
        </Label>
      );

    case 'under_review':
      return (
        <Label color="warning">{t('page.body.history.withdraw.content.status.under_review')}</Label>
      );

    default:
      return (
        <Label color="secondary" capitalize>
          {item.state}
        </Label>
      );
  }
};
