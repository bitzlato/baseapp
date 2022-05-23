import { FC, memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isValidAddress } from 'src/helpers/validateBeneficiaryAddress';
import { useT } from 'src/hooks/useT';
import { alertPush, beneficiariesCreate, selectBeneficiariesCreateError } from 'src/modules';
import { Blockchain } from 'src/modules/public/blockchains/types';
import { getCurrencyCodeSymbol } from 'src/helpers/getCurrencySymbol';
import { Modal, ModalHeader } from 'web/src/components/ui/Modal';
import { Box } from 'web/src/components/ui/Box';
import { Button } from 'web/src/components/ui/Button';
import { TextInput } from 'web/src/components/Input/TextInput';
import { Select } from 'web/src/components/Select/Select';
import { CryptoCurrencyIcon } from 'web/src/components/CryptoCurrencyIcon/CryptoCurrencyIcon';

interface Props {
  show: boolean;
  blockchains: Blockchain[];
  currencyCode: string;
  onClose: () => void;
}

const getOptionValue = (option: Blockchain) => option.key;

const BeneficiariesAddModalComponent: FC<Props> = ({
  show,
  blockchains,
  currencyCode,
  onClose,
}) => {
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [destinationTag, setDestinationTag] = useState('');
  const [blockchain, setBlockchain] = useState<Blockchain | null>(null);

  const t = useT();
  const dispatch = useDispatch();

  const beneficiariesAddError = useSelector(selectBeneficiariesCreateError);
  const isRipple = currencyCode === 'XRP';

  const handleClearModalsInputs = () => {
    setAddress('');
    setName('');
    setDescription('');
    setDestinationTag('');
  };

  useEffect(() => {
    if (beneficiariesAddError && beneficiariesAddError.message) {
      if (
        beneficiariesAddError.message.indexOf('account.withdraw.not_permitted') > -1 ||
        beneficiariesAddError.message.indexOf('record.not_found') > -1
      ) {
        dispatch(alertPush({ message: beneficiariesAddError.message, type: 'error' }));
      }
    }
  }, [beneficiariesAddError, dispatch]);

  useEffect(() => {
    setBlockchain(blockchains.length === 1 ? blockchains[0]! : null);
  }, [blockchains, currencyCode]);

  const handleChangeAddress = (value: string) => {
    setAddress(value.trim());
  };

  const handleSubmit = () => {
    const payload = {
      blockchain_id: blockchain!.id,
      currency: currencyCode || '',
      name,
      data: JSON.stringify({
        address: isRipple && destinationTag ? `${address}?dt=${destinationTag}` : address,
      }),
      ...(description && { description }),
    };

    dispatch(beneficiariesCreate(payload));
    handleClearModalsInputs();
  };

  const renderSelectItem = (value: Blockchain) => {
    return (
      <Box display="flex" alignItems="center">
        <CryptoCurrencyIcon size="small" currency={getCurrencyCodeSymbol(value.key)} />{' '}
        <Box as="p" ml="1.5x">
          {value.name}
        </Box>
      </Box>
    );
  };

  const blockchainCurrencyCode = getCurrencyCodeSymbol(blockchain?.key ?? currencyCode);
  const coinAddressValid = isValidAddress(address, blockchainCurrencyCode);
  const coinTestnetAddressValid = isValidAddress(address, blockchainCurrencyCode, 'testnet');

  const isDisabled =
    !blockchain || !address || !name || (!coinAddressValid && !coinTestnetAddressValid);

  let addressError: string | undefined;
  if (!coinAddressValid && !coinTestnetAddressValid && address) {
    addressError = t('page.body.wallets.beneficiaries.addAddressModal.body.invalidAddress');
  } else if (!coinAddressValid && coinTestnetAddressValid && address) {
    addressError = t('page.body.wallets.beneficiaries.addAddressModal.body.testnetAddress');
  }

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
        <Select
          options={blockchains}
          value={blockchain}
          onChange={setBlockchain}
          placeholder={t('Network')}
          formatOptionLabel={renderSelectItem}
          getOptionValue={getOptionValue}
          autoFocus
        />

        <Box
          as={TextInput}
          fontSize="caption"
          my="5x"
          autoComplete="chrome-off"
          label={t('page.body.wallets.beneficiaries.addAddressModal.body.coinBeneficiaryName')}
          value={name}
          onChange={setName}
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

        {isRipple && (
          <TextInput
            label={t('page.body.wallets.beneficiaries.addAddressModal.body.coinDestinationTag')}
            value={destinationTag}
            onChange={setDestinationTag}
          />
        )}

        <Button fullWidth disabled={isDisabled} onClick={handleSubmit}>
          {t('page.body.wallets.beneficiaries.addAddressModal.body.button')}
        </Button>
      </Box>
    </Modal>
  );
};

export const BeneficiariesAddModal = memo(BeneficiariesAddModalComponent);
