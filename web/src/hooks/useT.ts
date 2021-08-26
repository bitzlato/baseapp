import { useIntl } from 'react-intl';

export type TranslateFn = (id: string, values?: Record<string, any>) => string;

export const useT = (): TranslateFn => {
    const { formatMessage } = useIntl();

    return (id, values) => formatMessage({ id }, values);
};
