import { isEmpty } from 'web/src/helpers/isEmptyObject';
import { SharedTranslateFn } from 'web/src/components/shared/sharedI18n';
import { CreateAdFormValues } from './CreateAdFormContext';
import { MAX_AD_DETAILS_LENGTH, MAX_AD_TERMS_LENGTH } from './StepTerms';

type TestFunc = (value: any, values: CreateAdFormValues) => true | string;

const testRequired = (value: any) => {
  return value !== null && value !== '';
};

export const validateValues = (
  formValues: CreateAdFormValues,
  keys: Array<keyof CreateAdFormValues>,
  { t }: { t: SharedTranslateFn },
) => {
  const rules: Record<keyof CreateAdFormValues, TestFunc> = {
    type: (value: CreateAdFormValues['type']) => {
      if (!testRequired(value)) {
        return t('createAd.errors.fill');
      }

      return true;
    },
    cryptocurrency: (value: CreateAdFormValues['cryptocurrency']) => {
      if (!testRequired(value)) {
        return t('createAd.errors.fill');
      }

      return true;
    },
    currency: (value: CreateAdFormValues['currency']) => {
      if (!testRequired(value)) {
        return t('createAd.errors.fill');
      }

      return true;
    },
    paymethod: (value: CreateAdFormValues['paymethod']) => {
      if (!testRequired(value)) {
        return t('createAd.errors.fill');
      }

      return true;
    },
    ratePercent: (value: CreateAdFormValues['ratePercent']) => {
      if (!testRequired(value)) {
        return t('createAd.errors.fill');
      }

      return true;
    },
    rateValue: (value: CreateAdFormValues['rateValue']) => {
      if (!testRequired(value)) {
        return t('createAd.errors.fill');
      }

      return true;
    },
    minAmount: (value: CreateAdFormValues['minAmount']) => {
      if (!testRequired(value)) {
        return t('createAd.errors.fill');
      }

      if (value && Number(value) <= 0) {
        return t('createAd.errors.invalid');
      }

      return true;
    },
    maxAmount: (value: CreateAdFormValues['maxAmount'], values: CreateAdFormValues) => {
      if (!testRequired(value)) {
        return t('createAd.errors.fill');
      }

      if (value && Number(value) <= 0) {
        return t('createAd.errors.invalid');
      }

      if (Number(value) < Number(values.minAmount)) {
        return t('minMaxDiscrepancy');
      }

      return true;
    },
    verifiedOnly: () => true,
    liquidityLimit: () => true,
    individual: () => true,
    minPartnerTradesAmount: (value: CreateAdFormValues['minPartnerTradesAmount']) => {
      if (!testRequired(value)) {
        return true;
      }

      if (value && Number(value) <= 0) {
        return t('createAd.errors.invalid');
      }

      return true;
    },
    maxLimitForNewTrader: (value: CreateAdFormValues['maxLimitForNewTrader']) => {
      if (!testRequired(value)) {
        return true;
      }

      if (value && Number(value) <= 0) {
        return t('createAd.errors.invalid');
      }

      return true;
    },
    terms: (value: CreateAdFormValues['terms']) => {
      if (value && value.length > MAX_AD_TERMS_LENGTH) {
        return t('createAd.errors.maxLength', { max: MAX_AD_TERMS_LENGTH });
      }

      return true;
    },
    details: (value: CreateAdFormValues['details']) => {
      if (value && value.length > MAX_AD_DETAILS_LENGTH) {
        return t('createAd.errors.maxLength', { max: MAX_AD_DETAILS_LENGTH });
      }

      return true;
    },
  };

  const nextErrors: Partial<Record<keyof CreateAdFormValues, string>> = {};

  keys.forEach((key) => {
    const validationFunc = rules[key];
    const res = validationFunc(formValues[key], formValues);

    if (res !== true) {
      nextErrors[key] = res;
    }
  });

  return isEmpty(nextErrors) ? null : nextErrors;
};
