import { FC } from 'react';
import { AmountFormat } from 'web/src/components/AmountFormat/AmountFormat';
import { createMoney } from 'web/src/helpers/money';
import { UserAdvertDetails } from 'web/src/modules/p2p/types';
import { useAdapterContext } from 'web/src/components/shared/Adapter';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { parseNumeric } from 'web/src/helpers/parseNumeric';
import { useControlledFetchRateByParams } from 'web/src/hooks/data/useFetchRate';
import { useDebouncedCallback } from 'use-debounce';
import { UserAdField } from './UserAdField';
import { UserAdBlock } from './UserAdBlock';
import { EditButton } from './EditButton';
import { useUserAdEditContext } from './UserAdEditContext';
import { EditInput } from './EditInput';
import * as s from './UserAdAdvertStep.css';

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
  const [fetchRateByParams] = useControlledFetchRateByParams();

  const handleToggleEdit = () => {
    if (isEdit) {
      resetFormValues(['rateValue', 'ratePercent', 'minAmount', 'maxAmount']);
      removeStepInEdit(STEP_KEY);
    } else {
      setStepInEdit(STEP_KEY);
    }
  };

  const debouncedCalcRatePercent = useDebouncedCallback(async (value: string) => {
    const res = await fetchRateByParams({
      cryptoCurrency: ad.cryptoCurrency.code,
      currency: ad.paymethod.currency,
      percent: value,
    });

    if (res) {
      updateFormValues({ rateValue: res.value, ratePercent: res.percent });
    }
  }, 1000);

  const handleRatePercentChange = async (value: string) => {
    const nvalue = parseNumeric(value, { allowNegativeNumeric: true });
    updateFormValues({ rateType: 'floating', ratePercent: nvalue });

    if (nvalue && nvalue.length > 0) {
      debouncedCalcRatePercent(nvalue);
    } else {
      updateFormValues({ ratePercent: null, rateValue: null });
    }
  };

  const handleRateValueChange = async (value: string) => {
    updateFormValues({ rateType: 'fixed', rateValue: parseNumeric(value), ratePercent: null });
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
          variant="custom"
          isEdit={isEdit}
          error={formErrors?.rateValue}
          label={t('Rate')}
          value={
            <Box display="flex" alignItems="center" justifyContent="flex-end" gap="1x">
              <EditInput
                className={s.percentInput}
                suffix="%"
                isError={Boolean(formErrors?.ratePercent)}
                value={formValues.ratePercent ?? ''}
                onChange={handleRatePercentChange}
              />
              <Box as="span" flexShrink={0} display={{ mobile: 'none', tablet: 'inline-block' }}>
                {t('or')}
              </Box>
              <EditInput
                className={s.valueInput}
                suffix={ad.paymethod.currency}
                isError={Boolean(formErrors?.rateValue)}
                value={formValues.rateValue ?? ''}
                onChange={handleRateValueChange}
              />
            </Box>
          }
          readOnlyValue={
            <Text>
              <AmountFormat money={createMoney(ad.rate.toString(), ad.cryptoCurrency)} />
              {ad.ratePercent ? ` (${ad.ratePercent}%)` : ''}
            </Text>
          }
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
