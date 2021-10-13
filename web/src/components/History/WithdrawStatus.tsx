import * as React from 'react';
import { Withdraw } from 'src/modules/user/history/types';
import { Label } from '../Label';
import { useT } from 'src/hooks/useT';
import { BlockchainLink } from './ExternalLink';
import { ConfirmingStatus } from './ConfirmingStatus';
import { PendingStatus } from './PendingStatus';
import { SucceedIcon } from 'src/assets/icons/SucceedIcon';

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
      return <PendingStatus />;
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
          <Label successColor>
            <SucceedIcon />
          </Label>
        </BlockchainLink>
      );
    case 'skipped':
    case 'failed':
    case 'errored':
      return item.public_message ? (
        <Label failedColor>{item.public_message}</Label>
      ) : (
        <Label failedColor>{t(`page.body.history.withdraw.content.status.${item.state}`)}</Label>
      );
    case 'under_review':
      return (
        <Label failedColor>{t('page.body.history.withdraw.content.status.under_review')}</Label>
      );
    default:
      return (
        <Label failedColor capitalize>
          {item.state}
        </Label>
      );
  }
};
