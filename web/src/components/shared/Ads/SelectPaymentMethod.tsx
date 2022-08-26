import { useSharedT } from 'web/src/components/shared/Adapter';
import { PaymethodInfoSource } from 'web/src/modules/p2p/types';
import { SelectCustom } from 'web/src/components/SelectCustom/SelectCustom';

interface PaymethodOption extends Pick<PaymethodInfoSource, 'id' | 'description' | 'slug'> {}

interface Props {
  options: PaymethodOption[];
  value: PaymethodOption | null;
  onChange: (value: PaymethodOption) => void;
}

export const searchFunction = (searchText: string, _optionValue: string, option: PaymethodOption) =>
  option.description.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

export const getOptionValue = (option: PaymethodOption) => option.slug ?? '';
export const getOptionLabel = (option: PaymethodOption) => option.description;

export const SelectPaymentMethod = ({ options, value, onChange }: Props) => {
  const t = useSharedT();

  return (
    <SelectCustom
      options={options}
      value={value}
      placeholder={t('Payment method')}
      noOptionsMessage={t('Nothing found')}
      getOptionValue={getOptionValue}
      getOptionLabel={getOptionLabel}
      searchFunction={searchFunction}
      searchPlaceholder={t('Search')}
      withSearch
      onChange={onChange}
    />
  );
};
