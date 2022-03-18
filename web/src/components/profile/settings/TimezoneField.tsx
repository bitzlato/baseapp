import { ReactNode, useEffect, useMemo, useState } from 'react';
import { fetchTimezoneList, TimezoneItem } from 'web/src/helpers/timezones';
import { Select } from 'web/src/components/Select/Select';
import { Text } from 'web/src/components/ui/Text';
import { useT } from 'web/src/hooks/useT';
import * as s from './BaseCurrencyField.css';

const formatTimezoneOptionLabel = ({ offsetText, name }: TimezoneItem): ReactNode => {
  return (
    <>
      <Text as="span" variant="caption" color="textMuted">
        {offsetText}
      </Text>{' '}
      {name}
    </>
  );
};

interface Props {
  defaultValue?: string | null | undefined;
  onChange: (timezone: string) => void;
}

export const TimezoneField = ({ defaultValue, onChange }: Props) => {
  const t = useT();
  const [timezoneOptions, setTimezoneOptions] = useState<readonly TimezoneItem[]>();
  const [timezoneOption, setTimezoneOption] = useState<TimezoneItem | null>(null);

  useEffect(() => {
    (async () => {
      setTimezoneOptions(await fetchTimezoneList());
    })();
  }, []);

  const defaultTimezoneOption = useMemo(() => {
    if (timezoneOptions && defaultValue) {
      return timezoneOptions.find(({ timezones }) => timezones.includes(defaultValue)) ?? null;
    }

    return null;
  }, [timezoneOptions, defaultValue]);

  const handleChangeBaseCurrency = (newValue: TimezoneItem | null) => {
    setTimezoneOption(newValue);

    if (newValue) {
      onChange(newValue.timezones[0] as string);
    }
  };

  return (
    <Select<TimezoneItem>
      className={s.select}
      options={timezoneOptions ?? []}
      placeholder={t('Timezone')}
      value={timezoneOption ?? defaultTimezoneOption}
      defaultValue={defaultTimezoneOption}
      formatOptionLabel={formatTimezoneOptionLabel}
      isLoading={timezoneOptions === undefined}
      isSearchable
      onChange={handleChangeBaseCurrency}
    />
  );
};
