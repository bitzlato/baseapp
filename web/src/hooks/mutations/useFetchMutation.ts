import { useCallback } from 'react';
import { Key, MutatorOptions, useSWRConfig } from 'swr';
import useMutation, { Options, Reset, Status } from 'use-mutation';
import { useHandleFetchError } from 'web/src/components/app/AppContext';
import { FetchError, fetchMutation } from 'web/src/helpers/fetch';

export type FetcherMutationFn = (url: string, config?: RequestInit) => Promise<any>;

export type MutateFn<Input = unknown, Data = unknown, Error = unknown> = (
  input: Input,
  config?: Omit<Options<Input, Data, Error>, 'onMutate' | 'useErrorBoundary'>,
) => Promise<Data>;

export type TriggerFn<Input = unknown, Data = unknown, Error = unknown> = Input extends undefined
  ? (
      input?: undefined,
      config?: Omit<Options<Input, Data, Error>, 'onMutate' | 'useErrorBoundary'>,
      swrOptions?: { swrKey: Key } & MutatorOptions,
    ) => Promise<Data | undefined>
  : (
      input: Input,
      config?: Omit<Options<Input, Data, Error>, 'onMutate' | 'useErrorBoundary'>,
      swrOptions?: { swrKey: Key } & MutatorOptions,
    ) => Promise<Data | undefined>;

export const useFetchMutation = <Input = unknown, Data = unknown, Error = unknown>(
  url: string,
  fetcherMutation: FetcherMutationFn = fetchMutation,
  options?: Options<Input, Data, Error> | undefined,
): [
  TriggerFn<Input, Data, Error>,
  {
    status: Status;
    data?: Data;
    error?: Error;
    reset: Reset;
  },
] => {
  const { mutate: swrMutate } = useSWRConfig();
  const handleFetchError = useHandleFetchError();
  const mutationFn = useCallback(
    (input: Input): Promise<Data> =>
      fetcherMutation(url, {
        body: input as any,
      }),
    [fetcherMutation, url],
  );

  const result = useMutation<Input, Data, Error>(mutationFn, {
    throwOnFailure: true,
    onFailure: ({ error }) => {
      if (error instanceof FetchError) {
        handleFetchError(error);
      }
    },
    ...options,
  });
  const mutate = result[0] as MutateFn<Input, Data, Error>;

  const mutation = useCallback(
    (
      input: Input,
      config?: Omit<Options<Input, Data, Error>, 'onMutate' | 'useErrorBoundary'>,
      swrOptions?: { swrKey: Key } & MutatorOptions,
    ) => {
      if (swrOptions && 'swrKey' in swrOptions) {
        const { swrKey, ...swrConfig } = swrOptions;
        return swrMutate(swrKey, mutate(input, config), swrConfig);
      }

      return mutate(input, config);
    },
    [mutate, swrMutate],
  );

  return [mutation as TriggerFn<Input, Data, Error>, result[1]];
};
