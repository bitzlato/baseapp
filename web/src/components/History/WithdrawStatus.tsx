import * as React from 'react';
import { Withdraw } from 'src/modules/user/history/types';
import { Status } from './Status';
import { useT } from 'src/hooks/useT';
import { BlockchainLink } from './ExternalLink';
import { ConfirmingStatus } from './ConfirmingStatus';
import { PendingStatus } from './PendingStatus';
import { SucceedIcon } from '../../containers/Wallets/SucceedIcon';

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
          <Status type="success">
            <SucceedIcon />
          </Status>
        </BlockchainLink>
      );
    case 'skipped':
    case 'failed':
    case 'errored':
      return item.public_message ? (
        <Status type="failed">{item.public_message}</Status>
      ) : (
        <Status type="failed">
          {t(`page.body.history.withdraw.content.status.${item.state}`)}
        </Status>
      );
    case 'under_review':
      return (
        <Status type="failed">{t('page.body.history.withdraw.content.status.under_review')}</Status>
      );
    default:
      return (
        <Status type="failed" style={{ textTransform: 'capitalize' }}>
          {item.state}
        </Status>
      );
  }
};
