import { useIntl } from 'react-intl';

export type TranslateFn = (id: string, values?: Record<string, any>) => string;
export const strong = (...chunks: string[]) => <strong>{chunks}</strong>;

export const useT = (): TranslateFn => {
  const { formatMessage } = useIntl();

  return (id, values) => formatMessage({ id, defaultMessage: id }, values);
};
