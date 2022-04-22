import { FC } from 'react';
import { useT } from 'src/hooks/useT';
import { Text } from 'web/src/components/ui/Text';

interface Props {
  confirmations: number;
  minConfirmations: number;
}

export const ConfirmingStatus: FC<Props> = ({ confirmations, minConfirmations }) => {
  const t = useT();
  return (
    <Text color="warning">
      {t('page.body.history.deposit.content.status.confirming')}{' '}
      {`${confirmations}/${minConfirmations}`}
    </Text>
  );
};
