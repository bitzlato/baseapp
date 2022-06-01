import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Market } from '../modules/public/markets';
import { userOpenOrdersFetch } from '../modules/user/openOrders';
import { selectUserLoggedIn, selectVerifyEmail } from '../modules/user/profile';

export const userOpenOrdersFetchAction = (market: Market | undefined, hideOtherPairs: boolean) => {
  return userOpenOrdersFetch(
    market && hideOtherPairs ? { market: { id: market.id } as Market } : undefined,
  );
};

export const useOpenOrdersFetch = (market: Market | undefined, hideOtherPairs: boolean) => {
  const dispatch = useDispatch();
  const userLoggedIn = useSelector(selectUserLoggedIn);
  const verifyEmail = useSelector(selectVerifyEmail);

  React.useEffect(() => {
    if (userLoggedIn && !verifyEmail) {
      dispatch(userOpenOrdersFetchAction(market, hideOtherPairs));
    }
  }, [userLoggedIn, verifyEmail, market?.id, hideOtherPairs, dispatch]);
};
