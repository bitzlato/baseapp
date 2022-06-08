import { useSharedT } from 'web/src/components/shared/Adapter';
import { PaymethodInfoSource } from 'web/src/modules/p2p/types';
import { SelectCustom } from 'web/src/components/SelectCustom/SelectCustom';

interface Props {
  options: PaymethodInfoSource[];
  value: PaymethodInfoSource | null;
  onChange: (value: PaymethodInfoSource) => void;
}

const searchFunction = (searchText: string, _optionValue: string, option: PaymethodInfoSource) =>
  option.description.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

const getOptionValue = (option: PaymethodInfoSource) => option.id.toString();
const getOptionLabel = (option: PaymethodInfoSource) => option.description;

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
      withSearch
      onChange={onChange}
    />
  );
};
