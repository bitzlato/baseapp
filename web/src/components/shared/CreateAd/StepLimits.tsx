import { FC, useState } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { MoneyInput } from 'web/src/components/TextInputCustom/MoneyInputCustom';
import { useAdapterContext } from 'web/src/components/shared/Adapter';
import { parseNumeric } from 'web/src/helpers/parseNumeric';
import { CreateAdFormValues, useCreateAdFormContext } from './CreateAdFormContext';
import { StepInputRow } from './StepInputRow';
import { validateValues } from './validate';
import { StepSubmitRow } from './StepSubmitRow';

interface Props {
  onSubmit: () => void;
}

type FieldKeys = 'minAmount' | 'maxAmount';

export const StepLimits: FC<Props> = ({ onSubmit }) => {
  const { t } = useAdapterContext();
  const { formValues, selectedFiatCurrency, updateFormValues } = useCreateAdFormContext();
  const [errors, setErrors] = useState<null | Partial<{
    [key in keyof Pick<CreateAdFormValues, FieldKeys>]: string | null;
  }>>(null);

  const handleMinChange = (value: string) => {
    const nvalue = parseNumeric(value);
    setErrors((current) => ({ ...current, minAmount: null }));
    updateFormValues({ minAmount: nvalue });
  };

  const handleMaxChange = (value: string) => {
    const nvalue = parseNumeric(value);
    setErrors((current) => ({ ...current, maxAmount: null }));
    updateFormValues({ maxAmount: nvalue });
  };

  const handleSubmit = () => {
    setErrors(null);
    const nextErrors = validateValues(formValues, ['minAmount', 'maxAmount'], { t });

    if (nextErrors === null) {
      onSubmit();
    } else {
      setErrors(nextErrors);
    }
  };

  if (!selectedFiatCurrency) {
    return null;
  }

  return (
    <Box display="flex" flexDirection="column" gap="6x" pb="6x">
      <StepInputRow label={t('createAd.setMinLimit')}>
        <MoneyInput
          currency={selectedFiatCurrency?.code}
          value={formValues.minAmount ?? ''}
          label={t('createAd.setMinLimit.enter')}
          isError={Boolean(errors?.minAmount)}
          onChange={handleMinChange}
        />
      </StepInputRow>

      <StepInputRow label={t('createAd.setMaxLimit')}>
        <MoneyInput
          currency={selectedFiatCurrency?.code}
          value={formValues.maxAmount ?? ''}
          label={t('createAd.setMaxLimit.enter')}
          isError={Boolean(errors?.maxAmount)}
          onChange={handleMaxChange}
        />
      </StepInputRow>

      <StepSubmitRow errors={errors} onSubmit={handleSubmit} />
    </Box>
  );
};
