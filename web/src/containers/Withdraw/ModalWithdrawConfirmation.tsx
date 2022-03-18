/* eslint-disable react/destructuring-assignment */
import { FC } from 'react';
import { CurrencyTicker } from 'src/components/CurrencyTicker/CurrencyTicker';
import { createMoneyWithoutCcy } from 'src/helpers/money';
import { useT } from 'web/src/hooks/useT';
import { Modal2 } from 'web/src/components/Modal/Modal2';
import { Button } from 'web/src/components/ui/Button';
import { Box } from 'web/src/components/Box/Box';

interface Props {
  amount: string;
  currency: string;
  onSubmit: () => void;
  onDismiss: () => void;
  rid: string;
  show: boolean;
  precision: number;
}

export const ModalWithdrawConfirmation: FC<Props> = (props) => {
  const t = useT();

  return (
    <Modal2
      header={t('page.body.wallets.tabs.withdraw.modal.confirmation')}
      onClose={props.onDismiss}
      show={props.show}
    >
      <Box as="p" textAlign="center">
        {t('page.body.wallets.tabs.withdraw.modal.message1')}
        {createMoneyWithoutCcy(props.amount, props.precision).toFormat()}{' '}
        <CurrencyTicker symbol={props.currency} />
        {t('page.body.wallets.tabs.withdraw.modal.message2')} {props.rid}
      </Box>
      <Box row spacing="2">
        <Button fullWidth onClick={props.onDismiss} variant="outlined" color="secondary">
          {t('page.body.wallets.tabs.withdraw.modal.button.cancel')}
        </Button>
        <Button fullWidth onClick={props.onSubmit} color="primary" autoFocus>
          {t('page.body.wallets.tabs.withdraw.modal.button.withdraw')}
        </Button>
      </Box>
    </Modal2>
  );
};
