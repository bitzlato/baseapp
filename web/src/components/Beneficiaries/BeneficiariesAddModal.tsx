import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isValidAddress } from 'src/helpers/validateBeneficiaryAddress';
import { useT } from 'src/hooks/useT';
import {
  alertPush,
  beneficiariesCreate,
  selectBeneficiariesCreateError,
  Wallet,
} from 'src/modules';
import { Blockchain } from 'src/modules/public/blockchains/types';
import { tradeUrl } from 'src/api/config';
import { getCurrencyCodeSymbol } from 'src/helpers/getCurrencySymbol';
import { Box } from '../Box/Box';
import { Button } from '../Button/Button';
import { TextInput } from '../Input/TextInput';
import { Select } from '../Select/Select';
import { CryptoCurrencyIcon } from '../CryptoCurrencyIcon/CryptoCurrencyIcon';
import { Modal2 } from '../Modal/Modal2';
import { useFetcher } from 'web/src/hooks/data/useFetcher';
import { fetcher } from 'web/src/helpers/fetcher';

interface Props {
  wallet: Wallet;
  onCloseModal: () => void;
}

const BeneficiariesAddModalComponent: React.FC<Props> = ({ wallet, onCloseModal }) => {
  const [coinAddress, setCoinAddress] = useState('');
  const [coinBeneficiaryName, setCoinBeneficiaryName] = useState('');
  const [coinDescription, setCoinDescription] = useState('');
  const [coinDestinationTag, setCoinDestinationTag] = useState('');
  const [blockchain, setBlockchain] = useState<Blockchain | null>(null);

  const currency = wallet.currency.code;

  const t = useT();
  const dispatch = useDispatch();

  const { data = [] } = useFetcher<Blockchain[]>(`${tradeUrl()}/public/blockchains`, fetcher);

  const blockchains = data.filter((d) =>
    wallet.blockchain_currencies.find((b) => b.blockchain_id === d.id),
  );

  const beneficiariesAddError = useSelector(selectBeneficiariesCreateError);
  const isRipple = currency === 'xrp';

  const handleClearModalsInputs = () => {
    setCoinAddress('');
    setCoinBeneficiaryName('');
    setCoinDescription('');
    setCoinDestinationTag('');
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

  const handleChangeCoinAddress = (value: string) => {
    setCoinAddress(value.trim());
  };

  const renderSelectItem = (value: Blockchain) => {
    return (
      <Box row spacing>
        <CryptoCurrencyIcon size="small" currency={getCurrencyCodeSymbol(value.key)} />
        <span>{value.name}</span>
      </Box>
    );
  };

  const name = getCurrencyCodeSymbol(blockchain?.key ?? '') || currency;
  const coinAddressValid = isValidAddress(coinAddress, name);
  const coinTestnetAddressValid = isValidAddress(coinAddress, name, 'testnet');

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
    <Modal2
      header={t('page.body.wallets.beneficiaries.addAddressModal.header')}
      onClose={onCloseModal}
      show
    >
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
    </Modal2>
  );
};

export const BeneficiariesAddModal = React.memo(BeneficiariesAddModalComponent);
