import { FC } from 'react';
import { Withdraw } from 'src/modules/user/history/types';
import { Label } from '../Label';
import { useT } from 'src/hooks/useT';
import { ConfirmingStatus } from './ConfirmingStatus';

interface Props {
  item: Withdraw;
  minConfirmations: number;
}

export const WithdrawStatus: FC<Props> = ({ item, minConfirmations }) => {
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
        <ConfirmingStatus confirmations={item.confirmations} minConfirmations={minConfirmations} />
      );

    case 'succeed':
      return (
        <Label color="success">{t('page.body.history.withdraw.content.status.succeed')}</Label>
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
        <Label color="secondary" tr="capitalize">
          {item.state}
        </Label>
      );
  }
};
