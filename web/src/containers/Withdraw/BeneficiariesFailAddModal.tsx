import { FC, memo } from 'react';
import { Link } from 'react-router-dom';
import { useT } from 'web/src/hooks/useT';
import { Modal, ModalHeader } from 'web/src/components/ui/Modal';
import { Text } from 'web/src/components/ui/Text';
import { Box } from 'web/src/components/ui/Box';
import { Button } from 'web/src/components/ui/Button';

interface Props {
  show: boolean;
  handleToggleFailModal: () => void;
}

const BeneficiariesFailAddModalComponent: FC<Props> = ({ show, handleToggleFailModal }: Props) => {
  const t = useT();

  return (
    <Modal size="lg" show={show} onClose={handleToggleFailModal}>
      <ModalHeader>{t('page.body.wallets.beneficiaries.failAddModal.header')}</ModalHeader>
      <Box
        fontSize="medium"
        mx="6x"
        py="4x"
        borderTopWidth="1x"
        borderColor="modalHeaderBorderBottom"
        borderTopStyle="solid"
      >
        <Text>{t('page.body.wallets.beneficiaries.failAddModal.content')}</Text>
        <Box mt="6x">
          <Link to="/confirm">
            <Button color="primary" fullWidth>
              {t('page.body.wallets.beneficiaries.failAddModal.button')}
            </Button>
          </Link>
        </Box>
      </Box>
    </Modal>
  );
};

const BeneficiariesFailAddModal = memo(BeneficiariesFailAddModalComponent);

export { BeneficiariesFailAddModal };
