import { useIntl } from 'react-intl';

export type TranslateFn = (id: string) => string;

export const useT = (): TranslateFn => {
    const { formatMessage } = useIntl();

    return (id: string) => formatMessage({ id });
};
