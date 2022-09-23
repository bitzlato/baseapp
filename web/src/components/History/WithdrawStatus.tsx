import { FC } from 'react';
import { Withdraw } from 'src/modules/user/history/types';
import { useT } from 'src/hooks/useT';
import { Text } from 'web/src/components/ui/Text';
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
        <Text color="warning">{t('page.body.history.withdraw.content.status.processing')}</Text>
      );

    case 'confirming':
      return (
        <ConfirmingStatus
          confirmations={item.confirmations ?? 0}
          minConfirmations={minConfirmations}
        />
      );

    case 'succeed':
      return <Text color="success">{t('page.body.history.withdraw.content.status.succeed')}</Text>;

    case 'skipped':
    case 'failed':
    case 'errored':
      return (
        <Text color="danger">
          {item.public_message || t(`page.body.history.withdraw.content.status.${item.state}`)}
        </Text>
      );

    case 'under_review':
      return (
        <Text color="warning">{t('page.body.history.withdraw.content.status.under_review')}</Text>
      );

    default:
      return (
        <Text color="secondary" textTransform="capitalize">
          {item.state}
        </Text>
      );
  }
};
