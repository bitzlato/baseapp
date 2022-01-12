import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BeneficiariesFetch,
  beneficiariesFetch,
  selectBeneficiariesActivateSuccess,
  selectBeneficiariesDeleteSuccess,
} from '../modules';

export const useBeneficiariesFetch = (payload?: BeneficiariesFetch['payload']) => {
  const dispatch = useDispatch();
  const beneficiariesActivateSuccess = useSelector(selectBeneficiariesActivateSuccess);
  const beneficiariesDeleteSuccess = useSelector(selectBeneficiariesDeleteSuccess);

  React.useEffect(() => {
    dispatch(beneficiariesFetch(payload));
  }, [dispatch, payload?.currency_id]);

  React.useEffect(() => {
    if (beneficiariesActivateSuccess || beneficiariesDeleteSuccess) {
      dispatch(beneficiariesFetch(payload));
    }
  }, [dispatch, beneficiariesActivateSuccess, beneficiariesDeleteSuccess, payload?.currency_id]);
};
