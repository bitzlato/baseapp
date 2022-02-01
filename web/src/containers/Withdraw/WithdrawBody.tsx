import React from 'react';
import { Button } from 'src/components/Button/Button';
import { Box } from 'src/components/Box';
import { Beneficiaries } from '../../components';
import { precisionRegExp } from '../../helpers';
import { Beneficiary, selectMobileDeviceState, selectUserInfo, Wallet } from '../../modules';
import { WithdrawSummary } from './WithdrawSummary';
import { BeneficiaryAddress } from './BeneficiaryAddress';
import { createMoney } from 'src/helpers/money';
import { NumberInput } from 'src/components/NumberInput/NumberInput';
import { parseInteger, parseNumeric } from 'src/helpers/parseNumeric';
import { defaultBeneficiary } from 'src/modules/user/beneficiaries/defaults';
import { useT } from 'src/hooks/useT';
import { useSelector } from 'react-redux';

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
  const twoFactorAuthRequired = user.level > 1 || (user.level === 1 && user.otp);

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

  return (
    <Box col spacing="3">
      <Beneficiaries
        currency={wallet.currency.code}
        type={wallet.type}
        enableInvoice={wallet.enable_invoice}
        onChangeValue={setBeneficiary}
      />
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
  );
};
