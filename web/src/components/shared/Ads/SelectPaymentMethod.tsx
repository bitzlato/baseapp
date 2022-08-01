import { useSharedT } from 'web/src/components/shared/Adapter';
import { PaymethodSource } from 'web/src/modules/p2p/types';
import { SelectCustom } from 'web/src/components/SelectCustom/SelectCustom';

interface PaymentOption extends Pick<PaymethodSource, 'id' | 'description'> {}

interface Props {
  options: PaymentOption[];
  value: PaymentOption | null;
  onChange: (value: PaymentOption) => void;
}

export const searchFunction = (searchText: string, _optionValue: string, option: PaymentOption) =>
  option.description.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

export const getOptionValue = (option: PaymentOption) => option.id.toString();
export const getOptionLabel = (option: PaymentOption) => option.description;

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
