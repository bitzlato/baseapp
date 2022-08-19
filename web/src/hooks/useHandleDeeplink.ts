import { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { alertPush, selectCurrentLanguage } from 'web/src/modules';
import { useDispatch, useSelector } from 'react-redux';
import { p2pUrl } from 'web/src/api';
import {
  DeeplinkResultParams,
  DeeplinkType,
  useActivateDeeplink,
} from 'web/src/hooks/mutations/useActivateDeeplink';
import { AdvertSingleSource, PaymethodSource } from 'web/src/modules/p2p/types';
import { fetchWithCreds } from 'web/src/helpers/fetch';
import { useUser } from 'web/src/components/app/AppContext';

export default function generateAdvertLink({
  advert,
  paymethod,
}: {
  advert: AdvertSingleSource;
  paymethod: PaymethodSource;
}) {
  const seoUrl = `${advert.type === 'selling' ? 'buy' : 'sell'}-${advert.cryptocurrency}-${
    paymethod.currency
  }-${paymethod.description}`;
  return `/p2p/exchange/${advert.id}/${seoUrl}`;
}

export const useHandleDeeplink = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const user = useUser();
  const lang = useSelector(selectCurrentLanguage);
  const [activateDeeplink] = useActivateDeeplink();
  const [loading, setLoading] = useState(true);

  const showAlert = useCallback(
    (params: { message: string }) => {
      if (!params.message) {
        return;
      }

      dispatch(alertPush({ type: 'info', message: [params.message] }));
    },
    [dispatch],
  );

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const deeplinkCode = urlParams.get('start');

    (async () => {
      if (deeplinkCode) {
        const deeplinkResult = await activateDeeplink({ code: deeplinkCode });

        if (!deeplinkResult) {
          return;
        }

        if (deeplinkResult.code) {
          if ('message' in deeplinkResult) {
            showAlert({ message: deeplinkResult.message });
          } else {
            showAlert({ message: deeplinkResult.code });
          }
        }

        if ('action' in deeplinkResult && !deeplinkResult.action && !deeplinkResult.code) {
          history.push('/p2p');
        }

        const { action } = deeplinkResult;
        const params = deeplinkResult.params || ({} as DeeplinkResultParams);

        switch (action) {
          case DeeplinkType.ALERT: {
            if (params.message === 'login_for_pay_bill') {
              history.push(`/${lang}/merch/public/invoices/${params.invoiceId}`);
            } else {
              showAlert({ message: params.message });
            }

            break;
          }

          case DeeplinkType.SHOW_WITHDRAW_VOUCHER: {
            showAlert({ message: 'showWithdrawVoucher' });

            break;
          }

          case DeeplinkType.SHOW_ADVERT: {
            const advert: AdvertSingleSource = await fetchWithCreds(
              `${p2pUrl()}${user === undefined ? '/public' : ''}/exchange/dsa/${params.advertId}`,
            );
            const paymethod: PaymethodSource = await fetchWithCreds(
              `${p2pUrl()}/public/refs/paymethods/${advert.paymethod}?lang=${lang}`,
            );

            history.push(generateAdvertLink({ advert, paymethod }));

            break;
          }

          case DeeplinkType.SHOW_TRADE: {
            history.push(`/p2p/trades/${params.tradeId}`);

            break;
          }

          case DeeplinkType.SHOW_BILL: {
            history.push(`/${lang}/merch/bills/${params.billId}`);

            break;
          }

          default:
            break;
        }
      }

      setLoading(false);
    })();
  }, [user, activateDeeplink, lang, showAlert, history, location.search]);

  return loading;
};
