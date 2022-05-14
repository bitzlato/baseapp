import { useEffect, useMemo, useState, VFC } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { SwitchRow } from 'web/src/components/form/SwitchRow';
import { NumberInput } from 'web/src/components/Input/NumberInput';
import { Select } from 'web/src/components/Select/Select';
import { Stack } from 'web/src/components/ui/Stack';
import { VariantSwitcher } from 'web/src/components/ui/VariantSwitcher';
import { WalletItemData } from 'web/src/components/WalletItem/WalletItem';
import { AdvertType } from 'web/src/modules/p2p/types';
import { parseNumeric } from '../../../helpers/parseNumeric';
import { useFiatCurrencies } from '../../../hooks/data/useFetchP2PCurrencies';
import { MoneyCurrency } from '../../../types';
import { SelectCrypto } from '../../SelectCrypto/SelectCrypto';

import * as s from './Filter.css';

export interface FilterValues {
  amount: number;
  type: AdvertType;
  currency: string;
  cryptocurrency: string;
  isOwnerVerificated: boolean;
  isOwnerTrusted: boolean;
  isOwnerActive: boolean;
  paymethod: number;
}

interface Props {
  initialValues: FilterValues;
  onChange?: (newValues: FilterValues) => void;
}

interface PaymethodType {
  id: number;
  name: string;
}

export const Filter: VFC<Props> = ({ initialValues, onChange }) => {
  // заглушка для useT
  // todo: добавить строки в переводы
  const t = (v: string) => v;

  const [amount, setAmount] = useState<string>('');
  const [advertType, setAdvertType] = useState(initialValues.type || 'purchase');
  const [withOnline, setWithOnline] = useState(initialValues.isOwnerActive || false);
  const [withTrusted, setWithTrusted] = useState(initialValues.isOwnerTrusted || false);
  const [withVerified, setWithVerified] = useState(initialValues.isOwnerVerificated || false);
  const [fiatCurrency, setFiatCurrency] = useState<MoneyCurrency | null>(null);
  const [cryptoCurrency, setCryptoCurrency] = useState<WalletItemData | null>(null);
  const [paymethod, setPaymethod] = useState<PaymethodType | null>(null);

  const { fiatCurrencies } = useFiatCurrencies();
  const fiatCurrenciesArray: MoneyCurrency[] = useMemo(() => {
    return Object.values(fiatCurrencies);
  }, [fiatCurrencies]);

  // fetch from api, ref: https://github.com/bitzlato/p2p-ssr/blob/develop/src/app/store/actions/adverts.ts#L209
  const paymethodsList: PaymethodType[] = [
    { id: 444, name: 'QIWI' },
    { id: 8802, name: 'Система Быстрых Платежей' },
  ];

  const applyFilter = () => {
    const payload: FilterValues = {
      amount: parseInt(parseNumeric(amount)),
      currency: fiatCurrency?.code || initialValues.currency || 'RUB',
      cryptocurrency: cryptoCurrency?.currency || initialValues.cryptocurrency || 'BTC',
      isOwnerActive: withOnline,
      isOwnerTrusted: withTrusted,
      isOwnerVerificated: withVerified,
      paymethod: paymethod?.id || 0,
      type: advertType,
    };

    onChange?.(payload);
  };

  const applyFilterAutomatically = useDebouncedCallback(() => {
    applyFilter();
  }, 1000);

  // toggle apply on dependency change
  useEffect(() => {
    applyFilterAutomatically();
  }, [
    amount,
    cryptoCurrency,
    fiatCurrency,
    withOnline,
    withTrusted,
    withVerified,
    paymethod,
    advertType,
  ]);

  return (
    <div className={s.filter}>
      <Stack direction="column" marginBottom="5x">
        <VariantSwitcher
          name="advertType"
          target="form"
          variants={[
            {
              value: 'purchase',
              label: t('Купить'),
            },
            {
              value: 'selling',
              label: t('Продать'),
            },
          ]}
          value={advertType}
          onChange={(v) => setAdvertType(v as AdvertType)}
        />

        <SelectCrypto
          label={t('Криптовалюта')}
          defaultCurrencyCode={initialValues.cryptocurrency || 'BTC'}
          value={cryptoCurrency}
          onChange={setCryptoCurrency}
        />

        <NumberInput
          label={t('Сумма')}
          value={amount}
          onChange={setAmount}
        />

        <Select<MoneyCurrency>
          isSearchable
          options={fiatCurrenciesArray}
          placeholder={t('Валюта')}
          value={fiatCurrency}
          getOptionValue={(v) => v.code}
          getOptionLabel={(v) => v.name}
          onChange={setFiatCurrency}
        />

        <Select<PaymethodType>
          isSearchable
          options={paymethodsList}
          placeholder={t('Способ оплаты')}
          value={paymethod}
          getOptionValue={(v) => v.id.toString()}
          getOptionLabel={(v) => v.name}
          onChange={setPaymethod}
        />

        <SwitchRow
          id="filter.with_verified"
          label={t('Проверенные пользователи')}
          helpText={t('Показывать объявления только трейдеров с пройденной верификацией личности')}
          value={withVerified}
          onChange={setWithVerified}
        />

        <SwitchRow
          id="filter.with_trusted"
          label={t('Доверенные пользователи')}
          helpText={t(
            'Показывать объявления только трейдеров, которых вы ранее добавили в список доверенных',
          )}
          value={withTrusted}
          onChange={setWithTrusted}
        />

        <SwitchRow
          id="filter.with_online"
          label={t('Активные пользователи')}
          helpText={t('Показывать объявления только трейдеров, которые сейчас в сети')}
          value={withOnline}
          onChange={setWithOnline}
        />
      </Stack>
    </div>
  );
};
