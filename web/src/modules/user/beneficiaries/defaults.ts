import { Beneficiary } from './types';

export const defaultBeneficiary: Beneficiary = {
  id: 0,
  currency: '',
  name: '',
  state: '',
  data: {
    address: '',
  },
  blockchain_id: -1,
  blockchain_key: '',
  uid: '',
  sent_at: '',
};
