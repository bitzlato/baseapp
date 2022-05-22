import { useMemo, useState } from 'react';
import { useSharedT } from 'web/src/components/shared/Adapter';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { SearchInput } from 'web/src/components/SelectCustom/SearchInput';
import { Dropdown } from 'web/src/components/Dropdown/Dropdown';
import { P2PCurrency } from 'web/src/modules/p2p/wallet-types';
import { TextInput } from 'web/src/components/Input/TextInput';
import { CryptoCurrencyIcon } from 'web/src/components/CryptoCurrencyIcon/CryptoCurrencyIcon';
import { SelectCustomItem } from '../../SelectCustom/SelectCustomItem';
import * as s from './SelectCurrency.css';
import { SelectCustom } from '../../SelectCustom/SelectCustom';

interface Props {
  options: P2PCurrency[];
  value: P2PCurrency | null;
  onChange: (value: P2PCurrency) => void;
}

export const SelectCurrency = ({ options, value, onChange }: Props) => {
  const t = useSharedT();

  return (
    <SelectCustom
      options={options}
      value={value}
      onChange={onChange}
      withSearch
      searchFunction={(option, searchText) =>
        option.code.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
        option.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1
      }
      searchPlaceholder={t('Search')}
      getOptionValue={(option) => option.code}
      getOptionLabel={(option) => option.name}
      renderOption={(option) => {
        return (
          <Box display="flex" alignItems="center" gap="4x">
            <CryptoCurrencyIcon size="medium" currency={option.code} />
            <Box display="flex" alignItems="center" justifyContent="space-between" flexGrow={1}>
              <Box display="flex" flexDirection="column" gap="1x">
                <Text>{option.code}</Text>
                <Text color="textMuted" fontWeight="regular">
                  {option.name}
                </Text>
              </Box>
              {true ? (
                <Box display="flex" flexDirection="column" gap="1x" textAlign="right">
                  <Text>{'0,00107994'}</Text>
                  <Text color="textMuted" fontWeight="regular">
                    {'41,42 USD'}
                  </Text>
                </Box>
              ) : null}
            </Box>
          </Box>
        );
      }}
    />
  );
};
