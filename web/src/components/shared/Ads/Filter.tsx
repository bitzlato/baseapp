import { useState, VFC } from 'react';
import { SwitchRow } from 'web/src/components/form/SwitchRow';
import { Box } from 'web/src/components/ui/Box';
import { AdvertParams } from 'web/src/modules/p2p/ad.types';
import { useGeneralWallets } from '../../../hooks/useGeneralWallets';
import { CryptoCurrencyIcon } from '../../CryptoCurrencyIcon/CryptoCurrencyIcon';
import { RadioButton } from '../../form/RadioButton';
import { NumberInput } from '../../Input/NumberInput';
import { Select, SelectString } from '../../Select/Select';
import { WalletItemData } from '../../WalletItem/WalletItem';

import * as s from './Filter.css';

interface Props {
  initialValues: AdvertParams,
  onApply?: (newValues: FilterValues) => void
}

export interface FilterValues extends AdvertParams {
  amount: number;
}

export const Filter: VFC<Props> = ({
  initialValues, onApply,
}) => {
  // заглушка для useT
  const t = (v: string) => v;

  const [amount, setAmount] = useState(null);
  const [advertType, setAdvertType] = useState(initialValues.type || 'purchase');
  const [withTrusted, setWithTrusted] = useState(initialValues.isOwnerTrusted || false);
  const [withVerified, setWithVerified] = useState(initialValues.isOwnerVerificated || false);
  const [cryptoCurrency, setCryptoCurrency] = useState(null);
  const [cryptoCurrencyCode, setCryptoCurrencyCode] = useState(initialValues.cryptocurrency);
  const [paymethod, setPaymethod] = useState(initialValues.paymethod);

  const cryptoList: WalletItemData[] = useGeneralWallets();

  // from api? /Volumes/zlato/p2p-ssr/src/app/adverts/CreateAdvert/CreateAdvertForm.tsx
  const paymethodsList = [
    { value: 'epayment', label: 'Электронные платежи' },
  ];

  const applyFilter = () => {
    const payload = Object.assign({}, initialValues, {
      amount,
      paymethod,
      cryptocurrency: cryptoCurrencyCode,
      type: advertType,
      isOwnerVerificated: withVerified,
      isOwnerTrusted: withTrusted,
    });

    onApply?.(payload);
  };

  const renderCryptoListItem = (d: WalletItemData) => {
    return (
      <Box>
        <CryptoCurrencyIcon size="small" currency={d.currency} />
        <Box as="span">{d.name}</Box>
      </Box>
    );
  };

  return <div className={s.filter}>
    <RadioButton
      options={[
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
      onChange={setAdvertType}
    />

    <SelectString<WalletItemData>
      isSearchable
      options={cryptoList}
      value={cryptoCurrency}
      onChange={(v) => {
        setCryptoCurrency(v || '');
        setCryptoCurrencyCode(v?.currency);
      }}
      placeholder={t('Криптовалюта')}
      formatOptionLabel={renderCryptoListItem}
    />

    <Box
      flex="1"
      as={NumberInput}
      label={t('Сумма')}
      labelVisible
      value={amount}
      onChange={(v) => setAmount(v)}
    />

    <Select
      isSearchable
      options={paymethodsList}
      placeholder={t('Способ оплаты')}
      value={paymethod}
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
      helpText={t('Показывать объявления только трейдеров, которых вы ранее добавили в список доверенных')}
      value={withTrusted}
      onChange={setWithTrusted}
    />

    <pre>{JSON.stringify({
      amount,
      paymethod,
      cryptoCurrencyCode,
      actionDirection: advertType,
      withVerified,
      withTrusted,
    }, null, ' ')}</pre>

  </div>;
};
