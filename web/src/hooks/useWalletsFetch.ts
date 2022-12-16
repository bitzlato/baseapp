import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIsUserActivated } from 'web/src/components/app/UserContext';
import { selectShouldFetchWallets, walletsFetch } from '../modules';

export const useWalletsFetch = () => {
  const isUserActivated = useIsUserActivated();
  const shouldDispatch = useSelector(selectShouldFetchWallets);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (shouldDispatch && isUserActivated) {
      dispatch(walletsFetch());
    }
  }, [dispatch, isUserActivated, shouldDispatch]);
};
