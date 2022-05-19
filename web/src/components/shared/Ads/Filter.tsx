import { useMemo, useState, FC } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { NumberInput } from 'web/src/components/Input/NumberInput';
import { Select } from 'web/src/components/Select/Select';
import { Box } from 'web/src/components/ui/Box';
import { VariantSwitcher } from 'web/src/components/ui/VariantSwitcher';
import { useFiatCurrencies } from 'web/src/hooks/data/useFetchP2PCurrencies';
import { useFetchP2PCryptoCurrencies } from 'web/src/hooks/data/useFetchP2PWallets';
import { useFetchPaymethods } from 'web/src/hooks/data/useFetchPaymethods';
import { AdvertParams, AdvertType, PaymethodInfo } from 'web/src/modules/p2p/types';
import { MoneyCurrency } from 'web/src/types';
import { P2PCurrency } from 'web/src/modules/p2p/wallet-types';
import { parseNumeric } from 'web/src/helpers/parseNumeric';
import { getCurrencyCodeSymbol } from 'web/src/helpers/getCurrencySymbol';
import { SwitchField } from 'web/src/components/profile/settings/SwitchField';
import { CryptoCurrencyIcon } from 'web/src/components/CryptoCurrencyIcon/CryptoCurrencyIcon';
import { useSharedT } from 'web/src/components/shared/Adapter';

const INPUT_DEBOUNCE = 500;
const EMPTY_ARR: unknown[] = [];

interface Props {
  params: AdvertParams;
  onChange: (v: Partial<AdvertParams>) => void;
}

export const Filter: FC<Props> = ({ params, onChange }) => {
  const t = useSharedT();

  const [amount, setAmount] = useState<string>(params.amount ?? '');

  const { data: cryptoCurrencies = [] } = useFetchP2PCryptoCurrencies();
  const cryptoCurrencyV = useMemo(() => {
    return cryptoCurrencies.find((d) => d.code === params.cryptocurrency) ?? null;
  }, [cryptoCurrencies, params.cryptocurrency]);

  const { fiatCurrencies } = useFiatCurrencies();
  const fiats = useMemo(() => Object.values(fiatCurrencies), [fiatCurrencies]);
  const fiatCurrencyV = useMemo(() => {
    return fiats.find((d) => d.code === params.currency) ?? null;
  }, [fiats, params.currency]);

  const paymethodsResp = useFetchPaymethods({
    lang: params.lang,
    type: params.type,
    currency: params.currency,
    cryptocurrency: params.cryptocurrency,
    isOwnerActive: params.isOwnerActive,
    isOwnerTrusted: params.isOwnerTrusted,
    isOwnerVerificated: params.isOwnerVerificated,
  });

  const paymethods = paymethodsResp.data?.data ?? (EMPTY_ARR as PaymethodInfo[]);
  const paymethodV = useMemo(() => {
    return paymethods.find((d) => d.id === params.paymethod) ?? null;
  }, [paymethods, params.paymethod]);

  const variants = useMemo(
    () => [
      {
        value: 'purchase',
        label: t('Buy'),
      },
      {
        value: 'selling',
        label: t('Sell'),
      },
    ],
    [t],
  );

  const changeAmountDebounced = useDebouncedCallback((d: string) => {
    onChange({ amount: d || undefined });
  }, INPUT_DEBOUNCE);

  const handleChangeAmount = (d: string) => {
    const nvalue = parseNumeric(d);
    setAmount(nvalue);
    changeAmountDebounced(nvalue);
  };

  const renderDropdownItem = (d: P2PCurrency) => {
    return (
      <Box display="flex" alignItems="center" gap="2x">
        <CryptoCurrencyIcon size="small" currency={d.code} />
        <span>{getCurrencyCodeSymbol(d.code)}</span>
      </Box>
    );
  };

  return (
    <Box display="flex" flexDirection="column" gap="6x">
      <VariantSwitcher
        name="advertType"
        target="form"
        variants={variants}
        value={params.type}
        onChange={(v) => onChange({ type: v as AdvertType, paymethod: undefined, skip: 0 })}
      />
      <Box display="flex" flexDirection="column" gap="4x">
        <Select<P2PCurrency>
          isSearchable
          options={cryptoCurrencies}
          placeholder={t('Cryptocurrency')}
          value={cryptoCurrencyV}
          getOptionValue={(v) => v.code}
          getOptionLabel={(v) => v.code}
          formatOptionLabel={renderDropdownItem}
          onChange={(v) => onChange({ cryptocurrency: v!.code, paymethod: undefined })}
        />
        <Box display="flex" gap="2x">
          <Box
            flexGrow={1}
            as={NumberInput}
            label={t('Amount')}
            value={amount}
            onChange={handleChangeAmount}
          />
          <Select<MoneyCurrency>
            isSearchable
            options={fiats}
            placeholder={t('Currency')}
            value={fiatCurrencyV}
            getOptionValue={(v) => v.code}
            getOptionLabel={(v) => v.name}
            onChange={(v) => onChange({ currency: v!.code, paymethod: undefined })}
          />
        </Box>
        <Select<PaymethodInfo>
          isSearchable
          options={paymethods}
          placeholder={t('Payment method')}
          value={paymethodV}
          getOptionValue={(v) => v.id.toString()}
          getOptionLabel={(v) => v.description}
          onChange={(v) => onChange({ paymethod: v!.id })}
        />
      </Box>
      <SwitchField
        id="filter.with_verified"
        label={t('Verified users')}
        helpText={t('ad.verified.info')}
        value={params.isOwnerVerificated}
        onChange={(v) => onChange({ isOwnerVerificated: v })}
      />
      <SwitchField
        id="filter.with_trusted"
        label={t('Trusted users')}
        helpText={t('ad.trusted.info')}
        value={params.isOwnerTrusted}
        onChange={(v) => onChange({ isOwnerTrusted: v })}
      />
      <SwitchField
        id="filter.with_online"
        label={t('Active users')}
        helpText={t('ad.active.info')}
        value={params.isOwnerActive}
        onChange={(v) => onChange({ isOwnerActive: v })}
      />
    </Box>
  );
};
