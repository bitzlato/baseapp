import { useSharedT } from 'web/src/components/shared/Adapter';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { SelectCustom, SelectCustomProps } from 'web/src/components/SelectCustom/SelectCustom';
import { SelectCustomChevron } from 'web/src/components/SelectCustom/SelectCustomChevron';
import { TextInput } from 'web/src/components/TextInputCustom/TextInputCustom';
import * as s from 'web/src/components/TextInputCustom/TextInputWithControl.css';

interface CommonOption {
  code: string;
  name: string;
}

interface Props<Option extends CommonOption> {
  label: string;
  amount: string;
  currencyList: Option[];
  selectedCurrency: Option | null;
  renderOption?: SelectCustomProps<Option>['renderOption'];
  onChangeAmount: (value: string) => void;
  onChangeCurrency: (value: Option) => void;
}

export const searchFunction = (searchText: string, _optionValue: string, option: CommonOption) => {
  return (
    option.code.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
    option.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1
  );
};

export const getOptionValue = (option: CommonOption) => option.code;
export const getOptionLabel = (option: CommonOption) => `${option.code} (${option.name.trim()})`;

export const InputAmountWithCurrency = <Option extends CommonOption>({
  label,
  amount,
  currencyList,
  selectedCurrency,
  renderOption,
  onChangeAmount,
  onChangeCurrency,
}: Props<Option>) => {
  const t = useSharedT();

  const renderCustomButton = ({ open, onClick }: { open: boolean; onClick: () => void }) => (
    <Box position="relative">
      <TextInput
        className={s.input}
        label={label}
        inputMode="decimal"
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
          minWidth="18x"
          borderRadius="1x"
          bg="selectButtonBg"
          color="selectButtonText"
          onClick={onClick}
        >
          <Box mr="1x">
            <Text variant="caption">{selectedCurrency?.code}</Text>
          </Box>
          <SelectCustomChevron open={open} />
        </Box>
      </Box>
    </Box>
  );

  return (
    <SelectCustom
      withSearch
      options={currencyList}
      value={selectedCurrency}
      searchFunction={searchFunction}
      searchPlaceholder={t('Search')}
      noOptionsMessage={t('Nothing found')}
      getOptionValue={getOptionValue}
      getOptionLabel={getOptionLabel}
      renderCustomButton={renderCustomButton}
      renderOption={renderOption}
      onChange={onChangeCurrency}
    />
  );
};
