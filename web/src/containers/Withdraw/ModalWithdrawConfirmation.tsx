import { FC } from 'react';
import { CurrencyTicker } from 'src/components/CurrencyTicker/CurrencyTicker';
import { createMoneyWithoutCcy } from 'src/helpers/money';
import { useT } from 'web/src/hooks/useT';
import { Modal2 } from 'web/src/components/Modal/Modal2';
import { Button } from 'web/src/components/ui/Button';
import { Box } from 'web/src/components/Box/Box';

interface Props {
  amount: string;
  total: string;
  currency: string;
  rid: string;
  show: boolean;
  precision: number;
  onSubmit: () => void;
  onDismiss: () => void;
}

export const ModalWithdrawConfirmation: FC<Props> = ({
  amount,
  total,
  currency,
  precision,
  rid,
  show,
  onSubmit,
  onDismiss,
}) => {
  const t = useT();

  return (
    <Modal2
      header={t('page.body.wallets.tabs.withdraw.modal.confirmation')}
      onClose={onDismiss}
      show={show}
    >
      <Box as="p" textAlign="center">
        {t('page.body.wallets.tabs.withdraw.modal.message1')}
        {createMoneyWithoutCcy(amount, precision).toFormat()} <CurrencyTicker symbol={currency} />
        {t('page.body.wallets.tabs.withdraw.modal.message2')} {rid}.<br />
        {t('page.body.wallets.tabs.withdraw.modal.message3')}:{' '}
        {createMoneyWithoutCcy(total, precision).toFormat()} <CurrencyTicker symbol={currency} />
      </Box>
      <Box row spacing="2">
        <Button fullWidth onClick={onDismiss} variant="outlined" color="secondary">
          {t('page.body.wallets.tabs.withdraw.modal.button.cancel')}
        </Button>
        <Button fullWidth onClick={onSubmit} color="primary" autoFocus>
          {t('page.body.wallets.tabs.withdraw.modal.button.withdraw')}
        </Button>
      </Box>
    </Modal2>
  );
};
