import { FC, useState, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router';
import { Button } from 'web/src/components/ui/Button';
import { Box } from 'src/components/Box';
import { createMoney } from 'src/helpers/money';
import { NumberInput } from 'src/components/Input/NumberInput';
import { parseNumeric } from 'src/helpers/parseNumeric';
import { defaultBeneficiary } from 'src/modules/user/beneficiaries/defaults';
import { useT } from 'src/hooks/useT';
import { useSelector } from 'react-redux';
import { useFetchCache } from 'src/hooks/useFetchCache';
import { Blockchain } from 'src/modules/public/blockchains/types';
import { tradeUrl } from 'src/api/config';
import { BeneficiaryAddress } from './BeneficiaryAddress';
import { WithdrawSummary } from './WithdrawSummary';
import {
  Beneficiary,
  selectMemberLevels,
  selectMobileDeviceState,
  selectUserInfo,
  Wallet,
} from '../../modules';
import { precisionRegExp } from '../../helpers';
import { Beneficiaries, Blur } from '../../components';
import { isValidCode } from 'web/src/helpers/codeValidation';
import { formatSeconds } from 'web/src/helpers/formatSeconds';

interface Props {
  onClick: (amount: string, total: string, beneficiary: Beneficiary, otpCode: string) => void;
  withdrawDone: boolean;
  wallet: Wallet;
  countdown: number;
}

export const WithdrawBody: FC<Props> = (props) => {
  const [amount, setAmount] = useState('');
  const [beneficiary, setBeneficiary] = useState(defaultBeneficiary);
  const [otpCode, setOtpCode] = useState('');

  const t = useT();
  const isMobileDevice = useSelector(selectMobileDeviceState);
  const user = useSelector(selectUserInfo);
  const history = useHistory();
  const memberLevels = useSelector(selectMemberLevels);

  const twoFactorAuthRequired = user.level > 1 || (user.level === 1 && user.otp);

  const { data = [] } = useFetchCache<Blockchain[]>(`${tradeUrl()}/public/blockchains`);
  const blockchain = data.find((d) => d.id === beneficiary.blockchain_id);

  const { wallet, withdrawDone, countdown } = props;

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
  }, [wallet.currency.code]);

  useEffect(() => {
    if (withdrawDone) {
      reset();
    }
  }, [withdrawDone]);

  const total = useMemo(() => {
    if (blockchainCurrency) {
      const amountMoney = createMoney(amount, wallet.currency);
      const totalMoney = amountMoney.subtract(blockchainCurrency.withdraw_fee);
      return totalMoney.isNegative() ? (0).toFixed(wallet.precision) : totalMoney.toString();
    }
    return '';
  }, [amount, blockchainCurrency]);

  const isButtonDisabled = () => {
    const isPending = beneficiary.state && beneficiary.state.toLowerCase() === 'pending';
    return (
      Number(total) <= 0 || !beneficiary.id || isPending || !isValidCode(otpCode) || countdown > 0
    );
  };

  const handleClick = () => {
    props.onClick(amount, total, beneficiary, otpCode);
    setOtpCode('');
  };

  const handleChangeInputAmount = (value: string) => {
    const amount = parseNumeric(value);
    if (amount.match(precisionRegExp(wallet.precision))) {
      setAmount(amount);
    }
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
      if (isMobileDevice) {
        return (
          <Blur
            text={t('page.body.wallets.tabs.withdraw.content.enable2fa')}
            linkText={t('page.body.wallets.tabs.withdraw.content.enable2faButton')}
            onClick={() => history.push('/profile/2fa')}
          />
        );
      }
      return (
        <Blur
          text={t('page.body.wallets.warning.withdraw.2fa')}
          linkText={t('page.body.wallets.warning.withdraw.2fa.button')}
          onClick={() => history.push('/security/2fa')}
        />
      );
    }
    return null;
  };

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
            flex1
            as={NumberInput}
            value={amount}
            onChange={handleChangeInputAmount}
            label={t('page.body.wallets.tabs.withdraw.content.amount')}
          />
          {twoFactorAuthRequired && (
            <Box
              flex1
              as={NumberInput}
              value={otpCode}
              onChange={setOtpCode}
              label={t('page.body.wallets.tabs.withdraw.content.code2fa')}
            />
          )}
        </Box>
        <Box grow row={!isMobileDevice} col={isMobileDevice} spacing="2">
          <WithdrawSummary total={total} wallet={wallet} blockchainCurrency={blockchainCurrency} />
          <Box flex1 self="end" row justify="end">
            <Button color="primary" onClick={handleClick} disabled={isButtonDisabled()}>
              {countdown > 0
                ? formatSeconds(countdown)
                : t('page.body.wallets.tabs.withdraw.content.button')}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
