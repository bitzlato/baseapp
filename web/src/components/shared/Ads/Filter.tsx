import { useMemo, useState, FC } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { Box } from 'web/src/components/ui/Box';
import { Button } from 'web/src/components/ui/Button';
import { VariantSwitcher } from 'web/src/components/ui/VariantSwitcher';
import { useFiatCurrencies } from 'web/src/hooks/data/useFetchP2PCurrencies';
import { useFetchP2PCryptoCurrencies } from 'web/src/hooks/data/useFetchP2PWallets';
import { useFetchPaymethods } from 'web/src/hooks/data/useFetchPaymethods';
import { AdvertParams, AdvertType, PaymethodInfo } from 'web/src/modules/p2p/types';
import { parseNumeric } from 'web/src/helpers/parseNumeric';
import { SwitchField } from 'web/src/components/profile/settings/SwitchField';
import { useSharedT } from 'web/src/components/shared/Adapter';
import { InputAmountWithCurrency } from 'web/src/components/shared/Ads/InputAmountWithCurrency';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'web/src/components/ui/Modal';
import FilterIcon from 'web/src/assets/svg/FilterIcon.svg';
import { useStateWithDeps } from 'web/src/hooks/useStateWithDeps';
import { SelectCurrency } from 'web/src/components/shared/Ads/SelectCurrency';
import { SelectPaymentMethod } from 'web/src/components/shared/Ads/SelectPaymentMethod';

const INPUT_DEBOUNCE = 500;
const EMPTY_ARR: unknown[] = [];

export const DEFAULT_FILTER: Omit<AdvertParams, 'lang'> = {
  limit: 15,
  skip: 0,
  type: 'purchase',
  // TODO: get user default currency or from locale
  currency: 'RUB',
  cryptocurrency: 'BTC',
  isOwnerVerificated: false,
  isOwnerTrusted: false,
  isOwnerActive: false,
  amount: undefined,
  paymethod: undefined,
};

const { type, ...RESET_FILTER } = DEFAULT_FILTER;

interface Props {
  params: AdvertParams;
  onChange: (v: Partial<AdvertParams>) => void;
}

const FilterBuySell: FC<Props> = ({ params, onChange }) => {
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
      onChange={(v) => onChange({ type: v as AdvertType, paymethod: undefined, skip: 0 })}
    />
  );
};

const FilterControls: FC<Props> = ({ params, onChange }) => {
  const t = useSharedT();

  const [amount, setAmount] = useStateWithDeps(() => params.amount ?? '', [params.amount]);

  const { data: cryptoCurrencies = [] } = useFetchP2PCryptoCurrencies();
  const selectedCryptoCurrency = useMemo(() => {
    return cryptoCurrencies.find((d) => d.code === params.cryptocurrency) ?? null;
  }, [cryptoCurrencies, params.cryptocurrency]);

  const { fiatCurrencies } = useFiatCurrencies();
  const fiats = useMemo(() => Object.values(fiatCurrencies), [fiatCurrencies]);
  const selectedFiatCurrency = useMemo(() => {
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
  const selectedPaymethod = useMemo(() => {
    return paymethods.find((d) => d.id === params.paymethod) ?? null;
  }, [paymethods, params.paymethod]);

  const changeAmountDebounced = useDebouncedCallback((d: string) => {
    onChange({ amount: d || undefined });
  }, INPUT_DEBOUNCE);

  const handleChangeAmount = (d: string) => {
    const nvalue = parseNumeric(d);
    setAmount(nvalue);
    changeAmountDebounced(nvalue);
  };

  return (
    <>
      <Box display="flex" flexDirection="column" gap="4x">
        <SelectCurrency
          options={cryptoCurrencies}
          value={selectedCryptoCurrency}
          onChange={(v) => onChange({ cryptocurrency: v!.code, paymethod: undefined })}
        />
        {/*<InputAmountWithCurrency
          amount={amount}
          currencyList={fiats}
          selectedCurrency={selectedFiatCurrency}
          onChangeAmount={handleChangeAmount}
          onChangeCurrency={(v) => onChange({ currency: v.code, paymethod: undefined })}
        />
        <SelectPaymentMethod
          options={paymethods}
          value={selectedPaymethod}
          onChange={(v) => onChange({ paymethod: v!.id })}
        />*/}
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
    </>
  );
};

export const Filter: FC<Props> = ({ params, onChange }) => {
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

export const FilterMobile: FC<Props> = ({ params, onChange }) => {
  const t = useSharedT();

  const [show, setShow] = useState(false);
  const [localParams, setLocalParams] = useState<AdvertParams>(() => ({ ...params }));

  const updateParams = (v: Partial<AdvertParams>) => {
    setLocalParams((prev) => ({ ...prev, ...v }));
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
            <FilterControls params={localParams} onChange={updateParams} />
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
            <Button variant="outlined" color="secondary" onClick={handleClickCancel}>
              {t('Cancel')}
            </Button>
          </Box>
        </ModalFooter>
      </Modal>
    </>
  );
};