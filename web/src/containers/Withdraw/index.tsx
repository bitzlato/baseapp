import React from 'react';
import { Button } from 'react-bootstrap';
import { Currency, Money } from '@bitzlato/money-js';
import { Box } from 'src/components/Box';
import { Beneficiaries } from '../../components';
import { precisionRegExp } from '../../helpers';
import { Beneficiary, Wallet } from '../../modules';
import { WithdrawSummary } from './WithdrawSummary';
import { BeneficiaryAddress } from './BeneficiaryAddress';
import { fromDecimalSilent } from 'src/helpers/fromDecimal';
import { NumberInput } from 'src/components/NumberInput/NumberInput';
import { parseInteger, parseNumeric } from 'src/helpers/parseNumeric';
import { defaultBeneficiary } from 'src/modules/user/beneficiaries/defaults';

interface Props {
  currency: Currency;
  fee: Money;
  onClick: (amount: string, total: string, beneficiary: Beneficiary, otpCode: string) => void;
  fixed: number;
  className?: string;
  type: 'fiat' | 'coin';
  enableInvoice: boolean | undefined;
  twoFactorAuthRequired?: boolean;
  withdrawAmountLabel?: string;
  withdraw2faLabel?: string;
  withdrawButtonLabel?: string;
  withdrawDone: boolean;
  isMobileDevice?: boolean;
  wallet: Wallet;
}

export const Withdraw: React.FC<Props> = (props) => {
  const [amount, setAmount] = React.useState('');
  const [beneficiary, setBeneficiary] = React.useState(defaultBeneficiary);
  const [otpCode, setOtpCode] = React.useState('');
  const [total, setTotal] = React.useState('');

  const {
    currency,
    type,
    enableInvoice,
    twoFactorAuthRequired,
    isMobileDevice,
    wallet,
    withdrawDone,
  } = props;

  const reset = () => {
    setAmount('');
    setBeneficiary(defaultBeneficiary);
    setOtpCode('');
    setTotal('');
  };

  React.useEffect(() => {
    reset();
  }, [currency.code]);

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
    if (amount.match(precisionRegExp(props.fixed))) {
      const amountMoney = fromDecimalSilent(amount, props.currency);
      const totalMoney = amountMoney.subtract(props.fee);
      const total = totalMoney.isNegative() ? (0).toFixed(props.fixed) : totalMoney.toString();
      setTotal(total);
      setAmount(amount);
    }
  };

  const handleChangeOtpCode = (otpCode: string) => {
    setOtpCode(parseInteger(otpCode));
  };

  return (
    <Box padding={isMobileDevice ? undefined : '3x'} col spacing="3x">
      <Beneficiaries
        currency={currency.code}
        type={type}
        enableInvoice={enableInvoice}
        onChangeValue={setBeneficiary}
      />
      <BeneficiaryAddress beneficiary={beneficiary} />
      <Box grow row spacing="2x">
        <Box
          flex1
          as={NumberInput}
          value={amount}
          onChange={handleChangeInputAmount}
          label={props.withdrawAmountLabel}
        />
        {twoFactorAuthRequired && (
          <Box
            flex1
            as={NumberInput}
            value={otpCode}
            onChange={handleChangeOtpCode}
            label={props.withdraw2faLabel}
          />
        )}
      </Box>
      <Box grow row={!isMobileDevice} col={isMobileDevice} spacing="2x">
        <WithdrawSummary total={total} wallet={wallet} />
        <Box selfStart>
          <Button
            variant="primary"
            size="lg"
            onClick={handleClick}
            disabled={handleCheckButtonDisabled(total, beneficiary, otpCode)}
          >
            {props.withdrawButtonLabel}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
