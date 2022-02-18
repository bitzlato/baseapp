import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { accountUrl } from 'src/api/config';
import { GeneralBalance } from 'src/modules/account/types';
import { selectWallets } from 'src/modules/user/wallets/selectors';
import { getList } from 'src/screens/WalletsScreen/helpers';
import { useFetch } from './useFetch';
import { useWalletsFetch } from './useWalletsFetch';

export function useGeneralWallets(deps: React.DependencyList = []) {
  useWalletsFetch();
  const wallets = useSelector(selectWallets) || [];
  const { data = [] } = useFetch<GeneralBalance[]>(
    `${accountUrl()}/balances`,
    {
      skipRequest: process.env.REACT_APP_RELEASE_STAGE === 'sandbox',
      credentials: 'include',
    },
    deps,
  );
  return useMemo(() => getList(wallets, data), [wallets, data]);
}
