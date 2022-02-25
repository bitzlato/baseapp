import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { CopyableTextField } from 'src/components/CopyableTextField';
import { Beneficiary } from 'src/modules/user/beneficiaries';
import { alertPush } from 'src/modules/public/alert/actions';
import { useT } from 'src/hooks/useT';

interface Props {
  beneficiary: Beneficiary;
}

export const BeneficiaryAddress: FC<Props> = ({
  beneficiary: {
    name,
    data: { address },
  },
}) => {
  const t = useT();
  const dispatch = useDispatch();

  if (!address || name === address) {
    return null;
  }

  const handleCopy = () => {
    dispatch(
      alertPush({
        message: ['page.body.wallets.tabs.deposit.ccy.message.success'],
        type: 'success',
      }),
    );
  };

  return (
    <CopyableTextField
      fieldId="withdraw_address"
      value={address}
      label={t('your_address')}
      onCopy={handleCopy}
    />
  );
};
