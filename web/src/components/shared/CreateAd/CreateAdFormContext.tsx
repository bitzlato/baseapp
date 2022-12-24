import {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { AdvertType, PaymethodSource } from 'web/src/modules/p2p/types';
import { useP2PFiatCurrencies } from 'web/src/hooks/useP2PFiatCurrencies';
import { useFetchP2PPaymethods } from 'web/src/hooks/data/useFetchP2PPaymethods';
import { useAdapterContext } from 'web/src/components/shared/Adapter';
import { useFetchP2PCryptoCurrencies } from 'web/src/hooks/data/p2p/useFetchP2PCryptoCurrencies';
import { BaseCurrency } from 'web/src/types/currencies.types';
import { P2PCryptoCurrencySource } from 'web/src/modules/p2p/wallet-types';
import { useLanguage } from 'web/src/components/app/AppContext';

export type CreateAdFormValues = {
  type: AdvertType | null;
  cryptocurrency: string | null;
  currency: string | null;
  paymethod: number | null;
  ratePercent: string | null;
  rateValue: string | null;
  maxLimitForNewTrader: string | null;
  minAmount: string | null;
  maxAmount: string | null;
  verifiedOnly: boolean;
  liquidityLimit: boolean;
  individual: boolean;
  minPartnerTradesAmount: string | null;
  terms: string | null;
  details: string | null;
};

export type AdvertTypeValues = Array<{ value: AdvertType; title: string }>;

export type CreateError = Partial<{
  [key in keyof CreateAdFormValues]: string | null;
}>;

type CreateAdFormContextValue = {
  types: AdvertTypeValues;
  cryptoCurrencyOptions: P2PCryptoCurrencySource[];
  fiatsOptions: BaseCurrency[];
  paymethods: PaymethodSource[];
  selectedCryptoCurrency: P2PCryptoCurrencySource | null;
  selectedFiatCurrency: BaseCurrency | null;
  selectedPaymethod: PaymethodSource | null;
  formValues: CreateAdFormValues;
  updateFormValues: (upd: Partial<CreateAdFormValues>) => void;
  creationError: null | CreateError;
  setCreationError: Dispatch<SetStateAction<null | CreateError>>;
};

export const CreateAdFormContext = createContext(null as any as CreateAdFormContextValue);

const DEFAULT_FORM_VALUES: CreateAdFormValues = {
  type: null,
  cryptocurrency: null,
  currency: null,
  paymethod: null,
  ratePercent: null,
  rateValue: null,
  liquidityLimit: false,
  maxLimitForNewTrader: null,
  minAmount: null,
  maxAmount: null,
  verifiedOnly: false,
  individual: false,
  minPartnerTradesAmount: null,
  terms: null,
  details: null,
};

export const CreateAdFormProvider: FC<{}> = ({ children }) => {
  const lang = useLanguage();
  const [formValues, setFormValues] = useState<CreateAdFormValues>(DEFAULT_FORM_VALUES);
  const [creationError, setCreationError] = useState<null | CreateError>(null);
  const { t } = useAdapterContext();
  const { fiatCurrencies } = useP2PFiatCurrencies();
  const { data: cryptoCurrencyOptions = [] } = useFetchP2PCryptoCurrencies();
  const fiatsOptions = useMemo(() => Object.values(fiatCurrencies ?? {}), [fiatCurrencies]);
  const { data: paymethods = [] } = useFetchP2PPaymethods({
    type: formValues.type ?? undefined,
    currency: formValues.currency ?? undefined,
    cryptocurrency: formValues.cryptocurrency ?? undefined,
    lang,
  });

  const selectedFiatCurrency = useMemo(() => {
    return formValues.currency ? fiatCurrencies?.[formValues.currency] ?? null : null;
  }, [fiatCurrencies, formValues.currency]);

  const selectedCryptoCurrency = useMemo(() => {
    return cryptoCurrencyOptions.find((d) => d.code === formValues.cryptocurrency) ?? null;
  }, [cryptoCurrencyOptions, formValues.cryptocurrency]);

  const selectedPaymethod = useMemo(() => {
    return paymethods.find((d) => d.id === formValues.paymethod) ?? null;
  }, [paymethods, formValues.paymethod]);

  const types: Array<{ value: AdvertType; title: string }> = useMemo(
    () => [
      { title: t('Purchase'), value: 'purchase' },
      { title: t('Selling'), value: 'selling' },
    ],
    [t],
  );

  const updateFormValues = useCallback(
    (upd: Partial<CreateAdFormValues>) => {
      let next = { ...formValues, ...upd };

      if (Object.keys(upd).some((key) => ['type', 'cryptocurrency', 'currency'].includes(key))) {
        next = { ...next, paymethod: DEFAULT_FORM_VALUES.paymethod };
      }

      setFormValues(next);
    },
    [formValues],
  );

  const value = useMemo(
    () => ({
      types,
      cryptoCurrencyOptions,
      fiatsOptions,
      paymethods,
      selectedCryptoCurrency,
      selectedFiatCurrency,
      selectedPaymethod,
      formValues,
      updateFormValues,
      creationError,
      setCreationError,
    }),
    [
      types,
      cryptoCurrencyOptions,
      fiatsOptions,
      paymethods,
      selectedCryptoCurrency,
      selectedFiatCurrency,
      selectedPaymethod,
      formValues,
      updateFormValues,
      creationError,
      setCreationError,
    ],
  );

  return <CreateAdFormContext.Provider value={value}>{children}</CreateAdFormContext.Provider>;
};

export const useCreateAdFormContext = () => useContext(CreateAdFormContext);
