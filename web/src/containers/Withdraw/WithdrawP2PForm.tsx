import { FC, useState, useEffect } from 'react';
import { Currency } from '@bitzlato/money-js';
import { useDebounce } from 'use-debounce';
import { Button } from 'web/src/components/ui/Button';
import { Box } from 'web/src/components/Box';
import { Box as UIBox } from 'web/src/components/ui/Box';
import { Blur } from 'web/src/components';
import { createMoney } from 'web/src/helpers/money';
import { NumberInput } from 'web/src/components/Input/NumberInput';
import { parseNumeric } from 'web/src/helpers/parseNumeric';
import { useT } from 'web/src/hooks/useT';
import { precisionRegExp } from 'web/src/helpers';
import { formatSeconds } from 'web/src/helpers/formatSeconds';
import { WithdrawVoucher } from 'web/src/containers/Withdraw/WithdrawVoucher';
import {
  useFetchP2PWithdrawalInfo,
  useFetchP2PWithdrawVouchers,
} from 'web/src/hooks/data/useFetchP2PWithdrawVouchers';
import { WithdrawP2PSummary } from 'web/src/containers/Withdraw/WithdrawP2PSummary';
import { AmountFormat } from 'web/src/components/AmountFormat/AmountFormat';
import { isValidAddress } from 'web/src/helpers/validateBeneficiaryAddress';
import { useFetchP2PWalletStat } from 'web/src/hooks/data/useFetchP2PWallets';
import { WithdrawP2PFormValues } from 'web/src/containers/Withdraw/types';
import { AddressNotebookP2P } from 'web/src/containers/Withdraw/AddressNotebookP2P';
import { Select } from 'web/src/components/Select/Select';
import { P2PBlockchain } from 'web/src/modules/public/blockchains/types';
import { CryptoCurrencyIcon } from 'web/src/components/ui/CryptoCurrencyIcon';
import { useFeatureEnabled } from 'web/src/hooks/useFeatureEnabled';

interface Props {
  currency: Currency;
  countdown: number;
  withdrawDone: boolean;
  onSubmit: (params: WithdrawP2PFormValues) => void;
}

const getOptionValue = (option: P2PBlockchain) => option.key;

export const WithdrawP2PForm: FC<Props> = ({ currency, countdown, withdrawDone, onSubmit }) => {
  const blockchainsChoiceEnabled = useFeatureEnabled('p2p_blockchains_choice');
  const t = useT();

  const [amount, setAmount] = useState('');
  const [address, setAddress] = useState('');
  const [voucher, setVoucher] = useState(false);
  const [amountError, setAmountError] = useState<null | string>(null);
  const [addressError, setAddressError] = useState<null | string>(null);
  const [defferedAmount] = useDebounce(amount, 1000);
  const [blockchain, setBlockchain] = useState<P2PBlockchain | null>(null);

  const { data: p2pWalletsStat } = useFetchP2PWalletStat();
  const walletStat = p2pWalletsStat?.find((wallet) => wallet.code === currency.code);
  const blockchains = walletStat?.blockchains;
  const hasBlockchains = blockchains && blockchains.length > 0;
  const blockchainsEnabled = hasBlockchains && blockchainsChoiceEnabled;
  const { data: vouchersData } = useFetchP2PWithdrawVouchers();
  const { data: withdrawalInfo } = useFetchP2PWithdrawalInfo({
    amount: defferedAmount,
    cryptocurrency: currency.code,
    voucher,
    blockchainId: blockchain?.id,
  });

  useEffect(() => {
    if (blockchainsEnabled) {
      setBlockchain(blockchains?.length === 1 ? blockchains[0]! : null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockchainsEnabled, blockchains?.length, currency.code]);

  const voucherCount = vouchersData?.count ?? 0;
  const validatorKey = blockchain?.key.replace('p2p-', '');

  const reset = () => {
    setAmount('');
    setAddress('');
    setVoucher(false);
  };

  useEffect(() => {
    reset();
  }, [currency.code]);

  useEffect(() => {
    if (withdrawDone) {
      reset();
    }
  }, [withdrawDone]);

  const validateAddress = (value: string) => {
    setAddressError(null);

    if (!value) {
      setAddressError('');
      return;
    }

    const valid = isValidAddress(value, validatorKey ?? currency.code);
    const validTestnet = isValidAddress(value, validatorKey ?? currency.code, 'testnet');
    setAddressError(valid || validTestnet ? null : t('address.invalid'));
  };

  useEffect(() => {
    validateAddress(address);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, currency.code]);

  const validateAmount = () => {
    if (!amount) {
      setAmountError(null);
      return;
    }

    if (withdrawalInfo === undefined) {
      return;
    }

    const amountValue = createMoney(amount, currency);
    const minValue = createMoney(withdrawalInfo.min, currency);
    const availableValue = createMoney(withdrawalInfo.available, currency);

    if (amountValue.greaterThan(availableValue)) {
      setAmountError(t('Balance is insufficient'));
      return;
    }

    if (amountValue.lessThan(minValue)) {
      setAmountError(t('Should be more than', { value: <AmountFormat money={minValue} /> }));
      return;
    }

    setAmountError(null);
  };

  useEffect(() => {
    validateAmount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, withdrawalInfo]);

  const isButtonDisabled = () => {
    return (
      !withdrawalInfo ||
      Number(amount) <= 0 ||
      countdown > 0 ||
      addressError !== null ||
      amountError !== null
    );
  };

  const handleAddressChange = (value: string) => {
    setAddress(value);
  };

  const handleBlockchainChange = (value: P2PBlockchain | null) => {
    setBlockchain(value);
    setAddress('');
  };

  const handleChangeInputAmount = (value: string) => {
    const amountValue = parseNumeric(value);
    if (amountValue.match(precisionRegExp(currency.minorUnit))) {
      setAmount(amountValue);
    }
  };

  const handleSubmit = () => {
    onSubmit({ amount, address, voucher, blockchainId: blockchain?.id });
  };

  const renderBlur = () => {
    let withdrawEnabled = true;
    if (blockchainsEnabled) {
      if (blockchain) {
        withdrawEnabled = blockchain.withdrawEnabled;
      }
    } else if (walletStat) {
      withdrawEnabled = walletStat.withdrawEnabled;
    }

    return !withdrawEnabled ? (
      <Blur text={t('page.body.wallets.tabs.withdraw.disabled.message')} />
    ) : null;
  };

  const renderSelectItem = (value: P2PBlockchain) => {
    return (
      <UIBox display="flex" alignItems="center">
        <CryptoCurrencyIcon size="6x" currency={value.key.replace('p2p-', '').split('-')[0]!} />{' '}
        <UIBox as="p" ml="1.5x">
          {value.name}
        </UIBox>
      </UIBox>
    );
  };

  return (
    <Box col spacing="3" position="relative">
      {renderBlur()}

      {blockchainsEnabled && (
        <Select
          options={blockchains}
          value={blockchain}
          onChange={handleBlockchainChange}
          placeholder={t('Network')}
          formatOptionLabel={renderSelectItem}
          getOptionValue={getOptionValue}
          menuPortalTarget={document.body}
          autoFocus
        />
      )}

      {(!blockchains || blockchains.length === 0 || blockchain) && (
        <>
          <AddressNotebookP2P
            blockchainId={blockchain?.id}
            validatorKey={validatorKey}
            currencyCode={currency.code}
            inputAddress={address}
            error={addressError}
            onChange={handleAddressChange}
          />
          <Box grow row spacing="2" align="start">
            <Box
              flex="1"
              as={NumberInput}
              value={amount}
              onChange={handleChangeInputAmount}
              label={t('page.body.wallets.tabs.withdraw.content.amount')}
              error={amountError}
            />
          </Box>

          <Box col spacing="2">
            <WithdrawP2PSummary amount={amount} currency={currency} info={withdrawalInfo} />
            {voucherCount > 0 && (
              <WithdrawVoucher count={voucherCount} value={voucher} onChange={setVoucher} />
            )}
            <Box flex="1" self="end" row justify="end">
              <Button
                data-gtm-click="create_withdraw"
                color="primary"
                disabled={isButtonDisabled()}
                onClick={handleSubmit}
              >
                {countdown > 0
                  ? formatSeconds(countdown)
                  : t('page.body.wallets.tabs.withdraw.content.button')}
              </Button>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};
