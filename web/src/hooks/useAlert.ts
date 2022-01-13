import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { alertPush } from 'src/modules/public/alert/actions';
import { FetchError } from './useFetch';

export function useAlert(error?: FetchError) {
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      dispatch(
        alertPush({
          type: 'error',
          code: error.code,
          message: error.messages,
          payload: Object.keys(error.payload) ? error.payload : undefined,
        }),
      );
    }
  }, [dispatch, error]);
}
