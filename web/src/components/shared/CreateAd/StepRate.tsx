import { FC, useState } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { parseNumeric } from 'web/src/helpers/parseNumeric';
import { ChooseRate, RateType } from 'web/src/components/shared/UserAds/ChooseRate';
import { useAdapterContext } from 'web/src/components/shared/Adapter';
import { useStateWithDeps } from 'web/src/hooks/useStateWithDeps';
import { CreateAdFormValues, useCreateAdFormContext } from './CreateAdFormContext';
import { validateValues } from './validate';
import { StepSubmitRow } from './StepSubmitRow';

type FieldKeys = 'rateValue' | 'ratePercent';

interface Props {
  onSubmit: () => void;
}

export const StepRate: FC<Props> = ({ onSubmit }) => {
  const { t } = useAdapterContext();
  const { formValues, selectedCryptoCurrency, selectedFiatCurrency, updateFormValues } =
    useCreateAdFormContext();
  const [selectedRateType, setSelectedRateType] = useState<RateType>(
    formValues.ratePercent ? 'floating' : 'fixed',
  );
  const [fixedValue, setFixedValue] = useStateWithDeps<string>(
    () => formValues.rateValue ?? '',
    [formValues],
  );
  const [percentValue, setPercentValue] = useStateWithDeps<string>(
    () => formValues.ratePercent ?? '',
    [formValues],
  );
  const [errors, setErrors] = useState<null | Partial<{
    [key in keyof Pick<CreateAdFormValues, FieldKeys>]: string | null;
  }>>(null);

  const handleFixedValueChange = (value: string) => {
    const nvalue = parseNumeric(value);
    setFixedValue(nvalue);

    setSelectedRateType('fixed');
    setErrors(null);
    updateFormValues({ rateValue: nvalue, ratePercent: null });
  };

  const handlePercentValueChange = (value: string) => {
    const nvalue = parseNumeric(value, { allowNegativeNumeric: true });
    setPercentValue(nvalue);

    setSelectedRateType('floating');
    setErrors(null);
    updateFormValues({ rateValue: null, ratePercent: nvalue });
  };

  const handleSubmit = () => {
    setErrors(null);
    const nextErrors = validateValues(
      formValues,
      selectedRateType === 'fixed' ? ['rateValue'] : ['ratePercent'],
      { t },
    );

    if (nextErrors === null) {
      onSubmit();
    } else {
      setErrors(nextErrors);
    }
  };

  if (!selectedCryptoCurrency || !selectedFiatCurrency) {
    return null;
  }

  return (
    <Box display="flex" flexDirection="column" gap="3x" pb="6x">
      <ChooseRate
        currency={selectedFiatCurrency.code}
        cryptoCurrency={selectedCryptoCurrency.code}
        type={selectedRateType}
        fixed={fixedValue}
        isFixedError={Boolean(errors?.rateValue)}
        percent={percentValue}
        isPercentError={Boolean(errors?.ratePercent)}
        onChangeType={setSelectedRateType}
        onChangeFixed={handleFixedValueChange}
        onChangePercent={handlePercentValueChange}
      />

      <StepSubmitRow errors={errors} onSubmit={handleSubmit} />
    </Box>
  );
};
