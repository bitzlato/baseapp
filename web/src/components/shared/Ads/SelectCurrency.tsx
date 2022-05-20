import { useMemo, useState } from 'react';
import { useSharedT } from 'web/src/components/shared/Adapter';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { SearchInput } from 'web/src/components/shared/Ads/SearchInput';
import { Dropdown, DropdownItem, DropdownChevron } from 'web/src/components/Dropdown';
import { P2PCurrency } from 'web/src/modules/p2p/wallet-types';
import { TextInput } from 'web/src/components/Input/TextInput';
import { CryptoCurrencyIcon } from 'web/src/components/CryptoCurrencyIcon/CryptoCurrencyIcon';
import * as s from './SelectCurrency.css';

interface Props {
  options: P2PCurrency[];
  value: P2PCurrency | null;
  onChange: (value: P2PCurrency) => void;
}

export const SelectCurrency = ({ options, value, onChange }: Props) => {
  const t = useSharedT();
  const [searchText, setSearchText] = useState('');
  const filteredOptions = useMemo(() => {
    return options.filter(
      (option) =>
        option.code.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
        option.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1,
    );
  }, [searchText, options]);

  return (
    <Dropdown
      renderButton={({ open, onClick }) => (
        <Box position="relative" cursor="pointer" onClick={onClick}>
          {value ? (
            <Box className={s.inputPrefix}>
              <CryptoCurrencyIcon size="small" currency={value?.code} />
            </Box>
          ) : null}
          <Box
            readOnly
            inputClassName={s.input}
            as={TextInput}
            label={t('Cryptocurrency')}
            value={value?.code}
          />
          <Box className={s.inputRightControls}>
            <Box as="button" type="button" px="3x" py="1.5x" color="selectButtonText">
              <DropdownChevron open={open} />
            </Box>
          </Box>
        </Box>
      )}
      renderContent={({ onClose }) => (
        <>
          <SearchInput value={searchText} placeholder={t('Search')} onChange={setSearchText} />

          <Box
            flexGrow={1}
            pt="2x"
            overflowY="auto"
            borderTopWidth="1x"
            borderTopStyle="solid"
            borderColor="selectDropdownDelimeter"
          >
            {filteredOptions.length > 0 ? (
              filteredOptions?.map((option) => (
                <DropdownItem
                  key={option.code}
                  isSelected={option.code === value?.code}
                  onClick={() => {
                    onChange(option);
                    onClose();
                  }}
                >
                  <Box display="flex" alignItems="center" gap="4x">
                    <CryptoCurrencyIcon size="medium" currency={option.code} />
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      flexGrow={1}
                    >
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
                </DropdownItem>
              ))
            ) : (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="full"
                color="text"
              >
                {t('Nothing found')}
              </Box>
            )}
          </Box>
        </>
      )}
    />
  );
};
