import { FC, useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useDebounce } from 'use-debounce';
import { Currency } from '@bitzlato/money-js';
import { Button } from 'web/src/components/ui/Button';
import { Box } from 'web/src/components/Box';
import { createMoney } from 'web/src/helpers/money';
import { NumberInput } from 'web/src/components/Input/NumberInput';
import { parseNumeric } from 'web/src/helpers/parseNumeric';
import { useT } from 'web/src/hooks/useT';
import { selectMobileDeviceState, selectUserInfo } from 'web/src/modules';
import { precisionRegExp } from 'web/src/helpers';
import { isValidCode } from 'web/src/helpers/codeValidation';
import { formatSeconds } from 'web/src/helpers/formatSeconds';
import { WithdrawVoucher } from 'web/src/containers/Withdraw/WithdrawVoucher';
import {
  useFetchP2PWithdrawalInfo,
  useFetchP2PWithdrawVouchers,
} from 'web/src/hooks/data/useFetchP2PWithdrawVouchers';
import { WithdrawP2PSummary } from 'web/src/containers/Withdraw/WithdrawP2PSummary';
import { AmountFormat } from 'web/src/components/AmountFormat/AmountFormat';
import { isValidAddress } from 'web/src/helpers/validateBeneficiaryAddress';

interface Props {
  currency: Currency;
  withdrawDone: boolean;
  countdown: number;
  onSubmit: (data: {
    amount: string;
    total: string;
    address: string;
    otpCode: string;
    useVoucher?: boolean;
  }) => void;
}

export const WithdrawP2P: FC<Props> = ({ currency, withdrawDone, countdown, onSubmit }) => {
  const t = useT();

  const [amount, setAmount] = useState('');
  const [address, setAddress] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [useVoucher, setUseVoucher] = useState(false);
  const [amountError, setAmountError] = useState<null | string>(null);
  const [addressError, setAddressError] = useState<null | string>(null);
  const [defferedAmount] = useDebounce(amount, 1000);

  const isMobileDevice = useSelector(selectMobileDeviceState);
  const user = useSelector(selectUserInfo);

  const twoFactorAuthRequired = user.level > 1 || (user.level === 1 && user.otp);

  const { data: vouchersData } = useFetchP2PWithdrawVouchers();
  const { data: withdrawalInfo } = useFetchP2PWithdrawalInfo({
    amount: defferedAmount,
    cryptocurrency: currency.code,
    voucher: useVoucher,
  });

  const isBTC = currency.code === 'BTC';
  const voucherCount = vouchersData?.count ?? 0;

  const total = useMemo(() => {
    if (withdrawalInfo) {
      const fee = createMoney((isBTC ? withdrawalInfo.fee : withdrawalInfo.maxFee) || 0, currency);
      const amountMoney = createMoney(amount, currency);
      const totalMoney = amountMoney.subtract(fee);
      return totalMoney.isNegative() ? (0).toFixed(currency.minorUnit) : totalMoney.toString();
    }

    return '';
  }, [amount, isBTC, withdrawalInfo, currency]);

  const reset = () => {
    setAmount('');
    setAddress('');
    setOtpCode('');
    setUseVoucher(false);
  };

  useEffect(() => {
    reset();
  }, [currency.code]);

  useEffect(() => {
    if (withdrawDone) {
      reset();
    }
  }, [withdrawDone]);

  const validateAddress = () => {
    if (!address) {
      setAddressError(null);
      return;
    }

    const valid = isValidAddress(address, currency.code);
    const validTestnet = isValidAddress(address, currency.code, 'testnet');
    setAddressError(valid || validTestnet ? null : t('address.invalid'));
  };

  useEffect(() => {
    validateAddress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

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
  }, [amount]);

  const isButtonDisabled = () => {
    return (
      !withdrawalInfo ||
      Number(total) <= 0 ||
      !isValidCode(otpCode) ||
      countdown > 0 ||
      addressError !== null ||
      amountError !== null
    );
  };

  const handleSubmit = () => {
    onSubmit({ amount, total, address, otpCode, useVoucher });
    setOtpCode('');
  };

  const handleChangeInputAmount = (value: string) => {
    const amountValue = parseNumeric(value);
    if (amountValue.match(precisionRegExp(currency.minorUnit))) {
      setAmount(amountValue);
    }
  };

  const summary = <WithdrawP2PSummary total={total} currency={currency} info={withdrawalInfo} />;

  const button = (
    <Box flex="1" self="end" row justify="end">
      <Button color="primary" onClick={handleSubmit} disabled={isButtonDisabled()}>
        {countdown > 0
          ? formatSeconds(countdown)
          : t('page.body.wallets.tabs.withdraw.content.button')}
      </Button>
    </Box>
  );

  return (
    <Box col spacing="3">
      <Box col spacing="3" position="relative">
        <Box
          flex="1"
          as={NumberInput}
          value={address}
          onChange={setAddress}
          label={t('page.body.wallets.beneficiaries.title')}
          error={addressError}
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
          {twoFactorAuthRequired && (
            <Box
              flex="1"
              as={NumberInput}
              value={otpCode}
              onChange={setOtpCode}
              label={t('page.body.wallets.tabs.withdraw.content.code2fa')}
            />
          )}
        </Box>

        {voucherCount > 0 && (
          <WithdrawVoucher count={voucherCount} value={useVoucher} onChange={setUseVoucher} />
        )}

        {isMobileDevice ? (
          <Box col spacing="2">
            {summary}
            {button}
          </Box>
        ) : (
          <Box row spacing="2">
            {summary}
            {button}
          </Box>
        )}
      </Box>
    </Box>
  );
};
