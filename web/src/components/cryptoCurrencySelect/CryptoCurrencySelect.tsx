import { FC } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { CryptoCurrencyIcon } from 'web/src/components/ui/CryptoCurrencyIcon';
import { SelectCustom } from 'web/src/components/SelectCustom/SelectCustom';
import { useT } from 'web/src/hooks/useT';
import {
  getOptionValue,
  getOptionLabel,
  searchFunction,
} from 'web/src/components/shared/Ads/InputAmountWithCurrency';
import { CryptoCurrencyOption } from 'web/src/components/shared/Ads/CryptoCurrencyOption';
import { BaseCurrency } from 'web/src/types/currencies.types';

interface Props {
  options: ReadonlyArray<BaseCurrency>;
  value?: BaseCurrency | undefined;
  onChange: (value: BaseCurrency) => void;
}

export const CryptoCurrencySelect: FC<Props> = ({ options, value, onChange }) => {
  const t = useT();

  return (
    <SelectCustom
      placeholder={t('gifts.selectCryptocurrency')}
      options={options}
      withSearch
      searchFunction={searchFunction}
      searchPlaceholder={t('Search')}
      noOptionsMessage={t('Nothing found')}
      getOptionValue={getOptionValue}
      getOptionLabel={getOptionLabel}
      renderLabel={(option) => (
        <Box key={option.code} display="flex" alignItems="center" gap="3x">
          <CryptoCurrencyIcon size="6x" currency={option.code} />
          <Text variant="label">{option.code}</Text>
        </Box>
      )}
      renderOption={CryptoCurrencyOption}
      value={value ?? null}
      onChange={onChange}
    />
  );
};
