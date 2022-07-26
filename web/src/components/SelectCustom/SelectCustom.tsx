import { ReactNode, useCallback, useMemo, useState } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Dropdown } from 'web/src/components/Dropdown/Dropdown';
import { SearchInput } from 'web/src/components/SelectCustom/SearchInput';
import { useStateWithDeps } from 'web/src/hooks/useStateWithDeps';
import { SelectCustomItem } from './SelectCustomItem';
import { SelectCustomChevron } from './SelectCustomChevron';

interface CommonOption<Option> {
  data: Option;
  value: string | number;
  isSelected: boolean;
}

export type Options<Option> = readonly Option[];

export interface SelectCustomProps<Option> {
  options: Options<Option>;
  value?: Option | null;
  placeholder?: string;
  placeholderFloat?: boolean;
  withSearch?: boolean;
  searchFunction?: (searchText: string, optionValue: string, option: Option) => boolean;
  searchPlaceholder?: string;
  noOptionsMessage?: string;
  renderOption?: ((option: Option) => ReactNode) | undefined;
  renderLabel?: ((option: Option) => ReactNode) | undefined;
  renderCustomButton?: (props: {
    selectedValue: Option | null;
    placeholder?: string | undefined;
    open: boolean;
    onClick: () => void;
  }) => ReactNode;
  getOptionLabel?: (option: Option) => string;
  getOptionValue?: (option: Option) => string;
  isOptionSelected?: (option: Option, selectValue: Option | null) => boolean;
  isError?: boolean | undefined;
  onChange?: (option: Option) => void;
}

function getOptionLabelBuiltin<Option>(option: Option): string {
  return (option as { label?: unknown }).label as string;
}

function getOptionValueBuiltin<Option>(option: Option): string {
  return (option as { value?: unknown }).value as string;
}

function searchFunctionBuiltin(searchText: string, optionValue: string) {
  return optionValue.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
}

export const SelectCustom = <Option,>({
  options,
  value = null,
  placeholder,
  placeholderFloat = false,
  withSearch = false,
  searchFunction = searchFunctionBuiltin,
  searchPlaceholder,
  noOptionsMessage,
  renderOption,
  renderLabel,
  renderCustomButton,
  getOptionValue = getOptionValueBuiltin,
  getOptionLabel = getOptionLabelBuiltin,
  isOptionSelected,
  isError = false,
  onChange,
}: SelectCustomProps<Option>) => {
  const [selectedValue, setSelectedValue] = useStateWithDeps(() => value, [value]);
  const [searchText, setSearchText] = useState('');

  const isOptionSelectedInner = useCallback(
    (option: Option, selectValue: Option | null): boolean => {
      if (!selectValue) {
        return false;
      }

      if (typeof isOptionSelected === 'function') {
        return isOptionSelected(option, selectValue);
      }

      return getOptionValue(selectValue) === getOptionValue(option);
    },
    [getOptionValue, isOptionSelected],
  );

  const formattedOptions: Options<CommonOption<Option>> = useMemo(() => {
    const formatted = options.map((option) => ({
      data: option,
      value: getOptionValue(option),
      isSelected: isOptionSelectedInner(option, value),
    }));

    if (!withSearch || searchText.length === 0) {
      return formatted;
    }

    return formatted.filter((option) => searchFunction(searchText, option.value, option.data));
  }, [
    value,
    options,
    getOptionValue,
    isOptionSelectedInner,
    withSearch,
    searchFunction,
    searchText,
  ]);

  const renderOptionLabel = (option: Option) => {
    if (typeof renderOption === 'function') {
      return renderOption(option);
    }

    return getOptionLabel(option);
  };

  const renderSelectedOptionLabel = (option: Option) => {
    if (typeof renderLabel === 'function') {
      return renderLabel(option);
    }

    return getOptionLabel(option);
  };

  const renderButton = ({ open, onClick }: { open: boolean; onClick: () => void }) => {
    const showPlaceholder = selectedValue ? placeholderFloat : true;

    if (renderCustomButton) {
      return renderCustomButton({ selectedValue, placeholder, open, onClick });
    }

    return (
      <Box
        as="button"
        type="button"
        position="relative"
        display="flex"
        alignItems="center"
        height="12x"
        width="full"
        px="4x"
        borderWidth="1x"
        borderStyle="solid"
        borderColor={isError ? 'danger' : 'inputBorder'}
        borderRadius="1.5x"
        cursor="pointer"
        textAlign="left"
        onClick={onClick}
      >
        <Box display="flex" flexDirection="column" alignItems="center" width="full">
          {showPlaceholder ? (
            <Box
              width="full"
              color="inputPlaceholder"
              fontSize={selectedValue ? 'caption' : 'medium'}
            >
              {placeholder}
            </Box>
          ) : null}
          {selectedValue ? (
            <Box width="full" color="text" fontSize="medium">
              {renderSelectedOptionLabel(selectedValue)}
            </Box>
          ) : null}
        </Box>

        <Box color="selectButtonText">
          <SelectCustomChevron open={open} />
        </Box>
      </Box>
    );
  };

  const renderMenu = ({ onClose }: { onClose: () => void }) => (
    <>
      {withSearch ? (
        <Box borderBottomWidth="1x" borderBottomStyle="solid" borderColor="selectDropdownDelimeter">
          <SearchInput
            value={searchText}
            placeholder={searchPlaceholder}
            onChange={setSearchText}
          />
        </Box>
      ) : null}

      <Box flexGrow={1} py="2x" overflowY="auto">
        {formattedOptions.length > 0 ? (
          formattedOptions.map((option) => (
            <SelectCustomItem
              key={option.value}
              isSelected={option.isSelected}
              onClick={() => {
                setSelectedValue(option.data);
                onChange?.(option.data);
                onClose();
              }}
            >
              {renderOptionLabel(option.data)}
            </SelectCustomItem>
          ))
        ) : (
          <Box display="flex" justifyContent="center" alignItems="center" color="text" py="20x">
            {noOptionsMessage}
          </Box>
        )}
      </Box>
    </>
  );

  return <Dropdown renderButton={renderButton} renderContent={renderMenu} />;
};
