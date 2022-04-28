import { Beneficiary } from 'web/src/modules';

export type WithdrawP2PFormValues = {
  amount: string;
  address: string;
  voucher: boolean;
};

export type WithdrawMarketFormValues = {
  amount: string;
  beneficiary: Beneficiary;
  otpCode: string;
  total: string;
};
