import { useSWRConfig } from 'swr';
import useMutation from 'use-mutation';
import { p2pUrl } from 'web/src/api/config';
import { useHandleFetchError } from 'web/src/components/app/AppContext';
import { CreateAdFormValues } from 'web/src/components/shared/CreateAd/CreateAdFormContext';
import { FetchError, fetchWithCreds } from 'web/src/helpers/fetch';
import { pick } from 'web/src/helpers/pick';
import { UserAdvertSource } from 'web/src/modules/p2p/types';

export interface CreateAdInput extends CreateAdFormValues {}

const createAd = async (params: CreateAdInput): Promise<UserAdvertSource> => {
  const data: Partial<CreateAdInput> = pick(params, [
    'type',
    'cryptocurrency',
    // 'currency',
    'paymethod',
    'minAmount',
    'maxAmount',
    'terms',
    'details',
    'maxLimitForNewTrader',
    'minPartnerTradesAmount',
    'verifiedOnly',
    'liquidityLimit',
    // 'individual',
  ]);

  if (params.ratePercent) {
    data.ratePercent = params.ratePercent;
  } else if (params.rateValue) {
    data.rateValue = params.rateValue;
  }

  const response = await fetchWithCreds(`${p2pUrl()}/dsa/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  return response;
};

export const useCreateAd = (lang: string) => {
  const { mutate } = useSWRConfig();
  const handleFetchError = useHandleFetchError();
  const userAdsListKey = `${p2pUrl()}/dsa/all?lang=${lang}`;

  return useMutation<CreateAdInput, UserAdvertSource, unknown>(createAd, {
    throwOnFailure: true,
    onSuccess: () => {
      mutate(userAdsListKey);
    },
    onFailure: ({ error }) => {
      if (error instanceof FetchError) {
        if (
          ['WrongMaxLimitForNewTrader', 'NotEnoughRatingForTermsWithDigits'].includes(
            error.payload.code,
          )
        ) {
          return;
        }

        handleFetchError(error);
      }
    },
  });
};
