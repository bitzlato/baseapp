import { useMemo, useState } from 'react';
import { useSharedT } from 'web/src/components/shared/Adapter';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { NumberInput } from 'web/src/components/Input/NumberInput';
import { MoneyCurrency } from 'web/src/types';
import { SearchInput } from 'web/src/components/shared/Ads/SearchInput';
import { Dropdown, DropdownItem, DropdownChevron } from 'web/src/components/Dropdown';
import * as s from './InputAmountWithCurrency.css';

interface Props {
  amount: string;
  currencyList: MoneyCurrency[];
  selectedCurrency: MoneyCurrency | null;
  onChangeAmount: (value: string) => void;
  onChangeCurrency: (value: MoneyCurrency) => void;
}

export const InputAmountWithCurrency = ({
  amount,
  currencyList,
  selectedCurrency,
  onChangeAmount,
  onChangeCurrency,
}: Props) => {
  const t = useSharedT();
  const [searchText, setSearchText] = useState('');
  const filteredCurrencies = useMemo(() => {
    return currencyList.filter(
      (currency) =>
        currency.code.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
        currency.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1,
    );
  }, [searchText, currencyList]);

  return (
    <Dropdown
      renderButton={({ open, onClick }) => (
        <Box position="relative">
          <Box
            flexGrow={1}
            inputClassName={s.input}
            as={NumberInput}
            label={t('Amount')}
            value={amount}
            onChange={onChangeAmount}
          />

          <Box className={s.inputRightControls} display="flex" alignItems="center">
            <Box
              as="button"
              type="button"
              display="flex"
              alignItems="center"
              height="full"
              pl="3x"
              pr="1.5x"
              py="1.5x"
              mr="1.5x"
              borderRadius="1x"
              bg="selectButtonBg"
              color="selectButtonText"
              onClick={onClick}
            >
              <Box mr="1x">
                <Text variant="caption">{selectedCurrency?.code}</Text>
              </Box>
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
            {filteredCurrencies.length > 0 ? (
              filteredCurrencies?.map((currency) => (
                <DropdownItem
                  key={currency.code}
                  isSelected={currency.code === selectedCurrency?.code}
                  onClick={() => {
                    onChangeCurrency(currency);
                    onClose();
                  }}
                >
                  {currency.code} ({currency.name})
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
