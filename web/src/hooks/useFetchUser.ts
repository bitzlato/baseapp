import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userFetch } from 'web/src/modules/user/profile/actions';

export const useFetchUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userFetch());
  }, [dispatch]);
};
