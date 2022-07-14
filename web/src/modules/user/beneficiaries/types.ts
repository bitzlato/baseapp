export interface BeneficiaryCrypto {
  address: string;
}

export interface BeneficiaryBank {
  address?: string;
  country?: string;
  full_name: string;
  account_number?: string;
  account_type?: string;
  bank_name?: string;
  bank_address?: string;
  bank_country?: string;
  bank_swift_code?: string;
  intermediary_bank_name?: string;
  intermediary_bank_address?: string;
  intermediary_bank_country?: string;
  intermediary_bank_swift_code?: string;
}

export interface Beneficiary {
  blockchain_id: number;
  blockchain_key: string;
  currency: string;
  data: BeneficiaryCrypto | BeneficiaryBank;
  description?: string;
  id: number;
  name: string;
  sent_at: string;
  state: string;
  uid: string;
}
