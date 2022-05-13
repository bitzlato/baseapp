import { useEffect, useMemo, useState, VFC } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { Stack } from 'web/src/components/ui/Stack';
import { SwitchRow } from 'web/src/components/form/SwitchRow';
import { Box } from 'web/src/components/ui/Box';
import { useGeneralWallets } from 'web/src/hooks/useGeneralWallets';
import { AdvertType } from 'web/src/modules/p2p/types';
import { CryptoCurrencyIcon } from 'web/src/components/CryptoCurrencyIcon/CryptoCurrencyIcon';
import { NumberInput } from 'web/src/components/Input/NumberInput';
import { Select } from 'web/src/components/Select/Select';
import { VariantSwitcher } from 'web/src/components/ui/VariantSwitcher';
import { WalletItemData } from 'web/src/components/WalletItem/WalletItem';
import { useFiatCurrencies } from '../../../hooks/data/useFetchP2PCurrencies';
import { MoneyCurrency } from '../../../types';

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

  const [amount, setAmount] = useState<number>(0);
  const [advertType, setAdvertType] = useState(initialValues.type || 'purchase');
  const [withOnline, setWithOnline] = useState(initialValues.isOwnerActive || false);
  const [withTrusted, setWithTrusted] = useState(initialValues.isOwnerTrusted || false);
  const [withVerified, setWithVerified] = useState(initialValues.isOwnerVerificated || false);
  const [fiatCurrency, setFiatCurrency] = useState<MoneyCurrency | null>(null);
  const [cryptoCurrency, setCryptoCurrency] = useState<WalletItemData | null>(null);
  const [cryptoCurrencyCode, setCryptoCurrencyCode] = useState<string | null>(
    initialValues.cryptocurrency,
  );
  const [paymethod, setPaymethod] = useState<PaymethodType | null>(null);

  const cryptoList: WalletItemData[] = useGeneralWallets();

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
      amount,
      currency: fiatCurrency?.code || 'RUB',
      cryptocurrency: cryptoCurrency?.currency || '',
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
    cryptoCurrencyCode,
    fiatCurrency,
    withOnline,
    withTrusted,
    withVerified,
    paymethod,
    advertType,
  ]);

  const renderCryptoListItem = (d: WalletItemData) => {
    // todo: show current balance
    return (
      <Box>
        <CryptoCurrencyIcon size="small" currency={d.currency} />
        <Box as="span">{d.name}</Box>
      </Box>
    );
  };

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

        <Select<WalletItemData>
          isSearchable
          options={cryptoList}
          placeholder={t('Криптовалюта')}
          value={cryptoCurrency}
          getOptionValue={(v) => v.currency}
          onChange={(v) => {
            setCryptoCurrency(v);
            setCryptoCurrencyCode(v?.currency || null);
          }}
          formatOptionLabel={renderCryptoListItem}
        />

        <Box
          flex="1"
          as={NumberInput}
          label={t('Сумма')}
          labelVisible
          value={amount}
          onChange={(v: string) => setAmount(parseFloat(v))}
        />

        <Select<MoneyCurrency>
          isSearchable
          options={fiatCurrenciesArray}
          placeholder={t('Валюта')}
          value={fiatCurrency}
          getOptionValue={(v) => v.code}
          getOptionLabel={(v) => v.name}
          onChange={(v) => setFiatCurrency(v)}
        />

        <Select<PaymethodType>
          isSearchable
          options={paymethodsList}
          placeholder={t('Способ оплаты')}
          value={paymethod}
          getOptionValue={(v) => v.id.toString()}
          getOptionLabel={(v) => v.name}
          onChange={(v) => setPaymethod(v)}
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
