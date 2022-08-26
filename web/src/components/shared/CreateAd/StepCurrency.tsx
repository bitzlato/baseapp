import { FC, useState } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { useAdapterContext } from 'web/src/components/shared/Adapter';
import {
  getOptionValue,
  getOptionLabel,
  searchFunction,
} from 'web/src/components/shared/Ads/InputAmountWithCurrency';
import { SelectCustom } from 'web/src/components/SelectCustom/SelectCustom';
import { CryptoCurrencyOption } from 'web/src/components/shared/Ads/CryptoCurrencyOption';
import { CryptoCurrencyIcon } from 'web/src/components/ui/CryptoCurrencyIcon';
import { omit } from 'web/src/helpers/omit';
import { PaymethodSource } from 'web/src/modules/p2p/types';
import { StepSubmitRow } from './StepSubmitRow';
import { CreateAdFormValues, useCreateAdFormContext } from './CreateAdFormContext';
import { StepInputRow } from './StepInputRow';
import { validateValues } from './validate';

export const searchPaymethodFunction = (
  searchText: string,
  _optionValue: string,
  option: PaymethodSource,
) => option.description.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

export const getPaymethodOptionValue = (option: PaymethodSource) => option.id.toString();
export const getPaymethodOptionLabel = (option: PaymethodSource) => option.description;

type FieldKeys = 'cryptocurrency' | 'currency' | 'paymethod';

interface Props {
  onSubmit: () => void;
}

export const StepCurrency: FC<Props> = ({ onSubmit }) => {
  const { t } = useAdapterContext();
  const [errors, setErrors] = useState<null | Partial<{
    [key in keyof Pick<CreateAdFormValues, FieldKeys>]: string | null;
  }>>(null);
  const {
    formValues,
    selectedCryptoCurrency,
    selectedFiatCurrency,
    selectedPaymethod,
    cryptoCurrencyOptions,
    fiatsOptions,
    paymethods,
    updateFormValues,
  } = useCreateAdFormContext();
  const isPurchase = formValues.type === 'purchase';

  const handleSubmit = () => {
    setErrors(null);
    const nextErrors = validateValues(formValues, ['cryptocurrency', 'currency', 'paymethod'], {
      t,
    });

    if (nextErrors === null) {
      onSubmit();
    } else {
      setErrors(nextErrors);
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap="7x" pt={{ mobile: '1x', tablet: '0' }} pb="6x">
      <StepInputRow
        label={
          isPurchase
            ? t('createAd.chooseCryptocurrency.label.purchase')
            : t('createAd.chooseCryptocurrency.label.selling')
        }
      >
        <SelectCustom
          placeholder={t('createAd.chooseCryptocurrency')}
          options={cryptoCurrencyOptions}
          withSearch
          searchFunction={searchFunction}
          searchPlaceholder={t('Search')}
          noOptionsMessage={t('Nothing found')}
          getOptionValue={getOptionValue}
          getOptionLabel={getOptionLabel}
          renderLabel={(option) => {
            return (
              <Box display="flex" alignItems="center" gap="3x">
                <CryptoCurrencyIcon size="6x" currency={option.code} />
                <Text variant="label">{option.code}</Text>
              </Box>
            );
          }}
          renderOption={CryptoCurrencyOption}
          isError={Boolean(errors?.cryptocurrency)}
          value={selectedCryptoCurrency}
          onChange={(v) => {
            setErrors((current) => omit(current, 'cryptocurrency'));
            updateFormValues({ cryptocurrency: v.code });
          }}
        />
      </StepInputRow>

      <StepInputRow
        label={
          isPurchase
            ? t('createAd.chooseCurrency.label.purchase')
            : t('createAd.chooseCurrency.label.selling')
        }
      >
        <SelectCustom
          placeholder={t('createAd.chooseCurrency')}
          options={fiatsOptions}
          withSearch
          searchFunction={searchFunction}
          searchPlaceholder={t('Search')}
          noOptionsMessage={t('Nothing found')}
          getOptionValue={getOptionValue}
          getOptionLabel={getOptionLabel}
          isError={Boolean(errors?.currency)}
          value={selectedFiatCurrency}
          onChange={(v) => {
            setErrors((current) => omit(current, 'currency'));
            updateFormValues({ currency: v.code });
          }}
        />
      </StepInputRow>

      <StepInputRow
        label={
          isPurchase
            ? t('createAd.choosePaymethod.label.purchase')
            : t('createAd.choosePaymethod.label.selling')
        }
      >
        <SelectCustom
          placeholder={t('createAd.choosePaymethod')}
          options={paymethods}
          withSearch
          searchFunction={searchPaymethodFunction}
          searchPlaceholder={t('Search')}
          noOptionsMessage={t('Nothing found')}
          getOptionValue={getPaymethodOptionValue}
          getOptionLabel={getPaymethodOptionLabel}
          isError={Boolean(errors?.paymethod)}
          value={selectedPaymethod}
          onChange={(v) => {
            setErrors((current) => omit(current, 'paymethod'));
            updateFormValues({ paymethod: v.id });
          }}
        />
      </StepInputRow>

      <StepSubmitRow errors={errors} onSubmit={handleSubmit} />
    </Box>
  );
};
