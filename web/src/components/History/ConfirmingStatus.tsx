import { FC } from 'react';
import { useT } from 'src/hooks/useT';
import { Label } from '../Label';

interface Props {
  confirmations: number;
  minConfirmations: number;
}

export const ConfirmingStatus: FC<Props> = ({ confirmations, minConfirmations }) => {
  const t = useT();
  return (
    <Label color="warning">
      {t('page.body.history.deposit.content.status.confirming')}{' '}
      {`${confirmations}/${minConfirmations}`}
    </Label>
  );
};
