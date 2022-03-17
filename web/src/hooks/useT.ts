import { useIntl } from 'react-intl';

export type TranslateFn = (id: string, values?: Record<string, any>) => string;
export type TranslatePostProcessFn = (message: string, values?: Record<string, any>) => any;
export type TranslateWithCallbackFn = (
  id: string,
  values?: Record<string, any>,
  callback?: TranslateFn,
) => string;

export const useT = (): TranslateFn => {
  const { formatMessage } = useIntl();

  return (id, values) => formatMessage({ id, defaultMessage: id }, values);
};
