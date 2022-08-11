import { FC, useCallback, useEffect } from 'react';
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
import { Spinner } from 'web/src/components/ui/Spinner';
import { Container } from 'web/src/components/ui/Container';
import { Box } from 'web/src/components/ui/Box';

export default function generateAdvertLink({
  advert,
  paymethod,
}: {
  advert: AdvertSingleSource;
  paymethod: PaymethodSource;
}) {
  const chpu = `${advert.type === 'selling' ? 'buy' : 'sell'}-${advert.cryptocurrency}-${
    paymethod.currency
  }-${paymethod.description}`;
  return `p2p/exchange/${advert.id}/${chpu}`;
}

export const DeeplinkScreen: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const user = useUser();
  const lang = useSelector(selectCurrentLanguage);
  const [activateDeeplink] = useActivateDeeplink();

  const showAlert = useCallback(
    (params: { message: string }) =>
      dispatch(alertPush({ type: 'info', message: [params.message] })),
    [dispatch],
  );

  const redirect = useCallback((url: string) => history.push(url), [history]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const deeplinkCode = urlParams.get('start');

    async function handleDeeplink() {
      console.log('HERE', { deeplinkCode });
      if (deeplinkCode) {
        // document.cookie = cookie.serialize('referer_id', deeplinkCode);

        const deeplinkResult = await activateDeeplink({ code: deeplinkCode });
        console.log({ deeplinkResult });

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
          redirect(`/${lang}/p2p/`);
        }

        const type = deeplinkResult.action;
        const params = deeplinkResult.params || ({} as DeeplinkResultParams);

        if (params.message === 'login_for_pay_bill') {
          redirect(`/${lang}/merch/public/invoices/${params.invoiceId}`);
        }

        if (type === DeeplinkType.ALERT && params.message !== 'login_for_pay_bill') {
          showAlert(params);
        }

        if (type === DeeplinkType.SHOW_WITHDRAW_VOUCHER) {
          showAlert({ message: 'showWithdrawVoucher' });
        }

        if (type === DeeplinkType.SHOW_ADVERT) {
          const advert: AdvertSingleSource = await fetchWithCreds(
            `${p2pUrl()}${user === undefined ? '/public' : ''}/exchange/dsa/${params.advertId}`,
          );
          const paymethod: PaymethodSource = await fetchWithCreds(
            `${p2pUrl()}/public/refs/paymethods/${advert.paymethod}?lang=${lang}`,
          );
          const advertUrl = generateAdvertLink({ advert, paymethod });
          redirect(`/${lang}/${advertUrl}`);
        }

        if (type === DeeplinkType.SHOW_TRADE) {
          redirect(`/${lang}/p2p/trades/${params.tradeId}`);
        }

        if (type === DeeplinkType.SHOW_BILL) {
          redirect(`/${lang}/merch/bills/${params.billId}`);
        }
      } else {
        console.log('deeplink not provided');
        redirect(`/${lang}/p2p/`);
      }
    }

    handleDeeplink();

    return () => {
      console.log('unmount deeplink component');
    };
  }, [user, activateDeeplink, lang, showAlert, redirect, location.search]);

  return (
    <Container maxWidth="fullhd">
      <Box display="flex" alignItems="center" justifyContent="center" my="15x" py="15x">
        <Spinner />
      </Box>
    </Container>
  );
};
