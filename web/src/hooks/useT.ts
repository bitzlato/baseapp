import { ReactNode } from 'react';
import { useIntl } from 'react-intl';

export type TranslateFn = (id: string, values?: Record<string, any>) => string | ReactNode;

export const useT = (): TranslateFn => {
    const { formatMessage } = useIntl();

    return (id: string, values?: Record<string, any>) => formatMessage({ id }, values);
};
