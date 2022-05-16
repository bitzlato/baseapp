import { useCallback, useEffect, useMemo, useState, VFC } from 'react';
import { InputGroup } from 'react-bootstrap';
import { useDebounce } from 'use-debounce';
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

export const DEFAULT_ACTION_TYPE = 'selling';
export const DEFAULT_FIAT_CODE = 'RUB';
export const DEFAULT_CRYPTO_CODE = 'BTC';

const FILTER_INPUT_DEBOUNCE = 1500;

export interface FilterValues {
  type: AdvertType;
  currency: string;
  cryptocurrency: string;
  isOwnerVerificated: boolean;
  isOwnerTrusted: boolean;
  isOwnerActive: boolean;
  paymethod: number | undefined;
  amount: number | undefined;
}

interface Props {
  initialValues: FilterValues;
  onChange?: (newValues: FilterValues) => void;
}

interface PaymethodType {
  id: number;
  name: string;
}

export const Filter: VFC<Props> = ({ initialValues: initialValuesReactive, onChange }) => {
  // заглушка для useT
  // todo: добавить строки в переводы
  const t = (v: string) => v;

  // freeze values
  const [initialValues] = useState(initialValuesReactive);

  const [amountRaw, setAmount] = useState<string>('');
  const [amount] = useDebounce<string>(amountRaw, FILTER_INPUT_DEBOUNCE);
  const [advertType, setAdvertType] = useState(initialValues.type || DEFAULT_ACTION_TYPE);
  const [withOnline, setWithOnline] = useState(initialValues.isOwnerActive || false);
  const [withTrusted, setWithTrusted] = useState(initialValues.isOwnerTrusted || false);
  const [withVerified, setWithVerified] = useState(initialValues.isOwnerVerificated || false);
  const [fiatCurrency, setFiatCurrency] = useState<MoneyCurrency | null>(null);
  const [cryptoCurrency, setCryptoCurrency] = useState<WalletItemData | null>(null);
  const [paymethod, setPaymethod] = useState<PaymethodType | null>(null);

  const { fiatCurrencies } = useFiatCurrencies();
  const fiatCurrenciesArray: MoneyCurrency[] = useMemo(() => {
    if (fiatCurrencies && initialValues.currency in fiatCurrencies) {
      // set resolved fiat currency
      setFiatCurrency(fiatCurrencies[initialValues.currency] || null);
    }
    // use currencies as plain array
    return Object.values(fiatCurrencies);
  }, [fiatCurrencies, initialValues]);

  // fetch from api, ref: https://github.com/bitzlato/p2p-ssr/blob/develop/src/app/store/actions/adverts.ts#L209
  const paymethodsList: PaymethodType[] = [
    { id: 444, name: 'QIWI' },
    { id: 8802, name: 'Система Быстрых Платежей' },
  ];

  const applyFilter = useCallback(() => {
    console.log('apply filter call');
    const payload: FilterValues = {
      amount: amount ? parseInt(parseNumeric(amount), 10) : undefined,
      currency: fiatCurrency?.code || DEFAULT_FIAT_CODE,
      cryptocurrency:
        cryptoCurrency?.currency || initialValues.cryptocurrency || DEFAULT_CRYPTO_CODE,
      isOwnerActive: withOnline,
      isOwnerTrusted: withTrusted,
      isOwnerVerificated: withVerified,
      paymethod: paymethod?.id || undefined,
      type: advertType,
    };

    onChange?.(payload);
  }, [
    onChange,
    initialValues.cryptocurrency,
    amount,
    cryptoCurrency,
    fiatCurrency,
    withOnline,
    withTrusted,
    withVerified,
    paymethod,
    advertType,
  ]);

  // toggle apply on dependency changes
  useEffect(() => {
    applyFilter();
  }, [applyFilter]);

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
          inputGroupWrapper={(control) => {
            return (
              <InputGroup className="mb-3">
                {control}

                <Select<MoneyCurrency>
                  isSearchable
                  options={fiatCurrenciesArray}
                  value={fiatCurrency}
                  getOptionValue={(v) => v.code}
                  getOptionLabel={(v) => v.code}
                  onChange={setFiatCurrency}
                />
              </InputGroup>
            );
          }}
          label={t('Сумма')}
          value={amountRaw}
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
