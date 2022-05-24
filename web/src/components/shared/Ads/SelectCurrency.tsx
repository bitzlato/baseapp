import { useCallback } from 'react';
import { useSharedT } from 'web/src/components/shared/Adapter';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { P2PCurrency } from 'web/src/modules/p2p/wallet-types';
import { CryptoCurrencyIcon } from 'web/src/components/CryptoCurrencyIcon/CryptoCurrencyIcon';
import { SelectCustom } from 'web/src/components/SelectCustom/SelectCustom';
import { getCurrencyCodeSymbol } from 'web/src/helpers/getCurrencySymbol';

interface Props {
  options: P2PCurrency[];
  value: P2PCurrency | null;
  onChange: (value: P2PCurrency) => void;
}

const searchFunction = (searchText: string, _optionValue: string, option: P2PCurrency) => {
  return (
    option.code.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
    option.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1
  );
};

const getOptionValue = (option: P2PCurrency) => option.code;
const getOptionLabel = (option: P2PCurrency) => option.name;

export const SelectCurrency = ({ options, value, onChange }: Props) => {
  const t = useSharedT();

  const renderOption = useCallback((option: P2PCurrency) => {
    const balance = '0,00107994';
    const balanceUSD = '41,42 USD';

    return (
      <Box display="flex" alignItems="center" gap="4x">
        <CryptoCurrencyIcon size="medium" currency={option.code} />
        <Box display="flex" flexDirection="column" gap="1x" flexGrow={1}>
          <Box display="flex" justifyContent="space-between">
            <Text>{option.code}</Text>
            <Text textAlign="right">{balance}</Text>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Text color="textMuted" fontWeight="regular">
              {option.name}
            </Text>
            <Text color="textMuted" fontWeight="regular" textAlign="right">
              {balanceUSD}
            </Text>
          </Box>
        </Box>
      </Box>
    );
  }, []);

  const renderLabel = useCallback((option: P2PCurrency) => {
    return (
      <Box display="flex" alignItems="center" gap="2x">
        <CryptoCurrencyIcon size="small" currency={option.code} />
        <span>{getCurrencyCodeSymbol(option.code)}</span>
      </Box>
    );
  }, []);

  return (
    <SelectCustom
      withSearch
      options={options}
      value={value}
      placeholder={t('Cryptocurrency')}
      searchFunction={searchFunction}
      searchPlaceholder={t('Search')}
      noOptionsMessage={t('Nothing found')}
      getOptionValue={getOptionValue}
      getOptionLabel={getOptionLabel}
      renderOption={renderOption}
      renderLabel={renderLabel}
      onChange={onChange}
    />
  );
};
