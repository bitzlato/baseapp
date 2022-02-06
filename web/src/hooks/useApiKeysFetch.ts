import * as React from 'react';
import { useDispatch } from 'react-redux';
import { apiKeysFetch } from '../modules';

export const useApiKeysFetch = (pageIndex: number, limit: number) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(apiKeysFetch({ pageIndex, limit }));
  }, [dispatch, pageIndex, limit]);
};
