import { FC, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useIsUserLoggedIn } from 'web/src/components/app/UserContext';
import { walletsReset } from 'web/src/modules/user/wallets/actions';

export const ListensForLogin: FC = () => {
  const dispatch = useDispatch();
  const isUserLoggedIn = useIsUserLoggedIn();
  const prev = useRef<boolean>(isUserLoggedIn);

  useEffect(() => {
    if (isUserLoggedIn && prev.current !== isUserLoggedIn) {
      dispatch(walletsReset());
    }

    prev.current = isUserLoggedIn;
  }, [dispatch, isUserLoggedIn]);

  return null;
};
