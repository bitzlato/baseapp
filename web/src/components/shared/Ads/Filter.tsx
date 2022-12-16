import { useMemo, useState, FC } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { Box } from 'web/src/components/ui/Box';
import { Button } from 'web/src/components/ui/Button';
import { VariantSwitcher } from 'web/src/components/ui/VariantSwitcher';
import { useP2PFiatCurrencies } from 'web/src/hooks/useP2PFiatCurrencies';
import { useFetchPaymethods } from 'web/src/hooks/data/useFetchPaymethods';
import { AdvertParams, AdvertType, PaymethodInfoSource } from 'web/src/modules/p2p/types';
import { parseNumeric } from 'web/src/helpers/parseNumeric';
import { SwitchField } from 'web/src/components/profile/settings/SwitchField';
import { useSharedT } from 'web/src/components/shared/Adapter';
import { InputAmountWithCurrency } from 'web/src/components/shared/Ads/InputAmountWithCurrency';
import { SelectPaymentMethod } from 'web/src/components/shared/Ads/SelectPaymentMethod';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'web/src/components/ui/Modal';
import { useStateWithDeps } from 'web/src/hooks/useStateWithDeps';
import FilterIcon from 'web/src/assets/svg/FilterIcon.svg';
import { useP2PWalletOptions } from 'web/src/hooks/useP2PWalletOptions';
import { useIsUserActivated } from 'web/src/components/app/UserContext';
import { CryptoCurrencyOption } from 'web/src/components/shared/Ads/CryptoCurrencyOption';

const INPUT_DEBOUNCE = 500;

export const DEFAULT_FILTER: Omit<AdvertParams, 'lang'> = {
  limit: 15,
  skip: 0,
  type: 'purchase',
  currency: 'RUB',
  cryptocurrency: 'BTC',
  isOwnerVerificated: false,
  isOwnerTrusted: false,
  isOwnerActive: false,
  amount: undefined,
  slug: undefined,
  amountType: undefined,
};

const { type, ...RESET_FILTER } = DEFAULT_FILTER;

interface FilterBuySellProps {
  params: AdvertParams;
  onChange: (v: Partial<AdvertParams>) => void;
}

const FilterBuySell: FC<FilterBuySellProps> = ({ params, onChange }) => {
  const t = useSharedT();

  const variants = useMemo(
    () => [
      { value: 'purchase', label: t('Buy') },
      { value: 'selling', label: t('Sell') },
    ],
    [t],
  );

  return (
    <VariantSwitcher
      name="advertType"
      target="form"
      variants={variants}
      value={params.type}
      onChange={(v) => onChange({ type: v as AdvertType, slug: undefined })}
    />
  );
};

interface FilterControlsProps {
  params: AdvertParams;
  mobile?: boolean | undefined;
  onChange: (v: Partial<AdvertParams>) => void;
}

const FilterControls: FC<FilterControlsProps> = ({ params, mobile = false, onChange }) => {
  const t = useSharedT();
  const isUserActivated = useIsUserActivated();
  const [amount, setAmount] = useStateWithDeps(
    () => (params.amountType === 'currency' ? params.amount ?? '' : ''),
    [params.amount],
  );
  const [amountCrypto, setAmountCrypto] = useStateWithDeps(
    () => (params.amountType === 'cryptocurrency' ? params.amount ?? '' : ''),
    [params.amount],
  );

  const { fiatCurrencies, getFiatCurrency } = useP2PFiatCurrencies();
  const fiats = useMemo(() => Object.values(fiatCurrencies ?? {}), [fiatCurrencies]);
  const selectedFiatCurrency = useMemo(() => {
    return fiats.find((d) => d.code === params.currency) ?? null;
  }, [fiats, params.currency]);

  const { selectedWalletOption, walletOptions } = useP2PWalletOptions(
    getFiatCurrency,
    params.cryptocurrency,
  );

  const paymethodsResp = useFetchPaymethods({
    lang: params.lang,
    type: params.type,
    currency: params.currency,
    cryptocurrency: params.cryptocurrency,
    isOwnerActive: params.isOwnerActive,
    isOwnerTrusted: params.isOwnerTrusted,
    isOwnerVerificated: params.isOwnerVerificated,
  });

  const paymethods: [PaymethodInfoSource, ...PaymethodInfoSource[]] = useMemo(
    () => [
      {
        id: -1,
        count: 0,
        description: t('All payment methods'),
        rate: -1,
        slug: undefined,
      },
      ...(paymethodsResp.data?.data ?? []),
    ],
    [paymethodsResp.data?.data, t],
  );
  const selectedPaymethod = useMemo(
    () => paymethods.find((d) => d.slug === params.slug) ?? paymethods[0],
    [paymethods, params.slug],
  );

  const changeAmountDebounced = useDebouncedCallback(
    (value: string, amountType: AdvertParams['amountType']) => {
      onChange({ amount: value || undefined, amountType: value ? amountType : undefined });
    },
    INPUT_DEBOUNCE,
  );

  const handleChangeAmount = (d: string) => {
    const nvalue = parseNumeric(d);
    setAmount(nvalue);
    setAmountCrypto('');
    changeAmountDebounced(nvalue, 'currency');
  };

  const handleChangeAmountCrypto = (d: string) => {
    const nvalue = parseNumeric(d);
    setAmountCrypto(nvalue);
    setAmount('');
    changeAmountDebounced(nvalue, 'cryptocurrency');
  };

  return (
    <>
      <Box display="flex" flexDirection="column" gap="4x">
        <InputAmountWithCurrency
          label={t('AmountWithSymbol', { symbol: params.cryptocurrency })}
          amount={amountCrypto}
          currencyList={walletOptions}
          selectedCurrency={selectedWalletOption}
          renderOption={CryptoCurrencyOption}
          onChangeAmount={handleChangeAmountCrypto}
          onChangeCurrency={(v) => onChange({ cryptocurrency: v.code, slug: undefined })}
        />
        <InputAmountWithCurrency
          label={t('AmountWithSymbol', { symbol: params.currency })}
          amount={amount}
          currencyList={fiats}
          selectedCurrency={selectedFiatCurrency}
          onChangeAmount={handleChangeAmount}
          onChangeCurrency={(v) => onChange({ currency: v.code, slug: undefined })}
        />
        <SelectPaymentMethod
          options={paymethods}
          value={selectedPaymethod}
          onChange={(v) => onChange({ slug: v.slug })}
        />
      </Box>

      <SwitchField
        id={`filter.with_verified${mobile ? '_mobile' : ''}`}
        label={t('Verified users')}
        helpText={t('ad.verified.info')}
        value={params.isOwnerVerificated}
        alignItems="flex-start"
        onChange={(v) => onChange({ isOwnerVerificated: v })}
      />
      {isUserActivated && (
        <SwitchField
          id={`filter.with_trusted${mobile ? '_mobile' : ''}`}
          label={t('Trusted users')}
          helpText={t('ad.trusted.info')}
          value={params.isOwnerTrusted}
          alignItems="flex-start"
          onChange={(v) => onChange({ isOwnerTrusted: v })}
        />
      )}
      <SwitchField
        id={`filter.with_online${mobile ? '_mobile' : ''}`}
        label={t('Active users')}
        helpText={t('ad.active.info')}
        value={params.isOwnerActive}
        alignItems="flex-start"
        onChange={(v) => onChange({ isOwnerActive: v })}
      />
    </>
  );
};

interface FilterProps {
  params: AdvertParams;
  onChange: (v: Partial<AdvertParams>) => void;
}

export const Filter: FC<FilterProps> = ({ params, onChange }) => {
  const t = useSharedT();

  return (
    <Box display="flex" flexDirection="column" gap="8x">
      <Box display="flex" flexDirection="column" gap="6x">
        <FilterBuySell params={params} onChange={onChange} />
        <FilterControls params={params} onChange={onChange} />
      </Box>
      <Button variant="outlined" color="secondary" onClick={() => onChange(RESET_FILTER)}>
        {t('Reset')}
      </Button>
    </Box>
  );
};

interface FilterMobileProps {
  params: AdvertParams;
  onChange: (v: Partial<AdvertParams>) => void;
}

export const FilterMobile: FC<FilterMobileProps> = ({ params, onChange }) => {
  const t = useSharedT();

  const [show, setShow] = useState(false);
  const [localParams, setLocalParams] = useStateWithDeps<AdvertParams>(() => params, [params]);

  const updateParams = (v: Partial<AdvertParams>) => {
    setLocalParams({ ...localParams, ...v });
  };

  const toggleModal = () => setShow(!show);

  const handleClickReset = () => {
    updateParams(RESET_FILTER);
    onChange(RESET_FILTER);
    toggleModal();
  };

  const handleClickApply = () => {
    onChange(localParams);
    toggleModal();
  };

  const handleClickCancel = () => {
    setLocalParams(params);
    toggleModal();
  };

  return (
    <>
      <Box display="flex" gap="4x">
        <FilterBuySell params={params} onChange={onChange} />
        <Button onClick={toggleModal}>
          <FilterIcon />
        </Button>
      </Box>
      <Modal show={show} onClose={handleClickCancel}>
        <ModalHeader>{t('Filter')}</ModalHeader>
        <ModalBody>
          <Box display="flex" flexDirection="column" gap="6x">
            <FilterControls params={localParams} mobile onChange={updateParams} />
          </Box>
        </ModalBody>
        <ModalFooter>
          <Box flexGrow={1} display="flex" flexDirection="column" gap="4x">
            <Button variant="text" color="secondary" onClick={handleClickReset}>
              {t('Reset')}
            </Button>
            <Button color="secondary" onClick={handleClickApply}>
              {t('Apply')}
            </Button>
          </Box>
        </ModalFooter>
      </Modal>
    </>
  );
};
