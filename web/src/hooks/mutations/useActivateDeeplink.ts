import useMutation from 'use-mutation';
import { p2pUrl } from 'web/src/api/config';
import { useUser } from 'web/src/components/app/AppContext';
import { fetchJson } from 'web/src/helpers/fetch';

export type DeeplinkResultParams = {
  message: string;
  invoiceId?: number;
  tradeId?: number;
  advertId?: number;
  billId?: number;
};

export enum DeeplinkType {
  SHOW_TRADE = 'showTrade',
  SHOW_ADVERT = 'showAdvert',
  ALERT = 'alert',
  SHOW_BILL = 'showBill',
  SHOW_WITHDRAW_VOUCHER = 'showWithdrawVoucher',
}

export type DeeplinkResult = {
  action: DeeplinkType;
  params?: DeeplinkResultParams | undefined;
  code?: string | undefined;
} & (
  | {}
  | {
      message: string;
      reason: {};
    }
);

interface Input {
  code: string;
}

const activateDeeplink =
  (isLogged = true) =>
  async ({ code }: Input) => {
    return fetchJson(isLogged ? `${p2pUrl()}/deeplink/` : `${p2pUrl()}/public/deeplink/`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({ code }),
    });
  };

export const useActivateDeeplink = () => {
  const user = useUser();

  return useMutation<Input, DeeplinkResult>(activateDeeplink(user !== undefined), {
    throwOnFailure: true,
  });
};
