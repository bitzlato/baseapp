import { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { selectCurrentLanguage, selectUserFetching, selectUserInfo } from 'web/src/modules';
import { useSelector } from 'react-redux';
import { p2pUrl } from 'web/src/api';
import {
  DeeplinkResultParams,
  DeeplinkType,
  useActivateDeeplink,
} from 'web/src/hooks/mutations/useActivateDeeplink';
import { AdvertSingleSource, PaymethodSource } from 'web/src/modules/p2p/types';
import { FetchError, fetchWithCreds } from 'web/src/helpers/fetch';
import { useDeeplinkAlertContext } from 'web/src/containers/DeeplinkAlert/DeeplinkAlertContext';

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
  const location = useLocation();
  const history = useHistory();
  const user = useSelector(selectUserInfo);
  const userFetching = useSelector(selectUserFetching);
  const lang = useSelector(selectCurrentLanguage);
  const { setAlert } = useDeeplinkAlertContext();
  const [activateDeeplink] = useActivateDeeplink();
  const [loading, setLoading] = useState(true);

  const showAlert = useCallback(
    (message: string | null | undefined) => {
      setAlert(message ?? null);
    },
    [setAlert],
  );

  const redirectExternal = (to: string) => {
    window.location.replace(to);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const deeplinkCode = urlParams.get('start');

    (async () => {
      if (deeplinkCode) {
        if (userFetching) {
          return;
        }

        let deeplinkResult;
        try {
          deeplinkResult = await activateDeeplink({ code: deeplinkCode });
        } catch (error) {
          if (error instanceof FetchError) {
            deeplinkResult = error;
          }
        }

        if (!deeplinkResult) {
          history.push('/p2p');
          return;
        }

        if (deeplinkResult.code) {
          if ('message' in deeplinkResult) {
            showAlert(deeplinkResult.message);
          } else {
            showAlert(deeplinkResult.code);
          }
        }

        if (
          deeplinkResult instanceof FetchError ||
          ('action' in deeplinkResult && !deeplinkResult.action && !deeplinkResult.code)
        ) {
          history.push('/p2p');
          return;
        }

        const { action } = deeplinkResult;
        const params = deeplinkResult.params || ({} as DeeplinkResultParams);

        switch (action) {
          case DeeplinkType.ALERT: {
            if (params.message === 'login_for_pay_bill') {
              redirectExternal(`/${lang}/merch/public/invoices/${params.invoiceId}`);
            } else {
              showAlert(params.message);
            }

            break;
          }

          case DeeplinkType.SHOW_WITHDRAW_VOUCHER: {
            showAlert('showWithdrawVoucher');

            break;
          }

          case DeeplinkType.SHOW_ADVERT: {
            try {
              const advert: AdvertSingleSource = await fetchWithCreds(
                `${p2pUrl()}${user === undefined ? '/public' : ''}/exchange/dsa/${params.advertId}`,
              );
              const paymethod: PaymethodSource = await fetchWithCreds(
                `${p2pUrl()}/public/refs/paymethods/${advert.paymethod}?lang=${lang}`,
              );

              history.push(generateAdvertLink({ advert, paymethod }));
            } catch (error) {
              if (error instanceof FetchError) {
                showAlert(error.message);
                history.push('/p2p');
              }
            }

            break;
          }

          // May be unused
          case DeeplinkType.SHOW_TRADE: {
            history.push(`/p2p/trades/${params.tradeId}`);

            break;
          }

          case DeeplinkType.SHOW_BILL: {
            redirectExternal(`/${lang}/merch/bills/${params.billId}`);

            break;
          }

          default:
            history.push('/p2p');
            break;
        }
      }

      setLoading(false);
    })();
  }, [user, userFetching, activateDeeplink, lang, showAlert, history, location.search]);

  return loading;
};
