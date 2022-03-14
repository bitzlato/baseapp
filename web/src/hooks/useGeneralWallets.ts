import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { accountUrl } from 'src/api/config';
import { GeneralBalance } from 'src/modules/account/types';
import { selectWallets } from 'src/modules/user/wallets/selectors';
import { getList } from 'src/screens/WalletsScreen/helpers';
import { fetchWithCreds } from '../helpers/fetch';
import { useFetch } from './data/useFetch';
import { useWalletsFetch } from './useWalletsFetch';

export function useGeneralWallets() {
  useWalletsFetch();
  const wallets = useSelector(selectWallets) || [];
  const shouldFetch = process.env.REACT_APP_RELEASE_STAGE !== 'sandbox';
  const { data = [] } = useFetch<GeneralBalance[]>(
    shouldFetch ? `${accountUrl()}/balances` : null,
    fetchWithCreds,
  );
  return useMemo(() => getList(wallets, data), [wallets, data]);
}
