import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Dropdown } from 'web/src/components/Dropdown/Dropdown';
import { SearchInput } from 'web/src/components/SelectCustom/SearchInput';
import { SelectCustomItem } from './SelectCustomItem';
import { SelectCustomChevron } from './SelectCustomChevron';

interface CommonOption<Option> {
  data: Option;
  value: string | number;
  isSelected: boolean;
}

export type Options<Option> = readonly Option[];

interface Props<Option> {
  options: Options<Option>;
  value?: Option | null;
  placeholder?: string;
  withSearch?: boolean;
  searchFunction: (option: Option, searchText: string) => boolean;
  searchPlaceholder?: string;
  noOptionsMessage?: string;
  renderOption?: (option: Option) => ReactNode;
  getOptionLabel?: (option: Option) => string;
  getOptionValue?: (option: Option) => string;
  isOptionSelected?: (option: Option, selectValue: Option | null) => boolean;
  onChange?: (option: Option) => void;
}

function getOptionLabelBuiltin<Option>(option: Option): string {
  return (option as { label?: unknown }).label as string;
}

function getOptionValueBuiltin<Option>(option: Option): string {
  return (option as { value?: unknown }).value as string;
}

export const SelectCustom = <Option,>({
  options,
  value = null,
  noOptionsMessage,
  renderOption,
  placeholder,
  withSearch = false,
  searchFunction,
  searchPlaceholder,
  getOptionValue = getOptionValueBuiltin,
  getOptionLabel = getOptionLabelBuiltin,
  isOptionSelected,
  onChange,
}: Props<Option>) => {
  const [selectedValue, setSelectedValue] = useState(value);
  const [searchText, setSearchText] = useState('');
  const filteredOptions = useMemo(() => {
    if (!withSearch) {
      return options;
    }

    return options.filter((option) => searchFunction(option, searchText));
  }, [withSearch, searchFunction, options, searchText]);

  useEffect(() => {
    if (value) {
      setSelectedValue(value);
    }
  }, [value]);

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
    return filteredOptions.map((option) => ({
      data: option,
      value: getOptionValue(option),
      isSelected: isOptionSelectedInner(option, value),
    }));
  }, [getOptionValue, isOptionSelectedInner, filteredOptions, value]);

  const renderOptionLabel = (option: Option) => {
    if (typeof renderOption === 'function') {
      return renderOption(option);
    }

    return getOptionLabel(option);
  };

  const renderSelectedOptionLabel = (option: Option) => {
    return getOptionLabel(option);
  };

  return (
    <Dropdown
      renderButton={({ open, onClick }) => (
        <Box
          as="button"
          type="button"
          position="relative"
          display="flex"
          alignItems="center"
          height="11x"
          width="full"
          px="2x"
          borderWidth="1x"
          borderStyle="solid"
          borderColor="selectInputBorder"
          borderRadius="1.5x"
          cursor="pointer"
          textAlign="left"
          onClick={onClick}
        >
          <Box width="full" color="selectInputPlaceholder">
            {selectedValue ? renderSelectedOptionLabel(selectedValue) : placeholder}
          </Box>
          <Box color="selectButtonText">
            <SelectCustomChevron open={open} />
          </Box>
        </Box>
      )}
      renderContent={({ onClose }) => (
        <>
          {withSearch ? (
            <Box
              pb="2x"
              borderBottomWidth="1x"
              borderBottomStyle="solid"
              borderColor="selectDropdownDelimeter"
            >
              <SearchInput
                value={searchText}
                placeholder={searchPlaceholder}
                onChange={setSearchText}
              />
            </Box>
          ) : null}
          <Box flexGrow={1} overflowY="auto">
            {formattedOptions.length > 0 ? (
              formattedOptions?.map((option) => (
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
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="full"
                color="text"
              >
                {noOptionsMessage}
              </Box>
            )}
          </Box>
        </>
      )}
    />
  );
};
