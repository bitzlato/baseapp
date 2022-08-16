import { useSWRConfig } from 'swr';
import useMutation from 'use-mutation';
import { p2pUrl } from 'web/src/api/config';
import { useHandleFetchError } from 'web/src/components/app/AppContext';
import { EditAdFormValues } from 'web/src/components/shared/UserAd/UserAdEditContext';
import { FetchError, fetchWithCreds } from 'web/src/helpers/fetch';
import { UserAdvert, UserAdvertSource } from 'web/src/modules/p2p/types';

export interface UpdateUserAdInput {
  id: UserAdvert['id'];
  values:
    | EditAdFormValues
    | {
        status: UserAdvert['status'];
      };
}

const updateUserAd = async ({ id, values }: UpdateUserAdInput): Promise<UserAdvertSource> => {
  let data: typeof values;
  if ('status' in values) {
    data = { status: values.status };
  } else {
    data = { ...values };

    if (data.rateType) {
      if (data.rateType === 'fixed') {
        data.ratePercent = null;
      }

      if (data.rateType === 'floating') {
        data.rateValue = null;
      }

      delete data.rateType;
    }

    if (data.individual || data.details === null || data.details.length === 0) {
      data.details = null;
    }
  }

  const response = await fetchWithCreds(`${p2pUrl()}/dsa/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  return response;
};

export const useUpdateUserAd = (lang: string) => {
  const { mutate } = useSWRConfig();
  const handleFetchError = useHandleFetchError();

  return useMutation<UpdateUserAdInput, UserAdvertSource, unknown>(updateUserAd, {
    throwOnFailure: true,
    onSuccess: () => {
      mutate(`${p2pUrl()}/dsa/all?lang=${lang}`);
    },
    onFailure: ({ error }) => {
      if (error instanceof FetchError) {
        if (error.code === 481 && error.payload.code === 'AdsUpdatedToOften') {
          return;
        }

        if (
          [
            'AdvertIsDisabled',
            'TooHighAdvertRate',
            'WrongMaxLimitForNewTrader',
            'NotEnoughRatingForTermsWithDigits',
          ].includes(error.payload.code)
        ) {
          return;
        }

        handleFetchError(error);
      }
    },
  });
};
