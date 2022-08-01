import { FC } from 'react';
import { AmountFormat } from 'web/src/components/AmountFormat/AmountFormat';
import { createMoney } from 'web/src/helpers/money';
import { UserAdvertDetails } from 'web/src/modules/p2p/types';
import { useAdapterContext } from 'web/src/components/shared/Adapter';
import { Box } from 'web/src/components/ui/Box';
import { parseNumeric } from 'web/src/helpers/parseNumeric';
import { UserAdField } from './UserAdField';
import { UserAdBlock } from './UserAdBlock';
import { EditButton } from './EditButton';
import { useUserAdEditContext } from './UserAdEditContext';

const STEP_KEY = 'advert';

interface Props {
  ad: UserAdvertDetails;
}

export const UserAdAdvertStep: FC<Props> = ({ ad }) => {
  const { t } = useAdapterContext();
  const {
    isStepInEdit,
    setStepInEdit,
    removeStepInEdit,
    formValues,
    updateFormValues,
    resetFormValues,
    stepErrors,
    formErrors,
  } = useUserAdEditContext();
  const isEdit = isStepInEdit(STEP_KEY);

  const handleToggleEdit = () => {
    if (isEdit) {
      resetFormValues(['rateValue', 'minAmount', 'maxAmount']);
      removeStepInEdit(STEP_KEY);
    } else {
      setStepInEdit(STEP_KEY);
    }
  };

  return (
    <UserAdBlock
      title={t('Advert')}
      right={<EditButton isEdit={isEdit} onClick={handleToggleEdit} />}
      error={stepErrors?.advert}
    >
      <Box pt="3x">
        <UserAdField variant="text" label={t('Currency')} readOnlyValue={ad.paymethod.currency} />
        <UserAdField
          variant="input"
          isEdit={isEdit}
          error={formErrors?.rateValue}
          label={t('Rate')}
          value={formValues.rateValue ?? ''}
          readOnlyValue={
            <AmountFormat money={createMoney(ad.rate.toString(), ad.cryptoCurrency)} />
          }
          onChange={(value) => updateFormValues({ rateValue: parseNumeric(value) })}
        />
        <UserAdField
          variant="rangeInput"
          isEdit={isEdit}
          label={t('Limits')}
          error={
            formErrors?.minAmount || formErrors?.maxAmount
              ? [...new Set([formErrors.minAmount, formErrors.maxAmount])]
                  .filter(Boolean)
                  .join(', ')
              : null
          }
          readOnlyValue={
            <Box>
              <AmountFormat money={createMoney(ad.minAmount, ad.cryptoCurrency)} />
              {' - '}
              <AmountFormat money={createMoney(ad.maxAmount, ad.cryptoCurrency)} />
            </Box>
          }
          prefixFrom="min:"
          errorFrom={formErrors?.minAmount}
          valueFrom={formValues.minAmount ?? ''}
          onChangeFrom={(value) => updateFormValues({ minAmount: parseNumeric(value) })}
          prefixTo="max:"
          errorTo={formErrors?.maxAmount}
          valueTo={formValues.maxAmount ?? ''}
          onChangeTo={(value) => updateFormValues({ maxAmount: parseNumeric(value) })}
        />
        <UserAdField
          variant="text"
          label={t('Payment method')}
          readOnlyValue={ad.paymethod.description}
        />
      </Box>
    </UserAdBlock>
  );
};
