import { useMemo, useState } from 'react';
import { useP2PCurrencyOptions } from 'web/src/hooks/data/useFetchP2PCurrencies';
import { Select } from 'web/src/components/Select/Select';
import { useT } from 'web/src/hooks/useT';
import { P2PCurrencyOption } from 'web/src/modules/public/currencies/types';
import * as s from './BaseCurrencyField.css';

interface Props {
  defaultValue: string;
  onChange: (currency: string) => void;
}

export const BaseCurrencyField = ({ defaultValue, onChange }: Props) => {
  const t = useT();
  const swr = useP2PCurrencyOptions();
  const [baseCurrencyOption, setBaseCurrencyOption] = useState<P2PCurrencyOption | null>(null);

  const defaultBaseCurrencyOption = useMemo(() => {
    if (swr.data) {
      return swr.data?.find(({ value }) => value === defaultValue) ?? null;
    }

    return null;
  }, [swr.data, defaultValue]);

  if (swr.error) {
    return null;
  }

  const handleChangeBaseCurrency = (newValue: P2PCurrencyOption | null) => {
    setBaseCurrencyOption(newValue);

    if (newValue) {
      onChange(newValue.value);
    }
  };

  return (
    <Select
      className={s.select}
      options={swr.data ?? []}
      placeholder={t('Default currency')}
      value={baseCurrencyOption ?? defaultBaseCurrencyOption}
      defaultValue={defaultBaseCurrencyOption}
      isLoading={swr.data === undefined}
      isSearchable
      onChange={handleChangeBaseCurrency}
    />
  );
};
