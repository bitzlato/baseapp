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

  return (id, values) => formatMessage({ id }, values);
};

export const useBetterT = (): TranslateWithCallbackFn => {
  const { formatMessage } = useIntl();

  return (id, values, callback) => {
    const message = formatMessage({ id, defaultMessage: id }, values);

    if (callback) {
      return callback(message, values);
    }

    return message;
  };
};

export const translateTransformTags: TranslatePostProcessFn = (message, values) => {
  // todo: extract every [component params]content[/component] and split string into span-s + components
  console.log(message, values);
  return message;
};
