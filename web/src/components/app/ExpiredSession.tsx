import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { minutesUntilAutoLogout, sessionCheckInterval } from 'web/src/api/config';
import { useUserContext } from 'web/src/components/app/UserContext';
import { ExpiredSessionModal } from 'web/src/components/ExpiredSessionModal/ExpiredSessionModal';
import { StorageKeys } from 'web/src/helpers/storageKeys';
import { logoutFetch } from 'web/src/modules/user/auth/actions';

const EVENT_TYPES = ['click', 'keydown', 'scroll', 'resize', 'mousemove', 'TabSelect', 'TabHide'];

const setLastActionAt = (data: number) =>
  localStorage.setItem(StorageKeys.lastActionAt, data.toString());
const getLastActionAt = (): number =>
  parseInt(localStorage.getItem(StorageKeys.lastActionAt) ?? '0', 10);
const updateLastActionAt = () => setLastActionAt(Date.now());

export const ExpiredSession: FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isUserLoggedIn, isUserActivated } = useUserContext();
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    EVENT_TYPES.forEach((type) => document.body.addEventListener(type, updateLastActionAt));

    return () =>
      EVENT_TYPES.forEach((type) => document.body.removeEventListener(type, updateLastActionAt));
  }, []);

  useEffect(() => {
    if (isUserLoggedIn) {
      let timeoutId: number;
      const tick = () => {
        const now = Date.now();
        const deadline = getLastActionAt() + parseFloat(minutesUntilAutoLogout()) * 60 * 1000;
        const isExpired = deadline - now < 0;

        if (isExpired) {
          if (isUserActivated) {
            setOpen(true);
          }

          dispatch(logoutFetch());
          return;
        }

        timeoutId = window.setTimeout(tick, parseFloat(sessionCheckInterval()));
      };
      tick();

      return () => window.clearTimeout(timeoutId);
    }

    return undefined;
  }, [dispatch, isUserActivated, isUserLoggedIn]);

  const handleClose = () => setOpen(false);
  const handleSumbit = () => {
    setOpen(false);
    history.replace('/signin');
  };

  if (!isOpen) {
    return null;
  }

  return <ExpiredSessionModal onClose={handleClose} onSubmit={handleSumbit} />;
};
