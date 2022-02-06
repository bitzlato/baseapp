import * as React from 'react';
import { useDispatch } from 'react-redux';
import { setShouldGeetestReset } from '../modules';

export const useSetShouldGeetestReset = (
  error: boolean,
  success: boolean,
  geetestCaptchaRef: React.MutableRefObject<null>,
) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (error || success) {
      if (geetestCaptchaRef) {
        dispatch(setShouldGeetestReset({ shouldGeetestReset: true }));
      }
    }
  }, [dispatch, error, success, geetestCaptchaRef]);
};
