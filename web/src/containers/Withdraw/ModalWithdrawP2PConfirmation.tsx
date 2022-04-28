import { FC } from 'react';
import { Currency } from '@bitzlato/money-js';
import { createMoney } from 'src/helpers/money';
import { useT } from 'web/src/hooks/useT';
import { Button } from 'web/src/components/ui/Button';
import { Box } from 'web/src/components/ui/Box';
import { Modal, ModalHeader } from 'web/src/components/ui/Modal';
import { MoneyFormat } from 'web/src/components/MoneyFormat/MoneyFormat';

interface Props {
  show: boolean;
  amount: string;
  currency: Currency;
  address: string;
  onSubmit: () => void;
  onDismiss: () => void;
}

export const ModalWithdrawP2PConfirmation: FC<Props> = ({
  show,
  amount,
  currency,
  address,
  onSubmit,
  onDismiss,
}) => {
  const t = useT();

  return (
    <Modal size="lg" show={show} onClose={onDismiss}>
      <ModalHeader>{t('page.body.wallets.tabs.withdraw')}</ModalHeader>

      <Box
        fontSize="medium"
        mx="6x"
        py="4x"
        borderTopWidth="1x"
        borderColor="modalHeaderBorderBottom"
        borderTopStyle="solid"
      >
        <Box as="p" textAlign="center">
          {t('withdraw.confirmation', {
            money: <MoneyFormat money={createMoney(amount, currency)} />,
            address,
          })}
        </Box>
        <Box as="p" textAlign="center">
          {t('withdraw.irreversible')}
        </Box>
        <Box display="flex" justifyContent="space-between" mt="4x">
          <Button fullWidth onClick={onDismiss} variant="outlined" color="secondary">
            {t('Cancel')}
          </Button>
          <Box w="4x" flexShrink={0} />
          <Button fullWidth onClick={onSubmit} color="primary" autoFocus>
            {t('OK')}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
