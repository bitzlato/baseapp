import { useEffect, useState } from 'react';
import { Modal, ModalHeader } from 'web/src/components/ui/Modal';
import { Box } from 'web/src/components/ui/Box';
import { Button } from 'web/src/components/ui/Button';
import { TextInput } from 'web/src/components/Input/TextInput';
import { useT } from 'web/src/hooks/useT';
import { isValidAddress } from 'web/src/helpers/validateBeneficiaryAddress';

export type AddNotebookAddressValues = {
  name: string;
  address: string;
  blockchainId?: number | undefined;
};

interface Props {
  show: boolean;
  currencyCode: string;
  blockchainId?: number | undefined;
  validatorKey?: string | undefined;
  onClose: () => void;
  onSubmit: (values: AddNotebookAddressValues) => void;
}

export const AddressNotebookAddModal: React.FC<Props> = ({
  show,
  currencyCode,
  blockchainId,
  validatorKey,
  onClose,
  onSubmit,
}) => {
  const t = useT();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [addressError, setAddressError] = useState<string | null>(null);

  const isDisabled = !address || !name;

  const validateAddress = (value: string) => {
    if (!value) {
      setAddressError(null);
      return;
    }

    const valid = isValidAddress(value, validatorKey ?? currencyCode);
    const validTestnet = isValidAddress(value, validatorKey ?? currencyCode, 'testnet');
    setAddressError(valid || validTestnet ? null : t('address.invalid'));
  };

  useEffect(() => {
    validateAddress(address);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  const handleChangeAddress = (value: string) => {
    setAddress(value);
  };

  const handleChangeDescription = (value: string) => {
    setName(value);
  };

  const handleSubmit = () => {
    onSubmit({ address, name, blockchainId });
    setName('');
    setAddress('');
    setAddressError(null);
  };

  return (
    <Modal size="lg" show={show} onClose={onClose}>
      <ModalHeader>{t('page.body.wallets.beneficiaries.addAddressModal.header')}</ModalHeader>
      <Box
        mx="6x"
        py="4x"
        borderTopWidth="1x"
        borderColor="modalHeaderBorderBottom"
        borderTopStyle="solid"
      >
        <Box
          as={TextInput}
          fontSize="caption"
          mb="5x"
          label={t('page.body.wallets.beneficiaries.addAddressModal.body.coinBeneficiaryName')}
          autoComplete="chrome-off"
          value={name}
          onChange={handleChangeDescription}
        />

        <Box
          as={TextInput}
          fontSize="caption"
          mb="5x"
          label={t('page.body.wallets.beneficiaries.addAddressModal.body.coinAddress')}
          autoComplete="chrome-off"
          value={address}
          onChange={handleChangeAddress}
          error={addressError}
        />

        <Button fullWidth disabled={isDisabled} onClick={handleSubmit}>
          {t('page.body.wallets.beneficiaries.addAddressModal.body.button')}
        </Button>
      </Box>
    </Modal>
  );
};
