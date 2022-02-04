import React from 'react';
import { useHistory } from 'react-router';
import { Button } from 'src/components/Button/Button';
import { Box } from 'src/components/Box';
import { Beneficiaries, Blur } from '../../components';
import { precisionRegExp } from '../../helpers';
import {
  Beneficiary,
  selectMemberLevels,
  selectMobileDeviceState,
  selectUserInfo,
  Wallet,
} from '../../modules';
import { WithdrawSummary } from './WithdrawSummary';
import { BeneficiaryAddress } from './BeneficiaryAddress';
import { createMoney } from 'src/helpers/money';
import { NumberInput } from 'src/components/Input/NumberInput';
import { parseInteger, parseNumeric } from 'src/helpers/parseNumeric';
import { defaultBeneficiary } from 'src/modules/user/beneficiaries/defaults';
import { useT } from 'src/hooks/useT';
import { useSelector } from 'react-redux';
import { useFetchCache } from 'src/hooks/useFetchCache';
import { Blockchain } from 'src/modules/public/blockchains/types';
import { tradeUrl } from 'src/api/config';

interface Props {
  onClick: (amount: string, total: string, beneficiary: Beneficiary, otpCode: string) => void;
  withdrawDone: boolean;
  wallet: Wallet;
}

export const WithdrawBody: React.FC<Props> = (props) => {
  const [amount, setAmount] = React.useState('');
  const [beneficiary, setBeneficiary] = React.useState(defaultBeneficiary);
  const [otpCode, setOtpCode] = React.useState('');
  const [total, setTotal] = React.useState('');

  const t = useT();
  const isMobileDevice = useSelector(selectMobileDeviceState);
  const user = useSelector(selectUserInfo);
  const history = useHistory();
  const memberLevels = useSelector(selectMemberLevels);

  const twoFactorAuthRequired = user.level > 1 || (user.level === 1 && user.otp);

  const { data = [] } = useFetchCache<Blockchain[]>(`${tradeUrl()}/public/blockchains`);
  const blockchain = data.find((d) => d.id === beneficiary.blockchain_id);

  const { wallet, withdrawDone } = props;

  const reset = () => {
    setAmount('');
    setBeneficiary(defaultBeneficiary);
    setOtpCode('');
    setTotal('');
  };

  React.useEffect(() => {
    reset();
  }, [wallet.currency.code]);

  React.useEffect(() => {
    if (withdrawDone) {
      reset();
    }
  }, [withdrawDone]);

  const handleCheckButtonDisabled = (total: string, beneficiary: Beneficiary, otpCode: string) => {
    const isPending = beneficiary.state && beneficiary.state.toLowerCase() === 'pending';
    return Number(total) <= 0 || !Boolean(beneficiary.id) || isPending || !Boolean(otpCode);
  };

  const handleClick = () => props.onClick(amount, total, beneficiary, otpCode);

  const handleChangeInputAmount = (value: string) => {
    const amount = parseNumeric(value);
    if (amount.match(precisionRegExp(wallet.precision))) {
      const amountMoney = createMoney(amount, wallet.currency);
      const totalMoney = amountMoney.subtract(wallet.withdraw_fee);
      const total = totalMoney.isNegative() ? (0).toFixed(wallet.precision) : totalMoney.toString();
      setTotal(total);
      setAmount(amount);
    }
  };

  const handleChangeOtpCode = (otpCode: string) => {
    setOtpCode(parseInteger(otpCode));
  };

  const renderBlur = () => {
    if (blockchain?.is_transaction_price_too_high) {
      return <Blur text={t('is_transaction_price_too_high')} />;
    } else if (!wallet.withdrawal_enabled) {
      return <Blur text={t('page.body.wallets.tabs.withdraw.disabled.message')} />;
    } else if (user.level < (memberLevels?.withdraw.minimum_level ?? 0)) {
      return (
        <Blur
          text={t('page.body.wallets.warning.withdraw.verification')}
          onClick={() => history.push('/confirm')}
          linkText={t('page.body.wallets.warning.withdraw.verification.button')}
        />
      );
    } else if (!user.otp) {
      if (isMobileDevice) {
        return (
          <Blur
            text={t('page.body.wallets.tabs.withdraw.content.enable2fa')}
            onClick={() => () => history.push('/profile/2fa', { enable2fa: true })}
            linkText={t('page.body.wallets.tabs.withdraw.content.enable2faButton')}
          />
        );
      } else {
        return (
          <Blur
            text={t('page.body.wallets.warning.withdraw.2fa')}
            linkText={t('page.body.wallets.warning.withdraw.2fa.button')}
            onClick={() => history.push('/security/2fa', { enable2fa: true })}
          />
        );
      }
    }
    return null;
  };

  return (
    <>
      {renderBlur()}
      <Box col spacing="3">
        <Beneficiaries wallet={wallet} onChangeValue={setBeneficiary} />
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
              onChange={handleChangeOtpCode}
              label={t('page.body.wallets.tabs.withdraw.content.code2fa')}
            />
          )}
        </Box>
        <Box grow row={!isMobileDevice} col={isMobileDevice} spacing="2">
          <WithdrawSummary total={total} wallet={wallet} />
          <Box flex1 self="end" row justify="end">
            <Button
              variant="primary"
              onClick={handleClick}
              disabled={handleCheckButtonDisabled(total, beneficiary, otpCode)}
            >
              {t('page.body.wallets.tabs.withdraw.content.button')}
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};
