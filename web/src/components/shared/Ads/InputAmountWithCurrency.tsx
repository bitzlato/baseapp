import { useSharedT } from 'web/src/components/shared/Adapter';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { NumberInput } from 'web/src/components/Input/NumberInput';
import { SelectCustom, SelectCustomProps } from 'web/src/components/SelectCustom/SelectCustom';
import { SelectCustomChevron } from 'web/src/components/SelectCustom/SelectCustomChevron';
import * as s from './InputAmountWithCurrency.css';

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

const searchFunction = (searchText: string, _optionValue: string, option: CommonOption) => {
  return (
    option.code.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
    option.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1
  );
};

const getOptionValue = (option: CommonOption) => option.code;
const getOptionLabel = (option: CommonOption) => `${option.code} (${option.name})`;

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
      <Box
        flexGrow={1}
        inputClassName={s.input}
        as={NumberInput}
        label={label}
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
