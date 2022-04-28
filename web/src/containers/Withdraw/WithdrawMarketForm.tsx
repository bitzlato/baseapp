import { FC, useState, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { Button } from 'web/src/components/ui/Button';
import { Box } from 'web/src/components/Box';
import { createMoney } from 'web/src/helpers/money';
import { NumberInput } from 'web/src/components/Input/NumberInput';
import { parseNumeric } from 'web/src/helpers/parseNumeric';
import { defaultBeneficiary } from 'web/src/modules/user/beneficiaries/defaults';
import { useT } from 'web/src/hooks/useT';
import { Blockchain } from 'web/src/modules/public/blockchains/types';
import { tradeUrl } from 'web/src/api/config';
import { BeneficiaryAddress } from 'web/src/containers/Withdraw/BeneficiaryAddress';
import { WithdrawSummary } from 'web/src/containers/Withdraw/WithdrawSummary';
import {
  selectMemberLevels,
  selectMobileDeviceState,
  selectUserInfo,
  Wallet,
} from 'web/src/modules';
import { precisionRegExp } from 'web/src/helpers';
import { Beneficiaries, Blur } from 'web/src/components';
import { isValidCode } from 'web/src/helpers/codeValidation';
import { formatSeconds } from 'web/src/helpers/formatSeconds';
import { useFetch } from 'web/src/hooks/data/useFetch';
import { WarningIcon } from 'web/src/mobile/assets/images/WarningIcon';
import { useBeneficiariesFetch } from 'web/src/hooks';
import { WithdrawMarketFormValues } from 'web/src/containers/Withdraw/types';

interface Props {
  wallet: Wallet;
  countdown: number;
  withdrawDone: boolean;
  onSubmit: (values: WithdrawMarketFormValues) => void;
}

export const WithdrawMarketForm: FC<Props> = ({ wallet, countdown, withdrawDone, onSubmit }) => {
  const t = useT();

  const [amount, setAmount] = useState('');
  const [beneficiary, setBeneficiary] = useState(defaultBeneficiary);
  const [otpCode, setOtpCode] = useState('');

  const isMobileDevice = useSelector(selectMobileDeviceState);
  const user = useSelector(selectUserInfo);
  const history = useHistory();
  const memberLevels = useSelector(selectMemberLevels);

  const twoFactorAuthRequired = user.level > 1 || (user.level === 1 && user.otp);
  const currencyCode = wallet.currency.code;

  useBeneficiariesFetch({ currency_id: currencyCode.toLowerCase() });
  const { data: blockchains = [] } = useFetch<Blockchain[]>(`${tradeUrl()}/public/blockchains`);

  const blockchain = blockchains.find((d) => d.id === beneficiary.blockchain_id);
  const isUSDXe =
    blockchain?.name === 'Avalanche' && (currencyCode === 'USDT' || currencyCode === 'USDC');

  const blockchainCurrency = wallet.blockchain_currencies.find(
    (d) => d.blockchain_id === beneficiary.blockchain_id,
  );

  const reset = () => {
    setAmount('');
    setBeneficiary(defaultBeneficiary);
    setOtpCode('');
  };

  useEffect(() => {
    reset();
  }, [currencyCode]);

  useEffect(() => {
    if (withdrawDone) {
      reset();
    }
  }, [withdrawDone]);

  const total = useMemo(() => {
    if (blockchainCurrency) {
      const fee = blockchainCurrency?.withdraw_fee;
      const amountMoney = createMoney(amount, wallet.currency);
      const totalMoney = amountMoney.subtract(fee);
      return totalMoney.isNegative() ? (0).toFixed(wallet.precision) : totalMoney.toString();
    }

    return '';
  }, [amount, blockchainCurrency, wallet]);

  const isButtonDisabled = () => {
    const isPending = beneficiary.state && beneficiary.state.toLowerCase() === 'pending';
    return (
      Number(total) <= 0 || !beneficiary.id || isPending || !isValidCode(otpCode) || countdown > 0
    );
  };

  const handleChangeInputAmount = (value: string) => {
    const amountValue = parseNumeric(value);
    if (amountValue.match(precisionRegExp(wallet.precision))) {
      setAmount(amountValue);
    }
  };

  const handleSubmit = () => {
    onSubmit({ amount, total, beneficiary, otpCode });
    setOtpCode('');
  };

  const renderBlur = () => {
    if (blockchain?.is_transaction_price_too_high) {
      return <Blur text={t('is_transaction_price_too_high')} />;
    }
    if (!wallet.withdrawal_enabled) {
      return <Blur text={t('page.body.wallets.tabs.withdraw.disabled.message')} />;
    }
    if (user.level < (memberLevels?.withdraw.minimum_level ?? 0)) {
      return (
        <Blur
          text={t('page.body.wallets.warning.withdraw.verification')}
          onClick={() => history.push('/confirm')}
          linkText={t('page.body.wallets.warning.withdraw.verification.button')}
        />
      );
    }
    if (!user.otp) {
      return (
        <Blur
          text={t('page.body.wallets.tabs.withdraw.content.enable2fa')}
          linkText={t('page.body.wallets.tabs.withdraw.content.enable2faButton')}
          onClick={() => history.push('/profile/2fa')}
        />
      );
    }
    return null;
  };

  const summary = (
    <WithdrawSummary total={total} wallet={wallet} blockchainCurrency={blockchainCurrency} />
  );

  const button = (
    <Box flex="1" self="end" row justify="end">
      <Button color="primary" onClick={handleSubmit} disabled={isButtonDisabled()}>
        {countdown > 0
          ? formatSeconds(countdown)
          : t('page.body.wallets.tabs.withdraw.content.button')}
      </Button>
    </Box>
  );

  const warning = isUSDXe ? (
    <Box row spacing>
      <WarningIcon />
      <Box textColor="warning" textSize="lg">
        {t('withdraw.usdx.e', { currency: <strong>{`${currencyCode}.e`}</strong> })}
      </Box>
    </Box>
  ) : null;

  return (
    <Box col spacing="3">
      <Box position="relative">
        <Beneficiaries wallet={wallet} onChangeValue={setBeneficiary} />
      </Box>
      <Box col spacing="3" position="relative">
        {renderBlur()}
        <BeneficiaryAddress beneficiary={beneficiary} />
        <Box grow row spacing="2">
          <Box
            flex="1"
            as={NumberInput}
            value={amount}
            onChange={handleChangeInputAmount}
            label={t('page.body.wallets.tabs.withdraw.content.amount')}
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

        {isMobileDevice ? (
          <Box col spacing="2">
            {summary}
            {warning}
            {button}
          </Box>
        ) : (
          <>
            <Box row spacing="2">
              {summary}
              {button}
            </Box>
            {warning}
          </>
        )}
      </Box>
    </Box>
  );
};
