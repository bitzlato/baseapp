import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isValidAddress } from 'src/helpers/validateBeneficiaryAddress';
import { useT } from 'src/hooks/useT';
import { MobileModal } from 'src/mobile/components/Modal';
import {
  alertPush,
  beneficiariesCreate,
  selectBeneficiariesCreateError,
  selectMobileDeviceState,
  Wallet,
} from 'src/modules';
import { useFetchCache } from 'src/hooks/useFetchCache';
import { Blockchain } from 'src/modules/public/blockchains/types';
import { tradeUrl } from 'src/api/config';
import { getCurrencyCodeSymbol } from 'src/helpers/getCurrencySymbol';
import { Card } from 'web/src/components/Card/Card';
import { Box } from '../Box/Box';
import { Button } from '../Button/Button';
import { TextInput } from '../Input/TextInput';
import { Select } from '../Select/Select';
import { BlockchainIcon2 } from '../BlockchainIcon/BlockchainIcon2';

interface Props {
  wallet: Wallet;
  onCloseModal: () => void;
}

const BeneficiariesAddModalComponent: React.FC<Props> = ({ wallet, onCloseModal }) => {
  const [coinAddress, setCoinAddress] = useState('');
  const [coinAddressValid, setCoinAddressValid] = useState(false);
  const [coinTestnetAddressValid, setCoinTestnetAddressValid] = useState(false);
  const [coinBeneficiaryName, setCoinBeneficiaryName] = useState('');
  const [coinDescription, setCoinDescription] = useState('');
  const [coinDestinationTag, setCoinDestinationTag] = useState('');
  const [blockchain, setBlockchain] = useState<Blockchain | null>(null);

  const currency = wallet.currency.code;

  const t = useT();
  const dispatch = useDispatch();

  const { data = [] } = useFetchCache<Blockchain[]>(`${tradeUrl()}/public/blockchains`);

  const blockchains = data.filter((d) => wallet.blockchain_ids.includes(d.id));

  const beneficiariesAddError = useSelector(selectBeneficiariesCreateError);
  const isMobileDevice = useSelector(selectMobileDeviceState);
  const isRipple = currency === 'xrp';

  const handleClearModalsInputs = () => {
    setCoinAddress('');
    setCoinBeneficiaryName('');
    setCoinDescription('');
    setCoinDestinationTag('');
    setCoinAddressValid(false);
    setCoinTestnetAddressValid(false);
  };

  const handleClickToggleAddAddressModal = () => {
    onCloseModal();
    handleClearModalsInputs();
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
  }, [blockchains.length, wallet.currency.code]);

  const handleSubmitAddAddressCoinModal = () => {
    const payload = {
      blockchain_id: blockchain!.id,
      currency: currency || '',
      name: coinBeneficiaryName,
      data: JSON.stringify({
        address:
          isRipple && coinDestinationTag ? `${coinAddress}?dt=${coinDestinationTag}` : coinAddress,
      }),
      ...(coinDescription && { description: coinDescription }),
    };

    dispatch(beneficiariesCreate(payload));
    handleClearModalsInputs();
  };

  const validateCoinAddressFormat = (value: string) => {
    const address = value.trim();
    setCoinAddressValid(isValidAddress(address, currency));
    setCoinTestnetAddressValid(isValidAddress(address, currency, 'testnet'));
  };

  const handleChangeCoinAddress = (value: string) => {
    setCoinAddress(value);
    validateCoinAddressFormat(value);
  };

  const renderSelectItem = (value: Blockchain) => {
    return (
      <Box row spacing>
        <BlockchainIcon2 value={getCurrencyCodeSymbol(value.key)} />
        <span>{value.name}</span>
      </Box>
    );
  };

  const renderAddAddressModalCryptoBody = (isMobileDevice?: boolean) => {
    const isDisabled =
      !blockchain ||
      !coinAddress ||
      !coinBeneficiaryName ||
      (!coinAddressValid && !coinTestnetAddressValid);

    let error: string | undefined;
    if (!coinAddressValid && !coinTestnetAddressValid && coinAddress) {
      error = t('page.body.wallets.beneficiaries.addAddressModal.body.invalidAddress');
    } else if (!coinAddressValid && coinTestnetAddressValid && coinAddress) {
      error = t('page.body.wallets.beneficiaries.addAddressModal.body.testnetAddress');
    }

    return (
      <Box padding={isMobileDevice ? '4' : undefined!} grow col spacing="3" justify="between">
        <Box col spacing="3">
          <Select
            options={blockchains}
            value={blockchain}
            onChange={setBlockchain}
            placeholder={t('Network')}
            formatOptionLabel={renderSelectItem}
            getOptionValue={(d) => d.key}
            autoFocus
          />
          <TextInput
            label={t('page.body.wallets.beneficiaries.addAddressModal.body.coinAddress')}
            value={coinAddress}
            onChange={handleChangeCoinAddress}
            error={error}
          />
          <TextInput
            label={t('page.body.wallets.beneficiaries.addAddressModal.body.coinBeneficiaryName')}
            value={coinBeneficiaryName}
            onChange={setCoinBeneficiaryName}
          />
          {isRipple && (
            <TextInput
              label={t('page.body.wallets.beneficiaries.addAddressModal.body.coinDestinationTag')}
              value={coinDestinationTag}
              onChange={setCoinDestinationTag}
            />
          )}
        </Box>
        <Box as={Button} disabled={isDisabled} onClick={handleSubmitAddAddressCoinModal}>
          {t('page.body.wallets.beneficiaries.addAddressModal.body.button')}
        </Box>
      </Box>
    );
  };

  return isMobileDevice ? (
    <MobileModal
      title={t('page.body.wallets.beneficiaries.addAddressModal.header')}
      onClose={onCloseModal}
      isOpen
    >
      {renderAddAddressModalCryptoBody(true)}
    </MobileModal>
  ) : (
    <div className="cr-modal">
      <Card
        size="md"
        header={
          <Box row spacing="2" justify="between">
            <h4>{t('page.body.wallets.beneficiaries.addAddressModal.header')}</h4>
            <div className="pg-profile-page__close" onClick={handleClickToggleAddAddressModal} />
          </Box>
        }
      >
        {renderAddAddressModalCryptoBody()}
      </Card>
    </div>
  );
};

export const BeneficiariesAddModal = React.memo(BeneficiariesAddModalComponent);
