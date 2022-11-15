import { FC } from 'react';
import { useT } from 'src/hooks/useT';
import { Text } from 'web/src/components/ui/Text';

export const ConfirmingStatus: FC = () => {
  const t = useT();

  return <Text color="warning">{t('page.body.history.deposit.content.status.confirming')}</Text>;
};
